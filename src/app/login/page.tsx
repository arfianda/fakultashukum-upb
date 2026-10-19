"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  ArrowLeft,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Building2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  X,
} from "lucide-react";

type DetectedRole = "mahasiswa" | "dosen" | "admin" | "superadmin" | "unknown";

export default function UniversalLoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Dynamic Smart Role Detection
  const detectedRole = useMemo<DetectedRole>(() => {
    const trimmed = identifier.trim().toLowerCase();
    if (!trimmed) return "unknown";

    if (trimmed === "superadmin") {
      return "superadmin";
    }
    if (trimmed.includes("admin") || trimmed.includes("dekanat") || trimmed.includes("hukum")) {
      return "admin";
    }
    if (trimmed.includes("dosen") || (trimmed.startsWith("04") && /^\d+$/.test(trimmed)) || (trimmed.startsWith("00") && /^\d+$/.test(trimmed))) {
      return "dosen";
    }
    if (trimmed.includes("mahasiswa") || /^\d+$/.test(trimmed)) {
      return "mahasiswa";
    }
    return "unknown";
  }, [identifier]);

  // Handle Quick Demo Fill
  const handleQuickFill = (role: "superadmin" | "admin" | "dosen" | "mahasiswa") => {
    setErrorMessage("");
    if (role === "superadmin") {
      setIdentifier("superadmin");
      setPassword("admin123");
    } else if (role === "admin") {
      setIdentifier("admin.hukum");
      setPassword("hukum123");
    } else if (role === "dosen") {
      setIdentifier("dosen");
      setPassword("dosen123");
    } else if (role === "mahasiswa") {
      setIdentifier("mahasiswa");
      setPassword("mahasiswa123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const cleanId = identifier.trim();

    try {
      const res = await signIn("credentials", {
        username: cleanId,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Identitas akun atau kata sandi tidak cocok. Silakan periksa kembali.");
      } else {
        // Redirection based on role detection
        if (cleanId === "superadmin" || cleanId === "admin" || cleanId.includes("admin")) {
          router.push("/admin");
        } else if (cleanId === "0412088501" || cleanId.includes("dosen")) {
          router.push("/dosen");
        } else if (cleanId === "312210045" || cleanId.includes("mahasiswa")) {
          router.push("/kehidupan-mahasiswa");
        } else {
          router.push("/admin");
        }
        router.refresh();
      }
    } catch {
      // Local fallback handler
      if (
        ((cleanId === "superadmin" || cleanId === "admin") && password === "admin123") ||
        (cleanId === "admin.hukum" && (password === "hukum123" || password === "admin123"))
      ) {
        router.push("/admin");
      } else if ((cleanId === "0412088501" || cleanId === "dosen") && password === "dosen123") {
        router.push("/dosen");
      } else if ((cleanId === "312210045" || cleanId === "mahasiswa") && password === "mahasiswa123") {
        router.push("/kehidupan-mahasiswa");
      } else {
        setErrorMessage("Kredensial tidak valid. Silakan coba kredensial demo di bawah.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0D0D0D] font-sans flex flex-col lg:grid lg:grid-cols-12 selection:bg-[#710912] selection:text-white">
      {/* LEFT COLUMN: Editorial Academic Gravitas & Campus Pillars */}
      <div className="relative hidden lg:flex lg:col-span-5 xl:col-span-5 bg-[#48060B] text-white flex-col justify-between p-10 xl:p-14 overflow-hidden border-r border-[#E2D9C8]">
        {/* Background Atmosphere Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-library.jpg"
            alt="Perpustakaan & Ruang Sidang Semu FH UPB"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center opacity-30 mix-blend-luminosity filter brightness-75 contrast-125"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C0307] via-[#48060B]/90 to-[#710912]/80" />
        </div>

        {/* Top: Return to Public Web Link */}
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EFE5D2] hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Beranda Publik</span>
          </Link>
        </div>

        {/* Center: Legal Maxim & Institution Pillars */}
        <div className="relative z-10 my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[#EFE5D2] text-[11px] font-semibold tracking-wider uppercase mb-6 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#EFE5D2]" />
            <span>Integritas &bull; Yurisprudensi &bull; Keadilan</span>
          </div>

          <h1 className="font-serif text-3xl xl:text-4xl font-bold leading-tight text-white mb-4">
            Ekosistem Akademik &amp; Kemahiran Litigasi
          </h1>

          <blockquote className="font-serif italic text-sm xl:text-base text-[#EFE5D2]/90 leading-relaxed mb-8 border-l-2 border-[#EFE5D2]/40 pl-4">
            &ldquo;Iustitia est constans et perpetua voluntas ius suum cuique tribuendi.&rdquo;
            <span className="block not-italic text-[11px] font-sans uppercase tracking-widest text-[#EFE5D2]/60 mt-2 font-normal">
              — Ulpianus &bull; Digestum Iustiniani
            </span>
          </blockquote>

          <div className="space-y-3 pt-6 border-t border-white/15 text-xs text-[#EFE5D2]/80 font-light">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#EFE5D2] shrink-0 mt-0.5" />
              <span>Simulasi Sidang Nyata di Laboratorium Peradilan Semu Standar Mahkamah Agung.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#EFE5D2] shrink-0 mt-0.5" />
              <span>Hukum Kontrak Bisnis &amp; Industri Terbesar Se-Asia Tenggara di Koridor Cikarang.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#EFE5D2] shrink-0 mt-0.5" />
              <span>Layanan Advokasi Pro-Bono Masyarakat di Klinik Bantuan Hukum (KLBH).</span>
            </div>
          </div>
        </div>

        {/* Bottom: Institutional Security Credentials */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-[#EFE5D2]/60">
          <span>Enkripsi Sesi TLS 256-Bit</span>
          <span>Universitas Pelita Bangsa</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Universal Login Form */}
      <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-14 xl:px-20 py-12">
        {/* Mobile top navigation link */}
        <div className="lg:hidden mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#710912] hover:text-[#48060B]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="max-w-lg w-full mx-auto">
          {/* Header Brand */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-full bg-white p-1.5 flex items-center justify-center shrink-0 shadow-xs border border-[#E2D9C8]">
              <Image
                src="/images/logo-upb.png"
                alt="Logo Resmi Universitas Pelita Bangsa"
                width={48}
                height={48}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0D0D0D] block leading-none">
                Fakultas Hukum
              </span>
              <span className="text-[11px] font-sans tracking-widest uppercase font-semibold text-[#710912] mt-1 block">
                Universitas Pelita Bangsa
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight mb-2">
              Pintu Masuk Terpadu
            </h2>
            <p className="text-xs sm:text-sm text-[#544942] leading-relaxed">
              Autentikasi resmi untuk <strong>Mahasiswa</strong>, <strong>Dosen</strong>, <strong>Admin Hukum</strong>, dan <strong>Superadmin</strong>. Sistem otomatis menyesuaikan akses portal berdasarkan kredensial Anda.
            </p>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block mb-0.5">Autentikasi Gagal</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Identifier Field (NIM / NIDN / Username) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="identifier"
                  className="block text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider"
                >
                  Nomor Induk / Nama Pengguna
                </label>

                {/* Smart Role Detection Badge */}
                {detectedRole !== "unknown" && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                      detectedRole === "superadmin"
                        ? "bg-purple-100 text-purple-900 border border-purple-200"
                        : detectedRole === "admin"
                        ? "bg-[#710912]/10 text-[#710912] border border-[#710912]/20"
                        : detectedRole === "dosen"
                        ? "bg-amber-100 text-amber-900 border border-amber-200"
                        : "bg-blue-100 text-blue-900 border border-blue-200"
                    }`}
                  >
                    {detectedRole === "superadmin" && <ShieldCheck className="w-3 h-3" />}
                    {detectedRole === "admin" && <Building2 className="w-3 h-3" />}
                    {detectedRole === "dosen" && <BookOpen className="w-3 h-3" />}
                    {detectedRole === "mahasiswa" && <GraduationCap className="w-3 h-3" />}
                    <span>
                      {detectedRole === "superadmin" && "Superadmin"}
                      {detectedRole === "admin" && "Admin Dekanat"}
                      {detectedRole === "dosen" && "Dosen (NIDN)"}
                      {detectedRole === "mahasiswa" && "Mahasiswa (NIM)"}
                    </span>
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="NIM mahasiswa, NIDN dosen, atau username"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-[#E2D9C8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#710912] focus:border-transparent transition-all placeholder:text-[#9C8F85]"
                />
                <User className="w-4 h-4 text-[#73655D] absolute left-3.5 top-3.5" />
              </div>
              <p className="mt-1.5 text-[11px] text-[#73655D]">
                Format: 9 digit NIM untuk Mahasiswa &bull; 10 digit NIDN untuk Dosen &bull; Username untuk Admin
              </p>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider"
                >
                  Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() => setIsHelpOpen(true)}
                  className="text-xs font-semibold text-[#710912] hover:text-[#48060B] transition-colors"
                >
                  Lupa Sandi?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm bg-white border border-[#E2D9C8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#710912] focus:border-transparent transition-all placeholder:text-[#9C8F85]"
                />
                <Lock className="w-4 h-4 text-[#73655D] absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#73655D] hover:text-[#0D0D0D] transition-colors p-0.5"
                  aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#710912] focus:ring-[#710912] border-[#E2D9C8]"
                />
                <span className="text-xs text-[#544942]">Ingat sesi ini di perangkat ini</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#710912] hover:bg-[#48060B] text-white font-semibold text-sm transition-all duration-200 shadow-sm shadow-[#710912]/20 hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memverifikasi Akun...</span>
                </>
              ) : (
                <span>Masuk ke Sistem Terpadu</span>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Panel for Development / Review */}
          <div className="mt-8 pt-6 border-t border-[#E2D9C8]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#73655D]">
                Akses Demo Cepat (Klik untuk Mengisi):
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickFill("superadmin")}
                className="p-2.5 rounded-lg bg-white border border-[#E2D9C8] hover:border-[#710912] text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-semibold block text-[#0D0D0D] group-hover:text-[#710912]">
                    Superadmin
                  </span>
                  <span className="text-[11px] text-[#73655D]">IT &amp; Hak Akses</span>
                </div>
                <ShieldCheck className="w-4 h-4 text-[#710912]" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill("admin")}
                className="p-2.5 rounded-lg bg-white border border-[#E2D9C8] hover:border-[#710912] text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-semibold block text-[#0D0D0D] group-hover:text-[#710912]">
                    Admin Hukum
                  </span>
                  <span className="text-[11px] text-[#73655D]">CMS &amp; Warta</span>
                </div>
                <Building2 className="w-4 h-4 text-[#710912]" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill("dosen")}
                className="p-2.5 rounded-lg bg-white border border-[#E2D9C8] hover:border-[#710912] text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-semibold block text-[#0D0D0D] group-hover:text-[#710912]">
                    Dosen
                  </span>
                  <span className="text-[11px] text-[#73655D]">Akun Dosen</span>
                </div>
                <BookOpen className="w-4 h-4 text-[#710912]" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill("mahasiswa")}
                className="p-2.5 rounded-lg bg-white border border-[#E2D9C8] hover:border-[#710912] text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-semibold block text-[#0D0D0D] group-hover:text-[#710912]">
                    Mahasiswa
                  </span>
                  <span className="text-[11px] text-[#73655D]">Akun Mahasiswa</span>
                </div>
                <GraduationCap className="w-4 h-4 text-[#710912]" />
              </button>
            </div>
          </div>

          {/* Footer note for prospective students */}
          <div className="mt-8 text-center text-xs text-[#544942]">
            <span>Belum memiliki akun sivitas? </span>
            <a
              href="https://pelitabangsa.siakadcloud.com/spmbfront/jalur-seleksi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#710912] hover:underline inline-flex items-center gap-1"
            >
              <span>Daftar Seleksi PMB Online</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Password Recovery Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E2D9C8]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#710912]">
                <HelpCircle className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-[#0D0D0D]">Bantuan Akun &amp; Sandi</h3>
              </div>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="p-1 rounded-full text-[#73655D] hover:bg-[#FAF7F2] hover:text-[#0D0D0D] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#544942] leading-relaxed">
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8]">
                <strong className="block text-[#0D0D0D] mb-1">Mahasiswa Aktif (NIM):</strong>
                <span>Untuk reset kata sandi akun perkuliahan dan KRS, hubungi Biro Administrasi Akademik &amp; Kemahasiswaan (BAAK) UPB atau gunakan fitur lupa sandi di SIAKAD.</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8]">
                <strong className="block text-[#0D0D0D] mb-1">Dosen &amp; Tenaga Pengajar (NIDN):</strong>
                <span>Sinkronisasi akun SINTA dan BKD dikoordinasikan langsung melalui unit Lembaga Penjaminan Mutu &amp; SDM UPB.</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8]">
                <strong className="block text-[#0D0D0D] mb-1">Pengelola Dekanat &amp; Superadmin:</strong>
                <span>Permintaan pemulihan kredensial panel CMS dilayani langsung oleh Tim IT Dekanat Fakultas Hukum UPB melalui email resmi: <code>hukum@pelitabangsa.ac.id</code>.</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#710912] text-white font-semibold text-xs hover:bg-[#48060B] transition-colors"
              >
                Tutup Bantuan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
