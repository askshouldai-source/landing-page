import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "@/locales";

// Picks the visitor's language from Accept-Language, e.g. "ar-QA,ar;q=0.9,en;q=0.8".
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((r) => hasLocale(r.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}

// Only the bare "/" needs a redirect; every page lives under /en or /ar.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
