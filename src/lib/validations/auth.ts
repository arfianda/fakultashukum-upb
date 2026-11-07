import { z } from "zod";

export const RoleEnum = z.enum([
  "SUPER_ADMIN",
  "ADMIN",
  "KEPALA_LAB",
  "DEKAN",
  "WADEK",
  "DOSEN",
  "STAFF",
  "MAHASISWA",
]);

export type RoleType = z.infer<typeof RoleEnum>;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, "Identitas akun wajib diisi")
    .max(150, "Identitas akun terlalu panjang"),
  password: z
    .string()
    .min(6, "Kata sandi wajib diisi")
    .max(100, "Kata sandi terlalu panjang"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string()
    .trim()
    .email("Format email tidak valid")
    .max(150, "Email maksimal 150 karakter"),
  identifier: z
    .string()
    .trim()
    .min(3, "Identifier (NIM/NIDN/NIP) minimal 3 karakter")
    .max(50, "Identifier maksimal 50 karakter")
    .nullable()
    .optional(),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password maksimal 100 karakter"),
  role: RoleEnum.default("MAHASISWA"),
  isActive: z.boolean().default(true),
  mustChangePassword: z.boolean().default(true),
  labId: z.number().int().positive().nullable().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .optional(),
  email: z
    .string()
    .trim()
    .email("Format email tidak valid")
    .max(150, "Email maksimal 150 karakter")
    .optional(),
  identifier: z
    .string()
    .trim()
    .min(3, "Identifier (NIM/NIDN/NIP) minimal 3 karakter")
    .max(50, "Identifier maksimal 50 karakter")
    .nullable()
    .optional(),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password maksimal 100 karakter")
    .optional()
    .or(z.literal("")),
  role: RoleEnum.optional(),
  isActive: z.boolean().optional(),
  mustChangePassword: z.boolean().optional(),
  labId: z.number().int().positive().nullable().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

/**
 * Sanitizes user record by omitting sensitive passwordHash.
 * Guarantees passwordHash is never leaked to client or logs.
 */
export function sanitizeUser<T extends { passwordHash?: string }>(user: T): Omit<T, "passwordHash"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
