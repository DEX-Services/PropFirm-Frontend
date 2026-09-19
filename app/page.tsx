"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => window.location.assign("/trade"), 550);
  }

  return (
    <main className="login-page">
      <div className="login-theme"><ThemeSwitcher /></div>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="login-story" aria-label="About PropFirm">
        <Link className="brand" href="/" aria-label="PropFirm home">
          <span className="brand-mark">P</span>
          <span>PropFirm</span>
          <small>by BitDx</small>
        </Link>

        <div className="story-content">
          <span className="eyebrow"><span /> YOUR TRADING WORKSPACE</span>
          <h1>Your rules.<br />Your progress.<br /><em>One clear view.</em></h1>
          <p>
            Trade your PropFirm account while keeping balance, equity, drawdown,
            and account status visible at every step.
          </p>

          <div className="story-points">
            <div><ShieldCheck size={18} /><span><strong>Protected access</strong>Separate from your BitDx wallet login</span></div>
            <div><LockKeyhole size={18} /><span><strong>Backend-controlled rules</strong>Balances and limits cannot be changed in the browser</span></div>
          </div>
        </div>

        <p className="login-footnote">Purchased on BitDx. Managed securely on PropFirm.</p>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div className="mobile-brand">
            <span className="brand-mark">P</span>
            <span>PropFirm</span>
          </div>
          <span className="demo-pill">FRONTEND DEMO</span>
          <h2>Welcome back</h2>
          <p>Use the login details issued after your account purchase.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="loginId">PropFirm login ID</label>
            <input id="loginId" name="loginId" defaultValue="PF-105827" autoComplete="username" required />

            <div className="label-row">
              <label htmlFor="password">Password</label>
              <button type="button" className="text-button">Forgot password?</button>
            </div>
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                defaultValue="demo1234"
                autoComplete="current-password"
                required
              />
              <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="primary-button login-button" type="submit" disabled={loading}>
              {loading ? "Opening workspace…" : "Sign in to PropFirm"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="security-note">
            <ShieldCheck size={17} />
            <span>In production, login is verified by the backend and uses a secure session cookie.</span>
          </div>

          <p className="support-copy">Need help with your account? <button type="button" className="text-button">Contact support</button></p>
        </div>
      </section>
    </main>
  );
}
