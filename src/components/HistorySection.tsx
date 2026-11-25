"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Building2,
  Landmark,
  Award,
  UserCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export interface LeadershipMember {
  role: "Dekan" | "Wakil Dekan" | "Kaprodi";
  name: string;
}

export interface HistoryMilestone {
  id: string;
  period: string;
  badge: string;
  title: string;
  description: string;
  leaders: LeadershipMember[];
  icon: LucideIcon;
  isCurrent?: boolean;
}

export const HISTORY_HEADER = {
  kicker: "SEJARAH & TONGGAK KEPEMIMPINAN",
  title: "Sejarah Fakultas Hukum",
  subtitle:
    "Perjalanan transformasi kelembagaan dan estafet kepemimpinan Fakultas Hukum Universitas Pelita Bangsa dari masa ke masa.",
  intro:
    "Perjalanan Fakultas Hukum Universitas Pelita Bangsa mencerminkan dinamika pertumbuhan institusi yang adaptif dan berkelanjutan. Dimulai sebagai sebuah program studi di bawah naungan fakultas lintas disiplin, Program Studi Hukum terus berkembang secara akademik maupun kelembagaan hingga resmi berdiri mandiri sebagai Fakultas Hukum yang berfokus mencetak lulusan hukum yang berintegritas, profesional, dan relevan dengan perkembangan zaman.",
};

export const HISTORY_MILESTONES: HistoryMilestone[] = [
  {
    id: "febis-2019-2022",
    period: "2019 – 2022",
    badge: "Fase Perintisan (FEBIS)",
    title: "Awal Perjalanan di Bawah Naungan FEBIS",
    description:
      "Pada fase awal berdirinya, Program Studi Ilmu Hukum beroperasi sebagai bagian dari Fakultas Ekonomi, Bisnis, dan Ilmu Sosial (FEBIS) Universitas Pelita Bangsa. Kepemimpinan program studi pada periode ini meletakkan fondasi dasar kurikulum serta tata kelola akademik.",
    leaders: [{ role: "Kaprodi", name: "Ibu Syifa & Ibu Arum" }],
    icon: BookOpen,
  },
  {
    id: "fikt-2022-2024",
    period: "2022 – 2024",
    badge: "Fase Transisi (FIKT)",
    title: "Transisi & Penguatan Mutu di Bawah FIKT",
    description:
      "Seiring dengan restrukturisasi klaster keilmuan universitas, Program Studi Ilmu Hukum bernaung di bawah FIKT dalam rangka penguatan mutu akademik dan kesiapan kemandirian kelembagaan.",
    leaders: [{ role: "Kaprodi", name: "Ibu Septi Ayu" }],
    icon: Building2,
  },
  {
    id: "fh-mandiri-2024-2025",
    period: "2024 – 2025",
    badge: "Kemandirian Fakultas (FH)",
    title: "Resmi Berdiri Mandiri sebagai Fakultas Hukum",
    description:
      "Tonggak sejarah baru tercapai dengan berdirinya Fakultas Hukum (FH) Universitas Pelita Bangsa secara mandiri dengan struktur dekanat perdana.",
    leaders: [
      { role: "Dekan", name: "Ibu Septi Ayu" },
      { role: "Kaprodi", name: "Bapak Trias" },
    ],
    icon: Landmark,
  },
  {
    id: "fh-berjalan-2025",
    period: "Oktober 2025 – Sekarang",
    badge: "Periode Berjalan (FH)",
    title: "Penguatan Tata Kelola & Pengembangan Fakultas",
    description:
      "Fakultas Hukum terus memperluas jejaring, kualitas tridarma perguruan tinggi, serta tata kelola fakultas di bawah jajaran pimpinan saat ini.",
    leaders: [
      { role: "Dekan", name: "Muhammad Zulkarnaen Dharmawi, S.H., MH" },
      { role: "Wakil Dekan", name: "Dr. Hj. R.R.Wening Ken Widodasih, S.H., M.M" },
      { role: "Kaprodi", name: "Dr. Wulan Windiarti, S.H., M.H" },
    ],
    icon: Award,
    isCurrent: true,
  },
];

export function HistorySection() {
  return (
    <section
      id="sejarah"
      className="bg-white border-b border-[#E2D9C8] py-16 lg:py-24 relative overflow-hidden"
      aria-label="Sejarah dan Tonggak Kepemimpinan Fakultas Hukum Universitas Pelita Bangsa"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E2D9C8] text-[#710912] text-[10px] font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C28D39]" />
            <span>{HISTORY_HEADER.kicker}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0D0D0D] font-normal tracking-tight mb-3">
            {HISTORY_HEADER.title}
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#710912] mb-6 leading-relaxed">
            {HISTORY_HEADER.subtitle}
          </p>

          <p className="text-xs sm:text-sm md:text-base text-[#544942] leading-relaxed font-light bg-[#FAF7F2] border border-[#E2D9C8] rounded-3xl p-6 sm:p-8 text-left sm:text-center shadow-2xs">
            {HISTORY_HEADER.intro}
          </p>
        </div>

        {/* Vertical Timeline (Left-aligned on mobile/tablet, Alternating on Desktop) */}
        <div className="relative">
          {/* Vertical Spine */}
          <div
            className="absolute left-5 sm:left-6 lg:left-1/2 lg:-translate-x-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#710912] via-[#1E293B] to-[#C28D39]"
            aria-hidden="true"
          />

          <div className="space-y-8 lg:space-y-12">
            {HISTORY_MILESTONES.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={milestone.id}
                  className="relative grid grid-cols-1 lg:grid-cols-2 items-start lg:items-center gap-6 lg:gap-12"
                >
                  {/* Center / Left Timeline Node */}
                  <div
                    className={`absolute left-5 sm:left-6 lg:left-1/2 -translate-x-1/2 top-6 lg:top-1/2 lg:-translate-y-1/2 z-10 w-10 h-10 rounded-2xl flex items-center justify-center border-2 shadow-sm transition-colors ${
                      milestone.isCurrent
                        ? "bg-[#710912] border-[#C28D39] text-[#EFE5D2] ring-4 ring-[#710912]/10"
                        : "bg-white border-[#710912] text-[#710912]"
                    }`}
                    aria-hidden="true"
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Card Container: Alternating placement on lg+ */}
                  <div
                    className={`pl-14 sm:pl-16 lg:pl-0 ${
                      isEven
                        ? "lg:col-start-1 lg:pr-10"
                        : "lg:col-start-2 lg:pl-10"
                    }`}
                  >
                    <article
                      className={`group rounded-3xl border p-6 sm:p-7 transition-all duration-200 ${
                        milestone.isCurrent
                          ? "bg-[#FAF7F2] border-[#710912]/40 shadow-[0_12px_32px_rgba(113,9,18,0.08)]"
                          : "bg-white border-[#E2D9C8] hover:border-[#710912]/40 hover:shadow-[0_10px_28px_rgba(28,27,27,0.06)]"
                      }`}
                    >
                      {/* Top Meta Row: Period & Phase Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1E293B] text-white text-[11px] font-bold tracking-wider">
                          {milestone.period}
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            milestone.isCurrent
                              ? "bg-[#710912] text-[#EFE5D2] border-[#710912]"
                              : "bg-[#FAF7F2] text-[#710912] border-[#C28D39]/50"
                          }`}
                        >
                          {milestone.badge}
                        </span>
                      </div>

                      {/* Milestone Title & Description */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0D0D] group-hover:text-[#710912] transition-colors leading-snug mb-2.5">
                        {milestone.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#544942] leading-relaxed mb-5">
                        {milestone.description}
                      </p>

                      {/* Leadership Badges / Mini Cards */}
                      <div className="pt-4 border-t border-[#E2D9C8]">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#73655D] mb-2.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#710912]" />
                          <span>Jajaran Pimpinan Periode Ini</span>
                        </div>

                        <div className="flex flex-col gap-2">
                          {milestone.leaders.map((leader, lIdx) => (
                            <div
                              key={lIdx}
                              className="flex flex-wrap items-center gap-2.5 px-3 py-2 rounded-xl bg-white border border-[#E2D9C8] shadow-2xs"
                            >
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                                  leader.role === "Dekan"
                                    ? "bg-[#710912] text-white"
                                    : leader.role === "Wakil Dekan"
                                    ? "bg-[#1E293B] text-white"
                                    : "bg-[#EFE5D2] text-[#710912]"
                                }`}
                              >
                                {leader.role}
                              </span>
                              <span className="text-xs font-semibold text-[#0D0D0D] leading-snug">
                                {leader.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Link to Tentang & Direktori */}
        <div className="mt-12 pt-8 border-t border-[#E2D9C8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#544942]">
            Ingin mengenal jajaran pimpinan dan dosen aktif Fakultas Hukum Universitas Pelita Bangsa saat ini?
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dosen?kategori=struktural"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#710912] hover:bg-[#48060B] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Lihat Struktural Hukum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/tentang"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E2D9C8] hover:border-[#710912] text-[#0D0D0D] hover:text-[#710912] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Profil Fakultas</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
