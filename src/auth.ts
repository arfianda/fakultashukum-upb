import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";
import { loginSchema } from "@/lib/validations/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email atau Nomor Induk", type: "text" },
        password: { label: "Kata Sandi", type: "password" },
      },
      authorize: async (credentials, request) => {
        const rawIdentifier =
          credentials?.identifier ??
          (credentials as Record<string, unknown> | undefined)?.username;

        const parsed = loginSchema.safeParse({
          identifier: rawIdentifier,
          password: credentials?.password,
        });

        if (!parsed.success) {
          return null;
        }

        const { identifier, password } = parsed.data;
        const ip =
          request?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request?.headers?.get("x-real-ip") ||
          "127.0.0.1";

        try {
          const user = await prisma.user.findFirst({
            where: {
              OR: [{ email: identifier }, { identifier }],
            },
          });

          if (!user) {
            await prisma.auditLog.create({
              data: {
                actorId: null,
                action: "LOGIN_FAILED",
                entity: "User",
                entityId: null,
                meta: { identifier, reason: "USER_NOT_FOUND" },
                ip,
              },
            });
            return null;
          }

          if (!user.isActive) {
            await prisma.auditLog.create({
              data: {
                actorId: user.id,
                action: "LOGIN_FAILED",
                entity: "User",
                entityId: String(user.id),
                meta: { identifier, reason: "ACCOUNT_INACTIVE" },
                ip,
              },
            });
            return null;
          }

          const now = new Date();
          if (user.lockedUntil && user.lockedUntil > now) {
            await prisma.auditLog.create({
              data: {
                actorId: user.id,
                action: "LOGIN_FAILED",
                entity: "User",
                entityId: String(user.id),
                meta: {
                  identifier,
                  reason: "ACCOUNT_LOCKED",
                  lockedUntil: user.lockedUntil.toISOString(),
                },
                ip,
              },
            });
            return null;
          }

          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) {
            const baseCount =
              user.lockedUntil && user.lockedUntil <= now
                ? 0
                : user.failedLoginCount;
            const nextFailedCount = baseCount + 1;
            const isNowLocked = nextFailedCount >= 5;
            const lockedUntil = isNowLocked
              ? new Date(now.getTime() + 15 * 60 * 1000)
              : null;

            await prisma.user.update({
              where: { id: user.id },
              data: {
                failedLoginCount: nextFailedCount,
                lockedUntil,
              },
            });

            await prisma.auditLog.create({
              data: {
                actorId: user.id,
                action: "LOGIN_FAILED",
                entity: "User",
                entityId: String(user.id),
                meta: {
                  identifier,
                  reason: "INVALID_PASSWORD",
                  failedLoginCount: nextFailedCount,
                  locked: isNowLocked,
                },
                ip,
              },
            });

            return null;
          }

          await prisma.user.update({
            where: { id: user.id },
            data: {
              lastLoginAt: now,
              failedLoginCount: 0,
              lockedUntil: null,
            },
          });

          await prisma.auditLog.create({
            data: {
              actorId: user.id,
              action: "LOGIN_SUCCESS",
              entity: "User",
              entityId: String(user.id),
              meta: {
                role: user.role,
                labId: user.labId,
              },
              ip,
            },
          });

          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            role: user.role,
            labId: user.labId,
            mustChangePassword: user.mustChangePassword,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
