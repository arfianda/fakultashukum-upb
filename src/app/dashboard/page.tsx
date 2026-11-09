import React from "react";
import Link from "next/link";
import {
  requireAuthenticatedUser,
  ROLE_LABELS,
  ROLE_PERMISSIONS,
  getRoleHomePath,
} from "@/lib/rbac";
import { ShieldCheck, ArrowRight, KeyRound, User } from "lucide-react";

export default async function DashboardPage() {
  const user = await requireAuthenticatedUser();
  const roleLabel = ROLE_LABELS[user.role] || user.role;
  const permissions = ROLE_PERMISSIONS[user.role] || [];
  const primaryWorkspace = getRoleHomePath(user.role);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E2D9C8] p-6 sm:p-8 shadow-xs">
        <div className="h-1 w-16 bg-[#570000] mb-5" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2D9C8]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#570000]/10 border border-[#570000]/20 flex items-center justify-center text-[#570000]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#570000] text-white text-[10px] font-bold uppercase tracking-widest mb-1">
                <ShieldCheck className="w-3 h-3" />
                <span>{roleLabel}</span>
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D]">
                Selamat Datang, {user.name}
              </h1>
            </div>
          </div>

          {primaryWorkspace !== "/dashboard" && (
            <Link
              href={primaryWorkspace}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#570000] hover:bg-[#410000] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Buka Ruang Kerja {roleLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
          <div className="p-4 bg-[#FAF7F2] border border-[#E2D9C8]">
            <dt className="text-[#73655D] uppercase tracking-wider font-semibold mb-1">
              Email Institusi
            </dt>
            <dd className="font-semibold text-sm text-[#0D0D0D] break-all">
              {user.email}
            </dd>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#E2D9C8]">
            <dt className="text-[#73655D] uppercase tracking-wider font-semibold mb-1">
              Nomor Induk (NIM / NIDN / NIP)
            </dt>
            <dd className="font-mono font-bold text-sm text-[#0D0D0D]">
              {user.identifier || "-"}
            </dd>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#E2D9C8]">
            <dt className="text-[#73655D] uppercase tracking-wider font-semibold mb-1">
              Unit Laboratorium
            </dt>
            <dd className="font-semibold text-sm text-[#0D0D0D]">
              {user.labId ? `Lab ID #${user.labId}` : "Umum / Fakultas Hukum"}
            </dd>
          </div>
        </dl>

        <div className="mt-6 pt-5 border-t border-[#E2D9C8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#73655D] block mb-2">
              Izin Aktif (RBAC Permissions):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {permissions.map((perm) => (
                <span
                  key={perm}
                  className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E2D9C8] text-[11px] font-mono text-[#0D0D0D]"
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/ganti-password"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E2D9C8] hover:border-[#570000] text-xs font-semibold text-[#0D0D0D] transition-colors shrink-0"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#570000]" />
            <span>Perbarui Kata Sandi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
