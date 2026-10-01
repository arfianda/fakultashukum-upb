import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage } from "@/components/layout/InfoPage";
import { pagesData } from "@/data/pagesData";

const pageKey = "penerimaan-reguler";

export const metadata: Metadata = {
  title: `${pagesData[pageKey]?.title} | Fakultas Hukum UPB`,
  description: pagesData[pageKey]?.description,
};

export default function PenerimaanRegulerPage() {
  const data = pagesData[pageKey];
  if (!data) notFound();
  return <InfoPage data={data} />;
}
