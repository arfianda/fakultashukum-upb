"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  X,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { EventItem } from "@/data/initialData";

interface AdminAgendaViewProps {
  events: EventItem[];
  onDeleteEvent: (id: number) => void;
  onOpenCreateModal: () => void;
}

interface CalendarDayEvent {
  id: number;
  title: string;
  time: string;
  speaker: string;
  location: string;
  phone: string;
  type: "trial" | "lecture" | "workshop" | "consultation";
  status: "Confirmed" | "Scheduled";
  avatar: string;
}

export function AdminAgendaView({
  events,
  onDeleteEvent,
  onOpenCreateModal,
}: AdminAgendaViewProps) {
  const [selectedMonth, setSelectedMonth] = useState("Oktober 2026");
  const [activePopupEvent, setActivePopupEvent] = useState<CalendarDayEvent | null>({
    id: 17,
    title: "Sidang Semu: Peradilan Niaga & Kepailitan",
    time: "Kamis, 17 Oktober • 10.30 - 11.30 WIB",
    speaker: "Dosen Pengampu Peradilan Niaga",
    location: "Ruang Sidang Semu Moot Court Lt. 3, Kampus UPB",
    phone: "+62 812-8921-3456",
    type: "trial",
    status: "Confirmed",
    avatar: "/images/prof-hendra.jpg",
  });

  // Days of week
  const weekDayHeaders = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  // Calendar cells for October 2026 (Starts on Thursday Oct 1)
  // Sep 28-30 (prev month), Oct 1-31, Nov 1 (next month) = 35 cells
  const calendarCells = [
    { day: 28, isCurrentMonth: false, events: [] },
    { day: 29, isCurrentMonth: false, events: [] },
    { day: 30, isCurrentMonth: false, events: [] },
    { day: 1, isCurrentMonth: true, events: [] },
    {
      day: 2,
      isCurrentMonth: true,
      events: [
        {
          id: 2,
          title: "Gladi Resik NMCC",
          time: "10.00 - 11.30",
          speaker: "Tim Delegasi Mahasiswa",
          location: "Lab Hukum Lt. 2",
          phone: "+62 811-2345-6789",
          type: "workshop" as const,
          status: "Confirmed" as const,
          avatar: "/images/alumni-almira.jpg",
        },
      ],
    },
    { day: 3, isCurrentMonth: true, isWeekend: true, events: [] },
    { day: 4, isCurrentMonth: true, isWeekend: true, striped: true, events: [] },
    { day: 5, isCurrentMonth: true, events: [] },
    {
      day: 6,
      isCurrentMonth: true,
      events: [
        {
          id: 6,
          title: "Sidang Pidana Semu",
          time: "09.00 - 12.00",
          speaker: "Hakim Pembimbing",
          location: "Moot Court Lt. 3",
          phone: "+62 812-4455-6677",
          type: "trial" as const,
          status: "Confirmed" as const,
          avatar: "/images/prof-hendra.jpg",
        },
        {
          id: 62,
          title: "Bedah Kasus Posisi",
          time: "13.00 - 15.00",
          speaker: "Dosen Pidana",
          location: "Ruang 204",
          phone: "+62 813-7788-9900",
          type: "consultation" as const,
          status: "Confirmed" as const,
          avatar: "/images/prof-amaliah.jpg",
        },
      ],
    },
    { day: 7, isCurrentMonth: true, events: [] },
    {
      day: 8,
      isCurrentMonth: true,
      events: [
        {
          id: 8,
          title: "Kuliah Tamu Arbitrase",
          time: "10.00 - 11.30",
          speaker: "Managing Partner Law Firm",
          location: "Auditorium R. Soepomo",
          phone: "+62 815-1122-3344",
          type: "lecture" as const,
          status: "Confirmed" as const,
          avatar: "/images/prof-amaliah.jpg",
        },
      ],
    },
    { day: 9, isCurrentMonth: true, events: [] },
    { day: 10, isCurrentMonth: true, isWeekend: true, events: [] },
    { day: 11, isCurrentMonth: true, isWeekend: true, striped: true, events: [] },
    { day: 12, isCurrentMonth: true, events: [] },
    {
      day: 13,
      isCurrentMonth: true,
      events: [
        {
          id: 13,
          title: "Klinik Bantuan Hukum",
          time: "09.00 - 12.00",
          speaker: "Advokat Posbakum UPB",
          location: "Ruang Konsultasi KLBH",
          phone: "+62 818-5566-7788",
          type: "consultation" as const,
          status: "Confirmed" as const,
          avatar: "/images/prof-hendra.jpg",
        },
      ],
    },
    { day: 14, isCurrentMonth: true, events: [] },
    { day: 15, isCurrentMonth: true, events: [] },
    { day: 16, isCurrentMonth: true, events: [] },
    {
      day: 17,
      isCurrentMonth: true,
      isHighlighted: true,
      events: [
        {
          id: 17,
          title: "Sidang Semu: Peradilan Niaga",
          time: "Kamis, 17 Oktober • 10.30 - 11.30 WIB",
          speaker: "Dosen Pengampu Peradilan Niaga",
          location: "Ruang Sidang Semu Moot Court Lt. 3",
          phone: "+62 812-8921-3456",
          type: "trial" as const,
          status: "Confirmed" as const,
          avatar: "/images/prof-hendra.jpg",
        },
      ],
    },
    { day: 18, isCurrentMonth: true, isWeekend: true, events: [] },
    { day: 19, isCurrentMonth: true, isWeekend: true, striped: true, events: [] },
    { day: 20, isCurrentMonth: true, events: [] },
    {
      day: 21,
      isCurrentMonth: true,
      events: [
        {
          id: 21,
          title: "Konsultasi Legal Drafting",
          time: "10.00 - 11.00",
          speaker: "Senior Counsel",
          location: "Ruang Dosen",
          phone: "+62 819-3344-5566",
          type: "workshop" as const,
          status: "Confirmed" as const,
          avatar: "/images/prof-amaliah.jpg",
        },
      ],
    },
    { day: 22, isCurrentMonth: true, events: [] },
    { day: 23, isCurrentMonth: true, events: [] },
    { day: 24, isCurrentMonth: true, events: [] },
    { day: 25, isCurrentMonth: true, isWeekend: true, events: [] },
    { day: 26, isCurrentMonth: true, isWeekend: true, striped: true, events: [] },
    { day: 27, isCurrentMonth: true, events: [] },
    { day: 28, isCurrentMonth: true, events: [] },
    { day: 29, isCurrentMonth: true, events: [] },
    {
      day: 30,
      isCurrentMonth: true,
      events: [
        {
          id: 30,
          title: "Webinar Pembaharuan KUHP",
          time: "11.00 - 12.30",
          speaker: "Pakar Pidana Nasional",
          location: "Live Zoom & YouTube",
          phone: "+62 821-7788-9911",
          type: "lecture" as const,
          status: "Confirmed" as const,
          avatar: "/images/prof-hendra.jpg",
        },
      ],
    },
    { day: 31, isCurrentMonth: true, events: [] },
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls Bar (Matching Screenshot 2) */}
      <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Month Navigator */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#73655D] transition-colors"
            title="Bulan sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-serif font-bold text-base sm:text-lg text-[#0D0D0D]">
            {selectedMonth}
          </span>
          <button
            type="button"
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#73655D] transition-colors"
            title="Bulan berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls & New Event Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1 bg-[#FAF7F2] rounded-full p-1 border border-[#E2D9C8]">
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-white text-[#544942] transition-colors"
              title="Pencarian agenda"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-white text-[#544942] transition-colors"
              title="Filter jenis agenda"
            >
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E2D9C8] text-xs font-semibold text-[#0D0D0D]">
            <Calendar className="w-3.5 h-3.5 text-[#710912]" />
            <span>Bulanan</span>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#710912] hover:bg-[#48060B] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Jadwalkan Agenda</span>
          </button>
        </div>
      </div>

      {/* Main Calendar Grid Container (Matching Screenshot 2) */}
      <div className="relative bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-4 sm:p-6 overflow-hidden">
        {/* Day Header Row */}
        <div className="grid grid-cols-7 gap-2 pb-3 mb-2 border-b border-[#FAF7F2] text-center">
          {weekDayHeaders.map((header, idx) => (
            <div key={idx} className="text-xs font-bold text-[#73655D]">
              {header}
            </div>
          ))}
        </div>

        {/* 7-column Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {calendarCells.map((cell, idx) => {
            const hasEvents = cell.events.length > 0;
            const isHighlighted = cell.isHighlighted;

            return (
              <div
                key={idx}
                className={`min-h-[90px] sm:min-h-[115px] p-2 rounded-2xl border transition-all flex flex-col justify-between ${
                  isHighlighted
                    ? "bg-[#EFE5D2]/60 border-[#C28D39] ring-2 ring-[#C28D39]/20"
                    : cell.striped
                    ? "striped-bar-neutral border-[#E2D9C8] bg-[#FAF9F6]/50"
                    : cell.isCurrentMonth
                    ? "bg-[#FCFBF9] border-[#E2D9C8] hover:border-[#710912]/40"
                    : "bg-[#FAF7F2]/40 border-transparent text-[#9C8F85]"
                }`}
              >
                {/* Day number */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isHighlighted
                        ? "w-6 h-6 rounded-full bg-[#710912] text-white flex items-center justify-center text-[11px]"
                        : cell.isCurrentMonth
                        ? "text-[#0D0D0D]"
                        : "text-[#9C8F85]"
                    }`}
                  >
                    {cell.day}
                  </span>
                  {hasEvents && !isHighlighted && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#710912]" />
                  )}
                </div>

                {/* Event tags inside cell */}
                <div className="space-y-1 mt-1">
                  {cell.events.map((ev) => (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setActivePopupEvent(ev)}
                      className={`w-full text-left p-1.5 rounded-xl text-[10px] font-semibold leading-tight transition-transform hover:scale-[1.02] truncate block ${
                        ev.type === "trial"
                          ? "bg-rose-50 text-rose-800 border border-rose-200"
                          : ev.type === "lecture"
                          ? "bg-[#EFE5D2] text-[#710912] border border-[#EFE5D2]"
                          : "bg-blue-50 text-blue-800 border border-blue-200"
                      }`}
                    >
                      <div className="truncate">{ev.title}</div>
                      <div className="text-[9px] opacity-75">{ev.time}</div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Event Detail Floating Popup Card (Matching Screenshot 2 exactly!) */}
        {activePopupEvent && (
          <div className="absolute right-6 bottom-6 sm:right-10 sm:bottom-10 max-w-sm w-full bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_16px_40px_rgba(28,27,27,0.16)] p-5 z-20 animate-dropdown">
            <div className="flex items-start justify-between mb-3 pb-3 border-b border-[#FAF7F2]">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#C28D39]/40 bg-[#710912] shrink-0">
                  <Image
                    src={activePopupEvent.avatar}
                    alt={activePopupEvent.speaker}
                    width={44}
                    height={44}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0D0D0D] leading-tight">
                    {activePopupEvent.title}
                  </h4>
                  <p className="text-xs text-[#73655D] mt-0.5">{activePopupEvent.speaker}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  • Terkonfirmasi
                </span>
                <button
                  type="button"
                  onClick={() => setActivePopupEvent(null)}
                  className="text-[#9C8F85] hover:text-[#0D0D0D] p-1 rounded-full hover:bg-[#FAF7F2]"
                  title="Tutup detail"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Event Info Details */}
            <div className="space-y-2 text-xs text-[#544942] mb-5">
              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#710912] shrink-0" />
                <span>{activePopupEvent.time}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#710912] shrink-0" />
                <span>{activePopupEvent.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#710912] shrink-0" />
                <span className="font-mono">{activePopupEvent.phone}</span>
              </div>
            </div>

            {/* Action CTA Button (Matching Screenshot 2 "Write a message") */}
            <button
              type="button"
              className="w-full py-2.5 bg-[#0D0D0D] hover:bg-[#710912] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Tulis Notula / Hubungi Narasumber</span>
            </button>
          </div>
        )}
      </div>

      {/* Database Registered Events List Section */}
      <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2] mb-4">
          <div>
            <h3 className="font-serif font-bold text-base text-[#0D0D0D]">
              Daftar Agenda &amp; Kuliah Pakar Terdaftar ({events.length})
            </h3>
            <p className="text-xs text-[#73655D]">
              Disinkronkan dengan kalender akademik fakultas
            </p>
          </div>
          <button
            onClick={onOpenCreateModal}
            className="text-xs font-bold text-[#710912] hover:underline"
          >
            + Tambah Agenda
          </button>
        </div>

        <div className="divide-y divide-[#FAF7F2]">
          {events.map((e) => (
            <div key={e.id} className="py-3.5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#EFE5D2] text-[#710912] text-[10px] font-bold border border-[#EFE5D2]">
                    {e.badge || "Kuliah Pakar"}
                  </span>
                  <span className="text-xs font-semibold text-[#710912]">{e.eventDate}</span>
                  <span className="text-[#9C8F85]">&bull;</span>
                  <span className="text-[11px] text-[#73655D]">{e.location}</span>
                </div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-[#0D0D0D]">
                  {e.title}
                </h4>
                <p className="text-xs text-[#73655D] mt-0.5">{e.speaker}</p>
              </div>

              <button
                type="button"
                onClick={() => onDeleteEvent(e.id)}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                title="Hapus agenda"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
