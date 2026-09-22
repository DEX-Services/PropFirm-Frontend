import { useEffect, useMemo, useState } from "react";
import { Coins, Target, CalendarDays, TrendingUp, FileText, Trophy, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Account, Package, PackagePhase, getAccountAndPackages } from "@/lib/api";

const PHASE_LABELS: Record<string, string> = { step1: "Step 1", step2: "Step 2", funded: "Funded" };

// Which stage columns exist at all for a track — an "instant" (Instant
// Funding) account never has an evaluation stage, "1step" never has a
// Step 2, and "2step" has all three. The objectives table below only ever
// renders the columns that exist for the trader's own package: a 1-Step
// trader's Step 2 doesn't get shown as a greyed-out placeholder, it's
// simply not a column at all, same as a live/funded-only account never
// shows an evaluation column.
const STAGES_BY_TRACK: Record<string, Array<"step1" | "step2" | "funded">> = {
  instant: ["funded"],
  "1step": ["step1", "funded"],
  "2step": ["step1", "step2", "funded"],
};

const STAGE_META: Record<string, { title: string; subtitle: string; accountType: string }> = {
  step1: { title: "Step 1", subtitle: "Evaluation", accountType: "Evaluation" },
  step2: { title: "Step 2", subtitle: "Verification", accountType: "Verification" },
  funded: { title: "Funded Account", subtitle: "Live Trading", accountType: "Live" },
};

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
  const stages = pkg ? STAGES_BY_TRACK[pkg.track] ?? ["step1", "funded"] : [];

  if (loading) {
    // Skeleton mirrors the real page structure so the layout doesn't jump
    // when data lands, and the page never sits blank while the fetch runs.
    return (
      <AppShell>
        <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl animate-pulse bg-muted/40" />
              <div className="space-y-2">
                <div className="h-6 w-64 rounded-lg animate-pulse bg-muted/40" />
                <div className="h-3 w-80 rounded-lg animate-pulse bg-muted/40" />
              </div>
            </div>
            <div className="h-10 w-40 rounded-xl animate-pulse bg-muted/40" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="h-20 rounded-xl animate-pulse bg-muted/40" />
            ))}
          </div>
          <div className="h-96 rounded-xl animate-pulse bg-muted/40" />
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
          <div className="relative">
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="relative flex items-center gap-3">
              <span className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
                  Evaluation Progress
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Complete the trading objectives to become a funded trader.
                </p>
              </div>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl glass-strong border border-border/50 px-4 py-2.5 text-sm font-semibold hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all shadow-sm">
            <FileText className="h-4 w-4 text-primary" /> Evaluation Rules
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard icon={<Coins className="h-4.5 w-4.5" />} label="Account Size" value={`$${accountSize.toLocaleString()}`} sub="Evaluation Account" />
          <SummaryCard icon={<Target className="h-4.5 w-4.5" />} label="Current Stage" value={PHASE_LABELS[account.phase] ?? account.phase} sub="Keep trading to reach your targets" />
          <SummaryCard icon={<TrendingUp className="h-4.5 w-4.5" />} label="Trading Days" value={`${account.tradingDaysCount}${currentPhase?.minTradingDays ? ` / ${currentPhase.minTradingDays}` : ""}`} sub="Minimum required for this stage" />
          <SummaryCard icon={<CalendarDays className="h-4.5 w-4.5" />} label="Start Date" value={new Date(account.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} sub="No fixed end date — trade at your own pace" />
        </div>

        <div className="glass rounded-xl border border-glass-border shadow-sm overflow-hidden overflow-x-auto">
          <div className="grid min-w-[600px]" style={{ gridTemplateColumns: `220px repeat(${stages.length}, minmax(0,1fr))` }}>
            <HeaderCell>Objectives</HeaderCell>
            {stages.map(stage => {
              const meta = STAGE_META[stage];
              return <StageHeaderCell key={stage} title={meta.title} subtitle={meta.subtitle} funded={stage === "funded"} active={account.phase === stage} />;
            })}

            <RowLabel>Account Type</RowLabel>
            {stages.map(stage => (
              <RowCell key={stage} current={account.phase === stage}>{STAGE_META[stage].accountType}</RowCell>
            ))}

            <RowLabel>Initial Balance</RowLabel>
            {stages.map(stage => (
              <RowCell key={stage} current={account.phase === stage}>${accountSize.toLocaleString()}</RowCell>
            ))}

            <RowLabel>Profit Target</RowLabel>
            {stages.map(stage => (
              stage === "funded"
                ? <RowCell key={stage} current={account.phase === "funded"}>—</RowCell>
                : (
                  <ProgressCell
                    key={stage}
                    current={account.phase === stage}
                    phase={phases[stage]}
                    accountSize={accountSize}
                    achieved={account.phase === stage ? Math.max(0, profitSoFar) : null}
                    kind="target"
                  />
                )
            ))}

            <RowLabel>Max Daily Loss</RowLabel>
            {stages.map(stage => (
              <ProgressCell key={stage} current={account.phase === stage} phase={phases[stage]} accountSize={accountSize} achieved={account.phase === stage ? dailyLossSoFar : null} kind="daily" />
            ))}

            <RowLabel>Max Loss</RowLabel>
            {stages.map(stage => (
              <ProgressCell key={stage} current={account.phase === stage} phase={phases[stage]} accountSize={accountSize} achieved={account.phase === stage ? totalLossSoFar : null} kind="total" />
            ))}

            <RowLabel>Minimum Trading Days</RowLabel>
            {stages.map(stage => (
              stage === "funded"
                ? <RowCell key={stage} current={account.phase === "funded"}>N/A</RowCell>
                : <DaysCell key={stage} current={account.phase === stage} phase={phases[stage]} daysDone={account.phase === stage ? account.tradingDaysCount : 0} />
            ))}

            <RowLabel last>Max Leverage</RowLabel>
            {stages.map(stage => (
              <RowCell key={stage} current={account.phase === stage} last>{pkg.leverageMaxFutures}x futures / 1x spot</RowCell>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function SummaryCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="group glass rounded-xl border border-glass-border p-4 flex items-start gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
      <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center shrink-0 ring-1 ring-primary/20 transition-transform duration-200 group-hover:scale-105">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-lg font-bold truncate">{value}</div>
        <div className="text-[11px] text-muted-foreground/80 truncate">{sub}</div>
      </div>
    </div>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground border-b border-glass-border">{children}</div>;
}

function StageHeaderCell({ title, subtitle, active, funded }: { title: string; subtitle: string; active?: boolean; funded?: boolean }) {
  return (
    <div
      className={`relative px-4 py-3.5 text-center border-b border-glass-border transition-colors ${
        active
          ? funded
            ? "bg-yellow-500/5"
            : "bg-primary/10"
          : ""
      }`}
    >
      {active && (
        <span
          className={`absolute inset-x-6 -top-px h-0.5 rounded-full ${funded ? "bg-yellow-500" : "bg-primary"}`}
        />
      )}
      <div className="flex items-center justify-center gap-1.5">
        {funded && <Trophy className="h-3.5 w-3.5 text-yellow-500" />}
        <span className={`text-sm font-bold ${funded ? "text-yellow-500" : ""}`}>{title}</span>
        {active && (
          <span
            className={`ml-1 px-1.5 py-px rounded-full text-[9px] font-bold uppercase tracking-wide ${
              funded ? "bg-yellow-500/15 text-yellow-500" : "bg-primary/15 text-primary"
            }`}
          >
            Current
          </span>
        )}
      </div>
      <div className="text-[11px] text-muted-foreground">{subtitle}</div>
    </div>
  );
}

function RowLabel({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return <div className={`px-4 py-3.5 text-sm font-medium ${last ? "" : "border-b border-glass-border"}`}>{children}</div>;
}

function RowCell({ children, current, last }: { children: React.ReactNode; current?: boolean; last?: boolean }) {
  return (
    <div className={`px-4 py-3.5 text-center text-sm font-semibold ${current ? "bg-primary/5" : ""} ${last ? "" : "border-b border-glass-border"}`}>
      {children}
    </div>
  );
}

function ProgressCell({
  current, phase, accountSize, achieved, kind,
}: {
  current?: boolean;
  phase: PackagePhase | null;
  accountSize: number;
  achieved: number | null;
  kind: "target" | "daily" | "total";
}) {
  const pct = kind === "target" ? phase?.profitTargetPct : kind === "daily" ? phase?.maxDailyLossPct : phase?.maxTotalLossPct;

  if (!phase || pct == null) {
    return (
      <div className={`px-4 py-3.5 text-center text-sm ${current ? "bg-primary/5" : ""} border-b border-glass-border text-muted-foreground`}>—</div>
    );
  }

  const limitAmount = accountSize * (Number(pct) / 100);
  const doneAmount = achieved ?? 0;
  const progressPct = limitAmount > 0 ? Math.min(100, (doneAmount / limitAmount) * 100) : 0;
  const isLoss = kind !== "target";
  const barColor =
    isLoss
      ? progressPct > 80
        ? "bg-gradient-to-r from-sell/80 to-sell"
        : "bg-gradient-to-r from-yellow-500/70 to-yellow-500"
      : "bg-gradient-to-r from-buy/70 to-buy";
  const met = kind === "target" && progressPct >= 100;

  return (
    <div className={`px-4 py-3.5 border-b border-glass-border ${current ? "bg-primary/5" : ""}`}>
      <div className="text-center text-sm font-bold mb-2">
        ${limitAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({Number(pct)}%)
      </div>
      <div className="relative h-2 rounded-full bg-muted/40 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-[width] duration-500 ${
            progressPct > 0 ? "shadow-[0_0_8px_rgba(255,255,255,0.25)_inset]" : ""
          }`}
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-1.5 text-[11px]">
        <span className={met ? "text-buy font-bold" : isLoss ? "text-yellow-500 font-semibold" : "text-buy font-semibold"}>
          ${doneAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} / ${limitAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </span>
        <span
          className={`font-semibold ${
            progressPct > 80 ? "text-sell" : met ? "text-buy" : "text-muted-foreground"
          }`}
        >
          {progressPct.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

function DaysCell({ current, phase, daysDone }: { current?: boolean; phase: PackagePhase | null; daysDone: number }) {
  if (!phase || !phase.minTradingDays) {
    return <div className={`px-4 py-3.5 text-center text-sm text-muted-foreground ${current ? "bg-primary/5" : ""} border-b border-glass-border`}>—</div>;
  }
  const progressPct = Math.min(100, (daysDone / phase.minTradingDays) * 100);
  const met = daysDone >= phase.minTradingDays;
  return (
    <div className={`px-4 py-3.5 border-b border-glass-border ${current ? "bg-primary/5" : ""}`}>
      <div className="text-center text-sm font-bold mb-2">{phase.minTradingDays} Days</div>
      <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${met ? "bg-gradient-to-r from-buy/70 to-buy" : "bg-gradient-to-r from-primary/70 to-primary"}`}
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-1.5 text-[11px]">
        <span className={met ? "text-buy font-bold" : "text-foreground font-semibold"}>
          {daysDone} / {phase.minTradingDays}
        </span>
        <span className={met ? "text-buy font-semibold" : "text-muted-foreground"}>{progressPct.toFixed(0)}%</span>
      </div>
    </div>
  );
}
