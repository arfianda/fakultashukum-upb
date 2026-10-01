import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage } from "@/components/layout/InfoPage";
import {
  peminatanDetails,
  academicSiblings,
  InfoPageData,
} from "@/data/pagesData";

export async function generateStaticParams() {
  return Object.keys(peminatanDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = peminatanDetails[slug];
  if (!item) return { title: "Peminatan Hukum | Fakultas Hukum UPB" };

  return {
    title: `${item.title} | Fakultas Hukum UPB`,
    description: item.description,
  };
}

export default async function PeminatanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = peminatanDetails[slug];
  if (!item) notFound();

  const pageData: InfoPageData = {
    slug: `akademik/peminatan/${item.slug}`,
    title: item.title,
    kicker: item.kicker,
    description: item.description,
    breadcrumbs: [
      { label: "Program Studi", href: "/akademik" },
      { label: "Bidang Peminatan", href: "/akademik/peminatan" },
      { label: item.title },
    ],
    parentSectionTitle: "Program Studi",
    siblings: academicSiblings,
    sections: [
      {
        title: "Kurikulum & Mata Kuliah Keahlian Khusus",
        kicker: item.subtitle,
        content: [
          `Mahasiswa yang memilih konsentrasi ${item.title} akan menempuh rangkaian mata kuliah keahlian mendalam yang dirancang untuk mengasah analisis doktrinal dan kemahiran praktis dalam bidang ini.`,
        ],
        items: item.subjects.map((sub, sIdx) => ({
          title: sub,
          description: `Mata kuliah peminatan inti tingkat lanjut semester 5-7 dengan fokus pada kajian kasus empiris dan perancangan berkas yuridis.`,
          badge: `Mata Kuliah ${sIdx + 1}`,
        })),
      },
      {
        title: "Peluang & Prospek Karir Lulusan",
        content: [
          `Lulusan dengan konsentrasi ${item.title} dipersiapkan untuk mengisi posisi strategis di berbagai instansi penegak hukum, lembaga negara, korporasi swasta, maupun firma hukum terkemuka:`,
        ],
        callout: {
          title: "Prospek Profesi Utama",
          text: item.careers,
        },
      },
    ],
    cta: {
      title: `Tertarik Mendalami ${item.title}?`,
      description: "Konsultasikan pilihan peminatan studi Anda dengan tim admisi dekanat Fakultas Hukum UPB.",
      buttonText: "Daftar Mahasiswa Baru",
      buttonHref: "/penerimaan/daftar",
      secondaryText: "Lihat Seluruh Peminatan",
      secondaryHref: "/akademik/peminatan",
    },
  };

  return <InfoPage data={pageData} />;
}
