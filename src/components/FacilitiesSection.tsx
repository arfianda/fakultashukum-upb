import React from "react";
import Image from "next/image";
import { Monitor, Scale, Library, Users, Check } from "lucide-react";

export function FacilitiesSection() {
  const facilities = [
    {
      icon: Monitor,
      title: "Ruang Sidang Elektronik (E-Court Simulator)",
      desc: "Simulasi persidangan digital terintegrasi sesuai regulasi Mahkamah Agung RI, mencakup e-filing gugatan, e-summons, dan pembuktian dokumen elektronik.",
    },
    {
      icon: Scale,
      title: "Klinik Advokasi & Mediasi KBH",
      desc: "Fasilitas konsultasi langsung bagi masyarakat pencari keadilan dengan supervisi advokat senior, melatih mahasiswa dalam teknik mediasi dan penanganan perkara nyata.",
    },
    {
      icon: Library,
      title: "Pusat Dokumentasi & Pustaka Hukum",
      desc: "Akses lengkap ribuan himpunan putusan Mahkamah Agung, lembaran negara (Staatsblad), serta basis data jurnal hukum internasional bereputasi.",
    },
  ];

  const studentOrgs = [
    { name: "Moot Court Society (MCS) UPB", role: "Organisasi Kompetisi Peradilan Semu Nasional" },
    { name: "Dewan Eksekutif Mahasiswa (DEMA) FH", role: "Lembaga Eksekutif Tata Kelola Mahasiswa" },
    { name: "Klinik Bantuan Hukum Mahasiswa (KBHM)", role: "Unit Advokasi Hukum & Pengabdian Sosial" },
    { name: "Lembaga Kajian & Debat Konstitusi", role: "Komunitas Riset Doktrin Ketatanegaraan" },
  ];

  return (
    <section id="laboratorium" className="bg-white border-t border-[#E5E1DA] py-16 lg:py-24" aria-label="Fasilitas dan Kehidupan Kampus">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Yale Law School Architectural Motif */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E1DA]">
          <div>
            <div className="relative inline-flex items-center mb-2">
              <div className="absolute inset-0 -m-1 border border-[#E5E1DA] dotted-matrix-bg opacity-45 pointer-events-none" />
              <span className="relative text-[10px] uppercase tracking-widest text-[#800000] font-bold bg-white px-2 py-0.5">
                KEHIDUPAN MAHASISWA &amp; PUSAT STUDI &bull; FASILITAS KAMPUS
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1B1B] font-normal">
              Laboratorium Peradilan Semu &amp; Pusat Riset
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5854] max-w-md mt-4 md:mt-0 leading-relaxed font-light">
            Menghadirkan lingkungan peradilan otentik dengan tata ruang majelis hakim berstandar Mahkamah Agung untuk mengasah kemahiran sidang calon advokat, jaksa, dan hakim.
          </p>
        </div>

        {/* Real Moot Court Showcase */}
        <div className="bg-[#F8F7F4] border border-[#E5E1DA] overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Real Moot Court Photography */}
            <div className="relative lg:col-span-7 h-72 sm:h-96 lg:h-auto min-h-[340px] border-b lg:border-b-0 lg:border-r border-[#E5E1DA]">
              <Image
                src="/images/moot-court.jpg"
                alt="Laboratorium Peradilan Semu Fakultas Hukum Universitas Pelita Bangsa"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-[#800000] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                Ruang Sidang Utama Moot Court
              </div>
            </div>

            {/* Architectural & Operational Specs */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
                  Standar Ruang Sidang Mahkamah Agung
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1B1B] mb-4">
                  Simulasi Berkas &amp; Kemahiran Litigasi Nyata
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed mb-6 font-light">
                  Dilengkapi dengan podium majelis hakim berukir lambang negara, meja panitera, bangku penuntut umum dan penasihat hukum terpisah, serta area saksi dan terdakwa yang disesuaikan dengan Kitab Undang-Undang Hukum Acara Pidana (KUHAP).
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#E5E1DA]">
                  <div className="flex items-center gap-2 text-xs text-[#1C1B1B]">
                    <Check className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>Digunakan untuk simulasi sidang Pidana, Perdata, dan PTUN</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1C1B1B]">
                    <Check className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>Pemusatan latihan delegasi NMCC tingkat nasional</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E1DA]">
                <p className="text-[11px] text-[#5C5854] uppercase tracking-wider font-semibold">
                  Lokasi: Gedung B Lantai 3 Kampus Utama UPB
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Facility Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {facilities.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white border border-[#E5E1DA] hover:border-[#800000] p-6 flex flex-col justify-between transition-colors group"
              >
                <div>
                  <div className="w-9 h-9 border border-[#800000] bg-white text-[#800000] flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-[#1C1B1B] mb-2 leading-snug">
                    {f.title}
                  </h4>
                  <p className="text-xs text-[#5C5854] leading-relaxed font-light">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Life & Organizations */}
        <div className="bg-[#F8F7F4] border border-[#E5E1DA] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E5E1DA]">
            <Users className="w-5 h-5 text-[#800000] stroke-[1.5]" />
            <h3 className="font-serif text-lg font-semibold text-[#1C1B1B]">
              Kehidupan Mahasiswa &amp; Lembaga Otonom Fakultas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentOrgs.map((org, oIdx) => (
              <div key={oIdx} className="p-4 bg-white border border-[#E5E1DA]">
                <p className="font-serif text-xs font-semibold text-[#800000] mb-1">
                  {org.name}
                </p>
                <p className="text-[11px] text-[#5C5854]">
                  {org.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
