import type { NextAuthConfig } from "next-auth";
import type { RoleType } from "@/lib/validations/auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const pathname = nextUrl.pathname;

      const isLoginPage = pathname === "/login" || pathname === "/admin/login";
      const isAdminRoute = pathname.startsWith("/admin") && !isLoginPage;
      const isDashboardRoute = pathname.startsWith("/dashboard");

      if (isLoginPage && isLoggedIn) {
        const destination =
          role === "SUPER_ADMIN" || role === "ADMIN" ? "/admin" : "/dashboard";
        return Response.redirect(new URL(destination, nextUrl));
      }

      if (isAdminRoute) {
        if (!isLoggedIn) {
          return false;
        }
        if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }

      if (isDashboardRoute && !isLoggedIn) {
        return false;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = String(user.id || "");
        token.name = user.name ?? null;
        token.role = user.role as RoleType;
        token.labId = user.labId ?? null;
        token.mustChangePassword = Boolean(user.mustChangePassword);
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id || token.sub || "");
        session.user.name = String(token.name || "");
        session.user.role = token.role as RoleType;
        session.user.labId = token.labId ?? null;
        session.user.mustChangePassword = Boolean(token.mustChangePassword);
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

