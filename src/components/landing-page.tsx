import type { HeroVariant } from "@/lib/analytics";
import { About } from "./about";
import { AnalyticsInit } from "./analytics-init";
import { Benefits } from "./benefits";
import { DebtExplainer } from "./debt-explainer";
import { DebtSnapshot } from "./debt-snapshot";
import { Faq } from "./faq";
import { FinalCta } from "./final-cta";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { ProblemSelector } from "./problem-selector";
import { ProcessTimeline } from "./process-timeline";
import { StickyWhatsApp } from "./sticky-whatsapp";

/** The full landing page. Only the hero headline changes between A/B variants. */
export function LandingPage({ variant }: { variant: HeroVariant }) {
  return (
    <>
      <a
        href="#kandungan"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Langkau ke kandungan
      </a>
      <div id="top" />
      <Header />
      <main id="kandungan">
        <Hero variant={variant} />
        <ProblemSelector />
        <DebtExplainer />
        <Benefits />
        <ProcessTimeline />
        <DebtSnapshot />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyWhatsApp />
      <AnalyticsInit heroVariant={variant} />
    </>
  );
}
