import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { login } from "@/lib/api";

// Demo credentials for local testing only — a real account provisioned
// through the actual purchase -> POST /internal/provision flow described in
// PROP_FIRM_PLAN.md (a 2-Step, $25,000 package, Step 1 active), not a
// fabricated login. Remove this banner before any real deployment.
const DEMO_LOGIN_ID = "PF-402015";
const DEMO_PASSWORD = "IG5PCRDQOJ6O";

// Rebuilt on Dex New Frontend's visual language (glass cards, gradient-primary
// brand mark, cyan accent, Inter/JetBrains Mono via index.css) since DEX has
// no equivalent login page to port verbatim from.
export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(loginId, password);
      navigate("/trade");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full grid lg:grid-cols-2 relative overflow-hidden bg-background">
      <div className="absolute top-4 right-4 z-20 w-40">
        <ThemeSwitcher compact />
      </div>
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

      <section className="hidden lg:flex flex-col justify-between p-10 relative z-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-sm text-primary-foreground shadow-glow-primary">P</div>
          <span className="font-bold text-lg tracking-tight">BitDX Prop Firm</span>
        </Link>

        <div className="max-w-md">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Your trading workspace
          </span>
          <h1 className="text-4xl font-bold leading-tight mt-3">
            Your rules.<br />Your progress.<br /><em className="text-primary not-italic">One clear view.</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-4">
            Trade your BitDX Prop Firm account while keeping balance, equity, drawdown, and account status visible at every step.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-2.5 text-sm">
              <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              <span><strong className="font-semibold">Protected access</strong> — separate from your BitDX exchange login</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm">
              <LockKeyhole className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              <span><strong className="font-semibold">Backend-controlled rules</strong> — balances and limits cannot be changed in the browser</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">Purchased on BitDX. Managed securely on BitDX Prop Firm.</p>
      </section>

      <section className="flex items-center justify-center p-6 relative z-10">
        <div className="glass-strong w-full max-w-md rounded-2xl border border-glass-border p-6 sm:p-8">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-sm text-primary-foreground">P</div>
            <span className="font-bold text-base">BitDX Prop Firm</span>
          </div>

          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-5">Use the login details issued after your account purchase.</p>

          <div className="mb-5 rounded-lg border border-primary/25 bg-primary/5 p-3 text-xs space-y-1.5">
            <strong className="block text-foreground">Testing locally?</strong>
            <span className="text-muted-foreground">
              Demo account — Login ID <code className="text-primary font-mono">{DEMO_LOGIN_ID}</code>, Password <code className="text-primary font-mono">{DEMO_PASSWORD}</code>
            </span>
            <button
              type="button"
              className="block text-primary font-semibold hover:underline"
              onClick={() => {
                setLoginId(DEMO_LOGIN_ID);
                setPassword(DEMO_PASSWORD);
              }}
            >
              Fill demo credentials
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="loginId" className="block text-xs font-semibold text-muted-foreground mb-1.5">Prop Firm login ID</label>
              <input
                id="loginId"
                name="loginId"
                value={loginId}
                onChange={e => setLoginId(e.target.value)}
                placeholder="PF-XXXXXX"
                autoComplete="username"
                required
                className="h-10 w-full rounded-lg border border-border bg-muted/30 px-3 text-sm font-mono outline-none transition-colors focus:border-primary"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-muted-foreground">Password</label>
                <button type="button" className="text-xs text-primary font-semibold hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="h-10 w-full rounded-lg border border-border bg-muted/30 px-3 pr-10 text-sm font-mono outline-none transition-colors focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <p role="alert" className="text-xs text-sell">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-glow-primary transition-opacity disabled:opacity-60"
            >
              {loading ? "Opening workspace…" : "Sign in to BitDX Prop Firm"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-5 flex items-start gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>Login is verified by the BitDX Prop Firm backend and issues a signed session token.</span>
          </div>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            Need help with your account? <button type="button" className="text-primary font-semibold hover:underline">Contact support</button>
          </p>
        </div>
      </section>
    </main>
  );
}
