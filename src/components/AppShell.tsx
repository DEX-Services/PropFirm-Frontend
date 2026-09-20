import { NavLink as RouterNavLink, Link, useNavigate } from "react-router-dom";
import { LineChart, User, LogOut, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { logout } from "@/lib/api";

// PropFirm's version of Dex New Frontend's AppShell — same header chrome
// (glass-strong bar, logo mark, nav links, theme switcher, profile menu),
// but trimmed to the two routes this app actually has (Trade, Profile) and
// with the exchange wallet button replaced by a Sign out action, since
// PropFirm accounts don't hold an on-chain wallet at all (see
// PROP_FIRM_PLAN.md — balance/equity live entirely in the prop-firm
// backend's own ledger).
const navItems = [
  { to: "/trade", icon: LineChart, label: "Trade" },
  { to: "/evaluation", icon: ClipboardCheck, label: "Evaluation" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function AppShell({ children, isTradePage = false }: { children: React.ReactNode; isTradePage?: boolean }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="h-14 px-3 sm:px-4 flex items-center gap-1 sm:gap-2 glass-strong border-b border-glass-border z-30 sticky top-0 overflow-hidden">
        <Link to="/trade" className="flex items-center gap-1.5 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-sm text-primary-foreground shadow-glow-primary">
            P
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight text-foreground">
            BitDX Prop Firm
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 ml-3 overflow-x-auto">
          {navItems.map(item => (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap",
                  "hover:bg-muted/50 hover:text-foreground",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_12px_hsl(var(--primary)/0.2)]"
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </RouterNavLink>
          ))}
        </nav>

        <div className="flex-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full border border-border/60" title="Account">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-strong border-glass-border w-64">
            <div className="px-2 py-2">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Theme</div>
              <ThemeSwitcher compact />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">
                <User className="h-3.5 w-3.5 mr-2 text-primary" /> My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer text-sell">
              <LogOut className="h-3.5 w-3.5 mr-2" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <nav className="lg:hidden flex items-center gap-1 px-2 py-2 glass-strong border-b border-glass-border overflow-x-auto scrollbar-none">
        {navItems.map(item => (
          <RouterNavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap", isActive ? "bg-primary/15 text-primary" : "text-muted-foreground")}
          >
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
          </RouterNavLink>
        ))}
      </nav>

      <main className={cn("flex-1", isTradePage ? "overflow-hidden" : "overflow-auto")}>
        {children}
      </main>
    </div>
  );
}
