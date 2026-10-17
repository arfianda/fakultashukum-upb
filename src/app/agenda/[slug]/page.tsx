import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  MessageCircle,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { getEventBySlug, getUpcomingEvents } from "@/lib/dataService";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Agenda Tidak Ditemukan",
    };
  }

  return {
    title: `${event.title} | Fakultas Hukum UPB`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
    },
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const allEvents = await getUpcomingEvents();
  const otherEvents = allEvents
    .filter((e) => e.slug !== slug)
    .slice(0, 3);

  const waRegisterUrl = `https://wa.me/6281290008801?text=${encodeURIComponent(
    `Halo Sekretariat Fakultas Hukum UPB, saya ingin mengonfirmasi pendaftaran kehadiran pada kegiatan: "${event.title}".`
  )}`;

  const emailRegisterUrl = `mailto:hukum@pelitabangsa.ac.id?subject=${encodeURIComponent(
    `Registrasi Kegiatan: ${event.title}`
  )}&body=${encodeURIComponent(
    `Nama Lengkap:\nInstansi / NIM:\nNomor Kontak / WhatsApp:\n\nDengan ini saya menyatakan konfirmasi kehadiran pada kegiatan: ${event.title}.`
  )}`;

  return (
    <article className="pt-28 sm:pt-32 pb-16">
      {/* Top Header & Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Breadcrumbs
          items={[
            { label: "Agenda Akademik", href: "/agenda" },
            { label: event.title },
          ]}
        />

        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="px-3 py-1 bg-[#710912] text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
            {event.badge}
          </span>
          <span className="text-xs text-[#544942] flex items-center gap-1 font-light">
            <Calendar className="w-3.5 h-3.5 text-[#710912]" />
            {event.eventDate}
          </span>
          <span className="text-xs text-[#8A6E67]">&bull;</span>
          <span className="text-xs text-[#544942] flex items-center gap-1 font-light">
            <Clock className="w-3.5 h-3.5 text-[#710912]" />
            {event.time}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D0D0D] leading-tight mb-6">
          {event.title}
        </h1>

        <p className="text-sm sm:text-base text-[#544942] leading-relaxed font-light">
          {event.description}
        </p>
      </div>

      {/* Main Logistics Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <div className="bg-[#FAF7F2] border border-[#E2D9C8] rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif text-lg font-bold text-[#0D0D0D] mb-5 pb-3 border-b border-[#E2D9C8]">
            Informasi Pelaksanaan &amp; Narasumber
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#710912] block mb-1">
                Waktu &amp; Tanggal
              </span>
              <p className="font-semibold text-[#0D0D0D]">{event.eventDate}</p>
              <p className="text-[#544942] mt-0.5">{event.time}</p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#710912] block mb-1">
                Tempat / Media
              </span>
              <p className="font-semibold text-[#0D0D0D]">{event.location}</p>
              <p className="text-[#544942] mt-0.5">Fakultas Hukum UPB</p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#710912] block mb-1">
                Narasumber Utama
              </span>
              <p className="font-semibold text-[#0D0D0D]">{event.speaker}</p>
              <p className="text-[#544942] mt-0.5">{event.speakerRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description & Registration Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Content (lg: 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-[#E2D9C8] rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-4">
                Deskripsi &amp; Relevansi Kegiatan
              </h3>
              <p className="text-sm text-[#241E1C] leading-relaxed mb-6 font-light">
                {event.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#F4ECE1] text-xs sm:text-sm text-[#544942]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#710912] shrink-0 mt-0.5" />
                  <span>Terbuka bagi mahasiswa Sarjana Hukum (S.H.), praktisi advokat, akademisi, dan masyarakat umum.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#710912] shrink-0 mt-0.5" />
                  <span>Menyediakan sertifikat keikutsertaan akademik resmi yang ditandatangani oleh pimpinan dekanat.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#710912] shrink-0 mt-0.5" />
                  <span>Materi presentasi dan ringkasan kajian yurisprudensi dibagikan pasca kegiatan.</span>
                </div>
              </div>
            </div>

            {/* Registration Action Box (Honest routing: WhatsApp / Email, no fake submit) */}
            <div className="bg-[#48060B] text-white rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#C28D39]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#EFE5D2]">
                  Konfirmasi Registrasi Kehadiran
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white mb-3">
                Daftarkan Diri Anda Sebagai Peserta
              </h3>

              <p className="text-xs sm:text-sm text-[#E2D9C8] leading-relaxed mb-6 font-light max-w-2xl">
                Untuk memastikan alokasi tempat duduk dan sertifikat, registrasi peserta dilayani langsung melalui WhatsApp resmi Panitia Dekanat atau melalui korespondensi email resmi.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={waRegisterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C28D39] text-[#48060B] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Daftar via WhatsApp Panitia</span>
                </a>

                <a
                  href={emailRegisterUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Registrasi via Email</span>
                </a>
              </div>
            </div>

            {/* Back Navigation Bar */}
            <div className="pt-4 border-t border-[#E2D9C8]">
              <Link
                href="/agenda"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#710912] hover:text-[#48060B] px-4 py-2 rounded-full bg-[#710912]/10 hover:bg-[#710912]/15 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Kalender Agenda</span>
              </Link>
            </div>
          </div>

          {/* Sidebar: Other Upcoming Events (lg: 4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E2D9C8] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F4ECE1]">
                <Calendar className="w-4 h-4 text-[#710912]" />
                <h3 className="font-serif text-base font-bold text-[#0D0D0D]">
                  Agenda Terdekat Lainnya
                </h3>
              </div>

              <div className="space-y-4">
                {otherEvents.map((oe) => (
                  <Link
                    key={oe.id}
                    href={`/agenda/${oe.slug}`}
                    className="block p-3 rounded-xl hover:bg-[#FAF7F2] transition-colors group"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#710912] block mb-1">
                      {oe.eventDate}
                    </span>
                    <h4 className="text-xs font-semibold text-[#0D0D0D] group-hover:text-[#710912] transition-colors leading-snug line-clamp-2 mb-1">
                      {oe.title}
                    </h4>
                    <span className="text-[10px] text-[#544942] block">
                      {oe.speaker}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#F4ECE1]">
                <Link
                  href="/agenda"
                  className="text-xs font-semibold text-[#710912] hover:underline inline-flex items-center gap-1"
                >
                  <span>Lihat Seluruh Kalender Agenda</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
