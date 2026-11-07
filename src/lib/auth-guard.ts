import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { RoleType } from "@/lib/validations/auth";
import { NextResponse } from "next/server";

export interface AuthenticatedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: RoleType;
}

/**
 * Mengambil sesi terotentikasi saat ini di sisi server.
 */
export async function getServerSession() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return {
    ...session,
    user: {
      id: session.user.id || "",
      name: session.user.name,
      email: session.user.email,
      role: ((session.user as { role?: string }).role as RoleType) || "STAFF",
    },
  };
}

/**
 * Guard untuk Server Components: mewajibkan autentikasi.
 * Jika tidak terotentikasi, otomatis redirect ke /login.
 */
export async function requireAuth(callbackUrl = "/admin") {
  const session = await getServerSession();
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  return session;
}

/**
 * Guard untuk Server Components / Server Actions: mewajibkan role tertentu.
 * Jika role tidak memenuhi, melempar redirect atau error.
 */
export async function requireRole(allowedRoles: RoleType[], redirectOnFail = "/") {
  const session = await requireAuth();

  if (!allowedRoles.includes(session.user.role)) {
    redirect(redirectOnFail);
  }

  return session;
}

/**
 * Role yang diizinkan mengakses panel admin.
 * Peran MAHASISWA tidak diizinkan masuk ke panel administrasi internal.
 */
export const ADMIN_PANEL_ROLES: RoleType[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "KEPALA_LAB",
  "DEKAN",
  "WADEK",
  "DOSEN",
  "STAFF",
];

/**
 * Guard khusus layout panel admin.
 */
export async function requireAdminAccess() {
  const session = await requireAuth("/admin");

  if (!ADMIN_PANEL_ROLES.includes(session.user.role)) {
    redirect("/?error=unauthorized_role");
  }

  return session;
}

/**
 * Guard untuk Route Handlers (API): mengembalikan NextResponse error jika tidak sah.
 */
export async function assertApiAuth(allowedRoles?: RoleType[]) {
  const session = await getServerSession();

  if (!session) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        { success: false, error: "Autentikasi diperlukan. Sesi tidak ditemukan." },
        { status: 401 }
      ),
    };
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        { success: false, error: "Akses ditolak. Anda tidak memiliki izin yang cukup." },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true as const,
    session,
  };
}

