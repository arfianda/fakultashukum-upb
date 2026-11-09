"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";
import type { RoleType } from "@/lib/validations/auth";
import {
  Scale,
  LayoutDashboard,
  FlaskConical,
  Building2,
  BookOpen,
  Briefcase,
  GraduationCap,
  KeyRound,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

interface DashboardShellProps {
  user: {
    id: number;
    name: string;
    email: string;
    role: RoleType;
    roleLabel: string;
    mustChangePassword: boolean;
  };
  children: React.ReactNode;
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: RoleType[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Ringkasan Portal",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "KEPALA_LAB",
      "DEKAN",
      "WADEK",
      "DOSEN",
      "STAFF",
      "MAHASISWA",
    ],
  },
  {
    label: "Laboratorium Hukum",
    href: "/dashboard/lab",
    icon: FlaskConical,
    roles: ["KEPALA_LAB"],
  },
  {
    label: "Pimpinan & Dekanat",
    href: "/dashboard/pimpinan",
    icon: Building2,
    roles: ["DEKAN", "WADEK"],
  },
  {
    label: "Portal Dosen",
    href: "/dashboard/dosen",
    icon: BookOpen,
    roles: ["DOSEN"],
  },
  {
    label: "Operasional Staf",
    href: "/dashboard/staff",
    icon: Briefcase,
    roles: ["STAFF"],
  },
  {
    label: "Portal Mahasiswa",
    href: "/dashboard/mahasiswa",
    icon: GraduationCap,
    roles: ["MAHASISWA"],
  },
  {
    label: "Panel Admin CMS",
    href: "/admin",
    icon: ShieldCheck,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    label: "Ganti Kata Sandi",
    href: "/dashboard/ganti-password",
    icon: KeyRound,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "KEPALA_LAB",
      "DEKAN",
      "WADEK",
      "DOSEN",
      "STAFF",
      "MAHASISWA",
    ],
  },
];

export function DashboardShell({ user, children }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleMenus = MENU_ITEMS.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0D0D0D] font-sans flex">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-68 bg-white border-r border-[#E2D9C8] flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#E2D9C8] flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#570000] text-white flex items-center justify-center shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif font-bold text-base text-[#0D0D0D] block leading-tight">
                  Portal Sivitas
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#570000] block">
                  Fakultas Hukum UPB
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 text-[#544942] hover:text-[#0D0D0D]"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Menu */}
          <nav className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#73655D]">
              Menu {user.roleLabel}
            </div>
            {visibleMenus.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#570000] text-white"
                      : "text-[#544942] hover:bg-[#FAF7F2] hover:text-[#0D0D0D]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#E8D8B0]" : "text-[#73655D]"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Links */}
        <div className="p-4 border-t border-[#E2D9C8] space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-[#544942] hover:bg-[#FAF7F2] hover:text-[#570000] transition-colors"
          >
            <span>Website Publik FH</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Sesi</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-[#E2D9C8] px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 border border-[#E2D9C8] text-[#0D0D0D]"
              aria-label="Buka navigasi"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <span className="text-xs font-semibold text-[#73655D] block">
                Sesi Terotentikasi
              </span>
              <span className="font-serif font-bold text-sm text-[#0D0D0D]">
                {user.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#570000]/10 border border-[#570000]/20 text-[#570000] text-[11px] font-bold uppercase tracking-wider">
              {user.roleLabel} ({user.role})
            </span>

            <form action={logoutAction} className="hidden sm:block">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#E2D9C8] hover:border-rose-300 hover:bg-rose-50 text-xs font-semibold text-[#0D0D0D] hover:text-rose-800 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

