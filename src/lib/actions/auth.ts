"use server";

import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";

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
      },
    });

    const redirectTo =
      user?.role === "SUPER_ADMIN" || user?.role === "ADMIN"
        ? "/admin"
        : "/dashboard";

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

