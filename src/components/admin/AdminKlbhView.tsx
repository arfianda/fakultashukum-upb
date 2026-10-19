"use client";

import React, { useState } from "react";
import {
  Scale,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  UserCheck,
} from "lucide-react";

interface LegalCase {
  id: number;
  caseNumber: string;
  clientName: string;
  category: "Hukum Pidana" | "Hukum Perdata" | "Sengketa Agraria/Tanah" | "Ketenagakerjaan";
  assignedAdvocate: string;
  stage: "Pendaftaran" | "Mediasi" | "Litigasi Pengadilan" | "Selesai";
  filingDate: string;
  urgency: "Tinggi" | "Normal";
}

export function AdminKlbhView() {
  const [cases, setCases] = useState<LegalCase[]>([
    {
      id: 1,
      caseNumber: "BKBH/2026/X/042",
      clientName: "Siti Rahmawati (Masyarakat Cikarang)",
      category: "Sengketa Agraria/Tanah",
      assignedAdvocate: "Advokat Posbangkum FH UPB",
      stage: "Mediasi",
      filingDate: "12 Oktober 2026",
      urgency: "Tinggi",
    },
    {
      id: 2,
      caseNumber: "BKBH/2026/X/039",
      clientName: "Buruh Manufaktur Kawasan GIIC",
      category: "Ketenagakerjaan",
      assignedAdvocate: "Dosen Pembimbing Klinis",
      stage: "Pendaftaran",
      filingDate: "10 Oktober 2026",
      urgency: "Normal",
    },
    {
      id: 3,
      caseNumber: "BKBH/2026/IX/028",
      clientName: "Ahmad Junaidi (Bantuan Litigasi)",
      category: "Hukum Pidana",
      assignedAdvocate: "Tim Advokat Muda UPB",
      stage: "Litigasi Pengadilan",
      filingDate: "28 September 2026",
      urgency: "Tinggi",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = cases.filter(
    (c) =>
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Metric */}
      <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#710912] uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Klinik &amp; Konsultasi Bantuan Hukum (KLBH FH UPB)</span>
          </div>
          <h2 className="font-serif text-xl font-bold text-[#0D0D0D]">
            Pelayanan Advokasi Pro Bono &amp; Pengabdian Masyarakat
          </h2>
          <p className="text-xs text-[#73655D] mt-1">
            Memonitor penanganan kasus peradilan masyarakat kurang mampu bersama tim advokat dosen &amp; mahasiswa.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center px-4 py-2 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8]">
            <div className="font-serif text-2xl font-bold text-[#710912]">{cases.length}</div>
            <div className="text-[10px] text-[#73655D] font-semibold">Kasus Aktif</div>
          </div>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9C8F85]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor perkara, pemohon..."
              className="pl-8 pr-3 py-1.5 bg-[#FAF7F2] border border-[#E2D9C8] rounded-full text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none w-56 sm:w-72"
            />
          </div>

          <div className="text-xs text-[#73655D]">
            Menampilkan <span className="font-bold text-[#0D0D0D]">{filteredCases.length}</span> perkara
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#FAF7F2] text-[#73655D] font-semibold text-[11px]">
                <th className="pb-3 pl-2">No. Perkara</th>
                <th className="pb-3">Pemohon / Klien</th>
                <th className="pb-3">Klasifikasi</th>
                <th className="pb-3">Advokat Pembimbing</th>
                <th className="pb-3">Tahapan Advokasi</th>
                <th className="pb-3 pr-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF7F2]">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-3.5 pl-2 font-mono text-[11px] font-medium text-[#710912]">
                    {c.caseNumber}
                  </td>
                  <td className="py-3.5 font-medium text-[#0D0D0D]">{c.clientName}</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EFE5D2] text-[#710912] border border-[#EFE5D2] text-[10px] font-bold">
                      {c.category}
                    </span>
                  </td>
                  <td className="py-3.5 text-[#544942]">{c.assignedAdvocate}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.stage === "Mediasi"
                          ? "bg-blue-50 text-blue-700"
                          : c.stage === "Litigasi Pengadilan"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {c.stage}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#710912] text-[#544942] hover:text-white text-[11px] font-semibold transition-colors"
                    >
                      Buka Berkas
                    </button>
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
