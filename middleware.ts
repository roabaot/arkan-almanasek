import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Create the next-intl middleware handler
const i18nMiddleware = createMiddleware(routing);

// Custom middleware wrapper:
// - If the user visits the root path `/`, redirect explicitly to `/ar` so
//   the app opens in Arabic by default regardless of browser locale.
// - Otherwise delegate to the next-intl middleware handler.
export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/ar";
    url.search = search;
    return NextResponse.redirect(url);
  }

  // Delegate to next-intl's middleware for other routes
  return i18nMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
