import { useEffect, useId, useRef, useState } from "react";
import { readTheme, type ThemeMode } from "@/lib/theme";

// PropFirm has no licensed TradingView Advanced Charting Library bundle (see
// Dex New Frontend's public/charting_library/, which isn't part of this
// app), so this uses TradingView's free tv.js embed widget with a Binance
// symbol resolver — the same fallback path Dex New Frontend itself uses for
// its non-crypto asset classes. Wrapped in the identical ".glass" panel
// chrome as the DEX chart panel so it's visually the same chart real-estate,
// just backed by the widget DEX's own crypto pairs use via the licensed
// library's Binance datafeed instead.
// The TradingView tv.js embed script has no published type declarations —
// its constructor and returned widget instance are typed as an opaque
// object here rather than `any`, just enough to satisfy the lint rule
// without pretending to know its full shape.
type TradingViewWidget = { remove?: () => void };
type TradingViewGlobal = { widget: new (options: Record<string, unknown>) => TradingViewWidget };

declare global {
  interface Window {
    TradingView?: TradingViewGlobal;
  }
}

let tvScriptPromise: Promise<void> | null = null;
function loadTradingViewEmbedScript(): Promise<void> {
  if (tvScriptPromise) return tvScriptPromise;
  tvScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return tvScriptPromise;
}

export function TradingChart({ baseAsset }: { baseAsset: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<TradingViewWidget | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(readTheme);
  const reactId = useId();
  const containerId = `tv-embed-${reactId.replace(/:/g, "")}`;
  const tvSymbol = `BINANCE:${(baseAsset || "BTC").toUpperCase()}USD`;

  useEffect(() => {
    const onThemeChange = (event: Event) => setTheme((event as CustomEvent<ThemeMode>).detail);
    window.addEventListener("dex-theme-change", onThemeChange);
    return () => window.removeEventListener("dex-theme-change", onThemeChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadTradingViewEmbedScript().then(() => {
      if (cancelled || !window.TradingView) return;
      if (!document.getElementById(containerId)) return;
      widgetRef.current = new window.TradingView.widget({
        autosize: true,
        symbol: tvSymbol,
        interval: "15",
        timezone: "Etc/UTC",
        theme: theme === "light" ? "light" : "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: false,
        save_image: false,
        calendar: false,
        hide_top_toolbar: false,
        hide_legend: false,
        hide_side_toolbar: false,
        container_id: containerId,
        studies: ["Volume@tv-basicstudies"],
        disabled_features: [
          "header_compare",
          "compare_symbol",
          "header_symbol_search",
          "symbol_search_hot_key",
          "study_templates",
          "popup_hints",
        ],
      });
    });

    return () => {
      cancelled = true;
      if (widgetRef.current?.remove) {
        try {
          widgetRef.current.remove();
        } catch {
          // Widget teardown can throw if its DOM node was already detached
          // (e.g. rapid symbol switches); safe to ignore.
        }
      }
      widgetRef.current = null;
    };
  }, [tvSymbol, theme, containerId]);

  return (
    <div className="glass rounded-b-xl rounded-t-none flex flex-col h-full overflow-hidden">
      <div className="flex-1 grid gap-1 p-1 min-h-0">
        <div className="glass-strong rounded-lg overflow-hidden border border-border/40 min-h-0">
          <div ref={containerRef} id={containerId} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
