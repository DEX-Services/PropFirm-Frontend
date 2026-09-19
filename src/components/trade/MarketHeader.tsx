import { TrendingUp, TrendingDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { MarketRow } from "@/lib/api";
import { toast } from "sonner";

// Visually ported from Dex New Frontend's MarketHeader.tsx (same glass bar,
// price block, stat chips) with the Swap / AI Agent / Bot buttons removed —
// PropFirm's trade page is evaluation/funded simulated trading only, none of
// those exchange-only features apply here (see task scope: no Swap, no AI
// Agent, no Bot/market-maker button). The Reset Layout button is kept since
// it's core panel-layout UI, not an excluded feature.
export function MarketHeader({
  selected,
  leverageMax,
  onResetLayout,
}: {
  selected: MarketRow | null;
  leverageMax: number;
  onResetLayout?: () => void;
}) {
  const price = selected?.price ? Number(selected.price) : null;
  const change = selected?.change24hPct ? Number(selected.change24hPct) : null;
  const positive = (change ?? 0) >= 0;

  return (
    <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-6 overflow-x-auto">
      <div className="flex items-center gap-2 min-w-fit">
        <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-xs text-primary-foreground shadow-glow-primary">
          {(selected?.baseCurrency ?? "--").slice(0, 3)}
        </div>
        <div>
          <div className="font-bold text-sm flex items-center gap-1.5">
            {selected?.displaySymbol ?? "Select a market"}
            {selected && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-secondary/20 text-secondary uppercase">
                {selected.market}
              </span>
            )}
          </div>
          <div className="text-[10px] text-muted-foreground">
            {selected ? `${selected.baseCurrency} / ${selected.quoteCurrency}` : "—"}
          </div>
        </div>
      </div>

      <div className="min-w-fit">
        <div className={cn("text-xl font-bold font-mono", positive ? "text-buy" : "text-sell")}>
          {selected?.hasPrice && price !== null ? `$${formatPrice(price)}` : "—"}
        </div>
        <div className={cn("text-[11px] font-mono flex items-center gap-1", positive ? "text-buy" : "text-sell")}>
          {change !== null && (positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />)}
          {change !== null ? `${positive ? "+" : ""}${change.toFixed(2)}% 24h` : "No 24h data yet"}
        </div>
      </div>

      <Stat label="Market" value={selected?.market ?? "—"} />
      <Stat label="Max Leverage" value={`${leverageMax}x`} />

      <div className="ml-auto flex items-center gap-2 min-w-fit">
        {onResetLayout && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              onResetLayout();
              toast.success("Layout reset to default");
            }}
            className="h-8 w-8 glass border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
            title="Reset trade layout"
            aria-label="Reset trade layout"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-fit">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="text-xs font-mono font-semibold">{value}</div>
    </div>
  );
}
