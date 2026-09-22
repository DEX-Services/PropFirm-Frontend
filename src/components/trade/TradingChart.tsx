import { useEffect, useId, useRef, useState } from "react";
import { readTheme, type ThemeMode } from "@/lib/theme";
import { createBinanceDatafeed } from "@/lib/binanceDatafeed";
import { createBI2XDatafeed } from "@/lib/bi2xDatafeed";

// Port of Dex New Frontend's crypto chart path: the licensed TradingView
// Advanced Charting Library (vendored at public/charting_library/, copied
// from the main platform) with the same custom Binance datafeed
// (lib/binanceDatafeed.ts). The previous free tv.js embed requested
// BINANCE:{BASE}USD — a ticker that mostly doesn't exist on Binance (it's
// {BASE}USDT) — so most symbols rendered an empty chart. The datafeed here
// is the identical one the DEX trade page uses for its crypto pairs, so the
// same asset shows the same chart in both apps.
//
// The library's standalone script has full type declarations shipped
// alongside it (charting_library.d.ts), but the widget constructor is
// reached off `window` here, so the instance is kept as an opaque object —
// same approach as the DEX version's tv.js fallback.
type TradingViewWidget = { remove?: () => void };
type TradingViewGlobal = { widget: new (options: Record<string, unknown>) => TradingViewWidget };

declare global {
  interface Window {
    TradingView?: TradingViewGlobal;
  }
}

let libScriptPromise: Promise<void> | null = null;
function loadChartingLibrary(): Promise<void> {
  if (libScriptPromise) return libScriptPromise;
  libScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/charting_library/charting_library.standalone.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return libScriptPromise;
}

export function TradingChart({ baseAsset }: { baseAsset: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<TradingViewWidget | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(readTheme);
  const reactId = useId();
  const containerId = `tv-chart-${reactId.replace(/:/g, "")}`;
  // The datafeed resolves the bare base asset ("BTC") itself — same
  // convention as the DEX chart. BI2X has no Binance pair; it goes through
  // the platform's own BI2X data feed, exactly like the DEX chart does.
  const base = (baseAsset || "BTC").toUpperCase();
  const isBi2x = base === "BI2X";

  useEffect(() => {
    const onThemeChange = (event: Event) => setTheme((event as CustomEvent<ThemeMode>).detail);
    window.addEventListener("dex-theme-change", onThemeChange);
    return () => window.removeEventListener("dex-theme-change", onThemeChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;
    // Clear any previous widget's DOM so symbol switches don't stack
    // iframes inside the same container.
    container.innerHTML = "";

    loadChartingLibrary().then(() => {
      if (cancelled || !window.TradingView) return;
      widgetRef.current = new window.TradingView.widget({
        autosize: true,
        symbol: base,
        datafeed: isBi2x ? createBI2XDatafeed() : createBinanceDatafeed(),
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
        container,
        library_path: "/charting_library/",
        studies_overrides: {},
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
      if (widgetRef.current?.remove && container.isConnected) {
        try {
          widgetRef.current.remove();
        } catch {
          // Widget teardown can throw if its DOM node was already detached
          // (e.g. rapid symbol switches); safe to ignore.
        }
      }
      widgetRef.current = null;
    };
  }, [base, theme, containerId]);

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
