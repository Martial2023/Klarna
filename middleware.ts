// middleware.ts
import { proxy } from "./proxy";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: [
    // Exclusion des fichiers statiques, images, fontes, scripts, etc.
    "/((?!_next/|_proxy/|_static|_vercel|favicon.ico|robots.txt|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2|ttf)).*)",
  ],
};