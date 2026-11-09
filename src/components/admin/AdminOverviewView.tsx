"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Plus,
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
  ArrowUpRight,
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
  const [selectedDayIndex, setSelectedDayIndex] = useState(2);

  // State for interactive weekly activity bar chart
  const [activeBarIndex, setActiveBarIndex] = useState(3); // Rabu default

  // State for interactive timeline pin
  const [activeTimelineId, setActiveTimelineId] = useState(2);

  const weekDays = [
    { day: "Min", date: 15, label: "Minggu, 15 Oktober" },
    { day: "Sen", date: 16, label: "Senin, 16 Oktober" },
    { day: "Sel", date: 17, label: "Selasa, 17 Oktober" },
    { day: "Rab", date: 18, label: "Rabu, 18 Oktober" },
    { day: "Kam", date: 19, label: "Kamis, 19 Oktober" },
    { day: "Jum", date: 20, label: "Jumat, 20 Oktober" },
    { day: "Sab", date: 21, label: "Sabtu, 21 Oktober" },
  ];

  // Adherence / Activity weekly values for chart (Sun-Sat)
  const weeklyData = [
    { day: "Min", height: "45%", count: 3, desc: "3 draf kajian masuk" },
    { day: "Sen", height: "70%", count: 6, desc: "6 artikel disunting" },
    { day: "Sel", height: "60%", count: 5, desc: "5 publikasi terverifikasi" },
    { day: "Rab", height: "92%", count: 9, desc: "9 naskah & riset terbit" },
    { day: "Kam", height: "55%", count: 4, desc: "4 tinjauan sejawat" },
    { day: "Jum", height: "80%", count: 7, desc: "7 jurnal SINTA disinkronkan" },
    { day: "Sab", height: "40%", count: 2, desc: "2 pembaruan repositori" },
  ];

  // Refill / task alerts list
  const alertItems = [
    {
      id: 1,
      title: "Verifikasi Jurnal Mahasiswa",
      subtitle: "3 berkas menunggu telaah dekanat",
      urgency: "3 hari tersisa",
      type: "critical" as const,
      action: "Tinjau",
      tab: "articles" as const,
    },
    {
      id: 2,
      title: "Pembaruan Silabus Pidana",
      subtitle: "Penyesuaian KUHP & KUHAP 2026",
      urgency: "7 hari tersisa",
      type: "warning" as const,
      action: "Perbarui",
      tab: "articles" as const,
    },
    {
      id: 3,
      title: "Konflik Ruang Moot Court",
      subtitle: "Bentrok jadwal gladi resik NMCC & sidang",
      urgency: "Perlu atur ulang",
      type: "critical" as const,
      action: "Jadwal",
      tab: "agenda" as const,
    },
    {
      id: 4,
      title: "Sinkronisasi Data Dosen SINTA",
      subtitle: "2 profil dosen memerlukan pembaruan NIDN",
      urgency: "5 hari tersisa",
      type: "critical" as const,
      action: "Periksa",
      tab: "faculty" as const,
    },
  ];

  const timelineEvents = [
    {
      id: 1,
      time: "08:30",
      left: "15%",
      title: "Briefing NMCC",
      status: "Selesai",
      completed: true,
      icon: Scale,
    },
    {
      id: 2,
      time: "11:00",
      left: "40%",
      title: "Kajian Peradilan Niaga",
      status: "Sedang Berlangsung",
      completed: false,
      icon: FileText,
    },
    {
      id: 3,
      time: "13:30",
      left: "62%",
      title: "Kuliah Arbitrase",
      status: "dalam 2 jam",
      completed: false,
      icon: Users,
    },
    {
      id: 4,
      time: "16:30",
      left: "85%",
      title: "Rapat Pleno Senat",
      status: "dalam 5 jam",
      completed: false,
      icon: Calendar,
    },
  ];

  const activeTimelineEvent =
    timelineEvents.find((e) => e.id === activeTimelineId) || timelineEvents[1];

  return (
    <div className="space-y-6">
      {/* Greeting and Quick Action Button */}
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
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0D0D0D] hover:bg-[#710912] text-white text-xs font-semibold shadow-sm hover:shadow-[0_8px_20px_rgba(113,9,18,0.22)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Konten</span>
        </button>
      </div>

      {/* Primary 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Highlight Card + Weekly Activity */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Card 1: Highlight Maroon Gradient Banner */}
          <div
            onClick={() => onNavigateToTab("articles")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onNavigateToTab("articles");
              }
            }}
            className="group rounded-3xl bg-gradient-to-br from-[#710912] via-[#48060B] to-[#362822] text-white p-6 shadow-[0_8px_24px_rgba(128,0,0,0.18)] hover:shadow-[0_16px_36px_rgba(113,9,18,0.28)] hover:-translate-y-0.5 ring-1 ring-white/10 hover:ring-[#C28D39]/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[190px] cursor-pointer"
          >
            {/* Ambient subtle glow */}
            <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#C28D39]/20 group-hover:bg-[#C28D39]/35 rounded-full blur-2xl pointer-events-none transition-colors duration-300" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-[#EFE5D2] transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-white/90 tracking-wide">
                  Target Publikasi Naskah
                </span>
              </div>
              <span
                className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white/80 group-hover:text-white transition-all"
                title="Kelola Publikasi Naskah"
              >
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>

            {/* Counter and next schedule */}
            <div className="my-4 relative z-10">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {posts.length} / 10
                  </span>
                  <span className="text-xs text-white/75 ml-2 font-medium">
                    terbit
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-semibold text-[#EFE5D2] group-hover:underline">
                    Kajian Konstitusi
                  </div>
                  <div className="text-xs text-white/70">Pukul 13.30 WIB</div>
                </div>
              </div>
            </div>

            {/* Progress Bar with striped visual pattern */}
            <div className="relative z-10">
              <div className="w-full h-3 rounded-full bg-black/25 p-0.5 overflow-hidden flex">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (posts.length / 10) * 100 * 0.6)}%`,
                  }}
                />
                <div
                  className="h-full rounded-r-full striped-bar-light transition-all duration-500 opacity-80"
                  style={{
                    width: `${Math.min(100, (posts.length / 10) * 100 * 0.4)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Weekly Activity Bar Chart */}
          <div className="rounded-3xl bg-white border border-[#E2D9C8] hover:border-[#D0C2AD] shadow-[0_2px_16px_rgba(28,27,27,0.03)] hover:shadow-[0_10px_28px_rgba(28,27,27,0.07)] transition-all duration-200 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#710912]" />
                <span className="text-xs font-bold text-[#0D0D0D]">
                  Aktivitas Publikasi &amp; Riset
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E2D9C8] text-[10px] font-semibold text-[#710912]">
                {weeklyData[activeBarIndex]?.desc}
              </span>
            </div>

            {/* Interactive Pill Bar Chart (Min - Sab) */}
            <div className="pt-6 pb-2">
              <div className="flex items-end justify-between gap-2 h-32 px-2">
                {weeklyData.map((item, idx) => {
                  const isActive = idx === activeBarIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveBarIndex(idx)}
                      className="group/bar flex-1 flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                      title={`${item.day}: ${item.desc}`}
                    >
                      <div className="relative w-full max-w-[28px] h-28 bg-[#FAF7F2] group-hover/bar:bg-[#EFE5D2]/60 rounded-full flex flex-col justify-end p-0.5 overflow-hidden border border-transparent group-hover/bar:border-[#E2D9C8] transition-all">
                        <div
                          className={`w-full rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-[#710912] shadow-sm shadow-[#710912]/30"
                              : "striped-bar-maroon bg-[#F0ECE4] group-hover/bar:bg-[#C28D39]/50"
                          }`}
                          style={{ height: item.height }}
                        />
                      </div>
                      <span
                        className={`text-xs transition-colors ${
                          isActive
                            ? "text-[#710912] font-bold"
                            : "text-[#73655D] font-semibold group-hover/bar:text-[#0D0D0D]"
                        }`}
                      >
                        {item.day}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Appointments / Agenda */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-[#E2D9C8] hover:border-[#D0C2AD] shadow-[0_2px_16px_rgba(28,27,27,0.03)] hover:shadow-[0_10px_28px_rgba(28,27,27,0.07)] transition-all duration-200 p-5 flex flex-col justify-between">
          <div>
            {/* Header with Navigation Arrows */}
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#710912]" />
                <span className="text-xs font-bold text-[#0D0D0D]">
                  Jadwal &amp; Kuliah Tamu
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#73655D]">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedDayIndex((prev) => Math.max(0, prev - 1))
                  }
                  className="w-6 h-6 rounded-full hover:bg-[#FAF7F2] hover:text-[#710912] flex items-center justify-center transition-colors cursor-pointer"
                  title="Hari sebelumnya"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedDayIndex((prev) =>
                      Math.min(weekDays.length - 1, prev + 1)
                    )
                  }
                  className="w-6 h-6 rounded-full hover:bg-[#FAF7F2] hover:text-[#710912] flex items-center justify-center transition-colors cursor-pointer"
                  title="Hari berikutnya"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mini Week Bar */}
            <div className="flex items-center justify-between py-4">
              {weekDays.map((w, idx) => {
                const isSelected = idx === selectedDayIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`flex flex-col items-center py-1.5 px-2.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-white border-2 border-[#0D0D0D] shadow-xs -translate-y-0.5"
                        : "border-transparent hover:bg-[#FAF7F2] hover:border-[#E2D9C8] hover:-translate-y-0.5"
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

            {/* Schedule cards list with real hover state */}
            <div className="space-y-3 mt-2">
              {/* Event 1 */}
              <div
                onClick={() => onNavigateToTab("agenda")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigateToTab("agenda");
                  }
                }}
                className="group p-3.5 rounded-2xl bg-[#FAF7F2]/80 hover:bg-white border border-[#E2D9C8] hover:border-[#710912]/40 hover:shadow-[0_8px_20px_rgba(113,9,18,0.07)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="text-xs text-[#73655D] font-medium mb-1.5 flex items-center justify-between">
                  <span>
                    {weekDays[selectedDayIndex]?.label} &bull; 09.30 - 11.30 WIB
                  </span>
                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-md">
                    Terkonfirmasi
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#C28D39]/40 bg-[#710912] text-[#EFE5D2] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <span>DP</span>
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs text-[#0D0D0D] group-hover:text-[#710912] transition-colors">
                        Sidang Semu: Peradilan Niaga
                      </h4>
                      <p className="text-[11px] text-[#73655D]">
                        Dosen Pengampu Peradilan
                      </p>
                    </div>
                  </div>

                  <span
                    className="w-8 h-8 rounded-full bg-white border border-[#E2D9C8] group-hover:border-[#710912] group-hover:bg-[#710912] text-[#544942] group-hover:text-white flex items-center justify-center shrink-0 transition-all"
                    title="Lihat detail jadwal"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Event 2 */}
              <div
                onClick={() => onNavigateToTab("agenda")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigateToTab("agenda");
                  }
                }}
                className="group p-3.5 rounded-2xl bg-[#FAF7F2]/80 hover:bg-white border border-[#E2D9C8] hover:border-[#710912]/40 hover:shadow-[0_8px_20px_rgba(113,9,18,0.07)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="text-xs text-[#73655D] font-medium mb-1.5 flex items-center justify-between">
                  <span>
                    {weekDays[selectedDayIndex]?.label} &bull; 13.30 - 15.00 WIB
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#EFE5D2] text-[#710912] text-[11px] font-bold rounded-md border border-[#EFE5D2]">
                    Kuliah Pakar
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#C28D39]/40 bg-[#48060B] text-[#EFE5D2] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <span>PT</span>
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs text-[#0D0D0D] group-hover:text-[#710912] transition-colors">
                        Hukum Siber &amp; Otomasi AI
                      </h4>
                      <p className="text-[11px] text-[#73655D]">
                        Dosen Tamu / Pakar Hukum Siber
                      </p>
                    </div>
                  </div>

                  <span
                    className="w-8 h-8 rounded-full bg-white border border-[#E2D9C8] group-hover:border-[#710912] group-hover:bg-[#710912] text-[#544942] group-hover:text-white flex items-center justify-center shrink-0 transition-all"
                    title="Lihat detail jadwal"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab("agenda")}
            className="w-full mt-4 py-2 rounded-xl hover:bg-[#FAF7F2] text-center text-xs font-semibold text-[#710912] hover:text-[#48060B] transition-colors cursor-pointer"
          >
            Buka Kalender Lengkap &rarr;
          </button>
        </div>

        {/* Right Column: Task & Refill Alerts */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-[#E2D9C8] hover:border-[#D0C2AD] shadow-[0_2px_16px_rgba(28,27,27,0.03)] hover:shadow-[0_10px_28px_rgba(28,27,27,0.07)] transition-all duration-200 p-5 flex flex-col justify-between">
          <div>
            {/* Header with View All */}
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-[#0D0D0D]">
                  Peringatan &amp; Tugas Berkas
                </span>
              </div>
              <button
                onClick={() => onNavigateToTab("articles")}
                className="text-xs font-semibold text-[#73655D] hover:text-[#710912] transition-colors cursor-pointer"
              >
                Lihat Semua
              </button>
            </div>

            {/* Alert Items List with Interactive Row Hover */}
            <div className="space-y-1.5 mt-2">
              {alertItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateToTab(item.tab)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onNavigateToTab(item.tab);
                    }
                  }}
                  className="group -mx-1 px-2.5 py-2.5 rounded-2xl border border-transparent hover:border-[#E2D9C8] hover:bg-[#FAF7F2] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                        item.type === "critical"
                          ? "bg-rose-50 text-rose-600 border border-rose-100"
                          : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="font-serif font-bold text-xs text-[#0D0D0D] group-hover:text-[#710912] transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#73655D] flex items-center gap-1.5 mt-0.5">
                        <span className="font-medium text-rose-700">
                          {item.urgency}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-[#0D0D0D] bg-[#FAF7F2] border border-[#E2D9C8] group-hover:bg-[#710912] group-hover:border-[#710912] group-hover:text-white px-3 py-1 rounded-full transition-all whitespace-nowrap shrink-0">
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-[#FAF7F2] flex items-center justify-between text-xs text-[#73655D]">
            <span>Sistem Audit Sanitasi</span>
            <span className="font-semibold text-emerald-700">
              DOMPurify Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Card: Daily Timeline Schedule */}
      <div className="rounded-3xl bg-white border border-[#E2D9C8] hover:border-[#D0C2AD] shadow-[0_2px_16px_rgba(28,27,27,0.03)] hover:shadow-[0_10px_28px_rgba(28,27,27,0.06)] transition-all duration-200 p-6">
        {/* Timeline Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#FAF7F2] gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setSelectedDayIndex((prev) => Math.max(0, prev - 1))
              }
              className="w-7 h-7 rounded-full hover:bg-[#FAF7F2] hover:text-[#710912] flex items-center justify-center text-[#73655D] transition-colors cursor-pointer"
              title="Kemarin"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-serif font-bold text-sm sm:text-base text-[#0D0D0D]">
              {weekDays[selectedDayIndex]?.label} 2026
            </span>
            <button
              type="button"
              onClick={() =>
                setSelectedDayIndex((prev) =>
                  Math.min(weekDays.length - 1, prev + 1)
                )
              }
              className="w-7 h-7 rounded-full hover:bg-[#FAF7F2] hover:text-[#710912] flex items-center justify-center text-[#73655D] transition-colors cursor-pointer"
              title="Besok"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigateToTab("agenda")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#710912] border border-[#E2D9C8] hover:border-[#710912] text-xs font-semibold text-[#0D0D0D] hover:text-white transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#710912] group-hover:text-white" />
              <span>Tampilan Harian</span>
            </button>
          </div>
        </div>

        {/* Horizontal Timeline Track (08:00 - 18:00) */}
        <div className="pt-8 pb-4 overflow-x-auto">
          <div className="min-w-[700px] relative">
            {/* Pinned event capsules on the timeline */}
            <div className="relative h-20 mb-4">
              {timelineEvents.map((ev) => {
                const Icon = ev.icon;
                const isSelected = ev.id === activeTimelineId;

                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setActiveTimelineId(ev.id)}
                    style={{ left: ev.left }}
                    className={`absolute top-0 transform -translate-x-1/2 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-white border-2 border-[#710912] shadow-[0_8px_20px_rgba(113,9,18,0.12)] -translate-y-1"
                        : "bg-[#FAF7F2] hover:bg-white border border-[#E2D9C8] hover:border-[#710912]/50 shadow-2xs hover:shadow-[0_6px_16px_rgba(113,9,18,0.08)] hover:-translate-y-1"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#710912] text-[#EFE5D2]"
                          : "bg-[#EFE5D2] text-[#710912]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div
                        className={`font-serif font-bold text-xs ${
                          isSelected ? "text-[#710912]" : "text-[#0D0D0D]"
                        }`}
                      >
                        {ev.title}
                      </div>
                      {ev.completed ? (
                        <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{ev.status}</span>
                        </div>
                      ) : (
                        <div
                          className={`text-xs font-medium ${
                            isSelected
                              ? "text-[#710912] font-semibold"
                              : "text-[#73655D]"
                          }`}
                        >
                          {ev.status}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Time Axis Bar with ticks */}
            <div className="relative pt-6 border-t border-[#E2D9C8]">
              {/* Active time indicator dot & pin */}
              <div
                className="absolute -top-1.5 transform -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                style={{ left: activeTimelineEvent.left }}
              >
                <div className="w-3 h-3 rounded-full bg-[#710912] ring-4 ring-[#710912]/20" />
                <span className="text-xs font-bold text-[#710912] mt-1">
                  {activeTimelineEvent.time}
                </span>
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
