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
  Landmark,
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

type CategoryTab = "all" | "struktural" | "dosen" | "staf";

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
    if (urlKategori === "struktural") return "struktural";
    if (urlKategori === "dosen") return "dosen";
    if (urlKategori === "staf" || urlKategori === "staff" || urlKategori === "admin") {
      return "staf";
    }
    return "all";
  }, [manualCategory, urlKategori]);

  const getItemCategory = (f: FacultyItem): "struktural" | "dosen" | "staf" => {
    if (f.category) return f.category;
    const lowerTitle = f.titles.toLowerCase();
    if (
      lowerTitle.includes("dekan") ||
      lowerTitle.includes("kaprodi") ||
      lowerTitle.includes("ketua program studi")
    ) {
      return "struktural";
    }
    if (
      lowerTitle.includes("staf") ||
      lowerTitle.includes("staff") ||
      lowerTitle.includes("sekretariat") ||
      lowerTitle.includes("administrasi") ||
      lowerTitle.includes("tenaga kependidikan")
    ) {
      return "staf";
    }
    return "dosen";
  };

  const counts = useMemo(() => {
    let struktural = 0;
    let dosen = 0;
    let staf = 0;
    for (const f of initialFaculty) {
      const cat = getItemCategory(f);
      if (cat === "struktural") struktural++;
      else if (cat === "staf") staf++;
      else dosen++;
    }
    return { all: initialFaculty.length, struktural, dosen, staf };
  }, [initialFaculty]);

  const filteredFaculty = useMemo(() => {
    return initialFaculty.filter((f) => {
      const itemCat = getItemCategory(f);

      // 1. Filter by Struktural / Dosen / Staf category
      if (activeCategory !== "all" && itemCat !== activeCategory) {
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

  const headerMeta = useMemo(() => {
    if (fieldFilter) {
      return { kicker, title, description };
    }
    switch (activeCategory) {
      case "struktural":
        return {
          kicker: "STRUKTURAL FAKULTAS",
          title: "Struktural Hukum",
          description:
            "Pimpinan Fakultas, Dekanat, dan Ketua Program Studi Ilmu Hukum Universitas Pelita Bangsa.",
        };
      case "dosen":
        return {
          kicker: "TENAGA PENGAJAR",
          title: "Dosen Fakultas Hukum",
          description:
            "Dewan Guru Besar, dosen tetap, dan pengajar akademik Ilmu Hukum Universitas Pelita Bangsa.",
        };
      case "staf":
        return {
          kicker: "TENAGA KEPENDIDIKAN",
          title: "Staf & Admin Fakultas",
          description:
            "Sekretariat dekanat, admin fakultas, tata usaha, dan tenaga kependidikan Fakultas Hukum.",
        };
      default:
        return {
          kicker,
          title: "Direktori Sivitas Fakultas Hukum",
          description:
            "Pimpinan struktural, dosen tetap, serta staf administrasi dan tenaga kependidikan Fakultas Hukum Universitas Pelita Bangsa.",
        };
    }
  }, [activeCategory, fieldFilter, kicker, title, description]);

  return (
    <div>
      <PageHeader
        kicker={headerMeta.kicker}
        title={headerMeta.title}
        description={headerMeta.description}
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
                aria-selected={activeCategory === "struktural"}
                onClick={() => setManualCategory("struktural")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === "struktural"
                    ? "bg-[#710912] text-white shadow-xs"
                    : "text-[#544942] hover:text-[#710912] hover:bg-white"
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Struktural Hukum ({counts.struktural})</span>
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
                <span>Staf &amp; Admin ({counts.staf})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Faculty & Staff Grid or Empty State */}
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((f, idx) => {
              const facultySlug = createFacultySlug(f.name, f.titles);
              const itemCat = getItemCategory(f);
              const hasName = Boolean(f.name && f.name.trim().length > 0);
              const displayHeading = hasName ? f.name : f.titles;
              const displaySub = hasName
                ? f.titles
                : "Fakultas Hukum Universitas Pelita Bangsa";
              const badgeLabel =
                itemCat === "struktural"
                  ? "STRUKTURAL FAKULTAS"
                  : f.titles.includes("Guru Besar")
                  ? "DEWAN GURU BESAR"
                  : itemCat === "staf"
                  ? "STAF & ADMIN FAKULTAS"
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
                    delay: (idx % 3) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white border border-[#E2D9C8] rounded-2xl overflow-hidden shadow-xs hover:border-[#710912]/40 hover:shadow-[0_12px_28px_rgba(113,9,18,0.07)] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] bg-[#FAF7F2] border-b border-[#E2D9C8] overflow-hidden">
                      <Image
                        src={f.profileImage || "/images/jajaran/dekan-fh.jpg"}
                        alt={displayHeading}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6">
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E2D9C8] text-[#710912] mb-2.5">
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
                      <p className="text-xs font-medium text-[#710912]">
                        {displaySub}
                      </p>

                      {f.bioQuote && (
                        <blockquote className="mt-4 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs text-[#544942] italic font-light">
                          &ldquo;{f.bioQuote}&rdquo;
                        </blockquote>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E2D9C8] flex flex-wrap items-center justify-between gap-3 text-xs">
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
              {activeCategory === "staf" && !searchQuery.trim()
                ? "Belum Ada Data Staf Hukum"
                : "Data Tidak Ditemukan"}
            </h3>
            <p className="text-xs sm:text-sm text-[#544942] font-light mb-6">
              {activeCategory === "staf" && !searchQuery.trim()
                ? "Data staf dan tenaga kependidikan Fakultas Hukum sedang dalam proses pembaruan."
                : "Tidak ada data dosen atau staf yang cocok dengan kata kunci atau filter yang Anda pilih."}
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
