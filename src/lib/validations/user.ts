import { z } from "zod";
import { RoleEnum } from "@/lib/validations/auth";

const optionalIdentifierSchema = z
  .union([
    z
      .string()
      .trim()
      .min(3, "Identifier (NIM/NIDN/NIP) minimal 3 karakter")
      .max(50, "Identifier maksimal 50 karakter"),
    z.literal(""),
    z.null(),
    z.undefined(),
  ])
  .transform((val) => {
    if (!val || val.trim() === "") return null;
    return val.trim();
  });

export const adminCreateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Format alamat email tidak valid")
      .max(150, "Email maksimal 150 karakter"),
    identifier: optionalIdentifierSchema,
    role: RoleEnum.default("MAHASISWA"),
    isActive: z.boolean().default(true),
    labId: z.number().int().positive().nullable().optional().default(null),
  })
  .superRefine((data, ctx) => {
    if (data.role === "KEPALA_LAB" && !data.labId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kepala Lab wajib ditugaskan ke salah satu Laboratorium Hukum",
        path: ["labId"],
      });
    }
  });

export type AdminCreateUserInput = z.infer<typeof adminCreateUserSchema>;

export const adminUpdateUserSchema = z
  .object({
    id: z.number().int().positive("ID pengguna tidak valid"),
    name: z
      .string()
      .trim()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Format alamat email tidak valid")
      .max(150, "Email maksimal 150 karakter"),
    identifier: optionalIdentifierSchema,
    role: RoleEnum,
    isActive: z.boolean(),
    labId: z.number().int().positive().nullable().optional().default(null),
  })
  .superRefine((data, ctx) => {
    if (data.role === "KEPALA_LAB" && !data.labId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kepala Lab wajib ditugaskan ke salah satu Laboratorium Hukum",
        path: ["labId"],
      });
    }
  });

export type AdminUpdateUserInput = z.infer<typeof adminUpdateUserSchema>;

export const toggleUserActiveSchema = z.object({
  userId: z.number().int().positive("ID pengguna tidak valid"),
  isActive: z.boolean(),
});

export const changeUserRoleSchema = z
  .object({
    userId: z.number().int().positive("ID pengguna tidak valid"),
    role: RoleEnum,
    labId: z.number().int().positive().nullable().optional().default(null),
  })
  .superRefine((data, ctx) => {
    if (data.role === "KEPALA_LAB" && !data.labId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kepala Lab wajib ditugaskan ke salah satu Laboratorium Hukum",
        path: ["labId"],
      });
    }
  });

export const resetUserPasswordSchema = z.object({
  userId: z.number().int().positive("ID pengguna tidak valid"),
});

export const csvRawRowSchema = z.object({
  rowNumber: z.number().int().positive(),
  name: z.string().trim(),
  email: z.string().trim(),
  identifier: z.string().trim().optional().default(""),
  role: z.string().trim(),
});

export type CsvRawRowInput = z.infer<typeof csvRawRowSchema>;

export const csvValidatedRowSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Format email tidak valid")
    .max(150, "Email maksimal 150 karakter"),
  identifier: optionalIdentifierSchema,
  role: z
    .string()
    .trim()
    .toUpperCase()
    .pipe(RoleEnum),
});

export const csvBatchSchema = z.object({
  rows: z
    .array(csvRawRowSchema)
    .min(1, "File CSV tidak memiliki baris data")
    .max(500, "Maksimal 500 baris per impor CSV"),
});
