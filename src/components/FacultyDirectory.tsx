"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { FacultyItem } from "@/data/initialData";

export function FacultyDirectory({ facultyList }: { facultyList: FacultyItem[] }) {
  const [activeDossier, setActiveDossier] = useState<FacultyItem | null>(null);

  return (
    <section id="fakultas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-label="Dewan Guru Besar dan Pakar">
      {/* Section Header with UPB Architectural Motif */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E2D9C8]">
        <div>
          <div className="relative inline-flex items-center mb-2">
            <div className="absolute inset-0 -m-1 border border-[#E2D9C8] dotted-matrix-bg opacity-45 pointer-events-none" />
            <span className="relative text-[10px] uppercase tracking-widest text-[#710912] font-bold bg-white px-2 py-0.5">
              JAJARAN PIMPINAN &bull; FAKULTAS HUKUM
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0D0D0D] font-normal">
            Jajaran Pimpinan &amp; Pengajar
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#544942] max-w-md mt-4 md:mt-0 leading-relaxed font-light">
          Jajaran Pimpinan dan Program Studi Ilmu Hukum Fakultas Hukum Universitas Pelita Bangsa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {facultyList.map((f) => {
          const hasName = Boolean(f.name && f.name.trim().length > 0);
          const displayHeading = hasName ? f.name : f.titles;
          const displaySub = hasName
            ? f.titles
            : "Fakultas Hukum Universitas Pelita Bangsa";

          return (
            <div
              key={f.id}
              className="bg-white border border-[#E2D9C8] hover:border-[#710912] transition-colors p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Formal Faculty Portrait */}
                <div className="relative w-full aspect-[3/4] bg-[#FAF7F2] border border-[#E2D9C8] overflow-hidden mb-5">
                  <Image
                    src={f.profileImage}
                    alt={displayHeading}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  />
                </div>

                {/* Scholar Metadata */}
                <span className="inline-block text-[10px] font-bold text-[#C28D39] uppercase tracking-wider mb-1">
                  {f.nip && f.nip !== "-"
                    ? `NIP. ${f.nip}`
                    : "JAJARAN FAKULTAS HUKUM"}
                </span>

                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#0D0D0D] group-hover:text-[#710912] transition-colors mb-1 leading-snug">
                  {displayHeading}
                </h3>

                <p className="text-xs font-semibold text-[#710912] mb-3 leading-snug">
                  {displaySub}
                </p>

                {f.bioQuote && (
                  <blockquote className="text-xs text-[#544942] italic border-l-2 border-[#C28D39] pl-3 py-1 mb-4 bg-[#FAF7F2]">
                    &ldquo;{f.bioQuote}&rdquo;
                  </blockquote>
                )}
              </div>

              <div className="pt-3 border-t border-[#F4ECE1] flex items-center justify-between mt-2">
                <button
                  onClick={() => setActiveDossier(f)}
                  className="text-xs font-bold text-[#710912] hover:text-[#48060B] uppercase tracking-wider cursor-pointer"
                >
                  Lihat Detail
                </button>
                {f.researchLink && (
                  <a
                    href={f.researchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#544942] hover:text-[#710912]"
                  >
                    <span>SINTA Profil</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dossier Modal View */}
      {activeDossier && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white max-w-xl w-full border border-[#E2D9C8] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setActiveDossier(null)}
              className="absolute top-6 right-6 p-2 text-[#544942] hover:text-[#0D0D0D]"
              aria-label="Tutup berkas dosen"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#E2D9C8]">
              <div className="relative w-16 h-20 shrink-0 border border-[#E2D9C8]">
                <Image
                  src={activeDossier.profileImage}
                  alt={activeDossier.name || activeDossier.titles}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="text-[10px] text-[#C28D39] font-bold uppercase tracking-widest block">
                  Dossier Jajaran &amp; Pakar
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0D0D0D]">
                  {activeDossier.name || activeDossier.titles}
                </h3>
                <p className="text-xs text-[#710912]">
                  {activeDossier.name
                    ? activeDossier.titles
                    : "Fakultas Hukum Universitas Pelita Bangsa"}
                </p>
                {activeDossier.nip && activeDossier.nip !== "-" && (
                  <p className="text-[11px] text-[#544942]">
                    NIP: {activeDossier.nip}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#0D0D0D] leading-relaxed mb-6">
              <div className="p-3 bg-[#FAF7F2] border border-[#E2D9C8]">
                <p className="font-bold text-[#710912] mb-1">Jabatan &amp; Tugas:</p>
                <p className="text-[#544942]">{activeDossier.specialization}</p>
              </div>

              {activeDossier.bioQuote && (
                <div>
                  <p className="font-bold text-[#0D0D0D] mb-1">Prinsip Keilmuan:</p>
                  <p className="italic text-[#544942]">&ldquo;{activeDossier.bioQuote}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E2D9C8] flex justify-end">
              <button
                onClick={() => setActiveDossier(null)}
                className="px-6 py-2 bg-[#710912] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#48060B]"
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
