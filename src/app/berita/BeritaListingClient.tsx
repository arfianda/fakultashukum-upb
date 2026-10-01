"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { PostItem } from "@/data/initialData";

const categoryMap: Record<string, string> = {
  bisnis: "Hukum Bisnis & Teknologi",
  yurisprudensi: "Yurisprudensi & Konstitusi",
  akademik: "Warta Akademik",
  prestasi: "Prestasi Mahasiswa",
  penghargaan: "Penghargaan Guru Besar",
};

export function BeritaListingClient({ initialPosts }: { initialPosts: PostItem[] }) {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("kategori");
  const initialQueryParam = searchParams.get("q") || "";

  const defaultCategory =
    initialCategoryParam && categoryMap[initialCategoryParam]
      ? categoryMap[initialCategoryParam]
      : initialCategoryParam || "Semua";

  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQueryParam);

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["Semua", ...Array.from(set)];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchCategory =
        selectedCategory === "Semua" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === "Hukum Bisnis & Teknologi" &&
          post.category.toLowerCase().includes("bisnis")) ||
        (selectedCategory === "Yurisprudensi & Konstitusi" &&
          post.category.toLowerCase().includes("konstitusi"));

      const matchSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const leadStory = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingStories = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Search and Category Filter Toolbar */}
      <div className="mb-10 sm:mb-12 bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E1DA] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-[#8E706C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul artikel, topik hukum, atau nama penulis..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8F7F4] border border-[#E5E1DA] rounded-xl text-xs sm:text-sm text-[#1C1B1B] placeholder-[#8E706C] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:bg-white transition-all"
            />
          </div>

          <p className="text-xs text-[#5C5854] font-medium shrink-0">
            Menampilkan <span className="font-bold text-[#800000]">{filteredPosts.length}</span> artikel warta &amp; kajian
          </p>
        </div>

        {/* Categories Pill List */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] ${
                  isSelected
                    ? "bg-[#800000] text-white shadow-xs"
                    : "bg-[#F8F7F4] text-[#5C5854] hover:bg-[#800000]/10 hover:text-[#800000]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-white border border-[#E5E1DA] rounded-2xl p-8">
          <BookOpen className="w-12 h-12 text-[#8E706C]/50 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-semibold text-[#1C1B1B] mb-2">
            Tidak Ada Warta yang Sesuai
          </h3>
          <p className="text-xs sm:text-sm text-[#5C5854] max-w-md mx-auto mb-6">
            Kriteria pencarian atau filter kategori yang Anda pilih tidak menghasilkan artikel. Silakan ubah kata kunci atau reset filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("Semua");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-[#800000] text-white text-xs font-semibold rounded-full hover:bg-[#570000] transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Lead Featured Story */}
      {leadStory && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-white border border-[#E5E1DA] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group">
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[280px] overflow-hidden bg-[#F0EDED]">
              <Image
                src={leadStory.coverImage || "/images/hero-library.jpg"}
                alt={leadStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-[#800000]/10 text-[#800000] text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {leadStory.category}
                  </span>
                  <span className="text-[11px] text-[#5C5854] flex items-center gap-1 font-light">
                    <Clock className="w-3 h-3" />
                    {leadStory.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B1B] group-hover:text-[#800000] transition-colors leading-snug mb-3">
                  <Link href={`/berita/${leadStory.slug}`}>{leadStory.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed line-clamp-3 mb-6 font-light">
                  {leadStory.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EDED] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#800000]/10 text-[#800000] flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1C1B1B] block leading-tight">
                      {leadStory.author}
                    </span>
                    <span className="text-[10px] text-[#5C5854] leading-none">
                      {leadStory.publishedAt}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/berita/${leadStory.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#800000] hover:text-[#570000] transition-colors"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        </motion.div>
      )}

      {/* Grid of Remaining Stories */}
      {remainingStories.length > 0 && (
        <div>
          <h3 className="font-serif text-xl font-bold text-[#1C1B1B] mb-6 pb-2 border-b border-[#E5E1DA]">
            Warta &amp; Kajian Lainnya
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {remainingStories.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-[#E5E1DA] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden bg-[#F0EDED]">
                  <Image
                    src={post.coverImage || "/images/hero-library.jpg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/95 backdrop-blur-xs text-[#800000] text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-[#5C5854] mb-2 font-light">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#800000]" />
                        {post.publishedAt}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#800000]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1B1B] group-hover:text-[#800000] transition-colors leading-snug mb-2.5">
                      <Link href={`/berita/${post.slug}`}>{post.title}</Link>
                    </h4>

                    <p className="text-xs text-[#5C5854] leading-relaxed line-clamp-2 mb-4 font-light">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0EDED] flex items-center justify-between">
                    <span className="text-[11px] text-[#5C5854] font-medium truncate max-w-[160px]">
                      {post.author}
                    </span>
                    <Link
                      href={`/berita/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#800000] hover:text-[#570000] transition-colors shrink-0"
                    >
                      <span>Baca</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
