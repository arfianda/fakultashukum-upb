"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  FileText,
  Calendar,
  Users,
  Plus,
  Trash2,
  CheckCircle,
  ShieldCheck,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { initialPosts, initialEvents, initialFaculty, PostItem, EventItem, FacultyItem } from "@/data/initialData";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"posts" | "events" | "faculty">("posts");

  // State management
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [faculty, setFaculty] = useState<FacultyItem[]>(initialFaculty);
  const [notification, setNotification] = useState("");

  // Post form state
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Kajian Yuridis");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostStatus, setNewPostStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");

  // Event form state
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("Auditorium R. Soepomo UPB");
  const [newEventSpeaker, setNewEventSpeaker] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");

  // Faculty form state
  const [newFacultyName, setNewFacultyName] = useState("");
  const [newFacultyTitles, setNewFacultyTitles] = useState("");
  const [newFacultyNip, setNewFacultyNip] = useState("");
  const [newFacultySpec, setNewFacultySpec] = useState("");
  const [newFacultyQuote, setNewFacultyQuote] = useState("");

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  // Create Post Handler (Calls API with server-side DOMPurify sanitization)
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostContent,
          category: newPostCategory,
          status: newPostStatus,
        }),
      });
      const result = await res.json();
      if (result.success) {
        const addedPost: PostItem = {
          id: result.data.id || Date.now(),
          title: newPostTitle,
          slug: result.data.slug,
          excerpt: newPostContent.replace(/<[^>]+>/g, "").slice(0, 140) + "...",
          content: result.data.content,
          category: newPostCategory,
          author: "Admin Konten FH",
          authorRole: "Biro Publikasi Hukum",
          publishedAt: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          readTime: "4 menit baca",
          status: newPostStatus,
        };
        setPosts([addedPost, ...posts]);
        setNewPostTitle("");
        setNewPostContent("");
        showNotif("Artikel berhasil disimpan dan disanitasi XSS oleh server.");
      }
    } catch {
      showNotif("Gagal menyimpan artikel.");
    }
  };

  // Create Event Handler
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newEventTitle,
          description: newEventDesc,
          eventDate: newEventDate || new Date().toISOString(),
          location: newEventLocation,
          speaker: newEventSpeaker,
          status: "PUBLISHED",
        }),
      });
      const result = await res.json();
      if (result.success) {
        const addedEvent: EventItem = {
          id: result.data.id || Date.now(),
          title: newEventTitle,
          slug: result.data.slug,
          description: newEventDesc,
          eventDate: newEventDate || "20 Oktober 2026",
          time: "09.00 - 12.00 WIB",
          location: newEventLocation,
          speaker: newEventSpeaker,
          speakerRole: "Pakar / Pemateri",
          badge: "Kuliah Umum",
          status: "PUBLISHED",
        };
        setEvents([addedEvent, ...events]);
        setNewEventTitle("");
        setNewEventDesc("");
        setNewEventSpeaker("");
        showNotif("Agenda kuliah umum berhasil ditambahkan.");
      }
    } catch {
      showNotif("Gagal menambahkan agenda.");
    }
  };

  // Create Faculty Handler
  const handleCreateFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newFacultyName,
          titles: newFacultyTitles,
          nip: newFacultyNip,
          specialization: newFacultySpec,
          bioQuote: newFacultyQuote,
        }),
      });
      const result = await res.json();
      if (result.success) {
        const addedFaculty: FacultyItem = {
          id: result.data.id || Date.now(),
          name: newFacultyName,
          titles: newFacultyTitles,
          nip: newFacultyNip,
          specialization: newFacultySpec,
          bioQuote: newFacultyQuote,
          profileImage: "/images/prof-hendra.jpg",
          displayOrder: faculty.length + 1,
          isActive: true,
        };
        setFaculty([...faculty, addedFaculty]);
        setNewFacultyName("");
        setNewFacultyTitles("");
        setNewFacultyNip("");
        setNewFacultySpec("");
        setNewFacultyQuote("");
        showNotif("Profil pakar/dosen baru berhasil didaftarkan.");
      }
    } catch {
      showNotif("Gagal mendaftarkan profil dosen.");
    }
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
    showNotif("Artikel telah dihapus dari daftar publikasi.");
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
    showNotif("Agenda telah dihapus.");
  };

  const handleToggleFaculty = (id: number) => {
    setFaculty(
      faculty.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f))
    );
    showNotif("Status keaktifan dosen berhasil diperbarui.");
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col font-sans">
      {/* Top Academic Administration Bar */}
      <header className="bg-[#5A0000] text-white border-b-2 border-[#C5A059] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#C5A059] text-[#5A0000] flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-sm tracking-wider font-semibold uppercase block leading-tight">
                  CMS Fakultas Hukum UPB
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#E8D8B0]">
                  Pusat Pengelolaan Konten &amp; Publikasi Akademik
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#E8D8B0] hover:text-white transition-colors"
              >
                <span>Lihat Website Utama</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Toast Notification */}
        {notification && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 shadow-xs">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Institutional Authority Metrics & Security Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 border border-[#E5E1DA]">
            <span className="text-[11px] font-bold text-[#800000] uppercase tracking-wider block mb-1">
              Artikel &amp; Riset Terbit
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-bold text-[#1C1B1B]">{posts.length}</span>
              <FileText className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>

          <div className="bg-white p-5 border border-[#E5E1DA]">
            <span className="text-[11px] font-bold text-[#800000] uppercase tracking-wider block mb-1">
              Agenda &amp; Kuliah Pakar
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-bold text-[#1C1B1B]">{events.length}</span>
              <Calendar className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>

          <div className="bg-white p-5 border border-[#E5E1DA]">
            <span className="text-[11px] font-bold text-[#800000] uppercase tracking-wider block mb-1">
              Dewan Dosen &amp; Pakar
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-bold text-[#1C1B1B]">{faculty.length}</span>
              <Users className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>

          <div className="bg-white p-5 border border-[#E5E1DA]">
            <span className="text-[11px] font-bold text-[#800000] uppercase tracking-wider block mb-1">
              Sanitasi Keamanan XSS
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase">DOMPurify Aktif</span>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5E1DA] mb-8 bg-white p-1">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === "posts"
                ? "bg-[#800000] text-white"
                : "text-[#5C5854] hover:text-[#1C1B1B]"
            }`}
          >
            Artikel &amp; Kajian Yuridis ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === "events"
                ? "bg-[#800000] text-white"
                : "text-[#5C5854] hover:text-[#1C1B1B]"
            }`}
          >
            Agenda &amp; Kuliah Umum ({events.length})
          </button>
          <button
            onClick={() => setActiveTab("faculty")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === "faculty"
                ? "bg-[#800000] text-white"
                : "text-[#5C5854] hover:text-[#1C1B1B]"
            }`}
          >
            Direktori Guru Besar ({faculty.length})
          </button>
        </div>

        {/* TAB 1: POSTS MANAGEMENT */}
        {activeTab === "posts" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Post Form (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-[#E5E1DA] p-6">
              <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-4 pb-2 border-b border-[#E5E1DA] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#800000]" />
                <span>Publikasikan Wacana / Artikel Baru</span>
              </h3>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Judul Naskah / Artikel *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Contoh: Analisis Kepatutan Putusan Peradilan Niaga..."
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Kategori Keilmuan
                  </label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  >
                    <option>Yurisprudensi &amp; Konstitusi</option>
                    <option>Hukum Bisnis &amp; Teknologi</option>
                    <option>Prestasi Mahasiswa</option>
                    <option>Jurnal &amp; Publikasi Ilmiah</option>
                    <option>Kajian Hukum Pidana</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Isi Naskah / Doktrin (Dukungan HTML Aman) *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Tuliskan analisis atau paragraf artikel di sini... Server akan menyanitasi tag berbahaya menggunakan isomorphic-dompurify."
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Status Publikasi
                  </label>
                  <select
                    value={newPostStatus}
                    onChange={(e) => setNewPostStatus(e.target.value as "DRAFT" | "PUBLISHED")}
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  >
                    <option value="PUBLISHED">PUBLISHED (Langsung Tayang di Beranda)</option>
                    <option value="DRAFT">DRAFT (Disimpan Sementara)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5A0000]"
                  >
                    Simpan &amp; Tayangkan Artikel
                  </button>
                </div>
              </form>
            </div>

            {/* Posts List (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#E5E1DA] p-6">
              <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-4 pb-2 border-b border-[#E5E1DA]">
                Daftar Artikel &amp; Publikasi Wacana
              </h3>

              <div className="divide-y divide-[#F0EDED]">
                {posts.map((p) => (
                  <div key={p.id} className="py-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-[#F8F7F4] border border-[#C5A059] text-[#775a19] text-[10px] font-bold uppercase">
                          {p.category}
                        </span>
                        <span className="text-[11px] text-[#5C5854]">{p.publishedAt}</span>
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-[#1C1B1B]">
                        {p.title}
                      </h4>
                      <p className="text-xs text-[#5C5854] mt-1 line-clamp-1">
                        {p.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeletePost(p.id)}
                      className="p-2 text-red-600 hover:bg-red-50 transition-colors shrink-0"
                      title="Hapus naskah artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EVENTS MANAGEMENT */}
        {activeTab === "events" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white border border-[#E5E1DA] p-6">
              <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-4 pb-2 border-b border-[#E5E1DA] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#800000]" />
                <span>Jadwalkan Agenda / Kuliah Pakar</span>
              </h3>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Nama Agenda / Simposium *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="Contoh: Kuliah Umum: Tantangan Hukum Pidana Siber..."
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Tanggal Pelaksanaan *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    placeholder="Contoh: 24 November 2026"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Narasumber / Pembicara Utama
                  </label>
                  <input
                    type="text"
                    value={newEventSpeaker}
                    onChange={(e) => setNewEventSpeaker(e.target.value)}
                    placeholder="Nama dan gelar narasumber ahli"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Lokasi Persidangan / Ruang
                  </label>
                  <input
                    type="text"
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                    placeholder="Auditorium / Ruang Moot Court"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Deskripsi Ringkas Agenda
                  </label>
                  <textarea
                    rows={3}
                    value={newEventDesc}
                    onChange={(e) => setNewEventDesc(e.target.value)}
                    placeholder="Topik pembahasan utama yang akan dibedah..."
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5A0000]"
                  >
                    Simpan Agenda Kalender Ilmiah
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-7 bg-white border border-[#E5E1DA] p-6">
              <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-4 pb-2 border-b border-[#E5E1DA]">
                Daftar Agenda Akademik
              </h3>

              <div className="divide-y divide-[#F0EDED]">
                {events.map((e) => (
                  <div key={e.id} className="py-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#800000]">{e.eventDate}</span>
                        <span>&bull;</span>
                        <span className="text-[11px] text-[#5C5854]">{e.location}</span>
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-[#1C1B1B]">
                        {e.title}
                      </h4>
                      <p className="text-xs text-[#5C5854] mt-1">{e.speaker}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteEvent(e.id)}
                      className="p-2 text-red-600 hover:bg-red-50 transition-colors shrink-0"
                      title="Hapus agenda"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FACULTY MANAGEMENT */}
        {activeTab === "faculty" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white border border-[#E5E1DA] p-6">
              <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-4 pb-2 border-b border-[#E5E1DA] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#800000]" />
                <span>Daftarkan Profil Dosen / Guru Besar</span>
              </h3>

              <form onSubmit={handleCreateFaculty} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Nama Lengkap &amp; Gelar Akademik *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFacultyName}
                    onChange={(e) => setNewFacultyName(e.target.value)}
                    placeholder="Contoh: Prof. Dr. Lorem Ipsum, S.H., M.H."
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Jabatan Fungsional / Gelar
                  </label>
                  <input
                    type="text"
                    value={newFacultyTitles}
                    onChange={(e) => setNewFacultyTitles(e.target.value)}
                    placeholder="Contoh: Lektor Kepala Hukum Pidana"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Nomor Induk Pegawai (NIP) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFacultyNip}
                    onChange={(e) => setNewFacultyNip(e.target.value)}
                    placeholder="Contoh: 198503142010121003"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Spesialisasi Keilmuan *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFacultySpec}
                    onChange={(e) => setNewFacultySpec(e.target.value)}
                    placeholder="Contoh: Hukum Acara Pidana, Kriminologi"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Kutipan Dedikasi Riset (Bio Quote)
                  </label>
                  <textarea
                    rows={2}
                    value={newFacultyQuote}
                    onChange={(e) => setNewFacultyQuote(e.target.value)}
                    placeholder="Pandangan filosofis terhadap kepatutan hukum..."
                    className="w-full px-3 py-2 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5A0000]"
                  >
                    Daftarkan Dosen
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-7 bg-white border border-[#E5E1DA] p-6">
              <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-4 pb-2 border-b border-[#E5E1DA]">
                Direktori Dosen Terdaftar
              </h3>

              <div className="divide-y divide-[#F0EDED]">
                {faculty.map((f) => (
                  <div key={f.id} className="py-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-[#F8F7F4] border border-[#E5E1DA] text-[#5C5854] text-[10px] font-mono">
                          NIP: {f.nip}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 ${
                            f.isActive
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {f.isActive ? "Aktif Mengajar" : "Non-Aktif"}
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-[#1C1B1B]">
                        {f.name}
                      </h4>
                      <p className="text-xs text-[#800000]">{f.titles}</p>
                      <p className="text-xs text-[#5C5854] mt-1">{f.specialization}</p>
                    </div>

                    <button
                      onClick={() => handleToggleFaculty(f.id)}
                      className="px-3 py-1.5 border border-[#E5E1DA] text-xs font-semibold text-[#5C5854] hover:bg-[#F8F7F4] transition-colors shrink-0"
                    >
                      {f.isActive ? "Nonaktifkan" : "Aktifkan"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
