"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
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
import { Footer } from "@/components/Footer";
import { AdmissionModal } from "@/components/AdmissionModal";
import { PostItem, EventItem, FacultyItem } from "@/data/initialData";

export function HomeClient({
  posts,
  events,
  faculty,
}: {
  posts: PostItem[];
  events: EventItem[];
  faculty: FacultyItem[];
}) {
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);

  const handleOpenAdmission = () => {
    setAdmissionModalOpen(true);
  };

  const handleCloseAdmission = () => {
    setAdmissionModalOpen(false);
  };

  return (
    <>
      <Navbar onOpenAdmission={handleOpenAdmission} />
      <main className="flex-1">
        {/* 1. Hero: Monumental architectural video/poster with bottom-left content box */}
        <Hero onOpenAdmission={handleOpenAdmission} />

        {/* 2. Yale-style News Section: 1 Lead featured story + 4 horizontal thumbnail stories */}
        <YaleNewsSection posts={posts} />

        {/* 3. Yale-style Events Section: 3x2 grid of 6 academic events with prominent date blocks */}
        <YaleEventsSection events={events} />

        {/* 4. Yale-style Explore Areas of Study: Full-width deep academic banner with 3 large photographic cards */}
        <YaleAreasOfStudy onOpenAdmission={handleOpenAdmission} />

        {/* 5. Yale-style Three Feature Cards: Virtual Tour, Faculty, Centers & Programs with dotted pattern */}
        <YaleThreeFeatures onOpenAdmission={handleOpenAdmission} />

        {/* 6. Yale-style Student Voices Spotlight: 2 video cards with circular play buttons */}
        <YaleStudentSpotlight />

        {/* 7. Academic Integrity & Dean's Statement */}
        <DeanCreed />

        {/* 8. Detailed Curriculum & Concentrations (4 Concentrations + Degree Tracks S.H. & PKPA) */}
        <CurriculumSection onOpenAdmission={handleOpenAdmission} />

        {/* 9. Faculty Directory: Full dossier of professors and scholars */}
        <FacultyDirectory facultyList={faculty} />

        {/* 10. Alumni Careers & Graduate Placement */}
        <AlumniSection />

        {/* 11. Admission & Scholarships Section */}
        <AdmissionSection onOpenAdmission={handleOpenAdmission} />

        {/* 12. Yale-style Connect With Us: 3 candid campus photos + 1 official Twitter/X card + follow bar */}
        <YaleConnectWithUs />

        {/* 13. Yale-style Quick Action Bar: 4 solid action blocks directly above footer */}
        <YaleQuickBar />
      </main>
      <Footer />
      <AdmissionModal isOpen={admissionModalOpen} onClose={handleCloseAdmission} />
    </>
  );
}
