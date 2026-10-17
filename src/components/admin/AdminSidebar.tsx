"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  Users,
  Scale,
  ShieldCheck,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export type AdminViewType = "overview" | "articles" | "agenda" | "faculty" | "klbh" | "security";

interface AdminSidebarProps {
  activeView: AdminViewType;
  setActiveView: (view: AdminViewType) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  postCount: number;
  eventCount: number;
  facultyCount: number;
}

export function AdminSidebar({
  activeView,
  setActiveView,
  mobileOpen,
  setMobileOpen,
  postCount,
  eventCount,
  facultyCount,
}: AdminSidebarProps) {
  const navItems = [
    {
      id: "overview" as AdminViewType,
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "articles" as AdminViewType,
      label: "Artikel & Riset",
      icon: FileText,
      badge: postCount > 0 ? postCount : null,
    },
    {
      id: "agenda" as AdminViewType,
      label: "Agenda & Jadwal",
      icon: CalendarDays,
      badge: eventCount > 0 ? eventCount : null,
    },
    {
      id: "faculty" as AdminViewType,
      label: "Dewan Dosen",
      icon: Users,
      badge: facultyCount > 0 ? facultyCount : null,
    },
    {
      id: "klbh" as AdminViewType,
      label: "Konsultasi KLBH",
      icon: Scale,
      badge: "3",
    },
    {
      id: "security" as AdminViewType,
      label: "Log Keamanan",
      icon: ShieldCheck,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Floating Pill Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 p-4 transition-transform duration-300 ease-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_4px_24px_rgba(28,27,27,0.04)] flex flex-col justify-between p-5">
          {/* Top Brand Section */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#F2EFE9]">
              <Link
                href="/admin"
                className="flex items-center gap-3 group"
                onClick={() => setMobileOpen(false)}
              >
                {/* Pillio-inspired tilted emblem customized with Academic Maroon & Gold */}
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#800000] to-[#570000] flex items-center justify-center text-[#E8D8B0] shadow-sm shadow-[#800000]/20 group-hover:scale-105 transition-transform">
                  <Scale className="w-5 h-5 text-[#E8D8B0]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-base tracking-tight text-[#1C1B1B]">
                      Lintas Hukum
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FAF4E8] text-[#800000] border border-[#E8D8B0]/60 shrink-0">
                      FH UPB
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A756F]">Pusat Kelola Fakultas</p>
                </div>
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6 space-y-1.5">
              <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-[#A39E97] uppercase">
                Menu Utama
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#800000] text-white shadow-sm shadow-[#800000]/20"
                        : "text-[#5C5854] hover:bg-[#F8F7F4] hover:text-[#1C1B1B]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-[#E8D8B0]" : "text-[#7A756F]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#F4F1EA] text-[#5C5854]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 border-t border-[#F2EFE9] space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-[#A39E97] uppercase">
              Sistem
            </div>

            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-[#5C5854] hover:bg-[#F8F7F4] hover:text-[#800000] transition-colors"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-[#7A756F]" />
                <span>Lihat Web Utama</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#A39E97]" />
            </Link>

            <button
              onClick={() => setActiveView("security")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeView === "security"
                  ? "bg-[#F8F7F4] text-[#800000] font-semibold"
                  : "text-[#5C5854] hover:bg-[#F8F7F4] hover:text-[#1C1B1B]"
              }`}
            >
              <Settings className="w-4 h-4 text-[#7A756F]" />
              <span>Pengaturan &amp; Audit</span>
            </button>

            <a
              href="mailto:hukum@pelitabangsa.ac.id"
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-[#5C5854] hover:bg-[#F8F7F4] hover:text-[#1C1B1B] transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#7A756F]" />
              <span>Bantuan &amp; Kontak</span>
            </a>

            <Link
              href="/admin/login"
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors mt-2"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Keluar Sesi</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
