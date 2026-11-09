"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { RoleType } from "@/lib/validations/auth";
import {
  History,
  Search,
  Filter,
  Users,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface SerializedAuditLog {
  id: number;
  actorId: number | null;
  action: string;
  entity: string;
  entityId: string | null;
  meta: unknown;
  ip: string | null;
  createdAt: string;
  actor: {
    id: number;
    name: string;
    email: string;
    role: RoleType;
  } | null;
}

interface AuditLogClientProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: RoleType;
    roleLabel: string;
  };
  logs: SerializedAuditLog[];
  actionOptions: string[];
  filters: {
    q: string;
    action: string;
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export function AuditLogClient({
  currentUser,
  logs,
  actionOptions,
  filters,
}: AuditLogClientProps) {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.q);
  const [actionFilter, setActionFilter] = useState(filters.action);

  const buildFilterUrl = (overrides: {
    q?: string;
    action?: string;
    page?: number;
  }) => {
    const params = new URLSearchParams();
    const nextQ = overrides.q !== undefined ? overrides.q : searchQuery;
    const nextAction =
      overrides.action !== undefined ? overrides.action : actionFilter;
    const nextPage = overrides.page !== undefined ? overrides.page : 1;

    if (nextQ.trim()) params.set("q", nextQ.trim());
    if (nextAction) params.set("action", nextAction);
    if (nextPage > 1) params.set("page", String(nextPage));

    const qs = params.toString();
    return qs ? `/admin/audit?${qs}` : "/admin/audit";
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      buildFilterUrl({
        q: searchQuery,
        action: actionFilter,
        page: 1,
      })
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActionFilter("");
    router.push("/admin/audit");
  };

  const actionBadgeClass = (action: string) => {
    if (action.includes("FAILED")) {
      return "bg-rose-50 text-rose-800 border-rose-200";
    }
    if (action.includes("CREATED") || action.includes("IMPORTED")) {
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
    if (action.includes("RESET") || action.includes("PASSWORD")) {
      return "bg-amber-50 text-amber-900 border-amber-200";
    }
    if (action.includes("ROLE") || action.includes("STATUS")) {
      return "bg-purple-50 text-purple-900 border-purple-200";
    }
    return "bg-[#FAF7F2] text-[#710912] border-[#E2D9C8]";
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#0D0D0D] font-sans antialiased">
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        userRole={currentUser.role}
      />

      <div className="lg:pl-72 flex flex-col min-h-screen">
        <AdminHeader
          onOpenSearch={() => {}}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-3xl border border-[#E2D9C8] p-6 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#710912] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Khusus SUPER_ADMIN
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D]">
                Log Audit Keamanan &amp; Aktivitas
              </h1>
              <p className="text-xs sm:text-sm text-[#544942] mt-1">
                Rekam jejak seluruh aktivitas autentikasi, pembuatan akun,
                perubahan role, reset sandi, dan impor CSV pada sistem.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/admin/users"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#710912] hover:bg-[#570000] text-white text-xs font-semibold transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Manajemen Pengguna</span>
              </Link>
            </div>
          </div>

          {/* Search & Action Filter */}
          <form
            onSubmit={handleApplyFilters}
            className="bg-white rounded-3xl border border-[#E2D9C8] p-4 sm:p-5 shadow-xs space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
              <div className="lg:col-span-6 relative">
                <Search className="w-4 h-4 text-[#9C8F85] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari aktor, aksi, ID entitas, atau alamat IP..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs text-[#0D0D0D] focus:outline-none focus:border-[#710912]"
                />
              </div>

              <div className="lg:col-span-4">
                <select
                  aria-label="Filter Jenis Aksi"
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs text-[#0D0D0D] focus:outline-none focus:border-[#710912]"
                >
                  <option value="">Semua Jenis Aksi</option>
                  {actionOptions.map((act) => (
                    <option key={act} value={act}>
                      {act}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#0D0D0D] hover:bg-[#710912] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>
                {(filters.q || filters.action) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-3 py-2.5 rounded-2xl border border-[#E2D9C8] text-xs font-medium text-[#544942] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#FAF7F2] text-[11px] text-[#73655D]">
              <span>
                Menampilkan <strong>{logs.length}</strong> dari total{" "}
                <strong>{filters.totalCount}</strong> entri log audit
              </span>
              <span className="inline-flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-[#710912]" />
                Diurutkan dari aktivitas terbaru
              </span>
            </div>
          </form>

          {/* Audit Logs Table */}
          <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2D9C8] bg-[#FAF7F2] text-[11px] font-bold uppercase tracking-wider text-[#73655D]">
                    <th className="py-3.5 px-4">Waktu</th>
                    <th className="py-3.5 px-4">Aktor (Pelaku)</th>
                    <th className="py-3.5 px-4">Aksi</th>
                    <th className="py-3.5 px-4">Entitas &amp; ID</th>
                    <th className="py-3.5 px-4">Alamat IP</th>
                    <th className="py-3.5 px-4">Detail Metadata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF7F2] text-xs">
                  {logs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 px-4 text-center text-[#73655D]"
                      >
                        Belum ada catatan log audit yang sesuai dengan filter.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-[#FAF7F2]/60 transition-colors align-top"
                      >
                        <td className="py-3.5 px-4 whitespace-nowrap text-[11px] text-[#544942]">
                          <div className="font-semibold text-[#0D0D0D]">
                            {new Date(log.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>
                          <div>
                            {new Date(log.createdAt).toLocaleTimeString(
                              "id-ID",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              }
                            )}{" "}
                            WIB
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {log.actor ? (
                            <div>
                              <div className="font-semibold text-[#0D0D0D]">
                                {log.actor.name}
                              </div>
                              <div className="text-[11px] text-[#73655D]">
                                {log.actor.email}
                              </div>
                              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-[#EFE5D2] text-[#710912] text-[9px] font-bold">
                                {log.actor.role}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-[#73655D] italic">
                              Sistem / Anonim
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${actionBadgeClass(
                              log.action
                            )}`}
                          >
                            {log.action}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          <span className="font-semibold text-[#0D0D0D]">
                            {log.entity}
                          </span>
                          {log.entityId && (
                            <span className="block text-[#73655D]">
                              #{log.entityId}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] text-[#544942]">
                          {log.ip || "—"}
                        </td>

                        <td className="py-3.5 px-4 max-w-md">
                          {log.meta ? (
                            <pre className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8] text-[10px] font-mono text-[#0D0D0D] overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(log.meta, null, 2)}
                            </pre>
                          ) : (
                            <span className="text-[#9C8F85] inline-flex items-center gap-1 text-[11px]">
                              <Terminal className="w-3 h-3" /> Tidak ada metadata
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-5 py-4 border-t border-[#E2D9C8] bg-[#FAF7F2]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[#544942]">
                Halaman <strong>{filters.page}</strong> dari{" "}
                <strong>{filters.totalPages}</strong> ({filters.totalCount}{" "}
                log)
              </div>

              <div className="flex items-center gap-2">
                {filters.page > 1 ? (
                  <Link
                    href={buildFilterUrl({ page: filters.page - 1 })}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2D9C8] bg-white hover:bg-[#FAF7F2] font-semibold text-[#0D0D0D]"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2D9C8] bg-white/50 text-[#9C8F85] cursor-not-allowed">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </span>
                )}

                {filters.page < filters.totalPages ? (
                  <Link
                    href={buildFilterUrl({ page: filters.page + 1 })}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2D9C8] bg-white hover:bg-[#FAF7F2] font-semibold text-[#0D0D0D]"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2D9C8] bg-white/50 text-[#9C8F85] cursor-not-allowed">
                    <span>Berikutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

