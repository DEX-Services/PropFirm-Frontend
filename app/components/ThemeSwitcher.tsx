"use client";

import { useEffect, useState } from "react";
import { Moon, Palette, Sun } from "lucide-react";

type ThemeMode = "dark" | "light" | "other";

const options: { value: ThemeMode; label: string; icon: typeof Moon }[] = [
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
  { value: "other", label: "Other", icon: Palette },
];

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("propfirm-theme") as ThemeMode | null;
    return saved && options.some((option) => option.value === saved) ? saved : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("propfirm-theme", theme);
    window.dispatchEvent(new CustomEvent<ThemeMode>("propfirm-theme-change", { detail: theme }));
  }, [theme]);

  function selectTheme(next: ThemeMode) {
    setTheme(next);
  }

  return (
    <div className={compact ? "theme-switcher compact" : "theme-switcher"} aria-label="Color theme">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <button key={option.value} type="button" className={theme === option.value ? "active" : ""} onClick={() => selectTheme(option.value)} title={`${option.label} theme`} aria-label={`${option.label} theme`}>
            <Icon size={14} />
            {!compact && <span>{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
