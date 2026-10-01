import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft, Home, BookOpen, Newspaper, Users, Mail } from "lucide-react";

export const metadata = {
  title: "404 - Halaman Tidak Ditemukan | Fakultas Hukum UPB",
  description: "Halaman yang Anda tuju tidak ditemukan pada portal Fakultas Hukum Universitas Pelita Bangsa.",
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#800000]/10 border border-[#800000]/20 flex items-center justify-center text-[#800000]">
          <Scale className="w-8 h-8 stroke-[1.75]" />
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#800000] mb-2">
          Galat 404: Direktori Tidak Ditemukan
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B] mb-4">
          Halaman Tidak Ditemukan
        </h1>

        <div className="w-12 h-1 bg-[#C5A059] mx-auto mb-5" aria-hidden="true" />

        <p className="text-sm sm:text-base text-[#5C5854] leading-relaxed mb-8 font-light">
          Halaman yang Anda tuju mungkin telah dipindahkan, berganti tautan permanen, atau belum dipublikasikan dalam direktori resmi Fakultas Hukum Universitas Pelita Bangsa.
        </p>

        <div className="p-6 bg-white border border-[#E5E1DA] rounded-2xl shadow-xs text-left mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#5C5854] mb-3">
            Tautan Cepat Navigasi
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F7F4] text-[#1C1B1B] hover:text-[#800000] transition-colors"
            >
              <Home className="w-4 h-4 text-[#800000]" />
              <span>Beranda Utama</span>
            </Link>
            <Link
              href="/akademik"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F7F4] text-[#1C1B1B] hover:text-[#800000] transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#800000]" />
              <span>Program Studi Hukum</span>
            </Link>
            <Link
              href="/berita"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F7F4] text-[#1C1B1B] hover:text-[#800000] transition-colors"
            >
              <Newspaper className="w-4 h-4 text-[#800000]" />
              <span>Warta &amp; Kajian</span>
            </Link>
            <Link
              href="/dosen"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F7F4] text-[#1C1B1B] hover:text-[#800000] transition-colors"
            >
              <Users className="w-4 h-4 text-[#800000]" />
              <span>Tenaga Pengajar</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#800000] hover:bg-[#570000] text-white text-xs font-semibold tracking-wider transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#800000] text-[#800000] hover:bg-[#800000]/[0.06] text-xs font-semibold tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
          >
            <Mail className="w-4 h-4" />
            <span>Hubungi Sekretariat</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
