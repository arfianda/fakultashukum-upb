import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getUpcomingEvents } from "@/lib/dataService";
import { PageHeader } from "@/components/layout/PageHeader";
import { AgendaListingClient } from "./AgendaListingClient";

export const metadata: Metadata = {
  title: "Agenda Akademik & Seminar",
  description:
    "Kalender kegiatan akademik, seminar nasional hukum, simposium agraria, kuliah umum pakar, dan workshop litigasi di Fakultas Hukum UPB.",
};

export default async function AgendaPage() {
  const events = await getUpcomingEvents();

  return (
    <>
      <PageHeader
        kicker="KALENDER KEGIATAN FAKULTAS"
        title="Agenda Akademik &amp; Seminar"
        description="Ikuti rangkaian kuliah pakar, simposium hukum nasional, bedah buku yurisprudensi, serta lokakarya kemahiran litigasi ruang sidang bersama para akademisi dan praktisi terkemuka."
        breadcrumbs={[{ label: "Agenda Akademik" }]}
      />

      <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-sm text-[#5C5854]">Memuat agenda akademik...</div>}>
        <AgendaListingClient initialEvents={events} />
      </Suspense>
    </>
  );
}
