"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
      className="w-full bg-[#710912] text-white pt-20 pb-12 border-t border-[#48060B] font-sans"
      aria-label="Footer Resmi Kampus"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content: Left Brand & Tagline + Right 3 Nav Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Brand, Description, Social Icons */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                onClick={handleBrandClick}
                className="inline-flex items-center gap-3.5 mb-4 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src="/images/logo-upb.png"
                    alt="Logo Resmi Universitas Pelita Bangsa"
                    width={44}
                    height={44}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                    Fakultas Hukum
                  </span>
                  <span className="text-[11px] font-sans tracking-widest uppercase font-medium text-[#EFE5D2] mt-1.5 block">
                    Universitas Pelita Bangsa
                  </span>
                </div>
              </Link>

              <p className="text-sm text-[#EFE5D2]/85 leading-relaxed max-w-sm mb-4 font-light">
                Mendidik calon yuris yang berintegritas moral luhur, menguasai kemahiran litigasi ruang sidang, serta berdaya saing global demi tegaknya keadilan dan supremasi hukum.
              </p>

              <div className="text-xs text-[#EFE5D2]/70 space-y-1 mb-8 font-light border-l border-white/15 pl-3">
                <p>Jl. Inspeksi Kalimalang No.9, Cikarang Pusat, Kab. Bekasi</p>
                <p>Surel: hukum@pelitabangsa.ac.id</p>
              </div>
            </div>

            {/* Social Icons row (Matching reference: Instagram, X, YouTube, Telegram) */}
            <div className="flex items-center gap-5 text-white/70">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Resmi"
                className="hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Resmi"
                className="hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Resmi"
                className="hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Resmi"
                className="hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Columns: 3 Clean Vertical Lists (Matching reference: About us, Product, Features) */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Column 1: Tentang Kami */}
            <div>
              <h4 className="text-[15px] font-semibold text-white mb-5 tracking-tight">
                Tentang Kami
              </h4>
              <ul className="space-y-3.5 text-sm text-white/70">
                <li>
                  <Link href="/tentang" className="hover:text-white transition-colors duration-150">
                    Profil Fakultas
                  </Link>
                </li>
                <li>
                  <Link href="/tentang#visi-misi" className="hover:text-white transition-colors duration-150">
                    Visi &amp; Misi
                  </Link>
                </li>
                <li>
                  <Link href="/dosen" className="hover:text-white transition-colors duration-150">
                    Dewan Dosen
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="hover:text-white transition-colors duration-150">
                    Lokasi Kampus
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white transition-colors duration-150">
                    Portal Admin Dekanat
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Program Studi */}
            <div>
              <h4 className="text-[15px] font-semibold text-white mb-5 tracking-tight">
                Program Studi
              </h4>
              <ul className="space-y-3.5 text-sm text-white/70">
                <li>
                  <Link href="/akademik/program-sarjana-hukum" className="hover:text-white transition-colors duration-150">
                    Sarjana Hukum (S.H.)
                  </Link>
                </li>
                <li>
                  <Link href="/akademik/kurikulum" className="hover:text-white transition-colors duration-150">
                    Kurikulum Litigasi
                  </Link>
                </li>
                <li>
                  <Link href="/akademik/peminatan" className="hover:text-white transition-colors duration-150">
                    Bidang Peminatan
                  </Link>
                </li>
                <li>
                  <Link href="/kehidupan-mahasiswa" className="hover:text-white transition-colors duration-150">
                    Peradilan Semu
                  </Link>
                </li>
                <li>
                  <Link href="/pusat-studi" className="hover:text-white transition-colors duration-150">
                    Klinik Hukum (KLBH)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Informasi */}
            <div>
              <h4 className="text-[15px] font-semibold text-white mb-5 tracking-tight">
                Informasi
              </h4>
              <ul className="space-y-3.5 text-sm text-white/70">
                <li>
                  <Link href="/penerimaan" className="hover:text-white transition-colors duration-150">
                    Penerimaan Mahasiswa
                  </Link>
                </li>
                <li>
                  <Link href="/berita" className="hover:text-white transition-colors duration-150">
                    Warta &amp; Riset
                  </Link>
                </li>
                <li>
                  <Link href="/agenda" className="hover:text-white transition-colors duration-150">
                    Agenda Akademik
                  </Link>
                </li>
                <li>
                  <a
                    href="https://journal.pelitabangsa.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-150"
                  >
                    Pelita Law Review
                  </a>
                </li>
                <li>
                  <a
                    href="https://pelitabangsa.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-150"
                  >
                    Portal Universitas UPB
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright on left, Terms & Privacy on right */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-white/60 gap-4">
          <div>
            Copyright @ 2026 Fakultas Hukum Universitas Pelita Bangsa, All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            <Link href="/tentang" className="hover:text-white transition-colors duration-150">
              Terms &amp; Conditions
            </Link>
            <Link href="/tentang" className="hover:text-white transition-colors duration-150">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
