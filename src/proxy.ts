import { NextResponse, type NextRequest } from "next/server";

/**
 * Hero headline A/B test.
 *
 * - `?hv=a` / `?hv=b` forces a variant (use this for separate ad sets or QA). Always available.
 * - When AB_TEST_ENABLED=true, other visitors are split 50/50 and kept on the same variant
 *   for 30 days via the `fh_hero` cookie (contains only "a" or "b").
 * - Crawlers always receive variant A so search results stay consistent.
 *
 * Variant B is rendered from the static /hero-b route; the visitor's URL stays "/".
 */
const COOKIE = "fh_hero";
const BOT_PATTERN = /bot|crawler|spider|crawling|facebookexternalhit|meta-externalagent|slurp|preview/i;

type Variant = "a" | "b";

function isVariant(value: string | null | undefined): value is Variant {
  return value === "a" || value === "b";
}

export function proxy(request: NextRequest) {
  const forced = request.nextUrl.searchParams.get("hv");
  const isBot = BOT_PATTERN.test(request.headers.get("user-agent") ?? "");
  const testEnabled = process.env.AB_TEST_ENABLED === "true";

  let variant: Variant | null = null;
  if (isVariant(forced)) {
    variant = forced;
  } else if (testEnabled && !isBot) {
    const fromCookie = request.cookies.get(COOKIE)?.value;
    variant = isVariant(fromCookie) ? fromCookie : Math.random() < 0.5 ? "a" : "b";
  }

  if (!variant) return NextResponse.next();

  const response =
    variant === "b"
      ? NextResponse.rewrite(new URL(`/hero-b${request.nextUrl.search}`, request.url))
      : NextResponse.next();

  if (!isBot) {
    response.cookies.set(COOKIE, variant, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      path: "/",
      secure: request.nextUrl.protocol === "https:",
    });
  }
  return response;
}

export const config = {
  matcher: "/",
};
