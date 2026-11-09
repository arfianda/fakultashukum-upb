"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  Users,
  UserCog,
  Scale,
  History,
  HelpCircle,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export type AdminViewType = "overview" | "articles" | "agenda" | "faculty" | "klbh" | "security";

interface AdminSidebarProps {
  activeView?: AdminViewType;
  setActiveView?: (view: AdminViewType) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  postCount?: number;
  eventCount?: number;
  facultyCount?: number;
  userRole?: string;
}

export function AdminSidebar({
  activeView = "overview",
  setActiveView,
  mobileOpen,
  setMobileOpen,
  postCount = 0,
  eventCount = 0,
  facultyCount = 0,
  userRole = "SUPER_ADMIN",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isRootAdmin = pathname === "/admin";

  const allNavItems = [
    {
      id: "overview" as AdminViewType,
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      id: "articles" as AdminViewType,
      label: "Artikel & Berita",
      icon: FileText,
      badge: postCount > 0 ? postCount : null,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      id: "agenda" as AdminViewType,
      label: "Agenda & Jadwal",
      icon: CalendarDays,
      badge: eventCount > 0 ? eventCount : null,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      id: "faculty" as AdminViewType,
      label: "Dewan Dosen",
      icon: Users,
      badge: facultyCount > 0 ? facultyCount : null,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      id: "klbh" as AdminViewType,
      label: "Konsultasi KLBH",
      icon: Scale,
      badge: "3",
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
  ];

  const navItems = allNavItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const routeLinks = [
    {
      href: "/admin/users",
      label: "Manajemen Pengguna",
      icon: UserCog,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      href: "/admin/audit",
      label: "Log Audit Sistem",
      icon: History,
      roles: ["SUPER_ADMIN"],
    },
  ].filter((item) => item.roles.includes(userRole));

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
        <div className="h-full bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_4px_24px_rgba(28,27,27,0.04)] flex flex-col justify-between p-5">
          {/* Top Brand Section */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#FAF7F2]">
              <Link
                href="/admin"
                className="flex items-center gap-3 group"
                onClick={() => setMobileOpen(false)}
              >
                {/* Pillio-inspired tilted emblem customized with Academic Maroon & Gold */}
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#710912] to-[#48060B] flex items-center justify-center text-[#EFE5D2] shadow-sm shadow-[#710912]/20 group-hover:scale-105 transition-transform">
                  <Scale className="w-5 h-5 text-[#EFE5D2]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-base tracking-tight text-[#0D0D0D]">
                      Lintas Hukum
                    </span>
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-[#EFE5D2] text-[#710912] border border-[#EFE5D2]/60 shrink-0">
                      FH UPB
                    </span>
                  </div>
                  <p className="text-[11px] text-[#73655D]">Pusat Kelola Fakultas</p>
                </div>
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6 space-y-1.5">
              <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-[#9C8F85] uppercase">
                Menu Utama
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isRootAdmin && activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (isRootAdmin && setActiveView) {
                        setActiveView(item.id);
                      } else {
                        router.push("/admin");
                      }
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#710912] text-white shadow-sm shadow-[#710912]/20"
                        : "text-[#544942] hover:bg-[#FAF7F2] hover:text-[#0D0D0D]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-[#EFE5D2]" : "text-[#73655D]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#F5EDE0] text-[#544942]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="px-3 pt-4 pb-1 text-[11px] font-semibold tracking-wider text-[#9C8F85] uppercase">
                Keamanan &amp; Akun
              </div>
              {routeLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#710912] text-white shadow-sm shadow-[#710912]/20"
                        : "text-[#544942] hover:bg-[#FAF7F2] hover:text-[#0D0D0D]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-[#EFE5D2]" : "text-[#73655D]"
                        }`}
                      />
                      <span>{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 border-t border-[#FAF7F2] space-y-1">
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-[#9C8F85] uppercase">
              Sistem
            </div>

            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-[#544942] hover:bg-[#FAF7F2] hover:text-[#710912] transition-colors"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-[#73655D]" />
                <span>Lihat Web Utama</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#9C8F85]" />
            </Link>

            <Link
              href="/dashboard/ganti-password"
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-[#544942] hover:bg-[#FAF7F2] hover:text-[#710912] transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#73655D]" />
              <span>Ganti Kata Sandi</span>
            </Link>

            <form action={logoutAction} className="mt-2">
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Keluar Sesi</span>
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
