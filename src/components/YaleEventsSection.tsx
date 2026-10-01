"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Clock, User, X, CheckCircle } from "lucide-react";
import { EventItem } from "@/data/initialData";

export function YaleEventsSection({ events }: { events: EventItem[] }) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registered, setRegistered] = useState(false);

  // Helper to extract month string and day number from "12 Oktober 2026"
  const parseEventDate = (dateStr: string) => {
    const parts = dateStr.split(" ");
    if (parts.length >= 2) {
      const day = parts[0];
      const monthMap: Record<string, string> = {
        Januari: "JAN",
        Februari: "FEB",
        Maret: "MAR",
        April: "APR",
        Mei: "MEI",
        Juni: "JUN",
        Juli: "JUL",
        Agustus: "AGU",
        September: "SEP",
        Oktober: "OKT",
        November: "NOV",
        Desember: "DES",
      };
      const month = monthMap[parts[1]] || parts[1].substring(0, 3).toUpperCase();
      return { day, month };
    }
    return { day: "28", month: "OKT" };
  };

  const displayEvents = events.slice(0, 6);

  return (
    <section id="agenda" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 border-t border-[#E5E1DA]" aria-label="Agenda Seminar dan Kegiatan Akademik">
      {/* Yale Law School Signature Header with Top Dotted Matrix Pattern */}
      <div className="flex items-center justify-between pb-6 mb-10 border-b border-[#E5E1DA]">
        <div className="relative">
          {/* Rectangular Dotted Matrix motif floating directly above/behind the word */}
          <div className="w-16 h-4 dotted-matrix-bg opacity-70 mb-1" aria-hidden="true" />
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1B] font-normal tracking-tight">
            Agenda &amp; Seminar
          </h2>
        </div>

        {/* Right Action Link (Direct match to "All Events ->" in Yale screenshot) */}
        <Link
          href="/agenda"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#800000] hover:text-[#570000] group transition-colors"
        >
          <span>Semua Agenda</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
        </Link>
      </div>

      {/* Yale 3-Column x 2-Row Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {displayEvents.map((evt, idx) => {
          const { day, month } = parseEventDate(evt.eventDate);
          return (
            <motion.article
              key={evt.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setSelectedEvent(evt);
                setRegistered(false);
              }}
              className="flex items-start gap-4 group cursor-pointer"
            >
              {/* Distinctive Yale Calendar Date Block */}
              <div className="shrink-0 text-center w-14 pt-0.5">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-[#5C5854]">
                  {month}
                </span>
                <span className="block font-serif text-3xl sm:text-4xl font-normal text-[#800000] leading-none mt-1 group-hover:scale-105 transition-transform">
                  {day}
                </span>
              </div>

              {/* Event Content on the Right */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-sm sm:text-base font-normal text-[#1C1B1B] group-hover:text-[#800000] transition-colors leading-snug line-clamp-2 mb-1.5">
                  {evt.title}
                </h3>
                <p className="text-[11px] text-[#5C5854] line-clamp-1 mb-1 font-light">
                  {evt.time} &bull; {evt.location}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                  {evt.badge}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Event Registration & Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white max-w-lg w-full border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto z-10"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 p-2 text-[#5C5854] hover:text-[#1C1B1B] hover:bg-[#F8F7F4] cursor-pointer"
                aria-label="Tutup rincian kegiatan"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[11px] uppercase tracking-widest text-[#800000] font-bold block mb-2">
                {selectedEvent.badge} &bull; {selectedEvent.eventDate}
              </span>

              <h3 className="font-serif text-xl sm:text-2xl text-[#1C1B1B] font-normal mb-4 leading-snug">
                {selectedEvent.title}
              </h3>

              <div className="space-y-2 mb-6 p-4 bg-[#F8F7F4] border border-[#E5E1DA] text-xs text-[#5C5854]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#800000] shrink-0" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#800000] shrink-0" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#800000] shrink-0" />
                  <span>Narasumber: <strong className="text-[#1C1B1B]">{selectedEvent.speaker}</strong></span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed mb-6 font-light">
                {selectedEvent.description}
              </p>

              {registered ? (
                <div className="p-4 bg-[#F8F7F4] border border-[#800000] text-center mb-4">
                  <CheckCircle className="w-6 h-6 text-[#800000] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#1C1B1B]">Konfirmasi Kehadiran Berhasil</p>
                  <p className="text-[11px] text-[#5C5854] font-light">
                    Akses ruangan &amp; tautan Zoom telah disiapkan untuk agenda ini.
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => setRegistered(true)}
                  className="w-full py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000] transition-colors cursor-pointer"
                >
                  Konfirmasi Kehadiran (Gratis)
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
