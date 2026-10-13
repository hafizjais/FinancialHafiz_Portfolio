# Financial Hafiz — Debt Consolidation Landing Page

Mobile-first landing page (Bahasa Melayu) for Hafiz's debt consolidation consultation. A single conversion goal: **start a WhatsApp conversation**.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · Lucide icons.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill in what you need. Every variable is optional for local development.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for canonical/OG URLs, robots.txt, sitemap. Set to your production domain. Falls back to the Vercel production domain, then `http://localhost:3000`. |
| `NEXT_PUBLIC_PRIVACY_POLICY_URL` | Link for "Baca dasar privasi penuh". Defaults to the built-in `/privasi` page. |
| `AB_TEST_ENABLED` | `true` = 50/50 random split of hero headlines (sticky 30 days via `fh_hero` cookie). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Loads GA4 (`G-XXXX`). |
| `NEXT_PUBLIC_META_PIXEL_ID` | Loads Meta Pixel. |
| `NEXT_PUBLIC_GTM_ID` | Loads Google Tag Manager (`GTM-XXXX`); events are pushed to `dataLayer`. |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | `true` logs every event to the console in production. (Always on in dev.) |

`NEXT_PUBLIC_*` values are inlined at build time, so redeploy after you change them.

## Where things live

```
src/lib/site.ts              Contact details, brand facts, SEO copy (single source of truth)
src/lib/whatsapp.ts          wa.me URL builder + privacy-safe opener
src/lib/analytics.ts         track() abstraction, event schema, UTM capture
src/content/                 Editable copy: hero variants, concerns, FAQ
src/components/              One component per section (hero, problem-selector, debt-snapshot, …)
src/proxy.ts                 Hero A/B routing
src/app/hero-b/              Variant B page (served on "/" by the proxy)
src/app/privasi/             Full privacy policy draft
src/app/opengraph-image.tsx  Generated 1200×630 share image
src/assets/                  Cropped portraits + OG fonts (Plus Jakarta Sans, OFL)
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project**, import the repo, and keep the defaults (framework: Next.js).
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` (your final domain) and any analytics IDs.
4. Deploy, then add your custom domain under **Settings → Domains** and redeploy so the canonical URL matches.
5. Check the share preview with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/). Use **Scrape Again** after changes.

## Analytics

All events go through `track()` in `src/lib/analytics.ts`. Payloads are typed **and** filtered through an allow-list, so financial figures cannot be sent by accident.

| Event | Properties |
| --- | --- |
| `page_view` | `hero_variant`, `page_path`, `utm_*` |
| `whatsapp_cta_click` | `location` (hero, header, sticky_mobile, snapshot, …), `message_type` (`default` / `concern` / `summary`) |
| `debt_assessment_started` | — (first interaction with the snapshot form) |
| `debt_assessment_completed` | — (valid summary sent to WhatsApp) |
| `social_link_click` | `network`, `location` |
| `faq_opened` | `faq_id` |

`hero_variant` and UTM parameters are attached to every event.

**Connect later:** set the provider ID env var(s) and redeploy. For Meta ads, `whatsapp_cta_click` is also sent as the standard **Contact** event, so you can optimise campaigns for it. GA4 is configured with `send_page_view: false` because `page_view` is sent manually with variant and UTM context. To add another provider, add one line inside `track()`.

**Privacy safeguards:**
- Snapshot inputs live in React state only. They are never written to storage and their inputs have no `name` attribute (`autoComplete="off"`).
- Messages that carry personal context open WhatsApp through a link that is never attached to the page. Automatic outbound-link tracking (e.g. GA4 enhanced measurement) therefore can't record the prefilled text.
- Only UTM parameters are kept in `sessionStorage`.

## Hero A/B test

- **A:** "Banyak Komitmen Setiap Bulan? Jom Semak Pilihan Anda."
- **B:** "Gaji Masuk, Tapi Cashflow Selalu Ketat?"

Only the headline changes; the rest of the page is identical. Copy lives in `src/content/hero-variants.ts`.

**Option 1 — split inside Meta Ads (recommended for paid traffic).** Create two ads in a Meta A/B test, one pointing to `https://your-domain/?hv=a` and one to `https://your-domain/?hv=b`. Compare cost per `Contact` / `whatsapp_cta_click`.

**Option 2 — random split on the site.** Set `AB_TEST_ENABLED=true`. Visitors are randomly assigned and stay on the same variant for 30 days. Crawlers always see A. Compare `whatsapp_cta_click ÷ page_view` per `hero_variant` in GA4 (register `hero_variant` as a custom dimension).

Run the test until each variant has enough conversions for a meaningful comparison; a few dozen clicks per variant is not enough. Don't call a winner without the data.

## Notes for the owner

- `/privasi` is a plain-language draft. Have it reviewed before running paid traffic.
- The "Perbincangan awal percuma" claim comes from your "FREE Consultation" poster. Remove it in `src/components/hero.tsx` if that changes.
