"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
  CheckCircle,
  ExternalLink,
  Shield,
  LogOut,
  User,
} from "lucide-react";

interface AdminHeaderProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

export function AdminHeader({ onOpenSearch, onOpenMobileMenu }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Verifikasi Jurnal Baru Masuk",
      time: "15 menit lalu",
      unread: true,
      desc: "Naskah Kajian Konstitusi membutuhkan telaah sejawat.",
    },
    {
      id: 2,
      title: "Perubahan Jadwal Ruang Sidang",
      time: "1 jam lalu",
      unread: true,
      desc: "Ruang Moot Court Lt. 3 dialokasikan untuk gladi bersih NMCC.",
    },
    {
      id: 3,
      title: "Sanitasi XSS Berhasil Dilakukan",
      time: "Hari ini, 08:30 WIB",
      unread: false,
      desc: "Semua input konten dibersihkan oleh DOMPurify.",
    },
  ];

  return (
    <header className="sticky top-0 z-30 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Pill Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onOpenMobileMenu}
            aria-label="Buka menu navigasi"
            className="lg:hidden p-2 rounded-xl text-[#544942] hover:bg-[#FAF7F2] hover:text-[#0D0D0D] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Interactive Pill Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-4 py-2 bg-[#FAF7F2] hover:bg-[#FAF7F2] border border-[#E2D9C8] rounded-full text-left transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-xs text-[#73655D]">
              <Search className="w-4 h-4 text-[#9C8F85] group-hover:text-[#710912] transition-colors" />
              <span className="hidden sm:inline">Cari artikel, agenda sidang, direktori pakar...</span>
              <span className="sm:hidden">Cari data...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-[#73655D] bg-white rounded-md border border-[#E2D9C8] shadow-xs">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Message, Notification Bell & Profile Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Chat / Message icon */}
          <button
            type="button"
            title="Pesan &amp; Notula Konsultasi"
            className="relative w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#FAF7F2] border border-[#E2D9C8] flex items-center justify-center text-[#544942] hover:text-[#710912] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Notification Bell with Badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Pemberitahuan Sistem"
              className="relative w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#FAF7F2] border border-[#E2D9C8] flex items-center justify-center text-[#544942] hover:text-[#710912] transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#710912] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                2
              </span>
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl border border-[#E2D9C8] shadow-[0_12px_32px_rgba(28,27,27,0.12)] p-4 z-50 animate-dropdown">
                <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#0D0D0D]">Notifikasi</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#EFE5D2] text-[#710912] rounded-full">
                      2 baru
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-[#73655D] hover:text-[#710912]"
                  >
                    Tandai dibaca
                  </button>
                </div>

                <div className="divide-y divide-[#FAF7F2] mt-2 max-h-72 overflow-y-auto">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`py-2.5 px-2 rounded-xl transition-colors ${
                        item.unread ? "bg-[#FAF7F2]/60" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-xs text-[#0D0D0D]">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#9C8F85] whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#544942] mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Pill (Matching Pillio's John Mallory profile capsule) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 bg-[#FAF7F2] hover:bg-[#FAF7F2] border border-[#E2D9C8] rounded-full transition-colors cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#C28D39]/40 bg-[#710912]">
                <Image
                  src="/images/prof-hendra.jpg"
                  alt="Admin Avatar"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="hidden sm:block text-left">
                <div className="font-semibold text-xs text-[#0D0D0D] leading-tight">
                  Dr. Hendra, S.H.
                </div>
                <div className="text-[10px] text-[#73655D] leading-tight">@admin_dekanat</div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-[#73655D]" />
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-[#E2D9C8] shadow-[0_12px_32px_rgba(28,27,27,0.12)] p-2 z-50 animate-dropdown">
                <div className="px-3 py-2 border-b border-[#FAF7F2] mb-1">
                  <p className="font-serif font-bold text-xs text-[#0D0D0D]">Dr. Hendra Arfianda, S.H.</p>
                  <p className="text-[10px] text-[#73655D]">Biro Komunikasi &amp; Akademik</p>
                </div>

                <Link
                  href="/"
                  target="_blank"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#544942] hover:bg-[#FAF7F2] hover:text-[#710912] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Kunjungi Portal Publik</span>
                </Link>

                <div className="px-3 py-2 text-[11px] text-[#544942] flex items-center gap-2 border-t border-[#FAF7F2] mt-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sesi Aman (DOMPurify)</span>
                </div>

                <Link
                  href="/admin/login"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
