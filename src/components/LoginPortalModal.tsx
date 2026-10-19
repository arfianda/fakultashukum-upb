"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  X,
  Building2,
  FileText,
  Lock,
  Sparkles,
} from "lucide-react";

interface LoginPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginPortalModal({ isOpen, onClose }: LoginPortalModalProps) {
  // Accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const portals = [
    {
      role: "Mahasiswa",
      tag: "SIVITAS AKADEMIK",
      badgeColor: "bg-[#710912]/10 text-[#710912] border-[#710912]/20",
      icon: GraduationCap,
      title: "Portal Mahasiswa",
      subtitle: "SIAKAD & Pembelajaran Daring",
      description:
        "Akses pengisian Kartu Rencana Studi (KRS), perolehan nilai KHS, transkrip nilai, jadwal kuliah, serta ruang kelas virtual EdLink.",
      primaryAction: {
        label: "Masuk SIAKAD Mahasiswa",
        href: "https://siakad.pelitabangsa.ac.id",
        isExternal: true,
      },
      secondaryLinks: [
        { label: "EdLink LMS Virtual", href: "https://edlink.id", isExternal: true },
        { label: "Perpustakaan Digital (E-Library)", href: "https://perpustakaan.pelitabangsa.ac.id", isExternal: true },
      ],
    },
    {
      role: "Dosen & Pengajar",
      tag: "TENAGA PENDIDIK",
      badgeColor: "bg-[#710912]/10 text-[#710912] border-[#710912]/20",
      icon: BookOpen,
      title: "Portal Dosen",
      subtitle: "SIAKAD Dosen, BKD & SINTA",
      description:
        "Input presensi mengajar, penilaian UTS/UAS, bimbingan akademik mahasiswa, serta sinkronisasi riset SINTA dan pelaporan BKD SISTER.",
      primaryAction: {
        label: "Masuk SIAKAD Dosen",
        href: "https://siakad.pelitabangsa.ac.id",
        isExternal: true,
      },
      secondaryLinks: [
        { label: "SISTER Kemdikbud (BKD)", href: "https://sister.kemdikbud.go.id", isExternal: true },
        { label: "SINTA Riset & Jurnal", href: "https://sinta.kemdikbud.go.id", isExternal: true },
      ],
    },
    {
      role: "Admin & Staf",
      tag: "PENGELOLA KONTEN & DEKANAT",
      badgeColor: "bg-[#710912] text-white border-[#710912]",
      icon: ShieldCheck,
      title: "Admin & Staf Dekanat",
      subtitle: "CMS Fakultas & Layanan Tata Usaha",
      description:
        "Panel kontrol administrator untuk mengelola berita fakultas, agenda kegiatan hukum, data dosen, verifikasi konsultasi KLBH, dan persuratan dinas.",
      primaryAction: {
        label: "Masuk Panel Admin CMS",
        href: "/admin/login",
        isExternal: false,
      },
      secondaryLinks: [
        { label: "SIMPEG Kepegawaian UPB", href: "https://simpeg.pelitabangsa.ac.id", isExternal: true },
        { label: "E-Office Persuratan Dekanat", href: "https://eoffice.pelitabangsa.ac.id", isExternal: true },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0D0D0D]/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.28)] border border-[#E2D9C8] overflow-hidden my-auto z-10"
          >
            {/* Header with UPB Editorial Styling */}
            <div className="relative bg-[#FAF7F2] border-b border-[#E2D9C8] px-6 sm:px-8 pt-7 pb-6">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-[#544942] hover:text-[#0D0D0D] hover:bg-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#710912]"
                aria-label="Tutup dialog login"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#710912]/8 text-[#710912] border border-[#710912]/15 text-[10px] font-bold uppercase tracking-wider mb-2">
                  <Lock className="w-3 h-3" />
                  <span>SISTEM LOGIN TERPADU &bull; SIVITAS FH UPB</span>
                </div>
                <h2
                  id="login-modal-title"
                  className="font-serif text-2xl sm:text-3xl text-[#0D0D0D] font-normal leading-tight tracking-tight"
                >
                  Pintu Masuk Sivitas Akademika
                </h2>
                <p className="text-xs sm:text-sm text-[#544942] font-light mt-1.5 leading-relaxed">
                  Pilih portal layanan resmi sesuai peran Anda di lingkungan Fakultas Hukum Universitas Pelita Bangsa.
                </p>
              </div>
            </div>

            {/* Portals Grid (3 Columns) */}
            <div className="p-6 sm:p-8 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {portals.map((portal, idx) => {
                  const Icon = portal.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col justify-between rounded-2xl border border-[#E2D9C8] bg-[#FAF7F2]/60 hover:bg-white hover:border-[#710912]/50 hover:shadow-lg transition-all duration-300 p-5 sm:p-6 group"
                    >
                      <div>
                        {/* Top Badge & Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${portal.badgeColor}`}
                          >
                            {portal.tag}
                          </span>
                          <div className="w-9 h-9 rounded-xl bg-white border border-[#E2D9C8] flex items-center justify-center text-[#710912] group-hover:bg-[#710912] group-hover:text-white transition-colors shadow-xs">
                            <Icon className="w-4 h-4 stroke-[2]" />
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-serif text-lg font-bold text-[#0D0D0D] mb-0.5 leading-snug group-hover:text-[#710912] transition-colors">
                          {portal.title}
                        </h3>
                        <p className="text-[11px] font-semibold text-[#8A6E67] uppercase tracking-wider mb-2.5">
                          {portal.subtitle}
                        </p>
                        <p className="text-xs text-[#544942] font-light leading-relaxed mb-4">
                          {portal.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-[#E2D9C8]/80 space-y-3">
                        {portal.primaryAction.isExternal ? (
                          <a
                            href={portal.primaryAction.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#710912] hover:bg-[#48060B] text-white text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer text-center"
                          >
                            <span>{portal.primaryAction.label}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <Link
                            href={portal.primaryAction.href}
                            onClick={onClose}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#710912] hover:bg-[#48060B] text-white text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer text-center"
                          >
                            <span>{portal.primaryAction.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}

                        {/* Secondary Quick Links */}
                        <div className="space-y-1 pt-1">
                          {portal.secondaryLinks.map((sLink, sIdx) => (
                            <a
                              key={sIdx}
                              href={sLink.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-[#544942] hover:text-[#710912] hover:underline flex items-center justify-between py-1 transition-colors"
                            >
                              <span>{sLink.label}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Footer Note (PMB Prospective Student Link) */}
            <div className="bg-[#FAF7F2] border-t border-[#E2D9C8] px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#544942]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C28D39] shrink-0" />
                <span>
                  Belum memiliki akun sivitas? Calon mahasiswa baru dapat mendaftar langsung di portal seleksi.
                </span>
              </div>
              <a
                href="https://pelitabangsa.siakadcloud.com/spmbfront/jalur-seleksi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="font-semibold text-[#710912] hover:text-[#48060B] hover:underline whitespace-nowrap inline-flex items-center gap-1"
              >
                <span>Daftar Seleksi PMB 2026/2027</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
