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
      user: "Dr. Hendra (Admin)",
    },
    {
      id: 2,
      action: "Pembaruan Profil Dewan Guru Besar",
      target: "Prof. Dr. Dolor Sit Amet, S.H.",
      sanitizer: "Input Validation (Zod-ready)",
      status: "Berhasil Diperbarui",
      time: "Hari ini, 09:15 WIB",
      user: "Dr. Hendra (Admin)",
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
        <div className="bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7A756F] mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Status Sanitasi XSS</span>
          </div>
          <div className="font-serif text-2xl font-bold text-emerald-700">DOMPurify Aktif</div>
          <p className="text-[11px] text-[#7A756F] mt-1">Semua input HTML disanitasi di sisi server</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7A756F] mb-1">
            <Lock className="w-4 h-4 text-[#800000]" />
            <span>Protokol Keamanan</span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#1C1B1B]">Role-Based Access</div>
          <p className="text-[11px] text-[#7A756F] mt-1">Hanya staf berwenang yang dapat memublikasikan</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7A756F] mb-1">
            <Database className="w-4 h-4 text-[#C5A059]" />
            <span>Penyimpanan Data</span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#1C1B1B]">Prisma ORM</div>
          <p className="text-[11px] text-[#7A756F] mt-1">Terintegrasi SQLite &amp; failover lokal aman</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F2EFE9] mb-4">
          <div>
            <h3 className="font-serif font-bold text-base text-[#1C1B1B]">
              Log Audit Aktivitas &amp; Keamanan
            </h3>
            <p className="text-xs text-[#7A756F]">
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
              <tr className="border-b border-[#F2EFE9] text-[#7A756F] font-semibold text-[11px]">
                <th className="pb-3 pl-2">Aktivitas</th>
                <th className="pb-3">Entitas Sasaran</th>
                <th className="pb-3">Mekanisme Pengamanan</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Waktu</th>
                <th className="pb-3 pr-2 text-right">Inisiator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EC]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-3.5 pl-2 font-medium text-[#1C1B1B]">{log.action}</td>
                  <td className="py-3.5 text-[#5C5854] max-w-xs truncate">{log.target}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#F8F7F4] border border-[#EBE7E1] font-mono text-[10px] text-[#5C5854]">
                      {log.sanitizer}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 text-[11px] text-[#7A756F]">{log.time}</td>
                  <td className="py-3.5 pr-2 text-right font-medium text-[#1C1B1B]">
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
