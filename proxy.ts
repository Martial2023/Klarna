import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const PUBLIC_ROUTES = ["/", "/about", "/contact"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const API_ROUTES_PREFIX = "/api";

const matchRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

export async function proxy(request: NextRequest) {
  const incomingHeaders = await headers();
  const session = await auth.api.getSession({ headers: incomingHeaders });
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(API_ROUTES_PREFIX)) {
    return NextResponse.next();
  }

  const isAuthRoute = AUTH_ROUTES.some((route) => matchRoute(pathname, route));
  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => matchRoute(pathname, route)) || isAuthRoute;

  if (!session && !isPublicRoute) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// export const config = {
//   runtime: "nodejs", // Required for auth.api calls
//   matcher: [
//     // Ignore static files, images, fonts, icons, etc.
//     "/((?!_next/|_proxy/|_static|_vercel|favicon.ico|robots.txt|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2|ttf)).*)",
//   ],
// };