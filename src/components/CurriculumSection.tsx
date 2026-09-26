"use client";

import React, { useState } from "react";
import { BookOpen, Check, ChevronRight } from "lucide-react";

export function CurriculumSection({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const [activeTab, setActiveTab] = useState<"konsentrasi" | "jenjang">("konsentrasi");

  const concentrations = [
    {
      id: "pidana",
      title: "Hukum Pidana & Peradilan Pidana",
      subtitle: "Litigasi Perkara Pidana, Kejahatan Siber & Forensik Digital",
      subjects: [
        "Hukum Pidana Korporasi & White-Collar Crime",
        "Hukum Pembuktian & Forensik Dokumen Digital",
        "Sistem Peradilan Pidana Terpadu & Restorative Justice",
        "Tindak Pidana Khusus: Tipikor, Narkotika & Pencucian Uang",
      ],
      careers: "Jaksa Penuntut Umum, Hakim Pidana, Advokat Litigasi Khusus, Peneliti Komisi Yudisial.",
    },
    {
      id: "perdata",
      title: "Hukum Perdata, Bisnis & Transaksi Digital",
      subtitle: "Tata Kelola Korporasi, Kontrak Komersial & Hak Cipta",
      subjects: [
        "Perancangan Kontrak Komersial & Negosiasi Bisnis (Legal Drafting)",
        "Hukum Kepailitan, PKPU & Restrukturisasi Keuangan",
        "Penyelesaian Sengketa Arbitrase Komersial (BANI & SIAC)",
        "Hak Cipta, Paten, Merek & Perlindungan Data Pribadi",
      ],
      careers: "Corporate Legal Counsel, Konsultan Pasar Modal, Notaris/PPAT, In-House Counsel BUMN.",
    },
    {
      id: "htn",
      title: "Hukum Tata Negara & Kebijakan Publik",
      subtitle: "Kajian Konstitusi, Pengawasan Regulasi & Reformasi Birokrasi",
      subjects: [
        "Hukum Acara Mahkamah Konstitusi & Uji Materiil",
        "Hukum Keuangan Negara & Pengadaan Barang/Jasa (PBJ)",
        "Perancangan Naskah Akademik & Legislative Drafting",
        "Hukum Tata Kelola Daerah & Otonomi Publik",
      ],
      careers: "Analis Kebijakan Publik, Tenaga Ahli DPR/DPRD, Auditor Hukum Lembaga Negara, Hakim PTUN.",
    },
    {
      id: "internasional",
      title: "Hukum Internasional & Transnasional",
      subtitle: "Perdagangan Global, Yurisdiksi Lintas Batas & Arbitrase Dagang",
      subjects: [
        "Hukum Perdagangan Dunia (WTO) & Regulasi Investasi Asing",
        "Hukum Humaniter Internasional & Hak Asasi Manusia",
        "Penyelesaian Sengketa Maritim & Hukum Laut Internasional (UNCLOS)",
        "Hukum Perjanjian Diplomatik & Konsuler",
      ],
      careers: "Diplomat Kementerian Luar Negeri, Legal Specialist Lembaga Multilateral, Arbiter Internasional.",
    },
  ];

  const degrees = [
    {
      program: "Sarjana Hukum (S.H.)",
      badge: "Program Sarjana",
      period: "8 Semester (144 SKS)",
      desc: "Membentuk sarjana hukum berkepribadian etis dengan penguasaan doktrin hukum substantif, kemahiran litigasi ruang sidang, serta kemampuan legal writing yang presisi.",
      features: [
        "Tersedia Kelas Reguler Pagi & Kelas Karyawan Malam",
        "Praktik Peradilan Semu Wajib (Laboratorium Moot Court)",
        "Magang Terstruktur di Pengadilan & Kantor Advokat Mitra",
        "Lulusan berhak menyandang gelar Sarjana Hukum (S.H.)",
      ],
    },
    {
      program: "Magister Ilmu Hukum (M.H.)",
      badge: "Program Pascasarjana",
      period: "4 Semester (36 SKS)",
      desc: "Dirancang untuk para praktisi hukum, aparatur negara, dan akademisi yang hendak memperdalam metodologi riset hukum kritis serta keahlian hukum bisnis strategis.",
      features: [
        "Jadwal Kuliah Akhir Pekan (Sabtu - Hybrid Learning)",
        "Fokus Konsentrasi: Hukum Bisnis & Hukum Kebijakan Publik",
        "Bimbingan Penulisan Tesis oleh Dewan Guru Besar Bereputasi",
        "Lulusan menyandang gelar Magister Hukum (M.H.)",
      ],
    },
    {
      program: "Pendidikan Khusus Profesi Advokat (PKPA)",
      badge: "Kerja Sama PERADI",
      period: "Pelatihan Intensif 1 Bulan",
      desc: "Program sertifikasi resmi profesi advokat berkolaborasi dengan Perhimpunan Advokat Indonesia (PERADI) untuk membekali calon advokat sebelum menempuh UPA.",
      features: [
        "Instruktur: Hakim Agung, Praktisi Advokat Senior & Akademisi Pakar",
        "Simulasi Ujian Profesi Advokat (UPA) Nasional",
        "Sertifikat Kelulusan Resmi PERADI untuk Syarat Sumpah Advokat",
        "Diskon Khusus bagi Alumni Fakultas Hukum UPB",
      ],
    },
  ];

  return (
    <section id="akademik" className="bg-[#F8F7F4] border-t border-[#E5E1DA] py-16 lg:py-24" aria-label="Program Studi dan Kurikulum">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Yale Law School Architectural Motif */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E1DA]">
          <div>
            <div className="relative inline-flex items-center mb-2">
              <div className="absolute inset-0 -m-1 border border-[#E5E1DA] dotted-matrix-bg opacity-45 pointer-events-none" />
              <span className="relative text-[10px] uppercase tracking-widest text-[#800000] font-bold bg-[#F8F7F4] px-2 py-0.5">
                PROGRAM STUDI HUKUM &bull; KURIKULUM &amp; KONSENTRASI
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1B1B] font-normal">
              Kurikulum Progresif Berbasis Kemahiran Yuridis
            </h2>
          </div>

          {/* Academic Tab Buttons */}
          <div className="mt-4 md:mt-0 flex gap-2">
            <button
              onClick={() => setActiveTab("konsentrasi")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border ${
                activeTab === "konsentrasi"
                  ? "bg-[#800000] text-white border-[#800000]"
                  : "bg-white text-[#5C5854] border-[#E5E1DA] hover:border-[#800000]"
              }`}
            >
              4 Konsentrasi Keilmuan
            </button>
            <button
              onClick={() => setActiveTab("jenjang")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border ${
                activeTab === "jenjang"
                  ? "bg-[#800000] text-white border-[#800000]"
                  : "bg-white text-[#5C5854] border-[#E5E1DA] hover:border-[#800000]"
              }`}
            >
              Jenjang Gelar &amp; Profesi
            </button>
          </div>
        </div>

        {/* Tab 1: 4 Konsentrasi */}
        {activeTab === "konsentrasi" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {concentrations.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-[#E5E1DA] hover:border-[#800000] p-6 sm:p-8 flex flex-col justify-between transition-colors group"
              >
                <div>
                  <div className="w-9 h-9 border border-[#800000] bg-white text-[#800000] flex items-center justify-center mb-4">
                    <BookOpen className="w-4 h-4 stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#1C1B1B] group-hover:text-[#800000] transition-colors mb-1">
                    {c.title}
                  </h3>

                  <p className="text-xs text-[#C5A059] font-semibold uppercase tracking-wider mb-5">
                    {c.subtitle}
                  </p>

                  <div className="mb-6">
                    <p className="text-[11px] font-bold text-[#1C1B1B] uppercase tracking-wider mb-3">
                      Mata Kuliah Keahlian Utama:
                    </p>
                    <ul className="space-y-2">
                      {c.subjects.map((sub, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5 text-xs text-[#5C5854]">
                          <Check className="w-3.5 h-3.5 text-[#800000] shrink-0 mt-0.5" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0EDED] text-xs">
                  <p className="text-[11px] text-[#5C5854]">
                    <strong className="text-[#1C1B1B] font-semibold">Prospek Karir Lulusan:</strong> {c.careers}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Jenjang Pendidikan */}
        {activeTab === "jenjang" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {degrees.map((d, dIdx) => (
              <div
                key={dIdx}
                className="bg-white border border-[#E5E1DA] p-6 sm:p-8 flex flex-col justify-between hover:border-[#800000] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F0EDED]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000]">
                      {d.badge}
                    </span>
                    <span className="text-xs font-semibold text-[#5C5854]">{d.period}</span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#1C1B1B] mb-3">
                    {d.program}
                  </h3>

                  <p className="text-xs text-[#5C5854] leading-relaxed mb-6 font-light">
                    {d.desc}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {d.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-[#1C1B1B]">
                        <Check className="w-3.5 h-3.5 text-[#800000] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenAdmission}
                  className="w-full py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Informasi Pendaftaran Program</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#E8D8B0]" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
