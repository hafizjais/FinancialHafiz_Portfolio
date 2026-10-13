import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { getSiteUrl, seo, siteConfig } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="ms" className={`${jakarta.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
