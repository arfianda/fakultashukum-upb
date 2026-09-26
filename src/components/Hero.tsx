"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Pause, Play, ChevronRight } from "lucide-react";

export function Hero({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMediaPlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[740px] flex items-center bg-[#410000] text-white overflow-hidden"
      aria-label="Pusat Keunggulan Pendidikan Hukum"
    >
      {/* Full-bleed Architectural Campus Photography with Ambient Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero-library.jpg"
          alt="Gedung Perpustakaan & Laboratorium Fakultas Hukum Universitas Pelita Bangsa"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-transform duration-1000 ${
            isPlaying ? "scale-100" : "scale-105"
          }`}
        />
        {/* Balanced Academic Vignette: clear text contrast while revealing library architecture */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#380000]/80 via-[#4A0000]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#250000]/65 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl">
          {/* Monumental Editorial Serif Headline (Direct Yale Law School Typographic Scale) */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.12] mb-6 text-balance">
            Pusat Keunggulan Pendidikan Hukum
          </h1>

          {/* Subtitle Statement on Critical Thinking and Legal Intellect */}
          <p className="text-base sm:text-lg md:text-xl text-[#F3F0EF] font-light leading-relaxed mb-10 max-w-2xl text-pretty">
            Di Fakultas Hukum Universitas Pelita Bangsa, mahasiswa menumbuhkan kemahiran berpikir kritis dan independen terhadap doktrin hukum, peradilan, dan tantangan keadilan masyarakat.
          </p>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 mb-16">
            <a
              href="#akademik"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-[#C5A059] transition-colors group"
            >
              <span className="border-b border-white group-hover:border-[#C5A059] pb-0.5">
                TEMUKAN LEBIH LANJUT
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
            </a>

            <button
              onClick={onOpenAdmission}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#800000] text-white border border-[#C5A059]/40 text-xs font-bold uppercase tracking-wider hover:bg-[#570000] hover:border-[#C5A059] transition-all shadow-md"
            >
              <span>Pendaftaran Mahasiswa Baru</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#E8D8B0]" />
            </button>
          </div>

          {/* Media Ambient Control (Direct Yale Law School PAUSE Button) */}
          <div className="pt-4">
            <button
              onClick={toggleMediaPlayback}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/50 hover:bg-black/75 border border-white/40 text-white text-[10px] font-bold tracking-widest uppercase transition-colors"
              aria-label={isPlaying ? "Hentikan animasi visual latar" : "Jalankan animasi visual latar"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-white" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" />
                  <span>PLAY</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
