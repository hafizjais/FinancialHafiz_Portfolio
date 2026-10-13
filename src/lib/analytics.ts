/**
 * Provider-agnostic analytics layer.
 *
 * Events are pushed to whichever providers are present on the page:
 *   - Google Tag Manager  → window.dataLayer
 *   - Google Analytics 4  → window.gtag
 *   - Meta Pixel          → window.fbq
 * With no provider configured, events are no-ops (logged to the console in development
 * or when NEXT_PUBLIC_ANALYTICS_DEBUG=true).
 *
 * PRIVACY: event payloads are typed and allow-listed. Never add income, balances,
 * commitments, selected concerns, free text or any personal data to these payloads.
 */

export type HeroVariant = "a" | "b";

export type CtaLocation =
  | "header"
  | "hero"
  | "problem_selector"
  | "explainer"
  | "process"
  | "snapshot"
  | "about"
  | "faq"
  | "final_cta"
  | "footer"
  | "sticky_mobile";

export type SocialNetwork = "facebook" | "threads" | "email";

type EventPayloads = {
  page_view: Record<string, never>;
  whatsapp_cta_click: {
    location: CtaLocation;
    /** Which prefilled message was used — never the message itself. */
    message_type: "default" | "concern" | "summary";
  };
  debt_assessment_started: Record<string, never>;
  debt_assessment_completed: Record<string, never>;
  social_link_click: { network: SocialNetwork; location: CtaLocation };
  faq_opened: { faq_id: string };
};

export type AnalyticsEvent = keyof EventPayloads;

type Primitive = string | number | boolean;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UTM_STORAGE_KEY = "fh_utm";
const ALLOWED_KEYS = new Set<string>([
  "location",
  "message_type",
  "network",
  "faq_id",
  "hero_variant",
  "page_path",
  ...UTM_KEYS,
]);

const debug =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

let context: Record<string, Primitive> = {};

/** Reads UTM parameters from the landing URL (or the current session) — campaign data only. */
function readUtm(): Record<string, string> {
  const utm: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 100);
    }
    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
      return utm;
    }
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        for (const key of UTM_KEYS) {
          const value = (parsed as Record<string, unknown>)[key];
          if (typeof value === "string") utm[key] = value.slice(0, 100);
        }
      }
    }
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). Attribution is best-effort.
  }
  return utm;
}

export function initAnalytics(heroVariant: HeroVariant): void {
  context = { hero_variant: heroVariant, page_path: window.location.pathname, ...readUtm() };
}

function sanitize(payload: Record<string, unknown>): Record<string, Primitive> {
  const clean: Record<string, Primitive> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (!ALLOWED_KEYS.has(key)) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      clean[key] = value;
    }
  }
  return clean;
}

export function track<E extends AnalyticsEvent>(
  event: E,
  ...[payload]: EventPayloads[E] extends Record<string, never> ? [] : [EventPayloads[E]]
): void {
  if (typeof window === "undefined") return;
  const props = sanitize({ ...context, ...(payload ?? {}) });

  try {
    // GA4's gtag shares window.dataLayer, so only push GTM-style objects when GTM is configured.
    if (process.env.NEXT_PUBLIC_GTM_ID) window.dataLayer?.push({ event, ...props });
    window.gtag?.("event", event, props);
    if (window.fbq) {
      // The Meta Pixel base code already records PageView; map the conversion to a standard event.
      if (event === "whatsapp_cta_click") window.fbq("track", "Contact", props);
      else if (event !== "page_view") window.fbq("trackCustom", event, props);
    }
  } catch {
    // Analytics must never break the page.
  }

  if (debug) console.info("[analytics]", event, props);
}
