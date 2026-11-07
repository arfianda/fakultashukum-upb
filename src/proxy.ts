import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of session token cookie names used by next-auth / auth.js
const SESSION_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Gerbang Pertama: Cek ketersediaan cookie sesi pada request
  const hasSession = SESSION_COOKIE_NAMES.some((name) =>
    request.cookies.has(name)
  );

  // Jangan intervensi rute login itu sendiri agar tidak redirect loop
  const isLoginPage = pathname === "/admin/login" || pathname === "/login";

  // Lindungi area /admin (kecuali /admin/login)
  if (pathname.startsWith("/admin") && !isLoginPage) {
    if (!hasSession) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Jika sudah terotentikasi dan membuka halaman login, arahkan ke dashboard
  if (isLoginPage && hasSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua path yang dimulai dengan /admin atau /login
     * Abaikan file statis (_next/static, _next/image, favicon.ico, images, api)
     */
    "/admin/:path*",
    "/login",
  ],
};

