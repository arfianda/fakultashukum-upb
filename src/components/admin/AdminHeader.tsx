"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { logoutAction } from "@/lib/actions/auth";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
  CheckCheck,
  ExternalLink,
  Shield,
  LogOut,
  User,
  FileText,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface AdminHeaderProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onNavigateToView?: (view: "overview" | "articles" | "agenda" | "faculty" | "klbh") => void;
}

interface NotificationItem {
  id: number;
  title: string;
  time: string;
  unread: boolean;
  desc: string;
  category: "jurnal" | "jadwal" | "keamanan";
  targetView?: "articles" | "agenda" | "overview";
}

export function AdminHeader({
  onOpenSearch,
  onOpenMobileMenu,
  onNavigateToView,
}: AdminHeaderProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifFilter, setNotifFilter] = useState<"all" | "unread">("all");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const userName = session?.user?.name || "Superadmin";
  const userHandle = `@${(session?.user?.name || "superadmin")
    .toLowerCase()
    .replace(/\s+/g, ".")}`;
  const userRole = (session?.user as { role?: string })?.role;
  const roleSubtitleMap: Record<string, string> = {
    SUPER_ADMIN: "Hak Akses Penuh Sistem",
    ADMIN: "Administrator Portal & CMS",
    KEPALA_LAB: "Kepala Laboratorium Hukum",
    DEKAN: "Dekan Fakultas Hukum",
    WADEK: "Wakil Dekan FH UPB",
    DOSEN: "Tenaga Pendidik FH UPB",
    STAFF: "Tenaga Kependidikan",
    MAHASISWA: "Sivitas Akademika",
  };
  const roleSubtitle =
    (userRole && roleSubtitleMap[userRole]) || "Hak Akses Sistem";

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Verifikasi Jurnal Baru Masuk",
      time: "15 menit lalu",
      unread: true,
      desc: "Naskah Kajian Konstitusi membutuhkan telaah sejawat sebelum diterbitkan.",
      category: "jurnal",
      targetView: "articles",
    },
    {
      id: 2,
      title: "Perubahan Jadwal Ruang Sidang",
      time: "1 jam lalu",
      unread: true,
      desc: "Ruang Moot Court Lt. 3 dialokasikan untuk gladi bersih delegasi NMCC.",
      category: "jadwal",
      targetView: "agenda",
    },
    {
      id: 3,
      title: "Sanitasi XSS Berhasil Dilakukan",
      time: "Hari ini, 08:30 WIB",
      unread: false,
      desc: "Semua input konten telah dibersihkan otomatis oleh DOMPurify.",
      category: "keamanan",
      targetView: "overview",
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const filteredNotifications =
    notifFilter === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications;

  // Close popovers on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
    );
    if (item.targetView && onNavigateToView) {
      onNavigateToView(item.targetView);
      setShowNotifications(false);
    }
  };

  const getCategoryIcon = (category: NotificationItem["category"]) => {
    switch (category) {
      case "jurnal":
        return <FileText className="w-4 h-4 text-[#710912]" />;
      case "jadwal":
        return <Calendar className="w-4 h-4 text-amber-700" />;
      case "keamanan":
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-[#E2D9C8] shadow-[0_2px_16px_rgba(28,27,27,0.03)] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Pill Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onOpenMobileMenu}
            aria-label="Buka menu navigasi"
            className="lg:hidden p-2 rounded-xl text-[#544942] hover:bg-[#FAF7F2] hover:text-[#0D0D0D] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Interactive Pill Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-4 py-2 bg-[#FAF7F2] hover:bg-white border border-[#E2D9C8] hover:border-[#710912]/40 hover:shadow-[0_4px_14px_rgba(113,9,18,0.06)] rounded-full text-left transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-xs text-[#73655D] group-hover:text-[#0D0D0D] transition-colors">
              <Search className="w-4 h-4 text-[#9C8F85] group-hover:text-[#710912] group-hover:scale-110 transition-all" />
              <span className="hidden sm:inline">
                Cari artikel, agenda sidang, direktori pakar...
              </span>
              <span className="sm:hidden">Cari data...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-[#73655D] group-hover:text-[#710912] bg-white rounded-md border border-[#E2D9C8] group-hover:border-[#710912]/30 shadow-xs transition-colors">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Message, Notification Bell & Profile Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Chat / Message icon */}
          <button
            type="button"
            onClick={() => {
              if (onNavigateToView) {
                onNavigateToView("klbh");
              }
            }}
            title="Pesan &amp; Notula Konsultasi KLBH"
            className="relative w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#710912] border border-[#E2D9C8] hover:border-[#710912] flex items-center justify-center text-[#544942] hover:text-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Notification Bell with Badge */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setShowNotifications((prev) => !prev);
                setShowProfileMenu(false);
              }}
              aria-expanded={showNotifications}
              title="Pemberitahuan Sistem"
              className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                showNotifications
                  ? "bg-[#710912] border-[#710912] text-white shadow-sm shadow-[#710912]/25"
                  : "bg-[#FAF7F2] hover:bg-white border-[#E2D9C8] hover:border-[#710912]/50 text-[#544942] hover:text-[#710912] hover:-translate-y-0.5 hover:shadow-xs"
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#710912] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-[400px] bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_16px_40px_rgba(28,27,27,0.14)] overflow-hidden z-50 animate-dropdown">
                {/* Popover Header */}
                <div className="p-4 bg-gradient-to-b from-[#FAF7F2] to-white border-b border-[#E2D9C8]/70">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#0D0D0D]">
                        Notifikasi
                      </span>
                      {unreadCount > 0 ? (
                        <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#710912] text-white rounded-full shadow-2xs">
                          {unreadCount} baru
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                          Semua terbaca
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={unreadCount === 0}
                      onClick={handleMarkAllAsRead}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#710912] hover:text-[#48060B] disabled:text-[#9C8F85] disabled:cursor-default px-2.5 py-1 rounded-full hover:bg-[#EFE5D2]/50 disabled:hover:bg-transparent transition-colors cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Tandai dibaca</span>
                    </button>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 mt-3">
                    <button
                      type="button"
                      onClick={() => setNotifFilter("all")}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                        notifFilter === "all"
                          ? "bg-[#0D0D0D] text-white shadow-2xs"
                          : "bg-white text-[#544942] border border-[#E2D9C8] hover:border-[#710912]/40 hover:text-[#0D0D0D]"
                      }`}
                    >
                      Semua ({notifications.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setNotifFilter("unread")}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                        notifFilter === "unread"
                          ? "bg-[#710912] text-white shadow-2xs"
                          : "bg-white text-[#544942] border border-[#E2D9C8] hover:border-[#710912]/40 hover:text-[#0D0D0D]"
                      }`}
                    >
                      Belum Dibaca ({unreadCount})
                    </button>
                  </div>
                </div>

                {/* Notification Items List */}
                <div className="p-2.5 space-y-1.5 max-h-80 overflow-y-auto">
                  {filteredNotifications.length === 0 ? (
                    <div className="py-8 px-4 text-center space-y-1.5">
                      <div className="w-9 h-9 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] flex items-center justify-center mx-auto text-[#710912]">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-semibold text-[#0D0D0D]">
                        Tidak ada notifikasi belum dibaca
                      </p>
                      <p className="text-[11px] text-[#73655D]">
                        Seluruh pemberitahuan operasional telah Anda tinjau.
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNotificationClick(item)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 group flex items-start gap-3 cursor-pointer ${
                          item.unread
                            ? "bg-[#FAF7F2]/90 hover:bg-white border-[#E2D9C8] hover:border-[#710912]/40 hover:shadow-[0_6px_16px_rgba(113,9,18,0.07)] hover:-translate-y-0.5"
                            : "bg-white hover:bg-[#FAF7F2]/70 border-transparent hover:border-[#E2D9C8]"
                        }`}
                      >
                        {/* Left Icon Box */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 ${
                            item.unread
                              ? "bg-white border-[#E2D9C8] shadow-2xs"
                              : "bg-[#FAF7F2] border-[#E2D9C8]/60"
                          }`}
                        >
                          {getCategoryIcon(item.category)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span
                              className={`text-xs leading-snug transition-colors group-hover:text-[#710912] ${
                                item.unread
                                  ? "font-bold text-[#0D0D0D]"
                                  : "font-semibold text-[#544942]"
                              }`}
                            >
                              {item.title}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[10px] text-[#9C8F85] whitespace-nowrap">
                                {item.time}
                              </span>
                              {item.unread && (
                                <span
                                  className="w-2 h-2 rounded-full bg-[#710912] shrink-0"
                                  title="Belum dibaca"
                                />
                              )}
                            </div>
                          </div>
                          <p className="text-[11px] text-[#544942] mt-1 leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                          <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-[#710912] opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Buka rincian</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* Popover Footer */}
                <div className="px-4 py-2.5 bg-[#FAF7F2] border-t border-[#E2D9C8]/80 flex items-center justify-between">
                  <span className="text-[11px] text-[#73655D]">
                    Klik item untuk menandai dibaca
                  </span>
                  {userRole === "SUPER_ADMIN" && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowNotifications(false);
                        router.push("/admin/audit");
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#710912] hover:underline cursor-pointer"
                    >
                      <span>Log Audit</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Pill */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setShowProfileMenu((prev) => !prev);
                setShowNotifications(false);
              }}
              className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1 bg-[#FAF7F2] hover:bg-white border rounded-full transition-all duration-200 cursor-pointer ${
                showProfileMenu
                  ? "border-[#710912] shadow-xs bg-white"
                  : "border-[#E2D9C8] hover:border-[#710912]/40 hover:shadow-xs"
              }`}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#710912] text-[#EFE5D2] flex items-center justify-center font-bold text-xs shadow-xs">
                <User className="w-4 h-4 text-[#EFE5D2]" />
              </div>

              <div className="hidden sm:block text-left">
                <div className="font-semibold text-xs text-[#0D0D0D] leading-tight">
                  {userName}
                </div>
                <div className="text-[11px] text-[#73655D] leading-tight">
                  {userHandle}
                </div>
              </div>

              <ChevronDown
                className={`w-3.5 h-3.5 text-[#73655D] transition-transform duration-200 ${
                  showProfileMenu ? "rotate-180 text-[#710912]" : ""
                }`}
              />
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl border border-[#E2D9C8] shadow-[0_12px_32px_rgba(28,27,27,0.12)] p-2 z-50 animate-dropdown">
                <div className="px-3 py-2.5 border-b border-[#FAF7F2] mb-1">
                  <p className="font-serif font-bold text-xs text-[#0D0D0D]">
                    {userName}
                  </p>
                  <p className="text-[11px] text-[#73655D]">{roleSubtitle}</p>
                </div>

                <Link
                  href="/admin/users"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#544942] hover:bg-[#FAF7F2] hover:text-[#710912] transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Manajemen Pengguna</span>
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#544942] hover:bg-[#FAF7F2] hover:text-[#710912] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Kunjungi Portal Publik</span>
                </Link>

                <div className="px-3 py-2 text-[11px] text-[#544942] flex items-center gap-2 border-t border-[#FAF7F2] mt-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sesi Aman (DOMPurify)</span>
                </div>

                <form action={logoutAction} className="mt-1">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
