# AI Vibecoding Blueprint: Website Utama Fakultas Hukum Universitas Pelita Bangsa

## 1. Project Context & Objective
You are an expert Fullstack Developer specializing in Next.js, TypeScript, and modern UI/UX design. Your task is to build a prestigious, international-standard landing page and CMS for "Fakultas Hukum Universitas Pelita Bangsa" (Website 1).
The lead developer overseeing this project operates on a Linux environment (EndeavourOS), so ensure all terminal commands, script executions, and file pathing are strictly POSIX/Linux-compliant.

## 2. Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Database ORM:** Prisma
- **Authentication:** NextAuth.js (Auth.js) for CMS Admin
- **Security:** DOMPurify (Server-side HTML sanitization for XSS mitigation)
- **Icons:** Lucide React

## 3. Design System & UI/UX Guidelines
The visual architecture is inspired by classic-modern prestige (e.g., Yale Law School).
- **Primary Color:** Dark Maroon / Crimson Deep (`#800000` or `bg-red-900` with custom hex).
- **Backgrounds:** Crisp White (`#FFFFFF`) and Light Gray (`#F9FAFB`).
- **Borders:** Thin, precise 1px borders for grids and cards to maximize whitespace.
- **Typography:**
  - Headings (H1-H4): Serif fonts (e.g., `Playfair Display`, `Baskerville`).
  - Body & UI Text: Clean Sans-Serif (e.g., `Inter`, `Roboto`).
- **Components Structure:**
  - Sticky transparent navbar transitioning to solid Dark Maroon on scroll.
  - Generous whitespace and asymmetrical editorial grid layouts for news/events.

## 4. Prisma Database Schema
Use the following schema for the CMS backend. Place this in `prisma/schema.prisma`.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Role {
  SUPERADMIN
  CONTENT_WRITER
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

model User {
  id           Int      @id @default(autoincrement())
  username     String   @unique
  passwordHash String
  role         Role     @default(CONTENT_WRITER)
  createdAt    DateTime @default(now())
  posts        Post[]
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
  title       String
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