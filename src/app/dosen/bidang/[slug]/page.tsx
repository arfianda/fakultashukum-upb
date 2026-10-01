import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFacultyData } from "@/lib/dataService";
import { DosenListingClient } from "../../DosenListingClient";

const fieldTitles: Record<string, { title: string; description: string }> = {
  "hukum-bisnis-korporasi": {
    title: "Pakar Hukum Bisnis & Korporasi",
    description:
      "Direktori dewan pengajar dengan kepakaran hukum perdata dagang, kontrak korporasi, kepailitan, dan regulasi transaksi industri.",
  },
  "hukum-tata-negara": {
    title: "Pakar Hukum Tata Negara & Konstitusi",
    description:
      "Direktori dewan pengajar dengan kepakaran hukum tata negara, hukum acara Mahkamah Konstitusi, dan administrasi publik.",
  },
};

export async function generateStaticParams() {
  return [
    { slug: "hukum-bisnis-korporasi" },
    { slug: "hukum-tata-negara" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = fieldTitles[slug];
  if (!config) return { title: "Pakar Hukum | Fakultas Hukum UPB" };

  return {
    title: `${config.title} | Fakultas Hukum UPB`,
    description: config.description,
  };
}

export default async function DosenBidangPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = fieldTitles[slug];

  if (!config) {
    notFound();
  }

  const faculty = await getFacultyData();

  return (
    <DosenListingClient
      initialFaculty={faculty}
      kicker="PAKAR BIDANG KEAHLIAN"
      title={config.title}
      description={config.description}
      fieldFilter={slug}
    />
  );
}
