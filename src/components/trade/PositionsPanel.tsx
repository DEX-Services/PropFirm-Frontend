import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { Clock3 } from "lucide-react";
import type { Trade } from "@/lib/api";

// Visually ported from Dex New Frontend's PositionsPanel.tsx — same glass
// panel, tab bar (data-[state=active] primary highlight), and monospace
// table rows. The Bot/AI Agent, Funding History, and Realized PnL tabs are
// dropped (no bots, no funding, and PnL is on realized trades directly here)
// since PropFirm's simulated engine has no equivalent concepts — replaced
// with the three tabs the task explicitly asked to keep: Positions, Open
// Orders, and Trade History, sourced from GET /trading/positions and
// GET /trading/history.
export function PositionsPanel({
  openTrades,
  pendingTrades,
  history,
  onClose,
  onCancel,
  closingId,
}: {
  openTrades: Trade[];
  pendingTrades: Trade[];
  history: Trade[];
  onClose: (tradeId: string) => void;
  onCancel: (tradeId: string) => void;
  closingId: string | null;
}) {
  return (
    <div className="glass rounded-b-xl rounded-t-none h-full flex flex-col overflow-hidden">
      <Tabs defaultValue="positions" className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border/50 px-3">
          <div className="min-w-0 flex-1 overflow-x-auto scrollbar-none">
            <TabsList className="h-9 w-max bg-transparent p-0 gap-1">
              <TabsTrigger value="positions" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs h-7">
                Positions <span className="ml-1.5 px-1.5 py-0.5 rounded bg-primary/20 text-[10px]">{openTrades.length}</span>
              </TabsTrigger>
              <TabsTrigger value="openOrders" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs h-7">
                Open Orders <span className="ml-1.5 px-1.5 py-0.5 rounded bg-muted text-[10px]">{pendingTrades.length}</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs h-7">
                Trade History
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="positions" className="flex-1 overflow-auto m-0">
          {openTrades.length === 0 ? (
            <EmptyState text="No open positions" hint="Your open positions will appear here." />
          ) : (
            <table className="w-full text-[11px] font-mono">
              <thead className="text-[10px] text-muted-foreground uppercase">
                <tr className="border-b border-border/50">
                  <th className="text-left px-3 py-1.5">Symbol</th>
                  <th className="text-left">Side</th>
                  <th className="text-right">Size</th>
                  <th className="text-right">Entry</th>
                  <th className="text-right pr-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {openTrades.map(t => (
                  <tr key={t.id} className="border-b border-border/30 hover:bg-muted/20">
                    <td className="px-3 py-2 font-sans font-semibold">{t.symbol} <span className="text-[9px] text-muted-foreground">{t.market} · {t.leverage}x</span></td>
                    <td className={t.side === "long" ? "text-buy" : "text-sell"}>{t.side.toUpperCase()}</td>
                    <td className="text-right">{t.size}</td>
                    <td className="text-right">{formatPrice(Number(t.entryPrice))}</td>
                    <td className="text-right pr-3">
                      <Button size="sm" variant="ghost" disabled={closingId === t.id}
                        className="h-6 text-[10px] text-sell hover:bg-sell/10 disabled:opacity-50"
                        onClick={() => onClose(t.id)}>
                        {closingId === t.id ? "Closing…" : "Close"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TabsContent>

        <TabsContent value="openOrders" className="flex-1 overflow-auto m-0">
          {pendingTrades.length === 0 ? (
            <EmptyState text="No open orders" hint="Limit orders will appear here." />
          ) : (
            <table className="w-full text-[11px] font-mono">
              <thead className="text-[10px] text-muted-foreground uppercase">
                <tr className="border-b border-border/50">
                  <th className="text-left px-3 py-1.5">Symbol</th>
                  <th className="text-left">Side</th>
                  <th className="text-left">Type</th>
                  <th className="text-right">Trigger</th>
                  <th className="text-right pr-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingTrades.map(t => (
                  <tr key={t.id} className="border-b border-border/30 hover:bg-muted/20">
                    <td className="px-3 py-2 font-sans font-semibold">{t.symbol} <span className="text-[9px] text-muted-foreground">{t.market}</span></td>
                    <td className={t.side === "long" ? "text-buy" : "text-sell"}>{t.side.toUpperCase()}</td>
                    <td className="text-muted-foreground">{t.orderType}</td>
                    <td className="text-right">{t.triggerPrice ? formatPrice(Number(t.triggerPrice)) : "—"}</td>
                    <td className="text-right pr-3">
                      <Button size="sm" variant="ghost"
                        className="h-6 text-[10px] text-sell hover:bg-sell/10"
                        onClick={() => onCancel(t.id)}>
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TabsContent>

        <TabsContent value="history" className="flex-1 overflow-auto m-0">
          {history.length === 0 ? (
            <EmptyState text="No trade history" hint="Closed positions will appear here." />
          ) : (
            <table className="w-full text-[11px] font-mono">
              <thead className="text-[10px] text-muted-foreground uppercase">
                <tr className="border-b border-border/50">
                  <th className="text-left px-3 py-1.5">Symbol</th>
                  <th className="text-left">Side</th>
                  <th className="text-right">Entry</th>
                  <th className="text-right">Close</th>
                  <th className="text-right pr-3">Realized PnL</th>
                </tr>
              </thead>
              <tbody>
                {history.map(t => {
                  const pnl = Number(t.realizedPnl ?? 0);
                  return (
                    <tr key={t.id} className="border-b border-border/30 hover:bg-muted/20">
                      <td className="px-3 py-2 font-sans font-semibold">{t.symbol}</td>
                      <td className={t.side === "long" ? "text-buy" : "text-sell"}>{t.side.toUpperCase()}</td>
                      <td className="text-right">{formatPrice(Number(t.entryPrice))}</td>
                      <td className="text-right">{t.closePrice ? formatPrice(Number(t.closePrice)) : "—"}</td>
                      <td className={cn("text-right pr-3 font-bold", pnl >= 0 ? "text-buy" : "text-sell")}>
                        {t.realizedPnl ? `${pnl >= 0 ? "+" : ""}$${pnl.toFixed(2)}` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ text, hint }: { text: string; hint: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-1 py-10 text-center text-xs text-muted-foreground">
      <Clock3 className="h-5 w-5 mb-1 opacity-50" />
      <span className="text-sm font-semibold text-foreground">{text}</span>
      <span>{hint}</span>
    </div>
  );
}
