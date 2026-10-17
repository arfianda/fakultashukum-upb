"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  FileText,
  Calendar,
  Users,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { PostItem, EventItem, FacultyItem } from "@/data/initialData";
import { AdminViewType } from "./AdminSidebar";

interface AdminSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PostItem[];
  events: EventItem[];
  faculty: FacultyItem[];
  onNavigateToView: (view: AdminViewType) => void;
}

export function AdminSearchModal({
  isOpen,
  onClose,
  posts,
  events,
  faculty,
  onNavigateToView,
}: AdminSearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.speaker.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredFaculty = faculty.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.specialization.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const hasResults =
    filteredPosts.length > 0 ||
    filteredEvents.length > 0 ||
    filteredFaculty.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_24px_60px_rgba(28,27,27,0.22)] overflow-hidden z-10 animate-dropdown">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F2EFE9]">
          <Search className="w-5 h-5 text-[#800000]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik untuk mencari artikel, agenda, atau dosen..."
            className="w-full text-sm text-[#1C1B1B] placeholder-[#A39E97] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-xs text-[#A39E97] hover:text-[#1C1B1B] px-2 py-1 rounded-md bg-[#F8F7F4] border border-[#E5E1DA]"
          >
            ESC
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {/* Quick Navigation suggestions when query is empty */}
          {!query && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#A39E97] px-2 mb-2">
                Pintasan Cepat
              </div>
              <button
                onClick={() => {
                  onNavigateToView("overview");
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F8F7F4] text-xs font-semibold text-[#1C1B1B] text-left transition-colors"
              >
                <span>Buka Dashboard Utama</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A39E97]" />
              </button>
              <button
                onClick={() => {
                  onNavigateToView("articles");
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F8F7F4] text-xs font-semibold text-[#1C1B1B] text-left transition-colors"
              >
                <span>Kelola Publikasi &amp; Naskah Riset</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A39E97]" />
              </button>
              <button
                onClick={() => {
                  onNavigateToView("agenda");
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F8F7F4] text-xs font-semibold text-[#1C1B1B] text-left transition-colors"
              >
                <span>Kalender Kuliah Tamu &amp; Sidang Semu</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A39E97]" />
              </button>
            </div>
          )}

          {/* Articles result */}
          {query && filteredPosts.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#800000] px-2 mb-2 flex items-center gap-1.5">
                <FileText className="w-3 h-3" />
                <span>Naskah Artikel ({filteredPosts.length})</span>
              </div>
              <div className="space-y-1">
                {filteredPosts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigateToView("articles");
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F8F7F4] text-left transition-colors group"
                  >
                    <div>
                      <div className="font-serif font-bold text-xs text-[#1C1B1B] group-hover:text-[#800000] transition-colors">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-[#7A756F]">
                        {p.category} &bull; {p.publishedAt}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A39E97] group-hover:text-[#800000] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Events result */}
          {query && filteredEvents.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#800000] px-2 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>Agenda Akademik ({filteredEvents.length})</span>
              </div>
              <div className="space-y-1">
                {filteredEvents.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => {
                      onNavigateToView("agenda");
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F8F7F4] text-left transition-colors group"
                  >
                    <div>
                      <div className="font-serif font-bold text-xs text-[#1C1B1B] group-hover:text-[#800000] transition-colors">
                        {e.title}
                      </div>
                      <div className="text-[11px] text-[#7A756F]">
                        {e.eventDate} &bull; {e.speaker}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A39E97] group-hover:text-[#800000] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Faculty result */}
          {query && filteredFaculty.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#800000] px-2 mb-2 flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                <span>Dewan Dosen ({filteredFaculty.length})</span>
              </div>
              <div className="space-y-1">
                {filteredFaculty.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onNavigateToView("faculty");
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F8F7F4] text-left transition-colors group"
                  >
                    <div>
                      <div className="font-serif font-bold text-xs text-[#1C1B1B] group-hover:text-[#800000] transition-colors">
                        {f.name}
                      </div>
                      <div className="text-[11px] text-[#7A756F]">
                        {f.titles} &bull; NIP: {f.nip}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A39E97] group-hover:text-[#800000] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="text-center py-8 text-xs text-[#7A756F]">
              Tidak ditemukan data yang cocok dengan &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
