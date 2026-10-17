"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  Filter,
  Search,
} from "lucide-react";
import { PostItem } from "@/data/initialData";

interface AdminArticlesViewProps {
  posts: PostItem[];
  onDeletePost: (id: number) => void;
  onOpenCreateModal: () => void;
}

export function AdminArticlesView({
  posts,
  onDeletePost,
  onOpenCreateModal,
}: AdminArticlesViewProps) {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT" | "ARCHIVED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    const matchesFilter =
      activeFilter === "ALL" || post.status === activeFilter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top 4 Metrics Row (Matching Screenshot 3 top cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center justify-between text-[#7A756F] text-xs font-semibold mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#800000]" />
              <span>Indeksasi &amp; Sitasi</span>
            </div>
            <button type="button" className="text-[#A39E97] hover:text-[#1C1B1B]">&bull;&bull;&bull;</button>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#1C1B1B]">87%</span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+4% bln ini</span>
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center justify-between text-[#7A756F] text-xs font-semibold mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#800000]" />
              <span>Naskah Terbit</span>
            </div>
            <button type="button" className="text-[#A39E97] hover:text-[#1C1B1B]">&bull;&bull;&bull;</button>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#1C1B1B]">{posts.length}</span>
            <span className="text-xs text-[#7A756F]">1 artikel baru minggu ini</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center justify-between text-[#7A756F] text-xs font-semibold mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#800000]" />
              <span>Antrean Review</span>
            </div>
            <button type="button" className="text-[#A39E97] hover:text-[#1C1B1B]">&bull;&bull;&bull;</button>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#1C1B1B]">4</span>
            <span className="text-xs text-[#7A756F]">dlm 7 hari ke depan</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5">
          <div className="flex items-center justify-between text-[#7A756F] text-xs font-semibold mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Telaah Prioritas</span>
            </div>
            <button type="button" className="text-[#A39E97] hover:text-[#1C1B1B]">&bull;&bull;&bull;</button>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#1C1B1B]">1</span>
            <span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Perlu disposisi</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs and + Add Button Row (Matching Screenshot 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-1 bg-[#F8F7F4] rounded-full border border-[#EBE7E1] overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveFilter("ALL")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === "ALL"
                ? "bg-white text-[#1C1B1B] shadow-xs"
                : "text-[#7A756F] hover:text-[#1C1B1B]"
            }`}
          >
            Semua ({posts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("PUBLISHED")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === "PUBLISHED"
                ? "bg-white text-[#1C1B1B] shadow-xs"
                : "text-[#7A756F] hover:text-[#1C1B1B]"
            }`}
          >
            Publikasi Aktif
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("DRAFT")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === "DRAFT"
                ? "bg-white text-[#1C1B1B] shadow-xs"
                : "text-[#7A756F] hover:text-[#1C1B1B]"
            }`}
          >
            Draf Naskah
          </button>
        </div>

        {/* Search input & Add Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A39E97]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari naskah artikel..."
              className="pl-8 pr-3 py-1.5 bg-white border border-[#EBE7E1] rounded-full text-xs text-[#1C1B1B] focus:border-[#800000] focus:outline-none w-48 sm:w-56"
            />
          </div>

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1C1B1B] hover:bg-[#800000] text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tambah Naskah</span>
          </button>
        </div>
      </div>

      {/* Catalog Grid View (Matching Screenshot 3 card items with striped progress bars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post, idx) => {
          const isDraft = post.status === "DRAFT";
          // Progress calculation demonstration for article peer-review completeness
          const progressPercent = isDraft ? 35 : 85 + (idx % 15);

          return (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-[#EBE7E1] shadow-[0_2px_16px_rgba(28,27,27,0.03)] p-5 flex flex-col justify-between hover:shadow-[0_8px_24px_rgba(28,27,27,0.06)] transition-all group"
            >
              <div>
                {/* Top: Icon + Title + Status Pill */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Bottle/Jar equivalent emblem customized for law journal */}
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF4E8] border border-[#E8D8B0] flex items-center justify-center text-[#800000] shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5 text-[#800000]" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1C1B1B] line-clamp-1 group-hover:text-[#800000] transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-[#7A756F] mt-0.5 truncate">
                        {post.category} &bull; {post.readTime}
                      </p>
                    </div>
                  </div>

                  {/* Status indicator pill (Matching Pillio Active/Paused badges) */}
                  <div className="shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isDraft
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isDraft ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                      />
                      <span>{isDraft ? "Draf" : "Aktif"}</span>
                    </span>
                  </div>
                </div>

                {/* Progress bar with Pillio striped background (signature Pillio element!) */}
                <div className="my-4">
                  <div className="flex items-center justify-between text-[10px] text-[#7A756F] mb-1.5 font-medium">
                    <span>Kelengkapan Doktrin &amp; Sitasi</span>
                    <span className="font-semibold text-[#1C1B1B]">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F5F2EC] overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isDraft ? "bg-amber-500" : "bg-[#800000]"
                      }`}
                      style={{ width: `${progressPercent * 0.7}%` }}
                    />
                    <div
                      className="h-full rounded-r-full striped-bar-pattern transition-all duration-500 opacity-60"
                      style={{ width: `${progressPercent * 0.3}%` }}
                    />
                  </div>
                </div>

                {/* Post excerpt */}
                <p className="text-xs text-[#5C5854] line-clamp-2 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom metadata & Action Arrow Link (Matching Screenshot 3 bottom row) */}
              <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <div className="text-[10px] text-[#A39E97] uppercase tracking-wider font-semibold">
                    Penulis / Sivitas
                  </div>
                  <div className="text-[11px] font-medium text-[#1C1B1B] truncate">
                    {post.author}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onDeletePost(post.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                    title="Hapus naskah"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/berita/${post.slug}`}
                    target="_blank"
                    className="w-7 h-7 rounded-full bg-[#F8F7F4] hover:bg-[#800000] text-[#5C5854] hover:text-white flex items-center justify-center transition-colors"
                    title="Buka publikasi lengkap"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
