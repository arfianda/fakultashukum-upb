import React from "react";
import { Scale } from "lucide-react";

export function DeanCreed() {
  return (
    <section className="bg-[#F8F7F4] border-y border-[#E5E1DA] py-16 lg:py-24" aria-label="Amanat Dekan Fakultas Hukum">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Institutional Seal Mark in Academic Maroon */}
        <div className="w-10 h-10 mx-auto mb-8 border border-[#800000] bg-white flex items-center justify-center text-[#800000]">
          <Scale className="w-5 h-5 stroke-[1.5]" />
        </div>

        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-3xl text-[#1C1B1B] italic font-normal leading-relaxed mb-8 max-w-4xl mx-auto text-balance">
          &ldquo;Hukum bukanlah sekadar kompilasi aturan formal yang dingin, melainkan instrumen moral tertinggi yang menjaga martabat kemanusiaan, menjamin kepastian berusaha, dan mewujudkan keadilan substantif bagi seluruh elemen bangsa.&rdquo;
        </blockquote>

        <div className="inline-flex flex-col items-center border-t-2 border-[#C5A059] pt-4">
          <p className="font-serif text-base sm:text-lg font-bold text-[#800000]">
            Prof. Dr. Hendra Gunawan, S.H., LL.M.
          </p>
          <p className="text-xs uppercase tracking-widest text-[#5C5854] mt-1 font-medium">
            Dekan Fakultas Hukum Universitas Pelita Bangsa
          </p>
        </div>
      </div>
    </section>
  );
}
