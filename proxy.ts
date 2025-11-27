// import { NextRequest, NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";

// const PUBLIC_ROUTES = ["/", "/about", "/contact"];
// const AUTH_ROUTES = ["/sign-in", "/sign-up"];
// const API_ROUTES_PREFIX = "/api";

// const matchRoute = (pathname: string, route: string) =>
//   pathname === route || pathname.startsWith(`${route}/`);

// export async function proxy(request: NextRequest) {
//   const incomingHeaders = await headers();
//   const session = await auth.api.getSession({ headers: incomingHeaders });
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith(API_ROUTES_PREFIX)) {
//     return NextResponse.next();
//   }

//   const isAuthRoute = AUTH_ROUTES.some((route) => matchRoute(pathname, route));
//   const isPublicRoute =
//     PUBLIC_ROUTES.some((route) => matchRoute(pathname, route)) || isAuthRoute;

//   if (!session && !isPublicRoute) {
//     const signInUrl = new URL("/sign-in", request.url);
//     signInUrl.searchParams.set("redirectTo", pathname);
//     return NextResponse.redirect(signInUrl);
//   }

//   if (session && isAuthRoute) {
//     return NextResponse.redirect(new URL("/home", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   runtime: "nodejs", // Required for auth.api calls
//   matcher: [
//     // Ignore static files, images, fonts, icons, etc.
//     "/((?!_next/|_proxy/|_static|_vercel|favicon.ico|robots.txt|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2|ttf)).*)",
//   ],
// };


import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const PUBLIC_ROUTES = ["/", "/about", "/contact"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const API_ROUTES_PREFIX = "/api";

// Liste des extensions à exclure manuellement si Next les route via le proxy
const STATIC_EXTENSIONS = [
  ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg",
  ".ico", ".css", ".js", ".woff", ".woff2", ".ttf"
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ignore fichiers statiques
  if (STATIC_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return NextResponse.next();
  }

  // 2. Ignore tout ce qui est dans _next/ ou _static (rarement envoyé au proxy mais safe)
  if (pathname.startsWith("/_next") || pathname.startsWith("/_static")) {
    return NextResponse.next();
  }

  // 3. Ignore API
  if (pathname.startsWith(API_ROUTES_PREFIX)) {
    return NextResponse.next();
  }

  // 4. Auth logic
  const incomingHeaders = await headers();
  const session = await auth.api.getSession({ headers: incomingHeaders });

  const isAuthRoute = AUTH_ROUTES.some(route => pathname === route || pathname.startsWith(route + "/"));
  const isPublic = PUBLIC_ROUTES.includes(pathname) || isAuthRoute;

  if (!session && !isPublic) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}