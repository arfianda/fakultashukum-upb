"use client";

import React from "react";
import { ArrowRight, BookOpen, GraduationCap, Building2, Scale } from "lucide-react";

export function QuickAccess({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const pathways = [
    {
      title: "Pendaftaran & Beasiswa",
      sub: "PENERIMAAN & BEASISWA",
      desc: "Informasi penerimaan Sarjana Hukum (S.H.) kelas Reguler dan Karyawan, jadwal gelombang seleksi, serta beasiswa.",
      actionText: "Alur Penerimaan",
      action: onOpenAdmission,
      href: "#pendaftaran",
      icon: GraduationCap,
    },
    {
      title: "Kurikulum & Konsentrasi",
      sub: "PROGRAM STUDI HUKUM",
      desc: "Empat pilar peminatan keilmuan: Pidana, Perdata & Bisnis, Tata Negara, serta Hukum Perdagangan Internasional.",
      actionText: "Struktur Kurikulum",
      href: "#akademik",
      icon: BookOpen,
    },
    {
      title: "Laboratorium & Fasilitas",
      sub: "SIMULASI PERADILAN",
      desc: "Ruang sidang peradilan semu (Moot Court) elektronik standar Mahkamah Agung dan perpustakaan hukum terlengkap.",
      actionText: "Fasilitas Kampus",
      href: "#laboratorium",
      icon: Building2,
    },
    {
      title: "Klinik Bantuan Hukum",
      sub: "BANTUAN HUKUM",
      desc: "Pusat advokasi pro-bono dan pembelaan keadilan masyarakat di bawah supervisi praktisi advokat terakreditasi.",
      actionText: "Layanan Advokasi",
      href: "#laboratorium",
      icon: Scale,
    },
  ];

  return (
    <section className="bg-[#FAF7F2] border-b border-[#E2D9C8] py-10 lg:py-14" aria-label="Akses Cepat Akademik">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E2D9C8] p-6 sm:p-7 flex flex-col justify-between hover:border-[#710912] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C28D39]">
                      {item.sub}
                    </span>
                    <Icon className="w-5 h-5 text-[#710912] stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#0D0D0D] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#544942] leading-relaxed mb-6 font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4ECE1]">
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#710912] hover:text-[#48060B] group"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C28D39]" />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#710912] hover:text-[#48060B] group"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C28D39]" />
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
