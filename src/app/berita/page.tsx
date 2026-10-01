import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/dataService";
import { PageHeader } from "@/components/layout/PageHeader";
import { BeritaListingClient } from "./BeritaListingClient";

export const metadata: Metadata = {
  title: "Warta & Kajian Hukum",
  description:
    "Rilis warta akademik resmi, analisis yurisprudensi putusan pengadilan, prestasi mahasiswa peradilan semu, dan kabar civitas akademika Fakultas Hukum UPB.",
};

export default async function BeritaPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHeader
        kicker="PUBLIKASI &amp; KAJIAN YURIDIS"
        title="Warta &amp; Kajian Hukum"
        description="Menghadirkan diskursus hukum mutakhir, telaah kritis yurisprudensi, warta kegiatan akademik, serta capaian prestasi mahasiswa Fakultas Hukum Universitas Pelita Bangsa."
        breadcrumbs={[{ label: "Warta & Kajian Hukum" }]}
      />

      <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-sm text-[#5C5854]">Memuat warta fakultas...</div>}>
        <BeritaListingClient initialPosts={posts} />
      </Suspense>
    </>
  );
}
