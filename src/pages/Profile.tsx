import { useEffect, useMemo, useState } from "react";
import { CircleDollarSign, Info, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Account, Package, getAccountAndPackages } from "@/lib/api";

const TRACK_LABELS: Record<string, string> = { instant: "Instant Funding", "1step": "1-Step Challenge", "2step": "2-Step Challenge" };
const PHASE_LABELS: Record<string, string> = { step1: "Step 1", step2: "Step 2", funded: "Funded (Live)" };
const STATUS_LABELS: Record<string, string> = { active: "Active", breached: "Breached", passed: "Passed — awaiting advance", funded: "Funded" };

// Account status, balance/equity, and per-phase risk rules — moved out of
// the trade page entirely (task requirement) and onto this dedicated
// /profile route instead, so the trade page stays pure trading UI.
export default function ProfilePage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Same concurrent account+package load as the trade page — this page
    // also cannot render anything until both arrive.
    getAccountAndPackages()
      .then(({ account: first, pkg: firstPkg }) => {
        setAccount(first);
        setPkg(firstPkg);
      })
      .catch(err => setError(err instanceof Error ? err.message : "Failed to load account"))
      .finally(() => setLoading(false));
  }, []);

  const track = account ? account.packageId.split("-")[0] : null;
  const accountSize = pkg ? Number(pkg.accountSizeBi2xusd) : null;
  const currentPhase = useMemo(() => pkg?.phases.find(p => p.id === account?.currentPhaseId) ?? null, [pkg, account]);

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Account &amp; Security
            </span>
            <h1 className="text-2xl font-bold mt-1">Your BitDX Prop Firm profile</h1>
            <p className="text-sm text-muted-foreground mt-1">Review your purchased account, balance, risk rules, and login security.</p>
          </div>
          {account && <StatusChip status={account.status} />}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            {error && <Card><p className="text-sm text-sell">{error}</p></Card>}
            {loading && <Card><p className="text-sm text-muted-foreground">Loading account…</p></Card>}

            {account && (
              <Card>
                <CardHeading icon={<CircleDollarSign className="h-4.5 w-4.5" />} title="Trading account" subtitle="Your purchased BitDX Prop Firm account">
                  <StatusChip status={account.status} />
                </CardHeading>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  <Metric label="Account ID" value={account.id.slice(0, 12)} />
                  <Metric label="Program" value={track ? TRACK_LABELS[track] ?? track : "—"} />
                  <Metric label="Account size" value={accountSize ? `$${accountSize.toLocaleString()}` : "—"} />
                  <Metric label="Current phase" value={PHASE_LABELS[account.phase] ?? account.phase} />
                  <Metric label="Trading days" value={`${account.tradingDaysCount}${currentPhase?.minTradingDays ? ` / ${currentPhase.minTradingDays}` : ""}`} />
                  <Metric label="Max leverage" value={pkg ? `${pkg.leverageMaxFutures}x` : "—"} />
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Your balance, equity, and phase are calculated and enforced entirely by the backend — nothing here is editable client-side.</span>
                </div>
              </Card>
            )}

            {account && (
              <Card>
                <CardHeading icon={<CircleDollarSign className="h-4.5 w-4.5" />} title="Balance &amp; equity" subtitle="Live figures, updated on every price tick" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <Metric label="Balance" value={`$${Number(account.balanceBi2xusd).toLocaleString()}`} mono />
                  <Metric label="Equity" value={`$${Number(account.equityBi2xusd).toLocaleString()}`} mono />
                  <Metric label="High water mark" value={`$${Number(account.highWaterMark).toLocaleString()}`} mono />
                  <Metric label="Start-of-day equity" value={`$${Number(account.startOfDayEquity).toLocaleString()}`} mono />
                </div>
              </Card>
            )}

            {!loading && !account && !error && (
              <Card>
                <p className="text-sm text-muted-foreground">No BitDX Prop Firm account found for this login. Purchase a challenge on the BitDX exchange to get started.</p>
              </Card>
            )}
          </div>

          <aside className="space-y-4">
            {currentPhase && (
              <Card>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Account rules
                </span>
                <h2 className="text-base font-bold mt-1 mb-3">{PHASE_LABELS[currentPhase.phase] ?? currentPhase.phase} limits</h2>
                <div className="space-y-2 text-sm">
                  <RuleRow label="Max total loss" value={`${currentPhase.maxTotalLossPct}%`} />
                  <RuleRow label="Max daily loss" value={currentPhase.maxDailyLossPct ? `${currentPhase.maxDailyLossPct}%` : "No daily-loss rule"} />
                  <RuleRow label="Profit target" value={currentPhase.profitTargetPct ? `${currentPhase.profitTargetPct}%` : "None — funded"} />
                  <RuleRow label="Min trading days" value={String(currentPhase.minTradingDays || "None")} />
                  <RuleRow label="Max leverage" value={`${pkg?.leverageMaxFutures}x futures / 1x spot`} />
                </div>
                <p className="mt-3 flex items-start gap-1.5 text-[11px] text-muted-foreground">
                  <Info className="h-3 w-3 shrink-0 mt-0.5" />
                  These limits are enforced by the backend on every price tick — a breach force-closes your positions automatically.
                </p>
              </Card>
            )}

            <Card>
              <CardHeading icon={<LockKeyhole className="h-4.5 w-4.5" />} title="Login security" subtitle="Protect your BitDX Prop Firm access" />
              <button className="mt-3 w-full flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5 text-sm font-semibold hover:bg-muted/30 transition-colors">
                <KeyRound className="h-4 w-4 text-primary" /> Change password
              </button>
            </Card>

            <Card>
              <h2 className="text-base font-bold mb-1">Need help?</h2>
              <p className="text-sm text-muted-foreground mb-3">Contact support for purchase, login, or account questions.</p>
              <button className="w-full h-9 rounded-lg glass-strong border border-border/50 text-sm font-semibold hover:bg-muted/30 transition-colors">
                Contact support
              </button>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="glass rounded-xl p-4 sm:p-5">{children}</div>;
}

function CardHeading({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="h-8 w-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">{icon}</span>
        <div>
          <h2 className="text-sm font-bold">{title}</h2>
          <p className="text-[11px] text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Metric({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className={mono ? "font-mono text-sm font-bold" : "text-sm font-semibold"}>{value}</div>
    </div>
  );
}

function RuleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}

function StatusChip({ status }: { status: Account["status"] }) {
  const active = status === "active" || status === "funded";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${active ? "bg-buy/15 text-buy" : "bg-muted text-muted-foreground"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-buy" : "bg-muted-foreground"}`} />
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
