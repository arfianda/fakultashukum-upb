"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { authorizeRole, canManageTargetRole } from "@/lib/rbac";
import type { RoleType } from "@/lib/validations/auth";
import {
  adminCreateUserSchema,
  adminUpdateUserSchema,
  toggleUserActiveSchema,
  changeUserRoleSchema,
  resetUserPasswordSchema,
  csvBatchSchema,
  csvValidatedRowSchema,
  type AdminCreateUserInput,
  type AdminUpdateUserInput,
  type CsvRawRowInput,
} from "@/lib/validations/user";

const SAFE_USER_SELECT = {
  id: true,
  name: true,
  email: true,
  identifier: true,
  role: true,
  isActive: true,
  mustChangePassword: true,
  labId: true,
  lab: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  lastLoginAt: true,
  failedLoginCount: true,
  lockedUntil: true,
  createdAt: true,
  updatedAt: true,
} as const;

async function getClientIp(): Promise<string> {
  try {
    const headerStore = await headers();
    const forwardedFor = headerStore.get("x-forwarded-for");
    if (forwardedFor) {
      return forwardedFor.split(",")[0].trim();
    }
    return headerStore.get("x-real-ip") || "127.0.0.1";
  } catch {
    return "127.0.0.1";
  }
}

/**
 * Generates a strong 14-character random initial password.
 * Never logged or persisted in plaintext.
 */
function generateRandomPassword(): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%&*";
  const all = upper + lower + digits + symbols;

  const chars: string[] = [
    upper[crypto.randomInt(0, upper.length)],
    upper[crypto.randomInt(0, upper.length)],
    lower[crypto.randomInt(0, lower.length)],
    lower[crypto.randomInt(0, lower.length)],
    digits[crypto.randomInt(0, digits.length)],
    digits[crypto.randomInt(0, digits.length)],
    symbols[crypto.randomInt(0, symbols.length)],
  ];

  for (let i = chars.length; i < 14; i++) {
    chars.push(all[crypto.randomInt(0, all.length)]);
  }

  // Fisher-Yates shuffle with CSPRNG
  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
  }

  return chars.join("");
}

/**
 * Ensures there is at least 1 other active SUPER_ADMIN in the database
 * before deactivating or demoting an active SUPER_ADMIN.
 */
async function hasOtherActiveSuperAdmin(excludeUserId: number): Promise<boolean> {
  const remainingCount = await prisma.user.count({
    where: {
      role: "SUPER_ADMIN",
      isActive: true,
      id: { not: excludeUserId },
    },
  });
  return remainingCount >= 1;
}

export async function createUserAction(rawInput: AdminCreateUserInput) {
  const authResult = await authorizeRole("SUPER_ADMIN", "ADMIN");
  if (!authResult.authorized) {
    return { success: false as const, error: authResult.error };
  }

  const actor = authResult.user;
  const parsed = adminCreateUserSchema.safeParse(rawInput);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false as const,
      error: firstIssue?.message || "Input data pengguna tidak valid.",
    };
  }

  const data = parsed.data;

  if (!canManageTargetRole(actor.role, data.role)) {
    return {
      success: false as const,
      error: `403 Forbidden: Role ${actor.role} tidak diizinkan membuat akun dengan role ${data.role}.`,
    };
  }

  // Check duplicate email
  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
    select: { id: true },
  });
  if (existingEmail) {
    return {
      success: false as const,
      error: `Alamat email "${data.email}" sudah digunakan oleh akun lain.`,
    };
  }

  // Check duplicate identifier if provided
  if (data.identifier) {
    const existingIdentifier = await prisma.user.findUnique({
      where: { identifier: data.identifier },
      select: { id: true },
    });
    if (existingIdentifier) {
      return {
        success: false as const,
        error: `NIM/NIDN/NIP "${data.identifier}" sudah terdaftar pada akun lain.`,
      };
    }
  }

  // Validate labId if role === KEPALA_LAB
  const resolvedLabId = data.role === "KEPALA_LAB" ? data.labId : null;
  if (resolvedLabId) {
    const labExists = await prisma.lab.findUnique({
      where: { id: resolvedLabId },
      select: { id: true },
    });
    if (!labExists) {
      return {
        success: false as const,
        error: "Laboratorium yang dipilih tidak ditemukan.",
      };
    }
  }

  const generatedPassword = generateRandomPassword();
  const passwordHash = await bcrypt.hash(generatedPassword, 12);
  const ip = await getClientIp();

  const createdUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      identifier: data.identifier,
      passwordHash,
      role: data.role,
      isActive: data.isActive,
      mustChangePassword: true,
      labId: resolvedLabId,
    },
    select: SAFE_USER_SELECT,
  });

  await prisma.auditLog.create({
    data: {
      actorId: actor.id,
      action: "USER_CREATED",
      entity: "User",
      entityId: String(createdUser.id),
      ip,
      meta: {
        email: createdUser.email,
        identifier: createdUser.identifier,
        role: createdUser.role,
        isActive: createdUser.isActive,
        labId: createdUser.labId,
      },
    },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/audit");
  revalidatePath("/admin");

  return {
    success: true as const,
    user: createdUser,
    generatedPassword,
  };
}

export async function updateUserAction(rawInput: AdminUpdateUserInput) {
  const authResult = await authorizeRole("SUPER_ADMIN", "ADMIN");
  if (!authResult.authorized) {
    return { success: false as const, error: authResult.error };
  }

  const actor = authResult.user;
  const parsed = adminUpdateUserSchema.safeParse(rawInput);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false as const,
      error: firstIssue?.message || "Input pembaruan pengguna tidak valid.",
    };
  }

  const data = parsed.data;

  const targetUser = await prisma.user.findUnique({
    where: { id: data.id },
    select: SAFE_USER_SELECT,
  });

  if (!targetUser) {
    return {
      success: false as const,
      error: "Akun pengguna tidak ditemukan.",
    };
  }

  // Enforce ADMIN target role boundary on both existing role and new role
  if (
    !canManageTargetRole(actor.role, targetUser.role) ||
    !canManageTargetRole(actor.role, data.role)
  ) {
    return {
      success: false as const,
      error:
        "403 Forbidden: Anda tidak memiliki otorisasi untuk mengelola akun dengan role ini.",
    };
  }

  // Self-protection: forbid deactivating own account or changing own role
  if (actor.id === targetUser.id) {
    if (!data.isActive) {
      return {
        success: false as const,
        error: "Anda dilarang menonaktifkan akun Anda sendiri.",
      };
    }
    if (data.role !== targetUser.role) {
      return {
        success: false as const,
        error: "Anda dilarang menurunkan atau mengubah role akun Anda sendiri.",
      };
    }
  }

  // Last active SUPER_ADMIN protection
  if (
    targetUser.role === "SUPER_ADMIN" &&
    targetUser.isActive &&
    (!data.isActive || data.role !== "SUPER_ADMIN")
  ) {
    const canProceed = await hasOtherActiveSuperAdmin(targetUser.id);
    if (!canProceed) {
      return {
        success: false as const,
        error:
          "Tindakan ditolak: Sistem wajib memiliki minimal 1 akun SUPER_ADMIN yang aktif.",
      };
    }
  }

  // Check duplicate email (excluding target user)
  const existingEmail = await prisma.user.findFirst({
    where: {
      email: data.email,
      id: { not: targetUser.id },
    },
    select: { id: true },
  });
  if (existingEmail) {
    return {
      success: false as const,
      error: `Alamat email "${data.email}" sudah digunakan oleh akun lain.`,
    };
  }

  // Check duplicate identifier (excluding target user)
  if (data.identifier) {
    const existingIdentifier = await prisma.user.findFirst({
      where: {
        identifier: data.identifier,
        id: { not: targetUser.id },
      },
      select: { id: true },
    });
    if (existingIdentifier) {
      return {
        success: false as const,
        error: `NIM/NIDN/NIP "${data.identifier}" sudah digunakan oleh akun lain.`,
      };
    }
  }

  const resolvedLabId = data.role === "KEPALA_LAB" ? data.labId : null;
  if (resolvedLabId) {
    const labExists = await prisma.lab.findUnique({
      where: { id: resolvedLabId },
      select: { id: true },
    });
    if (!labExists) {
      return {
        success: false as const,
        error: "Laboratorium yang dipilih tidak ditemukan.",
      };
    }
  }

  const ip = await getClientIp();

  const updatedUser = await prisma.user.update({
    where: { id: targetUser.id },
    data: {
      name: data.name,
      email: data.email,
      identifier: data.identifier,
      role: data.role,
      isActive: data.isActive,
      labId: resolvedLabId,
    },
    select: SAFE_USER_SELECT,
  });

  await prisma.auditLog.create({
    data: {
      actorId: actor.id,
      action: "USER_UPDATED",
      entity: "User",
      entityId: String(updatedUser.id),
      ip,
      meta: {
        before: {
          name: targetUser.name,
          email: targetUser.email,
          identifier: targetUser.identifier,
          role: targetUser.role,
          isActive: targetUser.isActive,
          labId: targetUser.labId,
        },
        after: {
          name: updatedUser.name,
          email: updatedUser.email,
          identifier: updatedUser.identifier,
          role: updatedUser.role,
          isActive: updatedUser.isActive,
          labId: updatedUser.labId,
        },
      },
    },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/audit");
  revalidatePath("/admin");

  return {
    success: true as const,
    user: updatedUser,
  };
}

export async function toggleUserActiveAction(rawInput: {
  userId: number;
  isActive: boolean;
}) {
  const authResult = await authorizeRole("SUPER_ADMIN", "ADMIN");
  if (!authResult.authorized) {
    return { success: false as const, error: authResult.error };
  }

  const actor = authResult.user;
  const parsed = toggleUserActiveSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false as const,
      error: "Parameter perubahan status tidak valid.",
    };
  }

  const { userId, isActive } = parsed.data;

  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: SAFE_USER_SELECT,
  });

  if (!targetUser) {
    return { success: false as const, error: "Akun pengguna tidak ditemukan." };
  }

  if (!canManageTargetRole(actor.role, targetUser.role)) {
    return {
      success: false as const,
      error:
        "403 Forbidden: Anda tidak memiliki otorisasi untuk mengubah status akun ini.",
    };
  }

  if (actor.id === targetUser.id && !isActive) {
    return {
      success: false as const,
      error: "Anda dilarang menonaktifkan akun Anda sendiri.",
    };
  }

  if (targetUser.role === "SUPER_ADMIN" && targetUser.isActive && !isActive) {
    const canProceed = await hasOtherActiveSuperAdmin(targetUser.id);
    if (!canProceed) {
      return {
        success: false as const,
        error:
          "Tindakan ditolak: Sistem wajib memiliki minimal 1 akun SUPER_ADMIN yang aktif.",
      };
    }
  }

  const ip = await getClientIp();

  const updatedUser = await prisma.user.update({
    where: { id: targetUser.id },
    data: { isActive },
    select: SAFE_USER_SELECT,
  });

  await prisma.auditLog.create({
    data: {
      actorId: actor.id,
      action: "USER_STATUS_CHANGED",
      entity: "User",
      entityId: String(updatedUser.id),
      ip,
      meta: {
        email: updatedUser.email,
        role: updatedUser.role,
        previousStatus: targetUser.isActive,
        newStatus: updatedUser.isActive,
      },
    },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/audit");
  revalidatePath("/admin");

  return {
    success: true as const,
    user: updatedUser,
  };
}

export async function changeUserRoleAction(rawInput: {
  userId: number;
  role: RoleType;
  labId?: number | null;
}) {
  const authResult = await authorizeRole("SUPER_ADMIN", "ADMIN");
  if (!authResult.authorized) {
    return { success: false as const, error: authResult.error };
  }

  const actor = authResult.user;
  const parsed = changeUserRoleSchema.safeParse(rawInput);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false as const,
      error: firstIssue?.message || "Input perubahan role tidak valid.",
    };
  }

  const { userId, role: newRole, labId } = parsed.data;

  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: SAFE_USER_SELECT,
  });

  if (!targetUser) {
    return { success: false as const, error: "Akun pengguna tidak ditemukan." };
  }

  if (
    !canManageTargetRole(actor.role, targetUser.role) ||
    !canManageTargetRole(actor.role, newRole)
  ) {
    return {
      success: false as const,
      error:
        "403 Forbidden: Anda tidak memiliki otorisasi untuk mengubah role ini.",
    };
  }

  if (actor.id === targetUser.id && newRole !== targetUser.role) {
    return {
      success: false as const,
      error: "Anda dilarang menurunkan atau mengubah role akun Anda sendiri.",
    };
  }

  if (
    targetUser.role === "SUPER_ADMIN" &&
    targetUser.isActive &&
    newRole !== "SUPER_ADMIN"
  ) {
    const canProceed = await hasOtherActiveSuperAdmin(targetUser.id);
    if (!canProceed) {
      return {
        success: false as const,
        error:
          "Tindakan ditolak: Sistem wajib memiliki minimal 1 akun SUPER_ADMIN yang aktif.",
      };
    }
  }

  const resolvedLabId = newRole === "KEPALA_LAB" ? labId : null;
  if (resolvedLabId) {
    const labExists = await prisma.lab.findUnique({
      where: { id: resolvedLabId },
      select: { id: true },
    });
    if (!labExists) {
      return {
        success: false as const,
        error: "Laboratorium yang dipilih tidak ditemukan.",
      };
    }
  }

  const ip = await getClientIp();

  const updatedUser = await prisma.user.update({
    where: { id: targetUser.id },
    data: {
      role: newRole,
      labId: resolvedLabId,
    },
    select: SAFE_USER_SELECT,
  });

  await prisma.auditLog.create({
    data: {
      actorId: actor.id,
      action: "USER_ROLE_CHANGED",
      entity: "User",
      entityId: String(updatedUser.id),
      ip,
      meta: {
        email: updatedUser.email,
        previousRole: targetUser.role,
        newRole: updatedUser.role,
        previousLabId: targetUser.labId,
        newLabId: updatedUser.labId,
      },
    },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/audit");

  return {
    success: true as const,
    user: updatedUser,
  };
}

export async function resetUserPasswordAction(rawInput: { userId: number }) {
  const authResult = await authorizeRole("SUPER_ADMIN", "ADMIN");
  if (!authResult.authorized) {
    return { success: false as const, error: authResult.error };
  }

  const actor = authResult.user;
  const parsed = resetUserPasswordSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false as const,
      error: "ID pengguna tidak valid.",
    };
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: parsed.data.userId },
    select: SAFE_USER_SELECT,
  });

  if (!targetUser) {
    return { success: false as const, error: "Akun pengguna tidak ditemukan." };
  }

  if (!canManageTargetRole(actor.role, targetUser.role)) {
    return {
      success: false as const,
      error:
        "403 Forbidden: Anda tidak memiliki otorisasi untuk mereset kata sandi akun ini.",
    };
  }

  const generatedPassword = generateRandomPassword();
  const passwordHash = await bcrypt.hash(generatedPassword, 12);
  const ip = await getClientIp();

  await prisma.user.update({
    where: { id: targetUser.id },
    data: {
      passwordHash,
      mustChangePassword: true,
      failedLoginCount: 0,
      lockedUntil: null,
    },
    select: { id: true },
  });

  await prisma.auditLog.create({
    data: {
      actorId: actor.id,
      action: "USER_PASSWORD_RESET",
      entity: "User",
      entityId: String(targetUser.id),
      ip,
      meta: {
        email: targetUser.email,
        role: targetUser.role,
        mustChangePassword: true,
      },
    },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/audit");

  return {
    success: true as const,
    user: {
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
      identifier: targetUser.identifier,
      role: targetUser.role,
    },
    generatedPassword,
  };
}

export interface CsvPreviewRowResult {
  rowNumber: number;
  name: string;
  email: string;
  identifier: string | null;
  role: string;
  valid: boolean;
  errors: string[];
}

async function validateCsvRowsServerSide(
  rawRows: CsvRawRowInput[],
  actorRole: RoleType
): Promise<{
  previewRows: CsvPreviewRowResult[];
  validCount: number;
  errorCount: number;
}> {
  const seenEmails = new Set<string>();
  const seenIdentifiers = new Set<string>();

  // Collect all candidate emails and identifiers to check DB uniqueness in one query
  const candidateEmails = rawRows
    .map((r) => r.email.trim().toLowerCase())
    .filter(Boolean);
  const candidateIdentifiers = rawRows
    .map((r) => r.identifier?.trim() || "")
    .filter(Boolean);

  const [existingByEmail, existingByIdentifier] = await Promise.all([
    candidateEmails.length > 0
      ? prisma.user.findMany({
          where: { email: { in: candidateEmails } },
          select: { email: true },
        })
      : Promise.resolve([]),
    candidateIdentifiers.length > 0
      ? prisma.user.findMany({
          where: { identifier: { in: candidateIdentifiers } },
          select: { identifier: true },
        })
      : Promise.resolve([]),
  ]);

  const dbEmailSet = new Set(existingByEmail.map((u) => u.email.toLowerCase()));
  const dbIdentifierSet = new Set(
    existingByIdentifier
      .map((u) => u.identifier)
      .filter((id): id is string => Boolean(id))
  );

  const previewRows: CsvPreviewRowResult[] = [];
  let validCount = 0;
  let errorCount = 0;

  for (const row of rawRows) {
    const rowErrors: string[] = [];
    const parsedRow = csvValidatedRowSchema.safeParse({
      name: row.name,
      email: row.email,
      identifier: row.identifier,
      role: row.role,
    });

    const normalizedEmail = row.email.trim().toLowerCase();
    const normalizedIdentifier = row.identifier?.trim() || null;
    const normalizedRole = row.role.trim().toUpperCase();

    if (!parsedRow.success) {
      for (const issue of parsedRow.error.issues) {
        if (issue.path.includes("role")) {
          rowErrors.push(
            `Role "${row.role}" tidak dikenali (gunakan: MAHASISWA, DOSEN, STAFF, KEPALA_LAB, DEKAN, WADEK, ADMIN, SUPER_ADMIN)`
          );
        } else {
          rowErrors.push(issue.message);
        }
      }
    } else {
      const validData = parsedRow.data;

      if (!canManageTargetRole(actorRole, validData.role)) {
        rowErrors.push(
          `Role "${validData.role}" tidak diizinkan untuk diimpor oleh ${actorRole}`
        );
      }

      if (seenEmails.has(validData.email)) {
        rowErrors.push(`Email "${validData.email}" duplikat di dalam file CSV`);
      } else {
        seenEmails.add(validData.email);
      }

      if (dbEmailSet.has(validData.email)) {
        rowErrors.push(`Email "${validData.email}" sudah terdaftar di database`);
      }

      if (validData.identifier) {
        if (seenIdentifiers.has(validData.identifier)) {
          rowErrors.push(
            `Identifier "${validData.identifier}" duplikat di dalam file CSV`
          );
        } else {
          seenIdentifiers.add(validData.identifier);
        }

        if (dbIdentifierSet.has(validData.identifier)) {
          rowErrors.push(
            `Identifier "${validData.identifier}" sudah terdaftar di database`
          );
        }
      }
    }

    const isValid = rowErrors.length === 0;
    if (isValid) {
      validCount++;
    } else {
      errorCount++;
    }

    previewRows.push({
      rowNumber: row.rowNumber,
      name: row.name.trim(),
      email: normalizedEmail,
      identifier: normalizedIdentifier,
      role: normalizedRole,
      valid: isValid,
      errors: rowErrors,
    });
  }

  return { previewRows, validCount, errorCount };
}

export async function previewCsvImportAction(rawInput: {
  rows: CsvRawRowInput[];
}) {
  const authResult = await authorizeRole("SUPER_ADMIN", "ADMIN");
  if (!authResult.authorized) {
    return { success: false as const, error: authResult.error };
  }

  const parsedBatch = csvBatchSchema.safeParse(rawInput);
  if (!parsedBatch.success) {
    const firstIssue = parsedBatch.error.issues[0];
    return {
      success: false as const,
      error: firstIssue?.message || "Format batch CSV tidak valid.",
    };
  }

  const validation = await validateCsvRowsServerSide(
    parsedBatch.data.rows,
    authResult.user.role
  );

  return {
    success: true as const,
    ...validation,
  };
}

export async function commitCsvImportAction(rawInput: {
  rows: CsvRawRowInput[];
}) {
  const authResult = await authorizeRole("SUPER_ADMIN", "ADMIN");
  if (!authResult.authorized) {
    return { success: false as const, error: authResult.error };
  }

  const actor = authResult.user;
  const parsedBatch = csvBatchSchema.safeParse(rawInput);
  if (!parsedBatch.success) {
    const firstIssue = parsedBatch.error.issues[0];
    return {
      success: false as const,
      error: firstIssue?.message || "Format data CSV tidak valid.",
    };
  }

  const validation = await validateCsvRowsServerSide(
    parsedBatch.data.rows,
    actor.role
  );

  const validRows = validation.previewRows.filter((r) => r.valid);
  if (validRows.length === 0) {
    return {
      success: false as const,
      error: "Tidak ada baris CSV yang valid untuk disimpan.",
      previewRows: validation.previewRows,
    };
  }

  // Default lab if any imported row has role KEPALA_LAB
  const defaultLab = await prisma.lab.findFirst({
    orderBy: { id: "asc" },
    select: { id: true },
  });

  const ip = await getClientIp();
  const createdCredentials: Array<{
    id: number;
    name: string;
    email: string;
    identifier: string | null;
    role: RoleType;
    generatedPassword: string;
  }> = [];

  for (const row of validRows) {
    const role = row.role as RoleType;
    const generatedPassword = generateRandomPassword();
    const passwordHash = await bcrypt.hash(generatedPassword, 12);

    const created = await prisma.user.create({
      data: {
        name: row.name,
        email: row.email,
        identifier: row.identifier,
        passwordHash,
        role,
        isActive: true,
        mustChangePassword: true,
        labId: role === "KEPALA_LAB" ? (defaultLab?.id ?? null) : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        identifier: true,
        role: true,
      },
    });

    createdCredentials.push({
      ...created,
      generatedPassword,
    });
  }

  await prisma.auditLog.create({
    data: {
      actorId: actor.id,
      action: "USER_CSV_IMPORTED",
      entity: "User",
      entityId: `batch:${createdCredentials.length}`,
      ip,
      meta: {
        importedCount: createdCredentials.length,
        skippedErrorCount: validation.errorCount,
        importedEmails: createdCredentials.map((u) => u.email),
      },
    },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/audit");
  revalidatePath("/admin");

  return {
    success: true as const,
    importedCount: createdCredentials.length,
    skippedErrorCount: validation.errorCount,
    createdCredentials,
  };
}

