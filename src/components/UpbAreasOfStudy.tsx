"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, X } from "lucide-react";

export function UpbAreasOfStudy({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
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
      className="relative bg-gradient-to-b from-[#48060B] via-[#362822] to-[#1F1612] text-white py-16 lg:py-24 overflow-hidden"
      aria-label="Bidang Peminatan dan Konsentrasi Studi Hukum"
    >
      {/* Subtle architectural Dotted Matrix Backdrop Texture */}
      <div className="absolute inset-0 dotted-matrix-bg opacity-15 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* UPB Section Header: Centered serif title with right action link */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-12 border-b border-white/20 gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#EFE5D2] font-bold block mb-1">
              BIDANG KONSENTRASI AKADEMIK
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
              Bidang Peminatan &amp; Konsentrasi
            </h2>
          </div>

          <a
            href="#akademik"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#EFE5D2] group transition-colors"
          >
            <span>Semua Konsentrasi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C28D39]" />
          </a>
        </div>

        {/* 3 Large Photographic Cards with modern organic rounded shape matching the leaf reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {areas.map((area) => (
            <div
              key={area.id}
              onClick={() => setActiveArea(area)}
              className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden group cursor-pointer border border-white/20 hover:border-[#C28D39] transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 rounded-tr-[3.5rem] rounded-bl-[3.5rem] sm:rounded-tr-[4.5rem] sm:rounded-bl-[4.5rem] lg:rounded-tr-[5.5rem] lg:rounded-bl-[5.5rem] isolate"
            >
              {/* Image with zoom on hover */}
              <Image
                src={area.image}
                alt={area.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Velvet Vignette & Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 group-hover:from-[#710912]/95 group-hover:via-black/50 transition-colors duration-500" />

              {/* Subtitle pill at top */}
              <div className="absolute top-4 left-4">
                <span className="text-[9px] uppercase tracking-widest font-bold px-3 py-1 bg-black/60 text-[#EFE5D2] border border-white/10 backdrop-blur-xs rounded-full">
                  {area.subtitle}
                </span>
              </div>

              {/* Title anchored at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 pb-8 pl-8 flex flex-col justify-end">
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug group-hover:text-[#EFE5D2] transition-colors mb-2">
                  {area.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C28D39]">
                  <span>Lihat Mata Kuliah &amp; Karir</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Action Button (Pill shape) */}
        <div className="text-center">
          <a
            href="#akademik"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-all rounded-full"
          >
            <span>JELAJAHI KURIKULUM &amp; KONSENTRASI LENGKAP</span>
            <ArrowRight className="w-4 h-4 text-[#C28D39]" />
          </a>
        </div>
      </div>

      {/* Modal Detail Konsentrasi */}
      {activeArea && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs text-[#0D0D0D]"
        >
          <div className="bg-white max-w-xl w-full border border-[#E2D9C8] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto rounded-3xl">
            <button
              onClick={() => setActiveArea(null)}
              className="absolute top-6 right-6 p-2 text-[#544942] hover:text-[#0D0D0D] hover:bg-[#FAF7F2] rounded-full transition-colors"
              aria-label="Tutup detail konsentrasi"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#710912] font-bold block mb-1">
              {activeArea.subtitle}
            </span>
            <h3 className="font-serif text-2xl text-[#0D0D0D] font-normal mb-3">
              {activeArea.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#544942] leading-relaxed mb-6 font-light">
              {activeArea.desc}
            </p>

            <div className="mb-6 p-4 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl">
              <p className="text-[11px] font-bold text-[#0D0D0D] uppercase tracking-wider mb-2.5">
                Mata Kuliah Keahlian Utama:
              </p>
              <ul className="space-y-2">
                {activeArea.subjects.map((sub, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 text-xs text-[#544942]">
                    <Check className="w-3.5 h-3.5 text-[#710912] shrink-0 mt-0.5" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-[#544942] mb-6">
              <strong className="text-[#0D0D0D] font-semibold">Prospek Karir Lulusan:</strong> {activeArea.careers}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActiveArea(null);
                  if (onOpenAdmission) onOpenAdmission();
                }}
                className="flex-1 py-3 bg-[#710912] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#48060B] rounded-full transition-colors shadow-xs"
              >
                Daftar Program Studi Ini
              </button>
              <button
                onClick={() => setActiveArea(null)}
                className="px-6 py-3 border border-[#E2D9C8] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF7F2] rounded-full transition-colors"
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
