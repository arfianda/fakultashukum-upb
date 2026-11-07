import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/auth";
import {
  Scale,
  LogOut,
  ShieldCheck,
  User,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Administrator",
  ADMIN: "Administrator Fakultas",
  KEPALA_LAB: "Kepala Laboratorium Hukum",
  DEKAN: "Dekan Fakultas Hukum",
  WADEK: "Wakil Dekan Fakultas Hukum",
  DOSEN: "Dosen / Tenaga Pendidik",
  STAFF: "Staf Administrasi",
  MAHASISWA: "Mahasiswa Fakultas Hukum",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { user } = session;
  const isAdmin = user.role === "SUPER_ADMIN" || user.role === "ADMIN";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0D0D0D] font-sans">
      <header className="bg-white border-b border-[#E2D9C8] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#710912] flex items-center justify-center text-[#EFE5D2]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-[#0D0D0D] leading-tight">
                Portal Sivitas Fakultas Hukum
              </h1>
              <p className="text-xs text-[#73655D]">Universitas Pelita Bangsa</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E2D9C8] bg-[#FAF7F2] hover:bg-white text-xs font-semibold text-[#544942] hover:text-[#710912] transition-colors"
            >
              <span>Beranda Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        {user.mustChangePassword && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">
                Pembaruan Kata Sandi Diperlukan
              </strong>
              <span>
                Anda menggunakan kata sandi awal. Demi keamanan akun, silakan segera perbarui kata sandi Anda.
              </span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-[#E2D9C8] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FAF7F2]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#710912]/10 border border-[#710912]/20 flex items-center justify-center text-[#710912]">
                <User className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#710912] text-white text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{ROLE_LABELS[user.role] || user.role}</span>
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0D0D0D]">
                  Selamat Datang, {user.name}
                </h2>
              </div>
            </div>

            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#710912] hover:bg-[#48060B] text-white text-xs font-semibold transition-colors"
              >
                <span>Buka Panel Admin CMS</span>
              </Link>
            )}
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8]">
              <dt className="text-[#73655D] uppercase tracking-wider font-semibold mb-1">
                ID Pengguna
              </dt>
              <dd className="font-mono text-sm font-bold text-[#0D0D0D]">
                #{user.id}
              </dd>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8]">
              <dt className="text-[#73655D] uppercase tracking-wider font-semibold mb-1">
                Peran Sistem (Role)
              </dt>
              <dd className="font-semibold text-sm text-[#710912]">
                {user.role}
              </dd>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8]">
              <dt className="text-[#73655D] uppercase tracking-wider font-semibold mb-1">
                Unit Laboratorium
              </dt>
              <dd className="font-semibold text-sm text-[#0D0D0D]">
                {user.labId ? `Lab ID #${user.labId}` : "Umum / Fakultas"}
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}

