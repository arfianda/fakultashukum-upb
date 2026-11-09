import React from "react";
import { requireRole, ROLE_LABELS } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { FlaskConical, ShieldCheck } from "lucide-react";

export default async function LabDashboardPage() {
  const user = await requireRole("KEPALA_LAB");
  const labs = await prisma.lab.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="bg-white border border-[#E2D9C8] p-6 sm:p-8 shadow-xs">
      <div className="h-1 w-16 bg-[#570000] mb-5" />
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#570000]/10 border border-[#570000]/20 text-[#570000] text-[10px] font-bold uppercase tracking-widest mb-3">
        <FlaskConical className="w-3.5 h-3.5" />
        <span>GUARDED ROUTE &bull; KEPALA_LAB</span>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D] mb-2">
        Ruang Kelola Laboratorium Hukum
      </h1>
      <p className="text-xs sm:text-sm text-[#544942] leading-relaxed mb-6">
        Halaman khusus bagi <strong>{ROLE_LABELS[user.role]}</strong> ({user.name})
        untuk mengelola jadwal praktikum peradilan semu, inventarisasi berkas
        perkara, dan aktivitas Klinik Bantuan Hukum.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="p-4 bg-[#FAF7F2] border border-[#E2D9C8]"
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-serif font-bold text-base text-[#0D0D0D]">
                {lab.name}
              </h2>
              <ShieldCheck className="w-4 h-4 text-[#570000]" />
            </div>
            <p className="text-xs text-[#544942] leading-relaxed">
              {lab.description || "Unit laboratorium aktif Fakultas Hukum UPB."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

