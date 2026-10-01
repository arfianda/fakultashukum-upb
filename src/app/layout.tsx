import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AdmissionProvider } from "@/context/AdmissionContext";
import { RootShell } from "@/components/layout/RootShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
    <html lang="id" className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FCF9F8] text-[#1C1B1B] antialiased">
        <AdmissionProvider>
          <RootShell>{children}</RootShell>
        </AdmissionProvider>
      </body>
    </html>
  );
}
