"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  User,
  Search,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";
import { EventItem } from "@/data/initialData";

export function AgendaListingClient({
  initialEvents,
}: {
  initialEvents: EventItem[];
}) {
  const [selectedBadge, setSelectedBadge] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const badges = useMemo(() => {
    const set = new Set<string>();
    initialEvents.forEach((e) => {
      if (e.badge) set.add(e.badge);
    });
    return ["Semua", ...Array.from(set)];
  }, [initialEvents]);

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const matchBadge =
        selectedBadge === "Semua" ||
        event.badge.toLowerCase() === selectedBadge.toLowerCase();

      const matchSearch =
        searchQuery.trim() === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.speaker &&
          event.speaker.toLowerCase().includes(searchQuery.toLowerCase())) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchBadge && matchSearch;
    });
  }, [initialEvents, selectedBadge, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Search and Category Filter Toolbar */}
      <div className="mb-10 sm:mb-12 bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E1DA] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-[#8E706C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tema kegiatan, narasumber, atau tempat pelaksanaan..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8F7F4] border border-[#E5E1DA] rounded-xl text-xs sm:text-sm text-[#1C1B1B] placeholder-[#8E706C] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:bg-white transition-all"
            />
          </div>

          <p className="text-xs text-[#5C5854] font-medium shrink-0">
            Menampilkan <span className="font-bold text-[#800000]">{filteredEvents.length}</span> agenda akademik
          </p>
        </div>

        {/* Badge Filter List */}
        <div className="flex flex-wrap items-center gap-2">
          {badges.map((b) => {
            const isSelected = selectedBadge === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBadge(b)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] ${
                  isSelected
                    ? "bg-[#800000] text-white shadow-xs"
                    : "bg-[#F8F7F4] text-[#5C5854] hover:bg-[#800000]/10 hover:text-[#800000]"
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-16 bg-white border border-[#E5E1DA] rounded-2xl p-8">
          <CalendarCheck className="w-12 h-12 text-[#8E706C]/50 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-semibold text-[#1C1B1B] mb-2">
            Tidak Ada Agenda yang Sesuai
          </h3>
          <p className="text-xs sm:text-sm text-[#5C5854] max-w-md mx-auto mb-6">
            Kriteria filter atau kata kunci pencarian yang Anda masukkan tidak menghasilkan agenda kegiatan.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedBadge("Semua");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-[#800000] text-white text-xs font-semibold rounded-full hover:bg-[#570000] transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Events List Cards (Yale Date-Badge Scheme) */}
      <div className="space-y-6">
        {filteredEvents.map((event, idx) => {
          // Parse date parts for prominent Yale badge
          const dateParts = event.eventDate.split(" ");
          const day = dateParts[0] || "01";
          const monthYear = dateParts.slice(1).join(" ") || "Oktober 2026";

          return (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#E5E1DA] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start group cursor-pointer"
            >
              {/* Prominent Yale Date Block */}
              <div className="shrink-0 w-24 h-24 rounded-xl bg-[#F8F7F4] border-2 border-[#800000]/20 flex flex-col items-center justify-center text-center p-2 group-hover:border-[#800000] group-hover:bg-[#800000] transition-colors">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#800000] group-hover:text-white leading-none">
                  {day}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C5854] group-hover:text-[#E8D8B0] mt-1 leading-tight">
                  {monthYear}
                </span>
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-[#800000]/10 text-[#800000] text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {event.badge}
                  </span>
                  <span className="text-xs text-[#5C5854] flex items-center gap-1 font-light">
                    <Clock className="w-3.5 h-3.5 text-[#800000]" />
                    {event.time}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1B1B] group-hover:text-[#800000] transition-colors leading-snug mb-2.5">
                  <Link href={`/agenda/${event.slug}`}>{event.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed line-clamp-2 mb-4 font-light">
                  {event.description}
                </p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#5C5854] pt-3 border-t border-[#F0EDED] font-light">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#800000] shrink-0" />
                    <span>{event.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#800000] shrink-0" />
                    <span className="font-medium text-[#1C1B1B]">{event.speaker}</span>
                  </span>
                </div>
              </div>

              {/* Right Action Button */}
              <div className="shrink-0 self-end md:self-center">
                <Link
                  href={`/agenda/${event.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#800000]/10 hover:bg-[#800000] text-[#800000] hover:text-white text-xs font-semibold tracking-wider transition-all"
                >
                  <span>Detail &amp; Hadir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
