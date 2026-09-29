"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, X } from "lucide-react";

export function YaleAreasOfStudy({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const [activeArea, setActiveArea] = useState<{
    title: string;
    subtitle?: string;
    desc: string;
    subjects: string[];
    careers: string;
    image: string;
  } | null>(null);

  const areas = [
    {
      id: "pidana",
      title: "Hukum Pidana & Keadilan Transisional",
      subtitle: "CRIMINAL LAW & LITIGATION",
      image: "/images/study-criminal.jpg",
      desc: "Mendalami teori pemidanaan kontemporer, peradilan pidana khusus (korupsi, siber, korporasi), teknik investigasi forensik, serta implementasi keadilan restoratif.",
      subjects: [
        "Hukum Pidana Khusus & Korupsi",
        "Kriminologi & Viktimologi Forensik",
        "Kemahiran Litigasi Peradilan Pidana",
        "Kapita Selekta Hukum Pidana Siber",
      ],
      careers: "Hakim Pidana, Jaksa Penuntut Umum, Advokat Litigasi Pidana, Analis Lembaga Pemasyarakatan & Komisi Yudisial.",
    },
    {
      id: "bisnis",
      title: "Hukum Bisnis & Transaksi Digital",
      subtitle: "CORPORATE & COMMERCIAL LAW",
      image: "/images/study-business.jpg",
      desc: "Fokus pada struktur transaksi komersial industri manufaktur koridor Cikarang-Bekasi, perancangan kontrak bisnis internasional, kepatuhan korporasi, dan perlindungan data fintech.",
      subjects: [
        "Hukum Kontrak Komersial & Drafting",
        "Hukum Perseroan & Kepailitan",
        "Regulasi Fintech, AI & Cyber Law",
        "Arbitrase & Penyelesaian Sengketa Bisnis",
      ],
      careers: "In-House Legal Counsel, Corporate Lawyer di Law Firm Komersial, Analis Kepatuhan Korporasi, Arbiter Bisnis.",
    },
    {
      id: "tatanegara",
      title: "Hukum Tata Negara & Konstitusi",
      subtitle: "CONSTITUTIONAL & PUBLIC LAW",
      image: "/images/study-constitutional.jpg",
      desc: "Menelaah doktrin pemisahan kekuasaan, peradilan konstitusi, hukum administrasi publik di kawasan industri, serta teknik perancangan peraturan perundang-undangan (legal drafting).",
      subjects: [
        "Hukum Acara Mahkamah Konstitusi",
        "Perancangan Peraturan Perundang-undangan",
        "Hukum Pemerintahan Daerah & Otonomi",
        "Hukum Administrasi Publik & Perizinan",
      ],
      careers: "Perancang Peraturan (Legal Drafter) di Kementerian/DPRD, Staf Ahli Komisi Negara, Hakim PTUN, Peneliti Hukum Publik.",
    },
  ];

  return (
    <section
      id="konsentrasi"
      className="relative bg-gradient-to-b from-[#570000] via-[#480000] to-[#330000] text-white py-16 lg:py-24 overflow-hidden"
      aria-label="Bidang Peminatan dan Konsentrasi Studi Hukum"
    >
      {/* Subtle Yale-style Dotted Matrix Backdrop Texture */}
      <div className="absolute inset-0 dotted-matrix-bg opacity-15 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Yale Section Header: Centered serif title with right action link */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-12 border-b border-white/20 gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#E8D8B0] font-bold block mb-1">
              BIDANG KONSENTRASI AKADEMIK
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
              Bidang Peminatan &amp; Konsentrasi
            </h2>
          </div>

          <a
            href="#akademik"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#E8D8B0] group transition-colors"
          >
            <span>Semua Konsentrasi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
          </a>
        </div>

        {/* 3 Large Photographic Cards (Direct match to Yale screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {areas.map((area) => (
            <div
              key={area.id}
              onClick={() => setActiveArea(area)}
              className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden group cursor-pointer border border-white/15 hover:border-[#C5A059] transition-all shadow-xl"
            >
              {/* Image with zoom on hover */}
              <Image
                src={area.image}
                alt={area.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Yale-style Dark Vignette & Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 group-hover:from-[#570000]/95 group-hover:via-black/50 transition-colors duration-500" />

              {/* Subtitle pill at top */}
              <div className="absolute top-4 left-4">
                <span className="text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 bg-black/60 text-[#E8D8B0] border border-white/10 backdrop-blur-xs">
                  {area.subtitle}
                </span>
              </div>

              {/* Title anchored at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug group-hover:text-[#E8D8B0] transition-colors mb-2">
                  {area.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
                  <span>Lihat Mata Kuliah &amp; Karir</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Action Button (Direct match to Yale screenshot ghost button) */}
        <div className="text-center">
          <a
            href="#akademik"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-all"
          >
            <span>JELAJAHI KURIKULUM &amp; KONSENTRASI LENGKAP</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </a>
        </div>
      </div>

      {/* Modal Detail Konsentrasi */}
      {activeArea && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs text-[#1C1B1B]"
        >
          <div className="bg-white max-w-xl w-full border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArea(null)}
              className="absolute top-6 right-6 p-2 text-[#5C5854] hover:text-[#1C1B1B] hover:bg-[#F8F7F4]"
              aria-label="Tutup detail konsentrasi"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#800000] font-bold block mb-1">
              {activeArea.subtitle}
            </span>
            <h3 className="font-serif text-2xl text-[#1C1B1B] font-normal mb-3">
              {activeArea.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed mb-6 font-light">
              {activeArea.desc}
            </p>

            <div className="mb-6 p-4 bg-[#F8F7F4] border border-[#E5E1DA]">
              <p className="text-[11px] font-bold text-[#1C1B1B] uppercase tracking-wider mb-2.5">
                Mata Kuliah Keahlian Utama:
              </p>
              <ul className="space-y-2">
                {activeArea.subjects.map((sub, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 text-xs text-[#5C5854]">
                    <Check className="w-3.5 h-3.5 text-[#800000] shrink-0 mt-0.5" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-[#5C5854] mb-6">
              <strong className="text-[#1C1B1B] font-semibold">Prospek Karir Lulusan:</strong> {activeArea.careers}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActiveArea(null);
                  if (onOpenAdmission) onOpenAdmission();
                }}
                className="flex-1 py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000]"
              >
                Daftar Program Studi Ini
              </button>
              <button
                onClick={() => setActiveArea(null)}
                className="px-6 py-3 border border-[#E5E1DA] text-xs font-bold uppercase tracking-wider hover:bg-[#F8F7F4]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
