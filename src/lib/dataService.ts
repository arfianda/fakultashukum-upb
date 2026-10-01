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

export const getFacultyData = getActiveFaculty;


export async function getPostBySlug(slug: string): Promise<PostItem | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { author: true },
    });

    if (post && post.status === "PUBLISHED") {
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.content.replace(/<[^>]+>/g, "").slice(0, 160) + "...",
        content: post.content,
        category: "Kajian Yuridis",
        author: post.author?.username || "Sivitas Akademika FH",
        authorRole: "Dosen Fakultas Hukum",
        publishedAt: post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "September 2026",
        readTime: "5 menit baca",
        coverImage: post.coverImage || "/images/hero-library.jpg",
        status: post.status as "PUBLISHED",
      };
    }
  } catch {
    // Database connection fallback
  }

  const fallback = initialPosts.find((p) => p.slug === slug);
  return fallback || null;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  try {
    const event = await prisma.event.findUnique({
      where: { slug },
    });

    if (event && event.status === "PUBLISHED") {
      return {
        id: event.id,
        title: event.title,
        slug: event.slug,
        description: event.description,
        eventDate: new Date(event.eventDate).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        time: "09.00 - 12.30 WIB",
        location: event.location,
        speaker: event.speaker || "Narasumber Pakar Hukum",
        speakerRole: "Akademisi / Praktisi Hukum",
        badge: "Agenda Akademik",
        status: event.status as "PUBLISHED",
      };
    }
  } catch {
    // Database connection fallback
  }

  const fallback = initialEvents.find((e) => e.slug === slug);
  return fallback || null;
}

export function createFacultySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function getFacultyBySlug(slug: string): Promise<(FacultyItem & { slug: string }) | null> {
  const allFaculty = await getFacultyData();
  const normalizedQuery = slug.toLowerCase().replace(/[^a-z0-9]/g, "");

  const found = allFaculty.find((f) => {
    const fullSlug = createFacultySlug(f.name);
    const normalizedName = f.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      fullSlug === slug ||
      normalizedName.includes(normalizedQuery) ||
      normalizedQuery.includes(normalizedName)
    );
  });

  if (!found) return null;

  return {
    ...found,
    slug: createFacultySlug(found.name),
  };
}

