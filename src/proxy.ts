import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export function proxy(request: NextRequest, event: unknown) {
  return (
    auth as unknown as (
      req: NextRequest,
      ev?: unknown
    ) => Response | Promise<Response>
  )(request, event);
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login"],
};
