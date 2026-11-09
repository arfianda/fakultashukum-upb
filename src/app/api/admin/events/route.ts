import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { initialEvents } from "@/data/initialData";
import { authorizePermission } from "@/lib/rbac";

const createEventSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter").max(255),
  slug: z.string().trim().optional(),
  description: z.string().trim().min(5, "Deskripsi wajib diisi"),
  eventDate: z.string().optional(),
  location: z.string().trim().min(2, "Lokasi wajib diisi"),
  speaker: z.string().trim().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional().default("PUBLISHED"),
});

export async function GET() {
  const authResult = await authorizePermission("content:read");
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: "asc" },
    });
    return NextResponse.json({ success: true, data: events });
  } catch {
    return NextResponse.json({
      success: true,
      data: initialEvents,
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
    const parsed = createEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            parsed.error.issues[0]?.message ||
            "Judul, deskripsi, dan lokasi wajib diisi.",
        },
        { status: 400 }
      );
    }

    const { title, slug, description, eventDate, location, speaker, status } =
      parsed.data;

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now();

    const event = await prisma.event.create({
      data: {
        title,
        slug: generatedSlug,
        description,
        eventDate: eventDate ? new Date(eventDate) : new Date(),
        location,
        speaker: speaker || null,
        status,
      },
    });

    return NextResponse.json({ success: true, data: event });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
