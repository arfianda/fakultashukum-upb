"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  MapPin,
  Phone,
  Mail,
  Lock,
  ExternalLink,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

  return (
    <footer
      className="w-full bg-[#5A0000] text-white pt-16 pb-12 border-t-2 border-[#C5A059]"
      aria-label="Footer Resmi Kampus"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Block Yale-Style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Block 1: Institutional Identity & Direct Contact (lg: 4 cols) */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              onClick={handleBrandClick}
              className="inline-flex items-center gap-3.5 mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm cursor-pointer"
            >
              <div className="w-10 h-11 border border-[#C5A059] bg-[#C5A059] text-[#5A0000] flex flex-col items-center justify-center">
                <Scale className="w-5 h-5 stroke-[1.75]" />
                <div className="h-0.5 w-5 bg-[#5A0000] mt-0.5" />
              </div>
              <div>
                <span className="font-serif text-lg tracking-wider font-semibold uppercase block leading-tight text-white">
                  Fakultas Hukum
                </span>
                <span className="text-xs tracking-widest uppercase font-medium text-[#E8D8B0]">
                  Universitas Pelita Bangsa
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#E5E2E1] leading-relaxed mb-6 max-w-sm font-light">
              Mendidik calon yuris yang berintegritas moral luhur, menguasai kemahiran litigasi ruang sidang, serta berdaya saing global demi tegaknya keadilan dan supremasi hukum.
            </p>

            <div className="space-y-2.5 text-xs text-[#E5E2E1] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Jl. Inspeksi Kalimalang, Tegal Danas, Cikarang Pusat, Kabupaten Bekasi, Jawa Barat 17530</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>(021) 2851 8181 (Sekretariat Dekanat)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Layanan WhatsApp PMB: +62 812-9000-8801</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>hukum@pelitabangsa.ac.id</span>
              </div>
            </div>
          </div>

          {/* Block 2: Program Akademik & Direktori (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-xs font-semibold text-[#E8D8B0] uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Program Akademik
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E5E2E1] font-light">
              <li>
                <Link href="/akademik" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Program Sarjana Hukum (S.H.)
                </Link>
              </li>
              <li>
                <Link href="/penerimaan" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Penerimaan &amp; Bantuan Biaya
                </Link>
              </li>
              <li>
                <Link href="/dosen" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Direktori Tenaga Pengajar
                </Link>
              </li>
              <li>
                <Link href="/kehidupan-mahasiswa" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Kehidupan Mahasiswa &amp; Moot Court
                </Link>
              </li>
              <li>
                <Link href="/pusat-studi" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Laboratorium Hukum &amp; KBH
                </Link>
              </li>
            </ul>
          </div>

          {/* Block 3: Warta & Lembaga Cepat (lg: 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xs font-semibold text-[#E8D8B0] uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Warta &amp; Layanan
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E5E2E1] font-light">
              <li>
                <Link href="/berita" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Warta &amp; Kajian Hukum
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Kalender Agenda Akademik
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Tentang Fakultas Hukum
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Kontak &amp; Lokasi Dekanat
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-[#C5A059]/40 text-[#E8D8B0] hover:bg-[#C5A059] hover:text-[#5A0000] transition-colors text-[11px] font-bold uppercase tracking-wider rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059]"
                >
                  <Lock className="w-3 h-3" />
                  <span>Portal CMS Admin</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Block 4: Media Sosial Resmi & Tautan Eksternal (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-xs font-semibold text-[#E8D8B0] uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Terhubung Dengan Kami
            </h4>
            <p className="text-xs text-[#E5E2E1] leading-relaxed mb-4 font-light">
              Ikuti publikasi riset terbaru, putusan peradilan semu, dan warta civitas akademika di media sosial resmi:
            </p>

            <div className="flex items-center gap-2.5 mb-6">
              {/* // TODO: Ganti URL Instagram dengan tautan profil resmi Fakultas Hukum UPB */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Resmi Fakultas Hukum UPB"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#5A0000] text-[#E8D8B0] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* // TODO: Ganti URL YouTube dengan tautan channel resmi Fakultas Hukum UPB */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kanal YouTube Fakultas Hukum UPB"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#5A0000] text-[#E8D8B0] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* // TODO: Ganti URL LinkedIn dengan tautan halaman resmi Fakultas Hukum / Universitas Pelita Bangsa */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Halaman LinkedIn Resmi UPB"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#5A0000] text-[#E8D8B0] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://wa.me/6281290008801"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Layanan WhatsApp Fakultas Hukum UPB"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#5A0000] text-[#E8D8B0] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-1.5 text-xs text-[#E5E2E1] font-light">
              <div>
                <a
                  href="https://journal.pelitabangsa.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A059] hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <span>Pelita Law Review (Jurnal SINTA)</span>
                  <ExternalLink className="w-3 h-3 text-[#E8D8B0]" />
                </a>
              </div>
              <div>
                <a
                  href="https://pelitabangsa.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A059] hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <span>Portal Universitas UPB</span>
                  <ExternalLink className="w-3 h-3 text-[#E8D8B0]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E5E2E1]/80 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>&copy; 2026 Fakultas Hukum Universitas Pelita Bangsa. Seluruh Hak Cipta Dilindungi.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-light text-[#E8D8B0]">
            <span>Terakreditasi BAN-PT</span>
            <span>&bull;</span>
            <span>Standar Mutu ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
