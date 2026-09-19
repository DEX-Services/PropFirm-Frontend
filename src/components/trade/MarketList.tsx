import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Bitcoin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
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
  collapsed,
  onToggleCollapse,
  mode,
  onModeChange,
}: {
  markets: MarketRow[];
  marketsError?: string;
  activeSymbol: string;
  activeMarket: "SPOT" | "FUTURES";
  onSelect: (m: MarketRow) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mode: "SPOT" | "FUTURES";
  onModeChange: (mode: "SPOT" | "FUTURES") => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = markets.filter(m => m.market === mode);
    if (query) list = list.filter(m => m.displaySymbol.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [markets, mode, query]);

  if (collapsed) {
    return (
      <div className="glass rounded-b-lg rounded-t-none flex h-full flex-col overflow-hidden items-center justify-start py-1.5 gap-1.5">
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded hover:bg-muted/30 text-muted-foreground hover:text-primary shrink-0"
          title="Expand market list"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <div className="h-px w-5 bg-border shrink-0" />
        <div className="flex flex-col items-center gap-1.5">
          <button className="p-1.5 rounded bg-primary/15 text-primary shrink-0" title="Crypto">
            <Bitcoin className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-b-xl rounded-t-none flex flex-col h-full overflow-hidden">
      <div className="px-3 py-2 border-b border-border/50 space-y-2">
        <div className="flex items-center gap-2 glass-strong px-2 py-1 rounded-md">
          <Search className="h-3 w-3 text-muted-foreground" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search..."
            className="h-6 border-0 bg-transparent p-0 text-xs focus-visible:ring-0"
          />
          <button
            onClick={onToggleCollapse}
            className="ml-auto p-0.5 rounded text-muted-foreground hover:text-primary hover:bg-muted/30"
            title="Collapse market list"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        </div>

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
