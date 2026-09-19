"use client";

import { useEffect, useState } from "react";
import { CircleDollarSign, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { PropShell } from "../components/PropShell";
import { Account, listAccounts } from "../lib/api";

const TRACK_LABELS: Record<string, string> = { instant: "Instant Funding", "1step": "1-Step Challenge", "2step": "2-Step Challenge" };
const PHASE_LABELS: Record<string, string> = { step1: "Step 1", step2: "Step 2", funded: "Funded (Live)" };
const STATUS_LABELS: Record<string, string> = { active: "Active", breached: "Breached", passed: "Passed — awaiting advance", funded: "Funded" };

export default function ProfilePage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listAccounts()
      .then((accounts) => setAccount(accounts[0] ?? null))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load account"))
      .finally(() => setLoading(false));
  }, []);

  const track = account ? account.packageId.split("-")[0] : null;
  const accountSize = account ? Number(account.balanceBi2xusd) : null;

  return (
    <PropShell active="profile">
      <main className="profile-page">
        <section className="profile-heading">
          <div>
            <span className="eyebrow"><span /> ACCOUNT & SECURITY</span>
            <h1>Your BitDX Prop Firm profile</h1>
            <p>Review your purchased account and login security.</p>
          </div>
          {account && (
            <span className={`status-chip ${account.status === "active" || account.status === "funded" ? "active" : ""}`}>
              <i /> {STATUS_LABELS[account.status] ?? account.status}
            </span>
          )}
        </section>

        <section className="profile-grid">
          <div className="profile-main">
            {error && <article className="profile-card"><p>{error}</p></article>}
            {loading && <article className="profile-card"><p>Loading account…</p></article>}

            {account && (
              <article className="profile-card">
                <div className="card-heading">
                  <div>
                    <span className="section-icon"><CircleDollarSign size={18} /></span>
                    <span><h2>Trading account</h2><p>Your purchased BitDX Prop Firm account</p></span>
                  </div>
                  <span className={`status-chip ${account.status === "active" || account.status === "funded" ? "active" : ""}`}>
                    <i /> {STATUS_LABELS[account.status] ?? account.status}
                  </span>
                </div>
                <div className="account-summary">
                  <div><span>ACCOUNT ID</span><strong>{account.id.slice(0, 12)}</strong></div>
                  <div><span>PROGRAM</span><strong>{track ? TRACK_LABELS[track] ?? track : "—"}</strong></div>
                  <div><span>ACCOUNT SIZE</span><strong>{accountSize ? `$${accountSize.toLocaleString()}` : "—"}</strong></div>
                  <div><span>CURRENT PHASE</span><strong>{PHASE_LABELS[account.phase] ?? account.phase}</strong></div>
                  <div><span>EQUITY</span><strong>${Number(account.equityBi2xusd).toLocaleString()}</strong></div>
                  <div><span>TRADING DAYS</span><strong>{account.tradingDaysCount}</strong></div>
                </div>
                <div className="info-banner">
                  <ShieldCheck size={18} />
                  <span>Your balance, equity, and phase are calculated and enforced entirely by the backend — nothing here is editable client-side.</span>
                </div>
              </article>
            )}

            {!loading && !account && !error && (
              <article className="profile-card">
                <p>No BitDX Prop Firm account found for this login. Purchase a challenge on the BitDX exchange to get started.</p>
              </article>
            )}
          </div>

          <aside className="profile-side">
            <article className="profile-card">
              <div className="card-heading">
                <div>
                  <span className="section-icon"><LockKeyhole size={18} /></span>
                  <span><h2>Login security</h2><p>Protect your BitDX Prop Firm access</p></span>
                </div>
              </div>
              <button className="settings-row">
                <span className="settings-icon"><KeyRound size={17} /></span>
                <span><strong>Change password</strong></span>
              </button>
            </article>

            {account && (
              <article className="profile-card rule-card">
                <span className="eyebrow"><span /> ACCOUNT RULES</span>
                <h2>Know your limits</h2>
                <div className="rule-row"><span>Current phase</span><strong>{PHASE_LABELS[account.phase] ?? account.phase}</strong></div>
                <p>Full per-phase limits (max loss, profit target, minimum trading days) are shown on the Trade screen for your active phase.</p>
              </article>
            )}

            <article className="profile-card help-card">
              <h2>Need help?</h2>
              <p>Contact support for purchase, login, or account questions.</p>
              <button className="secondary-button">Contact support</button>
            </article>
          </aside>
        </section>
      </main>
    </PropShell>
  );
}
