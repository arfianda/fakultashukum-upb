import React from "react";
import { requireRole, ROLE_LABELS } from "@/lib/rbac";
import { GraduationCap } from "lucide-react";

export default async function MahasiswaDashboardPage() {
  const user = await requireRole("MAHASISWA");

  return (
    <div className="bg-white border border-[#E2D9C8] p-6 sm:p-8 shadow-xs">
      <div className="h-1 w-16 bg-[#570000] mb-5" />
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#570000]/10 border border-[#570000]/20 text-[#570000] text-[10px] font-bold uppercase tracking-widest mb-3">
        <GraduationCap className="w-3.5 h-3.5" />
        <span>GUARDED ROUTE &bull; MAHASISWA</span>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D] mb-2">
        Portal Mahasiswa Ilmu Hukum
      </h1>
      <p className="text-xs sm:text-sm text-[#544942] leading-relaxed">
        Halo, <strong>{user.name}</strong> ({ROLE_LABELS[user.role]} — NIM:{" "}
        <code>{user.identifier || "-"}</code>). Area ini merupakan placeholder
        terproteksi untuk layanan kemahasiswaan, pendaftaran praktikum peradilan
        semu, dan informasi akademik Fakultas Hukum UPB.
      </p>
    </div>
  );
}

