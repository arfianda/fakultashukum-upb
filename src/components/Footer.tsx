import React from "react";
import Link from "next/link";
import { Scale, MapPin, Phone, Mail, Lock, ExternalLink, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#5A0000] text-white pt-16 pb-12 border-t-2 border-[#C5A059]" aria-label="Footer Resmi Kampus">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Institutional Identity (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-10 h-11 border border-[#C5A059] bg-[#C5A059] text-[#5A0000] flex flex-col items-center justify-center">
                <Scale className="w-5 h-5 stroke-[1.75]" />
                <div className="h-0.5 w-5 bg-[#5A0000] mt-0.5" />
              </div>
              <div>
                <span className="font-serif text-lg tracking-wider font-semibold uppercase block leading-tight text-white">
                  Fakultas Hukum
                </span>
                <span className="text-xs tracking-widest uppercase font-medium text-[#E8D8B0]">
                  Universitas Pelita Bangsa
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E5E2E1] leading-relaxed mb-6 max-w-sm font-light">
              Mendidik calon sarjana dan magister hukum yang berintegritas moral luhur, menguasai kemahiran litigasi ruang sidang, serta berdaya saing global demi tegaknya keadilan dan supremasi hukum.
            </p>

            <div className="space-y-2.5 text-xs text-[#E5E2E1] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Jl. Inspeksi Kalimalang, Tegal Danas, Cikarang Pusat, Kabupaten Bekasi, Jawa Barat 17530</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>(021) 2851 8181 / Layanan WhatsApp: +62 812-9000-8801</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>hukum@pelitabangsa.ac.id</span>
              </div>
            </div>
          </div>

          {/* Column 1: Study of Law / Program Studi */}
          <div>
            <h4 className="font-serif text-xs font-semibold text-[#E8D8B0] uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Program Akademik
            </h4>
            <ul className="space-y-2 text-xs text-[#E5E2E1] font-light">
              <li>
                <a href="#akademik" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Sarjana Hukum (S.H.) Reguler
                </a>
              </li>
              <li>
                <a href="#akademik" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Sarjana Hukum (Kelas Karyawan)
                </a>
              </li>
              <li>
                <a href="#akademik" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Magister Ilmu Hukum (M.H.)
                </a>
              </li>
              <li>
                <a href="#akademik" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Pendidikan Advokat (PKPA)
                </a>
              </li>
              <li>
                <a href="#akademik" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Hukum Pidana &amp; Forensik
                </a>
              </li>
              <li>
                <a href="#akademik" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Hukum Perdata &amp; Bisnis Digital
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Centers & Workshops / Riset & Lembaga */}
          <div>
            <h4 className="font-serif text-xs font-semibold text-[#E8D8B0] uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Riset &amp; Lembaga
            </h4>
            <ul className="space-y-2 text-xs text-[#E5E2E1] font-light">
              <li>
                <a href="#riset" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Pelita Law Review (SINTA 2)
                </a>
              </li>
              <li>
                <a href="#laboratorium" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Laboratorium Peradilan Semu
                </a>
              </li>
              <li>
                <a href="#laboratorium" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Klinik Bantuan Hukum (KBH)
                </a>
              </li>
              <li>
                <a href="#riset" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Pusat Kajian Konstitusi &amp; HAM
                </a>
              </li>
              <li>
                <a href="#fakultas" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Dewan Riset Guru Besar
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Portal Civitas & Admin */}
          <div>
            <h4 className="font-serif text-xs font-semibold text-[#E8D8B0] uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Portal Civitas
            </h4>
            <ul className="space-y-2 text-xs text-[#E5E2E1] font-light">
              <li>
                <a href="#pendaftaran" className="hover:text-[#C5A059] hover:underline transition-colors">
                  Penerimaan Mahasiswa Baru
                </a>
              </li>
              <li>
                <a
                  href="https://pelitabangsa.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A059] hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <span>Portal Universitas UPB</span>
                  <ExternalLink className="w-3 h-3 text-[#E8D8B0]" />
                </a>
              </li>
              <li>
                <a
                  href="https://sinta.kemdikbud.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A059] hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <span>Repositori SINTA Kemdikbud</span>
                  <ExternalLink className="w-3 h-3 text-[#E8D8B0]" />
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-[#C5A059]/40 text-[#E8D8B0] hover:bg-[#C5A059] hover:text-[#5A0000] transition-colors text-[11px] font-bold uppercase tracking-wider"
                >
                  <Lock className="w-3 h-3" />
                  <span>Portal CMS Admin</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E5E2E1]/80 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>&copy; 2026 Fakultas Hukum Universitas Pelita Bangsa. Seluruh Hak Cipta Dilindungi.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-light text-[#E8D8B0]">
            <span>Terakreditasi BAN-PT</span>
            <span>&bull;</span>
            <span>Standar Mutu ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
