"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { EditorialGrid } from "@/components/EditorialGrid";
import { DeanCreed } from "@/components/DeanCreed";
import { CurriculumSection } from "@/components/CurriculumSection";
import { QuickAccess } from "@/components/QuickAccess";
import { FacultyDirectory } from "@/components/FacultyDirectory";
import { FacilitiesSection } from "@/components/FacilitiesSection";
import { AlumniSection } from "@/components/AlumniSection";
import { AdmissionSection } from "@/components/AdmissionSection";
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
        <Hero onOpenAdmission={handleOpenAdmission} />
        {/* Editorial News & Research sits directly beneath the Hero, matching Yale Law School layout */}
        <EditorialGrid posts={posts} events={events} />
        <DeanCreed />
        <CurriculumSection onOpenAdmission={handleOpenAdmission} />
        <QuickAccess onOpenAdmission={handleOpenAdmission} />
        <FacultyDirectory facultyList={faculty} />
        <FacilitiesSection />
        <AlumniSection />
        <AdmissionSection onOpenAdmission={handleOpenAdmission} />
      </main>
      <Footer />
      <AdmissionModal isOpen={admissionModalOpen} onClose={handleCloseAdmission} />
    </>
  );
}
