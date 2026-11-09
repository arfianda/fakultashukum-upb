import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/auth";
import { ROLE_LABELS, getRoleHomePath } from "@/lib/rbac";
import type { RoleType } from "@/lib/validations/auth";
import { ShieldAlert, ArrowLeft, Home, LogOut, Lock } from "lucide-react";

interface ForbiddenPageProps {
  searchParams: Promise<{
    required?: string;
    permission?: string;
    current?: string;
    from?: string;
  }>;
}

export default async function ForbiddenPage({
  searchParams,
}: ForbiddenPageProps) {
  const params = await searchParams;
  const session = await auth();
  const currentRole = (session?.user?.role ||
    params.current ||
    "MAHASISWA") as RoleType;
  const homePath = session?.user ? getRoleHomePath(currentRole) : "/login";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0D0D0D] font-sans flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white border border-[#E2D9C8] shadow-xs p-8 sm:p-10">
        {/* Top Accent Line */}
        <div className="h-1 w-20 bg-[#570000] mb-6" />

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#570000]/10 border border-[#570000]/20 text-[#570000] text-[11px] font-bold uppercase tracking-widest mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>HTTP 403 &bull; OTORISASI DITOLAK</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D0D0D] tracking-tight mb-3">
          Akses Tidak Diizinkan
        </h1>

        <p className="text-sm text-[#544942] leading-relaxed mb-6">
          Maaf, akun Anda tidak memiliki hak akses (otorisasi) yang diperlukan
          untuk membuka halaman atau sumber daya ini. Seluruh percobaan akses
          lintas wewenang diawasi oleh sistem keamanan Fakultas Hukum UPB.
        </p>

        {/* Details Box */}
        <div className="bg-[#FAF7F2] border border-[#E2D9C8] p-4 mb-8 space-y-2.5 text-xs">
          {session?.user && (
            <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-2">
              <span className="text-[#73655D] font-medium">Pengguna Aktif:</span>
              <span className="font-semibold text-[#0D0D0D]">
                {session.user.name}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-2">
            <span className="text-[#73655D] font-medium">Peran Anda Saat Ini:</span>
            <span className="font-mono font-bold text-[#570000]">
              {ROLE_LABELS[currentRole] || currentRole} ({currentRole})
            </span>
          </div>

          {params.required && (
            <div className="flex items-center justify-between">
              <span className="text-[#73655D] font-medium">
                Peran yang Diizinkan:
              </span>
              <span className="font-mono font-semibold text-[#0D0D0D]">
                {params.required}
              </span>
            </div>
          )}

          {params.permission && (
            <div className="flex items-center justify-between">
              <span className="text-[#73655D] font-medium">
                Izin (Permission) Diperlukan:
              </span>
              <span className="font-mono font-semibold text-[#0D0D0D]">
                {params.permission}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href={homePath}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#570000] hover:bg-[#410000] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portal Saya</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#E2D9C8] bg-white hover:bg-[#FAF7F2] text-[#0D0D0D] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </Link>

          {session?.user && (
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E2D9C8] flex items-center justify-between text-[11px] text-[#73655D]">
          <span className="inline-flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Proteksi RBAC Server-Side
          </span>
          <span>Fakultas Hukum UPB</span>
        </div>
      </div>
    </div>
  );
}

