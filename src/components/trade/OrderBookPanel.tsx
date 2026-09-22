import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import type { MarketRow, Depth, RecentTrade } from "@/lib/api";
import { getDepth, getRecentTrades } from "@/lib/api";

// Ported from Dex New Frontend's order-book panel (src/pages/Index.tsx,
// the RightColumn's book/trades section) — same tab header, depth-bar
// gradient rows, and spread row. This is real order-book depth from the
// exchange's own matching-engine, proxied through BitDX Prop Firm's
// backend (GET /depth, GET /trades) — not synthesized and not a foreign
// market's data. It is shown for market reference only: simulated
// (evaluation-stage) orders never execute against this book, since they
// never touch the exchange's real order flow at all (see
// PROP_FIRM_PLAN.md section 10 — only a live/funded account would ever
// route real orders here, and that routing isn't built yet).
export function OrderBookPanel({
  selected,
  collapsed,
  onToggleCollapse,
}: {
  selected: MarketRow | null;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const [tab, setTab] = useState<"book" | "trades">("book");
  const [depth, setDepth] = useState<Depth | null>(null);
  const [trades, setTrades] = useState<RecentTrade[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selected) {
      setDepth(null);
      setTrades([]);
      return;
    }
    let cancelled = false;

    async function refresh() {
      try {
        if (tab === "book") {
          const d = await getDepth(selected!.symbol, selected!.market, 12);
          if (!cancelled) {
            setDepth(d);
            setError("");
          }
        } else {
          const t = await getRecentTrades(selected!.symbol, selected!.market, 30);
          if (!cancelled) {
            setTrades(t);
            setError("");
          }
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load");
      }
    }

    const timeoutId = window.setTimeout(refresh, 0);
    const interval = window.setInterval(refresh, 3000);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.clearInterval(interval);
    };
  }, [selected, tab]);

  const bids = (depth?.bids ?? []).slice(0, 10);
  const asks = (depth?.asks ?? []).slice(0, 10).reverse();
  const maxBidTotal = Math.max(1e-9, ...bids.map(b => Number(b.total)));
  const maxAskTotal = Math.max(1e-9, ...asks.map(a => Number(a.total)));
  const bestBid = bids[0] ? Number(bids[0].price) : null;
  const bestAsk = asks[asks.length - 1] ? Number(asks[asks.length - 1].price) : null;
  const spreadPct = bestBid && bestAsk ? ((bestAsk - bestBid) / bestAsk) * 100 : null;
  const midPrice = bestBid && bestAsk ? (bestBid + bestAsk) / 2 : null;

  return (
    <div className="glass h-full min-h-0 rounded-xl flex flex-col overflow-hidden">
      <div className="flex items-center border-b border-border/50 shrink-0 bg-background/20">
        <button
          onClick={() => setTab("book")}
          className={cn(
            "flex-1 px-3 py-2.5 text-xs font-semibold transition-colors",
            tab === "book" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground",
          )}
        >
          Order Book
        </button>
        <button
          onClick={() => setTab("trades")}
          className={cn(
            "flex-1 px-3 py-2.5 text-xs font-semibold transition-colors",
            tab === "trades" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground",
          )}
        >
          Trades
        </button>
        {selected && (
          <span
            className="mx-1 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide shrink-0 bg-emerald-500/15 text-emerald-400"
            title="Live order book, shown for market reference"
          >
            Live
          </span>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1 mr-1 rounded text-muted-foreground hover:text-primary hover:bg-muted/30 shrink-0"
          title={collapsed ? "Expand panel" : "Minimize panel"}
        >
          {collapsed ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {!selected ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-1 py-10 text-center text-xs text-muted-foreground">
            <span className="text-sm font-semibold text-foreground">Select a market</span>
            <span>Pick a market from the list to see its order book.</span>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-1 py-10 text-center text-xs text-sell px-4">
            <span className="text-sm font-semibold">Order book unavailable</span>
            <span>{error}</span>
          </div>
        ) : tab === "book" ? (
          <div className="flex-1 flex flex-col text-[10px] font-mono overflow-hidden min-h-0">
            <div className="grid grid-cols-3 gap-1 px-2 py-1 text-[9px] text-muted-foreground uppercase border-b border-border/50 shrink-0">
              <span>Price</span>
              <span className="text-right">Size</span>
              <span className="text-right">Total</span>
            </div>

            <div className="flex-1 flex flex-col-reverse overflow-hidden min-h-0">
              {asks.map((a, i) => {
                const depthPct = (Number(a.total) / maxAskTotal) * 100;
                return (
                  <div key={i} className="relative grid grid-cols-3 gap-1 px-2 flex-1 items-center hover:bg-muted/20 cursor-pointer">
                    <div
                      className="absolute inset-y-0 right-0 pointer-events-none"
                      style={{ width: `${depthPct}%`, background: "linear-gradient(to left, hsl(var(--sell)/0.45), hsl(var(--sell)/0.05))" }}
                    />
                    <span className="relative text-sell">{formatPrice(Number(a.price))}</span>
                    <span className="relative text-right">{Number(a.size).toFixed(3)}</span>
                    <span className="relative text-right text-muted-foreground">{Number(a.total).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="px-2 py-1 border-y border-border/50 flex items-center justify-between bg-muted/20 shrink-0">
              <span className="text-primary font-bold text-sm font-mono neon-text">{midPrice !== null ? formatPrice(midPrice) : "—"}</span>
              <span className="text-muted-foreground text-[9px]">{spreadPct !== null ? `Spread ${spreadPct.toFixed(3)}%` : "No spread yet"}</span>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
              {bids.map((b, i) => {
                const depthPct = (Number(b.total) / maxBidTotal) * 100;
                return (
                  <div key={i} className="relative grid grid-cols-3 gap-1 px-2 flex-1 items-center hover:bg-muted/20 cursor-pointer">
                    <div
                      className="absolute inset-y-0 right-0 pointer-events-none"
                      style={{ width: `${depthPct}%`, background: "linear-gradient(to left, hsl(var(--buy)/0.45), hsl(var(--buy)/0.05))" }}
                    />
                    <span className="relative text-buy">{formatPrice(Number(b.price))}</span>
                    <span className="relative text-right">{Number(b.size).toFixed(3)}</span>
                    <span className="relative text-right text-muted-foreground">{Number(b.total).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            {bids.length === 0 && asks.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs py-6">No resting orders on this book right now.</div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col text-[10px] font-mono overflow-y-auto min-h-0">
            <div className="grid grid-cols-3 gap-1 px-2 py-1 text-[9px] text-muted-foreground uppercase border-b border-border/50 shrink-0 sticky top-0 bg-background/40">
              <span>Price</span>
              <span className="text-right">Size</span>
              <span className="text-right">Time</span>
            </div>
            {trades.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs py-6">No recent trades.</div>
            ) : (
              trades.map(t => (
                <div key={t.id} className="grid grid-cols-3 gap-1 px-2 py-1 items-center">
                  <span className={t.side === "BUY" ? "text-buy" : "text-sell"}>{formatPrice(Number(t.price))}</span>
                  <span className="text-right">{Number(t.quantity).toFixed(3)}</span>
                  <span className="text-right text-muted-foreground">{new Date(t.timestamp).toLocaleTimeString()}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
