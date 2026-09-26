import { prisma } from "@/lib/prisma";
import {
  initialPosts,
  initialEvents,
  initialFaculty,
  PostItem,
  EventItem,
  FacultyItem,
} from "@/data/initialData";

export async function getPublishedPosts(): Promise<PostItem[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { author: true },
    });

    if (posts && posts.length > 0) {
      return posts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.content.replace(/<[^>]+>/g, "").slice(0, 160) + "...",
        content: p.content,
        category: "Kajian Yuridis",
        author: p.author?.username || "Sivitas Akademika FH",
        authorRole: "Dosen Fakultas Hukum",
        publishedAt: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "September 2026",
        readTime: "5 menit baca",
        coverImage: p.coverImage || "/images/hero-library.jpg",
        status: p.status as "PUBLISHED",
      }));
    }
  } catch {
    // Database connection fallback during initial evaluation
  }

  return initialPosts;
}

export async function getUpcomingEvents(): Promise<EventItem[]> {
  try {
    const events = await prisma.event.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { eventDate: "asc" },
    });

    if (events && events.length > 0) {
      return events.map((e) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        eventDate: new Date(e.eventDate).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        time: "09.00 - 12.30 WIB",
        location: e.location,
        speaker: e.speaker || "Narasumber Pakar Hukum",
        speakerRole: "Akademisi / Praktisi Hukum",
        badge: "Agenda Akademik",
        status: e.status as "PUBLISHED",
      }));
    }
  } catch {
    // Database connection fallback
  }

  return initialEvents;
}

export async function getActiveFaculty(): Promise<FacultyItem[]> {
  try {
    const faculty = await prisma.faculty.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    if (faculty && faculty.length > 0) {
      return faculty.map((f) => ({
        id: f.id,
        name: f.name,
        titles: f.titles,
        nip: f.nip,
        specialization: f.specialization,
        bioQuote: f.bioQuote,
        profileImage: f.profileImage || "/images/prof-hendra.jpg",
        researchLink: f.researchLink || undefined,
        displayOrder: f.displayOrder,
        isActive: f.isActive,
      }));
    }
  } catch {
    // Database connection fallback
  }

  return initialFaculty;
}
