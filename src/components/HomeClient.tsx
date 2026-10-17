"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { UpbNewsSection } from "@/components/UpbNewsSection";
import { UpbEventsSection } from "@/components/UpbEventsSection";
import { UpbAreasOfStudy } from "@/components/UpbAreasOfStudy";
import { UpbThreeFeatures } from "@/components/UpbThreeFeatures";
import { UpbStudentSpotlight } from "@/components/UpbStudentSpotlight";
import { DeanCreed } from "@/components/DeanCreed";
import { CurriculumSection } from "@/components/CurriculumSection";
import { FacultyDirectory } from "@/components/FacultyDirectory";
import { AlumniSection } from "@/components/AlumniSection";
import { AdmissionSection } from "@/components/AdmissionSection";
import { UpbConnectWithUs } from "@/components/UpbConnectWithUs";
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

      {/* 2. UPB Editorial News Section: 1 Lead featured story + 4 horizontal thumbnail stories */}
      <UpbNewsSection posts={posts} />

      {/* 3. UPB Editorial Events Section: 3x2 grid of 6 academic events with prominent date blocks */}
      <UpbEventsSection events={events} />

      {/* 4. UPB Editorial Explore Areas of Study: Full-width deep academic banner with 3 large photographic cards */}
      <UpbAreasOfStudy onOpenAdmission={openAdmission} />

      {/* 5. UPB Editorial Three Feature Cards: Virtual Tour, Faculty, Centers & Programs with dotted pattern */}
      <UpbThreeFeatures onOpenAdmission={openAdmission} />

      {/* 6. UPB Editorial Student Voices Spotlight: 2 video cards with circular play buttons */}
      <UpbStudentSpotlight />

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

      {/* 12. Connect With Us: Campus community & social spotlight */}
      <UpbConnectWithUs />
    </>
  );
}
