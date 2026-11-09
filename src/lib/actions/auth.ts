"use server";

import bcrypt from "bcryptjs";
import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { loginSchema, changePasswordSchema } from "@/lib/validations/auth";
import { getRoleHomePath } from "@/lib/rbac";

export interface LoginActionResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export async function loginAction(input: {
  identifier: string;
  password: string;
}): Promise<LoginActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Identitas atau kata sandi salah",
    };
  }

  const { identifier, password } = parsed.data;

  try {
    await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { identifier }],
      },
      select: {
        role: true,
        mustChangePassword: true,
      },
    });

    if (user?.mustChangePassword) {
      return {
        success: true,
        redirectTo: "/dashboard/ganti-password",
      };
    }

    const redirectTo = user?.role ? getRoleHomePath(user.role) : "/dashboard";

    return {
      success: true,
      redirectTo,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: "Identitas atau kata sandi salah",
      };
    }
    return {
      success: false,
      error: "Identitas atau kata sandi salah",
    };
  }
}

export interface ChangePasswordResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export async function changePasswordAction(input: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<ChangePasswordResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      error: "Sesi Anda telah berakhir. Silakan masuk kembali.",
    };
  }

  const parsed = changePasswordSchema.safeParse(input);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false,
      error: firstIssue?.message || "Input kata sandi tidak valid.",
    };
  }

  const { currentPassword, newPassword } = parsed.data;
  const userId = Number(session.user.id);

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser || !dbUser.isActive) {
      return {
        success: false,
        error: "Akun tidak ditemukan atau tidak aktif.",
      };
    }

    const isCurrentValid = await bcrypt.compare(
      currentPassword,
      dbUser.passwordHash
    );
    if (!isCurrentValid) {
      await prisma.auditLog.create({
        data: {
          actorId: dbUser.id,
          action: "PASSWORD_CHANGE_FAILED",
          entity: "User",
          entityId: String(dbUser.id),
          meta: { reason: "INVALID_CURRENT_PASSWORD" },
          ip: "127.0.0.1",
        },
      });
      return {
        success: false,
        error: "Kata sandi saat ini tidak sesuai.",
      };
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        passwordHash: newPasswordHash,
        mustChangePassword: false,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: dbUser.id,
        action: "PASSWORD_CHANGED",
        entity: "User",
        entityId: String(dbUser.id),
        meta: { role: dbUser.role },
        ip: "127.0.0.1",
      },
    });

    // Terbitkan ulang sesi JWT baru agar mustChangePassword=false berlaku seketika
    await signIn("credentials", {
      identifier: dbUser.email,
      password: newPassword,
      redirect: false,
    });

    return {
      success: true,
      redirectTo: getRoleHomePath(dbUser.role),
    };
  } catch {
    return {
      success: false,
      error: "Terjadi kesalahan saat memperbarui kata sandi.",
    };
  }
}

export async function logoutAction() {
  try {
    const session = await auth();
    if (session?.user?.id) {
      await prisma.auditLog.create({
        data: {
          actorId: Number(session.user.id) || null,
          action: "LOGOUT",
          entity: "User",
          entityId: session.user.id,
          meta: { role: session.user.role },
          ip: "127.0.0.1",
        },
      });
    }
  } catch {
    // Abaikan jika gagal menulis audit log saat logout
  }

  await signOut({ redirectTo: "/login" });
}
