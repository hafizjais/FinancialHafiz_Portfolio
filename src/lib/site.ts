/**
 * Single source of truth for contact details and brand facts.
 * Only verified details from the supplied brand assets live here — do not add
 * credentials, licences, addresses or registration numbers that are not verified.
 */
export const siteConfig = {
  brand: "Financial Hafiz",
  person: "Hafiz",
  fullName: "Hafiz Jais",
  // Title as printed on Hafiz's business card.
  role: "Mortgage Consultant",
  whatsapp: {
    display: "+60 11-6306 3150",
    number: "601163063150",
    defaultMessage:
      "Hi Hafiz, saya berminat nak check debt consolidation. Boleh bantu semak profile saya?",
  },
  email: "hafizjais.v2vision@gmail.com",
  facebook: "https://www.facebook.com/financialhafiz/",
  threads: "https://www.threads.com/@financialhafiz",
  akpk: "https://www.akpk.org.my/",
  /** Full privacy policy. Override with an external URL if you host it elsewhere. */
  privacyPolicyUrl: process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "/privasi",
} as const;

export const seo = {
  title: "Debt Consolidation Malaysia | Hafiz – Semakan Komitmen Kewangan",
  description:
    "Semak pilihan debt consolidation bersama Hafiz. Fahami komitmen kewangan dan pilihan yang mungkin sesuai. Hubungi melalui WhatsApp untuk perbincangan awal.",
} as const;

/**
 * Canonical site origin. Server-side only (Vercel system env vars are not exposed to the browser).
 * Priority: NEXT_PUBLIC_SITE_URL → Vercel production domain → localhost.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
