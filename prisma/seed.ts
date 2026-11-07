import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

const seedEnvSchema = z.object({
  SEED_ADMIN_EMAIL: z
    .string({ message: "SEED_ADMIN_EMAIL wajib diatur di .env" })
    .trim()
    .email("Format SEED_ADMIN_EMAIL tidak valid"),
  SEED_ADMIN_PASSWORD: z
    .string({ message: "SEED_ADMIN_PASSWORD wajib diatur di .env" })
    .min(8, "SEED_ADMIN_PASSWORD minimal 8 karakter"),
  SEED_ADMIN_NAME: z
    .string()
    .trim()
    .min(2)
    .optional()
    .default("Super Administrator FH UPB"),
  SEED_ADMIN_IDENTIFIER: z
    .string()
    .trim()
    .min(2)
    .optional()
    .default("SA-FHUPB-001"),
});

async function main() {
  const parsedEnv = seedEnvSchema.safeParse({
    SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL,
    SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
    SEED_ADMIN_NAME: process.env.SEED_ADMIN_NAME,
    SEED_ADMIN_IDENTIFIER: process.env.SEED_ADMIN_IDENTIFIER,
  });

  if (!parsedEnv.success) {
    const issues = parsedEnv.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Validasi environment seed gagal: ${issues}`);
  }

  const {
    SEED_ADMIN_EMAIL,
    SEED_ADMIN_PASSWORD,
    SEED_ADMIN_NAME,
    SEED_ADMIN_IDENTIFIER,
  } = parsedEnv.data;

  // Hash password dengan bcrypt cost factor 12
  const passwordHash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 12);

  // Idempotent upsert untuk Laboratorium dasar Fakultas Hukum
  const defaultLabs = [
    {
      name: "Laboratorium Peradilan Semu",
      slug: "laboratorium-peradilan-semu",
      description:
        "Fasilitas praktik litigasi, simulasi persidangan, dan pemberkasan perkara berstandar Mahkamah Agung RI.",
    },
    {
      name: "Klinik Bantuan Hukum (KLBH)",
      slug: "klinik-bantuan-hukum",
      description:
        "Pusat konsultasi hukum, advokasi pro-bono masyarakat, dan pendidikan hukum klinis mahasiswa.",
    },
  ];

  for (const lab of defaultLabs) {
    await prisma.lab.upsert({
      where: { slug: lab.slug },
      update: {
        name: lab.name,
        description: lab.description,
      },
      create: lab,
    });
  }

  // Idempotent upsert untuk akun SUPER_ADMIN
  const superAdmin = await prisma.user.upsert({
    where: { email: SEED_ADMIN_EMAIL },
    update: {
      name: SEED_ADMIN_NAME,
      identifier: SEED_ADMIN_IDENTIFIER,
      passwordHash,
      role: Role.SUPER_ADMIN,
      isActive: true,
      mustChangePassword: false,
      failedLoginCount: 0,
      lockedUntil: null,
    },
    create: {
      name: SEED_ADMIN_NAME,
      email: SEED_ADMIN_EMAIL,
      identifier: SEED_ADMIN_IDENTIFIER,
      passwordHash,
      role: Role.SUPER_ADMIN,
      isActive: true,
      mustChangePassword: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      identifier: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: superAdmin.id,
      action: "SEED_SUPER_ADMIN",
      entity: "User",
      entityId: String(superAdmin.id),
      meta: {
        email: superAdmin.email,
        role: superAdmin.role,
      },
      ip: "127.0.0.1",
    },
  });

  console.info(
    `[db:seed] Akun SUPER_ADMIN berhasil disinkronkan: ${superAdmin.email} (ID: ${superAdmin.id}, Role: ${superAdmin.role})`
  );
}

main()
  .catch((error) => {
    console.error("[db:seed] Gagal menjalankan seed:", error instanceof Error ? error.message : "Unknown error");
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

