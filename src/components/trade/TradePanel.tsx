import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Shield, Zap } from "lucide-react";
import type { Account, MarketRow, Package } from "@/lib/api";

type Side = "buy" | "sell";
type OrderType = "market" | "limit";

// Visually ported from Dex New Frontend's TradePanel.tsx: same Spot/Futures
// tab, Buy/Sell buttons with the buy/sell glow gradients, Market/Limit tab,
// Price(quote)/Mid field, adjustable leverage slider + presets, size slider
// + percent buttons, min-notional line, and order-summary card (order
// value, leverage, fee). Margin-mode (isolated/cross), the Options tab,
// TP/SL percent-linked inputs, and the "More order types" menu are dropped
// — the DEX version's margin/options machinery doesn't apply to PropFirm's
// simulated engine (POST /trading/orders takes a flat leverage number, no
// margin mode), and Options trading isn't part of this product at all (see
// PROP_FIRM_PLAN.md). TP/SL is left out of the submitted order for now (the
// backend's POST /trading/orders doesn't accept attached legs yet).
//
// Leverage: adjustable via slider + presets exactly like DEX's Isolated
// margin control, just capped at the package's max (up to 5x, per
// PROP_FIRM_PLAN.md section 7/12) instead of the exchange's per-market
// 100x — the package sets the ceiling, the trader can still dial anywhere
// from 1x up to it. No "Custom" leverage input (DEX's free-text override):
// with a ceiling this low, the slider already lands on every whole number
// in range, so a separate text box adds a control surface with nothing new
// to type. The size row's "Custom" percent button is dropped for the same
// reason: the four presets (25/50/75/100%) cover the full range.
//
// Fee: PropFirm charges the exchange's real, undiscounted taker fee on
// every simulated fill (section 11) — simengine actually deducts this from
// the account balance now, so the fee shown here is real, not a display
// estimate (see internal/simengine/fees.go on the backend).
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
  const [leverage, setLeverage] = useState(1);
  const [sizePct, setSizePct] = useState(25);
  const [sizeInput, setSizeInput] = useState("0.01");
  const [limitPrice, setLimitPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  const price = selected?.price ? Number(selected.price) : 0;
  const balance = Number(account.balanceBi2xusd);
  const leverageMax = mode === "SPOT" ? 1 : pkg.leverageMaxFutures;
  const isFutures = mode === "FUTURES";
  const effLeverage = isFutures ? leverage : 1;
  const longLabel = isFutures ? "Long" : "Buy";
  const shortLabel = isFutures ? "Short" : "Sell";
  const feeRate = selected?.takerFeePct ? Number(selected.takerFeePct) / 100 : 0;

  // Clamp the chosen leverage down whenever the package/market's ceiling is
  // lower than what's currently selected (e.g. switching from Futures back
  // to Spot, or between packages with different caps).
  useEffect(() => {
    setLeverage(l => Math.min(l, leverageMax));
  }, [leverageMax]);

  // Mirrors the DEX TradePanel's editedPriceRef: auto-follows the live
  // price until the user actually edits the field, then stops — a live
  // tick never clobbers an in-progress edit. Resets on symbol change so a
  // stale manual edit doesn't carry over to a newly selected market.
  const editedPriceRef = useRef(false);
  useEffect(() => {
    editedPriceRef.current = false;
  }, [selected?.symbol]);
  useEffect(() => {
    if (editedPriceRef.current) return;
    if (price > 0) setLimitPrice(price.toFixed(2));
  }, [price]);

  const spendable = balance * (sizePct / 100);
  const positionSize = price > 0 ? (spendable * effLeverage) / price : 0;
  const orderValue = positionSize * price;
  const fee = orderValue * feeRate;

  const handleSizePct = (pct: number) => {
    const next = Math.min(100, Math.max(1, pct));
    setSizePct(next);
    const usd = balance * (next / 100);
    setSizeInput(price > 0 ? ((usd * effLeverage) / price).toFixed(6) : usd.toFixed(2));
  };

  const setLeverageValue = (value: number) => {
    setLeverage(Math.round(Math.min(leverageMax, Math.max(1, value))));
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
        leverage: effLeverage,
        orderType,
        triggerPrice: orderType === "limit" ? limitPrice : undefined,
      });
      setNotice(orderType === "market" ? "Order filled." : "Order placed.");
      onOrderPlaced();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Order failed");
    } finally {
      setSubmitting(false);
    }
  }

  const leveragePresets = [1, 2, 3, 5].filter((l, i, arr) => l <= leverageMax && arr.indexOf(l) === i);
  if (leveragePresets[leveragePresets.length - 1] !== leverageMax) leveragePresets.push(leverageMax);

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
              <span>Price ({selected?.quoteCurrency ?? "—"})</span>
              <button
                onClick={() => { editedPriceRef.current = true; setLimitPrice(price ? price.toFixed(2) : ""); }}
                className="text-primary hover:underline font-medium"
              >
                Mid
              </button>
            </div>
            <Input
              value={limitPrice}
              onFocus={() => { editedPriceRef.current = true; }}
              onChange={e => { editedPriceRef.current = true; setLimitPrice(e.target.value); }}
              inputMode="decimal"
              className="h-9 rounded-lg font-mono text-sm bg-muted/30 border-border px-3"
            />
          </div>
        )}

        {isFutures ? (
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Leverage</span>
              <span className="text-xs font-mono text-foreground">{leverage}x <span className="text-muted-foreground">/ {leverageMax}x max</span></span>
            </div>
            <Slider
              value={[leverage]}
              min={1}
              max={leverageMax}
              step={1}
              onValueChange={v => setLeverageValue(v[0])}
              className="my-1 h-3"
            />
            <div className="mt-2 flex flex-wrap gap-1">
              {leveragePresets.map(l => (
                <button key={l} onClick={() => setLeverageValue(l)}
                  className={cn("h-8 min-w-[3.5rem] flex-1 text-[11px] rounded-md border transition-colors",
                    leverage === l
                      ? "border-primary bg-primary/20 text-primary shadow-[0_0_14px_hsl(var(--primary)/0.35)]"
                      : "border-border bg-muted/20 text-muted-foreground hover:text-foreground"
                  )}>{l}x</button>
              ))}
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">Capped by your package — see PROP_FIRM_PLAN.md.</p>
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
          <Slider value={[sizePct]} min={1} max={100} step={1} onValueChange={v => handleSizePct(v[0])} className="my-1 h-3" />
          <div className="grid grid-cols-4 gap-1 mt-1">
            {[25, 50, 75, 100].map(p => (
              <button key={p} onClick={() => handleSizePct(p)}
                className={cn("h-7 text-xs rounded-md transition-colors font-semibold",
                  sizePct === p ? "bg-primary/20 text-primary" : "bg-muted/30 text-muted-foreground hover:text-foreground"
                )}>{p}%</button>
            ))}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">Min. notional 1</div>
        </div>

        <div className="glass-strong rounded-lg border border-border/50 px-3 py-1.5 space-y-0.5">
          <Row label="Order value" value={price > 0 ? `$${orderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "—"} />
          {isFutures && (
            <Row
              label={<span className="flex items-center gap-1"><Shield className="h-3 w-3" />Leverage</span>}
              value={`${leverage}x`}
              valueClass="text-warning"
            />
          )}
          <Row
            label="Fee"
            value={selected?.takerFeePct ? `$${fee.toLocaleString(undefined, { maximumFractionDigits: 2 })} (${Number(selected.takerFeePct).toFixed(3)}%)` : "—"}
          />
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
              ? `${side === "buy" ? "Open Long" : "Open Short"} ${leverage}x`
              : `${side === "buy" ? "Buy" : "Sell"} ${selected?.baseCurrency ?? ""}`}
        </Button>

        {notice && <p className="text-xs text-center text-muted-foreground">{notice}</p>}

        <p className="text-[10px] text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
          Orders are filled by the BitDX Prop Firm simulated engine against the exchange's live price feed. The fee shown is the real, undiscounted exchange rate and is actually charged on fill.
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
