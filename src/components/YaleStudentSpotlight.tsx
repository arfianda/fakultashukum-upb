"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X, Quote } from "lucide-react";

export function YaleStudentSpotlight() {
  const [activeStory, setActiveStory] = useState<{
    name: string;
    classYear: string;
    role: string;
    title: string;
    quote: string;
    image: string;
  } | null>(null);

  const stories = [
    {
      id: "rian",
      name: "Lorem Ipsum",
      classYear: "S.H. '25",
      role: "Ketua Delegasi Moot Court Society UPB",
      title: "Pandangan Mahasiswa: Kemahiran Litigasi Nyata di Ruang Sidang Semu",
      quote:
        "Di Fakultas Hukum UPB, kami tidak sekadar menghafal pasal-pasal undang-undang, melainkan dilatih langsung bersidang, menyusun memori kasasi, dan berdebat secara yuridis di hadapan praktisi dan hakim senior. Pengalaman ini memberi rasa percaya diri luar biasa sebelum terjun ke dunia peradilan nyata.",
      image: "/images/student-view-1.jpg",
    },
    {
      id: "sarah",
      name: "Dolor Sit Amet",
      classYear: "S.H. '26",
      role: "Mahasiswa Kelas Karyawan & Legal Officer",
      title: "Pandangan Mahasiswa: Fleksibilitas Pendidikan Hukum Tanpa Mengorbankan Karir",
      quote:
        "Sebagai staf legal di kawasan industri Cikarang, program kelas karyawan FH UPB memberi ruang belajar yang sangat fleksibel dengan mutu akademik yang setara penuh. Diskusi kasus riil di kelas seringkali langsung bisa saya terapkan untuk mitigasi risiko kontrak di kantor.",
      image: "/images/student-view-2.jpg",
    },
  ];

  return (
    <section id="kehidupan-mahasiswa" className="relative py-14 lg:py-20 overflow-hidden" aria-label="Suara Mahasiswa dan Sorotan Video">
      {/* Scroll anchor target */}
      <div id="mahasiswa-spotlight" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />

      {/* Background container offset block (Direct match to Yale screenshot dark blue block) */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-4/5 bg-gradient-to-r from-[#3A0000] via-[#480000] to-[#570000] z-0" />
      <div className="absolute inset-0 dotted-matrix-bg opacity-15 pointer-events-none z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden group cursor-pointer border border-white/20 shadow-2xl"
            >
              {/* Student Portrait Image */}
              <Image
                src={story.image}
                alt={story.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-104 transition-transform duration-700"
              />

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 group-hover:from-[#570000]/85 transition-colors" />

              {/* Center Circular Play Button (Direct match to Yale screenshot) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#800000]/90 border-2 border-white flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#C5A059] transition-all">
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Subtitle & Title at the bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D8B0] block mb-1">
                  VIDEO &bull; SUARA MAHASISWA
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-normal text-white group-hover:text-[#E8D8B0] transition-colors leading-snug">
                  {story.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video / Testimonial Story Modal */}
      {activeStory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
        >
          <div className="bg-white max-w-xl w-full border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-6 right-6 p-2 text-[#5C5854] hover:text-[#1C1B1B] hover:bg-[#F8F7F4]"
              aria-label="Tutup cerita mahasiswa"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#800000] font-bold block mb-1">
              PROFIL ALUMNI &amp; MAHASISWA &bull; {activeStory.classYear}
            </span>
            <h3 className="font-serif text-2xl text-[#1C1B1B] font-normal mb-1">
              {activeStory.name}, {activeStory.classYear}
            </h3>
            <p className="text-xs text-[#C5A059] font-semibold mb-4">
              {activeStory.role}
            </p>

            <div className="relative aspect-[16/9] w-full mb-6 border border-[#E5E1DA] overflow-hidden">
              <Image src={activeStory.image} alt={activeStory.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#800000] border-2 border-white flex items-center justify-center text-white">
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F8F7F4] border-l-4 border-[#800000] mb-6">
              <Quote className="w-5 h-5 text-[#800000] mb-2 opacity-50" />
              <p className="font-serif text-sm sm:text-base text-[#1C1B1B] italic leading-relaxed">
                &ldquo;{activeStory.quote}&rdquo;
              </p>
            </div>

            <button
              onClick={() => setActiveStory(null)}
              className="w-full py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000]"
            >
              Tutup Video
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
