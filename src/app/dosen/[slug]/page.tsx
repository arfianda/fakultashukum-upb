import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Mail } from "lucide-react";
import { getFacultyData, getFacultyBySlug, createFacultySlug } from "@/lib/dataService";
import { PageHeader } from "@/components/layout/PageHeader";

export async function generateStaticParams() {
  const allFaculty = await getFacultyData();
  return allFaculty.map((f) => ({
    slug: createFacultySlug(f.name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const faculty = await getFacultyBySlug(slug);
  if (!faculty) return { title: "Tenaga Pengajar | Fakultas Hukum UPB" };

  return {
    title: `${faculty.name} | Fakultas Hukum UPB`,
    description: `${faculty.titles} - Bidang Keahlian: ${faculty.specialization}`,
  };
}

export default async function DosenDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const faculty = await getFacultyBySlug(slug);

  if (!faculty) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        kicker={faculty.titles.includes("Guru Besar") ? "DEWAN GURU BESAR" : "TENAGA PENGAJAR"}
        title={faculty.name}
        description={faculty.titles}
        breadcrumbs={[
          { label: "Tenaga Pengajar", href: "/dosen" },
          { label: faculty.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-6">
          <Link
            href="/dosen"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#710912] hover:text-[#48060B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Direktori Dosen</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Photo & Quick Meta */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#E2D9C8] rounded-2xl p-6 shadow-xs text-center sticky top-28">
              <div className="relative w-48 h-60 mx-auto rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E2D9C8] mb-4">
                <Image
                  src={faculty.profileImage || "/images/prof-hendra.jpg"}
                  alt={faculty.name}
                  fill
                  sizes="240px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              <h2 className="font-serif text-lg font-bold text-[#0D0D0D] mb-1">
                {faculty.name}
              </h2>
              <p className="text-xs text-[#710912] font-medium mb-4">
                {faculty.titles}
              </p>

              <div className="pt-4 border-t border-[#E2D9C8] space-y-2 text-xs text-left text-[#544942]">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#0D0D0D]">
                    Status Akademik:
                  </span>
                  <span>Dosen Tetap Fakultas Hukum</span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#0D0D0D]">
                    Fakultas:
                  </span>
                  <span>Fakultas Hukum Universitas Pelita Bangsa</span>
                </div>
              </div>

              {faculty.researchLink && (
                <div className="mt-6 pt-4 border-t border-[#E2D9C8]">
                  <a
                    href={faculty.researchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#710912] text-white text-xs font-semibold hover:bg-[#48060B] transition-colors"
                  >
                    <span>Profil SINTA Kemdikbud</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Detailed Biography & Specialization */}
          <div className="lg:col-span-8 space-y-8">
            {/* Specialization Section */}
            <section className="bg-white border border-[#E2D9C8] rounded-2xl p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#710912] block mb-1">
                KEPAKARAN &amp; BIDANG KEAHLIAN
              </span>
              <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-3">
                Fokus Kajian Doktrinal
              </h3>
              <div className="w-12 h-0.5 bg-[#C28D39] mb-5" />

              <p className="text-sm text-[#241E1C] leading-relaxed font-light mb-6">
                {faculty.specialization}
              </p>

              {faculty.bioQuote && (
                <blockquote className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs sm:text-sm text-[#544942] italic font-light">
                  &ldquo;{faculty.bioQuote}&rdquo;
                </blockquote>
              )}
            </section>

            {/* Teaching & Academic Activities */}
            <section className="bg-white border border-[#E2D9C8] rounded-2xl p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#710912] block mb-1">
                AKTIVITAS AKADEMIK
              </span>
              <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-3">
                Pengajaran &amp; Bimbingan Riset
              </h3>
              <div className="w-12 h-0.5 bg-[#C28D39] mb-5" />

              <div className="space-y-4 text-xs sm:text-sm text-[#241E1C] font-light leading-relaxed">
                <p>
                  Mengampu mata kuliah program sarjana hukum, memfasilitasi simulasi sidang di Laboratorium Peradilan Semu, serta menjadi pembimbing tugas akhir skripsi mahasiswa.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8]">
                    <h4 className="font-serif text-sm font-bold text-[#0D0D0D] mb-1">
                      Bimbingan Skripsi
                    </h4>
                    <p className="text-xs text-[#544942] font-light">
                      Fokus riset empiris yurisprudensi dan studi kepustakaan hukum normatif.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8]">
                    <h4 className="font-serif text-sm font-bold text-[#0D0D0D] mb-1">
                      Kajian Yurisprudensi
                    </h4>
                    <p className="text-xs text-[#544942] font-light">
                      Publikasi artikel ilmiah pada jurnal terakreditasi nasional dan internasional.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact & Consultation */}
            <section className="bg-[#48060B] text-white rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Konsultasi &amp; Korespondensi
              </h3>
              <p className="text-xs sm:text-sm text-[#E2D9C8] font-light mb-6">
                Untuk keperluan permohonan saksi ahli di persidangan, kuliah tamu, atau korespondensi riset ilmiah, silakan menghubungi Sekretariat Dekanat Fakultas Hukum.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C28D39] text-[#48060B] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Hubungi Sekretariat Dekanat</span>
                </Link>
                <Link
                  href="/dosen"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
                >
                  <span>Lihat Dosen Lainnya</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
