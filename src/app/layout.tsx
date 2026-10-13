import type { Metadata, Viewport } from "next";
import { Caveat, Literata, Public_Sans } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { getSiteUrl, seo, siteConfig } from "@/lib/site";
import "./globals.css";

const literata = Literata({ variable: "--font-literata", subsets: ["latin"], display: "swap" });
const publicSans = Public_Sans({ variable: "--font-public", subsets: ["latin"], display: "swap" });
// Used once, for the signature in the About section.
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: seo.title,
  description: seo.description,
  applicationName: siteConfig.brand,
  authors: [{ name: siteConfig.fullName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ms_MY",
    url: "/",
    siteName: siteConfig.brand,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#10203f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ms" className={`${literata.variable} ${publicSans.variable} ${caveat.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
