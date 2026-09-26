"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, X } from "lucide-react";
import { PostItem, EventItem } from "@/data/initialData";

export function EditorialGrid({
  posts,
  events,
}: {
  posts: PostItem[];
  events: EventItem[];
}) {
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [eventRegistered, setEventRegistered] = useState(false);

  const leadPost = posts[0] || null;
  const secondaryPosts = posts.slice(1, 4);

  return (
    <section id="riset" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-label="Wacana dan Berita Hukum">
      {/* Signature Yale Law School Section Header with Dotted Matrix Motif in Academic Maroon */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-8 mb-12 border-b border-[#E5E1DA] gap-4">
        {/* Centered/Left Signature Motif directly matching screenshot */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 -m-2 sm:-m-3 border border-[#E5E1DA] dotted-matrix-bg opacity-45 pointer-events-none" />
          <h2 className="relative font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1B1B] font-normal tracking-tight bg-white px-5 sm:px-8 py-1">
            Berita &amp; Wacana
          </h2>
        </div>

        {/* Right Action Link (Direct match to "All News ->" in screenshot) */}
        <a
          href="#agenda"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#800000] hover:text-[#570000] group transition-colors"
        >
          <span>Semua Berita &amp; Riset</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
        </a>
      </div>

      {/* Editorial Stories Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Main Lead Editorial (7 cols) */}
        {leadPost && (
          <article className="lg:col-span-7 bg-white border border-[#E5E1DA] hover:border-[#800000] transition-colors flex flex-col justify-between group">
            <div>
              {leadPost.coverImage && (
                <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b border-[#E5E1DA]">
                  <Image
                    src={leadPost.coverImage}
                    alt={leadPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#800000] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {leadPost.category}
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 text-xs text-[#5C5854] mb-3">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#800000]" />
                    {leadPost.publishedAt}
                  </span>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#800000]" />
                    {leadPost.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#1C1B1B] group-hover:text-[#800000] transition-colors mb-3 leading-snug">
                  {leadPost.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed mb-6 font-light">
                  {leadPost.excerpt}
                </p>

                <div className="pt-4 border-t border-[#F0EDED] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#F8F7F4] border border-[#E5E1DA] flex items-center justify-center font-serif text-[#800000] font-bold text-sm">
                      {leadPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1C1B1B]">{leadPost.author}</p>
                      <p className="text-[11px] text-[#5C5854]">{leadPost.authorRole}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPost(leadPost)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#800000] hover:text-[#570000] group"
                  >
                    <span>Baca Telaah</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Secondary Editorial Articles Stack (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {secondaryPosts.map((post) => (
            <article
              key={post.id}
              className="p-5 sm:p-6 bg-white border border-[#E5E1DA] hover:border-[#800000] transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#5C5854] mb-2">
                  <span className="font-bold text-[#800000] uppercase tracking-wider text-[10px]">
                    {post.category}
                  </span>
                  <span>{post.publishedAt}</span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-normal text-[#1C1B1B] group-hover:text-[#800000] transition-colors mb-2 leading-snug">
                  {post.title}
                </h4>
                <p className="text-xs text-[#5C5854] line-clamp-2 mb-4 leading-relaxed font-light">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F0EDED] text-xs">
                <span className="text-[#5C5854] text-[11px]">{post.author}</span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#800000] uppercase tracking-wider hover:underline"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Academic Symposia & Events Calendar Section */}
      <div id="agenda" className="pt-12 border-t border-[#E5E1DA]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#800000] font-bold block mb-1">
              Kalender Akademik
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1B] font-normal">
              Agenda &amp; Kuliah Pakar Mendatang
            </h3>
          </div>
          <span className="text-xs text-[#5C5854] mt-2 sm:mt-0 font-medium">
            Terbuka untuk Akademisi, Praktisi Hukum &amp; Mahasiswa
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-[#F8F7F4] border border-[#E5E1DA] p-6 flex flex-col justify-between hover:border-[#800000] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 bg-[#800000] text-white text-[10px] font-bold uppercase tracking-wider">
                    {evt.badge}
                  </span>
                  <span className="text-xs font-bold text-[#800000]">{evt.eventDate}</span>
                </div>

                <h4 className="font-serif text-base font-semibold text-[#1C1B1B] mb-2.5 leading-snug">
                  {evt.title}
                </h4>

                <p className="text-xs text-[#5C5854] leading-relaxed mb-4 font-light">
                  {evt.description}
                </p>

                <div className="text-[11px] text-[#1C1B1B] space-y-1 mb-6 pb-4 border-b border-[#E5E1DA]">
                  <p>
                    <strong className="text-[#5C5854] font-medium">Waktu:</strong> {evt.time}
                  </p>
                  <p>
                    <strong className="text-[#5C5854] font-medium">Tempat:</strong> {evt.location}
                  </p>
                  <p>
                    <strong className="text-[#5C5854] font-medium">Narasumber:</strong> {evt.speaker}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedEvent(evt);
                  setEventRegistered(false);
                }}
                className="w-full py-2.5 bg-white border border-[#800000] text-[#800000] text-xs font-bold uppercase tracking-wider hover:bg-[#800000] hover:text-white transition-colors"
              >
                Konfirmasi Kehadiran
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Post Modal View */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 text-[#5C5854] hover:text-[#1C1B1B]"
              aria-label="Tutup jendela artikel"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block px-3 py-1 bg-[#800000] text-white text-[10px] font-bold uppercase tracking-widest mb-4">
              {selectedPost.category}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1B1B] mb-4 leading-snug">
              {selectedPost.title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-[#5C5854] pb-4 mb-6 border-b border-[#E5E1DA]">
              <span>Oleh {selectedPost.author} ({selectedPost.authorRole})</span>
              <span>&bull;</span>
              <span>{selectedPost.publishedAt}</span>
            </div>

            <div
              className="prose prose-sm max-w-none text-[#1C1B1B] leading-relaxed space-y-4 mb-8"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />

            <div className="pt-4 border-t border-[#E5E1DA] flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal View */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white max-w-md w-full border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 text-[#5C5854] hover:text-[#1C1B1B]"
              aria-label="Tutup pendaftaran acara"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#800000] font-bold block mb-1">
              Registrasi Kuliah Pakar &amp; Seminar
            </span>
            <h3 className="font-serif text-xl font-semibold text-[#1C1B1B] mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-xs text-[#5C5854] mb-6">
              Jadwal: {selectedEvent.eventDate} ({selectedEvent.time}) di {selectedEvent.location}
            </p>

            {eventRegistered ? (
              <div className="p-4 bg-[#F8F7F4] border border-[#C5A059] text-center my-4">
                <p className="text-sm font-serif font-semibold text-[#800000] mb-1">
                  Pendaftaran Berhasil Dikonfirmasi
                </p>
                <p className="text-xs text-[#5C5854]">
                  Akses ruang sidang dan tautan siaran telah dikirimkan ke alamat email terdaftar.
                </p>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="mt-4 px-5 py-2 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Selesai
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEventRegistered(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Nama Lengkap &amp; Gelar
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso, S.H."
                    className="w-full px-3.5 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#F8F7F4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Alamat Email Aktif
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#F8F7F4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Institusi / Lembaga Asal
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Asal Kantor Hukum / Universitas"
                    className="w-full px-3.5 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#F8F7F4]"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000]"
                  >
                    Kirim Konfirmasi Kehadiran
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
