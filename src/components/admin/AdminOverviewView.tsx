"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  FileText,
  Users,
  Scale,
  Sparkles,
} from "lucide-react";
import { PostItem, EventItem, FacultyItem } from "@/data/initialData";

interface AdminOverviewViewProps {
  posts: PostItem[];
  events: EventItem[];
  faculty: FacultyItem[];
  onOpenCreateModal: () => void;
  onNavigateToTab: (tab: "articles" | "agenda" | "faculty") => void;
}

export function AdminOverviewView({
  posts,
  events,
  faculty,
  onOpenCreateModal,
  onNavigateToTab,
}: AdminOverviewViewProps) {
  const { data: session } = useSession();
  const displayName = session?.user?.name || "Superadmin";

  // Greeting based on current time
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Selamat Pagi"
      : currentHour < 15
      ? "Selamat Siang"
      : currentHour < 18
      ? "Selamat Sore"
      : "Selamat Malam";

  // State for mini calendar active day
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Wednesday (Selasa/Rabu)

  const weekDays = [
    { day: "Min", date: 15 },
    { day: "Sen", date: 16 },
    { day: "Sel", date: 17 },
    { day: "Rab", date: 18 },
    { day: "Kam", date: 19 },
    { day: "Jum", date: 20 },
    { day: "Sab", date: 21 },
  ];

  // Adherence / Activity weekly values for chart (Sun-Sat)
  const weeklyData = [
    { day: "Min", height: "45%", striped: true, active: false },
    { day: "Sen", height: "70%", striped: true, active: false },
    { day: "Sel", height: "60%", striped: true, active: false },
    { day: "Rab", height: "92%", striped: false, active: true }, // Highlighted active day
    { day: "Kam", height: "55%", striped: true, active: false },
    { day: "Jum", height: "80%", striped: true, active: false },
    { day: "Sab", height: "40%", striped: true, active: false },
  ];

  // Refill / task alerts list matching Pillio design
  const alertItems = [
    {
      id: 1,
      title: "Verifikasi Jurnal Mahasiswa",
      subtitle: "3 berkas menunggu telaah dekanat",
      urgency: "3 hari tersisa",
      type: "critical", // red icon
      action: "Tinjau",
      tab: "articles" as const,
    },
    {
      id: 2,
      title: "Pembaruan Silabus Pidana",
      subtitle: "Penyesuaian KUHP & KUHAP 2026",
      urgency: "7 hari tersisa",
      type: "warning", // amber icon
      action: "Perbarui",
      tab: "articles" as const,
    },
    {
      id: 3,
      title: "Konflik Ruang Moot Court",
      subtitle: "Bentrok jadwal gladi resik NMCC & sidang",
      urgency: "Perlu atur ulang",
      type: "critical",
      action: "Jadwal",
      tab: "agenda" as const,
    },
    {
      id: 4,
      title: "Sinkronisasi Data Dosen SINTA",
      subtitle: "2 profil dosen memerlukan pembaruan NIDN",
      urgency: "5 hari tersisa",
      type: "critical",
      action: "Periksa",
      tab: "faculty" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting and Quick Action Button (Matching Pillio header) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight">
            {greeting}, {displayName}
          </h1>
          <p className="text-xs text-[#73655D] mt-0.5">
            Berikut ringkasan operasional akademik &amp; publikasi hukum hari ini
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0D0D0D] hover:bg-[#710912] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Konten</span>
        </button>
      </div>

      {/* Primary 3-Column Grid (Cards 1, 2, 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (5 cols on lg): Highlight Card (Daily doses equivalent) + Weekly Activity */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Card 1: Highlight Maroon Gradient Banner (Matching Pillio Daily Doses) */}
          <div className="rounded-3xl bg-gradient-to-br from-[#710912] via-[#48060B] to-[#362822] text-white p-6 shadow-[0_8px_24px_rgba(128,0,0,0.18)] relative overflow-hidden flex flex-col justify-between min-h-[190px]">
            {/* Ambient subtle glow */}
            <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#C28D39]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[#EFE5D2]">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-white/90 tracking-wide">
                  Target Publikasi Naskah
                </span>
              </div>
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
                title="Pilihan target"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Counter and next schedule */}
            <div className="my-4 relative z-10">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {posts.length} / 10
                  </span>
                  <span className="text-xs text-white/70 ml-2 font-medium">terbit</span>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-semibold text-[#EFE5D2]">Kajian Konstitusi</div>
                  <div className="text-xs text-white/70">Pukul 13.30 WIB</div>
                </div>
              </div>
            </div>

            {/* Progress Bar with Pillio striped visual pattern */}
            <div className="relative z-10">
              <div className="w-full h-3 rounded-full bg-black/25 p-0.5 overflow-hidden flex">
                {/* Solid white portion */}
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${Math.min(100, (posts.length / 10) * 100 * 0.6)}%` }}
                />
                {/* Striped pattern portion (Pillio signature style) */}
                <div
                  className="h-full rounded-r-full striped-bar-light transition-all duration-500 opacity-80"
                  style={{ width: `${Math.min(100, (posts.length / 10) * 100 * 0.4)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 4: Weekly Adherence / Activity (Matching Pillio bar chart) */}
          <div className="rounded-3xl bg-white border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#710912]" />
                <span className="text-xs font-bold text-[#0D0D0D]">
                  Aktivitas Publikasi &amp; Riset
                </span>
              </div>
              <button
                type="button"
                className="text-[#9C8F85] hover:text-[#0D0D0D]"
                title="Opsi grafik"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Pill Bar Chart (Sen - Min) */}
            <div className="pt-6 pb-2">
              <div className="flex items-end justify-between gap-2 h-32 px-2">
                {weeklyData.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full max-w-[28px] h-28 bg-[#FAF7F2] rounded-full flex flex-col justify-end p-0.5 overflow-hidden">
                      <div
                        className={`w-full rounded-full transition-all duration-300 ${
                          item.active
                            ? "bg-[#710912] shadow-sm shadow-[#710912]/30"
                            : item.striped
                            ? "striped-bar-maroon bg-[#F0ECE4]"
                            : "bg-[#C28D39]"
                        }`}
                        style={{ height: item.height }}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        item.active ? "text-[#710912] font-bold" : "text-[#73655D]"
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column (4 cols on lg): Appointments / Agenda (Matching Pillio) */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5 flex flex-col justify-between">
          <div>
            {/* Header with Navigation Arrows */}
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#710912]" />
                <span className="text-xs font-bold text-[#0D0D0D]">Jadwal &amp; Kuliah Tamu</span>
              </div>
              <div className="flex items-center gap-1 text-[#73655D]">
                <button
                  type="button"
                  onClick={() => setSelectedDayIndex((prev) => Math.max(0, prev - 1))}
                  className="w-6 h-6 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center transition-colors"
                  title="Hari sebelumnya"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDayIndex((prev) => Math.min(weekDays.length - 1, prev + 1))}
                  className="w-6 h-6 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center transition-colors"
                  title="Hari berikutnya"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mini Week Bar (Su, Mo, Tu 19 [active], We, Th, Fr, Sa) */}
            <div className="flex items-center justify-between py-4">
              {weekDays.map((w, idx) => {
                const isSelected = idx === selectedDayIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`flex flex-col items-center py-1.5 px-2 rounded-2xl transition-all ${
                      isSelected
                        ? "bg-white border-2 border-[#0D0D0D] shadow-xs"
                        : "hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <span className="text-xs text-[#73655D]">{w.day}</span>
                    <span
                      className={`text-xs font-bold mt-0.5 ${
                        isSelected ? "text-[#0D0D0D]" : "text-[#544942]"
                      }`}
                    >
                      {w.date}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Schedule cards list matching Pillio design */}
            <div className="space-y-3 mt-2">
              {/* Event 1 */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] transition-all hover:bg-[#FAF7F2]">
                <div className="text-xs text-[#73655D] font-medium mb-1.5 flex items-center justify-between">
                  <span>Kamis, 17 Oktober • 09.30 - 11.30 WIB</span>
                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-md">
                    Terkonfirmasi
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#C28D39]/40 bg-[#710912] text-[#EFE5D2] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      <span>DP</span>
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs text-[#0D0D0D]">
                        Sidang Semu: Peradilan Niaga
                      </h4>
                      <p className="text-[11px] text-[#73655D]">
                        Dosen Pengampu Peradilan
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-white border border-[#E2D9C8] hover:border-[#710912] text-[#544942] hover:text-[#710912] flex items-center justify-center shrink-0 transition-colors"
                    title="Kirim pesan notula"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Event 2 */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] transition-all hover:bg-[#FAF7F2]">
                <div className="text-xs text-[#73655D] font-medium mb-1.5 flex items-center justify-between">
                  <span>Kamis, 17 Oktober • 13.30 - 15.00 WIB</span>
                  <span className="px-1.5 py-0.5 bg-[#EFE5D2] text-[#710912] text-[11px] font-bold rounded-md border border-[#EFE5D2]">
                    Kuliah Pakar
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#C28D39]/40 bg-[#48060B] text-[#EFE5D2] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      <span>PT</span>
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs text-[#0D0D0D]">
                        Hukum Siber &amp; Otomasi AI
                      </h4>
                      <p className="text-[11px] text-[#73655D]">
                        Dosen Tamu / Pakar Hukum Siber
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-white border border-[#E2D9C8] hover:border-[#710912] text-[#544942] hover:text-[#710912] flex items-center justify-center shrink-0 transition-colors"
                    title="Kirim pesan notula"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab("agenda")}
            className="w-full mt-4 py-2 text-center text-xs font-semibold text-[#710912] hover:text-[#48060B] transition-colors"
          >
            Buka Kalender Lengkap &rarr;
          </button>
        </div>

        {/* Right Column (4 cols on lg): Task & Refill Alerts (Matching Pillio) */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5 flex flex-col justify-between">
          <div>
            {/* Header with View All */}
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-[#0D0D0D]">Peringatan &amp; Tugas Berkas</span>
              </div>
              <button
                onClick={() => onNavigateToTab("articles")}
                className="text-xs font-semibold text-[#73655D] hover:text-[#710912] transition-colors"
              >
                Lihat Semua
              </button>
            </div>

            {/* Alert Items List (Matching Pillio layout: icon pill + text + action button) */}
            <div className="divide-y divide-[#FAF7F2] mt-1">
              {alertItems.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        item.type === "critical"
                          ? "bg-rose-50 text-rose-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="font-serif font-bold text-xs text-[#0D0D0D] truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#73655D] flex items-center gap-1.5 mt-0.5">
                        <span className="font-medium text-rose-700">{item.urgency}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigateToTab(item.tab)}
                    className="text-xs font-semibold text-[#0D0D0D] hover:text-[#710912] px-3 py-1.5 rounded-full hover:bg-[#FAF7F2] transition-colors whitespace-nowrap shrink-0"
                  >
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#FAF7F2] flex items-center justify-between text-xs text-[#73655D]">
            <span>Sistem Audit Sanitasi</span>
            <span className="font-semibold text-emerald-700">DOMPurify Aktif</span>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Card: Daily Timeline Schedule (Matching Pillio timeline) */}
      <div className="rounded-3xl bg-white border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-6">
        {/* Timeline Header: Navigator & Daily Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#FAF7F2] gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="w-7 h-7 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#73655D] transition-colors"
              title="Kemarin"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-serif font-bold text-sm sm:text-base text-[#0D0D0D]">
              Kamis, 17 Oktober 2026
            </span>
            <button
              type="button"
              className="w-7 h-7 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#73655D] transition-colors"
              title="Besok"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E2D9C8] text-xs font-semibold text-[#0D0D0D]">
              <Calendar className="w-3.5 h-3.5 text-[#710912]" />
              <span>Tampilan Harian</span>
            </div>
          </div>
        </div>

        {/* Horizontal Timeline Track (08:00 - 18:00) */}
        <div className="pt-8 pb-4 overflow-x-auto">
          <div className="min-w-[700px] relative">
            {/* Pinned event capsules on the timeline */}
            <div className="relative h-20 mb-4">
              {/* Event 1: 08:30 (Amoxicillin equivalent) */}
              <div
                className="absolute top-0 transform -translate-x-1/2 flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] shadow-2xs hover:shadow-xs transition-shadow"
                style={{ left: "15%" }}
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#EFE5D2] flex items-center justify-center text-[#710912]">
                  <Scale className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-[#0D0D0D]">Briefing NMCC</div>
                  <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Selesai</span>
                  </div>
                </div>
              </div>

              {/* Event 2: 11:00 (Metformin equivalent - Active now with vertical dashed line) */}
              <div
                className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
                style={{ left: "40%" }}
              >
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border-2 border-[#710912] shadow-sm">
                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#710912] text-[#EFE5D2] flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xs text-[#710912]">
                      Kajian Peradilan Niaga
                    </div>
                    <div className="text-xs font-semibold text-[#710912]">
                      Sedang Berlangsung
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 3: 13:30 (Lisinopril equivalent - in 2h) */}
              <div
                className="absolute top-0 transform -translate-x-1/2 flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] shadow-2xs hover:shadow-xs transition-shadow"
                style={{ left: "62%" }}
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#EFE5D2] text-[#710912] flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-[#0D0D0D]">Kuliah Arbitrase</div>
                  <div className="text-xs text-[#73655D] font-medium">dalam 2 jam</div>
                </div>
              </div>

              {/* Event 4: 16:30 (Atorvastatin equivalent - in 5h) */}
              <div
                className="absolute top-0 transform -translate-x-1/2 flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] shadow-2xs hover:shadow-xs transition-shadow"
                style={{ left: "85%" }}
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#EFE5D2] text-[#710912] flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-[#0D0D0D]">Rapat Pleno Senat</div>
                  <div className="text-xs text-[#73655D] font-medium">dalam 5 jam</div>
                </div>
              </div>
            </div>

            {/* Time Axis Bar with ticks */}
            <div className="relative pt-6 border-t border-[#E2D9C8]">
              {/* Active time indicator dot & pin */}
              <div
                className="absolute -top-1.5 transform -translate-x-1/2 flex flex-col items-center"
                style={{ left: "40%" }}
              >
                <div className="w-3 h-3 rounded-full bg-[#710912] ring-4 ring-[#710912]/20" />
                <span className="text-xs font-bold text-[#710912] mt-1">11:00</span>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-[#9C8F85]">
                <span>08:00</span>
                <span>10:00</span>
                <span>12:00</span>
                <span>14:00</span>
                <span>16:00</span>
                <span>18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
