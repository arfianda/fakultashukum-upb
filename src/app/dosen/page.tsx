import React from "react";
import { Metadata } from "next";
import { getFacultyData } from "@/lib/dataService";
import { DosenListingClient } from "./DosenListingClient";

export const metadata: Metadata = {
  title: "Direktori Tenaga Pengajar & Guru Besar | Fakultas Hukum UPB",
  description:
    "Direktori resmi dewan guru besar, dosen tetap, dan pakar hukum di Fakultas Hukum Universitas Pelita Bangsa.",
};

export default async function DosenPage() {
  const faculty = await getFacultyData();

  return (
    <DosenListingClient
      initialFaculty={faculty}
      kicker="DIREKTORI PENGAJAR"
      title="Tenaga Pengajar & Dewan Guru Besar"
      description="Belajar langsung dari Guru Besar, pakar doktrinal, dan praktisi peradilan berpengalaman di Fakultas Hukum Universitas Pelita Bangsa."
    />
  );
}
