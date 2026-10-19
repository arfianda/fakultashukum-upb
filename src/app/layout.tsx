import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { AdmissionProvider } from "@/context/AdmissionContext";
import { RootShell } from "@/components/layout/RootShell";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Fakultas Hukum UPB",
    default: "Fakultas Hukum Universitas Pelita Bangsa | Integritas & Keadilan",
  },
  description:
    "Portal Resmi Fakultas Hukum Universitas Pelita Bangsa. Menyelenggarakan pendidikan Sarjana Hukum (S.H.) berstandar keunggulan akademik, kemahiran litigasi ruang sidang, riset yurisprudensi, dan advokasi keadilan publik.",
  keywords: [
    "Fakultas Hukum UPB",
    "Universitas Pelita Bangsa",
    "Ilmu Hukum",
    "Sarjana Hukum Cikarang Bekasi",
    "Peradilan Semu",
    "Hukum Bisnis",
    "Klinik Bantuan Hukum",
  ],
  authors: [{ name: "Fakultas Hukum Universitas Pelita Bangsa" }],
  openGraph: {
    title: "Fakultas Hukum Universitas Pelita Bangsa",
    description: "Membentuk Pemimpin Hukum Berintegritas dan Berkeadilan Global",
    url: "https://hukum.pelitabangsa.ac.id",
    siteName: "Fakultas Hukum UPB",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${newsreader.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF7F2] text-[#0D0D0D] antialiased">
        <AdmissionProvider>
          <RootShell>{children}</RootShell>
        </AdmissionProvider>
      </body>
    </html>
  );
}
