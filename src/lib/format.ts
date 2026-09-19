// Number formatting helpers, ported verbatim from Dex New Frontend's
// src/lib/mockData.ts formatPrice/formatCompact so displayed prices look
// pixel-identical to the DEX trade page.

export function formatPrice(p: number): string {
  if (!Number.isFinite(p)) return "--";
  if (p >= 1000) return p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (p >= 1) return p.toFixed(3);
  if (p >= 0.01) return p.toFixed(4);
  return p.toFixed(8);
}

export function formatCompact(n: number): string {
  if (!Number.isFinite(n)) return "--";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
  return n.toFixed(2);
}
