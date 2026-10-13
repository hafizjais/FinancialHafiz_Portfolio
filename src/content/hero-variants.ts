import type { HeroVariant } from "@/lib/analytics";

/**
 * Hero A/B test copy. Only the headline differs so results can be compared fairly —
 * keep every other part of the page identical between variants.
 */
export const heroHeadlines: Record<HeroVariant, string> = {
  a: "Banyak Komitmen Setiap Bulan? Jom Semak Pilihan Anda.",
  b: "Gaji Masuk, Tapi Cashflow Selalu Ketat?",
};
