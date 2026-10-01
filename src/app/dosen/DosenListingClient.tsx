"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ExternalLink, ArrowRight, UserCheck } from "lucide-react";
import { FacultyItem } from "@/data/initialData";
import { createFacultySlug } from "@/lib/dataService";
import { PageHeader } from "@/components/layout/PageHeader";

interface DosenListingClientProps {
  initialFaculty: FacultyItem[];
  kicker?: string;
  title?: string;
  description?: string;
  fieldFilter?: string; // e.g. "hukum-bisnis-korporasi" or "hukum-tata-negara"
}

export function DosenListingClient({
  initialFaculty,
  kicker = "DIREKTORI PENGAJAR",
  title = "Tenaga Pengajar & Dewan Guru Besar",
  description = "Belajar langsung dari Guru Besar, pakar doktrinal, dan praktisi peradilan berpengalaman di Fakultas Hukum Universitas Pelita Bangsa.",
  fieldFilter,
}: DosenListingClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaculty = useMemo(() => {
    return initialFaculty.filter((f) => {
      // 1. Filter by field if specified
      if (fieldFilter) {
        const spec = f.specialization.toLowerCase();
        if (fieldFilter === "hukum-bisnis-korporasi") {
          const match = spec.includes("bisnis") || spec.includes("korporasi") || spec.includes("kontrak") || spec.includes("perdata");
          if (!match) return false;
        } else if (fieldFilter === "hukum-tata-negara") {
          const match = spec.includes("tata negara") || spec.includes("konstitusi") || spec.includes("administrasi");
          if (!match) return false;
        }
      }

      // 2. Filter by search query (name and specialization only; NEVER NIP)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = f.name.toLowerCase().includes(q);
        const matchSpec = f.specialization.toLowerCase().includes(q);
        const matchTitles = f.titles.toLowerCase().includes(q);
        return matchName || matchSpec || matchTitles;
      }

      return true;
    });
  }, [initialFaculty, fieldFilter, searchQuery]);

  return (
    <div>
      <PageHeader
        kicker={kicker}
        title={title}
        description={description}
        breadcrumbs={[
          { label: "Tenaga Pengajar", href: fieldFilter ? "/dosen" : undefined },
          ...(fieldFilter ? [{ label: title }] : []),
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Search & Filter Toolbar */}
        <div className="mb-10 bg-white border border-[#E5E1DA] rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#800000] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama dosen atau bidang keahlian..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F7F4] border border-[#E5E1DA] rounded-xl text-xs sm:text-sm text-[#1C1B1B] focus:outline-none focus:border-[#800000] transition-colors font-light"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto text-xs">
              <Link
                href="/dosen"
                className={`px-3 py-1.5 rounded-full border transition-colors ${
                  !fieldFilter
                    ? "bg-[#800000] text-white border-[#800000] font-semibold"
                    : "bg-[#F8F7F4] text-[#5C5854] border-[#E5E1DA] hover:text-[#800000]"
                }`}
              >
                Semua Dosen
              </Link>
              <Link
                href="/dosen/bidang/hukum-bisnis-korporasi"
                className={`px-3 py-1.5 rounded-full border transition-colors ${
                  fieldFilter === "hukum-bisnis-korporasi"
                    ? "bg-[#800000] text-white border-[#800000] font-semibold"
                    : "bg-[#F8F7F4] text-[#5C5854] border-[#E5E1DA] hover:text-[#800000]"
                }`}
              >
                Pakar Hukum Bisnis
              </Link>
              <Link
                href="/dosen/bidang/hukum-tata-negara"
                className={`px-3 py-1.5 rounded-full border transition-colors ${
                  fieldFilter === "hukum-tata-negara"
                    ? "bg-[#800000] text-white border-[#800000] font-semibold"
                    : "bg-[#F8F7F4] text-[#5C5854] border-[#E5E1DA] hover:text-[#800000]"
                }`}
              >
                Pakar Tata Negara
              </Link>
            </div>
          </div>
        </div>

        {/* Faculty Grid or Empty State */}
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredFaculty.map((f, idx) => {
              const facultySlug = createFacultySlug(f.name);

              return (
                <motion.article
                  key={f.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.4, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-[#E5E1DA] rounded-2xl overflow-hidden shadow-xs hover:border-[#800000]/40 transition-all flex flex-col justify-between"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <div className="relative w-24 h-28 sm:w-28 sm:h-36 rounded-xl overflow-hidden bg-[#F8F7F4] border border-[#E5E1DA] shrink-0">
                        <Image
                          src={f.profileImage || "/images/prof-hendra.jpg"}
                          alt={f.name}
                          fill
                          sizes="(max-width: 640px) 100px, 120px"
                          className="object-cover object-top"
                        />
                      </div>

                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#800000] block mb-1">
                          {f.titles.includes("Guru Besar") ? "DEWAN GURU BESAR" : "TENAGA PENGAJAR"}
                        </span>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1B1B] mb-1 leading-snug">
                          {f.name}
                        </h2>
                        <p className="text-xs font-medium text-[#800000] mb-3">
                          {f.titles}
                        </p>
                        <div className="text-xs text-[#5C5854] leading-relaxed font-light mb-3">
                          <strong className="font-semibold text-[#1C1B1B]">Keahlian: </strong>
                          {f.specialization}
                        </div>
                      </div>
                    </div>

                    {f.bioQuote && (
                      <blockquote className="mt-4 p-3.5 rounded-xl bg-[#F8F7F4] border-l-2 border-[#C5A059] text-xs text-[#5C5854] italic font-light">
                        &ldquo;{f.bioQuote}&rdquo;
                      </blockquote>
                    )}
                  </div>

                  <div className="px-6 sm:px-8 py-4 bg-[#F8F7F4] border-t border-[#E5E1DA] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <Link
                      href={`/dosen/${facultySlug}`}
                      className="inline-flex items-center gap-1 font-semibold text-[#800000] hover:text-[#570000] transition-colors"
                    >
                      <span>Lihat Profil Lengkap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {f.researchLink && (
                      <a
                        href={f.researchLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#5C5854] hover:text-[#1C1B1B] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Profil Riset SINTA</span>
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="p-10 rounded-2xl bg-white border border-dashed border-[#E5E1DA] text-center max-w-xl mx-auto">
            <UserCheck className="w-10 h-10 text-[#800000] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-2">
              Daftar Pakar Akan Segera Diperbarui
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5854] font-light mb-6">
              Saat ini belum ada data pengajar yang tercatat untuk kriteria pencarian ini. Tim sekretariat sedang memverifikasi pembaruan data dosen.
            </p>
            <Link
              href="/dosen"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#800000] text-white text-xs font-semibold hover:bg-[#570000] transition-colors"
            >
              <span>Tampilkan Semua Dosen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
