import { LandingPage } from "@/components/landing-page";

// Hero variant A (control). Variant B lives at /hero-b and is served on "/" by src/proxy.ts.
export default function Home() {
  return <LandingPage variant="a" />;
}
