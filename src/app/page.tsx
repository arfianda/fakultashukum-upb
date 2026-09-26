import { getPublishedPosts, getUpcomingEvents, getActiveFaculty } from "@/lib/dataService";
import { HomeClient } from "@/components/HomeClient";

// Server-side rendered landing page for high FCP performance (<2.5s) and SEO
export default async function HomePage() {
  const [posts, events, faculty] = await Promise.all([
    getPublishedPosts(),
    getUpcomingEvents(),
    getActiveFaculty(),
  ]);

  return <HomeClient posts={posts} events={events} faculty={faculty} />;
}
