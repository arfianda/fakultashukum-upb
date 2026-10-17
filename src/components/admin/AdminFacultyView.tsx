"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Users,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";
import { FacultyItem } from "@/data/initialData";

interface AdminFacultyViewProps {
  faculty: FacultyItem[];
  onToggleFacultyStatus: (id: number) => void;
  onOpenCreateModal: () => void;
}

export function AdminFacultyView({
  faculty,
  onToggleFacultyStatus,
  onOpenCreateModal,
}: AdminFacultyViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  const filteredFaculty = faculty.filter((f) => {
    const matchesFilter =
      filterActive === "ALL" ||
      (filterActive === "ACTIVE" && f.isActive) ||
      (filterActive === "INACTIVE" && !f.isActive);
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.nip.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const activeCount = faculty.filter((f) => f.isActive).length;

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#73655D] mb-1">
            <Users className="w-4 h-4 text-[#710912]" />
            <span>Total Dewan Pengajar</span>
          </div>
          <div className="font-serif text-3xl font-bold text-[#0D0D0D]">{faculty.length}</div>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#73655D] mb-1">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Aktif Mengajar</span>
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-700">{activeCount}</div>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#73655D] mb-1">
            <Award className="w-4 h-4 text-[#C28D39]" />
            <span>Guru Besar (Prof.)</span>
          </div>
          <div className="font-serif text-3xl font-bold text-[#0D0D0D]">
            {faculty.filter((f) => f.name.includes("Prof.")).length}
          </div>
        </div>
      </div>

      {/* Filter and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-[#FAF7F2] rounded-full border border-[#E2D9C8] overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilterActive("ALL")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterActive === "ALL"
                ? "bg-white text-[#0D0D0D] shadow-xs"
                : "text-[#73655D] hover:text-[#0D0D0D]"
            }`}
          >
            Semua ({faculty.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterActive("ACTIVE")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterActive === "ACTIVE"
                ? "bg-white text-[#0D0D0D] shadow-xs"
                : "text-[#73655D] hover:text-[#0D0D0D]"
            }`}
          >
            Aktif ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterActive("INACTIVE")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterActive === "INACTIVE"
                ? "bg-white text-[#0D0D0D] shadow-xs"
                : "text-[#73655D] hover:text-[#0D0D0D]"
            }`}
          >
            Non-Aktif ({faculty.length - activeCount})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9C8F85]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, NIP, keahlian..."
              className="pl-8 pr-3 py-1.5 bg-white border border-[#E2D9C8] rounded-full text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none w-52 sm:w-60"
            />
          </div>

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0D0D0D] hover:bg-[#710912] text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Daftarkan Dosen</span>
          </button>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFaculty.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#C28D39]/40 bg-[#710912] shrink-0">
                    <Image
                      src={item.profileImage || "/images/prof-hendra.jpg"}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#0D0D0D]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#710912] font-medium">{item.titles}</p>
                    <p className="text-[11px] font-mono text-[#73655D] mt-0.5">
                      NIP: {item.nip}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.isActive ? "Aktif" : "Cuti"}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs text-[#544942] mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#73655D] mb-1">
                  Keahlian Keilmuan
                </div>
                <div>{item.specialization}</div>
              </div>

              {item.bioQuote && (
                <p className="text-xs italic text-[#73655D] line-clamp-2 mb-4">
                  &ldquo;{item.bioQuote}&rdquo;
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#FAF7F2] flex items-center justify-between">
              <span className="text-[11px] text-[#9C8F85]">
                Status Keaktifan Perkuliahan
              </span>
              <button
                type="button"
                onClick={() => onToggleFacultyStatus(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  item.isActive
                    ? "bg-[#EFE5D2] text-[#710912] hover:bg-[#F2E8D0]"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                }`}
              >
                {item.isActive ? "Nonaktifkan" : "Aktifkan"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
