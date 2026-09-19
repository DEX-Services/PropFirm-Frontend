import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { TrendingUp, TrendingDown, Shield, Zap } from "lucide-react";
import type { Account, MarketRow, Package } from "@/lib/api";

type Side = "buy" | "sell";
type OrderType = "market" | "limit";

// Visually ported from Dex New Frontend's TradePanel.tsx: same Spot/Futures
// tab, Buy/Sell buttons with the buy/sell glow gradients, Market/Limit tab,
// size slider, and order-summary card. Margin-mode (isolated/cross), the
// Options tab, TP/SL percent-linked inputs, and the "More order types" menu
// are dropped — the DEX version's margin/options machinery doesn't apply to
// PropFirm's simulated engine (POST /trading/orders takes a flat leverage
// number, no margin mode), and Options trading isn't part of this product
// at all (see PROP_FIRM_PLAN.md). TP/SL is left out of the submitted order
// for now (the backend's POST /trading/orders doesn't accept attached legs
// yet — see api.ts's openOrder signature) rather than silently degrading it
// into a second unlinked order; this is one of the "leave in, ask later" vs.
// "clearly doesn't apply" judgment calls the task allowed for.
export function TradePanel({
  selected,
  account,
  pkg,
  mode,
  onModeChange,
  onOrderPlaced,
}: {
  selected: MarketRow | null;
  account: Account;
  pkg: Package;
  mode: "SPOT" | "FUTURES";
  onModeChange: (mode: "SPOT" | "FUTURES") => void;
  onOrderPlaced: () => void;
}) {
  const [side, setSide] = useState<Side>("buy");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [sizePct, setSizePct] = useState(25);
  const [sizeInput, setSizeInput] = useState("0.01");
  const [triggerPrice, setTriggerPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  const price = selected?.price ? Number(selected.price) : 0;
  const balance = Number(account.balanceBi2xusd);
  const leverageMax = mode === "SPOT" ? 1 : pkg.leverageMaxFutures;
  const isFutures = mode === "FUTURES";
  const longLabel = isFutures ? "Long" : "Buy";
  const shortLabel = isFutures ? "Short" : "Sell";

  useEffect(() => {
    setTriggerPrice(price ? price.toFixed(2) : "");
  }, [selected?.symbol, price]);

  const spendable = balance * (sizePct / 100);
  const positionSize = price > 0 ? (spendable * leverageMax) / price : 0;

  const handleSizePct = (pct: number) => {
    const next = Math.min(100, Math.max(1, pct));
    setSizePct(next);
    const usd = balance * (next / 100);
    setSizeInput(price > 0 ? ((usd * leverageMax) / price).toFixed(6) : usd.toFixed(2));
  };

  async function submitOrder() {
    if (!selected) return;
    setSubmitting(true);
    setNotice("");
    try {
      const { openOrder } = await import("@/lib/api");
      await openOrder({
        accountId: account.id,
        symbol: selected.symbol,
        market: selected.market,
        side: side === "buy" ? "long" : "short",
        size: sizeInput || positionSize.toFixed(6),
        leverage: leverageMax,
        orderType,
        triggerPrice: orderType === "limit" ? triggerPrice : undefined,
      });
      setNotice(orderType === "market" ? "Order filled." : "Order placed.");
      onOrderPlaced();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Order failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="glass rounded-xl flex flex-col h-full overflow-y-auto overflow-x-hidden">
      <div className="px-3 pt-2.5">
        <Tabs value={mode} onValueChange={v => onModeChange(v as "SPOT" | "FUTURES")}>
          <TabsList className="grid grid-cols-2 h-8 bg-muted/30 w-full rounded-lg p-0.5">
            <TabsTrigger value="SPOT" className="h-7 text-xs font-semibold rounded-md">Spot</TabsTrigger>
            <TabsTrigger value="FUTURES" className="h-7 text-xs font-semibold rounded-md">Futures</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 gap-2 px-3 pt-2">
        <button onClick={() => setSide("buy")} className={cn(
          "h-9 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5",
          side === "buy" ? "bg-gradient-buy text-buy-foreground shadow-glow-buy" : "glass-strong text-muted-foreground hover:text-buy"
        )}>
          <TrendingUp className="h-3.5 w-3.5" /> {longLabel}
        </button>
        <button onClick={() => setSide("sell")} className={cn(
          "h-9 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5",
          side === "sell" ? "bg-gradient-sell text-sell-foreground shadow-glow-sell" : "glass-strong text-muted-foreground hover:text-sell"
        )}>
          <TrendingDown className="h-3.5 w-3.5" /> {shortLabel}
        </button>
      </div>

      <div className="px-3 pt-2">
        <Tabs value={orderType} onValueChange={v => setOrderType(v as OrderType)}>
          <TabsList className="grid grid-cols-2 h-8 bg-muted/30 w-full rounded-lg p-0.5">
            <TabsTrigger value="market" className="h-7 text-xs rounded-md">Market</TabsTrigger>
            <TabsTrigger value="limit" className="h-7 text-xs rounded-md">Limit</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-3 pt-2 pb-2 flex flex-col gap-2 flex-1 min-h-0">
        <Row label="Available" value={`$${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />

        {orderType === "limit" && (
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Trigger price ({selected?.quoteCurrency ?? "—"})</span>
              <button
                onClick={() => setTriggerPrice(price ? price.toFixed(2) : "")}
                className="text-primary hover:underline font-medium"
              >
                Mid
              </button>
            </div>
            <Input
              value={triggerPrice}
              onChange={e => setTriggerPrice(e.target.value)}
              inputMode="decimal"
              className="h-9 rounded-lg font-mono text-sm bg-muted/30 border-border px-3"
            />
          </div>
        )}

        {isFutures ? (
          <div className="rounded-md border border-border/50 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
            Leverage: <span className="font-mono text-foreground">{leverageMax}x max</span> (fixed by your package)
          </div>
        ) : (
          <div className="rounded-md border border-border/50 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Spot · 1x</span> — no leverage or liquidation price
          </div>
        )}

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Size</span>
            <span className="font-mono">{positionSize > 0 ? positionSize.toFixed(6) : sizeInput} {selected?.baseCurrency ?? ""}</span>
          </div>
          <div className="flex gap-1 mb-1">
            <Input
              value={sizeInput}
              onChange={e => setSizeInput(e.target.value)}
              inputMode="decimal"
              className="h-8 flex-1 rounded-md bg-muted/30 border-border font-mono text-xs"
              aria-label="Order size"
            />
            <div className="flex h-8 items-center rounded-md border border-border bg-muted/30 px-3 text-xs font-semibold text-foreground">
              {selected?.baseCurrency ?? "—"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 mt-1">
            {[25, 50, 75, 100].map(p => (
              <button key={p} onClick={() => handleSizePct(p)}
                className={cn("h-7 text-xs rounded-md transition-colors font-semibold",
                  sizePct === p ? "bg-primary/20 text-primary" : "bg-muted/30 text-muted-foreground hover:text-foreground"
                )}>{p}%</button>
            ))}
          </div>
        </div>

        <div className="glass-strong rounded-lg border border-border/50 px-3 py-1.5 space-y-0.5">
          <Row label="Order value" value={price > 0 ? `$${(positionSize * price).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "—"} />
          {isFutures && (
            <Row
              label={<span className="flex items-center gap-1"><Shield className="h-3 w-3" />Max leverage</span>}
              value={`${leverageMax}x`}
              valueClass="text-warning"
            />
          )}
        </div>

        <Button
          onClick={() => void submitOrder()}
          disabled={submitting || !selected}
          className={cn(
            "w-full h-8 rounded-lg font-bold text-sm mt-auto",
            side === "buy"
              ? "bg-gradient-buy text-buy-foreground hover:shadow-glow-buy"
              : "bg-gradient-sell text-sell-foreground hover:shadow-glow-sell"
          )}
        >
          <Zap className="h-3.5 w-3.5 mr-1.5" />
          {submitting
            ? "Submitting…"
            : isFutures
              ? `${side === "buy" ? "Open Long" : "Open Short"} ${leverageMax}x`
              : `${side === "buy" ? "Buy" : "Sell"} ${selected?.baseCurrency ?? ""}`}
        </Button>

        {notice && <p className="text-xs text-center text-muted-foreground">{notice}</p>}

        <p className="text-[10px] text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
          Orders are filled by the BitDX Prop Firm simulated engine against the exchange's live price feed.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = "" }: { label: React.ReactNode; value: React.ReactNode; valueClass?: string }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={cn("font-mono text-xs font-medium text-right", valueClass)}>{value}</span>
    </div>
  );
}
