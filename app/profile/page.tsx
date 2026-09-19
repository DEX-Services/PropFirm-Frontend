"use client";

import { useState } from "react";
import { CalendarDays, Check, ChevronRight, CircleDollarSign, KeyRound, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import { PropShell } from "../components/PropShell";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  function saveProfile() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  }

  return (
    <PropShell active="profile">
      <main className="profile-page">
        <section className="profile-heading">
          <div><span className="eyebrow"><span /> ACCOUNT & SECURITY</span><h1>Your PropFirm profile</h1><p>Review your identity, purchased account, and login security.</p></div>
          <span className="status-chip active"><i /> Account active</span>
        </section>

        <section className="profile-grid">
          <div className="profile-main">
            <article className="profile-card identity-card">
              <div className="profile-avatar">U</div>
              <div><h2>Username</h2><p>PropFirm trader</p><div className="identity-tags"><span><Mail size={14} /> rohit@example.com</span><span><CalendarDays size={14} /> Joined Sep 2026</span></div></div>
              <button className="secondary-button">Edit profile</button>
            </article>

            <article className="profile-card">
              <div className="card-heading"><div><span className="section-icon"><CircleDollarSign size={18} /></span><span><h2>Trading account</h2><p>Your purchased PropFirm account</p></span></div><span className="status-chip active"><i /> Active</span></div>
              <div className="account-summary">
                <div><span>LOGIN ID</span><strong>PF-105827</strong></div>
                <div><span>PROGRAM</span><strong>2-Step Challenge</strong></div>
                <div><span>ACCOUNT SIZE</span><strong>$10,000</strong></div>
                <div><span>CURRENT STAGE</span><strong>Challenge 1 of 2</strong></div>
                <div><span>MAX LEVERAGE</span><strong>5×</strong></div>
                <div><span>PURCHASED</span><strong>12 Sep 2026</strong></div>
              </div>
              <div className="progress-row"><span>Evaluation progress</span><strong>Requirements pending definition</strong></div>
              <div className="info-banner"><ShieldCheck size={18} /><span>The backend will calculate your progress and decide when an account changes stage.</span></div>
            </article>

            <article className="profile-card">
              <div className="card-heading"><div><span className="section-icon"><UserRound size={18} /></span><span><h2>Personal information</h2><p>Used for account communication</p></span></div></div>
              <div className="form-grid">
                <label>Full name<input defaultValue="Username" /></label>
                <label>Email address<input type="email" defaultValue="user@example.com" /></label>
                <label>Country<input defaultValue="India" /></label>
                <label>Timezone<input defaultValue="Asia/Kolkata (IST)" /></label>
              </div>
              <div className="card-actions"><button className="primary-button" onClick={saveProfile}>{saved ? <><Check size={17} /> Saved</> : "Save changes"}</button></div>
            </article>
          </div>

          <aside className="profile-side">
            <article className="profile-card">
              <div className="card-heading"><div><span className="section-icon"><LockKeyhole size={18} /></span><span><h2>Login security</h2><p>Protect your PropFirm access</p></span></div></div>
              <button className="settings-row"><span className="settings-icon"><KeyRound size={17} /></span><span><strong>Change password</strong><small>Last changed 2 days ago</small></span><ChevronRight size={17} /></button>
              <button className="settings-row"><span className="settings-icon"><ShieldCheck size={17} /></span><span><strong>Two-factor authentication</strong><small>Not configured</small></span><span className="setup-label">Set up</span><ChevronRight size={17} /></button>
            </article>

            <article className="profile-card rule-card">
              <span className="eyebrow"><span /> ACCOUNT RULES</span>
              <h2>Know your limits</h2>
              <div className="rule-row"><span>Maximum leverage</span><strong>5×</strong></div>
              <div className="rule-row"><span>Daily loss limit</span><strong>Awaiting confirmation</strong></div>
              <div className="rule-row"><span>Total loss limit</span><strong>Awaiting confirmation</strong></div>
              <p>Confirmed rules will be loaded from the server—not written permanently into this page.</p>
            </article>

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
