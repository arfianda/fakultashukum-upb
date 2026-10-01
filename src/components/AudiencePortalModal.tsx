"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Building,
  Users,
  ExternalLink,
  ArrowRight,
  X,
  Scale,
  ShieldCheck,
  FileText,
  Library,
  Briefcase,
  HelpCircle,
  Award,
} from "lucide-react";

export type AudienceType = "mahasiswa" | "dosen" | "staf" | "alumni";

interface AudiencePortalModalProps {
  isOpen: boolean;
  initialTab?: AudienceType;
  onClose: () => void;
  onNavigateAnchor?: (hash: string) => void;
}

interface PortalServiceItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  isExternal?: boolean;
  anchor?: string;
  actionText: string;
}

export function AudiencePortalModal({
  isOpen,
  initialTab = "mahasiswa",
  onClose,
  onNavigateAnchor,
}: AudiencePortalModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AudienceType>(initialTab);
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);

  if (initialTab !== prevInitialTab) {
    setPrevInitialTab(initialTab);
    setActiveTab(initialTab);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const tabConfigs: Record<
    AudienceType,
    {
      title: string;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      description: string;
      services: PortalServiceItem[];
    }
  > = {
    mahasiswa: {
      title: "Portal Layanan Mahasiswa",
      label: "Mahasiswa",
      icon: GraduationCap,
      description:
        "Akses cepat sistem informasi akademik, perkuliahan daring, administrasi perkuliahan, dan kemahiran beracara di pengadilan semu.",
      services: [
        {
          id: "siakad-mhs",
          badge: "Sistem Utama",
          title: "SIAKAD UPB",
          subtitle: "Sistem Informasi Akademik",
          description:
            "Pengisian Kartu Rencana Studi (KRS), pengecekan nilai KHS, riwayat transkrip akademik, dan jadwal perkuliahan.",
          icon: FileText,
          href: "https://siakad.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Buka SIAKAD",
        },
        {
          id: "edlink-mhs",
          badge: "E-Learning LMS",
          title: "EdLink UPB",
          subtitle: "Ruang Perkuliahan Digital",
          description:
            "Unduh materi kuliah dosen, diskusi forum kelas hukum, kuis daring, dan pengumpulan tugas perkuliahan terintegrasi.",
          icon: BookOpen,
          href: "https://edlink.id",
          isExternal: true,
          actionText: "Akses EdLink",
        },
        {
          id: "elibrary-mhs",
          badge: "E-Library & Repositori",
          title: "Perpustakaan Digital FH",
          subtitle: "Katalog Literatur & Skripsi",
          description:
            "Akses ribuan buku teks hukum, jurnal yurisprudensi nasional, putusan Mahkamah Konstitusi/Agung, dan repositori skripsi.",
          icon: Library,
          href: "https://perpustakaan.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Kunjungi E-Library",
        },
        {
          id: "moot-court-mhs",
          badge: "Laboratorium Sidang",
          title: "Peradilan Semu & Klinik Hukum",
          subtitle: "Praktik Sidang & Klinik Hukum",
          description:
            "Jadwal persidangan semu, bimbingan berkas perkara perdata/pidana, serta kegiatan delegasi lomba nasional NMCC.",
          icon: Scale,
          href: "/pusat-studi/laboratorium-peradilan-semu",
          actionText: "Jelajahi Fasilitas Sidang",
        },
        {
          id: "baak-mhs",
          badge: "Pelayanan BAAK",
          title: "Layanan Administrasi BAAK",
          subtitle: "Biro Administrasi Akademik",
          description:
            "Permohonan surat keterangan aktif kuliah, izin dispensasi, permohonan cuti akademik, dan berkas wisuda sarjana.",
          icon: ShieldCheck,
          href: "https://baak.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Portal BAAK",
        },
        {
          id: "beasiswa-mhs",
          badge: "Finansial & Bantuan",
          title: "Beasiswa & Bantuan Biaya",
          subtitle: "Prestasi, Tahfiz & Kemitraan",
          description:
            "Informasi beasiswa prestasi akademik IPK ≥ 3.75, tahfiz Al-Qur'an 10+ Juz, dan skema angsuran biaya pendidikan bebas uang gedung.",
          icon: Award,
          href: "/penerimaan/beasiswa",
          actionText: "Info Beasiswa",
        },
      ],
    },
    dosen: {
      title: "Portal Layanan Dosen & Pengajar",
      label: "Dosen",
      icon: Award,
      description:
        "Pusat administrasi pengajaran, pelaporan Beban Kerja Dosen (BKD), manajemen riset publikasi, dan pembimbingan akademik.",
      services: [
        {
          id: "siakad-dosen",
          badge: "Administrasi Pengajaran",
          title: "SIAKAD Dosen UPB",
          subtitle: "Presensi & Nilai Semester",
          description:
            "Pengisian presensi mengajar perkuliahan, input nilai UTS & UAS mahasiswa, serta persetujuan KRS mahasiswa bimbingan.",
          icon: FileText,
          href: "https://siakad.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Buka SIAKAD Dosen",
        },
        {
          id: "edlink-dosen",
          badge: "LMS Pengajar",
          title: "EdLink Pengajar",
          subtitle: "Manajemen Silabus & Modul",
          description:
            "Unggah rencana pembelajaran semester (RPS), distribusi materi bahan ajar digital, serta evaluasi penugasan mahasiswa.",
          icon: BookOpen,
          href: "https://edlink.id",
          isExternal: true,
          actionText: "Kelola Kelas EdLink",
        },
        {
          id: "sinta-dosen",
          badge: "Riset & Sitasi",
          title: "SINTA Kemdikbudristek",
          subtitle: "Science and Technology Index",
          description:
            "Sinkronisasi profil peneliti dosen, pemantauan skor H-Index, rekam jejak publikasi jurnal bereputasi Scopus/SINTA.",
          icon: Library,
          href: "https://sinta.kemdikbud.go.id",
          isExternal: true,
          actionText: "Akses SINTA",
        },
        {
          id: "sister-dosen",
          badge: "Karir Dosen",
          title: "SISTER Kemdikbud",
          subtitle: "BKD, Serdos & Jafung",
          description:
            "Pelaporan Beban Kerja Dosen (BKD) per semester, pengajuan sertifikasi dosen (Serdos), dan kenaikan jabatan fungsional Lektor/Guru Besar.",
          icon: ShieldCheck,
          href: "https://sister.kemdikbud.go.id",
          isExternal: true,
          actionText: "Portal SISTER",
        },
        {
          id: "journal-dosen",
          badge: "Jurnal SINTA 2",
          title: "Pelita Law Review (OJS)",
          subtitle: "Portal Pengelolaan Jurnal",
          description:
            "Pengajuan naskah ilmiah, manajemen peer-review mitra bestari, dan penerbitan berkala artikel kajian hukum nasional.",
          icon: Scale,
          href: "https://journal.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Buka Law Review",
        },
        {
          id: "direktori-dosen",
          badge: "Profil Akademik",
          title: "Direktori Dewan Guru Besar",
          subtitle: "Daftar Dosen & Saksi Ahli",
          description:
            "Lihat profil publik kepakaran, riwayat pendidikan hukum, dan kontak riset Dewan Guru Besar Fakultas Hukum di website.",
          icon: Users,
          href: "/dosen",
          actionText: "Lihat Direktori Dosen",
        },
      ],
    },
    staf: {
      title: "Portal Layanan Tenaga Kependidikan (Tendik / Staf)",
      label: "Staf",
      icon: Building,
      description:
        "Sistem kepegawaian internal, administrasi tata usaha persuratan, peminjaman sarana sidang, dan manajemen penjaminan mutu.",
      services: [
        {
          id: "simpeg-staf",
          badge: "Kepegawaian",
          title: "SIMPEG UPB",
          subtitle: "Sistem Informasi Manajemen Pegawai",
          description:
            "Presensi kehadiran digital biometrik/lokasi kerja staf, pengajuan cuti tahunan, dan berkas kepegawaian universitas.",
          icon: ShieldCheck,
          href: "https://simpeg.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Buka SIMPEG",
        },
        {
          id: "eoffice-staf",
          badge: "Tata Usaha & Persuratan",
          title: "E-Office & Surat Dinas",
          subtitle: "Manajemen Dokumen Fakultas",
          description:
            "Penerbitan surat dinas dekanat, disposisi surat masuk/keluar, legalisasi dokumen, dan pengarsipan berkas akreditasi.",
          icon: FileText,
          href: "https://eoffice.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Akses E-Office",
        },
        {
          id: "sarana-staf",
          badge: "Sarana & Prasarana",
          title: "Manajemen Fasilitas Sidang",
          subtitle: "Penjadwalan Ruang Sidang & Lab",
          description:
            "Pemesanan dan pemeliharaan ruang sidang peradilan semu (Moot Court), auditorium, perlengkapan sidang elektronik, dan studio klinis.",
          icon: Scale,
          href: "/pusat-studi/laboratorium-peradilan-semu",
          actionText: "Cek Fasilitas Sidang",
        },
        {
          id: "bpm-staf",
          badge: "Penjaminan Mutu",
          title: "Badan Penjaminan Mutu (BPM)",
          subtitle: "Akreditasi & Audit Mutu Internal",
          description:
            "Pengisian instrumen akreditasi program studi hukum, audit mutu akademik internal (AMAI), dan kepatuhan standar SPMI.",
          icon: Library,
          href: "https://bpm.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Portal BPM",
        },
        {
          id: "cms-admin",
          badge: "Pengelola Web",
          title: "Panel CMS Administrator",
          subtitle: "Manajemen Berita & Konten",
          description:
            "Akses kontrol panel pengelolaan publikasi warta fakultas hukum, agenda seminar akademik, dan direktori dewan dosen.",
          icon: Briefcase,
          href: "/admin",
          actionText: "Buka Portal Admin",
        },
      ],
    },
    alumni: {
      title: "Portal Ikatan Keluarga Alumni (IKA FH UPB)",
      label: "Alumni",
      icon: Users,
      description:
        "Jejaring ribuan praktisi hukum lulusan FH UPB, survei pelacakan lulusan (Tracer Study), layanan legalisir berkas, dan bursa karir advokat.",
      services: [
        {
          id: "tracer-alumni",
          badge: "Wajib Akreditasi",
          title: "Tracer Study Alumni",
          subtitle: "Pelacakan Karir Lulusan Hukum",
          description:
            "Kuesioner penelusuran masa tunggu kerja, relevansi kurikulum, dan capaian profesi advokat/hakim/in-house counsel lulusan.",
          icon: FileText,
          href: "https://tracerstudy.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Isi Tracer Study",
        },
        {
          id: "legalisir-alumni",
          badge: "Layanan Dokumen",
          title: "Legalisir Ijazah & Transkrip",
          subtitle: "Layanan Permohonan Daring",
          description:
            "Permohonan legalisir ijazah Sarjana Hukum berstempel basah atau ber-barcode verifikasi digital untuk keperluan ujian profesi advokat atau CPNS.",
          icon: ShieldCheck,
          href: "https://baak.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Ajukan Legalisir",
        },
        {
          id: "ika-alumni",
          badge: "Jejaring Alumni",
          title: "Kiprah & Jaringan Alumni",
          subtitle: "Ikatan Alumni Fakultas Hukum",
          description:
            "Simak profil rekam jejak lulusan di Mahkamah Agung, Kejaksaan, Law Firm terkemuka, dan korporasi kawasan industri.",
          icon: Award,
          href: "/tentang/alumni",
          actionText: "Lihat Kiprah Alumni",
        },
        {
          id: "career-alumni",
          badge: "Pusat Karir",
          title: "Bursa Lowongan Karir Hukum",
          subtitle: "Pusat Karir & Kemitraan UPB",
          description:
            "Informasi lowongan kerja legal officer, associate advokat di mitra law firm, serta rekrutmen BUMN dan instansi kementerian.",
          icon: Briefcase,
          href: "https://career.pelitabangsa.ac.id",
          isExternal: true,
          actionText: "Cek Lowongan Karir",
        },
      ],
    },
  };

  const currentTabConfig = tabConfigs[activeTab];

  const handleAction = (item: PortalServiceItem) => {
    if (item.href) {
      if (item.isExternal) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        onClose();
        router.push(item.href);
      }
    } else if (item.anchor) {
      onClose();
      if (onNavigateAnchor) {
        onNavigateAnchor(item.anchor);
      } else {
        const el = document.querySelector(item.anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="audience-modal-title"
        >
          {/* Dark Academic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Dialog Content Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#F8F7F4] border border-[#E5E1DA] shadow-2xl w-full max-w-4xl my-8 z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header with Academic Branding */}
            <div className="bg-[#800000] text-white px-6 sm:px-8 py-5 border-b border-[#570000] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-11 border border-white/25 bg-[#570000] flex flex-col items-center justify-center shrink-0">
                  <Scale className="w-5 h-5 text-white stroke-[1.75]" />
                  <div className="h-0.5 w-5 bg-[#C5A059] mt-0.5" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#E8D8B0] font-semibold">
                    Fakultas Hukum Universitas Pelita Bangsa
                  </p>
                  <h2 id="audience-modal-title" className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                    Portal Informasi &amp; Layanan Terpadu
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Tutup jendela portal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Audience Tab Navigation Bar */}
            <div className="bg-white border-b border-[#E5E1DA] px-6 sm:px-8 flex flex-wrap gap-2 pt-3 shrink-0">
              {(["mahasiswa", "dosen", "staf", "alumni"] as AudienceType[]).map((tabKey) => {
                const tab = tabConfigs[tabKey];
                const Icon = tab.icon;
                const isActive = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all border-b-2 -mb-[2px] ${
                      isActive
                        ? "border-[#800000] text-[#800000] bg-[#F8F7F4]/80"
                        : "border-transparent text-[#5C5854] hover:text-[#1C1B1B] hover:border-[#E5E1DA]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#800000]" : "text-[#5C5854]"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Header & Services with Animated Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex-1 flex flex-col min-h-0 overflow-hidden"
              >
                {/* Tab Header Description */}
                <div className="px-6 sm:px-8 pt-5 pb-3 border-b border-[#E5E1DA]/60 bg-white/50 shrink-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1C1B1B] font-bold">
                        {currentTabConfig.title}
                      </h3>
                      <p className="text-xs text-[#5C5854] mt-1 leading-relaxed max-w-2xl font-light">
                        {currentTabConfig.description}
                      </p>
                    </div>
                    <span className="self-start sm:self-center text-[10px] font-bold uppercase tracking-wider text-[#800000] bg-[#800000]/10 border border-[#800000]/20 px-2.5 py-1">
                      {currentTabConfig.services.length} Layanan Tersedia
                    </span>
                  </div>
                </div>

                {/* Scrollable Services Grid */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentTabConfig.services.map((svc) => {
                      const Icon = svc.icon;
                      return (
                        <div
                          key={svc.id}
                          className="bg-white border border-[#E5E1DA] hover:border-[#800000] transition-colors p-5 flex flex-col justify-between group shadow-2xs"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-9 h-9 border border-[#800000]/20 bg-[#F8F7F4] flex items-center justify-center text-[#800000] group-hover:bg-[#800000] group-hover:text-white transition-colors">
                                <Icon className="w-4 h-4 stroke-[1.75]" />
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F8F7F4] border border-[#E5E1DA] text-[#5C5854]">
                                {svc.badge}
                              </span>
                            </div>

                            <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1B1B] group-hover:text-[#800000] transition-colors leading-snug">
                              {svc.title}
                            </h4>
                            <p className="text-[11px] font-medium text-[#C5A059] mb-2 uppercase tracking-wide">
                              {svc.subtitle}
                            </p>
                            <p className="text-xs text-[#5C5854] leading-relaxed mb-4 font-light">
                              {svc.description}
                            </p>
                          </div>

                          <button
                            onClick={() => handleAction(svc)}
                            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold uppercase tracking-wider bg-[#F8F7F4] hover:bg-[#800000] text-[#1C1B1B] hover:text-white border border-[#E5E1DA] hover:border-[#800000] transition-all cursor-pointer"
                          >
                            <span>{svc.actionText}</span>
                            {svc.isExternal ? (
                              <ExternalLink className="w-3.5 h-3.5" />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Footer Technical Support Notice */}
            <div className="bg-[#EFECE6] border-t border-[#E5E1DA] px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#5C5854] shrink-0">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#800000] shrink-0" />
                <span>
                  Kendala akses akun SIAKAD / Edlink? Hubungi <strong>Helpdesk BAAK &amp; Biro ICT UPB</strong>
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-medium text-[#800000]">
                <span>Senin - Sabtu (08:00 - 17:00 WIB)</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
