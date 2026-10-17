"use client";

import React, { useState } from "react";
import {
  X,
  FileText,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { PostItem, EventItem, FacultyItem } from "@/data/initialData";

interface AdminCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: PostItem) => void;
  onEventCreated: (event: EventItem) => void;
  onFacultyCreated: (faculty: FacultyItem) => void;
  showToast: (msg: string) => void;
}

export function AdminCreateModal({
  isOpen,
  onClose,
  onPostCreated,
  onEventCreated,
  onFacultyCreated,
  showToast,
}: AdminCreateModalProps) {
  const [activeTab, setActiveTab] = useState<"post" | "event" | "faculty">("post");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Post form state
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("Kajian Yuridis");
  const [postContent, setPostContent] = useState("");
  const [postStatus, setPostStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");

  // Event form state
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("Auditorium R. Soepomo UPB");
  const [eventSpeaker, setEventSpeaker] = useState("");
  const [eventDesc, setEventDesc] = useState("");

  // Faculty form state
  const [facultyName, setFacultyName] = useState("");
  const [facultyTitles, setFacultyTitles] = useState("");
  const [facultyNip, setFacultyNip] = useState("");
  const [facultySpec, setFacultySpec] = useState("");
  const [facultyQuote, setFacultyQuote] = useState("");

  if (!isOpen) return null;

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
          category: postCategory,
          status: postStatus,
        }),
      });
      const result = await res.json();
      if (result.success) {
        const newPost: PostItem = {
          id: result.data.id || Date.now(),
          title: postTitle,
          slug: result.data.slug || postTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          excerpt: postContent.replace(/<[^>]+>/g, "").slice(0, 140) + "...",
          content: result.data.content,
          category: postCategory,
          author: "Admin Konten FH",
          authorRole: "Biro Publikasi Hukum",
          publishedAt: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          readTime: "4 menit baca",
          status: postStatus,
        };
        onPostCreated(newPost);
        showToast("Naskah artikel berhasil disimpan & disanitasi oleh server.");
        setPostTitle("");
        setPostContent("");
        onClose();
      } else {
        showToast(result.error || "Gagal menyimpan artikel.");
      }
    } catch {
      showToast("Terjadi kendala saat menyimpan artikel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: eventTitle,
          description: eventDesc,
          eventDate: eventDate || new Date().toISOString(),
          location: eventLocation,
          speaker: eventSpeaker,
          status: "PUBLISHED",
        }),
      });
      const result = await res.json();
      if (result.success) {
        const newEvent: EventItem = {
          id: result.data.id || Date.now(),
          title: eventTitle,
          slug: result.data.slug || eventTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          description: eventDesc,
          eventDate: eventDate || "24 November 2026",
          time: "09.00 - 12.00 WIB",
          location: eventLocation,
          speaker: eventSpeaker || "Pakar Hukum Tamu",
          speakerRole: "Akademisi / Praktisi",
          badge: "Kuliah Pakar",
          status: "PUBLISHED",
        };
        onEventCreated(newEvent);
        showToast("Agenda kuliah pakar berhasil dijadwalkan.");
        setEventTitle("");
        setEventDesc("");
        setEventSpeaker("");
        onClose();
      } else {
        showToast(result.error || "Gagal menyimpan agenda.");
      }
    } catch {
      showToast("Terjadi kendala saat menyimpan agenda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: facultyName,
          titles: facultyTitles,
          nip: facultyNip,
          specialization: facultySpec,
          bioQuote: facultyQuote,
        }),
      });
      const result = await res.json();
      if (result.success) {
        const newFaculty: FacultyItem = {
          id: result.data.id || Date.now(),
          name: facultyName,
          titles: facultyTitles,
          nip: facultyNip,
          specialization: facultySpec,
          bioQuote: facultyQuote,
          profileImage: "/images/prof-hendra.jpg",
          displayOrder: 99,
          isActive: true,
        };
        onFacultyCreated(newFaculty);
        showToast("Profil dosen / guru besar baru berhasil didaftarkan.");
        setFacultyName("");
        setFacultyTitles("");
        setFacultyNip("");
        setFacultySpec("");
        setFacultyQuote("");
        onClose();
      } else {
        showToast(result.error || "Gagal mendaftarkan dosen.");
      }
    } catch {
      showToast("Terjadi kendala saat mendaftarkan dosen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-[#E2D9C8] shadow-[0_20px_50px_rgba(28,27,27,0.2)] p-6 z-10 max-h-[90vh] overflow-y-auto animate-dropdown">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#0D0D0D]">
              Entri Data Akademik Baru
            </h3>
            <p className="text-xs text-[#73655D]">
              Publikasikan wacana riset, jadwalkan acara, atau daftarkan pengajar
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#9C8F85] hover:text-[#0D0D0D] transition-colors"
            title="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-1 bg-[#FAF7F2] rounded-2xl border border-[#E2D9C8] my-5">
          <button
            type="button"
            onClick={() => setActiveTab("post")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "post"
                ? "bg-white text-[#710912] shadow-xs"
                : "text-[#73655D] hover:text-[#0D0D0D]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Naskah Artikel</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("event")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "event"
                ? "bg-white text-[#710912] shadow-xs"
                : "text-[#73655D] hover:text-[#0D0D0D]"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agenda Pakar</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("faculty")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "faculty"
                ? "bg-white text-[#710912] shadow-xs"
                : "text-[#73655D] hover:text-[#0D0D0D]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Dewan Dosen</span>
          </button>
        </div>

        {/* Form 1: Article */}
        {activeTab === "post" && (
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                Judul Naskah / Publikasi *
              </label>
              <input
                type="text"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Contoh: Analisis Kepatutan Putusan Peradilan Niaga..."
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  Kategori Keilmuan
                </label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
                >
                  <option>Kajian Yuridis</option>
                  <option>Yurisprudensi &amp; Konstitusi</option>
                  <option>Hukum Bisnis &amp; Teknologi</option>
                  <option>Prestasi Mahasiswa</option>
                  <option>Jurnal &amp; Publikasi Ilmiah</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  Status Penerbitan
                </label>
                <select
                  value={postStatus}
                  onChange={(e) => setPostStatus(e.target.value as "DRAFT" | "PUBLISHED")}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
                >
                  <option value="PUBLISHED">Langsung Terbit (Aktif)</option>
                  <option value="DRAFT">Simpan Sebagai Draf</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                Isi Doktrin / Analisis (Sanitasi DOMPurify Aman) *
              </label>
              <textarea
                rows={5}
                required
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Tuliskan telaah hukum atau analisis komparatif di sini..."
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none font-mono"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#710912] hover:bg-[#48060B] text-white text-xs font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan Naskah...</span>
                  </>
                ) : (
                  <span>Simpan &amp; Tayangkan Publikasi</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Form 2: Event */}
        {activeTab === "event" && (
          <form onSubmit={handleSubmitEvent} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                Nama Agenda / Simposium *
              </label>
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Contoh: Kuliah Tamu: Transformasi Regulasi Kecerdasan Buatan..."
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  Tanggal Pelaksanaan *
                </label>
                <input
                  type="text"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="Contoh: 28 Oktober 2026"
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  Ruang / Lokasi
                </label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Auditorium R. Soepomo / Moot Court"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                Narasumber / Pembicara Ahli
              </label>
              <input
                type="text"
                value={eventSpeaker}
                onChange={(e) => setEventSpeaker(e.target.value)}
                placeholder="Nama lengkap dan gelar pemateri"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                Deskripsi Singkat Agenda
              </label>
              <textarea
                rows={3}
                value={eventDesc}
                onChange={(e) => setEventDesc(e.target.value)}
                placeholder="Pokok bahasan yang akan dikaji dalam forum ilmiah ini..."
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#710912] hover:bg-[#48060B] text-white text-xs font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menjadwalkan...</span>
                  </>
                ) : (
                  <span>Jadwalkan ke Kalender Akademik</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Form 3: Faculty */}
        {activeTab === "faculty" && (
          <form onSubmit={handleSubmitFaculty} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                Nama Lengkap &amp; Gelar *
              </label>
              <input
                type="text"
                required
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                placeholder="Contoh: Prof. Dr. Lorem Ipsum, S.H., LL.M."
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  NIP / NIDN *
                </label>
                <input
                  type="text"
                  required
                  value={facultyNip}
                  onChange={(e) => setFacultyNip(e.target.value)}
                  placeholder="Contoh: 198503142010121003"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  Jabatan Fungsional
                </label>
                <input
                  type="text"
                  value={facultyTitles}
                  onChange={(e) => setFacultyTitles(e.target.value)}
                  placeholder="Lektor Kepala / Guru Besar"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                Spesialisasi Keilmuan *
              </label>
              <input
                type="text"
                required
                value={facultySpec}
                onChange={(e) => setFacultySpec(e.target.value)}
                placeholder="Contoh: Hukum Acara Pidana, Kriminologi Forensik"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                Kutipan Dedikasi Riset (Bio Quote)
              </label>
              <textarea
                rows={2}
                value={facultyQuote}
                onChange={(e) => setFacultyQuote(e.target.value)}
                placeholder="Amanat filosofis atau dedikasi pengajaran..."
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl text-xs text-[#0D0D0D] focus:border-[#710912] focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#710912] hover:bg-[#48060B] text-white text-xs font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mendaftarkan...</span>
                  </>
                ) : (
                  <span>Daftarkan ke Dewan Pengajar</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
