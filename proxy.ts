// proxy.ts
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

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    matchRoute(pathname, route)
  );
  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => matchRoute(pathname, route)) || isAuthRoute;

  if (!session && !isPublicRoute) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}