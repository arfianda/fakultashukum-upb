# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Calon Mahasiswa (Prospective Students):** Lulusan SMA/SMK/MA sederajat dan kaum profesional/karyawan industri yang mencari program Sarjana Hukum (S.H.) berakreditasi resmi, rincian biaya transparan tanpa uang gedung, simulasi peradilan semu (Moot Court), serta jalur pendaftaran online.
2. **Publik, Peneliti, & Mitra Industri/Hukum:** Praktisi hukum, lembaga peradilan, perusahaan kawasan industri Cikarang-Bekasi, dan akademisi yang mencari kepakaran dewan dosen, narasumber saksi ahli, jurnal ilmiah terakreditasi SINTA (Pelita Law Review), serta layanan konsultasi pro-bono Klinik Bantuan Hukum (KLBH).
3. **Sivitas Akademika (Mahasiswa & Dosen):** Mahasiswa dan dosen aktif yang membutuhkan gerbang masuk cepat ke sistem perkuliahan (SIAKAD UPB, EdLink LMS, SISTER BKD, E-Library).
4. **Pengelola Konten Dekanat / Admin:** Tim redaksi dan pengelola dekanat yang mempublikasikan warta kampus, agenda simposium hukum, direktori dosen, dan memverifikasi permohonan konsultasi hukum via panel CMS.

## Product Purpose

Portal publik resmi Fakultas Hukum Universitas Pelita Bangsa (FH UPB) sebagai etalase digital institusi yang kredibel, berwibawa, dan modern. Produk ini memusatkan seluruh informasi akademik kurikulum, biaya perkuliahan yang terjangkau tanpa pungutan tersembunyi, pendaftaran mahasiswa baru berbasis portal SPMB, dan pengenalan keunggulan kemahiran litigasi ruang sidang.

## Positioning

Fakultas Hukum dengan keunggulan kemahiran litigasi ruang sidang (standar Mahkamah Agung) dan hukum bisnis korporasi yang terintegrasi langsung dengan kawasan industri manufaktur terbesar di Asia Tenggara (Cikarang - Bekasi). Menyediakan biaya kuliah terjangkau yang dapat diangsur bulanan tanpa uang gedung / uang pangkal pembangunan.

## Operating Context

- Diadopsi melalui peramban web modern di perangkat seluler dan desktop.
- Menjadi gerbang utama penerimaan mahasiswa baru yang mengarahkan pendaftar ke sistem SPMB Cloud universitas.
- Sistem operasional akademik internal (pengisian KRS, KHS, presensi, kepegawaian) didelegasikan secara terpadu ke SIAKAD, EdLink, dan ekosistem portal "Lintas Hukum".

## Capabilities and Constraints

- **Kemampuan Utama:**
  - Navigasi floating pill berwibawa dengan katalog program studi, kurikulum, peminatan, dewan dosen, fasilitas, dan warta fakultas.
  - Alur pendaftaran langsung ke portal resmi SPMB SiakadCloud UPB (`https://pelitabangsa.siakadcloud.com/spmbfront/jalur-seleksi`).
  - Modal login sivitas akademika terpadu (pintu masuk Mahasiswa, Dosen, dan Admin Dekanat).
  - Direktori dosen pakar dan modul interaktif peradilan semu (Moot Court).
  - Panel CMS Administrator berbasis NextAuth & Prisma ORM untuk manajemen artikel warta, agenda, dan permohonan KLBH.
- **Batasan Teknis:**
  - Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, Prisma ORM, Framer Motion, Lucide Icons.
  - Mitigasi keamanan: sanitasi konten Rich Text CMS di sisi server menggunakan `isomorphic-dompurify`.
  - Pendaftaran mahasiswa tidak menyimpan data duplikat di website ini, melainkan diarahkan langsung ke portal SPMB resmi universitas.

## Brand Commitments

- **Identitas Institusi:** Fakultas Hukum Universitas Pelita Bangsa (FH UPB).
- **Tone of Voice:** Akademik, berwibawa, intelek, lugas, humanis, berintegritas, anti-slop, dan menjunjung keadilan hukum.
- **Warna Identitas:** Deep Burgundy/Maroon (`#710912`), Warm Alabaster (`#FAF7F2` / `#EFE5D2`), Dark Charcoal (`#0D0D0D`).
- **Aset Resmi:** Lambang resmi Universitas Pelita Bangsa (`/images/logo-upb.png`).

## Evidence on Hand

- Dokumen Persyaratan Produk resmi di [`docs/PRD.md`](file:///home/arfiandastr/Documents/work/fakultashukum-upb/docs/PRD.md).
- Dokumen Desain & Prinsip UI di [`docs/DESIGN.md`](file:///home/arfiandastr/Documents/work/fakultashukum-upb/docs/DESIGN.md).
- Sumber data halaman dan profil kurikulum terstruktur di [`src/data/pagesData.ts`](file:///home/arfiandastr/Documents/work/fakultashukum-upb/src/data/pagesData.ts).
- Dokumentasi foto fasilitas persidangan semu dan perkuliahan di direktori `public/images/`.

## Product Principles

1. **Otoritas Akademik & Integritas Yuridis:** Setiap elemen visual dan salinan teks memancarkan wibawa keilmuan hukum, menjauhi tren visual dangkal, dan menghormati tradisi peradilan.
2. **Transparansi Tanpa Hambatan:** Biaya kuliah, kurikulum, syarat kelulusan, dan alur pendaftaran disajikan terang benderang tanpa biaya siluman.
3. **Kesiapan Praktik Litigasi & Industri:** Menonjolkan kemahiran simulasi sidang nyata dan penguasaan kontrak bisnis modern yang siap pakai di panggung profesional.
4. **Kejelasan Pintu Masuk Pengguna:** Antarmuka membedakan dengan tegas antara calon mahasiswa pendaftar baru, publik pencari kepakaran, dan sivitas akademika yang mengakses portal akademik.

## Accessibility & Inclusion

- Memenuhi standar WCAG 2.1 Level AA dengan rasio kontras teks tinggi di atas latar belakang terang dan gelap.
- Navigasi ramah papan ketik (Keyboard accessible) dengan focus visible rings jelas, tombol lewati ke konten (`SkipToContent`), dan penutupan modal via tombol Escape.
- Tipografi responsif dengan penskalaan proporsional dari ponsel layar kecil hingga layar desktop lebar.
