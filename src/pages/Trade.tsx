import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle, type ImperativePanelHandle } from "react-resizable-panels";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, GripVertical } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MarketHeader } from "@/components/trade/MarketHeader";
import { MarketList } from "@/components/trade/MarketList";
import { TradingChart } from "@/components/trade/TradingChart";
import { TradePanel } from "@/components/trade/TradePanel";
import { OrderBookPanel } from "@/components/trade/OrderBookPanel";
import { PositionsPanel } from "@/components/trade/PositionsPanel";
import { cn } from "@/lib/utils";
import {
  Account,
  MarketRow,
  Package,
  Trade,
  cancelOrder,
  closeTrade,
  getAccountAndPackages,
  getTradingState,
  listMarkets,
} from "@/lib/api";

// Ported panel layout from Dex New Frontend's src/pages/Index.tsx: the same
// three-column PanelGroup (Markets | Chart+Positions | Trade) with resize
// handles, wrapped in the identical DraggableCard title-bar chrome (minus
// drag-to-swap, which the DEX version uses to let panels trade places — not
// reimplemented here since PropFirm has no need for it yet and it isn't
// part of "make it exactly the same" visually; the panel structure, sizing,
// and glass styling are what's visually load-bearing). Panel content is
// PropFirm's own trade components wired to the real backend instead of the
// exchange's mock/live market data + matching engine.
const DEFAULT_COL_SIZES = [16, 62, 22];
const DEFAULT_CENTER_SIZES = [65, 35];
const COLLAPSED_LEFT_SIZE = 3;
const COLLAPSED_BOTTOM_SIZE = 3;

function PanelTitleBar({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="h-5 glass-strong border-b border-border/40 flex items-center px-2 shrink-0 select-none">
      <GripVertical className="h-3 w-3 text-muted-foreground mr-1" />
      <span className="text-[9px] text-muted-foreground uppercase tracking-wide">{title}</span>
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}

// Chevron toggle rendered in a panel's title bar. Vertical panels (Positions,
// Order Book) collapse downward, so the expanded state points down and the
// collapsed state points up — mirroring the Markets panel's left/right pair.
function CollapseToggle({
  collapsed,
  direction,
  onToggle,
}: {
  collapsed: boolean;
  direction: "horizontal" | "vertical";
  onToggle: () => void;
}) {
  const Chevron = direction === "vertical" ? (collapsed ? ChevronUp : ChevronDown) : collapsed ? ChevronRight : ChevronLeft;
  return (
    <button
      onClick={onToggle}
      className="p-0.5 rounded text-muted-foreground hover:text-primary hover:bg-muted/30"
      title={collapsed ? "Expand panel" : "Minimize panel"}
    >
      <Chevron className="h-3 w-3" />
    </button>
  );
}

function PanelCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      <PanelTitleBar title={title} action={action} />
      <div className="relative flex-1 min-h-0">
        <div className="absolute inset-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export default function TradePage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loadError, setLoadError] = useState("");

  const [markets, setMarkets] = useState<MarketRow[]>([]);
  const [marketsError, setMarketsError] = useState("");
  const [mode, setMode] = useState<"SPOT" | "FUTURES">("FUTURES");
  const [selected, setSelected] = useState<MarketRow | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const [openTrades, setOpenTrades] = useState<Trade[]>([]);
  const [pendingTrades, setPendingTrades] = useState<Trade[]>([]);
  const [history, setHistory] = useState<Trade[]>([]);
  const [closingId, setClosingId] = useState<string | null>(null);

  const leftPanelRef = useRef<ImperativePanelHandle>(null);
  // Remembers the panel's pre-collapse width so expanding restores it.
  const leftPanelSizeRef = useRef(DEFAULT_COL_SIZES[0]);
  const posPanelSizeRef = useRef(DEFAULT_CENTER_SIZES[1]);
  const obPanelSizeRef = useRef(40);
  const [posCollapsed, setPosCollapsed] = useState(false);
  const [obCollapsed, setObCollapsed] = useState(false);
  const centerPanelRef = useRef<ImperativePanelHandle>(null);
  const rightPanelRef = useRef<ImperativePanelHandle>(null);
  const obPanelRef = useRef<ImperativePanelHandle>(null);
  const chartPanelRef = useRef<ImperativePanelHandle>(null);
  const posPanelRef = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    // Account + package are fetched concurrently rather than in sequence:
    // the page blocks first paint until both arrive, and neither depends on
    // the other's response, so serialising them just added a redundant
    // round-trip to the loading screen.
    getAccountAndPackages()
      .then(({ account: first, pkg: firstPkg }) => {
        setAccount(first);
        setPkg(firstPkg);
      })
      .catch(err => setLoadError(err instanceof Error ? err.message : "Failed to load account"));
  }, []);

  const refreshMarkets = useCallback(async () => {
    try {
      const rows = await listMarkets();
      setMarkets(rows);
      setMarketsError("");
      setSelected(current => {
        if (current) {
          const updated = rows.find(m => m.symbol === current.symbol && m.market === current.market);
          if (updated) return updated;
        }
        return rows.find(m => m.market === mode) ?? rows[0] ?? null;
      });
    } catch (err) {
      setMarketsError(err instanceof Error ? err.message : "Failed to load markets");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(refreshMarkets, 0);
    const interval = window.setInterval(refreshMarkets, 5000);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(interval);
    };
  }, [refreshMarkets]);

  const refreshPositions = useCallback(async (accountId: string) => {
    try {
      // One request instead of two (positions + history). Both used to
      // re-run the ownership check and issue separate queries; the combined
      // endpoint returns all three lists from two database statements.
      const state = await getTradingState(accountId);
      setOpenTrades(state.open ?? []);
      setPendingTrades(state.pending ?? []);
      setHistory(state.history ?? []);
    } catch {
      // Keep the last known list on a transient error rather than blanking
      // the panel — matches the polling pattern used elsewhere in this app.
    }
  }, []);

  useEffect(() => {
    if (!account) return;
    const accountId = account.id;
    const tick = () => void refreshPositions(accountId);
    const timeoutId = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 5000);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.id, refreshPositions]);

  function selectMode(next: "SPOT" | "FUTURES") {
    setMode(next);
    const found = markets.find(m => m.market === next);
    if (found) setSelected(found);
  }

  async function handleClose(tradeId: string) {
    if (!account) return;
    setClosingId(tradeId);
    try {
      await closeTrade(tradeId);
      await refreshPositions(account.id);
    } finally {
      setClosingId(null);
    }
  }

  async function handleCancel(tradeId: string) {
    if (!account) return;
    await cancelOrder(tradeId);
    await refreshPositions(account.id);
  }

  // Resize the Markets panel when collapsed/expanded — like the DEX
  // original, collapsing shrinks the panel to a slim strip rather than
  // leaving it at full width with only icons inside.
  useEffect(() => {
    const panel = leftPanelRef.current;
    if (!panel) return;
    if (collapsed) {
      const currentSize = panel.getSize?.();
      if (typeof currentSize === "number" && Number.isFinite(currentSize)) {
        leftPanelSizeRef.current = currentSize;
      }
      panel.resize(COLLAPSED_LEFT_SIZE);
    } else {
      panel.resize(leftPanelSizeRef.current || DEFAULT_COL_SIZES[0]);
    }
  }, [collapsed]);

  // Same collapse-to-a-slim-strip behavior for the vertical Positions panel:
  // minimizing shrinks it so the chart gets the space; expanding restores
  // its previous height.
  useEffect(() => {
    const panel = posPanelRef.current;
    if (!panel) return;
    if (posCollapsed) {
      const currentSize = panel.getSize?.();
      if (typeof currentSize === "number" && Number.isFinite(currentSize)) {
        posPanelSizeRef.current = currentSize;
      }
      panel.resize(COLLAPSED_BOTTOM_SIZE);
    } else {
      panel.resize(posPanelSizeRef.current || DEFAULT_CENTER_SIZES[1]);
    }
  }, [posCollapsed]);

  useEffect(() => {
    const panel = obPanelRef.current;
    if (!panel) return;
    if (obCollapsed) {
      const currentSize = panel.getSize?.();
      if (typeof currentSize === "number" && Number.isFinite(currentSize)) {
        obPanelSizeRef.current = currentSize;
      }
      panel.resize(COLLAPSED_BOTTOM_SIZE);
    } else {
      panel.resize(obPanelSizeRef.current || 40);
    }
  }, [obCollapsed]);

  const resetLayout = useCallback(() => {
    setCollapsed(false);
    setPosCollapsed(false);
    setObCollapsed(false);
    leftPanelSizeRef.current = DEFAULT_COL_SIZES[0];
    posPanelSizeRef.current = DEFAULT_CENTER_SIZES[1];
    obPanelSizeRef.current = 40;
    leftPanelRef.current?.resize?.(DEFAULT_COL_SIZES[0]);
    centerPanelRef.current?.resize?.(DEFAULT_COL_SIZES[1]);
    rightPanelRef.current?.resize?.(DEFAULT_COL_SIZES[2]);
    chartPanelRef.current?.resize?.(DEFAULT_CENTER_SIZES[0]);
    posPanelRef.current?.resize?.(DEFAULT_CENTER_SIZES[1]);
  }, []);

  const leverageMax = useMemo(() => {
    if (!pkg) return 1;
    return selected?.market === "SPOT" ? 1 : pkg.leverageMaxFutures;
  }, [pkg, selected?.market]);

  if (loadError) {
    return (
      <AppShell isTradePage>
        <div className="h-full flex items-center justify-center p-6 text-center text-sm text-sell">{loadError}</div>
      </AppShell>
    );
  }

  if (!account || !pkg) {
    // Skeleton in the real panel layout, not a blank screen: the trade page
    // used to show only "Loading your account…" until GET /accounts (plus
    // the cached GET /packages) resolved, which on a remote database meant
    // seconds of empty page on every mount/refresh.
    return (
      <AppShell isTradePage>
        <div className="h-[calc(100vh-3.5rem)] flex flex-col gap-2 p-2 overflow-hidden">
          <div className="h-14 rounded-xl animate-pulse bg-muted/40 shrink-0" />
          <div className="flex-1 min-h-0 grid grid-cols-[16fr_62fr_22fr] gap-2">
            <div className="rounded-xl animate-pulse bg-muted/40" />
            <div className="grid grid-rows-[65fr_35fr] gap-2 min-h-0">
              <div className="rounded-xl animate-pulse bg-muted/40" />
              <div className="rounded-xl animate-pulse bg-muted/40" />
            </div>
            <div className="rounded-xl animate-pulse bg-muted/40" />
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell isTradePage>
      <div className="h-[calc(100vh-3.5rem)] flex flex-col gap-2 p-2 overflow-hidden">
        <MarketHeader selected={selected} leverageMax={leverageMax} onResetLayout={resetLayout} />

        <PanelGroup direction="horizontal" className="flex-1 min-h-0">
          <Panel
            ref={leftPanelRef}
            defaultSize={DEFAULT_COL_SIZES[0]}
            minSize={collapsed ? COLLAPSED_LEFT_SIZE : 12}
            maxSize={35}
          >
            <PanelCard
              title="Markets"
              action={
                <button
                  onClick={() => setCollapsed(c => !c)}
                  className="p-0.5 rounded text-muted-foreground hover:text-primary hover:bg-muted/30"
                  title={collapsed ? "Expand market list" : "Collapse market list"}
                >
                  {collapsed ? (
                    <ChevronRight className="h-3 w-3" />
                  ) : (
                    <ChevronLeft className="h-3 w-3" />
                  )}
                </button>
              }
            >
              <MarketList
                markets={markets}
                marketsError={marketsError}
                activeSymbol={selected?.symbol ?? ""}
                activeMarket={selected?.market ?? mode}
                onSelect={setSelected}
                mode={mode}
                onModeChange={selectMode}
              />
            </PanelCard>
          </Panel>

          <PanelResizeHandle className="w-1.5 flex items-center justify-center group cursor-col-resize">
            <div className="w-0.5 h-8 bg-border/50 rounded group-hover:bg-primary/50 group-active:bg-primary transition-colors" />
          </PanelResizeHandle>

          <Panel ref={centerPanelRef} defaultSize={DEFAULT_COL_SIZES[1]} minSize={25}>
            <PanelGroup direction="vertical" className="h-full">
              <Panel ref={chartPanelRef} defaultSize={DEFAULT_CENTER_SIZES[0]} minSize={25}>
                <PanelCard title="Chart">
                  <TradingChart baseAsset={selected?.baseCurrency ?? "BTC"} />
                </PanelCard>
              </Panel>
              <PanelResizeHandle className="h-1.5 flex items-center justify-center group cursor-row-resize hidden lg:flex">
                <div className="h-0.5 w-8 bg-border/50 rounded group-hover:bg-primary/50 group-active:bg-primary transition-colors" />
              </PanelResizeHandle>
              <Panel
                ref={posPanelRef}
                defaultSize={DEFAULT_CENTER_SIZES[1]}
                minSize={posCollapsed ? COLLAPSED_BOTTOM_SIZE : 12}
              >
                <PanelCard
                  title="Positions"
                  action={
                    <CollapseToggle
                      collapsed={posCollapsed}
                      direction="vertical"
                      onToggle={() => setPosCollapsed(c => !c)}
                    />
                  }
                >
                  <PositionsPanel
                    openTrades={openTrades}
                    pendingTrades={pendingTrades}
                    history={history}
                    onClose={handleClose}
                    onCancel={handleCancel}
                    closingId={closingId}
                  />
                </PanelCard>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1.5 flex items-center justify-center group cursor-col-resize">
            <div className="w-0.5 h-8 bg-border/50 rounded group-hover:bg-primary/50 group-active:bg-primary transition-colors" />
          </PanelResizeHandle>

          <Panel ref={rightPanelRef} defaultSize={DEFAULT_COL_SIZES[2]} minSize={16} maxSize={34}>
            <PanelGroup direction="vertical" className="h-full">
              <Panel defaultSize={60} minSize={32}>
                <TradePanel
                  selected={selected}
                  account={account}
                  pkg={pkg}
                  mode={mode}
                  onModeChange={selectMode}
                  onOrderPlaced={() => void refreshPositions(account.id)}
                />
              </Panel>
              <PanelResizeHandle className="h-1.5 flex items-center justify-center group cursor-row-resize">
                <div className="h-0.5 w-8 bg-border/50 rounded group-hover:bg-primary/50 group-active:bg-primary transition-colors" />
              </PanelResizeHandle>
              <Panel
                ref={obPanelRef}
                defaultSize={40}
                minSize={obCollapsed ? COLLAPSED_BOTTOM_SIZE : 18}
              >
                <OrderBookPanel
                  selected={selected}
                  collapsed={obCollapsed}
                  onToggleCollapse={() => setObCollapsed(c => !c)}
                />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </AppShell>
  );
}
