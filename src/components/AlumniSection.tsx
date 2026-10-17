import React from "react";
import Image from "next/image";
import { Briefcase, Building, Landmark, Scale } from "lucide-react";

export function AlumniSection() {
  const placementAreas = [
    {
      title: "Lembaga Peradilan & Penegak Hukum",
      desc: "Hakim Pengadilan Negeri & Agama, Jaksa Penuntut Umum Kejaksaan RI, serta Panitera Pengganti.",
      icon: Scale,
    },
    {
      title: "Firma Hukum & Praktik Advokat",
      desc: "Partner dan Senior Associate di kantor hukum komersial, arbiter, serta konsultan hak kekayaan intelektual.",
      icon: Briefcase,
    },
    {
      title: "Perbankan & Korporasi Multinasional",
      desc: "Legal Specialist, Compliance Director, dan Contract Manager di BUMN dan perusahaan multinasional.",
      icon: Building,
    },
    {
      title: "Lembaga Negara & Kementerian",
      desc: "Analis hukum di Kementerian Hukum & HAM, Mahkamah Konstitusi, Komisi Kejaksaan, dan Otoritas Jasa Keuangan.",
      icon: Landmark,
    },
  ];

  return (
    <section id="alumni" className="bg-[#FAF7F2] border-t border-[#E2D9C8] py-16 lg:py-24" aria-label="Kiprah Alumni dan Penempatan Karir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with UPB Architectural Motif */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E2D9C8]">
          <div>
            <div className="relative inline-flex items-center mb-2">
              <div className="absolute inset-0 -m-1 border border-[#E2D9C8] dotted-matrix-bg opacity-45 pointer-events-none" />
              <span className="relative text-[10px] uppercase tracking-widest text-[#710912] font-bold bg-[#FAF7F2] px-2 py-0.5">
                ALUMNI &bull; REKAM JEJAK LULUSAN
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0D0D0D] font-normal">
              Kiprah Para Lulusan di Panggung Hukum
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#544942] max-w-md mt-4 md:mt-0 leading-relaxed font-light">
            Mencetak praktisi hukum tangguh yang berkontribusi nyata menjaga integritas keadilan dan kepastian regulasi di tingkat nasional maupun internasional.
          </p>
        </div>

        {/* Featured Alumni Story */}
        <div className="bg-white border border-[#E2D9C8] p-6 sm:p-10 mb-16 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Alumni Portrait */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 border-2 border-[#C28D39] overflow-hidden bg-white shadow-xs">
                <Image
                  src="/images/alumni-almira.jpg"
                  alt="Lorem Ipsum, S.H., LL.M. - Alumni Fakultas Hukum UPB"
                  fill
                  sizes="300px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Testimonial & Achievement */}
            <div className="md:col-span-8">
              <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#710912] mb-2">
                Profil Alumni Berprestasi
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0D0D0D] mb-1">
                Lorem Ipsum, S.H., LL.M.
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-[#710912] mb-4">
                Senior Corporate Associate di Top-Tier Law Firm &bull; Alumnus Sarjana Hukum UPB
              </p>

              <blockquote className="text-sm sm:text-base text-[#0D0D0D] italic leading-relaxed mb-6 border-l-2 border-[#C28D39] pl-4 py-1 font-light">
                &ldquo;Fondasi keilmuan yuridis yang ketat dan pelatihan simulasi sidang di FH UPB memberi saya keunggulan kompetitif dalam menangani transaksi merger korporasi lintas yurisdiksi. Dosen-dosen di UPB tidak hanya mengajarkan hukum sebagai teori, melainkan melatih nalar kritis yang dibutuhkan di panggung profesional internasional.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-[#F4ECE1] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[#544942] block text-[11px]">Gelar Lanjutan:</span>
                  <span className="font-bold text-[#0D0D0D]">Master of Laws (LL.M.)</span>
                </div>
                <div>
                  <span className="text-[#544942] block text-[11px]">Spesialisasi:</span>
                  <span className="font-bold text-[#0D0D0D]">Banking &amp; Cross-Border Finance</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[#544942] block text-[11px]">Kontribusi Kampus:</span>
                  <span className="font-bold text-[#710912]">Dosen Tamu &amp; Mentor NMCC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Placement Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placementAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <div
                key={i}
                className="p-6 bg-white border border-[#E2D9C8] hover:border-[#710912] transition-colors"
              >
                <div className="w-9 h-9 border border-[#710912] bg-[#FAF7F2] flex items-center justify-center text-[#710912] mb-4">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-base font-semibold text-[#0D0D0D] mb-2">
                  {area.title}
                </h4>
                <p className="text-xs text-[#544942] leading-relaxed font-light">
                  {area.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
