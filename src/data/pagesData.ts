export interface PageSectionItem {
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  bullets?: string[];
  link?: { label: string; href: string };
}

export interface PageSection {
  id?: string;
  title: string;
  kicker?: string;
  content: string[];
  items?: PageSectionItem[];
  emptyState?: string;
  callout?: {
    type?: "info" | "highlight";
    title: string;
    text: string;
  };
}

export interface SidebarSiblingLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface InfoPageData {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  parentSectionTitle: string;
  siblings: SidebarSiblingLink[];
  sections: PageSection[];
  cta?: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
}

// ==========================================
// SIBLINGS PRESETS PER GROUP
// ==========================================
export const academicSiblings: SidebarSiblingLink[] = [
  { label: "Ikhtisar Program Studi", href: "/akademik" },
  { label: "Sarjana Hukum (S.H.)", href: "/akademik/program-sarjana-hukum" },
  { label: "Bidang Peminatan & Konsentrasi", href: "/akademik/peminatan" },
  { label: "Kurikulum & Distribusi Semester", href: "/akademik/kurikulum" },
  { label: "Pendidikan Khusus Advokat (PKPA)", href: "/akademik/pkpa" },
  { label: "Workshop Kemahiran Litigasi", href: "/akademik/workshop-litigasi" },
];

export const admissionSiblings: SidebarSiblingLink[] = [
  { label: "Ikhtisar Penerimaan & Biaya", href: "/penerimaan" },
  { label: "Jalur Sarjana Reguler Pagi", href: "/penerimaan/reguler" },
  { label: "Sarjana Kelas Karyawan", href: "/penerimaan/kelas-karyawan" },
  { label: "Persyaratan & Jadwal Gelombang", href: "/penerimaan/jadwal" },
  { label: "Rincian Biaya & Angsuran Bulanan", href: "/penerimaan/biaya" },
  { label: "Skema Beasiswa Prestasi & KIP-K", href: "/penerimaan/beasiswa" },
  { label: "Panduan Pendaftaran Mahasiswa Baru", href: "/penerimaan/daftar" },
  { label: "Buku Panduan Akademik PDF", href: "/penerimaan/brosur" },
  { label: "Pertanyaan Umum (FAQ PMB)", href: "/penerimaan/faq" },
];

export const studentLifeSiblings: SidebarSiblingLink[] = [
  { label: "Ikhtisar Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
  { label: "Organisasi Mahasiswa I (Lorem Ipsum)", href: "/kehidupan-mahasiswa/organisasi-1" },
  { label: "Organisasi Mahasiswa II (Lorem Ipsum)", href: "/kehidupan-mahasiswa/organisasi-2" },
  { label: "Organisasi Mahasiswa III (Lorem Ipsum)", href: "/kehidupan-mahasiswa/organisasi-3" },
  { label: "Prestasi & Kejuaraan Mahasiswa", href: "/kehidupan-mahasiswa/prestasi" },
  { label: "Advokasi & Aksi Sosial Keadilan", href: "/kehidupan-mahasiswa/advokasi" },
];

export const aboutSiblings: SidebarSiblingLink[] = [
  { label: "Tentang Fakultas Hukum", href: "/tentang" },
  { label: "Senat Akademik Fakultas", href: "/tentang/senat-akademik" },
  { label: "Profil Lulusan & Ikatan Alumni", href: "/tentang/alumni" },
  { label: "Fasilitas Kampus Terpadu", href: "/tentang/fasilitas" },
  { label: "Kontak Dekanat & Informasi", href: "/kontak" },
];

export const centersSiblings: SidebarSiblingLink[] = [
  { label: "Ikhtisar Pusat Studi & Lab", href: "/pusat-studi" },
  { label: "Laboratorium Peradilan Semu", href: "/pusat-studi/laboratorium-peradilan-semu" },
  { label: "Klinik Bantuan Hukum (KBH)", href: "/pusat-studi/klinik-bantuan-hukum" },
];

export const facultySiblings: SidebarSiblingLink[] = [
  { label: "Seluruh Tenaga Pengajar Tetap", href: "/dosen" },
  { label: "Pakar Hukum Bisnis & Korporasi", href: "/dosen/bidang/hukum-bisnis-korporasi" },
  { label: "Pakar Hukum Tata Negara", href: "/dosen/bidang/hukum-tata-negara" },
  { label: "Buku Ajar & Monograf", href: "/dosen/publikasi" },
  { label: "Keterangan Ahli di Pengadilan", href: "/dosen/keterangan-ahli" },
];

// ==========================================
// MASTER PAGES DATA
// ==========================================
export const pagesData: Record<string, InfoPageData> = {
  // ------------------------------------------
  // AKADEMIK / PROGRAM STUDI
  // ------------------------------------------
  akademik: {
    slug: "akademik",
    title: "Program Studi & Keilmuan Hukum",
    kicker: "FAKULTAS HUKUM UPB",
    description:
      "Mempersiapkan yuris berintegritas dan siap beracara di peradilan nasional maupun memimpin negosiasi transaksi korporasi global.",
    breadcrumbs: [{ label: "Program Studi" }],
    parentSectionTitle: "Program Studi",
    siblings: academicSiblings,
    sections: [
      {
        title: "Pendidikan Tinggi Hukum Berkarakter & Profesional",
        content: [
          "Fakultas Hukum Universitas Pelita Bangsa menyelenggarakan pendidikan hukum yang memadukan kedalaman doktrin normatif, ketajaman analisis yuridis, dan kemahiran praktik beracara di ruang sidang.",
          "Mahasiswa dilatih langsung oleh para akademisi senior dan praktisi hukum aktif, dengan dukungan fasilitas laboratorium peradilan semu standar Mahkamah Agung serta keterlibatan aktif pada Klinik Bantuan Hukum (KBH).",
        ],
        items: [
          {
            title: "Program Sarjana Hukum (S.H.)",
            subtitle: "Kelas Reguler & Kelas Karyawan",
            description: "Pendidikan sarjana 144 SKS dengan kurikulum terpadu berbasis kemahiran litigasi dan hukum korporasi.",
            badge: "Gelar S.H.",
            link: { label: "Pelajari Program Sarjana", href: "/akademik/program-sarjana-hukum" },
          },
          {
            title: "4 Bidang Peminatan & Konsentrasi",
            subtitle: "Spesialisasi Keilmuan",
            description: "Hukum Pidana, Hukum Perdata & Bisnis, Hukum Tata Negara, serta Hukum Internasional.",
            badge: "Peminatan",
            link: { label: "Jelajahi Peminatan", href: "/akademik/peminatan" },
          },
          {
            title: "Kurikulum & Distribusi Semester",
            subtitle: "Struktur 8 Semester",
            description: "Tahapan pembelajaran terstruktur dari asas dasar hingga praktik kemahiran sidang dan skripsi.",
            badge: "144 SKS",
            link: { label: "Lihat Struktur Kurikulum", href: "/akademik/kurikulum" },
          },
          {
            title: "Pendidikan Khusus Profesi Advokat (PKPA)",
            subtitle: "Kerja Sama PERADI",
            description: "Pendidikan kemahiran profesi advokat resmi bekerja sama dengan organisasi advokat nasional.",
            badge: "Profesi",
            link: { label: "Informasi PKPA", href: "/akademik/pkpa" },
          },
        ],
      },
    ],
    cta: {
      title: "Mulai Langkah Akademik Anda",
      description: "Daftarkan diri Anda pada program Sarjana Hukum Universitas Pelita Bangsa untuk Tahun Akademik 2026/2027.",
      buttonText: "Daftar Mahasiswa Baru",
      buttonHref: "/penerimaan/daftar",
      secondaryText: "Konsultasi WhatsApp",
      secondaryHref: "https://wa.me/6281290008801",
    },
  },

  "program-sarjana-hukum": {
    slug: "program-sarjana-hukum",
    title: "Program Sarjana Hukum (S.H.)",
    kicker: "GELAR AKADEMIK SARJANA",
    description:
      "Pendidikan tinggi hukum yang mengintegrasikan penguasaan doktrin normatif, analisis yurisprudensi empiris, dan kemahiran simulasi persidangan peradilan semu.",
    breadcrumbs: [
      { label: "Program Studi", href: "/akademik" },
      { label: "Program Sarjana Hukum" },
    ],
    parentSectionTitle: "Program Studi",
    siblings: academicSiblings,
    sections: [
      {
        title: "Kompetensi Utama Lulusan Sarjana Hukum",
        content: [
          "Kurikulum Sarjana Hukum Fakultas Hukum Universitas Pelita Bangsa dirancang untuk melahirkan yuris profesional yang berintegritas moral tinggi, memiliki nalar hukum yang kritis, serta mampu memecahkan sengketa keperdataan, kepidanaan, maupun ketatanegaraan.",
          "Mahasiswa dibekali kemahiran beracara litigasi ruang sidang melalui simulasi kasus nyata, penyusunan berkas perkara gugatan/dakwaan/eksepsi, serta teknik negosiasi dan mediasi komersial di luar pengadilan.",
        ],
        items: [
          {
            title: "Penguasaan Doktrin & Asas Hukum",
            description: "Memahami akar filosofis, teori perundang-undangan, dan kepastian hukum substantif.",
            badge: "Fondasi Akademik",
          },
          {
            title: "Kemahiran Litigasi & Beracara",
            description: "Praktik persidangan peradilan semu dengan standar operasional pengadilan negeri dan tata usaha negara.",
            badge: "Praktik Ruang Sidang",
          },
          {
            title: "Etika Profesi & Integritas Moral",
            description: "Menjunjung tinggi kejujuran intelektual, tanggung jawab keadilan sosial, dan anti-korupsi.",
            badge: "Integritas Etis",
          },
        ],
      },
      {
        title: "Jalur Penyelenggaraan Pendidikan",
        content: [
          "Fakultas Hukum UPB menyediakan dua jalur perkuliahan yang setara secara kurikulum dan akreditasi:",
        ],
        items: [
          {
            title: "Kelas Reguler Pagi",
            subtitle: "Senin s.d. Jumat (08.00 - 16.30 WIB)",
            description: "Dikhususkan bagi lulusan SMA/SMK/MA sederajat untuk pendalaman akademik penuh waktu.",
            link: { label: "Informasi Jalur Reguler", href: "/penerimaan/reguler" },
          },
          {
            title: "Kelas Karyawan / Eksekutif",
            subtitle: "Jumat Malam & Sabtu Penuh",
            description: "Didesain bagi profesional, staf legal industri, wiraswasta, dan aparat yang menempuh pendidikan hukum tanpa mengganggu jam kerja.",
            link: { label: "Informasi Kelas Karyawan", href: "/penerimaan/kelas-karyawan" },
          },
        ],
      },
    ],
    cta: {
      title: "Mulai Pendidikan Hukum Anda di FH UPB",
      description: "Bergabunglah bersama ribuan civitas akademika dan alumni yang berkarir di lembaga yudisial, korporasi, dan firma hukum terkemuka.",
      buttonText: "Daftar Mahasiswa Baru",
      buttonHref: "/penerimaan/daftar",
      secondaryText: "Konsultasi via WhatsApp",
      secondaryHref: "https://wa.me/6281290008801",
    },
  },

  "peminatan-listing": {
    slug: "peminatan",
    title: "Bidang Peminatan & Konsentrasi Studi",
    kicker: "SPESIALISASI KEILMUAN HUKUM",
    description:
      "Pilihan konsentrasi akademik yang mengasah keahlian doktrin khusus dan kemahiran profesional sesuai arah karir masa depan Anda.",
    breadcrumbs: [
      { label: "Program Studi", href: "/akademik" },
      { label: "Bidang Peminatan" },
    ],
    parentSectionTitle: "Program Studi",
    siblings: academicSiblings,
    sections: [
      {
        title: "Empat Rumpun Konsentrasi Keilmuan Hukum",
        content: [
          "Mahasiswa Program Sarjana Hukum memilih salah satu rumpun konsentrasi pada semester 5 untuk mendalami mata kuliah peminatan khusus dan menyusun penelitian tugas akhir skripsi.",
        ],
        items: [
          {
            title: "Hukum Pidana & Peradilan Pidana",
            subtitle: "Litigasi Perkara Pidana & Forensik Digital",
            description: "Mendalami hukum pidana korporasi, pembuktian dokumen digital, sistem peradilan pidana terpadu, dan restorative justice.",
            badge: "Pidana",
            link: { label: "Detail Konsentrasi Pidana", href: "/akademik/peminatan/hukum-pidana" },
          },
          {
            title: "Hukum Perdata, Bisnis & Transaksi Digital",
            subtitle: "Tata Kelola Korporasi & Kontrak Dagang",
            description: "Fokus pada struktur transaksi komersial industri, perancangan kontrak bisnis internasional, kepailitan, dan perlindungan data fintech.",
            badge: "Perdata Bisnis",
            link: { label: "Detail Konsentrasi Perdata", href: "/akademik/peminatan/hukum-perdata-bisnis" },
          },
          {
            title: "Hukum Tata Negara & Kebijakan Publik",
            subtitle: "Kajian Konstitusi & Pengawasan Regulasi",
            description: "Menelaah doktrin pemisahan kekuasaan, peradilan konstitusi, hukum administrasi publik di kawasan industri, dan legislative drafting.",
            badge: "Tata Negara",
            link: { label: "Detail Konsentrasi HTN", href: "/akademik/peminatan/hukum-tata-negara" },
          },
          {
            title: "Hukum Internasional & Transnasional",
            subtitle: "Perdagangan Global & Yurisdiksi Lintas Batas",
            description: "Hukum perdagangan dunia (WTO), regulasi investasi asing, hukum humaniter internasional, dan arbitrase komersial lintas negara.",
            badge: "Internasional",
            link: { label: "Detail Konsentrasi Internasional", href: "/akademik/peminatan/hukum-internasional" },
          },
        ],
      },
    ],
    cta: {
      title: "Pilih Spesialisasi Hukum Pilihan Anda",
      description: "Konsultasikan minat keilmuan dan prospek karir Anda bersama dewan dosen penasihat akademik.",
      buttonText: "Daftar Sekarang",
      buttonHref: "/penerimaan/daftar",
    },
  },

  kurikulum: {
    slug: "kurikulum",
    title: "Kurikulum & Distribusi Semester",
    kicker: "STRUKTUR PEMBELAJARAN",
    description:
      "Struktur kurikulum 144 SKS yang terbagi ke dalam mata kuliah wajib nasional, keahlian hukum inti, konsentrasi peminatan, serta kemahiran praktik peradilan semu.",
    breadcrumbs: [
      { label: "Program Studi", href: "/akademik" },
      { label: "Kurikulum" },
    ],
    parentSectionTitle: "Program Studi",
    siblings: academicSiblings,
    sections: [
      {
        title: "Kerangka Kurikulum 144 SKS",
        content: [
          "Kurikulum Sarjana Hukum diselesaikan dalam masa studi 8 semester (4 tahun), dengan bobot total 144 Satuan Kredit Semester (SKS).",
          "Pembelajaran disusun secara berjenjang dari pengenalan teori dasar hukum pada semester awal, pendalaman doktrin perundang-undangan pada semester menengah, hingga praktik peradilan dan penyusunan tugas akhir skripsi pada semester akhir.",
        ],
        items: [
          {
            title: "Rumpun Mata Kuliah Dasar Keahlian Hukum (MKDK)",
            description: "Pengantar Ilmu Hukum, Pengantar Hukum Indonesia, Teori Hukum, Hukum Tata Negara, dan Hukum Adat/Islam.",
            badge: "Semester 1 - 2",
          },
          {
            title: "Rumpun Mata Kuliah Keahlian Hukum Pokok (MKK)",
            description: "Hukum Perdata, Hukum Pidana, Hukum Dagang/Bisnis, Hukum Administrasi Negara, dan Hukum Acara.",
            badge: "Semester 3 - 4",
          },
          {
            title: "Rumpun Peminatan Konsentrasi & Pilihan Khusus",
            description: "Pemilihan 1 dari 4 konsentrasi keilmuan hukum serta mata kuliah spesialisasi transaksi dan litigasi.",
            badge: "Semester 5 - 6",
          },
          {
            title: "Rumpun Kemahiran Hukum, Magang & Skripsi",
            description: "Praktik Peradilan Semu, Legal Drafting, Klinik Bantuan Hukum (KBH), dan Ujian Sidang Skripsi.",
            badge: "Semester 7 - 8",
          },
        ],
      },
      {
        title: "Daftar Distribusi Mata Kuliah Tiap Semester",
        content: [
          "Rincian silabus mata kuliah resmi per semester ditetapkan berdasarkan Keputusan Dekan dan Badan Penjaminan Mutu (BPM) Universitas Pelita Bangsa.",
        ],
        // TODO: Lengkapi rincian silabus mata kuliah per semester 1-8 sesuai SK Kurikulum Dekanat
        emptyState: "Rincian silabus lengkap per mata kuliah untuk Tahun Akademik 2026/2027 sedang dalam proses pembaharuan dokumen resmi BAAK. Informasi akan segera diperbarui.",
      },
    ],
    cta: {
      title: "Ingin Mempelajari Silabus Lengkap?",
      description: "Unduh buku panduan akademik resmi atau hubungi bagian administrasi akademik BAAK.",
      buttonText: "Unduh Panduan Akademik",
      buttonHref: "/penerimaan/brosur",
      secondaryText: "Jelajahi Peminatan",
      secondaryHref: "/akademik/peminatan",
    },
  },

  pkpa: {
    slug: "pkpa",
    title: "Pendidikan Khusus Profesi Advokat (PKPA)",
    kicker: "PENDIDIKAN KEMAHIRAN PROFESI",
    description:
      "Kerjasama strategis Fakultas Hukum UPB dengan Perhimpunan Advokat Indonesia (PERADI) dalam menyelenggarakan pendidikan persiapan Ujian Profesi Advokat (UPA).",
    breadcrumbs: [
      { label: "Program Studi", href: "/akademik" },
      { label: "Pendidikan Advokat (PKPA)" },
    ],
    parentSectionTitle: "Program Studi",
    siblings: academicSiblings,
    sections: [
      {
        title: "Peran & Tujuan Pendidikan Advokat",
        content: [
          "Pendidikan Khusus Profesi Advokat (PKPA) diselenggarakan sebagai jembatan bagi lulusan Sarjana Hukum (S.H.) menuju profesi penegak hukum independen yang berintegritas sesuai amanat Undang-Undang Nomor 18 Tahun 2003 tentang Advokat.",
          "Materi pengajaran diasuh langsung oleh advokat senior, kurator kepailitan, konsultan hukum pasar modal, serta hakim pengadilan tinggi.",
        ],
        items: [
          {
            title: "Hukum Acara Pidana & Litigasi Lanjutan",
            description: "Teknik praperadilan, penyusunan nota pembelaan (pledoi), dan pembuktian digital forensik.",
            badge: "Litigasi Pidana",
          },
          {
            title: "Hukum Acara Perdata & Eksekusi Putusan",
            description: "Penyusunan gugatan wanprestasi dan PMH, sita jaminan (revindicatoir beslag), dan eksekusi lelang.",
            badge: "Litigasi Perdata",
          },
          {
            title: "Perancangan Kontrak Bisnis & Negosiasi",
            description: "Legal drafting kontrak komersial lintas yurisdiksi, klausul arbitrase, dan mitigasi risiko usaha.",
            badge: "Non-Litigasi",
          },
          {
            title: "Kode Etik Profesi Advokat Indonesia",
            description: "Standar moralitas pembelaan klien, larangan suap peradilan, dan benturan kepentingan.",
            badge: "Etika Profesi",
          },
        ],
      },
    ],
    cta: {
      title: "Jadwal Gelombang Pendaftaran PKPA Terbaru",
      description: "Konsultasikan jadwal pelaksanaan kelas akhir pekan dan kelengkapan berkas ijazah S.H. Anda.",
      buttonText: "Hubungi Sekretariat Dekanat",
      buttonHref: "/kontak",
      secondaryText: "Lihat Kalender Agenda",
      secondaryHref: "/agenda",
    },
  },

  "workshop-litigasi": {
    slug: "workshop-litigasi",
    title: "Workshop Perancangan Kontrak & Litigasi",
    kicker: "LOKAKARYA PRAKTEK HUKUM",
    description:
      "Pelatihan kemahiran intensif legal drafting klausul komersial, shareholder agreement, serta pembuktian dokumen peradilan.",
    breadcrumbs: [
      { label: "Program Studi", href: "/akademik" },
      { label: "Workshop Litigasi" },
    ],
    parentSectionTitle: "Program Studi",
    siblings: academicSiblings,
    sections: [
      {
        title: "Fokus Lokakarya Praktik",
        content: [
          "Workshop diselenggarakan berkala oleh Laboratorium Peradilan Semu dan Pusat Studi Hukum Bisnis Fakultas Hukum UPB.",
          "Peserta dilatih secara langsung menyusun dokumen hukum berstandar firma hukum papan atas, mulai dari nondisclosure agreement (NDA), perjanjian kerja sama investasi, hingga replik dan duplik persidangan.",
        ],
        items: [
          {
            title: "Legal Audit & Due Diligence",
            description: "Pemeriksaan kepatuhan hukum perusahaan kawasan industri sebelum proses merger atau akuisisi.",
            badge: "Korporasi",
          },
          {
            title: "Teknik Pembuktian Bukti Elektronik",
            description: "Validasi keabsahan tanda tangan elektronik, rekaman digital, dan jejak transaksi sesuai UU ITE.",
            badge: "Hukum Siber",
          },
        ],
      },
    ],
    cta: {
      title: "Tertarik Mengikuti Lokakarya Mendatang?",
      description: "Simak jadwal seminar dan workshop kemahiran terdekat pada kalender agenda fakultas.",
      buttonText: "Lihat Agenda Terdekat",
      buttonHref: "/agenda",
      secondaryText: "Kembali ke Program Studi",
      secondaryHref: "/akademik",
    },
  },

  // ------------------------------------------
  // PENERIMAAN / ADMISSION
  // ------------------------------------------
  penerimaan: {
    slug: "penerimaan",
    title: "Penerimaan Mahasiswa & Bantuan Biaya",
    kicker: "TAHUN AKADEMIK 2026/2027",
    description:
      "Investasi pendidikan hukum berintegritas dan transparan tanpa pungutan liar. Tersedia opsi kelas reguler pagi maupun eksekutif karyawan.",
    breadcrumbs: [{ label: "Penerimaan" }],
    parentSectionTitle: "Penerimaan & Biaya",
    siblings: admissionSiblings,
    sections: [
      {
        title: "Alur Penerimaan Mahasiswa Baru",
        content: [
          "Penerimaan Mahasiswa Baru Fakultas Hukum UPB diselenggarakan secara transparan melalui seleksi berkas dan tes potensi akademik.",
        ],
        items: [
          {
            title: "01. Pendaftaran Online",
            description: "Mengisi formulir registrasi akun mahasiswa baru dan memilih program pilihan.",
            badge: "Langkah 1",
            link: { label: "Buka Formulir Pendaftaran", href: "/penerimaan/daftar" },
          },
          {
            title: "02. Verifikasi Berkas",
            description: "Unggah dokumen ijazah terakhir, transkrip nilai, Kartu Tanda Penduduk, dan pasfoto formal.",
            badge: "Langkah 2",
            link: { label: "Cek Persyaratan", href: "/penerimaan/jadwal" },
          },
          {
            title: "03. Tes Potensi & Wawancara",
            description: "Uji penalaran logika hukum dasar, wawasan kebangsaan, serta peminatan konsentrasi studi.",
            badge: "Langkah 3",
          },
          {
            title: "04. Registrasi Ulang & NIM",
            description: "Konfirmasi penerimaan resmi, penerbitan Nomor Induk Mahasiswa, dan orientasi akademik kampus.",
            badge: "Langkah 4",
          },
        ],
      },
      {
        title: "Transparansi Biaya & Skema Angsuran",
        content: [
          "Fakultas Hukum UPB berkomitmen menyediakan biaya perkuliahan yang terjangkau dan transparan tanpa uang gedung / uang pembangunan.",
        ],
        items: [
          {
            title: "Biaya Formulir & Tes Masuk",
            subtitle: "Rp 250.000",
            description: "Biaya administrasi seleksi dan pembukaan akun pendaftaran mahasiswa baru.",
            badge: "Satu Kali",
          },
          {
            title: "SPP Angsuran Bulanan",
            subtitle: "Mulai dari Rp 650.000 / bulan",
            description: "Dapat diangsur secara rutin setiap bulan untuk meringankan beban finansial mahasiswa.",
            badge: "Bulanan",
            link: { label: "Rincian Biaya Lengkap", href: "/penerimaan/biaya" },
          },
          {
            title: "Praktikum Moot Court & E-Court",
            subtitle: "Termasuk dalam SPP",
            description: "Seluruh fasilitas laboratorium sidang semu dan klinik hukum bebas biaya tambahan.",
            badge: "Gratis Fasilitas",
          },
          {
            title: "Uang Gedung / Pembangunan",
            subtitle: "Bebas (Rp 0)",
            description: "Fakultas Hukum UPB tidak memungut uang pangkal gedung dari mahasiswa baru.",
            badge: "Bebas Gedung",
          },
        ],
      },
    ],
    cta: {
      title: "Siap Memulai Karir Yuridis Anda?",
      description: "Konsultasikan pendaftaran atau daftarkan diri Anda sekarang melalui formulir penerimaan resmi.",
      buttonText: "Isi Formulir Pendaftaran",
      buttonHref: "/penerimaan/daftar",
      secondaryText: "WhatsApp Layanan PMB",
      secondaryHref: "https://wa.me/6281290008801",
    },
  },

  "penerimaan-reguler": {
    slug: "penerimaan/reguler",
    title: "Sarjana Hukum (S.H.) Kelas Reguler",
    kicker: "JALUR PERKULIAHAN PENUH WAKTU",
    description:
      "Perkuliahan tatap muka penuh bagi lulusan SMA/SMK/MA dengan pendalaman praktikum peradilan semu intensif dan organisasi kemahasiswaan.",
    breadcrumbs: [
      { label: "Penerimaan", href: "/penerimaan" },
      { label: "Kelas Reguler" },
    ],
    parentSectionTitle: "Penerimaan & Biaya",
    siblings: admissionSiblings,
    sections: [
      {
        title: "Karakteristik Program Kelas Reguler",
        content: [
          "Program Kelas Reguler dirancang khusus bagi calon sarjana yang mendedikasikan waktu penuh untuk studi akademik dan pembentukan karakter kepemimpinan hukum di kampus.",
          "Mahasiswa reguler mendapatkan akses intensif ke laboratorium peradilan semu, delegasi kompetisi debat nasional, serta magang di instansi penegak hukum mitra.",
        ],
        items: [
          {
            title: "Jadwal Perkuliahan Hari Kerja",
            description: "Senin sampai Jumat, pukul 08.00 hingga 16.30 WIB di Kampus Utama UPB.",
            badge: "Jadwal",
          },
          {
            title: "Praktikum Peradilan Semu Wajib",
            description: "Simulasi persidangan perkara pidana, perdata, dan tata usaha negara di laboratorium Moot Court.",
            badge: "Praktikum",
          },
          {
            title: "Magang Terstruktur Mitra Resmi",
            description: "Penempatan magang kerja di Pengadilan Negeri, Kejaksaan, kantor advokat, dan divisi legal korporasi.",
            badge: "Karir",
          },
        ],
      },
    ],
    cta: {
      title: "Daftar Jalur Reguler 2026/2027",
      description: "Amankan kuota kursi kelas reguler Anda pada gelombang pendaftaran yang sedang berjalan.",
      buttonText: "Daftar Mahasiswa Baru",
      buttonHref: "/penerimaan/daftar",
    },
  },

  "penerimaan-karyawan": {
    slug: "penerimaan/kelas-karyawan",
    title: "Sarjana Hukum (S.H.) Kelas Karyawan",
    kicker: "JALUR PROFESIONAL & EKSEKUTIF",
    description:
      "Jadwal kuliah fleksibel malam hari dan akhir pekan, dirancang bagi staf legal kawasan industri, profesional, dan wirausahawan.",
    breadcrumbs: [
      { label: "Penerimaan", href: "/penerimaan" },
      { label: "Kelas Karyawan" },
    ],
    parentSectionTitle: "Penerimaan & Biaya",
    siblings: admissionSiblings,
    sections: [
      {
        title: "Fleksibilitas Tanpa Kompromi Mutu",
        content: [
          "Kelas Karyawan Fakultas Hukum UPB memiliki bobot 144 SKS, gelar Sarjana Hukum (S.H.), dan kurikulum yang setara penuh dengan kelas reguler.",
          "Dosen pengajar terdiri atas akademisi senior dan praktisi hukum aktif yang memahami dinamika hukum industri di koridor Cikarang-Bekasi.",
        ],
        items: [
          {
            title: "Jadwal Kuliah Akhir Pekan",
            description: "Perkuliahan tatap muka dan blended learning pada hari Jumat malam dan Sabtu penuh.",
            badge: "Waktu Fleksibel",
          },
          {
            title: "Studi Kasus Hukum Industri Riil",
            description: "Pembahasan sengketa hubungan industrial, kontrak dagang korporasi, kepailitan, dan perizinan amdal.",
            badge: "Relevansi Industri",
          },
          {
            title: "Jejaring Profesional Luas",
            description: "Berinteraksi langsung dengan rekan mahasiswa dari berbagai perusahaan multinasional dan BUMN.",
            badge: "Networking",
          },
        ],
      },
    ],
    cta: {
      title: "Raih Gelar S.H. Sembari Tetap Berkarir",
      description: "Konsultasikan kesesuaian waktu kerja Anda bersama tim admisi dekanat.",
      buttonText: "Daftar Kelas Karyawan",
      buttonHref: "/penerimaan/daftar",
      secondaryText: "WhatsApp Tim Admisi",
      secondaryHref: "https://wa.me/6281290008801",
    },
  },

  "penerimaan-jadwal": {
    slug: "penerimaan/jadwal",
    title: "Persyaratan & Jadwal Gelombang PMB",
    kicker: "AGENDA SELEKSI 2026/2027",
    description:
      "Jadwal pembukaan gelombang pendaftaran, batas pengumpulan berkas administrasi, dan prosedur seleksi mahasiswa baru.",
    breadcrumbs: [
      { label: "Penerimaan", href: "/penerimaan" },
      { label: "Persyaratan & Jadwal" },
    ],
    parentSectionTitle: "Penerimaan & Biaya",
    siblings: admissionSiblings,
    sections: [
      {
        title: "Persyaratan Berkas Pendaftaran",
        content: [
          "Calon mahasiswa baru diwajibkan menyiapkan berkas administrasi asli atau salinan legalisir untuk proses verifikasi:",
        ],
        items: [
          {
            title: "Ijazah & Transkrip / Rapor",
            description: "Salinan legalisir ijazah SMA/SMK/MA sederajat atau rapor semester 1-5 bagi yang belum lulus.",
            badge: "Akademik",
          },
          {
            title: "Identitas Kependudukan (KTP & KK)",
            description: "Salinan Kartu Tanda Penduduk dan Kartu Keluarga yang masih berlaku.",
            badge: "Administrasi",
          },
          {
            title: "Pasfoto Formal Terbaru",
            description: "Pasfoto berwarna formal ukuran 3x4 dan 4x6 latar belakang merah atau biru.",
            badge: "Dokumen",
          },
        ],
      },
      {
        title: "Tahapan Gelombang Pendaftaran",
        content: [
          "Penerimaan dibuka dalam tiga gelombang bertahap sepanjang tahun akademik berjalan:",
        ],
        items: [
          {
            title: "Gelombang I (Jalur Prestasi & Early Bird)",
            description: "Bebas tes tertulis bagi nilai rapor rata-rata ≥ 85 serta prioritas alokasi beasiswa yayasan.",
            badge: "Gelombang 1",
          },
          {
            title: "Gelombang II (Jalur Reguler)",
            description: "Seleksi berbasis tes potensi akademik online dan verifikasi portofolio berkas.",
            badge: "Gelombang 2",
          },
          {
            title: "Gelombang III (Jalur Penutupan)",
            description: "Seleksi kuota tersisa untuk kelas reguler dan kelas karyawan.",
            badge: "Gelombang 3",
          },
        ],
      },
    ],
    cta: {
      title: "Jangan Lewatkan Gelombang Pendaftaran",
      description: "Daftar sekarang untuk memastikan ketersediaan kursi pada peminatan pilihan Anda.",
      buttonText: "Isi Formulir Online",
      buttonHref: "/penerimaan/daftar",
    },
  },

  "penerimaan-biaya": {
    slug: "penerimaan/biaya",
    title: "Rincian Biaya & Angsuran Bulanan",
    kicker: "TRANSPARANSI KEUANGAN",
    description:
      "Rincian biaya kuliah Sarjana Hukum yang terjangkau tanpa uang gedung dan dapat diangsur secara bulanan.",
    breadcrumbs: [
      { label: "Penerimaan", href: "/penerimaan" },
      { label: "Biaya Kuliah" },
    ],
    parentSectionTitle: "Penerimaan & Biaya",
    siblings: admissionSiblings,
    sections: [
      {
        title: "Komponen Biaya Pendidikan Sarjana Hukum",
        content: [
          "Fakultas Hukum UPB menjamin transparansi pembiayaan kuliah tanpa ada biaya tersembunyi atau pungutan liar selama masa studi.",
        ],
        items: [
          {
            title: "Biaya Pendaftaran & Formulir",
            subtitle: "Rp 250.000 (Satu kali)",
            description: "Registrasi akun sistem penerimaan dan pelaksanaan tes seleksi potensi akademik online.",
            badge: "Registrasi",
          },
          {
            title: "SPP Bulanan Kelas Reguler",
            subtitle: "Mulai dari Rp 650.000 / bulan",
            description: "Termasuk biaya perkuliahan tatap muka, ujian semester (UTS & UAS), dan akses e-library.",
            badge: "Reguler",
          },
          {
            title: "SPP Bulanan Kelas Karyawan",
            subtitle: "Mulai dari Rp 750.000 / bulan",
            description: "Termasuk fasilitas pembelajaran hybrid, ruang kelas akhir pekan, dan materi digital.",
            badge: "Karyawan",
          },
          {
            title: "Uang Gedung / Pembangunan",
            subtitle: "Rp 0 (Bebas Biaya)",
            description: "Tidak dikenakan biaya sumbangan pembinaan pendidikan (SPP) uang gedung sama sekali.",
            badge: "Bebas Biaya",
          },
        ],
      },
    ],
    cta: {
      title: "Simulasi Pembayaran & Skema Angsuran",
      description: "Hubungi bagian keuangan dekanat untuk mendapatkan jadwal angsuran resmi per bulan.",
      buttonText: "Konsultasi Keuangan WhatsApp",
      buttonHref: "https://wa.me/6281290008801",
      secondaryText: "Daftar Sekarang",
      secondaryHref: "/penerimaan/daftar",
    },
  },

  "penerimaan-beasiswa": {
    slug: "penerimaan/beasiswa",
    title: "Skema Beasiswa Prestasi & Bantuan",
    kicker: "DUKUNGAN PENDIDIKAN",
    description:
      "Dukungan pendanaan pendidikan bagi calon sarjana hukum berprestasi akademik, penghafal Al-Qur'an, dan mitra industri.",
    breadcrumbs: [
      { label: "Penerimaan", href: "/penerimaan" },
      { label: "Beasiswa" },
    ],
    parentSectionTitle: "Penerimaan & Biaya",
    siblings: admissionSiblings,
    sections: [
      {
        title: "Program Beasiswa Unggulan Fakultas Hukum",
        content: [
          "Tersedia kuota beasiswa setiap tahun ajaran baru untuk mendukung calon yuris bertalenta tinggi dari berbagai latar belakang.",
        ],
        items: [
          {
            title: "Beasiswa Prestasi Akademik",
            subtitle: "Potongan SPP 50% - 100%",
            description: "Diberikan bagi peraih nilai rapor rata-rata ≥ 85 atau juara olimpiade/debat hukum tingkat provinsi dan nasional.",
            badge: "Prestasi",
          },
          {
            title: "Beasiswa Tahfiz Al-Qur'an",
            subtitle: "Bebas Biaya Pendidikan Penuh",
            description: "Diberikan bagi penghafal Al-Qur'an minimal 10 Juz bersertifikat lembaga tahfiz resmi terakreditasi.",
            badge: "Tahfiz",
          },
          {
            title: "Beasiswa Kemitraan Korporasi",
            subtitle: "Subsidi Khusus Karyawan Industri",
            description: "Bagi karyawan perusahaan di kawasan industri Cikarang-Bekasi yang menjalin kerja sama resmi dengan UPB.",
            badge: "Kemitraan",
          },
        ],
      },
    ],
    cta: {
      title: "Ajukan Beasiswa Pendidikan Anda",
      description: "Sertakan sertifikat atau bukti prestasi pada saat melengkapi formulir pendaftaran online.",
      buttonText: "Daftar Jalur Beasiswa",
      buttonHref: "/penerimaan/daftar",
    },
  },

  "penerimaan-daftar": {
    slug: "penerimaan/daftar",
    title: "Panduan Pendaftaran Mahasiswa Baru",
    kicker: "SEKRETARIAT ADMISI PMB",
    description:
      "Langkah-langkah pendaftaran daring mahasiswa baru Sarjana Hukum UPB Tahun Akademik 2026/2027.",
    breadcrumbs: [
      { label: "Penerimaan", href: "/penerimaan" },
      { label: "Panduan Pendaftaran" },
    ],
    parentSectionTitle: "Penerimaan & Biaya",
    siblings: admissionSiblings,
    sections: [
      {
        title: "Petunjuk Pengisian Formulir Daring",
        content: [
          "Pendaftaran mahasiswa baru Fakultas Hukum UPB dapat dilakukan secara online melalui portal website ini atau langsung di Sekretariat Dekanat Kampus Cikarang.",
          "Setelah mengisi formulir, calon mahasiswa akan menerima Nomor Registrasi Sementara dan dihubungi oleh petugas admisi dalam 1x24 jam kerja.",
        ],
        items: [
          {
            title: "1. Siapkan Data Diri",
            description: "Pastikan nama lengkap sesuai ijazah terakhir, nomor WhatsApp aktif, dan alamat email valid.",
            badge: "Persiapan",
          },
          {
            title: "2. Pilih Jalur Kelas",
            description: "Tentukan pilihan antara Kelas Reguler Pagi atau Kelas Karyawan Eksekutif.",
            badge: "Pilihan",
          },
          {
            title: "3. Konfirmasi Petugas Admisi",
            description: "Petugas admisi akan membantu penjadwalan tes online dan penyerahan berkas verifikasi.",
            badge: "Verifikasi",
          },
        ],
      },
    ],
    cta: {
      title: "Buka Formulir Pendaftaran Sekarang",
      description: "Klik tombol di bawah ini untuk membuka dialog pendaftaran online langsung di layar Anda.",
      buttonText: "Isi Formulir Admisi",
      buttonHref: "/penerimaan",
      secondaryText: "Hubungi WhatsApp PMB",
      secondaryHref: "https://wa.me/6281290008801",
    },
  },

  "penerimaan-brosur": {
    slug: "penerimaan/brosur",
    title: "Buku Panduan Akademik & Brosur PDF",
    kicker: "UNDUH DOKUMEN RESMI",
    description:
      "Unduh brosur resmi penerimaan, profil kurikulum sarjana hukum, dan panduan biaya pendidikan Fakultas Hukum UPB.",
    breadcrumbs: [
      { label: "Penerimaan", href: "/penerimaan" },
      { label: "Buku Panduan PDF" },
    ],
    parentSectionTitle: "Penerimaan & Biaya",
    siblings: admissionSiblings,
    sections: [
      {
        title: "Dokumen Informasi Publik Fakultas Hukum",
        content: [
          "Buku panduan akademik resmi memuat silabus mata kuliah, profil tenaga pengajar, ketentuan tata tertib perkuliahan, dan panduan laboratorium persidangan.",
        ],
        items: [
          {
            title: "Brosur Penerimaan Mahasiswa Baru 2026/2027",
            description: "Ringkasan informasi program studi, jadwal seleksi, dan biaya angsuran kuliah.",
            badge: "PDF Brosur",
            link: { label: "Hubungi Sekretariat untuk PDF", href: "/kontak" },
          },
          {
            title: "Pedoman Akademik & Kurikulum Sarjana Hukum",
            description: "Dokumen resmi BAAK mengenai sebaran mata kuliah 144 SKS dan pedoman skripsi.",
            badge: "Pedoman Akademik",
            link: { label: "Pelajari Kurikulum", href: "/akademik/kurikulum" },
          },
        ],
      },
    ],
    cta: {
      title: "Butuh Salinan Cetak Brosur?",
      description: "Kunjungi sekretariat admisi di Kampus Utama UPB Cikarang pada jam kerja operasional.",
      buttonText: "Lihat Lokasi Kampus",
      buttonHref: "/kontak",
    },
  },

  "penerimaan-faq": {
    slug: "penerimaan/faq",
    title: "Pertanyaan Umum (FAQ PMB)",
    kicker: "INFORMASI TANYA JAWAB",
    description:
      "Jawaban lengkap atas pertanyaan yang sering diajukan seputar pendaftaran, akreditasi, biaya, dan perkuliahan hukum di UPB.",
    breadcrumbs: [
      { label: "Penerimaan", href: "/penerimaan" },
      { label: "Pertanyaan Umum (FAQ)" },
    ],
    parentSectionTitle: "Penerimaan & Biaya",
    siblings: admissionSiblings,
    sections: [
      {
        title: "Tanya Jawab Terpopuler",
        content: [
          "Berikut adalah rangkuman pertanyaan yang paling sering diajukan oleh calon mahasiswa baru dan orang tua:",
        ],
        items: [
          {
            title: "Apakah ijazah Kelas Karyawan sama dengan Kelas Reguler?",
            description: "Sama persis. Ijazah, gelar (S.H.), dan status akreditasi keduanya sama tanpa ada pembedaan status kelas pada ijazah.",
            badge: "Ijazah & Gelar",
          },
          {
            title: "Apakah lulusan FH UPB bisa mengikuti ujian advokat (PERADI)?",
            description: "Bisa. Lulusan Sarjana Hukum UPB memenuhi seluruh syarat yuridis UU Advokat untuk mengikuti PKPA dan UPA nasional.",
            badge: "Profesi Advokat",
          },
          {
            title: "Apakah benar tidak ada biaya uang gedung?",
            description: "Benar. Fakultas Hukum UPB menerapkan kebijakan bebas uang gedung (Rp 0) untuk seluruh calon mahasiswa baru.",
            badge: "Biaya Kuliah",
          },
          {
            title: "Bagaimana cara pembayaran SPP bulanan?",
            description: "Pembayaran dapat dilakukan melalui virtual account bank mitra resmi universitas yang terbit setiap tanggal 10.",
            badge: "Pembayaran",
          },
        ],
      },
    ],
    cta: {
      title: "Masih Memiliki Pertanyaan Lain?",
      description: "Tim layanan konsultasi PMB kami siap membantu menjawab pertanyaan Anda melalui WhatsApp resmi.",
      buttonText: "Chat Petugas PMB",
      buttonHref: "https://wa.me/6281290008801",
    },
  },

  // ------------------------------------------
  // TENAGA PENGAJAR / DOSEN SUB-PAGES
  // ------------------------------------------
  "dosen-publikasi": {
    slug: "dosen/publikasi",
    title: "Buku Ajar & Monograf Dosen",
    kicker: "PUBLIKASI KARYA ILMIAH",
    description:
      "Koleksi buku teks hukum, monograf riset doktrinal, dan buku ajar yang ditulis oleh para dewan guru besar dan pengajar tetap FH UPB.",
    breadcrumbs: [
      { label: "Tenaga Pengajar", href: "/dosen" },
      { label: "Buku Ajar & Monograf" },
    ],
    parentSectionTitle: "Tenaga Pengajar",
    siblings: facultySiblings,
    sections: [
      {
        title: "Karya Tulis & Monograf Akademik",
        content: [
          "Dewan pengajar Fakultas Hukum Universitas Pelita Bangsa secara berkala menerbitkan buku referensi hukum ber-ISBN yang digunakan dalam perkuliahan sarjana dan menjadi rujukan para yuris praktisi.",
        ],
        // TODO: Masukkan katalog daftar ISBN buku ajar & monograf resmi karya dosen FH UPB setelah data divalidasi bagian LPPM/Fakultas
        emptyState: "Katalog daftar buku ajar dan monograf ber-ISBN karya dosen tetap Fakultas Hukum UPB sedang dalam proses verifikasi data LPPM. Informasi akan segera diperbarui.",
      },
    ],
    cta: {
      title: "Akses Jurnal Ilmiah SINTA",
      description: "Kunjungi portal repositori artikel jurnal bereputasi pengajar kami pada Science and Technology Index (SINTA).",
      buttonText: "Buka Portal SINTA Kemdikbud",
      buttonHref: "https://sinta.kemdikbud.go.id",
      secondaryText: "Kembali ke Direktori Dosen",
      secondaryHref: "/dosen",
    },
  },

  "dosen-keterangan-ahli": {
    slug: "dosen/keterangan-ahli",
    title: "Keterangan Ahli di Pengadilan",
    kicker: "PENGABDIAN YURISPRUDENSI",
    description:
      "Rekam jejak para pakar hukum tata negara dan hukum pidana FH UPB sebagai saksi ahli di persidangan Mahkamah Konstitusi dan pengadilan negeri.",
    breadcrumbs: [
      { label: "Tenaga Pengajar", href: "/dosen" },
      { label: "Keterangan Ahli" },
    ],
    parentSectionTitle: "Tenaga Pengajar",
    siblings: facultySiblings,
    sections: [
      {
        title: "Kiprah Saksi Ahli Persidangan",
        content: [
          "Para Guru Besar dan pengajar senior Fakultas Hukum UPB kerap diundang oleh majelis hakim, penyidik kepolisian, kejaksaan, dan penasihat hukum untuk memberikan keterangan ahli doktrin (expert testimony) dalam perkara-perkara strategis nasional.",
        ],
        // TODO: Masukkan daftar putusan peradilan yang mengutip keterangan saksi ahli dosen FH UPB dari data resmi dekanat
        emptyState: "Dokumentasi risalah persidangan dan daftar perkara yang memuat keterangan ahli pengajar FH UPB sedang dalam proses inventarisasi dekanat. Informasi akan segera diperbarui.",
      },
    ],
    cta: {
      title: "Permohonan Keterangan Ahli Resmi",
      description: "Lembaga peradilan atau kantor hukum yang memerlukan kehadiran saksi ahli pengajar dapat mengajukan surat dinas resmi ke Dekanat.",
      buttonText: "Hubungi Sekretariat Dekanat",
      buttonHref: "/kontak",
    },
  },

  // ------------------------------------------
  // KEHIDUPAN MAHASISWA
  // ------------------------------------------
  "kehidupan-mahasiswa": {
    slug: "kehidupan-mahasiswa",
    title: "Kehidupan Mahasiswa & Ekosistem Kampus",
    kicker: "ORGANISASI & PRESTASI",
    description:
      "Wadah pengembangan kepemimpinan intelektual, kemahiran simulasi sidang peradilan semu, dan kepedulian advokasi sosial kemanusiaan.",
    breadcrumbs: [{ label: "Kehidupan Mahasiswa" }],
    parentSectionTitle: "Kehidupan Mahasiswa",
    siblings: studentLifeSiblings,
    sections: [
      {
        title: "Aktivitas Kemahasiswaan Berwawasan Hukum",
        content: [
          "Kehidupan kampus di Fakultas Hukum UPB dirancang dinamis untuk melatih soft skills, keberanian berargumentasi, serta etika integritas calon yuris.",
        ],
        items: [
          {
            title: "Organisasi Mahasiswa I (Lorem Ipsum)",
            description: "Wadah kegiatan kemahasiswaan dan pengembangan kepemimpinan mahasiswa (Placeholder).",
            badge: "Kemahasiswaan",
            link: { label: "Selengkapnya", href: "/kehidupan-mahasiswa/organisasi-1" },
          },
          {
            title: "Organisasi Mahasiswa II (Lorem Ipsum)",
            description: "Wadah penalaran, kemahiran hukum, dan pengkajian isu-isu keadilan sosial (Placeholder).",
            badge: "Kemahasiswaan",
            link: { label: "Selengkapnya", href: "/kehidupan-mahasiswa/organisasi-2" },
          },
          {
            title: "Organisasi Mahasiswa III (Lorem Ipsum)",
            description: "Wadah aspirasi mahasiswa, jejaring komunitas, dan pengabdian sosial masyarakat (Placeholder).",
            badge: "Kemahasiswaan",
            link: { label: "Selengkapnya", href: "/kehidupan-mahasiswa/organisasi-3" },
          },
          {
            title: "Prestasi & Kejuaraan Mahasiswa",
            description: "Catatan kejuaraan debat hukum, peradilan semu, dan karya tulis ilmiah mahasiswa di tingkat regional maupun nasional.",
            badge: "Prestasi",
            link: { label: "Lihat Prestasi", href: "/kehidupan-mahasiswa/prestasi" },
          },
        ],
      },
    ],
    cta: {
      title: "Kembangkan Potensi Anda di Kampus Merah",
      description: "Jadilah bagian dari generasi yuris muda yang berprestasi dan memberi dampak nyata bagi penegakan keadilan.",
      buttonText: "Daftar Mahasiswa Baru",
      buttonHref: "/penerimaan/daftar",
    },
  },

  "kehidupan-mahasiswa-organisasi-1": {
    slug: "kehidupan-mahasiswa/organisasi-1",
    title: "Organisasi Mahasiswa I (Lorem Ipsum)",
    kicker: "ORGANISASI KEMAHASISWAAN",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    breadcrumbs: [
      { label: "Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
      { label: "Organisasi Mahasiswa I" },
    ],
    parentSectionTitle: "Kehidupan Mahasiswa",
    siblings: studentLifeSiblings,
    sections: [
      {
        title: "Profil & Informasi Organisasi Mahasiswa I",
        content: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        ],
        // TODO: Masukkan data resmi nama organisasi, visi misi, dan kepengurusan setelah SK Dekanat diterbitkan
        emptyState: "Data resmi nama organisasi, visi misi, serta susunan kepengurusan mahasiswa sedang dalam tahap penataan. Informasi definitif akan segera diperbarui.",
      },
    ],
    cta: {
      title: "Jelajahi Kegiatan Kemahasiswaan",
      description: "Ikuti informasi agenda kegiatan dan pengumuman terbaru di lingkungan kampus.",
      buttonText: "Lihat Agenda Kegiatan",
      buttonHref: "/agenda",
    },
  },

  "kehidupan-mahasiswa-organisasi-2": {
    slug: "kehidupan-mahasiswa/organisasi-2",
    title: "Organisasi Mahasiswa II (Lorem Ipsum)",
    kicker: "ORGANISASI KEMAHASISWAAN",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    breadcrumbs: [
      { label: "Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
      { label: "Organisasi Mahasiswa II" },
    ],
    parentSectionTitle: "Kehidupan Mahasiswa",
    siblings: studentLifeSiblings,
    sections: [
      {
        title: "Profil & Informasi Organisasi Mahasiswa II",
        content: [
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        ],
        // TODO: Masukkan data resmi nama organisasi, visi misi, dan kepengurusan setelah SK Dekanat diterbitkan
        emptyState: "Data resmi nama organisasi, visi misi, serta susunan kepengurusan mahasiswa sedang dalam tahap penataan. Informasi definitif akan segera diperbarui.",
      },
    ],
    cta: {
      title: "Jelajahi Kegiatan Kemahasiswaan",
      description: "Ikuti informasi agenda kegiatan dan pengumuman terbaru di lingkungan kampus.",
      buttonText: "Lihat Agenda Kegiatan",
      buttonHref: "/agenda",
    },
  },

  "kehidupan-mahasiswa-organisasi-3": {
    slug: "kehidupan-mahasiswa/organisasi-3",
    title: "Organisasi Mahasiswa III (Lorem Ipsum)",
    kicker: "ORGANISASI KEMAHASISWAAN",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.",
    breadcrumbs: [
      { label: "Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
      { label: "Organisasi Mahasiswa III" },
    ],
    parentSectionTitle: "Kehidupan Mahasiswa",
    siblings: studentLifeSiblings,
    sections: [
      {
        title: "Profil & Informasi Organisasi Mahasiswa III",
        content: [
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
        ],
        // TODO: Masukkan data resmi nama organisasi, visi misi, dan kepengurusan setelah SK Dekanat diterbitkan
        emptyState: "Data resmi nama organisasi, visi misi, serta susunan kepengurusan mahasiswa sedang dalam tahap penataan. Informasi definitif akan segera diperbarui.",
      },
    ],
    cta: {
      title: "Jelajahi Kegiatan Kemahasiswaan",
      description: "Ikuti informasi agenda kegiatan dan pengumuman terbaru di lingkungan kampus.",
      buttonText: "Lihat Agenda Kegiatan",
      buttonHref: "/agenda",
    },
  },

  "kehidupan-mahasiswa-bem": {
    slug: "kehidupan-mahasiswa/bem",
    title: "Organisasi Mahasiswa I (Lorem Ipsum)",
    kicker: "ORGANISASI KEMAHASISWAAN",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    breadcrumbs: [
      { label: "Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
      { label: "Organisasi Mahasiswa" },
    ],
    parentSectionTitle: "Kehidupan Mahasiswa",
    siblings: studentLifeSiblings,
    sections: [
      {
        title: "Informasi Organisasi Mahasiswa",
        content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
        // TODO: Masukkan data resmi organisasi setelah SK Dekanat diterbitkan
        emptyState: "Informasi resmi sedang dalam proses pemutakhiran.",
      },
    ],
    cta: {
      title: "Jelajahi Kegiatan Kemahasiswaan",
      description: "Ikuti informasi kegiatan dan pengumuman terbaru di lingkungan kampus.",
      buttonText: "Lihat Agenda Kegiatan",
      buttonHref: "/agenda",
    },
  },

  "kehidupan-mahasiswa-dpm": {
    slug: "kehidupan-mahasiswa/dpm",
    title: "Organisasi Mahasiswa II (Lorem Ipsum)",
    kicker: "ORGANISASI KEMAHASISWAAN",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    breadcrumbs: [
      { label: "Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
      { label: "Organisasi Mahasiswa" },
    ],
    parentSectionTitle: "Kehidupan Mahasiswa",
    siblings: studentLifeSiblings,
    sections: [
      {
        title: "Informasi Organisasi Mahasiswa",
        content: ["Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
        // TODO: Masukkan data resmi organisasi setelah SK Dekanat diterbitkan
        emptyState: "Informasi resmi sedang dalam proses pemutakhiran.",
      },
    ],
    cta: {
      title: "Jelajahi Kegiatan Kemahasiswaan",
      description: "Ikuti informasi kegiatan dan pengumuman terbaru di lingkungan kampus.",
      buttonText: "Lihat Agenda Kegiatan",
      buttonHref: "/agenda",
    },
  },

  "kehidupan-mahasiswa-moot-court": {
    slug: "kehidupan-mahasiswa/moot-court",
    title: "Organisasi Mahasiswa III (Lorem Ipsum)",
    kicker: "ORGANISASI KEMAHASISWAAN",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    breadcrumbs: [
      { label: "Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
      { label: "Organisasi Mahasiswa" },
    ],
    parentSectionTitle: "Kehidupan Mahasiswa",
    siblings: studentLifeSiblings,
    sections: [
      {
        title: "Informasi Organisasi Mahasiswa",
        content: ["Duis aute irure dolor in reprehenderit in voluptate velit esse cillum."],
        // TODO: Masukkan data resmi organisasi setelah SK Dekanat diterbitkan
        emptyState: "Informasi resmi sedang dalam proses pemutakhiran.",
      },
    ],
    cta: {
      title: "Jelajahi Kegiatan Kemahasiswaan",
      description: "Ikuti informasi kegiatan dan pengumuman terbaru di lingkungan kampus.",
      buttonText: "Lihat Agenda Kegiatan",
      buttonHref: "/agenda",
    },
  },

  "kehidupan-mahasiswa-prestasi": {
    slug: "kehidupan-mahasiswa/prestasi",
    title: "Prestasi & Kejuaraan Mahasiswa",
    kicker: "REKAM JEJAK PRESTASI",
    description:
      "Daftar torehan prestasi membanggakan sivitas akademika mahasiswa hukum UPB pada kompetisi peradilan semu dan karya tulis ilmiah.",
    breadcrumbs: [
      { label: "Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
      { label: "Prestasi & Kejuaraan" },
    ],
    parentSectionTitle: "Kehidupan Mahasiswa",
    siblings: studentLifeSiblings,
    sections: [
      {
        title: "Torehan Juara Kompetisi Nasional",
        content: [
          "Mahasiswa Fakultas Hukum UPB secara konsisten menorehkan prestasi dalam berbagai ajang kompetisi hukum bergengsi tingkat nasional:",
        ],
        items: [
          {
            title: "Juara 1 Kompetisi Peradilan Semu Nasional (NMCC) 2026",
            description: "Delegasi Moot Court Society UPB berhasil meraih Juara 1 Nasional serta predikat Berkas Perkara Terbaik dan Majelis Hakim Terbaik.",
            badge: "Juara 1 Nasional",
          },
          {
            title: "Juara Debat Konstitusi Mahasiswa",
            description: "Penghargaan pembicara terbaik (Best Speaker) dalam kompetisi telaah naskah akademik antar universitas.",
            badge: "Debat Hukum",
          },
        ],
      },
    ],
    cta: {
      title: "Ingin Mengukir Prestasi Bersama Kami?",
      description: "Dapatkan bimbingan intensif dari para dosen pakar dan praktisi peradilan terkemuka.",
      buttonText: "Daftar Mahasiswa Baru",
      buttonHref: "/penerimaan/daftar",
    },
  },

  "kehidupan-mahasiswa-advokasi": {
    slug: "kehidupan-mahasiswa/advokasi",
    title: "Advokasi & Aksi Sosial Keadilan",
    kicker: "PENGABDIAN SOSIAL HUKUM",
    description:
      "Program pengabdian masyarakat, penyuluhan kesadaran hukum bagi warga, serta advokasi perlindungan hak-hak buruh industri.",
    breadcrumbs: [
      { label: "Kehidupan Mahasiswa", href: "/kehidupan-mahasiswa" },
      { label: "Advokasi & Aksi Sosial" },
    ],
    parentSectionTitle: "Kehidupan Mahasiswa",
    siblings: studentLifeSiblings,
    sections: [
      {
        title: "Kiprah Nyata bagi Masyarakat Sekitar",
        content: [
          "Mahasiswa Fakultas Hukum UPB tidak hanya belajar teori di ruang kuliah, tetapi terjun langsung mendampingi masyarakat pencari keadilan melalui program Klinik Bantuan Hukum dan penyuluhan regulasi desa di wilayah Cikarang-Bekasi.",
        ],
        // TODO: Lengkapi dokumentasi laporan kegiatan pengabdian masyarakat semester terbaru
        emptyState: "Dokumentasi agenda penyuluhan kesadaran hukum masyarakat semester berjalan sedang dalam tahap perapihan arsip dekanat. Informasi akan segera diperbarui.",
      },
    ],
    cta: {
      title: "Layanan Klinik Bantuan Hukum Mahasiswa",
      description: "Pelajari bagaimana mahasiswa dan advokat senior UPB melayani konsultasi hukum cuma-cuma bagi warga.",
      buttonText: "Buka Klinik Bantuan Hukum",
      buttonHref: "/pusat-studi/klinik-bantuan-hukum",
    },
  },

  // ------------------------------------------
  // PUSAT STUDI & LAB
  // ------------------------------------------
  "pusat-studi": {
    slug: "pusat-studi",
    title: "Pusat Kajian Hukum, Laboratorium & KBH",
    kicker: "RISET & PENGABDIAN",
    description:
      "Pusat keunggulan penelitian hukum, simulasi sidang peradilan berstandar Mahkamah Agung, serta layanan advokasi cuma-cuma bagi masyarakat.",
    breadcrumbs: [{ label: "Pusat Studi" }],
    parentSectionTitle: "Pusat Studi & Lab",
    siblings: centersSiblings,
    sections: [
      {
        title: "Infrastruktur Riset & Kemahiran Beracara",
        content: [
          "Fakultas Hukum Universitas Pelita Bangsa mengintegrasikan riset doktrinal dengan pemecahan persoalan nyata melalui laboratorium peradilan semu dan klinik bantuan hukum terpadu.",
        ],
        items: [
          {
            title: "Laboratorium Peradilan Semu (Moot Court)",
            subtitle: "Gedung B Lantai 3 Kampus Utama",
            description: "Tata ruang sidang otentik berstandar Mahkamah Agung RI untuk persidangan perkara pidana, perdata, dan PTUN.",
            badge: "Laboratorium",
            link: { label: "Detail Laboratorium", href: "/pusat-studi/laboratorium-peradilan-semu" },
          },
          {
            title: "Klinik Bantuan Hukum (KBH) UPB",
            subtitle: "Pengabdian & Bantuan Hukum Cuma-Cuma",
            description: "Layanan advokasi dan konsultasi hukum cuma-cuma bagi masyarakat pencari keadilan di bawah supervisi advokat senior.",
            badge: "Layanan Publik",
            link: { label: "Detail Klinik Hukum", href: "/pusat-studi/klinik-bantuan-hukum" },
          },
          {
            title: "Pelita Law Review (Jurnal Ilmiah SINTA)",
            subtitle: "Portal Pengelolaan Jurnal Hukum",
            description: "Penerbitan artikel hasil penelitian hukum, analisis putusan peradilan, dan gagasan regulasi kontemporer.",
            badge: "Jurnal SINTA",
            link: { label: "Akses Jurnal OJS", href: "https://journal.pelitabangsa.ac.id" },
          },
        ],
      },
    ],
    cta: {
      title: "Konsultasikan Perkara di Klinik Bantuan Hukum",
      description: "Masyarakat umum yang membutuhkan konsultasi hukum dapat menghubungi sekretariat KBH UPB.",
      buttonText: "Hubungi Sekretariat KBH",
      buttonHref: "/pusat-studi/klinik-bantuan-hukum",
    },
  },

  "pusat-studi-laboratorium": {
    slug: "pusat-studi/laboratorium-peradilan-semu",
    title: "Laboratorium Peradilan Semu (Moot Court)",
    kicker: "STANDAR MAHKAMAH AGUNG",
    description:
      "Fasilitas laboratorium peradilan otentik untuk melatih kemahiran sidang calon hakim, jaksa, dan advokat profesional.",
    breadcrumbs: [
      { label: "Pusat Studi", href: "/pusat-studi" },
      { label: "Laboratorium Peradilan Semu" },
    ],
    parentSectionTitle: "Pusat Studi & Lab",
    siblings: centersSiblings,
    sections: [
      {
        title: "Spesifikasi Ruang Sidang Moot Court",
        content: [
          "Laboratorium Peradilan Semu FH UPB didesain dengan tata ruang dan perangkat persidangan yang disesuaikan penuh dengan KUHAP dan regulasi Mahkamah Agung RI.",
          "Fasilitas ini mencakup podium majelis hakim berukir lambang negara, meja panitera, bangku penuntut umum dan penasihat hukum terpisah, area saksi dan terdakwa, serta sistem pencatatan audio visual persidangan.",
        ],
        items: [
          {
            title: "Simulasi Berkas Perkara Riil",
            description: "Digunakan untuk praktikum wajib mata kuliah kemahiran hukum acara pidana, perdata, niaga, dan peradilan tata usaha negara.",
            badge: "Kurikulum",
          },
          {
            title: "E-Court Simulator",
            description: "Integrasi sistem administrasi perkara elektronik (e-filing gugatan, e-summons pemanggilan, dan e-litigation pembuktian digital).",
            badge: "Teknologi",
          },
          {
            title: "Pemusatan Latihan NMCC",
            description: "Tempat pemusatan latihan intensif delegasi mahasiswa dalam kompetisi peradilan semu tingkat nasional.",
            badge: "Prestasi",
          },
        ],
      },
    ],
    cta: {
      title: "Jadwalkan Kunjungan ke Laboratorium Sidang",
      description: "Hubungi sekretariat dekanat untuk penjadwalan observasi fasilitas kampus bagi calon mahasiswa.",
      buttonText: "Hubungi Sekretariat",
      buttonHref: "/kontak",
    },
  },

  "pusat-studi-kbh": {
    slug: "pusat-studi/klinik-bantuan-hukum",
    title: "Klinik Bantuan Hukum (KBH UPB)",
    kicker: "LAYANAN PENGABDIAN MASYARAKAT",
    description:
      "Unit advokasi yang menyediakan konsultasi hukum dan pendampingan pro bono bagi masyarakat kurang mampu dengan supervisi advokat dekanat.",
    breadcrumbs: [
      { label: "Pusat Studi", href: "/pusat-studi" },
      { label: "Klinik Bantuan Hukum" },
    ],
    parentSectionTitle: "Pusat Studi & Lab",
    siblings: centersSiblings,
    sections: [
      {
        title: "Bantuan Hukum Bagi Keadilan Sosial",
        content: [
          "Klinik Bantuan Hukum (KBH) Fakultas Hukum UPB beroperasi sebagai wujud nyata Tri Dharma Perguruan Tinggi di bidang pengabdian kepada masyarakat.",
          "Masyarakat dapat berkonsultasi mengenai persoalan sengketa pertanahan, hukum ketenagakerjaan kawasan industri, persoalan waris keperdataan, hingga perlindungan konsumen.",
        ],
        items: [
          {
            title: "Konsultasi Hukum Cuma-Cuma (Pro Bono)",
            description: "Pemeriksaan berkas perkara dan pemberian pendapat hukum (legal opinion) bagi masyarakat yang membutuhkan.",
            badge: "Layanan Cuma-Cuma",
          },
          {
            title: "Praktik Kemahiran Lapangan Mahasiswa",
            description: "Melatih mahasiswa tingkat akhir menyusun draf somasi, mediasi, dan pemahaman empati terhadap persoalan masyarakat.",
            badge: "Pendidikan Klinis",
          },
        ],
      },
    ],
    cta: {
      title: "Butuh Konsultasi Hukum?",
      description: "Kunjungi kantor KBH di Kampus UPB Cikarang pada hari kerja atau hubungi kontak layanan resmi.",
      buttonText: "Hubungi Layanan KBH",
      buttonHref: "/kontak",
    },
  },

  // ------------------------------------------
  // TENTANG FAKULTAS, FASILITAS & KONTAK
  // ------------------------------------------
  tentang: {
    slug: "tentang",
    title: "Tentang Fakultas Hukum Universitas Pelita Bangsa",
    kicker: "PROFIL & IDENTITAS INSTITUSI",
    description:
      "Visi keilmuan, sejarah dedikasi pendirian, dan amanat Dekan dalam mencetak yuris unggul yang berakhlak mulia.",
    breadcrumbs: [{ label: "Tentang" }],
    parentSectionTitle: "Tentang Fakultas",
    siblings: aboutSiblings,
    sections: [
      {
        title: "Amanat Dekan Fakultas Hukum",
        content: [
          "Hukum bukanlah sekadar kompilasi aturan formal yang dingin, melainkan instrumen moral tertinggi yang menjaga martabat kemanusiaan, menjamin kepastian berusaha, dan mewujudkan keadilan substantif bagi seluruh elemen bangsa.",
          "Fakultas Hukum UPB berdiri di jantung koridor industri terbesar Asia Tenggara dengan komitmen mendidik para calon yuris yang tidak hanya cerdas mengurai teks perundang-undangan, melainkan teguh memegang sumpah profesi dan integritas moral.",
        ],
        callout: {
          title: "Prof. Dr. Lorem Ipsum, S.H., LL.M.",
          text: "Dekan Fakultas Hukum Universitas Pelita Bangsa",
        },
      },
      {
        title: "Visi & Misi Fakultas Hukum",
        content: [
          "Menjadi pusat pendidikan tinggi hukum terkemuka di tingkat nasional yang unggul dalam penguasaan hukum bisnis industri dan kemahiran peradilan yang berintegritas pada tahun 2030.",
        ],
        items: [
          {
            title: "Pendidikan Berstandar Tinggi",
            description: "Menyelenggarakan kurikulum ilmu hukum yang adaptif terhadap dinamika transformasi hukum digital dan industri.",
            badge: "Misi 1",
          },
          {
            title: "Riset Yuridis Berdampak",
            description: "Menghasilkan publikasi ilmiah dan analisis putusan yang berkontribusi nyata bagi pembaruan hukum nasional.",
            badge: "Misi 2",
          },
          {
            title: "Pengabdian Bantuan Hukum",
            description: "Memberikan pendampingan hukum cuma-cuma bagi masyarakat demi mewujudkan akses keadilan yang merata.",
            badge: "Misi 3",
          },
        ],
      },
    ],
    cta: {
      title: "Jelajahi Profil Lengkap Kami",
      description: "Kenali dewan pengajar, fasilitas kampus terpadu, dan ikatan alumni Fakultas Hukum UPB.",
      buttonText: "Lihat Direktori Pengajar",
      buttonHref: "/dosen",
      secondaryText: "Hubungi Dekanat",
      secondaryHref: "/kontak",
    },
  },

  "tentang-senat-akademik": {
    slug: "tentang/senat-akademik",
    title: "Senat Akademik Fakultas Hukum",
    kicker: "TATA KELOLA AKADEMIK TERTINGGI",
    description:
      "Badan normatif tertinggi di tingkat fakultas dalam penetapan kebijakan akademik, pengawasan mutu, dan integritas etika keilmuan.",
    breadcrumbs: [
      { label: "Tentang", href: "/tentang" },
      { label: "Senat Akademik" },
    ],
    parentSectionTitle: "Tentang Fakultas",
    siblings: aboutSiblings,
    sections: [
      {
        title: "Peran Normatif Senat Akademik",
        content: [
          "Senat Akademik Fakultas Hukum UPB bertugas merumuskan kebijakan normatif perkuliahan, memberikan pertimbangan pengusulan jabatan fungsional Lektor Kepala dan Guru Besar, serta menegakkan etika kebebasan mimbar akademik.",
        ],
        // TODO: Masukkan daftar lengkap anggota Senat Akademik Fakultas Hukum UPB periode aktif sesuai SK Rektor
        emptyState: "Daftar susunan dewan Guru Besar dan anggota Senat Akademik periode berjalan sedang dalam proses sinkronisasi SK Senat Universitas. Informasi akan segera diperbarui.",
      },
    ],
    cta: {
      title: "Kebijakan Akademik & Kurikulum",
      description: "Pelajari dokumen kurikulum dan pedoman akademik yang telah disahkan oleh Senat Fakultas.",
      buttonText: "Lihat Kurikulum",
      buttonHref: "/akademik/kurikulum",
    },
  },

  "tentang-alumni": {
    slug: "tentang/alumni",
    title: "Profil Lulusan & Ikatan Keluarga Alumni (IKA FH)",
    kicker: "JEJARING PROFESIONAL HUKUM",
    description:
      "Rekam jejak para lulusan Fakultas Hukum UPB di lembaga peradilan, kejaksaan, firma hukum papan atas, dan korporasi industri.",
    breadcrumbs: [
      { label: "Tentang", href: "/tentang" },
      { label: "Profil Alumni" },
    ],
    parentSectionTitle: "Tentang Fakultas",
    siblings: aboutSiblings,
    sections: [
      {
        title: "Kiprah Lulusan di Panggung Hukum Nasional",
        content: [
          "Alumni Fakultas Hukum UPB telah berkarir di berbagai sektor penegakan hukum dan manajemen komersial strategis:",
        ],
        items: [
          {
            title: "Lembaga Peradilan & Penegak Hukum",
            description: "Hakim Pengadilan Negeri & Agama, Jaksa Penuntut Umum Kejaksaan RI, dan Panitera Pengganti.",
            badge: "Yudisial",
          },
          {
            title: "Firma Hukum & Praktik Advokat",
            description: "Partner dan Senior Associate di kantor hukum komersial, arbiter, serta konsultan hak kekayaan intelektual.",
            badge: "Advokat",
          },
          {
            title: "Perbankan & Korporasi Multinasional",
            description: "Legal Specialist, Compliance Director, dan Contract Manager di BUMN dan perusahaan manufaktur Cikarang.",
            badge: "Korporasi",
          },
          {
            title: "Lembaga Negara & Kementerian",
            description: "Analis hukum di Kementerian Hukum & HAM, Mahkamah Konstitusi, Komisi Kejaksaan, dan OJK.",
            badge: "Pemerintahan",
          },
        ],
      },
      {
        title: "Testimoni Alumni",
        content: [
          "Fondasi keilmuan yuridis yang ketat dan pelatihan simulasi sidang di FH UPB memberi saya keunggulan kompetitif dalam menangani transaksi merger korporasi lintas yurisdiksi. Dosen-dosen di UPB tidak hanya mengajarkan hukum sebagai teori, melainkan melatih nalar kritis yang dibutuhkan di panggung profesional internasional.",
        ],
        callout: {
          title: "Lorem Ipsum, S.H., LL.M.",
          text: "Senior Corporate Associate di Top-Tier Law Firm, Alumnus FH UPB",
        },
      },
    ],
    cta: {
      title: "Tracer Study Alumni",
      description: "Bagi para alumni FH UPB, silakan mengisi kuesioner pelacakan karir resmi BAAK.",
      buttonText: "Buka Tracer Study",
      buttonHref: "https://tracerstudy.pelitabangsa.ac.id",
      secondaryText: "Hubungi Sekretariat Alumni",
      secondaryHref: "/kontak",
    },
  },

  "tentang-fasilitas": {
    slug: "tentang/fasilitas",
    title: "Fasilitas Kampus & Sarana Penunjang",
    kicker: "INFRASTRUKTUR PENDIDIKAN",
    description:
      "Sarana perkuliahan modern, laboratorium peradilan semu, perpustakaan hukum digital, auditorium, dan studio klinis terpadu.",
    breadcrumbs: [
      { label: "Tentang", href: "/tentang" },
      { label: "Fasilitas Kampus" },
    ],
    parentSectionTitle: "Tentang Fakultas",
    siblings: aboutSiblings,
    sections: [
      {
        title: "Infrastruktur Pembelajaran Berstandar Tinggi",
        content: [
          "Fakultas Hukum UPB berlokasi strategis di Jl. Inspeksi Kalimalang, Cikarang Pusat, terintegrasi dengan denyut perekonomian kawasan industri koridor timur Jakarta.",
        ],
        items: [
          {
            title: "Ruang Sidang Utama Moot Court",
            subtitle: "Gedung B Lantai 3",
            description: "Tata ruang majelis hakim otentik berstandar Mahkamah Agung untuk persidangan pidana, perdata, dan PTUN.",
            badge: "Sidang Semu",
            link: { label: "Detail Laboratorium Sidang", href: "/pusat-studi/laboratorium-peradilan-semu" },
          },
          {
            title: "Perpustakaan Hukum Terpadu",
            subtitle: "Koleksi Literatur & Repositori Putusan",
            description: "Ribuan himpunan lembaran negara, putusan Mahkamah Agung, dan basis data jurnal hukum internasional.",
            badge: "E-Library",
            link: { label: "Detail Perpustakaan", href: "/tentang/fasilitas/perpustakaan-hukum" },
          },
          {
            title: "Auditorium & Ruang Diskusi Ilmiah",
            subtitle: "Kapasitas 500 Peserta",
            description: "Fasilitas seminar nasional, kuliah pakar guru besar, simposium hukum, dan stadium generale.",
            badge: "Auditorium",
            link: { label: "Detail Auditorium", href: "/tentang/fasilitas/auditorium" },
          },
          {
            title: "Klinik Advokasi & Mediasi KBH",
            subtitle: "Ruang Konsultasi Klien",
            description: "Fasilitas konsultasi langsung bagi masyarakat pencari keadilan dengan pengawasan advokat senior.",
            badge: "Klinik Hukum",
            link: { label: "Detail Klinik Bantuan Hukum", href: "/pusat-studi/klinik-bantuan-hukum" },
          },
        ],
      },
    ],
    cta: {
      title: "Kunjungi Kampus Kami",
      description: "Sekretariat Dekanat menyambut hangat kunjungan studi para calon mahasiswa dan mitra institusi.",
      buttonText: "Lihat Kontak & Lokasi",
      buttonHref: "/kontak",
    },
  },

  kontak: {
    slug: "kontak",
    title: "Kontak & Sekretariat Dekanat",
    kicker: "LAYANAN INFORMASI RESMI",
    description:
      "Hubungi sekretariat Dekanat Fakultas Hukum Universitas Pelita Bangsa untuk layanan akademik, kemitraan riset, dan konsultasi pendaftaran.",
    breadcrumbs: [{ label: "Kontak" }],
    parentSectionTitle: "Tentang Fakultas",
    siblings: aboutSiblings,
    sections: [
      {
        title: "Alamat & Layanan Komunikasi Resmi",
        content: [
          "Fakultas Hukum Universitas Pelita Bangsa berlokasi di Kampus Utama UPB, melayani civitas akademika, calon mahasiswa, dan masyarakat umum setiap hari kerja.",
        ],
        items: [
          {
            title: "Alamat Kampus Dekanat",
            subtitle: "Gedung B Lantai 2, Kampus Utama UPB",
            description: "Jl. Inspeksi Kalimalang, Tegal Danas, Cikarang Pusat, Kabupaten Bekasi, Jawa Barat 17530",
            badge: "Alamat Fisik",
          },
          {
            title: "Jam Operasional Sekretariat",
            subtitle: "Senin s.d. Sabtu",
            description: "Pukul 08.00 - 17.00 WIB (Layanan Kelas Karyawan buka hingga pukul 20.00 WIB)",
            badge: "Jam Kerja",
          },
          {
            title: "Layanan Email Resmi",
            subtitle: "Korespondensi Administrasi",
            description: "hukum@pelitabangsa.ac.id",
            badge: "Email",
          },
          {
            title: "WhatsApp Konsultasi Dekanat",
            subtitle: "Layanan Cepat Tanggap",
            description: "+62 812-9000-8801 (Admisi & Informasi Akademik)",
            badge: "WhatsApp",
            link: { label: "Kirim Pesan WhatsApp", href: "https://wa.me/6281290008801" },
          },
        ],
      },
    ],
    cta: {
      title: "Pendaftaran Mahasiswa Baru Dibuka",
      description: "Dapatkan bimbingan pendaftaran langsung dari staf admisi resmi Fakultas Hukum UPB.",
      buttonText: "Buka Pendaftaran PMB",
      buttonHref: "/penerimaan/daftar",
      secondaryText: "Lihat Program Sarjana",
      secondaryHref: "/akademik/program-sarjana-hukum",
    },
  },
};

// ==========================================
// DYNAMIC PEMINATAN SUBSETS (/akademik/peminatan/[slug])
// ==========================================
export interface PeminatanDetail {
  slug: string;
  title: string;
  subtitle: string;
  kicker: string;
  description: string;
  subjects: string[];
  careers: string;
}

export const peminatanDetails: Record<string, PeminatanDetail> = {
  "hukum-pidana": {
    slug: "hukum-pidana",
    title: "Hukum Pidana & Peradilan Pidana",
    subtitle: "Litigasi Perkara Pidana, Kejahatan Siber & Forensik Digital",
    kicker: "KONSENTRASI AKADEMIK",
    description:
      "Mendalami teori pemidanaan kontemporer, peradilan pidana khusus (korupsi, siber, korporasi), teknik investigasi forensik, serta implementasi keadilan restoratif.",
    subjects: [
      "Hukum Pidana Korporasi & White-Collar Crime",
      "Hukum Pembuktian & Forensik Dokumen Digital",
      "Sistem Peradilan Pidana Terpadu & Restorative Justice",
      "Tindak Pidana Khusus: Tipikor, Narkotika & Pencucian Uang",
    ],
    careers: "Jaksa Penuntut Umum, Hakim Pidana, Advokat Litigasi Khusus, Peneliti Komisi Yudisial.",
  },
  "hukum-perdata-bisnis": {
    slug: "hukum-perdata-bisnis",
    title: "Hukum Perdata, Bisnis & Transaksi Digital",
    subtitle: "Tata Kelola Korporasi, Kontrak Komersial & Hak Cipta",
    kicker: "KONSENTRASI AKADEMIK",
    description:
      "Fokus pada struktur transaksi komersial industri manufaktur koridor Cikarang-Bekasi, perancangan kontrak bisnis internasional, kepatuhan korporasi, dan perlindungan data fintech.",
    subjects: [
      "Perancangan Kontrak Komersial & Negosiasi Bisnis (Legal Drafting)",
      "Hukum Kepailitan, PKPU & Restrukturisasi Keuangan",
      "Penyelesaian Sengketa Arbitrase Komersial (BANI & SIAC)",
      "Hak Cipta, Paten, Merek & Perlindungan Data Pribadi",
    ],
    careers: "Corporate Legal Counsel, Konsultan Pasar Modal, Notaris/PPAT, In-House Counsel BUMN.",
  },
  "hukum-tata-negara": {
    slug: "hukum-tata-negara",
    title: "Hukum Tata Negara & Kebijakan Publik",
    subtitle: "Kajian Konstitusi, Pengawasan Regulasi & Reformasi Birokrasi",
    kicker: "KONSENTRASI AKADEMIK",
    description:
      "Menelaah doktrin pemisahan kekuasaan, peradilan konstitusi, hukum administrasi publik di kawasan industri, serta teknik perancangan peraturan perundang-undangan (legal drafting).",
    subjects: [
      "Hukum Acara Mahkamah Konstitusi & Uji Materiil",
      "Hukum Keuangan Negara & Pengadaan Barang/Jasa (PBJ)",
      "Perancangan Naskah Akademik & Legislative Drafting",
      "Hukum Tata Kelola Daerah & Otonomi Publik",
    ],
    careers: "Analis Kebijakan Publik, Tenaga Ahli DPR/DPRD, Auditor Hukum Lembaga Negara, Hakim PTUN.",
  },
  "hukum-internasional": {
    slug: "hukum-internasional",
    title: "Hukum Internasional & Transnasional",
    subtitle: "Perdagangan Global, Yurisdiksi Lintas Batas & Arbitrase Dagang",
    kicker: "KONSENTRASI AKADEMIK",
    description:
      "Mengkaji regulasi perdagangan multilateral, perlindungan investasi asing, hukum humaniter internasional, dan arbitrase sengketa komersial internasional.",
    subjects: [
      "Hukum Perdagangan Dunia (WTO) & Regulasi Investasi Asing",
      "Hukum Humaniter Internasional & Hak Asasi Manusia",
      "Penyelesaian Sengketa Maritim & Hukum Laut Internasional (UNCLOS)",
      "Hukum Perjanjian Diplomatik & Konsuler",
    ],
    careers: "Diplomat Kementerian Luar Negeri, Legal Specialist Lembaga Multilateral, Arbiter Internasional.",
  },
};

// ==========================================
// DYNAMIC FASILITAS SUBSETS (/tentang/fasilitas/[slug])
// ==========================================
export interface FasilitasDetail {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  location: string;
}

export const fasilitasDetails: Record<string, FasilitasDetail> = {
  "perpustakaan-hukum": {
    slug: "perpustakaan-hukum",
    title: "Pusat Dokumentasi & Perpustakaan Hukum",
    kicker: "SUMBER LITERATUR HUKUM",
    description:
      "Pusat dokumentasi literatur hukum terpadu dengan ribuan judul buku teks hukum, himpunan yurisprudensi Mahkamah Agung, Staatsblad, dan akses jurnal internasional bereputasi.",
    features: [
      "Akses katalog daring perpustakaan digital terintegrasi (perpustakaan.pelitabangsa.ac.id)",
      "Ruang baca hening dan bilik riset mandiri untuk penulisan skripsi sarjana",
      "Koleksi salinan putusan Mahkamah Konstitusi dan jurnal SINTA terakreditasi",
      "Layanan bimbingan penelusuran bahan hukum primer dan sekunder",
    ],
    location: "Gedung Perpustakaan Pusat UPB Lantai 2",
  },
  auditorium: {
    slug: "auditorium",
    title: "Auditorium & Ruang Diskusi Ilmiah",
    kicker: "SARANA SEMINAR & SIMPOSIUM",
    description:
      "Ruang pertemuan akademik berkapasitas 500 kursi yang dilengkapi tata suara profesional dan fasilitas siaran multimedia untuk kuliah umum pakar dan seminar nasional.",
    features: [
      "Kapasitas amfiteater hingga 500 peserta dengan kursi bertingkat",
      "Sistem tata suara akustik dan proyektor layar ganda berdefinisi tinggi",
      "Fasilitas live-streaming kuliah umum pakar hukum tamu luar negeri",
      "Ruang transit narasumber dan ruang diskusi panel terbatas",
    ],
    location: "Gedung Utama UPB Lantai 3",
  },
};
