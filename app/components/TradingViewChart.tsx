"use client";

import { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    TradingView?: {
      widget: new (options: Record<string, unknown>) => { remove?: () => void };
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTradingView() {
  if (window.TradingView) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("TradingView failed to load"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function TradingViewChart({ symbol }: { symbol: string }) {
  const reactId = useId();
  const containerId = `propfirm-tv-${reactId.replace(/:/g, "")}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<{ remove?: () => void } | null>(null);
  const [theme, setTheme] = useState<"dark" | "light" | "other">(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("propfirm-theme");
    return saved === "light" || saved === "other" ? saved : "dark";
  });
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const onThemeChange = (event: Event) => {
      setTheme((event as CustomEvent<"dark" | "light" | "other">).detail);
    };
    window.addEventListener("propfirm-theme-change", onThemeChange);
    return () => window.removeEventListener("propfirm-theme-change", onThemeChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    setLoadFailed(false);

    loadTradingView().then(() => {
      if (cancelled || !window.TradingView || !document.getElementById(containerId)) return;
      widgetRef.current = new window.TradingView.widget({
        autosize: true,
        symbol: `BINANCE:${symbol}USDT`,
        interval: "15",
        timezone: "Etc/UTC",
        theme: theme === "light" ? "light" : "dark",
        style: "1",
        locale: "en",
        toolbar_bg: theme === "light" ? "#ffffff" : theme === "other" ? "#10111c" : "#0f0f0f",
        enable_publishing: false,
        allow_symbol_change: false,
        save_image: false,
        calendar: false,
        hide_top_toolbar: false,
        hide_legend: false,
        hide_side_toolbar: false,
        studies: ["Volume@tv-basicstudies"],
        container_id: containerId,
      });
    }).catch(() => {
      if (!cancelled) setLoadFailed(true);
    });

    return () => {
      cancelled = true;
      try { widgetRef.current?.remove?.(); } catch { /* widget may already be detached */ }
      widgetRef.current = null;
    };
  }, [containerId, symbol, theme]);

  return (
    <div className="tradingview-wrap">
      <div ref={containerRef} id={containerId} className="tradingview-chart" />
      {loadFailed && <div className="chart-load-error"><strong>TradingView chart unavailable</strong><span>Check your internet connection and refresh the page.</span></div>}
    </div>
  );
}
