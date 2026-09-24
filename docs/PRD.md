# Product Requirements Document (PRD): Website Utama Fakultas Hukum Universitas Pelita Bangsa

## 1. Product Overview
Website Utama Fakultas Hukum (FH) adalah wajah digital publik (landing page) institusi yang dirancang dengan estetika klasik-modern berwibawa, mengambil inspirasi visual dari Yale Law School dengan balutan identitas warna Dark Maroon (#800000). 
Objektif utama produk ini adalah membangun kredibilitas, memusatkan informasi akademik, dan menarik minat calon mahasiswa baru. Produk ini memecahkan masalah ketiadaan pusat informasi publik yang representatif dan profesional.

## 2. Target Audience
- **Calon Mahasiswa (Prospective Students):** Individu yang mencari informasi akreditasi, biaya kuliah, beasiswa, dan program studi Ilmu Hukum untuk melanjutkan pendidikan.
- **Publik & Mitra Eksternal:** Peneliti, instansi pemerintah, atau praktisi hukum yang ingin mengetahui profil dewan guru besar, riset unggulan, jurnal akademik, serta agenda kuliah umum fakultas.

## 3. Core Features (MoSCoW Method)
**Must Have (Kebutuhan Esensial MVP):**
- **Hero Section & Navigasi:** Beranda imersif dengan mega-menu yang rapi dan tombol Call-to-Action (CTA) "Pendaftaran Mahasiswa Baru" yang menonjol.
- **Halaman Program Akademik:** Rincian kurikulum S.H., konsentrasi studi (Pidana, Perdata, dll), dan profil lulusan.
- **Halaman Pendaftaran & Beasiswa:** Informasi alur pendaftaran, rincian biaya transparan, dan opsi beasiswa.

**Should Have (Prioritas Tinggi):**
- **Direktori Pakar & Guru Besar:** Etalase profil dosen dengan spesialisasi keilmuan dan kutipan riset unggulan.
- **Editorial Grid (Berita & Riset):** Tata letak bergaya jurnal untuk publikasi berita kampus, agenda simposium, dan tautan ke jurnal SINTA.
- **Fasilitas & Kehidupan Mahasiswa:** Galeri visual (Ruang Peradilan Semu, Perpustakaan) dan daftar organisasi mahasiswa tingkat fakultas dan universitas.

**Could Have (Peningkatan Jangka Panjang):**
- Tur virtual 360 derajat untuk Ruang Peradilan Semu dan fasilitas kampus lainnya.
- Integrasi feed media sosial fakultas secara real-time.

**Won't Have (Di luar cakupan saat ini):**
- Portal login mahasiswa, dasbor administrasi, sistem e-office persuratan, dan janji temu dosen (fitur operasional internal ini didelegasikan ke proyek "Lintas Hukum").

## 4. User Stories
- Sebagai **calon mahasiswa**, saya ingin melihat rincian kurikulum dan biaya kuliah di satu halaman agar saya bisa membandingkan dan memutuskan untuk mendaftar.
- Sebagai **pengunjung publik**, saya ingin membaca berita terbaru dan agenda simposium di beranda agar saya bisa mengikuti perkembangan intelektual kampus.
- Sebagai **mitra instansi hukum**, saya ingin mencari profil guru besar beserta bidang keahliannya agar saya bisa mengundang mereka sebagai ahli atau pembicara.
- Sebagai **admin konten kampus**, saya ingin mengelola (CRUD) artikel, agenda, dan profil dosen melalui CMS berbasis NextAuth agar website selalu aktual.

## 5. Non-Functional Requirements & Technical Constraints
- **Arsitektur & Kompatibilitas:** Aplikasi dibangun menggunakan ekosistem Next.js (App Router) dan TypeScript. Database diatur menggunakan ORM Prisma (MySQL).
- **Kualitas Antarmuka (UI/UX):** Evaluasi User Experience pasca-pengembangan wajib menggunakan instrumen pengujian System Usability Scale (SUS) dengan target skor kelayakan minimal 75.
- **Keamanan Aplikasi (Mitigasi XSS):** Karena CMS menyimpan input dari Rich Text Editor, semua payload wajib disanitasi di sisi server menggunakan pustaka `isomorphic-dompurify` sebelum disimpan ke database Prisma dan dirender ke DOM.
- **Environment Eksekusi:** Struktur direktori source code dan package management harus sangat modular dan dipastikan berjalan mulus tanpa kendala pathing pada environment Linux (khususnya EndeavourOS).

## 6. Success Metrics
- **Akuisisi (Conversion Rate):** Peningkatan rasio klik (Click-Through Rate) pada tombol CTA Pendaftaran sebesar 30% pada kuartal pertama peluncuran.
- **Engagement:** Menjaga bounce rate di bawah 45% dengan memastikan kecepatan muat (First Contentful Paint) di bawah 2.5 detik melalui pemanfaatan Server-Side Rendering (SSR) Next.js.
- **Keamanan:** 100% lolos pengujian penetrasi untuk kerentanan XSS dan celah injeksi database sebelum peluncuran resmi.