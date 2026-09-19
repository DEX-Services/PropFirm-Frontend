"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, HelpCircle, KeyRound, LogOut, Menu, TrendingUp, UserRound, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Account, listAccounts, logout } from "../lib/api";

type PropShellProps = {
  active: "trade" | "profile";
  children: ReactNode;
};

function trackLabel(account: Account | null): string {
  if (!account) return "Loading…";
  const track = account.packageId.split("-")[0];
  const labels: Record<string, string> = { instant: "Instant Funding", "1step": "1-Step Challenge", "2step": "2-Step Challenge" };
  return labels[track] ?? account.packageId;
}

export function PropShell({ active, children }: PropShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    listAccounts()
      .then((accounts) => setAccount(accounts[0] ?? null))
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Failed to load account"));
  }, []);

  function signOut() {
    logout();
    window.location.assign("/");
  }

  const accountSize = account ? Number(account.balanceBi2xusd) : null;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button className="mobile-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link className="brand app-brand" href="/trade">
            <span className="brand-mark">P</span>
            <span>BitDX Prop Firm</span>
          </Link>
          <nav className={menuOpen ? "main-nav main-nav-open" : "main-nav"} aria-label="Primary navigation">
            <Link className={active === "trade" ? "active" : ""} href="/trade"><TrendingUp size={17} /> Trade</Link>
            <Link className={active === "profile" ? "active" : ""} href="/profile"><UserRound size={17} /> Profile</Link>
          </nav>
        </div>

        <div className="topbar-actions">
          <span className="live-indicator"><i /> Markets live</span>
          <button className="icon-button" aria-label="Notifications"><Bell size={18} /></button>
          <div className="account-menu-wrap">
            <button className="account-button" onClick={() => setAccountOpen((value) => !value)} aria-expanded={accountOpen}>
              <span className="avatar">{account ? account.id.slice(0, 2).toUpperCase() : "--"}</span>
              <span className="account-button-copy">
                <strong>{account ? account.id.slice(0, 8) : loadError ? "Account unavailable" : "Loading…"}</strong>
                <small>{trackLabel(account)}{accountSize ? ` · $${accountSize.toLocaleString()}` : ""}</small>
              </span>
              <ChevronDown size={15} />
            </button>
            {accountOpen && (
              <div className="account-menu">
                <div className="account-menu-heading">
                  <strong>{account ? account.id.slice(0, 8) : "—"}</strong>
                  <span>{trackLabel(account)}{accountSize ? ` · $${accountSize.toLocaleString()}` : ""}</span>
                </div>
                <div className="account-menu-theme"><span>THEME</span><ThemeSwitcher /></div>
                <Link href="/profile"><UserRound size={16} /> My Profile</Link>
                <button><KeyRound size={16} /> Login Security</button>
                <button><HelpCircle size={16} /> Support</button>
                <button onClick={signOut}><LogOut size={16} /> Sign out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="page-body">{children}</div>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link className={active === "trade" ? "active" : ""} href="/trade"><TrendingUp size={19} /><span>Trade</span></Link>
        <Link className={active === "profile" ? "active" : ""} href="/profile"><UserRound size={19} /><span>Profile</span></Link>
        <button onClick={signOut} className="mobile-signout"><LogOut size={19} /><span>Sign out</span></button>
      </nav>
    </div>
  );
}
