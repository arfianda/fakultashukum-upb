"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Search,
  X,
  Menu,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Briefcase,
  Building2,
  Newspaper,
} from "lucide-react";
import { AudiencePortalModal, AudienceType } from "@/components/AudiencePortalModal";

export function Navbar({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [audienceModalOpen, setAudienceModalOpen] = useState(false);
  const [audienceTab, setAudienceTab] = useState<AudienceType>("mahasiswa");
  const [expandedMobileAccordion, setExpandedMobileAccordion] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenAudience = (tab: AudienceType) => {
    setAudienceTab(tab);
    setAudienceModalOpen(true);
    handleCloseMenuImmediate();
    setMobileMenuOpen(false);
  };

  const clearTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleOpenMenu = (key: string) => {
    clearTimer();
    setActiveMenu(key);
  };

  const handleCloseMenuImmediate = useCallback(() => {
    clearTimer();
    setActiveMenu(null);
  }, [clearTimer]);

  const handleScheduleClose = () => {
    clearTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 220);
  };

  // Close menus on Escape key (R-32 accessibility), outside click, or scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
        handleCloseMenuImmediate();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        handleCloseMenuImmediate();
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      if (activeMenu) {
        handleCloseMenuImmediate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check via rAF to avoid cascading renders
    const rId = requestAnimationFrame(() => {
      if (window.location.hash === "#test-scrolled") {
        setIsScrolled(true);
      } else {
        setIsScrolled(window.scrollY > 24);
      }
      if (window.location.hash === "#test-dropdown-audience") {
        setActiveMenu("audience");
      } else if (window.location.hash === "#test-dropdown-more") {
        setActiveMenu("more");
      } else if (window.location.hash === "#test-dropdown-study") {
        setActiveMenu("study");
      } else if (window.location.hash === "#test-mobile-drawer") {
        setMobileMenuOpen(true);
      }
    });

    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      clearTimer();
    };
  }, [searchOpen, mobileMenuOpen, activeMenu, handleCloseMenuImmediate, clearTimer]);

  const audienceList: {
    key: AudienceType;
    label: string;
    description: string;
    icon: typeof GraduationCap;
  }[] = [
    {
      key: "mahasiswa",
      label: "Mahasiswa",
      description: "Portal akademik, KRS & peradilan semu",
      icon: GraduationCap,
    },
    {
      key: "dosen",
      label: "Dosen",
      description: "Beban kerja & publikasi riset SINTA",
      icon: BookOpen,
    },
    {
      key: "staf",
      label: "Staf",
      description: "Layanan administrasi & persuratan",
      icon: Building2,
    },
    {
      key: "alumni",
      label: "Alumni",
      description: "Tracer study & ikatan alumni",
      icon: Briefcase,
    },
  ];

  const primaryNavItems = [
    { key: "study", label: "Program Studi Hukum", href: "#akademik" },
    { key: "admissions", label: "Penerimaan Mahasiswa & Bantuan Biaya", href: "#pendaftaran" },
    { key: "faculty", label: "Tenaga Pengajar", href: "#fakultas" },
    { key: "studentlife", label: "Kehidupan Mahasiswa", href: "#kehidupan-mahasiswa" },
  ];

  const moreNavItems = [
    {
      key: "centers",
      label: "Pusat Studi & Lokakarya",
      href: "#fasilitas",
      desc: "Laboratorium hukum, moot court, dan KBH",
      icon: Building2,
    },
    {
      key: "news",
      label: "Berita & Kegiatan",
      href: "#berita",
      desc: "Warta kampus, putusan MK, dan agenda",
      icon: Newspaper,
    },
  ];

  const allNavItems = [
    ...primaryNavItems,
    ...moreNavItems.map((m) => ({ key: m.key, label: m.label, href: m.href })),
  ];

  const megaMenuData: Record<
    string,
    {
      featured: {
        image: string;
        title: string;
        desc: string;
        linkText: string;
        href: string;
        isAction?: boolean;
      };
      columns: {
        heading: string;
        links: { label: string; href: string; external?: boolean; isAction?: boolean }[];
      }[];
    }
  > = {
    study: {
      featured: {
        image: "/images/hero-library.jpg",
        title: "Bidang Peminatan",
        desc: "Temukan peminatan keahlian doktrin dan kemahiran litigasi",
        linkText: "AKADEMIK",
        href: "#akademik",
      },
      columns: [
        {
          heading: "STUDI DI FH UPB",
          links: [
            { label: "Program Sarjana Hukum (S.H.)", href: "#akademik" },
            { label: "Bidang Peminatan & Konsentrasi", href: "#konsentrasi" },
            { label: "Kurikulum & Silabus Perkuliahan", href: "#akademik" },
            { label: "Pembelajaran Klinis & Praktik Peradilan", href: "#fasilitas" },
          ],
        },
        {
          heading: "PROGRAM & SUMBER DAYA",
          links: [
            { label: "Kalender Akademik & Agenda", href: "#agenda" },
            { label: "Profil Mahasiswa & Ikatan Alumni", href: "#alumni" },
            { label: "Workshop Perancangan Kontrak & Litigasi", href: "#agenda" },
          ],
        },
        {
          heading: "PERPUSTAKAAN & RISET",
          links: [
            { label: "Perpustakaan Hukum UPB", href: "#fasilitas" },
            { label: "Pelita Law Review (SINTA 2)", href: "https://journal.pelitabangsa.ac.id", external: true },
            { label: "Repositori Putusan MK & MA", href: "#berita" },
            { label: "Koleksi Yurisprudensi Nasional", href: "#berita" },
          ],
        },
      ],
    },
    admissions: {
      featured: {
        image: "/images/moot-court.jpg",
        title: "Penerimaan & Bantuan Biaya",
        desc: "Investasi pendidikan hukum berintegritas tanpa pungli",
        linkText: "DAFTAR SEKARANG",
        href: "#pendaftaran",
        isAction: true,
      },
      columns: [
        {
          heading: "JALUR PENERIMAAN",
          links: [
            { label: "Sarjana Hukum (S.H.) Reguler Pagi", href: "#pendaftaran" },
            { label: "Sarjana Hukum Kelas Karyawan", href: "#pendaftaran" },
            { label: "Pendidikan Profesi Advokat (PKPA)", href: "#pendaftaran" },
          ],
        },
        {
          heading: "TRANSPARANSI BIAYA",
          links: [
            { label: "Skema Angsuran SPP Bulanan", href: "#pendaftaran" },
            { label: "Bebas Biaya Gedung (Rp 0)", href: "#pendaftaran" },
            { label: "Formulir Pendaftaran Mahasiswa Baru", href: "#pendaftaran", isAction: true },
          ],
        },
        {
          heading: "BEASISWA UNGGULAN",
          links: [
            { label: "Beasiswa Prestasi Akademik", href: "#pendaftaran" },
            { label: "Beasiswa Tahfiz Al-Qur'an 10+ Juz", href: "#pendaftaran" },
            { label: "Beasiswa Kemitraan Korporasi", href: "#pendaftaran" },
          ],
        },
      ],
    },
    faculty: {
      featured: {
        image: "/images/prof-hendra.jpg",
        title: "Tenaga Pengajar",
        desc: "Guru Besar, saksi ahli, dan akademisi terkemuka",
        linkText: "DIREKTORI DOSEN",
        href: "#fakultas",
      },
      columns: [
        {
          heading: "DEWAN GURU BESAR",
          links: [
            { label: "Prof. Dr. Lorem Ipsum, S.H., LL.M.", href: "#fakultas" },
            { label: "Prof. Dr. Dolor Sit Amet, S.H., M.H.", href: "#fakultas" },
            { label: "Dewan Pengajar & Praktisi Litigasi", href: "#fakultas" },
          ],
        },
        {
          heading: "BIDANG KEPAKARAN",
          links: [
            { label: "Hukum Tata Negara & Konstitusi", href: "#fakultas" },
            { label: "Hukum Bisnis Digital & Kontrak", href: "#fakultas" },
            { label: "Hukum Pidana & Forensik Digital", href: "#fakultas" },
          ],
        },
        {
          heading: "PUBLIKASI & KIPRAH",
          links: [
            { label: "Repositori SINTA Kemdikbud", href: "https://sinta.kemdikbud.go.id", external: true },
            { label: "Keterangan Saksi Ahli Persidangan", href: "#fakultas" },
            { label: "Pusat Kajian Konstitusi & HAM", href: "#fasilitas" },
          ],
        },
      ],
    },
    studentlife: {
      featured: {
        image: "/images/alumni-almira.jpg",
        title: "Kehidupan Mahasiswa",
        desc: "Peradilan semu otentik & advokasi keadilan",
        linkText: "JELAJAHI KAMPUS",
        href: "#kehidupan-mahasiswa",
      },
      columns: [
        {
          heading: "LABORATORIUM PERADILAN",
          links: [
            { label: "Ruang Sidang Utama Moot Court", href: "#fasilitas" },
            { label: "Simulator E-Court Mahkamah Agung", href: "#fasilitas" },
            { label: "Klinik Advokasi & Mediasi KBH", href: "#fasilitas" },
          ],
        },
        {
          heading: "ORGANISASI MAHASISWA",
          links: [
            { label: "Moot Court Society (MCS) UPB", href: "#kehidupan-mahasiswa" },
            { label: "Dewan Eksekutif Mahasiswa (DEMA)", href: "#kehidupan-mahasiswa" },
            { label: "Klinik Bantuan Hukum Mahasiswa", href: "#fasilitas" },
            { label: "Lembaga Debat Konstitusi", href: "#kehidupan-mahasiswa" },
          ],
        },
        {
          heading: "KIPRAH & ALUMNI",
          links: [
            { label: "Delegasi NMCC Tingkat Nasional", href: "#kehidupan-mahasiswa" },
            { label: "Ikatan Alumni Fakultas Hukum", href: "#alumni" },
            { label: "Layanan Bantuan Hukum Pro-Bono", href: "#fasilitas" },
          ],
        },
      ],
    },
    centers: {
      featured: {
        image: "/images/feature-centers.jpg",
        title: "Pusat Studi & Lokakarya",
        desc: "Riset yurisprudensi dan laboratorium kemahiran hukum terapan",
        linkText: "LIHAT FASILITAS",
        href: "#fasilitas",
      },
      columns: [
        {
          heading: "LABORATORIUM PERADILAN",
          links: [
            { label: "Ruang Sidang Utama Moot Court", href: "#fasilitas" },
            { label: "Simulator E-Court Mahkamah Agung", href: "#fasilitas" },
            { label: "Laboratorium Komputer Hukum", href: "#fasilitas" },
          ],
        },
        {
          heading: "PUSAT KAJIAN & RISET",
          links: [
            { label: "Pusat Studi Hukum Bisnis & AI", href: "#fasilitas" },
            { label: "Pusat Kajian Hukum Tata Negara", href: "#fasilitas" },
            { label: "Pusat Advokasi HAM & Lingkungan", href: "#fasilitas" },
          ],
        },
        {
          heading: "KLINIK & LOKAKARYA",
          links: [
            { label: "Klinik Bantuan Hukum (KBH)", href: "#fasilitas" },
            { label: "Lokakarya Legal Drafting Kontrak", href: "#agenda" },
            { label: "Konsultasi Hukum Pro-Bono", href: "#fasilitas" },
          ],
        },
      ],
    },
    news: {
      featured: {
        image: "/images/news-welcome.jpg",
        title: "Warta & Agenda Kampus",
        desc: "Kajian putusan mutakhir, prestasi mahasiswa, dan konferensi hukum nasional",
        linkText: "BACA WARTA TERBARU",
        href: "#berita",
      },
      columns: [
        {
          heading: "BERITA FAKULTAS",
          links: [
            { label: "Warta Akademik & Kurikulum", href: "#berita" },
            { label: "Prestasi Mahasiswa NMCC 2026", href: "#berita" },
            { label: "Kiprah Dosen & Keterangan Saksi Ahli", href: "#berita" },
          ],
        },
        {
          heading: "PUBLIKASI & KAJIAN",
          links: [
            { label: "Jurnal Pelita Law Review (SINTA 2)", href: "https://journal.pelitabangsa.ac.id", external: true },
            { label: "Analisis Putusan Mahkamah Konstitusi", href: "#berita" },
            { label: "Koleksi Yurisprudensi & Buku Ajar", href: "#berita" },
          ],
        },
        {
          heading: "AGENDA & KEGIATAN",
          links: [
            { label: "Kuliah Pakar & Praktisi Tamu", href: "#agenda" },
            { label: "Seminar Nasional Hukum Pidana", href: "#agenda" },
            { label: "Bedah Buku & Simposium Ilmiah", href: "#agenda" },
          ],
        },
      ],
    },
  };

  const handleLinkClick = (href: string, isAction?: boolean) => {
    handleCloseMenuImmediate();
    if (isAction && onOpenAdmission) {
      onOpenAdmission();
    }
  };

  return (
    <header
      ref={navRef}
      className="sticky top-4 sm:top-5 z-50 px-3 sm:px-4 w-full max-w-7xl xl:max-w-[1300px] 2xl:max-w-[1360px] mx-auto -mb-[76px] sm:-mb-[84px] transition-all duration-300 pointer-events-none"
      onMouseLeave={handleScheduleClose}
    >
      {/* 
        Single-Row Floating Glass Card Navbar
        - Left: Official University Logo + Serif Wordmark
        - Center: Main Menu in 1 row (Sentence Case, no wrap, "Lainnya" overflow)
        - Right: "Informasi Untuk" Dropdown + Search Button + CTA Button
      */}
      <div
        onMouseEnter={clearTimer}
        onMouseLeave={handleScheduleClose}
        className={`w-full pointer-events-auto transition-all duration-250 ease-out rounded-[22px] border relative ${
          isScrolled
            ? "bg-white/92 backdrop-blur-[14px] backdrop-saturate-[140%] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.10),0_24px_48px_-12px_rgba(0,0,0,0.18)] border-black/[0.06] py-1.5 sm:py-2 pl-3.5 sm:pl-5 pr-4 sm:pr-6"
            : "bg-white/88 backdrop-blur-[14px] backdrop-saturate-[140%] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.08),0_20px_40px_-12px_rgba(0,0,0,0.12)] border-white/60 border-b-black/[0.04] py-2 sm:py-2.5 pl-3.5 sm:pl-5 pr-4 sm:pr-6"
        }`}
      >
        <div className="flex items-center justify-between gap-2 lg:gap-4">
          {/* ===================== LEFT: BRAND IDENTITY ===================== */}
          <Link
            href="/"
            onClick={handleCloseMenuImmediate}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] rounded-xl shrink-0"
          >
            <div
              className={`relative shrink-0 flex items-center justify-center transition-all duration-250 ${
                isScrolled ? "w-9 h-9 sm:w-10 sm:h-10" : "w-10 h-10 sm:w-11 sm:h-11"
              }`}
            >
              <Image
                src="/images/logo-upb.png"
                alt="Logo Universitas Pelita Bangsa"
                width={48}
                height={48}
                priority
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span
                className={`font-serif font-bold text-[#800000] group-hover:text-[#570000] tracking-[-0.01em] transition-all duration-250 leading-tight ${
                  isScrolled
                    ? "text-base sm:text-lg xl:text-[21px]"
                    : "text-[17px] sm:text-[19px] xl:text-[23px]"
                }`}
              >
                Fakultas Hukum
              </span>
              <span className="font-sans font-medium uppercase text-[#5C5854] tracking-[0.18em] text-[8.5px] sm:text-[9px] xl:text-[10px] mt-0.5 leading-none">
                Universitas Pelita Bangsa
              </span>
            </div>
          </Link>

          {/* ===================== CENTER: MAIN MENU (SINGLE ROW, NO WRAP) ===================== */}
          <nav
            className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0"
            aria-label="Navigasi utama"
          >
            {/* Primary Nav Items (Study, Admissions, Faculty) */}
            {primaryNavItems
              .filter((item) => item.key !== "studentlife")
              .map((item) => {
                const isActive = activeMenu === item.key;
                const isFaculty = item.key === "faculty";
                return (
                  <div
                    key={item.key}
                    className={`relative ${isFaculty ? "hidden min-[1360px]:block" : ""}`}
                    onMouseEnter={() => handleOpenMenu(item.key)}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        clearTimer();
                        setActiveMenu(isActive ? null : item.key);
                      }}
                      onFocus={() => handleOpenMenu(item.key)}
                      className={`font-sans font-medium text-[12px] xl:text-[13px] px-2 xl:px-2.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer ${
                        isActive
                          ? "bg-[#800000]/10 text-[#800000]"
                          : "text-[#1C1B1B] hover:text-[#800000] hover:bg-[#800000]/[0.06]"
                      }`}
                      aria-expanded={isActive}
                      aria-haspopup="true"
                    >
                      {item.key === "admissions" ? (
                        <>
                          <span className="hidden xl:inline">Penerimaan Mahasiswa</span>
                          <span className="xl:hidden">Penerimaan</span>
                        </>
                      ) : item.key === "study" ? (
                        <>
                          <span className="hidden xl:inline">Program Studi Hukum</span>
                          <span className="xl:hidden">Program Studi</span>
                        </>
                      ) : (
                        <span>{item.label}</span>
                      )}
                      <ChevronDown
                        className={`w-3 h-3 text-[#5C5854] transition-transform duration-200 ${
                          isActive ? "rotate-180 text-[#800000]" : ""
                        }`}
                      />
                    </button>
                  </div>
                );
              })}

            {/* Dropdown "Lainnya" for overflow menu items */}
            <div
              className="relative"
              onMouseEnter={() => handleOpenMenu("more")}
              onMouseLeave={handleScheduleClose}
            >
              <button
                type="button"
                onClick={() => {
                  clearTimer();
                  setActiveMenu(activeMenu === "more" ? null : "more");
                }}
                onFocus={() => handleOpenMenu("more")}
                className={`font-sans font-medium text-[12px] xl:text-[13px] px-2 xl:px-2.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer ${
                  activeMenu === "more"
                    ? "bg-[#800000]/10 text-[#800000]"
                    : "text-[#1C1B1B] hover:text-[#800000] hover:bg-[#800000]/[0.06]"
                }`}
                aria-expanded={activeMenu === "more"}
                aria-haspopup="true"
              >
                <span>Lainnya</span>
                <ChevronDown
                  className={`w-3 h-3 text-[#5C5854] transition-transform duration-200 ${
                    activeMenu === "more" ? "rotate-180 text-[#800000]" : ""
                  }`}
                />
              </button>

              {/* Floating "Lainnya" dropdown card */}
              {activeMenu === "more" && (
                <div
                  className="absolute top-full right-0 pt-2.5 w-72 z-50 animate-dropdown"
                  onMouseEnter={clearTimer}
                  onMouseLeave={handleScheduleClose}
                >
                  <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.04)] p-2">
                    <div className="space-y-1">
                      {/* Tenaga Pengajar: displayed in Lainnya on screens smaller than 1360px */}
                    <a
                      href="#fakultas"
                      onClick={handleCloseMenuImmediate}
                      className="min-[1360px]:hidden w-full text-left p-2.5 rounded-xl hover:bg-[#800000]/[0.06] group transition-all flex items-start gap-3 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#800000]/8 text-[#800000] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#800000] group-hover:text-white transition-colors">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-semibold text-[#1C1B1B] group-hover:text-[#800000] transition-colors">
                            Tenaga Pengajar
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#5C5854] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-[11px] text-[#5C5854] mt-0.5 leading-snug">
                          Guru Besar &amp; akademisi terkemuka
                        </p>
                      </div>
                    </a>

                    {/* Kehidupan Mahasiswa: always in Lainnya dropdown on desktop */}
                    <a
                      href="#kehidupan-mahasiswa"
                      onClick={handleCloseMenuImmediate}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#800000]/[0.06] group transition-all flex items-start gap-3 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#800000]/8 text-[#800000] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#800000] group-hover:text-white transition-colors">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-semibold text-[#1C1B1B] group-hover:text-[#800000] transition-colors">
                            Kehidupan Mahasiswa
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#5C5854] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-[11px] text-[#5C5854] mt-0.5 leading-snug">
                          Peradilan semu otentik &amp; advokasi keadilan
                        </p>
                      </div>
                    </a>

                    {moreNavItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.key}
                          href={item.href}
                          onClick={handleCloseMenuImmediate}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-[#800000]/[0.06] group transition-all flex items-start gap-3 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#800000]/8 text-[#800000] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#800000] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[13px] font-semibold text-[#1C1B1B] group-hover:text-[#800000] transition-colors">
                                {item.label}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#5C5854] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <p className="text-[11px] text-[#5C5854] mt-0.5 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              )}
            </div>
          </nav>

          {/* ===================== RIGHT: AUDIENCE DROPDOWN + SEARCH + CTA ===================== */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 shrink-0">
            {/* 1. Dropdown "Informasi Untuk" */}
            <div
              className="relative"
              onMouseEnter={() => handleOpenMenu("audience")}
              onMouseLeave={handleScheduleClose}
            >
              <button
                type="button"
                onClick={() => {
                  clearTimer();
                  setActiveMenu(activeMenu === "audience" ? null : "audience");
                }}
                onFocus={() => handleOpenMenu("audience")}
                className={`inline-flex items-center gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-full text-[12px] xl:text-[12.5px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer border ${
                  activeMenu === "audience"
                    ? "bg-[#800000]/10 text-[#800000] border-[#800000]/20"
                    : "text-[#1C1B1B] hover:text-[#800000] hover:bg-[#800000]/[0.06] border-transparent"
                }`}
                aria-expanded={activeMenu === "audience"}
                aria-haspopup="true"
              >
                <User className="w-3.5 h-3.5 text-[#800000]" />
                <span className="hidden xl:inline">Informasi Untuk</span>
                <span className="xl:hidden">Informasi</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#5C5854] transition-transform duration-200 ${
                    activeMenu === "audience" ? "rotate-180 text-[#800000]" : ""
                  }`}
                />
              </button>

              {/* Floating Audience Menu Card */}
              {activeMenu === "audience" && (
                <div
                  className="absolute top-full right-0 pt-2.5 w-72 z-50 animate-dropdown"
                  onMouseEnter={clearTimer}
                  onMouseLeave={handleScheduleClose}
                >
                  <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.04)] p-2">
                    <div className="px-3 py-2 border-b border-[#F0EDED] mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#5C5854]">
                        Layanan Portal Sivitas
                      </p>
                    </div>
                  <div className="space-y-1">
                    {audienceList.map((aud) => {
                      const Icon = aud.icon;
                      return (
                        <button
                          key={aud.key}
                          type="button"
                          onClick={() => handleOpenAudience(aud.key)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-[#800000]/[0.06] group transition-all flex items-start gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#800000]/8 text-[#800000] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#800000] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[13px] font-semibold text-[#1C1B1B] group-hover:text-[#800000] transition-colors">
                                {aud.label}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#5C5854] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <p className="text-[11px] text-[#5C5854] leading-tight mt-0.5 truncate">
                              {aud.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* 2. Search Icon Button */}
            <button
              type="button"
              onClick={() => {
                setSearchOpen(!searchOpen);
                handleCloseMenuImmediate();
              }}
              className="w-8 h-8 xl:w-8.5 xl:h-8.5 rounded-full flex items-center justify-center text-[#1C1B1B] hover:text-[#800000] hover:bg-[#800000]/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer"
              aria-label="Buka pencarian wacana dan direktori"
              title="Pencarian"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            {/* 3. Solid Maroon Rounded-Full CTA Button */}
            <button
              type="button"
              onClick={() => {
                handleCloseMenuImmediate();
                if (onOpenAdmission) onOpenAdmission();
              }}
              className="inline-flex items-center justify-center px-3 xl:px-3.5 py-1.5 bg-[#800000] hover:bg-[#570000] text-white text-[12px] xl:text-[12.5px] font-semibold tracking-[0.02em] rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer shrink-0"
            >
              <span className="hidden xl:inline">Pendaftaran Mahasiswa Baru</span>
              <span className="xl:hidden">Pendaftaran PMB</span>
            </button>
          </div>

          {/* ===================== MOBILE ACTION BUTTONS (< 1024px) ===================== */}
          <div className="flex items-center lg:hidden gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSearchOpen(!searchOpen);
                handleCloseMenuImmediate();
              }}
              className="p-2 rounded-full text-[#1C1B1B] hover:text-[#800000] hover:bg-[#800000]/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
              aria-label="Pencarian"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                handleCloseMenuImmediate();
              }}
              className="p-2 rounded-full text-[#800000] hover:bg-[#800000]/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ===================== DESKTOP MEGA-MENU PANEL ===================== */}
        {activeMenu && ["study", "admissions", "faculty", "studentlife"].includes(activeMenu) && megaMenuData[activeMenu] && (
          <div
            className="absolute top-full left-0 right-0 pt-2.5 z-50 animate-dropdown"
            onMouseEnter={clearTimer}
            onMouseLeave={handleScheduleClose}
          >
            <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="flex items-stretch gap-6 lg:gap-8">
                {/* Column 1: Editorial Featured Card (Warm Academic Tone) */}
                <div className="w-72 shrink-0 bg-[#F8F7F4] border-r border-[#EFECE6] p-4 sm:p-5 flex flex-col justify-between group">
                  <div>
                    <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden mb-3.5 shadow-xs">
                      <Image
                        src={megaMenuData[activeMenu].featured.image}
                        alt={megaMenuData[activeMenu].featured.title}
                        fill
                        sizes="288px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#800000] mb-1 block">
                      Sorotan Fakultas
                    </span>
                    <h4 className="font-serif text-base sm:text-[17px] font-bold text-[#1C1B1B] mb-1.5 leading-snug group-hover:text-[#800000] transition-colors">
                      {megaMenuData[activeMenu].featured.title}
                    </h4>
                    <p className="text-xs text-[#5C5854] leading-relaxed">
                      {megaMenuData[activeMenu].featured.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#EFECE6] mt-3">
                    <a
                      href={megaMenuData[activeMenu].featured.href}
                      onClick={() =>
                        handleLinkClick(
                          megaMenuData[activeMenu].featured.href,
                          megaMenuData[activeMenu].featured.isAction
                        )
                      }
                      className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#800000] hover:text-[#570000] transition-colors"
                    >
                      <span>{megaMenuData[activeMenu].featured.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Columns 2, 3, 4: Content Link Columns */}
                <div className="flex-1 grid grid-cols-3 gap-6 py-6 sm:py-7 pr-6">
                  {megaMenuData[activeMenu].columns.map((col, idx) => (
                    <div key={idx} className="flex flex-col space-y-2">
                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#5C5854] mb-1">
                        {col.heading}
                      </h5>
                      <ul className="space-y-1.5">
                        {col.links.map((link, lIdx) => (
                          <li key={lIdx}>
                            <a
                              href={link.href}
                              target={link.external ? "_blank" : undefined}
                              rel={link.external ? "noopener noreferrer" : undefined}
                              onClick={() => handleLinkClick(link.href, link.isAction)}
                              className="text-xs font-medium text-[#1C1B1B] hover:text-[#800000] px-2 py-1 -mx-2 rounded-lg hover:bg-[#F8F7F4] transition-all inline-flex items-center gap-1 leading-snug group"
                            >
                              <span>{link.label}</span>
                              {link.external && (
                                <ExternalLink className="w-3 h-3 text-[#C5A059] opacity-75 group-hover:opacity-100 shrink-0" />
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== SEARCH FLOATING CARD ===================== */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 pt-2.5 z-50 animate-dropdown">
            <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.04)] p-4 sm:p-5">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 bg-[#F8F7F4] border border-[#E5E1DA] rounded-xl px-4 py-2.5 focus-within:border-[#800000] focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-[#800000] shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kurikulum, nama dosen, putusan, jurnal atau wacana hukum..."
                  className="w-full bg-transparent text-sm text-[#1C1B1B] focus:outline-none placeholder:text-[#5C5854]/60"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-2 py-0.5 rounded text-xs text-[#5C5854] hover:text-[#1C1B1B] hover:bg-[#E5E1DA]"
                    aria-label="Bersihkan pencarian"
                  >
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg text-[#5C5854] hover:text-[#1C1B1B] hover:bg-[#E5E1DA] transition-colors"
                  aria-label="Tutup pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {searchQuery.trim().length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#E5E1DA] text-xs text-[#5C5854]">
                  <p className="font-semibold text-[#800000] mb-1.5">Hasil Pencarian Cepat:</p>
                  <div className="space-y-1">
                    <a
                      href="#akademik"
                      onClick={() => setSearchOpen(false)}
                      className="block py-1.5 px-2.5 rounded-lg hover:bg-[#F8F7F4] hover:text-[#800000] transition-colors"
                    >
                      &bull; Program Sarjana Hukum (S.H.) Reguler &amp; Kelas Karyawan
                    </a>
                    <a
                      href="#pendaftaran"
                      onClick={() => setSearchOpen(false)}
                      className="block py-1.5 px-2.5 rounded-lg hover:bg-[#F8F7F4] hover:text-[#800000] transition-colors"
                    >
                      &bull; Pendaftaran Mahasiswa Baru &amp; Skema Bantuan Biaya SPP
                    </a>
                    <a
                      href="#fakultas"
                      onClick={() => setSearchOpen(false)}
                      className="block py-1.5 px-2.5 rounded-lg hover:bg-[#F8F7F4] hover:text-[#800000] transition-colors"
                    >
                      &bull; Direktori Dewan Guru Besar &amp; Keterangan Saksi Ahli
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* ===================== MOBILE FULLSCREEN / SHEET DRAWER (< 1024px) ===================== */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            className="fixed inset-x-3 top-20 max-h-[85vh] overflow-y-auto bg-white/98 backdrop-blur-lg rounded-3xl shadow-2xl border border-black/[0.08] p-5 z-50 animate-dropdown lg:hidden flex flex-col space-y-4 pointer-events-auto"
            role="dialog"
            aria-label="Menu navigasi mobile"
          >
            {/* Header in sheet */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EDED]">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/logo-upb.png"
                  alt="Logo UPB"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
                <div>
                  <h3 className="font-serif font-bold text-base text-[#800000] leading-none">
                    Fakultas Hukum
                  </h3>
                  <p className="text-[9.5px] font-medium tracking-widest uppercase text-[#5C5854] mt-1">
                    Universitas Pelita Bangsa
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-[#F8F7F4] text-[#5C5854] hover:text-[#1C1B1B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links Accordion / List */}
            <nav className="flex flex-col space-y-1" aria-label="Navigasi Menu Mobile">
              {allNavItems.map((item) => {
                const hasMega = !!megaMenuData[item.key];
                const isExpanded = expandedMobileAccordion === item.key;
                return (
                  <div key={item.key} className="border-b border-[#F0EDED]/60 pb-1">
                    <div className="flex items-center justify-between min-h-[44px]">
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 px-2 text-sm font-semibold text-[#1C1B1B] hover:text-[#800000] transition-colors flex-1"
                      >
                        {item.label}
                      </a>
                      {hasMega && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedMobileAccordion(isExpanded ? null : item.key)
                          }
                          className="p-2.5 text-[#5C5854] hover:text-[#800000] rounded-lg transition-transform duration-200"
                          aria-label={`Buka sub-menu ${item.label}`}
                          aria-expanded={isExpanded}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-[#800000]" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {hasMega && isExpanded && (
                      <div className="pl-3 pr-2 py-2 space-y-1.5 bg-[#F8F7F4] rounded-xl mb-1 text-xs animate-dropdown">
                        {megaMenuData[item.key].columns.flatMap((c) => c.links).slice(0, 4).map((l, lIdx) => (
                          <a
                            key={lIdx}
                            href={l.href}
                            onClick={() => {
                              handleLinkClick(l.href, l.isAction);
                              setMobileMenuOpen(false);
                            }}
                            className="block py-1.5 px-2 rounded-lg text-[#5C5854] hover:text-[#800000] hover:bg-white transition-colors"
                          >
                            &bull; {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Audience Section */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C5854] block mb-2 px-1">
                Informasi Layanan Terpadu:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {audienceList.map((aud) => {
                  const Icon = aud.icon;
                  return (
                    <button
                      key={aud.key}
                      type="button"
                      onClick={() => handleOpenAudience(aud.key)}
                      className="p-2.5 bg-[#F8F7F4] border border-[#E5E1DA] rounded-xl text-[#1C1B1B] hover:text-[#800000] hover:border-[#800000] font-medium text-left transition-colors flex items-center gap-2 cursor-pointer min-h-[44px]"
                    >
                      <Icon className="w-4 h-4 text-[#800000] shrink-0" />
                      <span className="truncate">{aud.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile CTA Button */}
            <div className="pt-2 pb-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdmission) onOpenAdmission();
                }}
                className="w-full py-3.5 bg-[#800000] hover:bg-[#570000] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors shadow-md min-h-[44px] flex items-center justify-center gap-2"
              >
                <span>Pendaftaran Mahasiswa Baru</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Audience Service Portal Modal */}
      <AudiencePortalModal
        isOpen={audienceModalOpen}
        initialTab={audienceTab}
        onClose={() => setAudienceModalOpen(false)}
      />
    </header>
  );
}
