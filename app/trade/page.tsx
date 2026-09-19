"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Clock3, Info, ShieldCheck, TrendingDown, TrendingUp, X } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { PropShell } from "../components/PropShell";
import { TradingViewChart } from "../components/TradingViewChart";
import {
  Account,
  Package,
  Trade,
  cancelOrder,
  closeTrade,
  getHistory,
  getPositions,
  listAccounts,
  listPackages,
  openOrder,
} from "../lib/api";

const PHASE_LABELS: Record<string, string> = { step1: "Step 1", step2: "Step 2", funded: "Funded (Live)" };

export default function TradePage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loadError, setLoadError] = useState("");

  const [marketMode, setMarketMode] = useState<"spot" | "futures">("futures");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [symbol, setSymbol] = useState("BTC-BI2XUSD");
  const [size, setSize] = useState("0.01");
  const [triggerPrice, setTriggerPrice] = useState("");
  const [positionTab, setPositionTab] = useState("Positions");
  const [notice, setNotice] = useState("");
  const [rulesOpen, setRulesOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [openTrades, setOpenTrades] = useState<Trade[]>([]);
  const [pendingTrades, setPendingTrades] = useState<Trade[]>([]);
  const [history, setHistory] = useState<Trade[]>([]);

  useEffect(() => {
    listAccounts()
      .then(async (accounts) => {
        const first = accounts[0] ?? null;
        setAccount(first);
        if (first) {
          const packages = await listPackages();
          setPkg(packages.find((p) => p.id === first.packageId) ?? null);
        }
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Failed to load account"));
  }, []);

  async function refreshPositions(accountId: string) {
    try {
      const [positions, tradeHistory] = await Promise.all([getPositions(accountId), getHistory(accountId)]);
      setOpenTrades(positions.open ?? []);
      setPendingTrades(positions.pending ?? []);
      setHistory(tradeHistory ?? []);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Failed to load positions");
    }
  }

  useEffect(() => {
    if (!account) return;
    const accountId = account.id;
    const tick = () => {
      void refreshPositions(accountId);
    };
    const timeoutId = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 5000);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.id]);

  const currentPhase = useMemo(() => pkg?.phases.find((p) => p.id === account?.currentPhaseId) ?? null, [pkg, account]);

  async function submitOrder() {
    if (!account) return;
    setSubmitting(true);
    setNotice("");
    try {
      await openOrder({
        accountId: account.id,
        symbol,
        market: marketMode === "spot" ? "SPOT" : "FUTURES",
        side: side === "buy" ? "long" : "short",
        size,
        leverage: marketMode === "spot" ? 1 : Math.min(pkg?.leverageMaxFutures ?? 5, 5),
        orderType,
        triggerPrice: orderType === "limit" ? triggerPrice : undefined,
      });
      setNotice(`${orderType === "market" ? "Order filled" : "Order placed"}.`);
      refreshPositions(account.id);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Order failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleClose(tradeId: string) {
    if (!account) return;
    try {
      await closeTrade(tradeId);
      refreshPositions(account.id);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Failed to close position");
    }
  }

  async function handleCancel(tradeId: string) {
    if (!account) return;
    try {
      await cancelOrder(tradeId);
      refreshPositions(account.id);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Failed to cancel order");
    }
  }

  if (loadError) {
    return (
      <PropShell active="trade">
        <main className="trade-page"><div className="empty-state"><strong>{loadError}</strong></div></main>
      </PropShell>
    );
  }

  if (!account || !pkg) {
    return (
      <PropShell active="trade">
        <main className="trade-page"><div className="empty-state"><strong>Loading your account…</strong></div></main>
      </PropShell>
    );
  }

  const track = pkg.track;
  const trackLabel = track === "instant" ? "Instant Funding" : track === "1step" ? "1-Step Challenge" : "2-Step Challenge";

  return (
    <PropShell active="trade">
      <main className="trade-page">
        <section className="instrument-strip" aria-label="Selected market and account status">
          <div className="instrument-primary"><span className="asset-icon instrument-icon">{symbol.slice(0, 3)}</span><span><strong>{symbol}</strong><small>{marketMode === "spot" ? "SPOT" : "FUTURES"}</small></span></div>
          <div className="instrument-stat"><span>ACCOUNT</span><strong>{trackLabel}</strong><small>{PHASE_LABELS[account.phase] ?? account.phase}</small></div>
          <div className="instrument-stat"><span>MAX LEVERAGE</span><strong>{marketMode === "spot" ? "1x" : `${pkg.leverageMaxFutures}x`}</strong><small>Server enforced</small></div>
          <div className="instrument-stat"><span>STATUS</span><strong className={account.status === "breached" ? "negative" : "positive"}>{account.status}</strong></div>
          <button className="rule-toggle" onClick={() => setRulesOpen((value) => !value)}><ShieldCheck size={16} /> Account Rules <ChevronDown size={14} /></button>
        </section>

        {rulesOpen && currentPhase && (
          <section className="rules-panel" aria-label="Account rules">
            <div className="rules-heading"><span><ShieldCheck size={17} /><strong>{PHASE_LABELS[currentPhase.phase]} rules</strong></span><button onClick={() => setRulesOpen(false)} aria-label="Close account rules"><X size={17} /></button></div>
            <div className="rules-grid">
              <div><span>MAX TOTAL LOSS</span><strong>{currentPhase.maxTotalLossPct}%</strong></div>
              <div><span>MAX DAILY LOSS</span><strong>{currentPhase.maxDailyLossPct ? `${currentPhase.maxDailyLossPct}%` : "No daily-loss rule at this phase"}</strong></div>
              <div><span>PROFIT TARGET</span><strong>{currentPhase.profitTargetPct ? `${currentPhase.profitTargetPct}%` : "None — funded account"}</strong></div>
              <div><span>MIN TRADING DAYS</span><strong>{currentPhase.minTradingDays || "None"}</strong></div>
              <div><span>MAXIMUM LEVERAGE</span><strong>{pkg.leverageMaxFutures}x (futures) / 1x (spot)</strong></div>
            </div>
            <p><Info size={14} /> These rules are enforced by the backend on every price tick — a breach here force-closes your positions automatically.</p>
          </section>
        )}

        <section className="metrics-strip" aria-label="Account metrics">
          <div className="metric"><span>BALANCE</span><strong>${Number(account.balanceBi2xusd).toLocaleString()}</strong></div>
          <div className="metric"><span>EQUITY</span><strong>${Number(account.equityBi2xusd).toLocaleString()}</strong></div>
          <div className="metric"><span>HIGH WATER MARK</span><strong>${Number(account.highWaterMark).toLocaleString()}</strong></div>
          <div className="metric"><span>TRADING DAYS</span><strong>{account.tradingDaysCount}{currentPhase?.minTradingDays ? ` / ${currentPhase.minTradingDays}` : ""}</strong></div>
        </section>

        <PanelGroup direction="horizontal" className="terminal-grid">
          <Panel defaultSize={83} minSize={44}>
          <div className="terminal-center">
            <section className="panel chart-panel">
              <div className="chart-titlebar"><span>TRADINGVIEW CHART</span><span>Live market data</span></div>
              <TradingViewChart symbol={symbol.split("-")[0]} />
            </section>

            <section className="panel positions-panel">
              <div className="position-tabs">
                {["Positions", "Open Orders", "Trade History"].map((tab) => (
                  <button className={positionTab === tab ? "active" : ""} key={tab} onClick={() => setPositionTab(tab)}>
                    {tab}
                    <span>{tab === "Positions" ? String(openTrades.length) : tab === "Open Orders" ? String(pendingTrades.length) : ""}</span>
                  </button>
                ))}
              </div>

              {positionTab === "Positions" && (
                openTrades.length > 0 ? (
                  <div className="table-scroll"><table><thead><tr><th>Market</th><th>Side</th><th>Size</th><th>Entry</th><th>Action</th></tr></thead><tbody>
                    {openTrades.map((t) => (
                      <tr key={t.id}>
                        <td><strong>{t.symbol}</strong><small>{t.market} · {t.leverage}x</small></td>
                        <td><span className={`status-chip ${t.side === "long" ? "long" : "short"}`}>{t.side === "long" ? "Long" : "Short"}</span></td>
                        <td>{t.size}</td>
                        <td>{t.entryPrice}</td>
                        <td><button className="close-button" onClick={() => handleClose(t.id)}>Close</button></td>
                      </tr>
                    ))}
                  </tbody></table></div>
                ) : <div className="empty-state"><Clock3 size={22} /><strong>No open positions</strong><span>Your open positions will appear here.</span></div>
              )}

              {positionTab === "Open Orders" && (
                pendingTrades.length > 0 ? (
                  <div className="table-scroll"><table><thead><tr><th>Market</th><th>Side</th><th>Type</th><th>Trigger</th><th>Action</th></tr></thead><tbody>
                    {pendingTrades.map((t) => (
                      <tr key={t.id}>
                        <td><strong>{t.symbol}</strong><small>{t.market}</small></td>
                        <td className={t.side === "long" ? "positive" : "negative"}>{t.side}</td>
                        <td>{t.orderType}</td>
                        <td>{t.triggerPrice}</td>
                        <td><button className="close-button" onClick={() => handleCancel(t.id)}>Cancel</button></td>
                      </tr>
                    ))}
                  </tbody></table></div>
                ) : <div className="empty-state"><Clock3 size={22} /><strong>No open orders</strong><span>Limit, stop-loss, and take-profit orders will appear here.</span></div>
              )}

              {positionTab === "Trade History" && (
                history.length > 0 ? (
                  <div className="table-scroll"><table><thead><tr><th>Market</th><th>Side</th><th>Entry</th><th>Close</th><th>Realized PnL</th></tr></thead><tbody>
                    {history.map((t) => (
                      <tr key={t.id}>
                        <td><strong>{t.symbol}</strong></td>
                        <td className={t.side === "long" ? "positive" : "negative"}>{t.side}</td>
                        <td>{t.entryPrice}</td>
                        <td>{t.closePrice ?? "—"}</td>
                        <td className={Number(t.realizedPnl ?? 0) >= 0 ? "positive" : "negative"}>{t.realizedPnl ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody></table></div>
                ) : <div className="empty-state"><Clock3 size={22} /><strong>No trade history</strong><span>Closed positions will appear here.</span></div>
              )}
            </section>
          </div>
          </Panel>

          <PanelResizeHandle className="panel-resize-handle" aria-label="Resize chart and order entry"><i /></PanelResizeHandle>

          <Panel defaultSize={17} minSize={15} maxSize={30}>
          <aside className="panel order-panel">
            <div className="product-tabs">
              <button className={marketMode === "spot" ? "active" : ""} onClick={() => setMarketMode("spot")}>Spot</button>
              <button className={marketMode === "futures" ? "active" : ""} onClick={() => setMarketMode("futures")}>Futures</button>
            </div>
            <div className="side-tabs">
              <button className={side === "buy" ? "buy active" : ""} onClick={() => setSide("buy")}><TrendingUp size={15} /> {marketMode === "spot" ? "Buy" : "Buy / Long"}</button>
              <button className={side === "sell" ? "sell active" : ""} onClick={() => setSide("sell")}><TrendingDown size={15} /> {marketMode === "spot" ? "Sell" : "Sell / Short"}</button>
            </div>
            <div className="order-type-tabs">
              <button className={orderType === "market" ? "active" : ""} onClick={() => setOrderType("market")}>Market</button>
              <button className={orderType === "limit" ? "active" : ""} onClick={() => setOrderType("limit")}>Limit</button>
            </div>
            <div className="trade-field"><label>Symbol</label><div><input value={symbol} onChange={(event) => setSymbol(event.target.value)} placeholder="BTC-BI2XUSD" /></div></div>
            {orderType === "limit" && <div className="trade-field"><label>Trigger price</label><div><input inputMode="decimal" value={triggerPrice} onChange={(event) => setTriggerPrice(event.target.value)} /></div></div>}
            <div className="trade-field"><label>Size</label><div><input inputMode="decimal" value={size} onChange={(event) => setSize(event.target.value)} /></div></div>
            {marketMode === "futures" ? (
              <div className="order-inline"><span>Leverage: {pkg.leverageMaxFutures}x max</span></div>
            ) : (
              <div className="spot-mode-note"><strong>Spot · 1x</strong><span>No leverage or liquidation price</span></div>
            )}
            <button className={side === "buy" ? "submit-order buy" : "submit-order sell"} onClick={submitOrder} disabled={submitting}>
              {side === "buy" ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              {submitting ? "Submitting…" : side === "buy" ? `Buy ${symbol.split("-")[0]}` : `Sell ${symbol.split("-")[0]}`}
            </button>
            <p className="order-disclaimer">Orders are filled by the BitDX Prop Firm simulated engine against the exchange&apos;s live price feed — see PROP_FIRM_PLAN.md.</p>
          </aside>
          </Panel>
        </PanelGroup>
      </main>
      {notice && <div className="toast">{notice}</div>}
    </PropShell>
  );
}
