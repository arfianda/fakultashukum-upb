"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Server,
  FileCode,
  Key,
  Database,
  RefreshCw,
} from "lucide-react";

export function AdminSecurityView() {
  const auditLogs = [
    {
      id: 1,
      action: "Sanitasi Konten Artikel",
      target: "Analisis Kepatutan Putusan Peradilan Niaga",
      sanitizer: "isomorphic-dompurify",
      status: "Lolos Uji Keamanan",
      time: "Hari ini, 11:24 WIB",
      user: "Superadmin",
    },
    {
      id: 2,
      action: "Pembaruan Profil Dewan Guru Besar",
      target: "Prof. Dr. Dolor Sit Amet, S.H.",
      sanitizer: "Input Validation (Zod-ready)",
      status: "Berhasil Diperbarui",
      time: "Hari ini, 09:15 WIB",
      user: "Admin Hukum",
    },
    {
      id: 3,
      action: "Otentikasi Sesi Dekanat",
      target: "JWT Session / Role Administrator",
      sanitizer: "NextAuth v5",
      status: "Terverifikasi Aman",
      time: "Hari ini, 08:30 WIB",
      user: "admin_dekanat@pelitabangsa.ac.id",
    },
    {
      id: 4,
      action: "Pembersihan Tag Skrip Berbahaya",
      target: "Formulir Naskah Kajian",
      sanitizer: "DOMPurify Strip Script Tags",
      status: "Threat Mitigated",
      time: "Kemarin, 16:40 WIB",
      user: "Sistem Otomatis",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#73655D] mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Status Sanitasi XSS</span>
          </div>
          <div className="font-serif text-2xl font-bold text-emerald-700">DOMPurify Aktif</div>
          <p className="text-[11px] text-[#73655D] mt-1">Semua input HTML disanitasi di sisi server</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#73655D] mb-1">
            <Lock className="w-4 h-4 text-[#710912]" />
            <span>Protokol Keamanan</span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#0D0D0D]">Role-Based Access</div>
          <p className="text-[11px] text-[#73655D] mt-1">Hanya staf berwenang yang dapat memublikasikan</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#73655D] mb-1">
            <Database className="w-4 h-4 text-[#C28D39]" />
            <span>Penyimpanan Data</span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#0D0D0D]">Prisma ORM</div>
          <p className="text-[11px] text-[#73655D] mt-1">Terintegrasi SQLite &amp; failover lokal aman</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2] mb-4">
          <div>
            <h3 className="font-serif font-bold text-base text-[#0D0D0D]">
              Log Audit Aktivitas &amp; Keamanan
            </h3>
            <p className="text-xs text-[#73655D]">
              Jejak digital pengubahan data fakultas dan sanitasi naskah
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-700 font-semibold">Live Monitoring</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#FAF7F2] text-[#73655D] font-semibold text-[11px]">
                <th className="pb-3 pl-2">Aktivitas</th>
                <th className="pb-3">Entitas Sasaran</th>
                <th className="pb-3">Mekanisme Pengamanan</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Waktu</th>
                <th className="pb-3 pr-2 text-right">Inisiator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF7F2]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-3.5 pl-2 font-medium text-[#0D0D0D]">{log.action}</td>
                  <td className="py-3.5 text-[#544942] max-w-xs truncate">{log.target}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E2D9C8] font-mono text-[10px] text-[#544942]">
                      {log.sanitizer}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 text-[11px] text-[#73655D]">{log.time}</td>
                  <td className="py-3.5 pr-2 text-right font-medium text-[#0D0D0D]">
                    {log.user}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
