import { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  Gauge,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  X,
  Info,
  User,
  ArrowUpRight,
  Copy,
  Check,
  Waves,
  Flame,
  CalendarDays,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Account, Package, changePassword, getAccountAndPackages } from "@/lib/api";
import { cn } from "@/lib/utils";

const TRACK_LABELS: Record<string, string> = { instant: "Instant Funding", "1step": "1-Step Challenge", "2step": "2-Step Challenge" };
const PHASE_LABELS: Record<string, string> = { step1: "Step 1", step2: "Step 2", funded: "Funded (Live)" };
const STATUS_LABELS: Record<string, string> = { active: "Active", breached: "Breached", passed: "Passed — awaiting advance", funded: "Funded" };

// Account status, balance/equity, and per-phase risk rules — moved out of
// the trade page entirely (task requirement) and onto this dedicated
// /profile route instead, so the trade page stays pure trading UI.
//
// Redesigned layout: a gradient profile banner up top, a wide "balance at a
// glance" hero row, then a two-column body (account + equity cards on the
// left, rules + security on the right). The old "Need help? / Contact
// support" card was removed by design.
export default function ProfilePage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);

  useEffect(() => {
    getAccountAndPackages()
      .then(({ account: first, pkg: firstPkg }) => {
        setAccount(first);
        setPkg(firstPkg);
      })
      .catch(err => setError(err instanceof Error ? err.message : "Failed to load account"))
      .finally(() => setLoading(false));
  }, []);

  const track = account ? account.packageId.split("-")[0] : null;
  const accountSize = pkg ? Number(pkg.accountSizeBi2xusd) : null;
  const currentPhase = useMemo(() => pkg?.phases.find(p => p.id === account?.currentPhaseId) ?? null, [pkg, account]);

  const balance = account ? Number(account.balanceBi2xusd) : 0;
  const equity = account ? Number(account.equityBi2xusd) : 0;
  const pnl = account ? equity - accountSize : 0;
  const pnlPct = accountSize ? (pnl / accountSize) * 100 : 0;
  const dailyPnl = account ? equity - Number(account.startOfDayEquity) : 0;

  function copyAccountId() {
    if (!account) return;
    navigator.clipboard?.writeText(account.id).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  }

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-5">
        {error && <Banner>{error}</Banner>}
        {loading && (
          // Skeleton mirrors the real page structure, so when data lands the
          // layout doesn't jump — and the page never sits fully blank while
          // GET /accounts is in flight.
          <PageSkeleton />
        )}

        {account && (
          <>
            {/* ── Profile banner ── */}
            <div className="relative overflow-hidden rounded-2xl border border-glass-border bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-5 sm:p-6">
              <div className="absolute -top-16 -right-10 h-52 w-52 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

              <div className="relative flex flex-wrap items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30">
                  <User className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                      {track ? TRACK_LABELS[track] ?? track : "Prop Firm"} Trader
                    </h1>
                    <StatusChip status={account.status} />
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="font-mono">{account.id.slice(0, 12)}</span>
                    <button
                      onClick={copyAccountId}
                      className="p-0.5 rounded hover:text-primary hover:bg-primary/10 transition-colors"
                      title="Copy account ID"
                    >
                      {copied ? <Check className="h-3 w-3 text-buy" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Program</div>
                  <div className="text-sm font-bold">{track ? TRACK_LABELS[track] ?? track : "—"}</div>
                </div>
              </div>

              {/* Progress-to-target strip */}
              {currentPhase?.profitTargetPct && (
                <div className="relative mt-5">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-semibold text-muted-foreground">Progress to profit target</span>
                    <span className={cn("font-bold", pnl >= 0 ? "text-buy" : "text-sell")}>
                      {Math.max(0, Math.min(100, (pnl / (accountSize * (Number(currentPhase.profitTargetPct) / 100))) * 100)).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary transition-[width] duration-500"
                      style={{
                        width: `${Math.max(0, Math.min(100, (pnl / (accountSize * (Number(currentPhase.profitTargetPct) / 100))) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ── Balance hero row ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard icon={<Wallet className="h-4.5 w-4.5" />} label="Balance" value={`$${balance.toLocaleString()}`} accent="primary" />
              <StatCard icon={<Waves className="h-4.5 w-4.5" />} label="Equity" value={`$${equity.toLocaleString()}`} accent="primary" />
              <StatCard
                icon={<ArrowUpRight className="h-4.5 w-4.5" />}
                label="Overall P&L"
                value={`${pnl >= 0 ? "+" : ""}$${pnl.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                sub={`${pnlPct >= 0 ? "+" : ""}${pnlPct.toFixed(2)}%`}
                accent={pnl >= 0 ? "buy" : "sell"}
              />
              <StatCard
                icon={<Flame className="h-4.5 w-4.5" />}
                label="Today's P&L"
                value={`${dailyPnl >= 0 ? "+" : ""}$${dailyPnl.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                accent={dailyPnl >= 0 ? "buy" : "sell"}
              />
            </div>

            {/* ── Body ── */}
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <Panel>
                  <PanelHeading
                    icon={<Gauge className="h-4.5 w-4.5" />}
                    title="Account details"
                    subtitle="Your purchased BitDX Prop Firm account"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    <Tile label="Account size" value={accountSize ? `$${accountSize.toLocaleString()}` : "—"} />
                    <Tile label="Current phase" value={PHASE_LABELS[account.phase] ?? account.phase} highlight />
                    <Tile label="Trading days" value={`${account.tradingDaysCount}${currentPhase?.minTradingDays ? ` / ${currentPhase.minTradingDays}` : ""}`} />
                    <Tile label="High water mark" value={`$${Number(account.highWaterMark).toLocaleString()}`} mono />
                    <Tile label="Start-of-day equity" value={`$${Number(account.startOfDayEquity).toLocaleString()}`} mono />
                    <Tile label="Max leverage" value={pkg ? `${pkg.leverageMaxFutures}x` : "—"} />
                  </div>
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Your balance, equity, and phase are calculated and enforced entirely by the backend — nothing here is editable client-side.</span>
                  </div>
                </Panel>
              </div>

              <aside className="space-y-4">
                {currentPhase && (
                  <Panel>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Account rules
                    </span>
                    <h2 className="text-base font-bold mt-1 mb-3">{PHASE_LABELS[currentPhase.phase] ?? currentPhase.phase} limits</h2>
                    <div className="space-y-2 text-sm">
                      <RuleRow label="Max total loss" value={`${currentPhase.maxTotalLossPct}%`} />
                      <RuleRow label="Max daily loss" value={currentPhase.maxDailyLossPct ? `${currentPhase.maxDailyLossPct}%` : "No daily-loss rule"} />
                      <RuleRow label="Profit target" value={currentPhase.profitTargetPct ? `${currentPhase.profitTargetPct}%` : "None — funded"} />
                      <RuleRow label="Min trading days" value={String(currentPhase.minTradingDays || "None")} />
                      <RuleRow label="Max leverage" value={`${pkg?.leverageMaxFutures}x futures / 1x spot`} />
                    </div>
                    <p className="mt-3 flex items-start gap-1.5 text-[11px] text-muted-foreground">
                      <Info className="h-3 w-3 shrink-0 mt-0.5" />
                      These limits are enforced by the backend on every price tick — a breach force-closes your positions automatically.
                    </p>
                  </Panel>
                )}

              </aside>
            </div>

            {/* ── Footer settings bar: security + account metadata, kept out
                of the main content flow so the rules/details cards read as
                one uninterrupted column ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-glass-border bg-muted/10 px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>
                  Account created{" "}
                  <span className="font-semibold text-foreground">
                    {new Date(account.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </span>
              </div>
              <button
                onClick={() => setPwOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background/40 px-3 py-1.5 text-xs font-semibold hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all"
              >
                <KeyRound className="h-3.5 w-3.5 text-primary" /> Change password
              </button>
            </div>

            <ChangePasswordDialog open={pwOpen} onClose={() => setPwOpen(false)} />
          </>
        )}

        {!loading && !account && !error && (
          <Panel>
            <p className="text-sm text-muted-foreground">No BitDX Prop Firm account found for this login. Purchase a challenge on the BitDX exchange to get started.</p>
          </Panel>
        )}
      </div>
    </AppShell>
  );
}

function Banner({ children }: { children: React.ReactNode }) {
  return <Panel><p className="text-sm text-muted-foreground">{children}</p></Panel>;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-muted/40", className)} />;
}

function PageSkeleton() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-glass-border bg-muted/20 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-52" />
            <Skeleton className="h-3 w-36" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
        <Skeleton className="mt-5 h-2 w-full rounded-full" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map(i => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl border border-glass-border p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
      {children}
    </div>
  );
}

function PanelHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20 flex items-center justify-center shrink-0">
        {icon}
      </span>
      <div>
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent: "primary" | "buy" | "sell";
}) {
  const accentClasses = {
    primary: "text-primary from-primary/20 to-primary/5 ring-primary/20",
    buy: "text-buy from-buy/20 to-buy/5 ring-buy/20",
    sell: "text-sell from-sell/20 to-sell/5 ring-sell/20",
  }[accent];

  return (
    <div className="group glass rounded-2xl border border-glass-border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
      <div className="flex items-center gap-2.5">
        <span className={cn("h-9 w-9 rounded-xl bg-gradient-to-br ring-1 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105", accentClasses)}>
          {icon}
        </span>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      </div>
      <div className="mt-2 text-lg font-bold truncate">{value}</div>
      {sub && <div className={cn("text-[11px] font-semibold", accent === "buy" ? "text-buy" : accent === "sell" ? "text-sell" : "text-muted-foreground")}>{sub}</div>}
    </div>
  );
}

function Tile({ label, value, mono = false, highlight = false }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div className={cn("rounded-xl border px-3 py-2.5", highlight ? "border-primary/30 bg-primary/5" : "border-border/40 bg-muted/10")}>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={cn("mt-0.5 text-sm font-bold truncate", mono && "font-mono", highlight && "text-primary")}>{value}</div>
    </div>
  );
}

function RuleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/20 transition-colors">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}

function StatusChip({ status }: { status: Account["status"] }) {
  const active = status === "active" || status === "funded";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", active ? "bg-buy/15 text-buy" : "bg-muted text-muted-foreground")}>
      <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-buy animate-pulse" : "bg-muted-foreground")} />
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

// Change-password modal. Front-end complete: open/close, show/hide toggles,
// client-side validation (current required, min length, match check),
// submitting/success/error states. The actual API call is a deliberate
// placeholder — the backend endpoint doesn't exist yet. When it does, wire
// it up at the marked TODO (suggest POST /auth/change-password in api.ts).
const MIN_PASSWORD_LENGTH = 8;

function ChangePasswordDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  // Reset the form each time the dialog opens so a stale previous attempt
  // (or its success/error message) isn't shown on reopen.
  useEffect(() => {
    if (open) {
      setCurrent("");
      setNext("");
      setConfirm("");
      setShow(false);
      setFormError("");
      setSuccess(false);
      setSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  function validate(): string {
    if (!current) return "Enter your current password.";
    if (next.length < MIN_PASSWORD_LENGTH) return `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    if (next === current) return "New password must be different from the current one.";
    if (next !== confirm) return "New passwords don't match.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setFormError(problem);
      return;
    }
    setFormError("");
    setSubmitting(true);
    try {
      await changePassword(current, next);
      setSuccess(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to change password. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputType = show ? "text" : "password";
  const EyeIcon = show ? EyeOff : Eye;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={submitting ? undefined : onClose} />
      <div className="relative glass rounded-2xl border border-glass-border w-full max-w-md p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20 flex items-center justify-center shrink-0">
              <KeyRound className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-sm font-bold">Change password</h2>
              <p className="text-[11px] text-muted-foreground">Update your BitDX Prop Firm login</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors disabled:opacity-50"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {success ? (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-2 rounded-xl border border-buy/30 bg-buy/10 px-3 py-2.5 text-sm text-buy font-semibold">
              <Check className="h-4 w-4 shrink-0" /> Password changed successfully.
            </div>
            <button
              onClick={onClose}
              className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <PasswordField
              label="Current password"
              value={current}
              onChange={setCurrent}
              type={inputType}
              EyeIcon={EyeIcon}
              onToggleShow={() => setShow(s => !s)}
              autoFocus
            />
            <PasswordField
              label={`New password (min ${MIN_PASSWORD_LENGTH} characters)`}
              value={next}
              onChange={setNext}
              type={inputType}
              EyeIcon={EyeIcon}
              onToggleShow={() => setShow(s => !s)}
            />
            <PasswordField
              label="Confirm new password"
              value={confirm}
              onChange={setConfirm}
              type={inputType}
              EyeIcon={EyeIcon}
              onToggleShow={() => setShow(s => !s)}
            />

            {formError && (
              <div className="rounded-lg border border-sell/30 bg-sell/10 px-3 py-2 text-xs text-sell font-semibold">{formError}</div>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="flex-1 h-9 rounded-lg border border-border/50 text-sm font-semibold text-muted-foreground hover:bg-muted/30 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {submitting && <span className="h-3.5 w-3.5 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />}
                {submitting ? "Changing…" : "Change password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  type,
  EyeIcon,
  onToggleShow,
  autoFocus = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: "text" | "password";
  EyeIcon: typeof Eye;
  onToggleShow: () => void;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">{label}</span>
      <span className="relative block">
        <Input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          autoFocus={autoFocus}
          required
          className="h-9 pr-9 text-sm"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-primary transition-colors"
          title={type === "password" ? "Show password" : "Hide password"}
          tabIndex={-1}
        >
          <EyeIcon className="h-3.5 w-3.5" />
        </button>
      </span>
    </label>
  );
}
