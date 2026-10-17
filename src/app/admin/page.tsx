"use client";

import React, { useState, useEffect } from "react";
import { initialPosts, initialEvents, initialFaculty, PostItem, EventItem, FacultyItem } from "@/data/initialData";
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
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState<AdminViewType>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Core state
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

  // Keyboard shortcut for Cmd+K / Ctrl+K
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

  // Post handlers
  const handlePostCreated = (newPost: PostItem) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
    showToast("Naskah artikel berhasil dihapus dari daftar publikasi.");
  };

  // Event handlers
  const handleEventCreated = (newEvent: EventItem) => {
    setEvents([newEvent, ...events]);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
    showToast("Agenda berhasil dihapus dari kalender akademik.");
  };

  // Faculty handlers
  const handleFacultyCreated = (newFaculty: FacultyItem) => {
    setFaculty([...faculty, newFaculty]);
  };

  const handleToggleFaculty = (id: number) => {
    setFaculty(
      faculty.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f))
    );
    showToast("Status keaktifan mengajar dosen berhasil diperbarui.");
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#0D0D0D] font-sans antialiased selection:bg-[#710912] selection:text-white">
      {/* Floating Pill Sidebar */}
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        postCount={posts.length}
        eventCount={events.length}
        facultyCount={faculty.length}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all">
        {/* Pill Header Bar */}
        <AdminHeader
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />

        {/* Dynamic View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
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

          {activeView === "security" && <AdminSecurityView />}
        </main>
      </div>

      {/* Toast Notification Alert */}
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

      {/* Universal Create Modal */}
      <AdminCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
        onEventCreated={handleEventCreated}
        onFacultyCreated={handleFacultyCreated}
        showToast={showToast}
      />

      {/* Command Palette Search Modal */}
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
