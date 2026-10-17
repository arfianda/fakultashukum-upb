import React from "react";
import { Scale } from "lucide-react";

export function DeanCreed() {
  return (
    <section id="dekan" className="bg-[#FAF7F2] border-y border-[#E2D9C8] py-16 lg:py-24 relative" aria-label="Amanat Dekan Fakultas Hukum">
      <div id="tentang" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Institutional Seal Mark in Academic Maroon */}
        <div className="w-10 h-10 mx-auto mb-8 border border-[#710912] bg-white flex items-center justify-center text-[#710912]">
          <Scale className="w-5 h-5 stroke-[1.5]" />
        </div>

        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-3xl text-[#0D0D0D] italic font-normal leading-relaxed mb-8 max-w-4xl mx-auto text-balance">
          &ldquo;Hukum bukanlah sekadar kompilasi aturan formal yang dingin, melainkan instrumen moral tertinggi yang menjaga martabat kemanusiaan, menjamin kepastian berusaha, dan mewujudkan keadilan substantif bagi seluruh elemen bangsa.&rdquo;
        </blockquote>

        <div className="inline-flex flex-col items-center border-t-2 border-[#C28D39] pt-4">
          <p className="font-serif text-base sm:text-lg font-bold text-[#710912]">
            Prof. Dr. Lorem Ipsum, S.H., LL.M.
          </p>
          <p className="text-xs uppercase tracking-widest text-[#544942] mt-1 font-medium">
            Dekan Fakultas Hukum Universitas Pelita Bangsa
          </p>
        </div>
      </div>
    </section>
  );
}
