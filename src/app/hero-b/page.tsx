import { LandingPage } from "@/components/landing-page";

// Hero variant B. Visitors normally reach this through the "/" rewrite in src/proxy.ts;
// the canonical URL (inherited from the root layout) stays "/".
export default function HeroB() {
  return <LandingPage variant="b" />;
}
