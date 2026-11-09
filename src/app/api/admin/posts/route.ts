import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";
import { initialPosts } from "@/data/initialData";
import { authorizePermission } from "@/lib/rbac";

const createPostSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter").max(255),
  slug: z.string().trim().optional(),
  content: z.string().trim().min(10, "Konten minimal 10 karakter"),
  coverImage: z.string().trim().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional().default("PUBLISHED"),
});

export async function GET() {
  const authResult = await authorizePermission("content:read");
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, data: posts });
  } catch {
    return NextResponse.json({
      success: true,
      data: initialPosts,
      isFallback: true,
    });
  }
}

export async function POST(request: Request) {
  const authResult = await authorizePermission("content:write");
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const body = await request.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Judul dan konten wajib diisi.",
        },
        { status: 400 }
      );
    }

    const { title, slug, content, coverImage, status } = parsed.data;
    const cleanContent = sanitizeHtml(content);

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now();

    const post = await prisma.post.create({
      data: {
        title,
        slug: generatedSlug,
        content: cleanContent,
        coverImage: coverImage || "/images/hero-library.jpg",
        status,
        publishedAt: new Date(),
        authorId: authResult.user.id,
      },
    });

    return NextResponse.json({ success: true, data: post });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
