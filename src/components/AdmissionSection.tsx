"use client";

import React from "react";
import { ArrowRight, Check, Shield, Award, ChevronRight } from "lucide-react";

export function AdmissionSection({ onOpenAdmission }: { onOpenAdmission?: () => void }) {
  const steps = [
    {
      num: "01",
      title: "Pendaftaran Online",
      desc: "Mengisi formulir registrasi akun mahasiswa baru dan memilih program (S.H. Reguler atau Eksekutif).",
    },
    {
      num: "02",
      title: "Verifikasi Berkas",
      desc: "Unggah dokumen ijazah terakhir, transkrip nilai, Kartu Tanda Penduduk, dan pasfoto formal.",
    },
    {
      num: "03",
      title: "Tes Potensi & Wawancara",
      desc: "Uji penalaran logika hukum dasar, wawasan kebangsaan, serta peminatan konsentrasi studi.",
    },
    {
      num: "04",
      title: "Registrasi Ulang & NIM",
      desc: "Konfirmasi penerimaan resmi, penerbitan Nomor Induk Mahasiswa, dan orientasi akademik kampus.",
    },
  ];

  const scholarships = [
    {
      name: "Beasiswa Prestasi Akademik",
      benefit: "Potongan SPP 50% - 100%",
      criteria: "Nilai rata-rata rapor SMA/SMK minimal 85 atau peraih juara olimpiade/debat hukum nasional.",
    },
    {
      name: "Beasiswa Tahfiz Al-Qur'an",
      benefit: "Bebas Biaya Pendidikan Penuh",
      criteria: "Penghafal Al-Qur'an minimal 10 Juz bersertifikat lembaga tahfiz terakreditasi.",
    },
    {
      name: "Beasiswa Kemitraan Korporasi",
      benefit: "Subsidi Khusus Karyawan Industri",
      criteria: "Bagi karyawan perusahaan kawasan industri Cikarang-Bekasi mitra resmi Universitas Pelita Bangsa.",
    },
  ];

  return (
    <section id="pendaftaran" className="bg-white border-t border-[#E5E1DA] py-16 lg:py-24" aria-label="Pendaftaran dan Beasiswa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Yale Law School Architectural Motif */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E1DA]">
          <div>
            <div className="relative inline-flex items-center mb-2">
              <div className="absolute inset-0 -m-1 border border-[#E5E1DA] dotted-matrix-bg opacity-45 pointer-events-none" />
              <span className="relative text-[10px] uppercase tracking-widest text-[#800000] font-bold bg-white px-2 py-0.5">
                PENERIMAAN MAHASISWA &amp; BANTUAN BIAYA &bull; TAHUN AKADEMIK 2026/2027
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1B1B] font-normal">
              Pendaftaran Mahasiswa &amp; Bantuan Pendidikan
            </h2>
          </div>

          <button
            onClick={onOpenAdmission}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000] transition-colors"
          >
            <span>Buka Formulir Pendaftaran</span>
            <ChevronRight className="w-4 h-4 text-[#E8D8B0]" />
          </button>
        </div>

        {/* 4 Steps Timeline */}
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-wider text-[#5C5854] font-bold mb-6">
            Alur Penerimaan Terpadu:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, sIdx) => (
              <div
                key={sIdx}
                className="bg-[#F8F7F4] border border-[#E5E1DA] p-6 flex flex-col justify-between"
              >
                <div className="font-serif text-3xl font-light text-[#800000] mb-4">
                  {st.num}
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#1C1B1B] mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#5C5854] leading-relaxed font-light">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Transparency & Scholarships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tuition Transparency Overview (5 cols) */}
          <div className="lg:col-span-5 bg-[#F8F7F4] border border-[#E5E1DA] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000] block mb-2">
                Transparansi Biaya Kuliah
              </span>
              <h3 className="font-serif text-xl font-normal text-[#1C1B1B] mb-3">
                Investasi Pendidikan Terjangkau &amp; Berkualitas
              </h3>
              <p className="text-xs text-[#5C5854] leading-relaxed mb-6 font-light">
                Fakultas Hukum UPB berkomitmen menyediakan biaya perkuliahan yang transparan tanpa pungutan liar. Pembayaran SPP dapat diangsur secara bulanan untuk meringankan mahasiswa.
              </p>

              <div className="space-y-3 pb-6 border-b border-[#E5E1DA] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5854]">Biaya Formulir &amp; Tes Masuk</span>
                  <span className="font-bold text-[#1C1B1B]">Rp 250.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5854]">SPP Angsuran Bulanan (Mulai dari)</span>
                  <span className="font-bold text-[#800000]">Rp 650.000 / bulan</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5854]">Praktikum Moot Court &amp; E-Court</span>
                  <span className="font-bold text-[#1C1B1B]">Termasuk dalam SPP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5854]">Uang Gedung / Pembangunan</span>
                  <span className="font-bold text-[#1C1B1B]">Bebas (Rp 0)</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenAdmission}
                className="w-full py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000] transition-colors"
              >
                Konsultasi Biaya &amp; Skema Angsuran
              </button>
            </div>
          </div>

          {/* Scholarships (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5E1DA] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000] block mb-2">
                Program Beasiswa Unggulan
              </span>

              <h3 className="font-serif text-xl font-normal text-[#1C1B1B] mb-2">
                Dukungan Penuh bagi Calon Yuridis Bertalenta
              </h3>

              <p className="text-xs text-[#5C5854] leading-relaxed mb-6 font-light">
                Tersedia kuota beasiswa setiap tahun ajaran baru bagi calon mahasiswa berprestasi, aktivis organisasi, dan penghafal Al-Qur&apos;an.
              </p>

              <div className="space-y-4 mb-6">
                {scholarships.map((sc, scIdx) => (
                  <div key={scIdx} className="p-4 bg-[#F8F7F4] border border-[#E5E1DA]">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-serif text-sm font-semibold text-[#800000]">
                        {sc.name}
                      </h4>
                      <span className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider">
                        {sc.benefit}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C5854] font-light">
                      {sc.criteria}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0EDED] flex items-center justify-between text-xs text-[#5C5854]">
              <span>Pendaftaran beasiswa diverifikasi secara bertahap.</span>
              <button
                onClick={onOpenAdmission}
                className="text-xs font-bold text-[#800000] hover:text-[#570000] hover:underline uppercase"
              >
                Daftar Jalur Beasiswa &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
