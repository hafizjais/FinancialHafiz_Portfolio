"use client";

import { useEffect } from "react";
import { initAnalytics, track, type HeroVariant } from "@/lib/analytics";

let pageViewSent = false;

/** Sets the shared analytics context (hero variant, UTM attribution) and records one page_view. */
export function AnalyticsInit({ heroVariant }: { heroVariant: HeroVariant }) {
  useEffect(() => {
    initAnalytics(heroVariant);
    if (pageViewSent) return;
    pageViewSent = true;
    track("page_view");
  }, [heroVariant]);

  return null;
}
