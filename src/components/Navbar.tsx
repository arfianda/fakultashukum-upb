"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Search, X, Menu, ChevronRight, ChevronDown, Scale, ExternalLink, ArrowRight } from "lucide-react";

export function Navbar({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleOpenMenu = (key: string) => {
    clearTimer();
    setActiveMegaMenu(key);
  };

  const handleCloseMenuImmediate = () => {
    clearTimer();
    setActiveMegaMenu(null);
  };

  const handleScheduleClose = () => {
    clearTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 120);
  };

  // Close menus on Escape key (R-32 accessibility) or clicking outside or scrolling
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
      if (activeMegaMenu) {
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
  }, [searchOpen, mobileMenuOpen, activeMegaMenu]);

  const audienceLinks = [
    { label: "Mahasiswa", href: "#laboratorium" },
    { label: "Dosen", href: "#fakultas" },
    { label: "Staf", href: "#laboratorium" },
    { label: "Alumni", href: "#alumni" },
  ];

  const primaryNavItems = [
    { key: "study", label: "STUDY OF LAW", href: "#akademik" },
    { key: "admissions", label: "ADMISSIONS & FINANCIAL AID", href: "#pendaftaran" },
    { key: "faculty", label: "OUR FACULTY", href: "#fakultas" },
    { key: "studentlife", label: "STUDENT LIFE", href: "#laboratorium" },
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
        title: "Areas of Study",
        desc: "Temukan peminatan keahlian doktrin dan kemahiran litigasi",
        linkText: "ACADEMICS",
        href: "#akademik",
      },
      columns: [
        {
          heading: "STUDY AT FH UPB",
          links: [
            { label: "Program Sarjana (S.H.) & Magister (M.H.)", href: "#akademik" },
            { label: "Bidang Peminatan & Konsentrasi", href: "#akademik" },
            { label: "Kurikulum & Silabus Perkuliahan", href: "#akademik" },
            { label: "Clinical & Experiential Learning", href: "#laboratorium" },
          ],
        },
        {
          heading: "PROGRAMS AND RESOURCES",
          links: [
            { label: "Kalender Akademik & Agenda", href: "#agenda" },
            { label: "Profil Mahasiswa & Ikatan Alumni", href: "#alumni" },
            { label: "Workshop Perancangan Kontrak & Litigasi", href: "#agenda" },
          ],
        },
        {
          heading: "LIBRARY & RESEARCH",
          links: [
            { label: "Perpustakaan Hukum UPB", href: "#laboratorium" },
            { label: "Pelita Law Review (SINTA 2)", href: "#riset", external: true },
            { label: "Repositori Putusan MK & MA", href: "#riset" },
            { label: "Koleksi Yurisprudensi Nasional", href: "#riset" },
          ],
        },
      ],
    },
    admissions: {
      featured: {
        image: "/images/moot-court.jpg",
        title: "Admissions & Aid",
        desc: "Investasi pendidikan hukum berintegritas tanpa pungli",
        linkText: "APPLY NOW",
        href: "#pendaftaran",
        isAction: true,
      },
      columns: [
        {
          heading: "JALUR PENERIMAAN",
          links: [
            { label: "Sarjana Hukum (S.H.) Reguler Pagi", href: "#pendaftaran" },
            { label: "Sarjana Hukum Kelas Karyawan", href: "#pendaftaran" },
            { label: "Magister Ilmu Hukum (M.H.)", href: "#pendaftaran" },
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
        title: "Our Faculty",
        desc: "Guru Besar, saksi ahli, dan akademisi terkemuka",
        linkText: "FACULTY DIRECTORY",
        href: "#fakultas",
      },
      columns: [
        {
          heading: "DEWAN GURU BESAR",
          links: [
            { label: "Prof. Dr. Hendra Gunawan, S.H., LL.M.", href: "#fakultas" },
            { label: "Prof. Dr. Amaliah Hidayat, S.H., M.H.", href: "#fakultas" },
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
            { label: "Pusat Kajian Konstitusi & HAM", href: "#riset" },
          ],
        },
      ],
    },
    studentlife: {
      featured: {
        image: "/images/alumni-almira.jpg",
        title: "Student Life",
        desc: "Peradilan semu otentik & advokasi keadilan",
        linkText: "EXPLORE CAMPUS",
        href: "#laboratorium",
      },
      columns: [
        {
          heading: "LABORATORIUM PERADILAN",
          links: [
            { label: "Ruang Sidang Utama Moot Court", href: "#laboratorium" },
            { label: "Simulator E-Court Mahkamah Agung", href: "#laboratorium" },
            { label: "Klinik Advokasi & Mediasi KBH", href: "#laboratorium" },
          ],
        },
        {
          heading: "ORGANISASI MAHASISWA",
          links: [
            { label: "Moot Court Society (MCS) UPB", href: "#laboratorium" },
            { label: "Dewan Eksekutif Mahasiswa (DEMA)", href: "#laboratorium" },
            { label: "Klinik Bantuan Hukum Mahasiswa", href: "#laboratorium" },
            { label: "Lembaga Debat Konstitusi", href: "#laboratorium" },
          ],
        },
        {
          heading: "KIPRAH & ALUMNI",
          links: [
            { label: "Delegasi NMCC Tingkat Nasional", href: "#riset" },
            { label: "Ikatan Alumni Fakultas Hukum", href: "#alumni" },
            { label: "Layanan Bantuan Hukum Pro-Bono", href: "#laboratorium" },
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
      className="sticky top-0 z-50 bg-white border-b border-[#E5E1DA] shadow-xs relative"
      onMouseLeave={handleScheduleClose}
    >
      {/* 
        ROW 1: Top Brand & Audience Bar (Exact Yale Law School Layout)
        - Left: Official Law School Crest + Serif Wordmark
        - Right: [User] Info For | Students | Faculty | Staff | Alumni | [Search]
      */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={handleCloseMenuImmediate}
      >
        <div className="flex items-center justify-between h-16 sm:h-20 border-b border-[#F0EDED]">
          {/* Left: Official Law School Crest + Serif Wordmark */}
          <Link
            href="/"
            onClick={handleCloseMenuImmediate}
            className="flex items-center gap-3 sm:gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
          >
            {/* Crest Shield with Scales & Gold Accent */}
            <div className="w-10 h-11 sm:w-11 sm:h-12 border border-[#800000] bg-[#800000] text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[1.75]" />
              <div className="h-0.5 w-5 bg-[#C5A059] mt-0.5" />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#800000] group-hover:text-[#570000] transition-colors leading-tight">
                Fakultas Hukum
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#5C5854] font-medium">
                Universitas Pelita Bangsa
              </span>
            </div>
          </Link>

          {/* Right: Clean Audience Links & Search Icon (Direct Yale Replica) */}
          <div className="hidden lg:flex items-center space-x-7 text-sm">
            {/* Info For group */}
            <div className="flex items-center gap-2 font-semibold text-[#800000]">
              <User className="w-4 h-4 fill-[#800000]" />
              <span>Info For</span>
            </div>

            {/* Audience Direct Text Links (No dots, spacious text) */}
            <div className="flex items-center space-x-6 text-[#1C1B1B]">
              {audienceLinks.map((aud) => (
                <a
                  key={aud.label}
                  href={aud.href}
                  onClick={handleCloseMenuImmediate}
                  className="hover:text-[#800000] transition-colors"
                >
                  {aud.label}
                </a>
              ))}
            </div>

            {/* Clean Bare Search Icon */}
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                handleCloseMenuImmediate();
              }}
              className="p-1.5 text-[#1C1B1B] hover:text-[#800000] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
              aria-label="Buka pencarian wacana dan direktori"
              title="Pencarian"
            >
              <Search className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* Mobile Actions: Search & Hamburger Toggle */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                handleCloseMenuImmediate();
              }}
              className="p-2 text-[#1C1B1B] hover:text-[#800000] transition-colors"
              aria-label="Pencarian"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#800000] hover:bg-[#F8F7F4] transition-colors"
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 
        ROW 2: Main Navigation Bar with Mega-Menu Trigger (Direct Yale Law School Anatomy)
        - Left: STUDY OF LAW | ADMISSIONS & FINANCIAL AID | OUR FACULTY | STUDENT LIFE
        - Right: CENTERS & WORKSHOPS ▶ | NEWS & EVENTS ▼
      */}
      <div
        className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseLeave={handleScheduleClose}
      >
        <div className="flex items-center justify-between h-12">
          {/* Left Primary Nav Links (Mega-menu triggers) */}
          <nav
            className="flex items-center space-x-7 h-full"
            aria-label="Navigasi Utama"
            onMouseLeave={handleScheduleClose}
          >
            {primaryNavItems.map((item) => {
              const isActive = activeMegaMenu === item.key;
              return (
                <div
                  key={item.key}
                  className="h-full flex items-center"
                  onMouseEnter={() => handleOpenMenu(item.key)}
                >
                  <button
                    onClick={() => {
                      clearTimer();
                      setActiveMegaMenu(isActive ? null : item.key);
                    }}
                    onFocus={() => handleOpenMenu(item.key)}
                    className={`text-xs font-bold uppercase tracking-wider transition-colors py-3 relative focus:outline-none ${
                      isActive
                        ? "text-[#570000] underline decoration-2 underline-offset-8"
                        : "text-[#800000] hover:text-[#570000] hover:underline decoration-2 underline-offset-8"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right Secondary Nav Links (Caret items directly matching Yale Law School) */}
          <div className="flex items-center space-x-6 text-xs font-bold uppercase tracking-wider text-[#800000]">
            <a
              href="#laboratorium"
              onMouseEnter={handleCloseMenuImmediate}
              onClick={handleCloseMenuImmediate}
              className="inline-flex items-center gap-1 hover:text-[#570000] transition-colors"
            >
              <span>CENTERS &amp; WORKSHOPS</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </a>

            <span className="text-[#E5E1DA] font-normal">|</span>

            <a
              href="#riset"
              onMouseEnter={handleCloseMenuImmediate}
              onClick={handleCloseMenuImmediate}
              className="inline-flex items-center gap-1 hover:text-[#570000] transition-colors"
            >
              <span>NEWS &amp; EVENTS</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C5A059]" />
            </a>
          </div>
        </div>
      </div>

      {/* 
        MEGA-MENU PANEL (Full Screen Width with Centered 7xl Container)
        - Automatically closes smoothly when cursor leaves or when pointer enters outside areas
      */}
      {activeMegaMenu && megaMenuData[activeMegaMenu] && (
        <>
          {/* Backdrop hit area: the moment pointer moves outside the mega menu into the page or sides, it immediately closes */}
          <div
            className="fixed inset-0 top-[128px] z-40 bg-black/10 backdrop-blur-[0.5px] transition-opacity"
            onMouseEnter={handleCloseMenuImmediate}
            onClick={handleCloseMenuImmediate}
            aria-hidden="true"
          />

          <div
            className="absolute top-full left-0 right-0 w-full bg-white border-b border-[#E5E1DA] shadow-xl z-50 animate-fadeIn"
            onMouseEnter={clearTimer}
            onMouseLeave={handleScheduleClose}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch gap-8 lg:gap-10">
              {/* Column 1: Featured Image Callout Card (Full-height from top to bottom edge, exact Yale structure) */}
              <div className="w-72 shrink-0 bg-[#800000] text-white flex flex-col justify-between overflow-hidden shadow-xs">
                <div className="relative h-32 sm:h-36 w-full overflow-hidden shrink-0">
                  <Image
                    src={megaMenuData[activeMegaMenu].featured.image}
                    alt={megaMenuData[activeMegaMenu].featured.title}
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#570000] via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white mb-1.5 leading-snug">
                      {megaMenuData[activeMegaMenu].featured.title}
                    </h4>
                    <p className="text-xs text-[#E8D8B0] leading-snug font-light mb-3">
                      {megaMenuData[activeMegaMenu].featured.desc}
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href={megaMenuData[activeMegaMenu].featured.href}
                      onClick={() =>
                        handleLinkClick(
                          megaMenuData[activeMegaMenu].featured.href,
                          megaMenuData[activeMegaMenu].featured.isAction
                        )
                      }
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white hover:text-[#C5A059] transition-colors border-b border-white/60 pb-0.5 hover:border-[#C5A059] group"
                    >
                      <span>{megaMenuData[activeMegaMenu].featured.linkText}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Columns 2, 3, 4: Content Link Columns (3 equal columns with comfortable vertical padding) */}
              <div className="flex-1 grid grid-cols-3 gap-6 py-6 sm:py-7">
                {megaMenuData[activeMegaMenu].columns.map((col, idx) => (
                  <div key={idx} className="flex flex-col space-y-2">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#5C5854] mb-1">
                      {col.heading}
                    </h5>
                    <ul className="space-y-2">
                      {col.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <a
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            onClick={() => handleLinkClick(link.href, link.isAction)}
                            className="text-xs font-medium text-[#1C1B1B] hover:text-[#800000] hover:underline decoration-1 underline-offset-4 transition-colors inline-flex items-center gap-1 leading-snug group"
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
        </>
      )}

      {/* Interactive Search Bar Drawer */}
      {searchOpen && (
        <div className="border-t border-[#E5E1DA] bg-[#F8F7F4] px-4 py-4 sm:px-8 shadow-inner animate-fadeIn">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-[#800000] shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kurikulum, nama dosen, putusan, jurnal atau wacana hukum..."
              className="w-full bg-white border border-[#E5E1DA] px-4 py-2 text-xs sm:text-sm text-[#1C1B1B] focus:outline-none focus:border-[#800000]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#5C5854] hover:text-[#1C1B1B]"
                aria-label="Bersihkan pencarian"
              >
                Reset
              </button>
            )}
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 text-[#5C5854] hover:text-[#1C1B1B]"
              aria-label="Tutup pencarian"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {searchQuery.trim().length > 0 && (
            <div className="max-w-3xl mx-auto mt-3 pt-3 border-t border-[#E5E1DA] text-xs text-[#5C5854]">
              <p className="font-semibold text-[#800000] mb-1">Hasil Pencarian Cepat:</p>
              <div className="space-y-1">
                <a href="#akademik" onClick={() => setSearchOpen(false)} className="block py-1 hover:underline hover:text-[#800000]">
                  &bull; Program Sarjana Hukum (S.H.) &amp; Magister Hukum (M.H.)
                </a>
                <a href="#riset" onClick={() => setSearchOpen(false)} className="block py-1 hover:underline hover:text-[#800000]">
                  &bull; Publikasi Jurnal Ilmiah Pelita Law Review &amp; Wacana Putusan MK
                </a>
                <a href="#fakultas" onClick={() => setSearchOpen(false)} className="block py-1 hover:underline hover:text-[#800000]">
                  &bull; Direktori Dewan Guru Besar &amp; Saksi Ahli
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E1DA] shadow-xl px-6 pt-4 pb-6">
          <nav className="flex flex-col space-y-3" aria-label="Navigasi Menu Mobile">
            {/* Primary Nav Items */}
            {primaryNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-bold text-[#800000] uppercase tracking-wider border-b border-[#F0EDED] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#C5A059]" />
              </a>
            ))}

            {/* Secondary Nav Items */}
            <a
              href="#laboratorium"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-sm font-bold text-[#800000] uppercase tracking-wider border-b border-[#F0EDED] flex items-center justify-between"
            >
              <span>CENTERS &amp; WORKSHOPS</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </a>

            <a
              href="#riset"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-sm font-bold text-[#800000] uppercase tracking-wider border-b border-[#F0EDED] flex items-center justify-between"
            >
              <span>NEWS &amp; EVENTS</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C5A059]" />
            </a>

            {/* Audience Links */}
            <div className="pt-3 pb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C5854] block mb-2">
                Info For:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {audienceLinks.map((aud) => (
                  <a
                    key={aud.label}
                    href={aud.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-[#F8F7F4] border border-[#E5E1DA] text-[#1C1B1B] hover:text-[#800000] font-medium"
                  >
                    {aud.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdmission) onOpenAdmission();
                }}
                className="w-full py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000] transition-colors"
              >
                Pendaftaran Mahasiswa Baru
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
