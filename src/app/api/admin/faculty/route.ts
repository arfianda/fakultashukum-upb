import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { initialFaculty } from "@/data/initialData";
import { authorizePermission } from "@/lib/rbac";

const createFacultySchema = z.object({
  name: z.string().trim().min(2, "Nama wajib diisi"),
  titles: z.string().trim().optional().default(""),
  nip: z.string().trim().min(3, "NIP wajib diisi"),
  specialization: z.string().trim().min(2, "Spesialisasi wajib diisi"),
  bioQuote: z.string().trim().optional().default(""),
  profileImage: z.string().trim().optional(),
  researchLink: z.string().trim().optional().nullable(),
  displayOrder: z.union([z.number(), z.string()]).optional().default(0),
});

export async function GET() {
  const authResult = await authorizePermission("content:read");
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const faculty = await prisma.faculty.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, data: faculty });
  } catch {
    return NextResponse.json({
      success: true,
      data: initialFaculty,
      isFallback: true,
    });
  }
}

export async function POST(request: Request) {
  const authResult = await authorizePermission("faculty:manage");
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const body = await request.json();
    const parsed = createFacultySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            parsed.error.issues[0]?.message ||
            "Nama, NIP, dan spesialisasi keilmuan wajib diisi.",
        },
        { status: 400 }
      );
    }

    const {
      name,
      titles,
      nip,
      specialization,
      bioQuote,
      profileImage,
      researchLink,
      displayOrder,
    } = parsed.data;

    const f = await prisma.faculty.create({
      data: {
        name,
        titles,
        nip,
        specialization,
        bioQuote,
        profileImage: profileImage || "/images/jajaran/dekan.jpg",
        researchLink: researchLink || null,
        displayOrder:
          typeof displayOrder === "number"
            ? displayOrder
            : parseInt(String(displayOrder), 10) || 0,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, data: f });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
