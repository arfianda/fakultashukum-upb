"use client";

import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

export function YaleConnectWithUs() {
  const photos = [
    {
      id: 1,
      image: "/images/social-1.jpg",
      caption: "Suasana gerbang fakultas hukum dan diskusi santai mahasiswa sebelum memasuki ruang peradilan semu.",
    },
    {
      id: 2,
      image: "/images/social-2.jpg",
      caption: "Persiapan berkas analisis kasus pidana komparatif bersama rekan tim riset hukum.",
    },
    {
      id: 3,
      image: "/images/social-3.jpg",
      caption: "Membaca literatur hukum konstitusi di taman kampus Fakultas Hukum Universitas Pelita Bangsa.",
    },
  ];

  return (
    <section id="komunitas" className="relative py-16 lg:py-24 bg-[#F8F7F4] border-t border-[#E5E1DA] overflow-hidden" aria-label="Media Sosial dan Komunitas Kampus">
      {/* Subtle Yale-style Dotted Matrix Backdrop */}
      <div className="absolute inset-0 dotted-matrix-bg opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Serif Section Heading (Direct match to Yale screenshot) */}
        <div className="text-center mb-12">
          <div className="w-16 h-3 mx-auto dotted-matrix-bg opacity-70 mb-2" aria-hidden="true" />
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1B] font-normal tracking-tight">
            Terhubung Dengan Kami
          </h2>
        </div>

        {/* 4-Item Social Feed Grid (3 Photos + 1 Twitter/X Card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Photos 1, 2, 3 */}
          {photos.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden bg-white border border-[#E5E1DA] shadow-sm group hover:border-[#800000] transition-colors"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-104 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/60 p-1.5 text-white backdrop-blur-xs">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                <p className="text-[11px] text-white leading-relaxed font-light">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}

          {/* Item 4: Official X / Twitter Card (Direct match to Yale screenshot) */}
          <div className="relative aspect-square bg-white border border-[#E5E1DA] p-6 flex flex-col justify-between shadow-sm hover:border-[#800000] transition-colors">
            <div>
              {/* Header with X icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#800000] text-white flex items-center justify-center font-serif text-xs font-bold">
                    UPB
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1C1B1B] leading-tight">
                      Fakultas Hukum UPB
                    </span>
                    <span className="block text-[11px] text-[#5C5854]">
                      @FH_PelitaBangsa
                    </span>
                  </div>
                </div>

                {/* X / Twitter logo SVG */}
                <svg className="w-4 h-4 text-[#1C1B1B] fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>

              {/* Tweet content */}
              <p className="font-serif text-xs sm:text-[13px] text-[#1C1B1B] leading-relaxed mb-3">
                &ldquo;Selamat kepada delegasi mahasiswa Fakultas Hukum UPB yang berhasil meraih Trofi Berkas Terbaik pada National Moot Court Competition 2026. Bukti ketajaman analisis doktrin yuridis ruang sidang.&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5E1DA] text-[10px] text-[#5C5854] flex items-center justify-between">
              <span>24 Sep 2026 &bull; Cikarang, ID</span>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800000] font-bold hover:underline"
              >
                Lihat di X &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Centered Social Follow Row (Direct match to Yale screenshot) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6 border-t border-[#E5E1DA]">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5C5854]">
            IKUTI KAMI:
          </span>
          <div className="flex items-center gap-5 text-[#5C5854]">
            {/* X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#800000] transition-colors p-1"
              aria-label="Akun X Twitter Resmi"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#800000] transition-colors p-1"
              aria-label="Instagram Resmi"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#800000] transition-colors p-1"
              aria-label="LinkedIn Resmi"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.62 1.62 0 1 0 1.62 1.62c0-.9-.73-1.62-1.62-1.62z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#800000] transition-colors p-1"
              aria-label="Facebook Resmi"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#800000] transition-colors p-1"
              aria-label="YouTube Resmi"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
