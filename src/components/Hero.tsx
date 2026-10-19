"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";

export function Hero({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMediaPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-screen flex flex-col justify-center items-center bg-[#0D0D0D] text-white overflow-hidden text-center"
      aria-label="Pusat Keunggulan Pendidikan Hukum"
    >
      {/* Full-bleed Architectural Campus Video Background with Ambient Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0D0D0D]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-library.jpg"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src="/videos/profile-pelita-bangsa.mp4" type="video/mp4" />
        </video>

        {/* Multi-stop cinematic gradient overlays matching reference design */}
        {/* 1. Deep bottom fade seamlessly melting video into Midnight Black (#0D0D0D) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/85 via-45% to-transparent pointer-events-none" />
        {/* 2. Top header fade for crystal-clear navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/85 via-[#0D0D0D]/30 to-transparent pointer-events-none" />
        {/* 3. Lateral vignettes for cinematic spotlighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/65 via-transparent to-[#0D0D0D]/65 pointer-events-none" />
      </div>

      {/* Hero Content: Perfectly Centered Pill Badge, Monumental Scaled Headline, Subtitle, and Pill CTA Buttons */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 w-full flex flex-col items-center justify-center my-auto">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-[#EFE5D2] shadow-sm mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#EFE5D2]/80" />
          <span className="font-medium tracking-wide">Pusat Keunggulan Hukum &amp; Litigasi Terkemuka</span>
        </motion.div>

        {/* Monumental Editorial Serif Headline scaled to video composition */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.12] sm:leading-[1.08] text-balance max-w-4xl mx-auto drop-shadow-md mb-6"
        >
          Pusat Keunggulan Pendidikan Hukum
        </motion.h1>

        {/* Subtitle Statement on Critical Thinking and Legal Intellect */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-[#EFE5D2]/90 font-light leading-relaxed max-w-2xl mx-auto text-balance drop-shadow-xs mb-8 sm:mb-10"
        >
          Di Fakultas Hukum Universitas Pelita Bangsa, mahasiswa menumbuhkan kemahiran berpikir kritis dan independen terhadap doktrin hukum, peradilan, dan tantangan keadilan masyarakat.
        </motion.p>

        {/* Centered Action Buttons (Reference-style Pill CTA with indicator dot) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto"
        >
          {/* Primary Pill Button with dot indicator */}
          <a
            href="https://pelitabangsa.siakadcloud.com/spmbfront/jalur-seleksi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-white text-[#0D0D0D] hover:bg-[#EFE5D2] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xl hover:shadow-2xl hover:scale-102 active:scale-98 cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-[#710912] group-hover:scale-125 transition-transform shrink-0" />
            <span>Pendaftaran Mahasiswa Baru</span>
          </a>

          {/* Secondary Glassmorphism Pill */}
          <a
            href="#akademik"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-semibold text-white hover:text-[#EFE5D2] transition-all shadow-sm group"
          >
            <span>Temukan Kurikulum &amp; Konsentrasi</span>
            <ArrowRight className="w-4 h-4 text-[#C28D39] group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Discreet Minimalist Ambient Video Control (Non-intrusive circular icon) */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20">
        <button
          onClick={toggleMediaPlayback}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/15 text-white/60 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 group"
          aria-label={isPlaying ? "Jeda animasi video latar" : "Putar animasi video latar"}
          title={isPlaying ? "Jeda video latar" : "Putar video latar"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current opacity-80 group-hover:opacity-100" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current opacity-80 group-hover:opacity-100 ml-0.5" />
          )}
        </button>
      </div>
    </section>
  );
}
