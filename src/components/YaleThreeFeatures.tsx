"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";

export function YaleThreeFeatures({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const [modalType, setModalType] = useState<"tour" | "centers" | null>(null);

  const features = [
    {
      id: "tour",
      title: "Tur Kampus & Fasilitas",
      desc: "Jelajahi ruang sidang peradilan semu (Moot Court) modern berstandar Mahkamah Agung, perpustakaan riset hukum terlengkap, dan ruang mediasi sengketa.",
      image: "/images/feature-tour.jpg",
      actionText: "IKUTI TUR KAMPUS",
      onClick: () => setModalType("tour"),
    },
    {
      id: "faculty",
      title: "Tenaga Pengajar",
      desc: "Belajar langsung dari para Hakim Agung, Dewan Guru Besar, dan praktisi advokat terkemuka yang aktif membentuk yurisprudensi dan arah kebijakan hukum nasional.",
      image: "/images/feature-faculty.jpg",
      actionText: "DIREKTORI DOSEN",
      href: "#fakultas",
    },
    {
      id: "centers",
      title: "Pusat Studi & Klinik Hukum",
      desc: "Wadah advokasi pro-bono bagi masyarakat pencari keadilan serta pusat riset regulasi bisnis kawasan industri di bawah supervisi advokat terakreditasi.",
      image: "/images/feature-centers.jpg",
      actionText: "PELAJARI PROGRAM",
      onClick: () => setModalType("centers"),
    },
  ];

  return (
    <section id="fasilitas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative" aria-label="Sorotan Kampus dan Program">
      {/* Scroll anchor targets for legacy and secondary navigation */}
      <div id="pusat-studi" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
      <div id="laboratorium" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />

      {/* 3 Editorial Cards side-by-side with Yale Dotted Matrix accent header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item) => (
          <div key={item.id} className="relative flex flex-col justify-between group">
            {/* Yale Signature Dotted Matrix Motif floating above the card */}
            <div className="w-20 h-4 dotted-matrix-bg opacity-60 mb-2" aria-hidden="true" />

            <div>
              {/* Card Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden mb-6 bg-[#F8F7F4] border border-[#E5E1DA]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-normal text-[#1C1B1B] group-hover:text-[#800000] transition-colors mb-3 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed mb-6 font-light">
                {item.desc}
              </p>
            </div>

            {/* Solid Dark Maroon Button (Direct match to Yale screenshot) */}
            <div>
              {item.href ? (
                <a
                  href={item.href}
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-[#800000] hover:bg-[#570000] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>{item.actionText}</span>
                  <ChevronRight className="w-4 h-4 ml-1 text-[#E8D8B0]" />
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-[#800000] hover:bg-[#570000] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>{item.actionText}</span>
                  <ChevronRight className="w-4 h-4 ml-1 text-[#E8D8B0]" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tour & Centers Modal */}
      {modalType && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        >
          <div className="bg-white max-w-lg w-full border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-6 right-6 p-2 text-[#5C5854] hover:text-[#1C1B1B] hover:bg-[#F8F7F4]"
              aria-label="Tutup jendela informasi"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === "tour" ? (
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#800000] font-bold block mb-1">
                  EKSPLORASI KAMPUS
                </span>
                <h3 className="font-serif text-2xl text-[#1C1B1B] mb-3">
                  Tur Kampus &amp; Fasilitas Hukum
                </h3>
                <div className="relative aspect-[16/9] w-full mb-4 border border-[#E5E1DA]">
                  <Image src="/images/feature-tour.jpg" alt="Fasilitas Kampus" fill className="object-cover" />
                </div>
                <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed mb-4 font-light">
                  Fakultas Hukum Universitas Pelita Bangsa berlokasi strategis di Jl. Inspeksi Kalimalang, Cikarang Pusat, terintegrasi dengan pusat denyut ekonomi dan koridor industri terbesar di Asia Tenggara. Fasilitas mencakup:
                </p>
                <ul className="text-xs text-[#5C5854] space-y-2 mb-6 list-disc list-inside">
                  <li><strong>Laboratorium Moot Court:</strong> Tata letak persidangan resmi lengkap dengan majelis hakim, jaksa, dan panitera elektronik.</li>
                  <li><strong>Perpustakaan Riset Hukum:</strong> Ribuan koleksi yurisprudensi MA/MK dan akses jurnal internasional terindeks.</li>
                  <li><strong>Klinik Konsultasi Hukum:</strong> Ruang mediasi sengketa perdata dan advokasi masyarakat.</li>
                </ul>
                <button
                  onClick={() => {
                    setModalType(null);
                    if (onOpenAdmission) onOpenAdmission();
                  }}
                  className="w-full py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000]"
                >
                  Daftar Kunjungan Kampus
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#800000] font-bold block mb-1">
                  PENGABDIAN &amp; RISET
                </span>
                <h3 className="font-serif text-2xl text-[#1C1B1B] mb-3">
                  Pusat Studi &amp; Klinik Bantuan Hukum
                </h3>
                <div className="relative aspect-[16/9] w-full mb-4 border border-[#E5E1DA]">
                  <Image src="/images/feature-centers.jpg" alt="Pusat Studi" fill className="object-cover" />
                </div>
                <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed mb-4 font-light">
                  Pusat Studi Hukum UPB mewadahi riset strategis dan pelayanan pro-bono masyarakat:
                </p>
                <ul className="text-xs text-[#5C5854] space-y-2 mb-6 list-disc list-inside">
                  <li><strong>Pusat Bantuan Hukum (PBH UPB):</strong> Pendampingan hukum cuma-cuma bagi warga kurang mampu.</li>
                  <li><strong>Pusat Studi Hukum Bisnis &amp; Industri:</strong> Kajian regulasi ketenagakerjaan, investasi, dan kontrak manufaktur.</li>
                  <li><strong>Pusat Kajian Konstitusi &amp; HAM:</strong> Diseminasi wacana demokrasi dan analisis putusan peradilan.</li>
                </ul>
                <button
                  onClick={() => setModalType(null)}
                  className="w-full py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000]"
                >
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
