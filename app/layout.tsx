import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "PropFirm by BitDx",
    template: "%s | PropFirm",
  },
  description:
    "A focused trading workspace for managing your PropFirm account, risk limits, positions, and profile.",
  openGraph: {
    title: "PropFirm by BitDx",
    description: "Your rules. Your progress. One clear view.",
    type: "website",
    images: [{ url: "/og.png", width: 1732, height: 920, alt: "PropFirm trading workspace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PropFirm by BitDx",
    description: "Your rules. Your progress. One clear view.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
