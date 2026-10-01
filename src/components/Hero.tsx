"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Pause, Play, ChevronRight } from "lucide-react";

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
      className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[740px] flex items-center bg-black text-white overflow-hidden"
      aria-label="Pusat Keunggulan Pendidikan Hukum"
    >
      {/* Full-bleed Architectural Campus Video Background with Ambient Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/profile-pelita-bangsa.mp4" type="video/mp4" />
        </video>
        {/* Subtle multi-stop dark gradient overlay ensuring heading remains legible over video text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.65))",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 lg:pt-48 pb-20 lg:pb-28 w-full">
        <div className="max-w-3xl">
          {/* Monumental Editorial Serif Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.12] mb-6 text-balance drop-shadow-sm"
          >
            Pusat Keunggulan Pendidikan Hukum
          </motion.h1>

          {/* Subtitle Statement on Critical Thinking and Legal Intellect */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#F3F0EF] font-light leading-relaxed mb-10 max-w-2xl text-pretty drop-shadow-xs"
          >
            Di Fakultas Hukum Universitas Pelita Bangsa, mahasiswa menumbuhkan kemahiran berpikir kritis dan independen terhadap doktrin hukum, peradilan, dan tantangan keadilan masyarakat.
          </motion.p>

          {/* Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 mb-16"
          >
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
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#800000] text-white border border-[#C5A059]/40 text-xs font-bold uppercase tracking-wider hover:bg-[#570000] hover:border-[#C5A059] transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <span>Pendaftaran Mahasiswa Baru</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#E8D8B0]" />
            </button>
          </motion.div>

          {/* Media Ambient Control */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="pt-4"
          >
            <button
              onClick={toggleMediaPlayback}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/50 hover:bg-black/75 border border-white/40 text-white text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer"
              aria-label={isPlaying ? "Hentikan animasi visual latar" : "Jalankan animasi visual latar"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-white" />
                  <span>JEDA</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" />
                  <span>PUTAR</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
