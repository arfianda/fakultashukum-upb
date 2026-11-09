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
      const mustChangePassword = Boolean(auth?.user?.mustChangePassword);
      const pathname = nextUrl.pathname;
      const callbackUrl = pathname + (nextUrl.search || "");

      const isLoginPage = pathname === "/login" || pathname === "/admin/login";
      const isChangePasswordPage = pathname === "/dashboard/ganti-password";
      const isForbiddenPage = pathname === "/403";
      const isAdminRoute = pathname.startsWith("/admin") && !isLoginPage;
      const isDashboardRoute = pathname.startsWith("/dashboard");

      if (pathname === "/admin/login" && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoginPage && isLoggedIn) {
        if (mustChangePassword) {
          return Response.redirect(
            new URL("/dashboard/ganti-password", nextUrl)
          );
        }
        const destination =
          role === "SUPER_ADMIN" || role === "ADMIN" ? "/admin" : "/dashboard";
        return Response.redirect(new URL(destination, nextUrl));
      }

      if ((isAdminRoute || isDashboardRoute) && !isLoggedIn) {
        const loginUrl = new URL("/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", callbackUrl);
        return Response.redirect(loginUrl);
      }

      if (
        isLoggedIn &&
        mustChangePassword &&
        (isAdminRoute || isDashboardRoute) &&
        !isChangePasswordPage &&
        !isForbiddenPage
      ) {
        return Response.redirect(new URL("/dashboard/ganti-password", nextUrl));
      }

      if (isAdminRoute && isLoggedIn) {
        if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
          const forbiddenUrl = new URL("/403", nextUrl);
          forbiddenUrl.searchParams.set("required", "SUPER_ADMIN, ADMIN");
          forbiddenUrl.searchParams.set("current", role || "UNKNOWN");
          forbiddenUrl.searchParams.set("from", pathname);
          return Response.redirect(forbiddenUrl);
        }

        if (pathname.startsWith("/admin/audit") && role !== "SUPER_ADMIN") {
          const forbiddenUrl = new URL("/403", nextUrl);
          forbiddenUrl.searchParams.set("required", "SUPER_ADMIN");
          forbiddenUrl.searchParams.set("current", role || "UNKNOWN");
          forbiddenUrl.searchParams.set("from", pathname);
          return Response.redirect(forbiddenUrl);
        }
      }

      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = String(user.id || "");
        token.name = user.name ?? null;
        token.role = user.role as RoleType;
        token.labId = user.labId ?? null;
        token.mustChangePassword = Boolean(user.mustChangePassword);
      }
      if (
        trigger === "update" &&
        session &&
        typeof (session as { mustChangePassword?: boolean })
          .mustChangePassword === "boolean"
      ) {
        token.mustChangePassword = (
          session as { mustChangePassword: boolean }
        ).mustChangePassword;
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
