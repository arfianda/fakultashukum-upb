import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialFaculty } from "@/data/initialData";

export async function GET() {
  try {
    const faculty = await prisma.faculty.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, data: faculty });
  } catch {
    return NextResponse.json({ success: true, data: initialFaculty, isFallback: true });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, titles, nip, specialization, bioQuote, profileImage, researchLink, displayOrder } = body;

    if (!name || !nip || !specialization) {
      return NextResponse.json(
        { success: false, error: "Nama, NIP, dan spesialisasi keilmuan wajib diisi." },
        { status: 400 }
      );
    }

    try {
      const f = await prisma.faculty.create({
        data: {
          name,
          titles: titles || "",
          nip,
          specialization,
          bioQuote: bioQuote || "",
          profileImage: profileImage || "/images/prof-hendra.jpg",
          researchLink: researchLink || null,
          displayOrder: displayOrder ? parseInt(displayOrder) : 0,
          isActive: true,
        },
      });
      return NextResponse.json({ success: true, data: f });
    } catch {
      return NextResponse.json({
        success: true,
        data: {
          id: Date.now(),
          name,
          titles,
          nip,
          specialization,
          bioQuote,
          profileImage: profileImage || "/images/prof-hendra.jpg",
          researchLink,
          displayOrder: displayOrder ? parseInt(displayOrder) : 0,
          isActive: true,
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
