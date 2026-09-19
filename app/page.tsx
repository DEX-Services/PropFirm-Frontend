"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { login } from "./lib/api";

// Demo credentials for local testing only — a real account provisioned
// through the actual purchase -> POST /internal/provision flow described
// in PROP_FIRM_PLAN.md (a 2-Step, $25,000 package, Step 1 active), not a
// fabricated login. Remove this banner before any real deployment.
const DEMO_LOGIN_ID = "PF-402015";
const DEMO_PASSWORD = "IG5PCRDQOJ6O";

export default function LoginPage() {
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
      window.location.assign("/trade");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-theme"><ThemeSwitcher /></div>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="login-story" aria-label="About BitDX Prop Firm">
        <Link className="brand" href="/" aria-label="BitDX Prop Firm home">
          <span className="brand-mark">P</span>
          <span>BitDX Prop Firm</span>
        </Link>

        <div className="story-content">
          <span className="eyebrow"><span /> YOUR TRADING WORKSPACE</span>
          <h1>Your rules.<br />Your progress.<br /><em>One clear view.</em></h1>
          <p>
            Trade your BitDX Prop Firm account while keeping balance, equity, drawdown,
            and account status visible at every step.
          </p>

          <div className="story-points">
            <div><ShieldCheck size={18} /><span><strong>Protected access</strong>Separate from your BitDX exchange login</span></div>
            <div><LockKeyhole size={18} /><span><strong>Backend-controlled rules</strong>Balances and limits cannot be changed in the browser</span></div>
          </div>
        </div>

        <p className="login-footnote">Purchased on BitDX. Managed securely on BitDX Prop Firm.</p>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div className="mobile-brand">
            <span className="brand-mark">P</span>
            <span>BitDX Prop Firm</span>
          </div>
          <h2>Welcome back</h2>
          <p>Use the login details issued after your account purchase.</p>

          <div className="demo-credentials-banner" role="note">
            <strong>Testing locally?</strong>
            <span>Demo account — Login ID <code>{DEMO_LOGIN_ID}</code>, Password <code>{DEMO_PASSWORD}</code></span>
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setLoginId(DEMO_LOGIN_ID);
                setPassword(DEMO_PASSWORD);
              }}
            >
              Fill demo credentials
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="loginId">Prop Firm login ID</label>
            <input
              id="loginId"
              name="loginId"
              value={loginId}
              onChange={(event) => setLoginId(event.target.value)}
              placeholder="PF-XXXXXX"
              autoComplete="username"
              required
            />

            <div className="label-row">
              <label htmlFor="password">Password</label>
              <button type="button" className="text-button">Forgot password?</button>
            </div>
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button className="primary-button login-button" type="submit" disabled={loading}>
              {loading ? "Opening workspace…" : "Sign in to BitDX Prop Firm"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="security-note">
            <ShieldCheck size={17} />
            <span>Login is verified by the BitDX Prop Firm backend and issues a signed session token.</span>
          </div>

          <p className="support-copy">Need help with your account? <button type="button" className="text-button">Contact support</button></p>
        </div>
      </section>
    </main>
  );
}
