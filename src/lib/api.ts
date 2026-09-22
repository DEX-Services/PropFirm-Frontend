// Thin client for the BitDX Prop Firm backend (see PROP_FIRM_PLAN.md).
// Every function here calls the real service — there is no mock data or
// fabricated fallback in this module. A network/auth failure is surfaced
// to the caller as a thrown error, not papered over with a fake value.

const API_BASE = import.meta.env.VITE_PROPFIRM_API_URL || "http://localhost:8090";

const TOKEN_KEY = "propfirm-token";

export function getToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore storage failures (private browsing etc.) — caller keeps the
    // token in memory for the current session instead
  }
}

export function clearToken() {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const body: unknown = await res.json();
      if (body && typeof body === "object" && "error" in body && typeof (body as { error: unknown }).error === "string") {
        message = (body as { error: string }).error;
      }
    } catch {
      // response wasn't JSON; keep the status-based message
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

// --- Types (mirror internal/models on the backend exactly) ---

export type PackagePhase = {
  id: string;
  packageId: string;
  phase: "step1" | "step2" | "funded";
  maxDailyLossPct?: string;
  maxTotalLossPct: string;
  profitTargetPct?: string;
  minTradingDays: number;
  sortOrder: number;
};

export type Package = {
  id: string;
  track: "instant" | "1step" | "2step";
  accountSizeBi2xusd: string;
  priceBi2xusd: string;
  leverageMaxFutures: number;
  phases: PackagePhase[];
};

export type Account = {
  id: string;
  userId: string;
  packageId: string;
  currentPhaseId: string;
  phase: "step1" | "step2" | "funded";
  status: "active" | "breached" | "passed" | "funded";
  balanceBi2xusd: string;
  equityBi2xusd: string;
  highWaterMark: string;
  startOfDayEquity: string;
  tradingDaysCount: number;
  lastTradingDay?: string;
  realAccountRef?: string;
  createdAt: string;
  updatedAt: string;
};

export type Trade = {
  id: string;
  accountId: string;
  symbol: string;
  market: "SPOT" | "FUTURES";
  side: "long" | "short";
  size: string;
  entryPrice: string;
  leverage: number;
  closePrice?: string;
  realizedPnl?: string;
  orderType: "market" | "limit" | "stop_loss" | "take_profit";
  triggerPrice?: string;
  status: "pending" | "open" | "closed" | "cancelled";
  openedAt?: string;
  closedAt?: string;
  createdAt: string;
};

export type MarketRow = {
  displaySymbol: string;
  symbol: string;
  market: "SPOT" | "FUTURES";
  baseCurrency: string;
  quoteCurrency: string;
  maxLeverage?: number;
  price?: string;
  change24hPct?: string;
  hasPrice: boolean;
  // PropFirm's own real, undiscounted taker fee rate for this market
  // (PROP_FIRM_PLAN.md section 11), as a percent string, e.g. "0.45".
  takerFeePct: string;
};

// --- Auth ---

export async function login(username: string, password: string) {
  const result = await request<{ token: string; username: string; userId: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setToken(result.token);
  return result;
}

export function logout() {
  clearToken();
}

// changePassword — POST /auth/change-password (authenticated). Verifies the
// current password server-side (bcrypt) before persisting the new one.
export function changePassword(currentPassword: string, newPassword: string) {
  return request<{ status: string }>("/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

// --- Packages (public, mainly useful for the exchange purchase page, but
// exposed here too so the prop firm site can show "what did I buy") ---
// listPackages is defined near the bottom of this file, together with its
// sessionStorage cache.

// --- Markets (real, currently-registered exchange markets + live prices,
// proxied through this backend — the browser never calls the exchange's
// matching-engine directly) ---

export function listMarkets() {
  return request<MarketRow[]>("/markets");
}

// --- Order book / recent trades (real depth from the exchange's own
// matching-engine, proxied for reference display — simulated evaluation
// orders never execute against this book, see PROP_FIRM_PLAN.md section
// 10 and the order-book design discussion) ---

export type DepthLevel = { price: string; size: string; total: string };

export type Depth = {
  symbol: string;
  market: string;
  bids: DepthLevel[];
  asks: DepthLevel[];
};

export function getDepth(symbol: string, market: string, levels = 12) {
  return request<Depth>(`/depth?symbol=${encodeURIComponent(symbol)}&market=${encodeURIComponent(market)}&levels=${levels}`);
}

export type RecentTrade = {
  id: string;
  symbol: string;
  market: string;
  price: string;
  quantity: string;
  side: "BUY" | "SELL";
  timestamp: number;
};

export function getRecentTrades(symbol: string, market: string, limit = 30) {
  return request<RecentTrade[]>(`/trades?symbol=${encodeURIComponent(symbol)}&market=${encodeURIComponent(market)}&limit=${limit}`);
}

// --- Accounts ---

export function listAccounts() {
  return request<Account[]>("/accounts");
}

// --- Trading (simulated evaluation-stage accounts only, per
// PROP_FIRM_PLAN.md section 10 — a funded/live account trades through the
// exchange's real order-placement path instead, not yet wired here) ---

export function openOrder(input: {
  accountId: string;
  symbol: string;
  market: "SPOT" | "FUTURES";
  side: "long" | "short";
  size: string;
  leverage: number;
  orderType: "market" | "limit";
  triggerPrice?: string;
}) {
  return request<Trade>("/trading/orders", { method: "POST", body: JSON.stringify(input) });
}

export function closeTrade(tradeId: string) {
  return request<{ status: string }>("/trading/close", { method: "POST", body: JSON.stringify({ tradeId }) });
}

export function cancelOrder(tradeId: string) {
  return request<{ status: string }>("/trading/cancel", { method: "POST", body: JSON.stringify({ tradeId }) });
}

export function getPositions(accountId: string) {
  return request<{ open: Trade[] | null; pending: Trade[] | null }>(
    `/trading/positions?accountId=${encodeURIComponent(accountId)}`,
  );
}
export function getHistory(accountId: string) {
  return request<Trade[] | null>(`/trading/history?accountId=${encodeURIComponent(accountId)}`);
}

// getTradingState fetches positions + pending orders + history in one call.
//
// This is what the trade screen's poll uses. It replaces calling
// getPositions() and getHistory() separately, which was two HTTP requests —
// each repeating the backend's ownership check — backed by four separate
// database statements per tick. Against a remote database every extra
// statement is a full round-trip of latency on a loop that runs every few
// seconds, so the server-side version collapses it to one request and two
// statements. The returned shape keeps the same "open"/"pending" keys as
// getPositions and adds "history", so callers read the same fields.
export function getTradingState(accountId: string) {
  return request<{ open: Trade[] | null; pending: Trade[] | null; history: Trade[] | null }>(
    `/trading/state?accountId=${encodeURIComponent(accountId)}`,
  );
}

// listPackages fetches the full package catalog. Packages are effectively
// static (they change only when admins edit them), but the catalog endpoint
// costs the backend two database round-trips on a remote Postgres — and it
// sat on the first-paint path of the trade/profile/evaluation pages, adding
// a second or more of blank "loading" time to every mount. So the result is
// cached in sessionStorage with a short TTL: instant on repeat visits within
// a session, at most one refetch per TTL window otherwise, and a force flag
// lets callers bypass it when they genuinely need fresh data.
const PACKAGES_CACHE_KEY = "propfirm-packages-cache";
const PACKAGES_CACHE_TTL_MS = 5 * 60 * 1000;

function readPackagesCache(): Package[] | null {
  try {
    const raw = window.sessionStorage.getItem(PACKAGES_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; packages: Package[] };
    if (!Array.isArray(parsed.packages) || typeof parsed.at !== "number") return null;
    if (Date.now() - parsed.at > PACKAGES_CACHE_TTL_MS) return null;
    return parsed.packages;
  } catch {
    return null;
  }
}

function writePackagesCache(packages: Package[]) {
  try {
    window.sessionStorage.setItem(PACKAGES_CACHE_KEY, JSON.stringify({ at: Date.now(), packages }));
  } catch {
    // storage full / private mode — caching is best-effort only
  }
}

export async function listPackages(force = false): Promise<Package[]> {
  if (!force) {
    const cached = readPackagesCache();
    if (cached) return cached;
  }
  const packages = await request<Package[]>("/packages");
  writePackagesCache(packages);
  return packages;
}

// getAccountAndPackages loads the trader's account and its package together,
// in parallel. The package read goes through the cache above, so on repeat
// visits this collapses to a single network call (GET /accounts).
//
// Both the trade page and the profile page need exactly this pair before
// they can render anything, and they used to fetch it as
// listAccounts() -> then listPackages(), one after the other. That made the
// package call's latency pure added waiting, even though neither call
// depends on the other's response — the package is only *matched* to the
// account afterwards, in memory. Issuing them concurrently removes one full
// round-trip from first paint.
//
// Returns account = null when the trader has no accounts (a valid state,
// not an error).
export async function getAccountAndPackages(): Promise<{ account: Account | null; pkg: Package | null }> {
  const [accounts, packages] = await Promise.all([listAccounts(), listPackages()]);
  const account = accounts[0] ?? null;
  const pkg = account ? packages.find(p => p.id === account.packageId) ?? null : null;
  return { account, pkg };
}
