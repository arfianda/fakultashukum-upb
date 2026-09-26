"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, X, BookOpen, Scale } from "lucide-react";
import { FacultyItem } from "@/data/initialData";

export function FacultyDirectory({ facultyList }: { facultyList: FacultyItem[] }) {
  const [activeDossier, setActiveDossier] = useState<FacultyItem | null>(null);

  return (
    <section id="fakultas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-label="Dewan Guru Besar dan Pakar">
      {/* Section Header with Yale Law School Architectural Motif */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E1DA]">
        <div>
          <div className="relative inline-flex items-center mb-2">
            <div className="absolute inset-0 -m-1 border border-[#E5E1DA] dotted-matrix-bg opacity-45 pointer-events-none" />
            <span className="relative text-[10px] uppercase tracking-widest text-[#800000] font-bold bg-white px-2 py-0.5">
              OUR FACULTY &bull; DEWAN GURU BESAR
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1B1B] font-normal">
            Pakar Hukum &amp; Akademisi Terkemuka
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5C5854] max-w-md mt-4 md:mt-0 leading-relaxed font-light">
          Dididik langsung oleh para pakar hukum berkualifikasi Doktor dan Guru Besar yang aktif sebagai saksi ahli peradilan, perancang regulasi nasional, dan arbiter komersial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {facultyList.map((f) => (
          <div
            key={f.id}
            className="bg-white border border-[#E5E1DA] hover:border-[#800000] transition-colors p-6 sm:p-8 flex flex-col sm:flex-row gap-6 group"
          >
            {/* Formal Faculty Portrait */}
            <div className="relative w-full sm:w-44 h-60 sm:h-auto shrink-0 bg-[#F8F7F4] border border-[#E5E1DA] overflow-hidden">
              <Image
                src={f.profileImage}
                alt={f.name}
                fill
                sizes="(max-width: 640px) 100vw, 200px"
                className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Scholar Metadata */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <span className="inline-block text-[10px] font-bold text-[#C5A059] uppercase tracking-wider mb-1">
                  NIP. {f.nip}
                </span>

                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1C1B1B] group-hover:text-[#800000] transition-colors mb-1 leading-snug">
                  {f.name}
                </h3>

                <p className="text-xs font-semibold text-[#800000] mb-3 leading-snug">
                  {f.titles}
                </p>

                <p className="text-xs text-[#5C5854] mb-3 leading-relaxed">
                  <strong className="text-[#1C1B1B]">Fokus Keahlian:</strong> {f.specialization}
                </p>

                <blockquote className="text-xs text-[#5C5854] italic border-l-2 border-[#C5A059] pl-3 py-1 mb-4 bg-[#F8F7F4]">
                  &ldquo;{f.bioQuote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-3 border-t border-[#F0EDED] flex items-center justify-between">
                <button
                  onClick={() => setActiveDossier(f)}
                  className="text-xs font-bold text-[#800000] hover:text-[#570000] uppercase tracking-wider"
                >
                  Profil Akademik Lengkap
                </button>
                {f.researchLink && (
                  <a
                    href={f.researchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#5C5854] hover:text-[#800000]"
                  >
                    <span>SINTA Profil</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dossier Modal View */}
      {activeDossier && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white max-w-xl w-full border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setActiveDossier(null)}
              className="absolute top-6 right-6 p-2 text-[#5C5854] hover:text-[#1C1B1B]"
              aria-label="Tutup berkas dosen"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#E5E1DA]">
              <div className="relative w-16 h-20 shrink-0 border border-[#E5E1DA]">
                <Image
                  src={activeDossier.profileImage}
                  alt={activeDossier.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest block">
                  Dossier Dewan Pakar
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1C1B1B]">
                  {activeDossier.name}
                </h3>
                <p className="text-xs text-[#800000]">{activeDossier.titles}</p>
                <p className="text-[11px] text-[#5C5854]">NIP: {activeDossier.nip}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#1C1B1B] leading-relaxed mb-6">
              <div className="p-3 bg-[#F8F7F4] border border-[#E5E1DA]">
                <p className="font-bold text-[#800000] mb-1">Fokus Riset &amp; Pengabdian Yuridis:</p>
                <p className="text-[#5C5854]">{activeDossier.specialization}</p>
              </div>

              <div>
                <p className="font-bold text-[#1C1B1B] mb-1">Mata Kuliah Utama Diampu:</p>
                <ul className="list-disc list-inside text-[#5C5854] space-y-1">
                  <li>Hukum Tata Negara &amp; Teori Konstitusi Progresif</li>
                  <li>Perancangan Kontrak Bisnis &amp; Mitigasi Arbitrase</li>
                  <li>Metodologi Penelitian Hukum &amp; Penulisan Yurisprudensi</li>
                  <li>Hukum Acara Peradilan Konstitusi &amp; Pengujian Undang-Undang</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-[#1C1B1B] mb-1">Prinsip Integritas Keilmuan:</p>
                <p className="italic text-[#5C5854]">&ldquo;{activeDossier.bioQuote}&rdquo;</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E1DA] flex justify-end">
              <button
                onClick={() => setActiveDossier(null)}
                className="px-6 py-2 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000]"
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
