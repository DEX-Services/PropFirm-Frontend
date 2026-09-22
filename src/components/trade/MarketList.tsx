import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import type { MarketRow } from "@/lib/api";

// Visually identical port of Dex New Frontend's src/components/trade/
// MarketList.tsx (same glass panel, search box, Spot/Futures sub-tabs, row
// layout) — rewired to PropFirm's GET /markets rows (MarketRow) instead of
// the exchange's mock/live market feed. Only one asset class exists here
// (crypto), so the Crypto/Forex/Commodity/Stocks asset-tab row from the
// original is dropped entirely — there is nothing else to switch to.

export function MarketList({
  markets,
  marketsError,
  activeSymbol,
  activeMarket,
  onSelect,
  mode,
  onModeChange,
}: {
  markets: MarketRow[];
  marketsError?: string;
  activeSymbol: string;
  activeMarket: "SPOT" | "FUTURES";
  onSelect: (m: MarketRow) => void;
  mode: "SPOT" | "FUTURES";
  onModeChange: (mode: "SPOT" | "FUTURES") => void;
}) {
  const filtered = useMemo(() => markets.filter(m => m.market === mode), [markets, mode]);

  return (
    <div className="glass rounded-b-xl rounded-t-none flex flex-col h-full overflow-hidden">
      <div className="px-3 py-2 border-b border-border/50">
        <div className="flex items-center gap-1 flex-wrap">
          {(["SPOT", "FUTURES"] as const).map(k => (
            <button
              key={k}
              onClick={() => onModeChange(k)}
              className={cn(
                "px-2 py-0.5 text-[10px] rounded transition-colors",
                mode === k ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {k === "SPOT" ? "Spot" : "Futures"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-1 px-3 py-1.5 text-[10px] text-muted-foreground border-b border-border/50">
        <div className="col-span-7">Pair</div>
        <div className="col-span-5 text-right">Price / 24h</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {marketsError && (
          <div className="text-center text-xs text-sell py-8 px-3">{marketsError}</div>
        )}
        {!marketsError && filtered.length === 0 && (
          <div className="text-center text-xs text-muted-foreground py-8">No markets</div>
        )}
        {filtered.map(m => {
          const isActive = m.symbol === activeSymbol && m.market === activeMarket;
          const change = m.change24hPct ? Number(m.change24hPct) : null;
          const price = m.price ? Number(m.price) : null;
          return (
            <button
              key={`${m.symbol}-${m.market}`}
              onClick={() => onSelect(m)}
              className={cn(
                "w-full grid grid-cols-12 gap-1 px-3 py-1.5 text-xs items-center hover:bg-muted/30 transition-colors group",
                isActive && "bg-primary/10 border-l-2 border-l-primary"
              )}
            >
              <div className="col-span-7 flex items-center gap-1.5 min-w-0">
                <div className="h-5 w-5 rounded-full bg-gradient-primary flex items-center justify-center text-[8px] font-bold text-primary-foreground shrink-0">
                  {m.baseCurrency.slice(0, 3)}
                </div>
                <div className="text-left min-w-0">
                  <div className="font-semibold truncate">{m.displaySymbol}</div>
                </div>
              </div>
              <div className="col-span-5 text-right">
                <div className="font-mono text-[11px]">{m.hasPrice && price !== null ? formatPrice(price) : "—"}</div>
                <div className={cn("font-mono text-[10px]", change !== null ? (change >= 0 ? "text-buy" : "text-sell") : "text-muted-foreground")}>
                  {change !== null ? `${change >= 0 ? "+" : ""}${change.toFixed(2)}%` : "—"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
