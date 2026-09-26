import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialEvents } from "@/data/initialData";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: "asc" },
    });
    return NextResponse.json({ success: true, data: events });
  } catch {
    return NextResponse.json({ success: true, data: initialEvents, isFallback: true });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, description, eventDate, location, speaker, status } = body;

    if (!title || !description || !location) {
      return NextResponse.json(
        { success: false, error: "Judul, deskripsi, dan lokasi wajib diisi." },
        { status: 400 }
      );
    }

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now();

    try {
      const event = await prisma.event.create({
        data: {
          title,
          slug: generatedSlug,
          description,
          eventDate: eventDate ? new Date(eventDate) : new Date(),
          location,
          speaker: speaker || null,
          status: status || "PUBLISHED",
        },
      });
      return NextResponse.json({ success: true, data: event });
    } catch {
      return NextResponse.json({
        success: true,
        data: {
          id: Date.now(),
          title,
          slug: generatedSlug,
          description,
          eventDate: eventDate ? new Date(eventDate) : new Date(),
          location,
          speaker,
          status: status || "PUBLISHED",
        },
        message: "Disimpan secara virtual (Database lokal offline).",
      });
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
