"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Calendar,
  Info,
  Phone,
} from "lucide-react";
import { AudiencePortalModal, AudienceType } from "@/components/AudiencePortalModal";

export function Navbar({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

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

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleCloseMenuImmediate();
    setMobileMenuOpen(false);

    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  const handleScheduleClose = () => {
    clearTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 220);
  };

  // Close menus on Escape key, click outside, or route change
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      clearTimer();
    };
  }, [searchOpen, mobileMenuOpen, activeMenu, handleCloseMenuImmediate, clearTimer]);

  // Reset menus and drawer on pathname transition
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (activeMenu) setActiveMenu(null);
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (searchOpen) setSearchOpen(false);
  }

  const audienceList: {
    key: AudienceType;
    label: string;
    description: string;
    icon: typeof GraduationCap;
  }[] = [
    {
      key: "mahasiswa",
      label: "Mahasiswa",
      description: "Portal akademik, KRS, dan peradilan semu",
      icon: GraduationCap,
    },
    {
      key: "dosen",
      label: "Dosen",
      description: "Beban kerja dan publikasi riset SINTA",
      icon: BookOpen,
    },
    {
      key: "staf",
      label: "Staf",
      description: "Layanan administrasi dan persuratan",
      icon: Building2,
    },
    {
      key: "alumni",
      label: "Alumni",
      description: "Tracer study dan ikatan alumni",
      icon: Briefcase,
    },
  ];

  // Primary Nav Items (with actual URLs for routing)
  const primaryNavItems = [
    { key: "study", label: "Program Studi", href: "/akademik" },
    { key: "admissions", label: "Penerimaan & Biaya", href: "/penerimaan" },
    { key: "faculty", label: "Tenaga Pengajar", href: "/dosen" },
    { key: "studentlife", label: "Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
  ];

  // Secondary Nav Items (Overflow / Mega dropdown)
  const moreNavItems = [
    {
      key: "centers",
      label: "Pusat Studi & Lab",
      href: "/pusat-studi",
      desc: "Laboratorium peradilan semu, KBH, dan riset",
      icon: Building2,
    },
    {
      key: "news",
      label: "Warta & Kajian",
      href: "/berita",
      desc: "Kabar fakultas, yurisprudensi, dan opini",
      icon: Newspaper,
    },
    {
      key: "agenda",
      label: "Agenda Akademik",
      href: "/agenda",
      desc: "Seminar nasional, kuliah pakar, dan workshop",
      icon: Calendar,
    },
    {
      key: "about",
      label: "Tentang",
      href: "/tentang",
      desc: "Amanat Dekan, visi misi, dan sejarah",
      icon: Info,
    },
    {
      key: "contact",
      label: "Kontak",
      href: "/kontak",
      desc: "Lokasi dekanat, jam kerja, dan layanan",
      icon: Phone,
    },
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
        title: "Bidang Peminatan Hukum",
        desc: "Temukan peminatan keahlian doktrin dan kemahiran litigasi ruang sidang.",
        linkText: "LIHAT PROGRAM STUDI",
        href: "/akademik",
      },
      columns: [
        {
          heading: "PROGRAM PENDIDIKAN",
          links: [
            { label: "Program Sarjana Hukum (S.H.)", href: "/akademik/program-sarjana-hukum" },
            { label: "Bidang Peminatan & Konsentrasi", href: "/akademik/peminatan" },
            { label: "Kurikulum & Distribusi Semester", href: "/akademik/kurikulum" },
            { label: "Pendidikan Khusus Advokat (PKPA)", href: "/akademik/pkpa" },
          ],
        },
        {
          heading: "AGENDA & ALUMNI",
          links: [
            { label: "Kalender Kegiatan Akademik", href: "/agenda" },
            { label: "Profil Lulusan & Ikatan Alumni", href: "/tentang/alumni" },
            { label: "Workshop Kemahiran Litigasi", href: "/akademik/workshop-litigasi" },
          ],
        },
        {
          heading: "LABORATORIUM & RISET",
          links: [
            { label: "Laboratorium Peradilan Semu", href: "/pusat-studi/laboratorium-peradilan-semu" },
            { label: "Pelita Law Review (Jurnal SINTA)", href: "https://journal.pelitabangsa.ac.id", external: true },
            { label: "Klinik Bantuan Hukum (KBH)", href: "/pusat-studi/klinik-bantuan-hukum" },
          ],
        },
      ],
    },
    admissions: {
      featured: {
        image: "/images/moot-court.jpg",
        title: "Penerimaan & Bantuan Biaya",
        desc: "Investasi pendidikan hukum berintegritas tanpa pungutan liar.",
        linkText: "DAFTAR SEKARANG",
        href: "/penerimaan",
      },
      columns: [
        {
          heading: "JALUR PENERIMAAN",
          links: [
            { label: "Sarjana Hukum (S.H.) Reguler", href: "/penerimaan/reguler" },
            { label: "Sarjana Hukum Kelas Karyawan", href: "/penerimaan/kelas-karyawan" },
            { label: "Persyaratan & Jadwal Gelombang", href: "/penerimaan/jadwal" },
          ],
        },
        {
          heading: "BIAYA & BEASISWA",
          links: [
            { label: "Rincian Biaya & Angsuran Bulanan", href: "/penerimaan/biaya" },
            { label: "Skema Beasiswa Prestasi & KIP-K", href: "/penerimaan/beasiswa" },
            { label: "Panduan Pendaftaran Mahasiswa Baru", href: "/penerimaan/daftar" },
          ],
        },
        {
          heading: "KONSULTASI & INFORMASI",
          links: [
            { label: "Layanan Konsultasi WhatsApp Dekanat", href: "https://wa.me/6281290008801", external: true },
            { label: "Buku Panduan Akademik PDF", href: "/penerimaan/brosur" },
            { label: "Pertanyaan Umum (FAQ PMB)", href: "/penerimaan/faq" },
          ],
        },
      ],
    },
    faculty: {
      featured: {
        image: "/images/feature-faculty.jpg",
        title: "Pakar & Tenaga Pengajar",
        desc: "Belajar langsung dari Guru Besar, praktisi litigasi, dan akademisi hukum terkemuka.",
        linkText: "DIREKTORI DOSEN",
        href: "/dosen",
      },
      columns: [
        {
          heading: "DIREKTORI PENGAJAR",
          links: [
            { label: "Seluruh Tenaga Pengajar Tetap", href: "/dosen" },
            { label: "Pakar Hukum Bisnis & Korporasi", href: "/dosen/bidang/hukum-bisnis-korporasi" },
            { label: "Pakar Hukum Tata Negara", href: "/dosen/bidang/hukum-tata-negara" },
          ],
        },
        {
          heading: "PUBLIKASI & KARYA",
          links: [
            { label: "Publikasi Ilmiah SINTA Kemdikbud", href: "https://sinta.kemdikbud.go.id", external: true },
            { label: "Buku Ajar & Monograf", href: "/dosen/publikasi" },
            { label: "Keterangan Ahli di Pengadilan", href: "/dosen/keterangan-ahli" },
          ],
        },
        {
          heading: "KELEMBAGAAN",
          links: [
            { label: "Senat Akademik Fakultas", href: "/tentang/senat-akademik" },
            { label: "Pusat Kajian Hukum UPB", href: "/pusat-studi" },
            { label: "Hubungi Dewan Pengajar", href: "/kontak" },
          ],
        },
      ],
    },
    studentlife: {
      featured: {
        image: "/images/feature-tour.jpg",
        title: "Kehidupan Mahasiswa",
        desc: "Kembangkan kepemimpinan, kemahiran debat hukum, dan advokasi sosial.",
        linkText: "JELAJAHI KEGIATAN",
        href: "/kehidupan-mahasiswa",
      },
      columns: [
        {
          heading: "ORGANISASI KEMAHASISWAAN",
          links: [
            { label: "Organisasi Mahasiswa I (Lorem Ipsum)", href: "/kehidupan-mahasiswa/organisasi-1" },
            { label: "Organisasi Mahasiswa II (Lorem Ipsum)", href: "/kehidupan-mahasiswa/organisasi-2" },
            { label: "Organisasi Mahasiswa III (Lorem Ipsum)", href: "/kehidupan-mahasiswa/organisasi-3" },
          ],
        },
        {
          heading: "PRESTASI & AKTIVITAS",
          links: [
            { label: "Kejuaraan Peradilan Semu Nasional", href: "/kehidupan-mahasiswa/prestasi" },
            { label: "Advokasi & Aksi Sosial Keadilan", href: "/kehidupan-mahasiswa/advokasi" },
            { label: "Klinik Hukum Lapangan Mahasiswa", href: "/pusat-studi/klinik-bantuan-hukum" },
          ],
        },
        {
          heading: "FASILITAS KAMPUS",
          links: [
            { label: "Ruang Sidang Semu Modern", href: "/pusat-studi/laboratorium-peradilan-semu" },
            { label: "Perpustakaan Hukum Terpadu", href: "/tentang/fasilitas/perpustakaan-hukum" },
            { label: "Auditorium & Ruang Diskusi", href: "/tentang/fasilitas/auditorium" },
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/berita?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Helper to determine if a route is active
  const isRouteActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      ref={navRef}
      className="sticky top-3 sm:top-4 z-50 px-3 sm:px-4 w-full max-w-7xl xl:max-w-[1320px] 2xl:max-w-[1380px] mx-auto -mb-[76px] sm:-mb-[84px] transition-all duration-300 pointer-events-none"
      onMouseLeave={handleScheduleClose}
    >
      <div
        onMouseEnter={clearTimer}
        onMouseLeave={handleScheduleClose}
        className={`w-full pointer-events-auto transition-all duration-250 ease-out rounded-2xl border relative ${
          isScrolled
            ? "bg-white/95 backdrop-blur-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] border-[#E5E1DA] py-2 pl-3.5 sm:pl-5 pr-3.5 sm:pr-5"
            : "bg-white/90 backdrop-blur-[14px] shadow-[0_2px_16px_rgba(0,0,0,0.08)] border-white/70 py-2.5 pl-3.5 sm:pl-5 pr-3.5 sm:pr-5"
        }`}
      >
        <div className="flex items-center justify-between gap-2 lg:gap-3">
          {/* ===================== LEFT: BRAND IDENTITY ===================== */}
          <Link
            href="/"
            onClick={handleBrandClick}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] rounded-xl shrink-0 cursor-pointer"
            aria-label="Kembali ke Beranda Fakultas Hukum UPB"
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
                    ? "text-base sm:text-lg xl:text-[20px]"
                    : "text-[17px] sm:text-[19px] xl:text-[22px]"
                }`}
              >
                Fakultas Hukum
              </span>
              <span className="font-sans font-medium uppercase text-[#5C5854] tracking-[0.16em] text-[8.5px] sm:text-[9px] xl:text-[10px] mt-0.5 leading-none">
                Universitas Pelita Bangsa
              </span>
            </div>
          </Link>

          {/* ===================== CENTER: MAIN MENU (REAL LINKS + MEGA DROPDOWN) ===================== */}
          <nav
            className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0"
            aria-label="Navigasi utama situs"
          >
            {primaryNavItems.map((item) => {
              const isOpen = activeMenu === item.key;
              const isCurrent = isRouteActive(item.href);

              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => handleOpenMenu(item.key)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      clearTimer();
                      setActiveMenu(isOpen ? null : item.key);
                    }}
                    onFocus={() => handleOpenMenu(item.key)}
                    className={`font-sans font-medium text-[12px] xl:text-[13px] px-2.5 xl:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer ${
                      isOpen
                        ? "bg-[#800000]/10 text-[#800000]"
                        : isCurrent
                        ? "bg-[#800000] text-white font-semibold shadow-xs"
                        : "text-[#1C1B1B] hover:text-[#800000] hover:bg-[#800000]/[0.06]"
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#800000]" : isCurrent ? "text-white/80" : "text-[#5C5854]"
                      }`}
                    />
                  </button>
                </div>
              );
            })}

            {/* Menu Dropdown "Lainnya" (Pusat Studi, Berita, Tentang, Kontak) */}
            <div
              className="relative"
              onMouseEnter={() => handleOpenMenu("more")}
            >
              <button
                type="button"
                onClick={() => {
                  clearTimer();
                  setActiveMenu(activeMenu === "more" ? null : "more");
                }}
                onFocus={() => handleOpenMenu("more")}
                className={`font-sans font-medium text-[12px] xl:text-[13px] px-2.5 xl:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer ${
                  activeMenu === "more"
                    ? "bg-[#800000]/10 text-[#800000]"
                    : "text-[#1C1B1B] hover:text-[#800000] hover:bg-[#800000]/[0.06]"
                }`}
                aria-expanded={activeMenu === "more"}
                aria-haspopup="true"
              >
                <span>Lainnya</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#5C5854] transition-transform duration-200 ${
                    activeMenu === "more" ? "rotate-180 text-[#800000]" : ""
                  }`}
                />
              </button>

              {/* Floating "Lainnya" Menu Card */}
              <AnimatePresence>
                {activeMenu === "more" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 pt-2.5 w-64 z-50 pointer-events-auto"
                    onMouseEnter={clearTimer}
                    onMouseLeave={handleScheduleClose}
                  >
                    <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E1DA] p-2">
                      <div className="space-y-1">
                        {moreNavItems.map((item) => {
                          const Icon = item.icon;
                          const isCurrent = isRouteActive(item.href);
                          return (
                            <Link
                              key={item.key}
                              href={item.href}
                              onClick={handleCloseMenuImmediate}
                              className={`w-full text-left p-2.5 rounded-xl group transition-all flex items-start gap-3 cursor-pointer ${
                                isCurrent ? "bg-[#800000]/10" : "hover:bg-[#800000]/[0.06]"
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#800000]/8 text-[#800000] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#800000] group-hover:text-white transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className={`text-[13px] font-semibold transition-colors ${
                                    isCurrent ? "text-[#800000]" : "text-[#1C1B1B] group-hover:text-[#800000]"
                                  }`}>
                                    {item.label}
                                  </span>
                                  <ChevronRight className="w-3.5 h-3.5 text-[#5C5854] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                </div>
                                <p className="text-[11px] text-[#5C5854] mt-0.5 leading-snug">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* ===================== RIGHT: AUDIENCE + SEARCH + CTA ===================== */}
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
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[12px] xl:text-[12.5px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer border ${
                  activeMenu === "audience"
                    ? "bg-[#800000]/10 text-[#800000] border-[#800000]/20"
                    : "text-[#1C1B1B] hover:text-[#800000] hover:bg-[#800000]/[0.06] border-transparent"
                }`}
                aria-expanded={activeMenu === "audience"}
                aria-haspopup="true"
              >
                <User className="w-3.5 h-3.5 text-[#800000]" />
                <span className="hidden xl:inline">Info Untuk</span>
                <span className="xl:hidden">Sivitas</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#5C5854] transition-transform duration-200 ${
                    activeMenu === "audience" ? "rotate-180 text-[#800000]" : ""
                  }`}
                />
              </button>

              {/* Floating Audience Menu Card */}
              <AnimatePresence>
                {activeMenu === "audience" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 pt-2.5 w-72 z-50 pointer-events-auto"
                    onMouseEnter={clearTimer}
                    onMouseLeave={handleScheduleClose}
                  >
                    <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E1DA] p-2">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Search Icon Button */}
            <button
              type="button"
              onClick={() => {
                setSearchOpen(!searchOpen);
                handleCloseMenuImmediate();
              }}
              className="w-8 h-8 xl:w-8.5 xl:h-8.5 rounded-full flex items-center justify-center text-[#1C1B1B] hover:text-[#800000] hover:bg-[#800000]/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer"
              aria-label="Buka pencarian warta dan direktori"
              title="Pencarian"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            {/* 3. Solid Maroon CTA Button */}
            <button
              type="button"
              onClick={() => {
                handleCloseMenuImmediate();
                if (onOpenAdmission) onOpenAdmission();
              }}
              className="inline-flex items-center justify-center px-3.5 xl:px-4 py-1.5 bg-[#800000] hover:bg-[#570000] text-white text-[12px] xl:text-[12.5px] font-semibold tracking-[0.02em] rounded-full transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] cursor-pointer shrink-0"
            >
              <span>Pendaftaran PMB</span>
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
        <AnimatePresence>
          {activeMenu && ["study", "admissions", "faculty", "studentlife"].includes(activeMenu) && megaMenuData[activeMenu] && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 pt-2.5 z-50 pointer-events-auto"
              onMouseEnter={clearTimer}
              onMouseLeave={handleScheduleClose}
            >
              <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E1DA] overflow-hidden">
                <div className="flex items-stretch gap-6 lg:gap-8">
                  {/* Column 1: Featured Card (Yale Editorial Style) */}
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
                        Sorotan Direktori
                      </span>
                      <h4 className="font-serif text-base sm:text-[17px] font-bold text-[#1C1B1B] mb-1.5 leading-snug group-hover:text-[#800000] transition-colors">
                        {megaMenuData[activeMenu].featured.title}
                      </h4>
                      <p className="text-xs text-[#5C5854] leading-relaxed">
                        {megaMenuData[activeMenu].featured.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#EFECE6] mt-3">
                      <Link
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
                      </Link>
                    </div>
                  </div>

                  {/* Columns 2, 3, 4: Content Links */}
                  <div className="flex-1 grid grid-cols-3 gap-6 py-6 sm:py-7 pr-6">
                    {megaMenuData[activeMenu].columns.map((col, idx) => (
                      <div key={idx} className="flex flex-col space-y-2">
                        <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#5C5854] mb-1">
                          {col.heading}
                        </h5>
                        <ul className="space-y-1.5">
                          {col.links.map((link, lIdx) => (
                            <li key={lIdx}>
                              {link.external ? (
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => handleLinkClick(link.href, link.isAction)}
                                  className="text-xs font-medium text-[#1C1B1B] hover:text-[#800000] px-2 py-1 -mx-2 rounded-lg hover:bg-[#F8F7F4] transition-all inline-flex items-center gap-1 leading-snug group"
                                >
                                  <span>{link.label}</span>
                                  <ExternalLink className="w-3 h-3 text-[#5C5854] group-hover:text-[#800000] transition-colors" />
                                </a>
                              ) : (
                                <Link
                                  href={link.href}
                                  onClick={() => handleLinkClick(link.href, link.isAction)}
                                  className="text-xs font-medium text-[#1C1B1B] hover:text-[#800000] px-2 py-1 -mx-2 rounded-lg hover:bg-[#F8F7F4] transition-all inline-flex items-center gap-1 leading-snug group"
                                >
                                  <span>{link.label}</span>
                                  <ChevronRight className="w-3 h-3 text-[#5C5854] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================== SEARCH OVERLAY MODAL ===================== */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 pt-2.5 z-50 pointer-events-auto"
            >
              <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E1DA] p-4 sm:p-6">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="flex items-center gap-3 border-b-2 border-[#800000] pb-2">
                    <Search className="w-5 h-5 text-[#800000] shrink-0" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari warta hukum, kegiatan, kurikulum, atau tenaga pengajar..."
                      className="w-full text-sm sm:text-base font-medium text-[#1C1B1B] placeholder-[#8E706C] focus:outline-none bg-transparent"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-1 rounded-md text-[#5C5854] hover:text-[#1C1B1B] hover:bg-[#F8F7F4]"
                      aria-label="Tutup pencarian"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#5C5854]">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">
                      Pencarian Populer:
                    </span>
                    <Link
                      href="/akademik/kurikulum"
                      onClick={() => setSearchOpen(false)}
                      className="px-2.5 py-1 rounded-full bg-[#F8F7F4] hover:bg-[#800000]/10 hover:text-[#800000] transition-colors"
                    >
                      Kurikulum S.H.
                    </Link>
                    <Link
                      href="/penerimaan/biaya"
                      onClick={() => setSearchOpen(false)}
                      className="px-2.5 py-1 rounded-full bg-[#F8F7F4] hover:bg-[#800000]/10 hover:text-[#800000] transition-colors"
                    >
                      Biaya Kuliah
                    </Link>
                    <Link
                      href="/pusat-studi/laboratorium-peradilan-semu"
                      onClick={() => setSearchOpen(false)}
                      className="px-2.5 py-1 rounded-full bg-[#F8F7F4] hover:bg-[#800000]/10 hover:text-[#800000] transition-colors"
                    >
                      Peradilan Semu
                    </Link>
                    <Link
                      href="/dosen"
                      onClick={() => setSearchOpen(false)}
                      className="px-2.5 py-1 rounded-full bg-[#F8F7F4] hover:bg-[#800000]/10 hover:text-[#800000] transition-colors"
                    >
                      Guru Besar
                    </Link>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================== MOBILE DRAWER (< 1024px) ===================== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 pt-2.5 z-50 pointer-events-auto"
            >
            <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.16)] border border-[#E5E1DA] p-4 max-h-[80vh] overflow-y-auto">
              <div className="space-y-1 pb-4 border-b border-[#F0EDED]">
                {primaryNavItems.map((item) => {
                  const isCurrent = isRouteActive(item.href);
                  const isExpanded = expandedMobileAccordion === item.key;
                  const menuDetails = megaMenuData[item.key];

                  return (
                    <div key={item.key} className="rounded-xl overflow-hidden border border-transparent">
                      <div className="flex items-center justify-between">
                        {menuDetails ? (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMobileAccordion(isExpanded ? null : item.key)
                            }
                            className={`w-full flex items-center justify-between py-2.5 px-3 text-sm font-semibold rounded-lg transition-colors text-left cursor-pointer ${
                              isCurrent
                                ? "text-[#800000] bg-[#800000]/10"
                                : "text-[#1C1B1B] hover:bg-[#F8F7F4]"
                            }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-[#800000]" : "text-[#5C5854]"
                              }`}
                            />
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex-1 py-2.5 px-3 text-sm font-semibold rounded-lg transition-colors ${
                              isCurrent
                                ? "text-[#800000] bg-[#800000]/10"
                                : "text-[#1C1B1B] hover:bg-[#F8F7F4]"
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>

                      {/* Mobile Accordion Children */}
                      <AnimatePresence>
                        {isExpanded && menuDetails && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pr-2 py-2 bg-[#F8F7F4] rounded-lg mt-1 space-y-2 text-xs">
                              <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="py-1 text-[#800000] font-semibold block border-b border-[#E5E1DA] pb-1.5 mb-1.5"
                              >
                                {menuDetails.featured.linkText} &rarr;
                              </Link>
                              {menuDetails.columns.flatMap((col) => col.links).map((link, lIdx) => (
                                <div key={lIdx}>
                                  {link.external ? (
                                    <a
                                      href={link.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="py-1 text-[#5C5854] hover:text-[#800000] inline-flex items-center gap-1.5"
                                    >
                                      <span>{link.label}</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  ) : (
                                    <Link
                                      href={link.href}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        if (link.isAction && onOpenAdmission) onOpenAdmission();
                                      }}
                                      className="py-1 text-[#5C5854] hover:text-[#800000] block"
                                    >
                                      {link.label}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Secondary Items in Mobile */}
                {moreNavItems.map((item) => {
                  const isCurrent = isRouteActive(item.href);
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2.5 px-3 text-sm font-semibold rounded-lg transition-colors ${
                        isCurrent
                          ? "text-[#800000] bg-[#800000]/10"
                          : "text-[#1C1B1B] hover:bg-[#F8F7F4]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Portal Sivitas on Mobile */}
              <div className="pt-4 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5C5854] px-3 mb-2">
                  Portal Sivitas Kampus
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {audienceList.map((aud) => (
                    <button
                      key={aud.key}
                      type="button"
                      onClick={() => handleOpenAudience(aud.key)}
                      className="text-left p-2.5 rounded-lg border border-[#E5E1DA] hover:bg-[#800000]/[0.06] text-xs font-semibold text-[#1C1B1B] hover:text-[#800000] transition-colors"
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAdmission) onOpenAdmission();
                  }}
                  className="w-full py-2.5 bg-[#800000] hover:bg-[#570000] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-center"
                >
                  Pendaftaran PMB 2026/2027
                </button>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <AudiencePortalModal
        isOpen={audienceModalOpen}
        onClose={() => setAudienceModalOpen(false)}
        initialTab={audienceTab}
      />
    </header>
  );
}
