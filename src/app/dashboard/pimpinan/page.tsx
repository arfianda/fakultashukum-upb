import React from "react";
import { requireRole, ROLE_LABELS } from "@/lib/rbac";
import { Building2 } from "lucide-react";

export default async function PimpinanDashboardPage() {
  const user = await requireRole("DEKAN", "WADEK");

  return (
    <div className="bg-white border border-[#E2D9C8] p-6 sm:p-8 shadow-xs">
      <div className="h-1 w-16 bg-[#570000] mb-5" />
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#570000]/10 border border-[#570000]/20 text-[#570000] text-[10px] font-bold uppercase tracking-widest mb-3">
        <Building2 className="w-3.5 h-3.5" />
        <span>GUARDED ROUTE &bull; DEKAN &amp; WADEK</span>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D] mb-2">
        Panel Eksekutif Pimpinan Dekanat
      </h1>
      <p className="text-xs sm:text-sm text-[#544942] leading-relaxed">
        Selamat bertugas, <strong>{user.name}</strong> ({ROLE_LABELS[user.role]}).
        Area ini merupakan placeholder terproteksi untuk pemantauan indikator
        kinerja utama fakultas, laporan akreditasi, dan pengesahan kebijakan
        akademik.
      </p>
    </div>
  );
}

