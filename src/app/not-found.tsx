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
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#710912]/10 border border-[#710912]/20 flex items-center justify-center text-[#710912]">
          <Scale className="w-8 h-8 stroke-[1.75]" />
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#710912] mb-2">
          Galat 404: Direktori Tidak Ditemukan
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-4">
          Halaman Tidak Ditemukan
        </h1>

        <div className="w-12 h-1 bg-[#C28D39] mx-auto mb-5" aria-hidden="true" />

        <p className="text-sm sm:text-base text-[#544942] leading-relaxed mb-8 font-light">
          Halaman yang Anda tuju mungkin telah dipindahkan, berganti tautan permanen, atau belum dipublikasikan dalam direktori resmi Fakultas Hukum Universitas Pelita Bangsa.
        </p>

        <div className="p-6 bg-white border border-[#E2D9C8] rounded-2xl shadow-xs text-left mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#544942] mb-3">
            Tautan Cepat Navigasi
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FAF7F2] text-[#0D0D0D] hover:text-[#710912] transition-colors"
            >
              <Home className="w-4 h-4 text-[#710912]" />
              <span>Beranda Utama</span>
            </Link>
            <Link
              href="/akademik"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FAF7F2] text-[#0D0D0D] hover:text-[#710912] transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#710912]" />
              <span>Program Studi Hukum</span>
            </Link>
            <Link
              href="/berita"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FAF7F2] text-[#0D0D0D] hover:text-[#710912] transition-colors"
            >
              <Newspaper className="w-4 h-4 text-[#710912]" />
              <span>Warta &amp; Kajian</span>
            </Link>
            <Link
              href="/dosen"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FAF7F2] text-[#0D0D0D] hover:text-[#710912] transition-colors"
            >
              <Users className="w-4 h-4 text-[#710912]" />
              <span>Tenaga Pengajar</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#710912] hover:bg-[#48060B] text-white text-xs font-semibold tracking-wider transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#710912]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#710912] text-[#710912] hover:bg-[#710912]/[0.06] text-xs font-semibold tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#710912]"
          >
            <Mail className="w-4 h-4" />
            <span>Hubungi Sekretariat</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
