"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, X } from "lucide-react";
import { PostItem } from "@/data/initialData";

export function YaleNewsSection({ posts }: { posts: PostItem[] }) {
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const leadPost = posts[0] || null;
  const secondaryPosts = posts.slice(1, 5);

  return (
    <section id="berita" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20" aria-label="Warta dan Berita Fakultas Hukum">
      {/* Yale Law School Signature Section Header with Vertical Dotted Matrix Accent */}
      <div className="flex items-center justify-between pb-6 mb-10 border-b border-[#E5E1DA]">
        <div className="flex items-center gap-3">
          {/* Signature Dotted Matrix Motif block */}
          <div className="w-5 h-8 dotted-matrix-bg opacity-70" aria-hidden="true" />
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1B] font-normal tracking-tight">
            Berita
          </h2>
        </div>

        {/* Right Action Link (Direct match to "All News ->" in Yale screenshot) */}
        <a
          href="#berita"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#800000] hover:text-[#570000] group transition-colors"
        >
          <span>Semua Berita</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
        </a>
      </div>

      {/* Yale 2-Column Editorial News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column (Main Featured Story with Large Image) */}
        {leadPost && (
          <article className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between group cursor-pointer" onClick={() => setSelectedPost(leadPost)}>
            <div>
              {leadPost.coverImage && (
                <div className="relative aspect-[16/10] w-full overflow-hidden mb-5 bg-[#F8F7F4] border border-[#E5E1DA]">
                  <Image
                    src={leadPost.coverImage}
                    alt={leadPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    priority
                  />
                </div>
              )}

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1B1B] group-hover:text-[#800000] transition-colors mb-3 leading-snug">
                {leadPost.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#5C5854] leading-relaxed mb-4 font-light line-clamp-3">
                {leadPost.excerpt}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#5C5854]">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#800000]" />
                {leadPost.publishedAt}
              </span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#800000]" />
                {leadPost.readTime}
              </span>
              <span className="ml-auto text-xs font-bold uppercase tracking-wider text-[#800000] group-hover:underline">
                Baca Selengkapnya &rarr;
              </span>
            </div>
          </article>
        )}

        {/* Right Column (List of 4 Compact Horizontal News Stories) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between space-y-6">
          {secondaryPosts.map((post, idx) => (
            <article
              key={post.id || idx}
              onClick={() => setSelectedPost(post)}
              className="flex items-start gap-4 pb-5 border-b border-[#E5E1DA] last:border-b-0 cursor-pointer group"
            >
              {/* Thumbnail Image on the left (Direct match to Yale screenshot) */}
              <div className="relative w-28 sm:w-32 h-20 shrink-0 overflow-hidden bg-[#F8F7F4] border border-[#E5E1DA]">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="130px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F8F7F4] flex items-center justify-center text-[10px] text-[#800000] font-bold">
                    FH UPB
                  </div>
                )}
              </div>

              {/* Story Details on the right */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
                  {post.category}
                </span>
                <h4 className="font-serif text-sm sm:text-base font-normal text-[#1C1B1B] group-hover:text-[#800000] transition-colors leading-snug line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-[#5C5854]">
                  <span>{post.publishedAt}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        >
          <div className="bg-white max-w-2xl w-full border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 text-[#5C5854] hover:text-[#1C1B1B] hover:bg-[#F8F7F4]"
              aria-label="Tutup artikel"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] uppercase tracking-widest text-[#800000] font-bold block mb-2">
              {selectedPost.category} &bull; {selectedPost.publishedAt}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1B] font-normal mb-4 leading-snug">
              {selectedPost.title}
            </h3>

            {selectedPost.coverImage && (
              <div className="relative aspect-[16/9] w-full mb-6 border border-[#E5E1DA]">
                <Image
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  fill
                  sizes="640px"
                  className="object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-stone text-xs sm:text-sm text-[#5C5854] leading-relaxed space-y-4 font-light"
              dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.excerpt }}
            />

            <div className="mt-8 pt-4 border-t border-[#E5E1DA] flex items-center justify-between">
              <span className="text-xs text-[#5C5854]">Penulis: <strong className="text-[#1C1B1B]">{selectedPost.author}</strong></span>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
