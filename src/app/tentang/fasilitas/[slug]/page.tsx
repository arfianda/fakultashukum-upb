import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage } from "@/components/layout/InfoPage";
import {
  fasilitasDetails,
  aboutSiblings,
  InfoPageData,
} from "@/data/pagesData";

export async function generateStaticParams() {
  return Object.keys(fasilitasDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = fasilitasDetails[slug];
  if (!item) return { title: "Fasilitas Kampus | Fakultas Hukum UPB" };

  return {
    title: `${item.title} | Fakultas Hukum UPB`,
    description: item.description,
  };
}

export default async function FasilitasDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = fasilitasDetails[slug];
  if (!item) notFound();

  const pageData: InfoPageData = {
    slug: `tentang/fasilitas/${item.slug}`,
    title: item.title,
    kicker: item.kicker,
    description: item.description,
    breadcrumbs: [
      { label: "Tentang", href: "/tentang" },
      { label: "Fasilitas Kampus", href: "/tentang/fasilitas" },
      { label: item.title },
    ],
    parentSectionTitle: "Tentang Fakultas",
    siblings: aboutSiblings,
    sections: [
      {
        title: "Spesifikasi & Keunggulan Fasilitas",
        content: [
          item.description,
          "Sarana ini dirancang untuk menciptakan atmosfer akademik yang kondusif, mendukung riset mandiri para mahasiswa sarjana, serta memfasilitasi forum ilmiah skala nasional.",
        ],
        items: item.features.map((feat, fIdx) => ({
          title: `Keunggulan ${fIdx + 1}`,
          description: feat,
          badge: "Fasilitas",
        })),
      },
      {
        title: "Lokasi & Akses Sivitas Akademika",
        content: [
          `Fasilitas ini dapat diakses oleh seluruh mahasiswa, dosen, dan peneliti Fakultas Hukum Universitas Pelita Bangsa pada jam operasional perkuliahan.`,
        ],
        callout: {
          title: "Penempatan Kampus",
          text: item.location,
        },
      },
    ],
    cta: {
      title: "Jelajahi Fasilitas Kampus Lainnya",
      description: "Lihat sarana ruang sidang peradilan semu, studio klinik hukum, dan ruang perkuliahan terpadu.",
      buttonText: "Lihat Semua Fasilitas",
      buttonHref: "/tentang/fasilitas",
      secondaryText: "Hubungi Kontak Dekanat",
      secondaryHref: "/kontak",
    },
  };

  return <InfoPage data={pageData} />;
}
