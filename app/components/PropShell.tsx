"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, HelpCircle, KeyRound, LogOut, Menu, ShieldCheck, TrendingUp, UserRound, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

type PropShellProps = {
  active: "trade" | "profile";
  children: ReactNode;
};

export function PropShell({ active, children }: PropShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button className="mobile-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link className="brand app-brand" href="/trade">
            <span className="brand-mark">P</span>
            <span>PropFirm</span>
            <small>by BitDx</small>
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
              <span className="avatar">RM</span>
              <span className="account-button-copy"><strong>PF-105827</strong><small>2-Step Challenge · $10K</small></span>
              <ChevronDown size={15} />
            </button>
            {accountOpen && <div className="account-menu">
              <div className="account-menu-heading"><strong>PF-105827</strong><span>2-Step Challenge · $10K</span></div>
              <div className="account-menu-theme"><span>THEME</span><ThemeSwitcher /></div>
              <Link href="/profile"><UserRound size={16} /> My Profile</Link>
              <button><KeyRound size={16} /> Login Security</button>
              <button><HelpCircle size={16} /> Support</button>
              <Link href="/"><LogOut size={16} /> Sign out</Link>
            </div>}
          </div>
        </div>
      </header>

      <div className="page-body">{children}</div>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link className={active === "trade" ? "active" : ""} href="/trade"><TrendingUp size={19} /><span>Trade</span></Link>
        <Link className={active === "profile" ? "active" : ""} href="/profile"><UserRound size={19} /><span>Profile</span></Link>
        <Link href="/"><LogOut size={19} /><span>Sign out</span></Link>
      </nav>
    </div>
  );
}
