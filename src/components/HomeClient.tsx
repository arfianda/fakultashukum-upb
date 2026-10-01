"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { YaleNewsSection } from "@/components/YaleNewsSection";
import { YaleEventsSection } from "@/components/YaleEventsSection";
import { YaleAreasOfStudy } from "@/components/YaleAreasOfStudy";
import { YaleThreeFeatures } from "@/components/YaleThreeFeatures";
import { YaleStudentSpotlight } from "@/components/YaleStudentSpotlight";
import { DeanCreed } from "@/components/DeanCreed";
import { CurriculumSection } from "@/components/CurriculumSection";
import { FacultyDirectory } from "@/components/FacultyDirectory";
import { AlumniSection } from "@/components/AlumniSection";
import { AdmissionSection } from "@/components/AdmissionSection";
import { YaleConnectWithUs } from "@/components/YaleConnectWithUs";
import { YaleQuickBar } from "@/components/YaleQuickBar";
import { PostItem, EventItem, FacultyItem } from "@/data/initialData";
import { useAdmission } from "@/context/AdmissionContext";

export function HomeClient({
  posts,
  events,
  faculty,
}: {
  posts: PostItem[];
  events: EventItem[];
  faculty: FacultyItem[];
}) {
  const { openAdmission } = useAdmission();

  return (
    <>
      {/* 1. Hero: Monumental architectural poster with bottom-left content box */}
      <Hero onOpenAdmission={openAdmission} />

      {/* 2. Yale-style News Section: 1 Lead featured story + 4 horizontal thumbnail stories */}
      <YaleNewsSection posts={posts} />

      {/* 3. Yale-style Events Section: 3x2 grid of 6 academic events with prominent date blocks */}
      <YaleEventsSection events={events} />

      {/* 4. Yale-style Explore Areas of Study: Full-width deep academic banner with 3 large photographic cards */}
      <YaleAreasOfStudy onOpenAdmission={openAdmission} />

      {/* 5. Yale-style Three Feature Cards: Virtual Tour, Faculty, Centers & Programs with dotted pattern */}
      <YaleThreeFeatures onOpenAdmission={openAdmission} />

      {/* 6. Yale-style Student Voices Spotlight: 2 video cards with circular play buttons */}
      <YaleStudentSpotlight />

      {/* 7. Academic Integrity & Dean's Statement */}
      <DeanCreed />

      {/* 8. Detailed Curriculum & Concentrations (4 Concentrations + Degree Tracks S.H. & PKPA) */}
      <CurriculumSection onOpenAdmission={openAdmission} />

      {/* 9. Faculty Directory: Full dossier of professors and scholars */}
      <FacultyDirectory facultyList={faculty} />

      {/* 10. Alumni Careers & Graduate Placement */}
      <AlumniSection />

      {/* 11. Admission & Scholarships Section */}
      <AdmissionSection onOpenAdmission={openAdmission} />

      {/* 12. Yale-style Connect With Us: 3 candid campus photos + 1 official Twitter/X card + follow bar */}
      <YaleConnectWithUs />

      {/* 13. Yale-style Quick Action Bar: 4 solid action blocks directly above footer */}
      <YaleQuickBar />
    </>
  );
}
