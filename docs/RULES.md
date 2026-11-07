# Aturan & Pedoman Pengembangan: Website Fakultas Hukum Universitas Pelita Bangsa

Dokumen ini adalah acuan utama (single source of truth) untuk seluruh proses rekayasa perangkat lunak pada proyek Website Fakultas Hukum Universitas Pelita Bangsa (FH UPB).

---

## 1. Konteks Proyek & Arsitektur Inti

- **Platform:** Website Utama & Sistem Administrasi Fakultas Hukum Universitas Pelita Bangsa.
- **Tech Stack:**
  - **Framework:** Next.js 16 (App Router)
  - **Runtime & UI Library:** React 19, TypeScript (Strict Mode)
  - **Styling:** Tailwind CSS v4
  - **Database & ORM:** MySQL & Prisma 6
  - **Authentication:** `next-auth` v5 (Auth.js beta)
  - **Keamanan Kredensial:** `bcryptjs` (salt hashing 10–12 rounds)
  - **Validasi Data:** `zod`
  - **Sanitasi Konten:** `isomorphic-dompurify` (sanitasi server-side untuk mitigasi XSS)
  - **Icons:** `lucide-react`
- **Status Transisi:** Website publik saat ini telah selesai secara visual dan fungsional statis. Login yang sebelumnya menggunakan dummy/mock credentials sedang dialihkan secara bertahap menuju autentikasi nyata berbasis database dan dashboard admin terlindungi.

---

## 2. Aturan Wajib (Non-Negotiable Rules)

Setiap pengembang maupun AI Agent wajib mematuhi ketentuan berikut:

1. **Konsistensi Desain Publik:**
   - Wajib membaca `docs/DESIGN.md`, `docs/PRD.md`, dan `docs/RULES.md` sebelum melakukan perubahan UI.
   - **Dilarang keras mengubah desain publik yang sudah ada.** Identitas visual publik adalah:
     - Warna primer: Maroon (`#570000` / `#710912` / Deep Burgundy), Antique Gold (`#C28D39` / `#C5A059`), Dark Espresso (`#362822` / `#1A1A1A`).
     - Tipografi: **Playfair Display** (Heading / Editorial Serif) + **Plus Jakarta Sans** / **Inter** (Body / UI Sans).
     - Geometri: Sharp architectural edges (`rounded-none` / zero-radius untuk elemen editorial institusi).

2. **Daftar Role Resmi:**
   Sistem mengenal 8 tingkatan peran (RBAC) eksklusif:
   - `SUPER_ADMIN` (Akses penuh seluruh sistem, manajemen akun admin & konfigurasi tingkat tinggi)
   - `ADMIN` (Pengelola CMS warta, artikel, agenda, direktori, dan data akademik)
   - `KEPALA_LAB` (Pengelola Laboratorium Peradilan Semu dan fasilitas riset praktik)
   - `DEKAN` (Pimpinan fakultas: pengawasan eksekutif, persetujuan warta & pengumuman resmi)
   - `WADEK` (Wakil dekan bidang akademik, kemahasiswaan, dan kerja sama)
   - `DOSEN` (Tenaga pendidik: profil kepakaran, publikasi, dan materi ajar)
   - `STAFF` (Tenaga kependidikan / operasional administratif)
   - `MAHASISWA` (Akses portal sivitas akademika mahasiswa)

3. **Tanpa Pendaftaran Publik (No Public Registration):**
   - Tidak ada fitur pendaftaran mandiri (self-registration / sign-up publik) untuk akun sistem.
   - Semua akun pengguna **hanya dapat dibuat oleh Admin / Super Admin** melalui dashboard pengelolaan internal.

4. **Keamanan Berlapis di Sisi Server (Defense in Depth):**
   - Semua otorisasi wajib dicek di sisi server:
     - **Server Component Layouts** (melindungi segment tree halaman).
     - **Server Actions** (memverifikasi session dan role pemanggil sebelum mutasi).
     - **Route Handlers / API** (validasi token dan hak akses sebelum mengembalikan response).
   - `proxy.ts` (Next.js middleware/proxy) hanya berfungsi sebagai gerbang pertama (first line of defense), bukan satu-satunya pengaman.

5. **Validasi Input & Perlindungan Data Sensitif:**
   - Semua payload dan input pengguna wajib divalidasi dengan skema **Zod**.
   - **Dilarang keras mengembalikan `passwordHash` ke sisi client.** Selalu gunakan projection atau eliminasi properti (e.g. `exclude(user, ['passwordHash'])` / DTO).
   - **Dilarang keras menuliskan password, secret, atau token ke dalam log console / file.**

6. **Workflow Eksekusi Bertahap (Phased Execution):**
   - Setiap modifikasi dikerjakan secara bertahap per fase.
   - Setelah setiap fase selesai dikerjakan, jalankan `npm run lint` dan `npm run build` untuk memverifikasi integritas build.
   - Laporkan ringkasan berkas yang diubah kepada pengguna.
   - **Dilarang melanjutkan ke fase berikutnya tanpa persetujuan eksplisit dari pengguna.**

---

## 3. Spesifikasi Skema Database Prisma (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Role {
  SUPER_ADMIN
  ADMIN
  KEPALA_LAB
  DEKAN
  WADEK
  DOSEN
  STAFF
  MAHASISWA
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum EventStatus {
  DRAFT
  PUBLISHED
}

model Lab {
  id          Int      @id @default(autoincrement())
  name        String
  slug        String   @unique
  description String?  @db.Text
  users       User[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model User {
  id                 Int        @id @default(autoincrement())
  name               String
  email              String     @unique
  identifier         String?    @unique
  passwordHash       String
  role               Role       @default(MAHASISWA)
  isActive           Boolean    @default(true)
  mustChangePassword Boolean    @default(true)
  labId              Int?
  lab                Lab?       @relation(fields: [labId], references: [id], onDelete: SetNull)
  lastLoginAt        DateTime?
  failedLoginCount   Int        @default(0)
  lockedUntil        DateTime?
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt
  posts              Post[]
  auditLogs          AuditLog[]
}

model AuditLog {
  id        Int      @id @default(autoincrement())
  actorId   Int?
  actor     User?    @relation(fields: [actorId], references: [id], onDelete: SetNull)
  action    String
  entity    String
  entityId  String?
  meta      Json?
  ip        String?
  createdAt DateTime @default(now())
}

model Post {
  id          Int        @id @default(autoincrement())
  title       String
  slug        String     @unique
  content     String     @db.LongText
  coverImage  String?
  status      PostStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  authorId    Int
  author      User       @relation(fields: [authorId], references: [id])
}

model Event {
  id          Int         @id @default(autoincrement())
  title       String      @unique
  slug        String      @unique
  description String      @db.Text
  eventDate   DateTime
  location    String
  speaker     String?
  status      EventStatus @default(DRAFT)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Faculty {
  id             Int      @id @default(autoincrement())
  name           String
  titles         String
  nip            String   @unique
  specialization String
  bioQuote       String   @db.Text
  profileImage   String?
  researchLink   String?
  displayOrder   Int      @default(0)
  isActive       Boolean  @default(true)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

---

## 4. Rencana Kerja Bertahap (Phased Roadmap)

1. **Fase 1: Fondasi Skema, Validasi & Dependensi**
   - Pembaruan `docs/RULES.md` dengan instruksi dan standar kepatuhan terbaru.
   - Pemasangan dan konfigurasi `zod` untuk validasi schema.
   - Penyelarasan enum `Role` pada `prisma/schema.prisma` (`SUPER_ADMIN`, `ADMIN`, `KEPALA_LAB`, `DEKAN`, `WADEK`, `DOSEN`, `STAFF`, `MAHASISWA`).
   - Pembuatan modul skema Zod (`src/lib/validations/auth.ts`, `user.ts`) untuk login dan otentikasi.
   - Regenerasi Prisma Client (`npx prisma generate`).

2. **Fase 2: Konfigurasi Auth.js / NextAuth v5 & Server Gateways**
   - Pembaruan `src/auth.ts` dengan penanganan otentikasi riil via Prisma + `bcryptjs`, dukungan 8 roles, session callback, dan pencegahan ekspos data sensitif.
   - Implementasi gerbang `proxy.ts` / middleware untuk perlindungan rute awal (redirection non-authenticated users).
   - Pembuatan helper server-side auth guard (`requireAuth`, `requireRole`) untuk Server Components dan Server Actions.

3. **Fase 3: Transisi Halaman Login ke Autentikasi Nyata**
   - Penghapusan ketergantungan dummy fallback credentials pada `src/app/login/page.tsx`.
   - Validasi input form client & server menggunakan Zod.
   - Penyesuaian antarmuka login (pemilihan role / smart detection) sesuai 8 roles resmi tanpa merusak estetika desain yang ada.
   - Error handling yang aman (pesan kesalahan informatif tanpa membocorkan eksistensi user secara spesifik untuk mencegah enumeration).

4. **Fase 4: Perlindungan Dashboard & Server-Side Otorisasi**
   - Implementasi server-side session & role verification di `src/app/admin/layout.tsx`.
   - Menjamin bahwa pengguna dengan role tidak berwenang (misal `MAHASISWA`) ditolak dari panel administratif di level server sebelum komponen dirender.
   - Otorisasi berlapis pada seluruh Route Handlers (`src/app/api/admin/*`) dan Server Actions.

5. **Fase 5: Manajemen Akun Pengguna oleh Admin**
   - Pembuatan fitur pembuatan dan pengelolaan akun pengguna internal oleh Admin / Super Admin.
   - Form pembuatan user terisolasi dengan validasi Zod dan hashing kata sandi (`bcryptjs`).
   - Tidak ada endpoint registrasi publik.

6. **Fase 6: Audit Keamanan, Pembersihan & Verifikasi Final**
   - Pengecekan menyeluruh terhadap kebocoran `passwordHash` atau token dalam response API/Action.
   - Uji coba linting (`npm run lint`) dan build (`npm run build`).
   - Dokumentasi laporan akhir.

```

---

## 4. Rencana Kerja Bertahap (Phased Roadmap)

1. **Fase 1: Fondasi Skema, Validasi & Dependensi**
   - Pembaruan `docs/RULES.md` dengan instruksi dan standar kepatuhan terbaru.
   - Pemasangan dan konfigurasi `zod` untuk validasi schema.
   - Penyelarasan enum `Role` pada `prisma/schema.prisma` (`SUPER_ADMIN`, `ADMIN`, `KEPALA_LAB`, `DEKAN`, `WADEK`, `DOSEN`, `STAFF`, `MAHASISWA`).
   - Pembuatan modul skema Zod (`src/lib/validations/auth.ts`, `user.ts`) untuk login dan otentikasi.
   - Regenerasi Prisma Client (`npx prisma generate`).

2. **Fase 2: Konfigurasi Auth.js / NextAuth v5 & Server Gateways**
   - Pembaruan `src/auth.ts` dengan penanganan otentikasi riil via Prisma + `bcryptjs`, dukungan 8 roles, session callback, dan pencegahan ekspos data sensitif.
   - Implementasi gerbang `proxy.ts` / middleware untuk perlindungan rute awal (redirection non-authenticated users).
   - Pembuatan helper server-side auth guard (`requireAuth`, `requireRole`) untuk Server Components dan Server Actions.

3. **Fase 3: Transisi Halaman Login ke Autentikasi Nyata**
   - Penghapusan ketergantungan dummy fallback credentials pada `src/app/login/page.tsx`.
   - Validasi input form client & server menggunakan Zod.
   - Penyesuaian antarmuka login (pemilihan role / smart detection) sesuai 8 roles resmi tanpa merusak estetika desain yang ada.
   - Error handling yang aman (pesan kesalahan informatif tanpa membocorkan eksistensi user secara spesifik untuk mencegah enumeration).

4. **Fase 4: Perlindungan Dashboard & Server-Side Otorisasi**
   - Implementasi server-side session & role verification di `src/app/admin/layout.tsx`.
   - Menjamin bahwa pengguna dengan role tidak berwenang (misal `MAHASISWA`) ditolak dari panel administratif di level server sebelum komponen dirender.
   - Otorisasi berlapis pada seluruh Route Handlers (`src/app/api/admin/*`) dan Server Actions.

5. **Fase 5: Manajemen Akun Pengguna oleh Admin**
   - Pembuatan fitur pembuatan dan pengelolaan akun pengguna internal oleh Admin / Super Admin.
   - Form pembuatan user terisolasi dengan validasi Zod dan hashing kata sandi (`bcryptjs`).
   - Tidak ada endpoint registrasi publik.

6. **Fase 6: Audit Keamanan, Pembersihan & Verifikasi Final**
   - Pengecekan menyeluruh terhadap kebocoran `passwordHash` atau token dalam response API/Action.
   - Uji coba linting (`npm run lint`) dan build (`npm run build`).
   - Dokumentasi laporan akhir.