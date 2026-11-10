"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ExternalLink,
  ArrowRight,
  UserCheck,
  GraduationCap,
  Building2,
  Users,
} from "lucide-react";
import { FacultyItem } from "@/data/initialData";
import { createFacultySlug } from "@/lib/dataService";
import { PageHeader } from "@/components/layout/PageHeader";

interface DosenListingClientProps {
  initialFaculty: FacultyItem[];
  kicker?: string;
  title?: string;
  description?: string;
  fieldFilter?: string;
}

type CategoryTab = "all" | "dosen" | "staf";

function DosenListingInner({
  initialFaculty,
  kicker = "DIREKTORI SIVITAS AKADEMIKA",
  title = "Dosen & Staf Fakultas Hukum",
  description = "Direktori resmi Dewan Guru Besar, Dosen Pengajar, serta Staf Administrasi dan Tenaga Kependidikan di Fakultas Hukum Universitas Pelita Bangsa.",
  fieldFilter,
}: DosenListingClientProps) {
  const searchParams = useSearchParams();
  const urlKategori = searchParams.get("kategori");

  const [prevUrlKategori, setPrevUrlKategori] = useState(urlKategori);
  const [manualCategory, setManualCategory] = useState<CategoryTab | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  if (prevUrlKategori !== urlKategori) {
    setPrevUrlKategori(urlKategori);
    setManualCategory(null);
  }

  // Derive active category: manual click overrides URL param, URL param defaults to "all"
  const activeCategory: CategoryTab = useMemo(() => {
    if (manualCategory) return manualCategory;
    if (urlKategori === "dosen") return "dosen";
    if (urlKategori === "staf" || urlKategori === "staff") return "staf";
    return "all";
  }, [manualCategory, urlKategori]);

  const getItemCategory = (f: FacultyItem): "dosen" | "staf" => {
    if (f.category) return f.category;
    const lowerTitle = f.titles.toLowerCase();
    if (
      lowerTitle.includes("staf") ||
      lowerTitle.includes("staff") ||
      lowerTitle.includes("sekretariat") ||
      lowerTitle.includes("administrasi")
    ) {
      return "staf";
    }
    return "dosen";
  };

  const counts = useMemo(() => {
    let dosen = 0;
    let staf = 0;
    for (const f of initialFaculty) {
      if (getItemCategory(f) === "staf") staf++;
      else dosen++;
    }
    return { all: initialFaculty.length, dosen, staf };
  }, [initialFaculty]);

  const filteredFaculty = useMemo(() => {
    return initialFaculty.filter((f) => {
      const itemCat = getItemCategory(f);

      // 1. Filter by Dosen / Staf category
      if (activeCategory === "dosen" && itemCat !== "dosen") {
        return false;
      }
      if (activeCategory === "staf" && itemCat !== "staf") {
        return false;
      }

      // 2. Filter by specialization field if route is /dosen/bidang/[slug]
      if (fieldFilter) {
        const spec = f.specialization.toLowerCase();
        if (fieldFilter === "hukum-bisnis-korporasi") {
          const match =
            spec.includes("bisnis") ||
            spec.includes("korporasi") ||
            spec.includes("kontrak") ||
            spec.includes("perdata");
          if (!match) return false;
        } else if (fieldFilter === "hukum-tata-negara") {
          const match =
            spec.includes("tata negara") ||
            spec.includes("konstitusi") ||
            spec.includes("administrasi");
          if (!match) return false;
        }
      }

      // 3. Filter by search query (name, titles, specialization)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = f.name.toLowerCase().includes(q);
        const matchSpec = f.specialization.toLowerCase().includes(q);
        const matchTitles = f.titles.toLowerCase().includes(q);
        return matchName || matchSpec || matchTitles;
      }

      return true;
    });
  }, [initialFaculty, activeCategory, fieldFilter, searchQuery]);

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
        {/* Search & Category Switcher Toolbar */}
        <div className="mb-10 bg-white border border-[#E2D9C8] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="w-4 h-4 text-[#710912] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama dosen, staf, jabatan, atau bidang keahlian..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E2D9C8] rounded-xl text-xs sm:text-sm text-[#0D0D0D] focus:outline-none focus:border-[#710912] transition-colors font-light"
              />
            </div>

            {/* Right: Segmented Placement for Dosen di Hukum & Staff di Hukum */}
            <div
              role="tablist"
              aria-label="Filter Kategori Sivitas Fakultas Hukum"
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] self-start lg:self-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === "all"}
                onClick={() => setManualCategory("all")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-[#710912] text-white shadow-xs"
                    : "text-[#544942] hover:text-[#710912] hover:bg-white"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Semua ({counts.all})</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === "dosen"}
                onClick={() => setManualCategory("dosen")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === "dosen"
                    ? "bg-[#710912] text-white shadow-xs"
                    : "text-[#544942] hover:text-[#710912] hover:bg-white"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Dosen Hukum ({counts.dosen})</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === "staf"}
                onClick={() => setManualCategory("staf")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === "staf"
                    ? "bg-[#710912] text-white shadow-xs"
                    : "text-[#544942] hover:text-[#710912] hover:bg-white"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Staf Hukum ({counts.staf})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Faculty & Staff Grid or Empty State */}
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredFaculty.map((f, idx) => {
              const facultySlug = createFacultySlug(f.name, f.titles);
              const itemCat = getItemCategory(f);
              const hasName = Boolean(f.name && f.name.trim().length > 0);
              const displayHeading = hasName ? f.name : f.titles;
              const displaySub = hasName
                ? f.titles
                : "Fakultas Hukum Universitas Pelita Bangsa";
              const isLeadership =
                f.titles.includes("Dekan") ||
                f.titles.includes("Ketua Program Studi");
              const badgeLabel = isLeadership
                ? "JAJARAN PIMPINAN FAKULTAS"
                : f.titles.includes("Guru Besar")
                ? "DEWAN GURU BESAR"
                : itemCat === "staf"
                ? "STAF & TENAGA KEPENDIDIKAN"
                : "DOSEN FAKULTAS HUKUM";

              return (
                <motion.article
                  key={f.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  transition={{
                    duration: 0.4,
                    delay: (idx % 2) * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white border border-[#E2D9C8] rounded-2xl overflow-hidden shadow-xs hover:border-[#710912]/40 hover:shadow-[0_12px_28px_rgba(113,9,18,0.07)] transition-all flex flex-col justify-between"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <div className="relative w-24 h-28 sm:w-28 sm:h-36 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E2D9C8] shrink-0">
                        <Image
                          src={f.profileImage || "/images/jajaran/dekan.jpg"}
                          alt={displayHeading}
                          fill
                          sizes="(max-width: 640px) 100px, 120px"
                          className="object-cover object-top"
                        />
                      </div>

                      <div className="flex-1">
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E2D9C8] text-[#710912] mb-2">
                          {itemCat === "staf" ? (
                            <Building2 className="w-3 h-3" />
                          ) : (
                            <GraduationCap className="w-3 h-3" />
                          )}
                          <span>{badgeLabel}</span>
                        </span>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#0D0D0D] mb-1 leading-snug">
                          {displayHeading}
                        </h2>
                        <p className="text-xs font-medium text-[#710912] mb-3">
                          {displaySub}
                        </p>
                        <div className="text-xs text-[#544942] leading-relaxed font-light mb-3">
                          <strong className="font-semibold text-[#0D0D0D]">
                            {itemCat === "staf"
                              ? "Bidang Layanan: "
                              : "Bidang & Tugas: "}
                          </strong>
                          {f.specialization}
                        </div>
                      </div>
                    </div>

                    {f.bioQuote && (
                      <blockquote className="mt-4 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs text-[#544942] italic font-light">
                        &ldquo;{f.bioQuote}&rdquo;
                      </blockquote>
                    )}
                  </div>

                  <div className="px-6 sm:px-8 py-4 bg-[#FAF7F2] border-t border-[#E2D9C8] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <Link
                      href={`/dosen/${facultySlug}`}
                      className="inline-flex items-center gap-1 font-semibold text-[#710912] hover:text-[#48060B] transition-colors"
                    >
                      <span>Lihat Profil Lengkap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {f.researchLink && (
                      <a
                        href={f.researchLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#544942] hover:text-[#0D0D0D] transition-colors"
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
          <div className="p-10 rounded-2xl bg-white border border-dashed border-[#E2D9C8] text-center max-w-xl mx-auto">
            <UserCheck className="w-10 h-10 text-[#710912] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#0D0D0D] mb-2">
              Data Tidak Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-[#544942] font-light mb-6">
              Tidak ada data dosen atau staf yang cocok dengan kata kunci atau
              filter yang Anda pilih.
            </p>
            <button
              type="button"
              onClick={() => {
                setManualCategory("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#710912] text-white text-xs font-semibold hover:bg-[#48060B] transition-colors cursor-pointer"
            >
              <span>Tampilkan Semua Sivitas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function DosenListingClient(props: DosenListingClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <DosenListingInner {...props} />
    </Suspense>
  );
}
