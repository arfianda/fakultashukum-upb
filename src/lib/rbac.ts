import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { RoleType } from "@/lib/validations/auth";

export type Permission =
  | "user:manage"
  | "content:read"
  | "content:write"
  | "faculty:manage"
  | "lab:manage"
  | "report:view"
  | "audit:view"
  | "teaching:manage"
  | "staff:ops"
  | "student:portal";

export const ROLE_PERMISSIONS: Record<RoleType, readonly Permission[]> = {
  SUPER_ADMIN: [
    "user:manage",
    "content:read",
    "content:write",
    "faculty:manage",
    "lab:manage",
    "report:view",
    "audit:view",
    "teaching:manage",
    "staff:ops",
    "student:portal",
  ],
  ADMIN: [
    "user:manage",
    "content:read",
    "content:write",
    "faculty:manage",
    "report:view",
    "staff:ops",
  ],
  KEPALA_LAB: ["lab:manage", "content:read", "report:view"],
  DEKAN: ["report:view", "content:read", "audit:view"],
  WADEK: ["report:view", "content:read"],
  DOSEN: ["teaching:manage", "content:read"],
  STAFF: ["staff:ops", "content:read"],
  MAHASISWA: ["student:portal", "content:read"],
};

export const ROLE_LABELS: Record<RoleType, string> = {
  SUPER_ADMIN: "Super Administrator",
  ADMIN: "Administrator Fakultas",
  KEPALA_LAB: "Kepala Laboratorium Hukum",
  DEKAN: "Dekan Fakultas Hukum",
  WADEK: "Wakil Dekan Fakultas Hukum",
  DOSEN: "Dosen Pengajar",
  STAFF: "Staf Administrasi",
  MAHASISWA: "Mahasiswa",
};

export const ALL_ROLES: readonly RoleType[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "KEPALA_LAB",
  "DEKAN",
  "WADEK",
  "DOSEN",
  "STAFF",
  "MAHASISWA",
];

export const ADMIN_MANAGEABLE_ROLES: readonly RoleType[] = [
  "MAHASISWA",
  "DOSEN",
  "STAFF",
  "KEPALA_LAB",
  "DEKAN",
  "WADEK",
];

export function getManageableRoles(actorRole: RoleType): readonly RoleType[] {
  if (actorRole === "SUPER_ADMIN") {
    return ALL_ROLES;
  }
  if (actorRole === "ADMIN") {
    return ADMIN_MANAGEABLE_ROLES;
  }
  return [];
}

export function canManageTargetRole(
  actorRole: RoleType,
  targetRole: RoleType
): boolean {
  return getManageableRoles(actorRole).includes(targetRole);
}

export interface VerifiedSessionUser {
  id: number;
  name: string;
  email: string;
  identifier: string | null;
  role: RoleType;
  isActive: boolean;
  mustChangePassword: boolean;
  labId: number | null;
}

export function hasPermission(role: RoleType, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function getRoleHomePath(role: RoleType): string {
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "/admin";
    case "KEPALA_LAB":
      return "/dashboard/lab";
    case "DEKAN":
    case "WADEK":
      return "/dashboard/pimpinan";
    case "DOSEN":
      return "/dashboard/dosen";
    case "STAFF":
      return "/dashboard/staff";
    case "MAHASISWA":
    default:
      return "/dashboard/mahasiswa";
  }
}

/**
 * Memverifikasi sesi pengguna secara langsung ke database (mengecek isActive & mustChangePassword).
 * Tidak pernah mengambil atau mengembalikan passwordHash.
 */
export async function requireAuthenticatedUser(options?: {
  allowMustChangePassword?: boolean;
}): Promise<VerifiedSessionUser> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);
  if (!Number.isInteger(userId) || userId <= 0) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      identifier: true,
      role: true,
      isActive: true,
      mustChangePassword: true,
      labId: true,
    },
  });

  if (!dbUser || !dbUser.isActive) {
    redirect("/login?error=inactive");
  }

  if (dbUser.mustChangePassword && !options?.allowMustChangePassword) {
    redirect("/dashboard/ganti-password");
  }

  return dbUser;
}

/**
 * Helper Server Component: mewajibkan salah satu dari daftar role yang diizinkan.
 * Mengecek isActive & mustChangePassword dari DB.
 * Menampilkan halaman 403 jika role tidak sesuai (bukan redirect diam-diam).
 */
export async function requireRole(
  ...allowedRoles: RoleType[]
): Promise<VerifiedSessionUser> {
  const user = await requireAuthenticatedUser();

  if (!allowedRoles.includes(user.role)) {
    const params = new URLSearchParams({
      required: allowedRoles.join(", "),
      current: user.role,
    });
    redirect(`/403?${params.toString()}`);
  }

  return user;
}

/**
 * Helper Server Component: mewajibkan permission tertentu.
 * Mengecek isActive & mustChangePassword dari DB.
 * Menampilkan halaman 403 jika permission tidak dimiliki.
 */
export async function requirePermission(
  permission: Permission
): Promise<VerifiedSessionUser> {
  const user = await requireAuthenticatedUser();

  if (!hasPermission(user.role, permission)) {
    const params = new URLSearchParams({
      permission,
      current: user.role,
    });
    redirect(`/403?${params.toString()}`);
  }

  return user;
}

/**
 * Helper untuk Server Action & Route Handler: mengecek sesi, isActive dari DB, dan Role.
 */
export async function authorizeRole(...allowedRoles: RoleType[]) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      authorized: false as const,
      status: 401 as const,
      error: "Autentikasi diperlukan.",
      response: NextResponse.json(
        { success: false, error: "Autentikasi diperlukan." },
        { status: 401 }
      ),
    };
  }

  const userId = Number(session.user.id);
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      identifier: true,
      role: true,
      isActive: true,
      mustChangePassword: true,
      labId: true,
    },
  });

  if (!dbUser || !dbUser.isActive) {
    return {
      authorized: false as const,
      status: 401 as const,
      error: "Akun tidak aktif atau sesi tidak valid.",
      response: NextResponse.json(
        { success: false, error: "Akun tidak aktif atau sesi tidak valid." },
        { status: 401 }
      ),
    };
  }

  if (dbUser.mustChangePassword) {
    return {
      authorized: false as const,
      status: 403 as const,
      error: "Anda wajib mengganti kata sandi sementara terlebih dahulu.",
      response: NextResponse.json(
        {
          success: false,
          error: "Anda wajib mengganti kata sandi sementara terlebih dahulu.",
        },
        { status: 403 }
      ),
    };
  }

  if (!allowedRoles.includes(dbUser.role)) {
    return {
      authorized: false as const,
      status: 403 as const,
      error: "403 Forbidden: Anda tidak memiliki hak akses untuk tindakan ini.",
      response: NextResponse.json(
        {
          success: false,
          error: "403 Forbidden: Anda tidak memiliki hak akses untuk tindakan ini.",
        },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true as const,
    user: dbUser,
  };
}

/**
 * Helper untuk Server Action & Route Handler: mengecek sesi, isActive dari DB, dan Permission.
 */
export async function authorizePermission(permission: Permission) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      authorized: false as const,
      status: 401 as const,
      error: "Autentikasi diperlukan.",
      response: NextResponse.json(
        { success: false, error: "Autentikasi diperlukan." },
        { status: 401 }
      ),
    };
  }

  const userId = Number(session.user.id);
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      identifier: true,
      role: true,
      isActive: true,
      mustChangePassword: true,
      labId: true,
    },
  });

  if (!dbUser || !dbUser.isActive) {
    return {
      authorized: false as const,
      status: 401 as const,
      error: "Akun tidak aktif atau sesi tidak valid.",
      response: NextResponse.json(
        { success: false, error: "Akun tidak aktif atau sesi tidak valid." },
        { status: 401 }
      ),
    };
  }

  if (dbUser.mustChangePassword) {
    return {
      authorized: false as const,
      status: 403 as const,
      error: "Anda wajib mengganti kata sandi sementara terlebih dahulu.",
      response: NextResponse.json(
        {
          success: false,
          error: "Anda wajib mengganti kata sandi sementara terlebih dahulu.",
        },
        { status: 403 }
      ),
    };
  }

  if (!hasPermission(dbUser.role, permission)) {
    return {
      authorized: false as const,
      status: 403 as const,
      error: `403 Forbidden: Izin '${permission}' diperlukan.`,
      response: NextResponse.json(
        {
          success: false,
          error: `403 Forbidden: Izin '${permission}' diperlukan.`,
        },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true as const,
    user: dbUser,
  };
}

