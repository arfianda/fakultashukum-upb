import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ChevronRight,
  BookmarkCheck,
  Scale,
} from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/dataService";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return {
    title: `${post.title} | Fakultas Hukum UPB`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <article className="pt-28 sm:pt-32 pb-16">
      {/* Top Header & Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Breadcrumbs
          items={[
            { label: "Warta & Kajian Hukum", href: "/berita" },
            { label: post.title },
          ]}
        />

        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="px-3 py-1 bg-[#800000] text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
            {post.category}
          </span>
          <span className="text-xs text-[#5C5854] flex items-center gap-1 font-light">
            <Calendar className="w-3.5 h-3.5 text-[#800000]" />
            {post.publishedAt}
          </span>
          <span className="text-xs text-[#8E706C]">&bull;</span>
          <span className="text-xs text-[#5C5854] flex items-center gap-1 font-light">
            <Clock className="w-3.5 h-3.5 text-[#800000]" />
            {post.readTime}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#1C1B1B] leading-tight mb-6">
          {post.title}
        </h1>

        <div className="p-4 sm:p-5 bg-[#F8F7F4] border-l-4 border-[#800000] rounded-r-xl text-xs sm:text-sm text-[#5C5854] leading-relaxed italic font-serif">
          {post.excerpt}
        </div>
      </div>

      {/* Main Image Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <div className="relative h-72 sm:h-96 md:h-[460px] w-full rounded-2xl overflow-hidden border border-[#E5E1DA] shadow-xs bg-[#F0EDED]">
          <Image
            src={post.coverImage || "/images/hero-library.jpg"}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
        <p className="text-[11px] text-[#5C5854] text-center mt-2 italic font-light">
          Dokumentasi Publikasi Resmi Fakultas Hukum Universitas Pelita Bangsa
        </p>
      </div>

      {/* Article Body & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Article Content (lg: 8 cols) */}
          <div className="lg:col-span-8">
            <div
              className="prose prose-sm sm:prose-base max-w-none text-[#1C1B1B] leading-relaxed
                prose-headings:font-serif prose-headings:text-[#570000] prose-headings:font-bold
                prose-p:mb-5 prose-p:font-light prose-p:text-[#2C2928] prose-p:leading-relaxed
                prose-blockquote:border-l-4 prose-blockquote:border-[#C5A059] prose-blockquote:bg-[#F8F7F4] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:italic prose-blockquote:my-6
                prose-blockquote:text-[#570000] prose-blockquote:font-serif
                prose-strong:font-semibold prose-strong:text-[#1C1B1B]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Attribution Card */}
            <div className="mt-12 p-6 bg-[#F8F7F4] border border-[#E5E1DA] rounded-2xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#800000] text-white flex items-center justify-center shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#800000] block mb-0.5">
                  Penulis / Sumber Rilis
                </span>
                <h4 className="font-serif text-base font-bold text-[#1C1B1B] leading-snug">
                  {post.author}
                </h4>
                <p className="text-xs text-[#5C5854] mt-0.5 font-light">
                  {post.authorRole}
                </p>
              </div>
            </div>

            {/* Back Navigation Bar */}
            <div className="mt-8 pt-6 border-t border-[#E5E1DA] flex items-center justify-between">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#800000] hover:text-[#570000] px-4 py-2 rounded-full bg-[#800000]/10 hover:bg-[#800000]/15 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Seluruh Warta</span>
              </Link>
            </div>
          </div>

          {/* Sidebar: Related Articles & Institutional Info (lg: 4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Related News Widget */}
            <div className="bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F0EDED]">
                <BookmarkCheck className="w-4 h-4 text-[#800000]" />
                <h3 className="font-serif text-base font-bold text-[#1C1B1B]">
                  Warta Terkait Lainnya
                </h3>
              </div>

              <div className="space-y-4">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/berita/${rel.slug}`}
                    className="block group"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#800000] block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-semibold text-[#1C1B1B] group-hover:text-[#800000] transition-colors leading-snug line-clamp-2 mb-1">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-[#5C5854] block">
                      {rel.publishedAt}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#F0EDED]">
                <Link
                  href="/berita"
                  className="text-xs font-semibold text-[#800000] hover:underline inline-flex items-center gap-1"
                >
                  <span>Lihat Indeks Berita Lengkap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Academic Juris Callout Widget */}
            <div className="bg-[#5A0000] text-white rounded-2xl p-6 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#C5A059] text-[#5A0000] flex items-center justify-center mb-3">
                <Scale className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-bold text-white mb-2 leading-snug">
                Portal Riset &amp; Jurnal Hukum
              </h4>
              <p className="text-xs text-[#E5E2E1] leading-relaxed mb-4 font-light">
                Akses publikasi karya ilmiah dosen dan mahasiswa melalui Pelita Law Review terakreditasi SINTA.
              </p>
              <a
                href="https://journal.pelitabangsa.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A059] text-[#5A0000] text-xs font-bold rounded-lg hover:bg-white transition-colors"
              >
                <span>Buka Jurnal SINTA</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
