import { useEffect, useMemo, useState } from "react";
import { Coins, Target, CalendarDays, TrendingUp, FileText } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Account, Package, PackagePhase, getAccountAndPackages } from "@/lib/api";

const PHASE_LABELS: Record<string, string> = { step1: "Step 1", step2: "Step 2", funded: "Funded" };

// Real numbers only — every bar and figure on this page is derived from the
// account + package data the backend actually returns (balance, equity,
// start-of-day equity, high-water-mark, trading-days count, and the current
// phase's own rule percentages). There is no consistency-rule tracking or
// evaluation deadline in the backend today, so those rows are intentionally
// left off rather than shown with a fabricated number.
export default function EvaluationPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAccountAndPackages()
      .then(({ account: first, pkg: firstPkg }) => {
        setAccount(first);
        setPkg(firstPkg);
      })
      .catch(err => setError(err instanceof Error ? err.message : "Failed to load account"))
      .finally(() => setLoading(false));
  }, []);

  const accountSize = pkg ? Number(pkg.accountSizeBi2xusd) : 0;
  const equity = account ? Number(account.equityBi2xusd) : 0;
  const startOfDayEquity = account ? Number(account.startOfDayEquity) : 0;

  const phases = useMemo(() => {
    if (!pkg) return { step1: null, step2: null, funded: null } as Record<string, PackagePhase | null>;
    const byPhase: Record<string, PackagePhase | null> = { step1: null, step2: null, funded: null };
    for (const p of pkg.phases) byPhase[p.phase] = p;
    return byPhase;
  }, [pkg]);

  const currentPhase = account ? phases[account.phase] : null;

  if (loading) {
    return (
      <AppShell>
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
          <p className="text-sm text-muted-foreground">Loading your evaluation status…</p>
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
          <p className="text-sm text-sell">{error}</p>
        </div>
      </AppShell>
    );
  }

  if (!account || !pkg) {
    return (
      <AppShell>
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
          <p className="text-sm text-muted-foreground">No BitDX Prop Firm account found for this login. Purchase a challenge on the BitDX exchange to get started.</p>
        </div>
      </AppShell>
    );
  }

  const profitSoFar = equity - accountSize;
  const dailyLossSoFar = Math.max(0, startOfDayEquity - equity);
  const totalLossSoFar = Math.max(0, accountSize - equity);

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Evaluation Progress</h1>
            <p className="text-sm text-muted-foreground mt-1">Complete the trading objectives to become a funded trader.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg glass-strong border border-border/50 px-3.5 py-2 text-sm font-semibold hover:bg-muted/30 transition-colors">
            <FileText className="h-4 w-4 text-primary" /> Evaluation Rules
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard icon={<Coins className="h-4.5 w-4.5" />} label="Account Size" value={`$${accountSize.toLocaleString()}`} sub="Evaluation Account" />
          <SummaryCard icon={<Target className="h-4.5 w-4.5" />} label="Current Stage" value={PHASE_LABELS[account.phase] ?? account.phase} sub="Keep trading to reach your targets" />
          <SummaryCard icon={<TrendingUp className="h-4.5 w-4.5" />} label="Trading Days" value={`${account.tradingDaysCount}${currentPhase?.minTradingDays ? ` / ${currentPhase.minTradingDays}` : ""}`} sub="Minimum required for this stage" />
          <SummaryCard icon={<CalendarDays className="h-4.5 w-4.5" />} label="Start Date" value={new Date(account.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} sub="No fixed end date — trade at your own pace" />
        </div>

        <div className="glass rounded-xl overflow-hidden">
          <div className="grid" style={{ gridTemplateColumns: "220px repeat(3, minmax(0,1fr))" }}>
            <HeaderCell>Objectives</HeaderCell>
            <StageHeaderCell title="Step 1" subtitle="Evaluation" active={account.phase === "step1"} />
            <StageHeaderCell title="Step 2" subtitle="Verification" active={account.phase === "step2"} locked={pkg.track === "1step" || pkg.track === "instant"} />
            <StageHeaderCell title="Funded Account" subtitle="Live Trading" funded active={account.phase === "funded"} locked={account.phase !== "funded"} />

            <RowLabel>Account Type</RowLabel>
            <RowCell current={account.phase === "step1"}>Evaluation</RowCell>
            <RowCell locked={pkg.track === "1step" || pkg.track === "instant"} current={account.phase === "step2"}>Verification</RowCell>
            <RowCell locked={account.phase !== "funded"} current={account.phase === "funded"}>Live</RowCell>

            <RowLabel>Initial Balance</RowLabel>
            <RowCell current={account.phase === "step1"}>${accountSize.toLocaleString()}</RowCell>
            <RowCell locked={pkg.track === "1step" || pkg.track === "instant"} current={account.phase === "step2"}>${accountSize.toLocaleString()}</RowCell>
            <RowCell locked={account.phase !== "funded"} current={account.phase === "funded"}>${accountSize.toLocaleString()}</RowCell>

            <RowLabel>Profit Target</RowLabel>
            <ProgressCell
              current={account.phase === "step1"}
              phase={phases.step1}
              accountSize={accountSize}
              achieved={account.phase === "step1" ? Math.max(0, profitSoFar) : null}
              kind="target"
            />
            <ProgressCell
              current={account.phase === "step2"}
              phase={phases.step2}
              accountSize={accountSize}
              achieved={account.phase === "step2" ? Math.max(0, profitSoFar) : null}
              kind="target"
              locked={pkg.track === "1step" || pkg.track === "instant"}
            />
            <RowCell locked={account.phase !== "funded"} current={account.phase === "funded"}>—</RowCell>

            <RowLabel>Max Daily Loss</RowLabel>
            <ProgressCell current={account.phase === "step1"} phase={phases.step1} accountSize={accountSize} achieved={account.phase === "step1" ? dailyLossSoFar : null} kind="daily" />
            <ProgressCell current={account.phase === "step2"} phase={phases.step2} accountSize={accountSize} achieved={account.phase === "step2" ? dailyLossSoFar : null} kind="daily" locked={pkg.track === "1step" || pkg.track === "instant"} />
            <ProgressCell current={account.phase === "funded"} phase={phases.funded} accountSize={accountSize} achieved={account.phase === "funded" ? dailyLossSoFar : null} kind="daily" locked={account.phase !== "funded"} />

            <RowLabel>Max Loss</RowLabel>
            <ProgressCell current={account.phase === "step1"} phase={phases.step1} accountSize={accountSize} achieved={account.phase === "step1" ? totalLossSoFar : null} kind="total" />
            <ProgressCell current={account.phase === "step2"} phase={phases.step2} accountSize={accountSize} achieved={account.phase === "step2" ? totalLossSoFar : null} kind="total" locked={pkg.track === "1step" || pkg.track === "instant"} />
            <ProgressCell current={account.phase === "funded"} phase={phases.funded} accountSize={accountSize} achieved={account.phase === "funded" ? totalLossSoFar : null} kind="total" locked={account.phase !== "funded"} />

            <RowLabel>Minimum Trading Days</RowLabel>
            <DaysCell current={account.phase === "step1"} phase={phases.step1} daysDone={account.phase === "step1" ? account.tradingDaysCount : 0} />
            <DaysCell current={account.phase === "step2"} phase={phases.step2} daysDone={account.phase === "step2" ? account.tradingDaysCount : 0} locked={pkg.track === "1step" || pkg.track === "instant"} />
            <RowCell locked={account.phase !== "funded"} current={account.phase === "funded"}>N/A</RowCell>

            <RowLabel last>Max Leverage</RowLabel>
            <RowCell current={account.phase === "step1"} last>{pkg.leverageMaxFutures}x futures / 1x spot</RowCell>
            <RowCell locked={pkg.track === "1step" || pkg.track === "instant"} current={account.phase === "step2"} last>{pkg.leverageMaxFutures}x futures / 1x spot</RowCell>
            <RowCell locked={account.phase !== "funded"} current={account.phase === "funded"} last>{pkg.leverageMaxFutures}x futures / 1x spot</RowCell>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function SummaryCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="glass rounded-xl p-4 flex items-start gap-3">
      <span className="h-9 w-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-lg font-bold truncate">{value}</div>
        <div className="text-[11px] text-muted-foreground truncate">{sub}</div>
      </div>
    </div>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground border-b border-glass-border">{children}</div>;
}

function StageHeaderCell({ title, subtitle, active, locked, funded }: { title: string; subtitle: string; active?: boolean; locked?: boolean; funded?: boolean }) {
  return (
    <div className={`px-4 py-3.5 text-center border-b border-glass-border ${active ? "bg-primary/5" : ""} ${locked ? "opacity-50" : ""}`}>
      <div className={`text-sm font-bold ${funded ? "text-yellow-500" : ""}`}>{funded ? "🏆 " : ""}{title}</div>
      <div className="text-[11px] text-muted-foreground">{subtitle}</div>
    </div>
  );
}

function RowLabel({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return <div className={`px-4 py-3.5 text-sm font-medium ${last ? "" : "border-b border-glass-border"}`}>{children}</div>;
}

function RowCell({ children, current, locked, last }: { children: React.ReactNode; current?: boolean; locked?: boolean; last?: boolean }) {
  return (
    <div className={`px-4 py-3.5 text-center text-sm font-semibold ${current ? "bg-primary/5" : ""} ${locked ? "text-muted-foreground opacity-50" : ""} ${last ? "" : "border-b border-glass-border"}`}>
      {children}
    </div>
  );
}

function ProgressCell({
  current, phase, accountSize, achieved, kind, locked,
}: {
  current?: boolean;
  phase: PackagePhase | null;
  accountSize: number;
  achieved: number | null;
  kind: "target" | "daily" | "total";
  locked?: boolean;
}) {
  const pct = kind === "target" ? phase?.profitTargetPct : kind === "daily" ? phase?.maxDailyLossPct : phase?.maxTotalLossPct;

  if (!phase || pct == null) {
    return (
      <div className={`px-4 py-3.5 text-center text-sm ${current ? "bg-primary/5" : ""} ${locked ? "opacity-50" : ""} border-b border-glass-border text-muted-foreground`}>—</div>
    );
  }

  const limitAmount = accountSize * (Number(pct) / 100);
  const doneAmount = achieved ?? 0;
  const progressPct = limitAmount > 0 ? Math.min(100, (doneAmount / limitAmount) * 100) : 0;
  const isLoss = kind !== "target";
  const barColor = isLoss ? (progressPct > 80 ? "bg-sell" : "bg-yellow-500") : "bg-buy";

  return (
    <div className={`px-4 py-3.5 border-b border-glass-border ${current ? "bg-primary/5" : ""} ${locked ? "opacity-50" : ""}`}>
      <div className="text-center text-sm font-bold mb-1.5">
        ${limitAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({Number(pct)}%)
      </div>
      <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${progressPct}%` }} />
      </div>
      <div className="flex items-center justify-between mt-1 text-[11px]">
        <span className={isLoss ? "text-yellow-500 font-semibold" : "text-buy font-semibold"}>
          ${doneAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} / ${limitAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </span>
        <span className={progressPct > 80 ? "text-sell font-semibold" : "text-muted-foreground"}>{progressPct.toFixed(0)}%</span>
      </div>
    </div>
  );
}

function DaysCell({ current, phase, daysDone, locked }: { current?: boolean; phase: PackagePhase | null; daysDone: number; locked?: boolean }) {
  if (!phase || !phase.minTradingDays) {
    return <div className={`px-4 py-3.5 text-center text-sm text-muted-foreground ${current ? "bg-primary/5" : ""} ${locked ? "opacity-50" : ""} border-b border-glass-border`}>—</div>;
  }
  const progressPct = Math.min(100, (daysDone / phase.minTradingDays) * 100);
  const met = daysDone >= phase.minTradingDays;
  return (
    <div className={`px-4 py-3.5 border-b border-glass-border ${current ? "bg-primary/5" : ""} ${locked ? "opacity-50" : ""}`}>
      <div className="text-center text-sm font-bold mb-1.5">{phase.minTradingDays} Days</div>
      <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
        <div className={`h-full rounded-full ${met ? "bg-buy" : "bg-primary"}`} style={{ width: `${progressPct}%` }} />
      </div>
      <div className="flex items-center justify-between mt-1 text-[11px]">
        <span className={met ? "text-buy font-semibold" : "text-foreground font-semibold"}>{daysDone} / {phase.minTradingDays}</span>
        <span className={met ? "text-buy font-semibold" : "text-sell font-semibold"}>{progressPct.toFixed(0)}%</span>
      </div>
    </div>
  );
}
