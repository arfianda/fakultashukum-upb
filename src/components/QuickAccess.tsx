"use client";

import React from "react";
import { ArrowRight, BookOpen, GraduationCap, Building2, Scale } from "lucide-react";

export function QuickAccess({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const pathways = [
    {
      title: "Pendaftaran & Beasiswa",
      sub: "ADMISSIONS & AID",
      desc: "Informasi penerimaan Sarjana (S.H.) dan Magister (M.H.), jadwal gelombang seleksi, dan beasiswa prestasi.",
      actionText: "Alur Penerimaan",
      action: onOpenAdmission,
      href: "#pendaftaran",
      icon: GraduationCap,
    },
    {
      title: "Kurikulum & Konsentrasi",
      sub: "STUDY OF LAW",
      desc: "Empat pilar peminatan keilmuan: Pidana, Perdata & Bisnis, Tata Negara, serta Hukum Perdagangan Internasional.",
      actionText: "Struktur Kurikulum",
      href: "#akademik",
      icon: BookOpen,
    },
    {
      title: "Laboratorium & Fasilitas",
      sub: "COURT SIMULATION",
      desc: "Ruang sidang peradilan semu (Moot Court) elektronik standar Mahkamah Agung dan perpustakaan hukum terlengkap.",
      actionText: "Fasilitas Kampus",
      href: "#laboratorium",
      icon: Building2,
    },
    {
      title: "Klinik Bantuan Hukum",
      sub: "LEGAL AID CLINIC",
      desc: "Pusat advokasi pro-bono dan pembelaan keadilan masyarakat di bawah supervisi praktisi advokat terakreditasi.",
      actionText: "Layanan Advokasi",
      href: "#laboratorium",
      icon: Scale,
    },
  ];

  return (
    <section className="bg-[#F8F7F4] border-b border-[#E5E1DA] py-10 lg:py-14" aria-label="Akses Cepat Akademik">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5E1DA] p-6 sm:p-7 flex flex-col justify-between hover:border-[#800000] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                      {item.sub}
                    </span>
                    <Icon className="w-5 h-5 text-[#800000] stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#1C1B1B] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5C5854] leading-relaxed mb-6 font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EDED]">
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#800000] hover:text-[#570000] group"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#800000] hover:text-[#570000] group"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
