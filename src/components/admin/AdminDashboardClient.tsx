"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  initialPosts,
  initialEvents,
  initialFaculty,
  PostItem,
  EventItem,
  FacultyItem,
} from "@/data/initialData";
import { AdminSidebar, AdminViewType } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminOverviewView } from "@/components/admin/AdminOverviewView";
import { AdminArticlesView } from "@/components/admin/AdminArticlesView";
import { AdminAgendaView } from "@/components/admin/AdminAgendaView";
import { AdminFacultyView } from "@/components/admin/AdminFacultyView";
import { AdminKlbhView } from "@/components/admin/AdminKlbhView";
import { AdminSecurityView } from "@/components/admin/AdminSecurityView";
import { AdminCreateModal } from "@/components/admin/AdminCreateModal";
import { AdminSearchModal } from "@/components/admin/AdminSearchModal";
import {
  CheckCircle,
  X,
  Users,
  FileText,
  CalendarDays,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

interface AdminDashboardClientProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
    roleLabel: string;
  };
  stats: {
    userCount: number;
    dbPostCount: number;
    dbEventCount: number;
  };
}

export function AdminDashboardClient({
  currentUser,
  stats,
}: AdminDashboardClientProps) {
  const [activeView, setActiveView] = useState<AdminViewType>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [faculty, setFaculty] = useState<FacultyItem[]>(initialFaculty);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePostCreated = (newPost: PostItem) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
    showToast("Naskah artikel berhasil dihapus dari daftar publikasi.");
  };

  const handleEventCreated = (newEvent: EventItem) => {
    setEvents([newEvent, ...events]);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
    showToast("Agenda berhasil dihapus dari kalender akademik.");
  };

  const handleFacultyCreated = (newFaculty: FacultyItem) => {
    setFaculty([...faculty, newFaculty]);
  };

  const handleToggleFaculty = (id: number) => {
    setFaculty(
      faculty.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f))
    );
    showToast("Status keaktifan mengajar dosen berhasil diperbarui.");
  };

  const totalBerita = stats.dbPostCount > 0 ? stats.dbPostCount : posts.length;
  const totalAgenda =
    stats.dbEventCount > 0 ? stats.dbEventCount : events.length;

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#0D0D0D] font-sans antialiased selection:bg-[#710912] selection:text-white">
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        postCount={totalBerita}
        eventCount={totalAgenda}
        facultyCount={faculty.length}
        userRole={currentUser.role}
      />

      <div className="lg:pl-72 flex flex-col min-h-screen transition-all">
        <AdminHeader
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onNavigateToView={(view) => setActiveView(view)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Ringkasan Sederhana (Jumlah User, Berita, Agenda) */}
          {activeView === "overview" && (
            <section
              aria-label="Ringkasan Sistem"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <Link
                href="/admin/users"
                className="group relative overflow-hidden bg-white rounded-2xl border border-[#E2D9C8] hover:border-[#710912]/45 p-5 flex items-center justify-between shadow-xs hover:shadow-[0_12px_28px_rgba(113,9,18,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#710912] via-[#C28D39] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#73655D] group-hover:text-[#710912] transition-colors block mb-1">
                    Jumlah Pengguna (User)
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#0D0D0D]">
                    {stats.userCount}
                  </span>
                  <span className="text-[11px] text-[#544942] group-hover:text-[#710912] font-medium flex items-center gap-1 mt-1 transition-colors">
                    <span>Akun terdaftar &bull; Kelola</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </span>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#710912]/10 group-hover:bg-[#710912] border border-[#710912]/20 group-hover:border-[#710912] flex items-center justify-center text-[#710912] group-hover:text-[#EFE5D2] group-hover:scale-105 transition-all duration-200 shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setActiveView("articles")}
                className="group relative overflow-hidden bg-white rounded-2xl border border-[#E2D9C8] hover:border-[#710912]/45 p-5 flex items-center justify-between shadow-xs hover:shadow-[0_12px_28px_rgba(113,9,18,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#710912] via-[#C28D39] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#73655D] group-hover:text-[#710912] transition-colors block mb-1">
                    Jumlah Berita &amp; Artikel
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#0D0D0D]">
                    {totalBerita}
                  </span>
                  <span className="text-[11px] text-[#544942] group-hover:text-[#710912] font-medium flex items-center gap-1 mt-1 transition-colors">
                    <span>Warta &amp; publikasi &bull; Buka</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </span>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#710912]/10 group-hover:bg-[#710912] border border-[#710912]/20 group-hover:border-[#710912] flex items-center justify-center text-[#710912] group-hover:text-[#EFE5D2] group-hover:scale-105 transition-all duration-200 shadow-2xs">
                  <FileText className="w-5 h-5" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveView("agenda")}
                className="group relative overflow-hidden bg-white rounded-2xl border border-[#E2D9C8] hover:border-[#710912]/45 p-5 flex items-center justify-between shadow-xs hover:shadow-[0_12px_28px_rgba(113,9,18,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#710912] via-[#C28D39] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#73655D] group-hover:text-[#710912] transition-colors block mb-1">
                    Jumlah Agenda Akademik
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#0D0D0D]">
                    {totalAgenda}
                  </span>
                  <span className="text-[11px] text-[#544942] group-hover:text-[#710912] font-medium flex items-center gap-1 mt-1 transition-colors">
                    <span>Seminar &amp; jadwal &bull; Buka</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </span>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#710912]/10 group-hover:bg-[#710912] border border-[#710912]/20 group-hover:border-[#710912] flex items-center justify-center text-[#710912] group-hover:text-[#EFE5D2] group-hover:scale-105 transition-all duration-200 shadow-2xs">
                  <CalendarDays className="w-5 h-5" />
                </div>
              </button>
            </section>
          )}

          {/* Role indicator bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#E2D9C8] text-xs">
            <div className="flex items-center gap-2 text-[#544942]">
              <ShieldCheck className="w-4 h-4 text-[#710912]" />
              <span>
                Masuk sebagai <strong>{currentUser.name}</strong> (
                {currentUser.email})
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#710912] text-white text-[10px] font-bold uppercase tracking-wider">
              {currentUser.roleLabel} &bull; {currentUser.role}
            </span>
          </div>

          {activeView === "overview" && (
            <AdminOverviewView
              posts={posts}
              events={events}
              faculty={faculty}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
              onNavigateToTab={(tab) => setActiveView(tab)}
            />
          )}

          {activeView === "articles" && (
            <AdminArticlesView
              posts={posts}
              onDeletePost={handleDeletePost}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
            />
          )}

          {activeView === "agenda" && (
            <AdminAgendaView
              events={events}
              onDeleteEvent={handleDeleteEvent}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
            />
          )}

          {activeView === "faculty" && (
            <AdminFacultyView
              faculty={faculty}
              onToggleFacultyStatus={handleToggleFaculty}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
            />
          )}

          {activeView === "klbh" && <AdminKlbhView />}

          {activeView === "security" && currentUser.role === "SUPER_ADMIN" && (
            <AdminSecurityView />
          )}
        </main>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-dropdown">
          <div className="bg-[#0D0D0D] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 text-xs">
            <CheckCircle className="w-4 h-4 text-[#C28D39] shrink-0" />
            <span className="font-medium">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="p-1 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <AdminCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
        onEventCreated={handleEventCreated}
        onFacultyCreated={handleFacultyCreated}
        showToast={showToast}
      />

      <AdminSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        posts={posts}
        events={events}
        faculty={faculty}
        onNavigateToView={(view) => setActiveView(view)}
      />
    </div>
  );
}

