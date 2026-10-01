export interface PostItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  coverImage?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  eventDate: string;
  time: string;
  location: string;
  speaker: string;
  speakerRole: string;
  badge: string;
  status: "DRAFT" | "PUBLISHED";
}

export interface FacultyItem {
  id: number;
  name: string;
  titles: string;
  nip: string;
  specialization: string;
  bioQuote: string;
  profileImage: string;
  researchLink?: string;
  displayOrder: number;
  isActive: boolean;
}

export const initialPosts: PostItem[] = [
  {
    id: 1,
    title: "Fakultas Hukum UPB Sambut Mahasiswa Baru, Tekankan Integritas dan Kemahiran Litigasi Ruang Sidang",
    slug: "fh-upb-sambut-mahasiswa-baru-integritas-litigasi",
    excerpt: "Dekan dan Dewan Guru Besar menyampaikan amanat akademik bagi mahasiswa baru untuk senantiasa menjunjung tinggi nalar kritis, kepekaan sosial, serta keberanian memperjuangkan keadilan hukum.",
    content: `
      <p class="lead">Dalam Sidang Terbuka Senat Akademik Penyambutan Mahasiswa Baru Tahun Akademik 2026/2027, Fakultas Hukum Universitas Pelita Bangsa menegaskan komitmennya mencetak yuris unggul yang tidak hanya mahir secara teknis doktrinal, tetapi juga memiliki integritas moral tanpa kompromi.</p>
      <p>Dekan Fakultas Hukum menyampaikan bahwa dunia hukum di era modern membutuhkan advokat, hakim, dan konsultan hukum yang adaptif terhadap kecerdasan buatan dan dinamika industri tanpa melupakan akar keadilan bagi masyarakat kecil.</p>
      <blockquote>"Keahlian hukum tanpa hati nurani adalah ancaman bagi kemanusiaan. Di ruang kuliah dan peradilan semu ini, kita menempa integritas sebelum menyandang toga keadilan."</blockquote>
    `,
    category: "Warta Akademik",
    author: "Biro Komunikasi & Senat FH",
    authorRole: "Sekretariat Fakultas Hukum",
    publishedAt: "24 September 2026",
    readTime: "4 menit baca",
    coverImage: "/images/news-welcome.jpg",
    status: "PUBLISHED",
  },
  {
    id: 2,
    title: "Prof. Dr. Dolor Sit Amet Raih Penghargaan Dewan Kehormatan Pengajar Hukum",
    slug: "prof-dolor-sit-amet-raih-penghargaan-kehormatan",
    excerpt: "Dedikasi riset doktrin hukum perikatan komersial dan perlindungan konsumen di kawasan industri diganjar apresiasi prestisius nasional.",
    content: `
      <p>Prof. Dr. Dolor Sit Amet, S.H., M.H. dianugerahi penghargaan pengabdian akademik seumur hidup oleh Asosiasi Pengajar Hukum atas kontribusi pemikirannya dalam perumusan naskah akademik pembaharuan hukum perdata Indonesia.</p>
    `,
    category: "Penghargaan Guru Besar",
    author: "Dewan Kehormatan Asosiasi",
    authorRole: "Lembaga Akreditasi Hukum",
    publishedAt: "22 September 2026",
    readTime: "3 menit baca",
    coverImage: "/images/prof-amaliah.jpg",
    status: "PUBLISHED",
  },
  {
    id: 3,
    title: "Kajian Riset Hukum: Kesiapan Regulasi AI & Perlindungan Data Pribadi Transaksi Bisnis Digital",
    slug: "rekonstruksi-hukum-bisnis-digital-dan-ai",
    excerpt: "Kolaborasi Fakultas Hukum UPB dengan konsorsium hukum Asia Pasifik membedah yurisdiksi smart contract dan tanggung jawab keperdataan otomasi cerdas.",
    content: `
      <p>Perkembangan pesat otomasi kecerdasan buatan memicu disrupsi fundamental terhadap doktrin perjanjian klasik dalam KUHPerdata. Fakultas Hukum UPB menginisiasi rekomendasi kebijakan bagi pembaharuan hukum siber dan transaksi digital nasional.</p>
    `,
    category: "Hukum Bisnis & Teknologi",
    author: "Pusat Studi Hukum Bisnis",
    authorRole: "Tim Riset Regulasi Digital",
    publishedAt: "19 September 2026",
    readTime: "5 menit baca",
    coverImage: "/images/study-business.jpg",
    status: "PUBLISHED",
  },
  {
    id: 4,
    title: "Pusat Studi Hukum Tata Negara Rilis Analisis Putusan Mahkamah Konstitusi & Pengawasan Pemilu",
    slug: "analisis-putusan-mahkamah-konstitusi-menjaga-imparsialitas",
    excerpt: "Kajian mendalam terhadap doktrin pemisahan kekuasaan dan pertimbangan yuridis hakim konstitusi dalam menjaga marwah peradilan tata negara.",
    content: `
      <p>Mahkamah Konstitusi menempati garda terdepan sebagai guardian of constitution. Putusan terbaru menunjukkan tantangan luar biasa dalam menyeimbangkan kepastian hukum formil dengan keadilan substantif.</p>
    `,
    category: "Yurisprudensi & Konstitusi",
    author: "Prof. Dr. Lorem Ipsum, S.H., LL.M.",
    authorRole: "Guru Besar Hukum Tata Negara",
    publishedAt: "15 September 2026",
    readTime: "6 menit baca",
    coverImage: "/images/study-constitutional.jpg",
    status: "PUBLISHED",
  },
  {
    id: 5,
    title: "Delegasi Moot Court Society FH UPB Raih Trofi Berkas Terbaik pada NMCC Tingkat Nasional 2026",
    slug: "fh-upb-raih-juara-1-kompetisi-peradilan-semu-nasional-2026",
    excerpt: "Mahasiswa membuktikan keunggulan analisis dakwaan, pledoi, dan silang pemeriksaan saksi di hadapan dewan juri Hakim Agung.",
    content: `
      <p>Delegasi Moot Court Society Fakultas Hukum UPB menorehkan prestasi membanggakan dengan meraih penghargaan Berkas Kasus Posisi Terbaik pada kejuaraan peradilan semu tingkat nasional 2026.</p>
    `,
    category: "Prestasi Mahasiswa",
    author: "Tim Redaksi Civitas FH",
    authorRole: "Biro Komunikasi & Publikasi",
    publishedAt: "10 September 2026",
    readTime: "4 menit baca",
    coverImage: "/images/moot-court.jpg",
    status: "PUBLISHED",
  },
];

export const initialEvents: EventItem[] = [
  {
    id: 1,
    title: "Kuliah Pakar: Penegakan Hukum Lingkungan & Arbitrase Internasional",
    slug: "kuliah-pakar-penegakan-hukum-lingkungan-arbitrase",
    description: "Kajian komparatif penanganan sengketa emisi karbon dan gugatan perdata lingkungan lintas batas melalui lembaga arbitrase SIAC dan BANI.",
    eventDate: "12 Oktober 2026",
    time: "09.00 - 12.30 WIB",
    location: "Auditorium R. Soepomo & Live Zoom Streaming",
    speaker: "Prof. Dr. Lorem Ipsum, S.H., LL.M. & Hakim Agung Mahkamah Agung RI",
    speakerRole: "Guru Besar Hukum Internasional & Pejabat Yudisial",
    badge: "Kuliah Pakar",
    status: "PUBLISHED",
  },
  {
    id: 2,
    title: "Workshop Kemahiran Litigasi & Penyusunan Kontrak Bisnis (Legal Drafting)",
    slug: "workshop-kemahiran-litigasi-legal-drafting",
    description: "Pelatihan intensif penyusunan klausul mitigasi risiko komersial, shareholder agreement, serta teknik pembuktian dokumen elektronik dalam persidangan perdata.",
    eventDate: "28 Oktober 2026",
    time: "13.00 - 17.00 WIB",
    location: "Laboratorium Hukum & Ruang Sidang Semu Lt. 3",
    speaker: "Lorem Ipsum, S.H., LL.M. & Managing Partners Law Firm",
    speakerRole: "Senior Corporate Counsel & Alumni Berprestasi",
    badge: "Praktik Hukum",
    status: "PUBLISHED",
  },
  {
    id: 3,
    title: "Seminar Nasional: Reformasi Hukum Acara Pidana Menuju Keadilan Restoratif",
    slug: "seminar-nasional-reformasi-kuhap-keadilan-restoratif",
    description: "Diskusi mendalam prospek pengesahan RUU KUHAP baru, penguatan hak tersangka, dan integrasi plea bargaining dalam peradilan pidana Indonesia modern.",
    eventDate: "14 November 2026",
    time: "08.30 - 15.00 WIB",
    location: "Grand Ballroom Kampus Utama UPB Cikarang",
    speaker: "Komisioner Komisi Kejaksaan RI & Pakar Kriminologi UI",
    speakerRole: "Akademisi & Pengawas Penegak Hukum",
    badge: "Seminar Nasional",
    status: "PUBLISHED",
  },
  {
    id: 4,
    title: "Bedah Buku: Teori Keadilan Transisional & Perlindungan Korban Kejahatan Korporasi",
    slug: "bedah-buku-keadilan-transisional-kejahatan-korporasi",
    description: "Membedah karya monograf terbaru mengenai tanggung jawab pidana korporasi dalam kejahatan lingkungan hidup dan pelanggaran HAM berat.",
    eventDate: "19 November 2026",
    time: "10.00 - 12.30 WIB",
    location: "Ruang Diskusi Perpustakaan Hukum Lt. 2",
    speaker: "Dr. Consectetur Adipiscing, S.H., M.H. & Peneliti Senior Lembaga Hukum",
    speakerRole: "Dosen Hukum Pidana & Pengamat HAM",
    badge: "Bedah Buku",
    status: "PUBLISHED",
  },
  {
    id: 5,
    title: "Simposium Tata Kelola Hukum Agraria & Pembangunan Kawasan Industri Berkelanjutan",
    slug: "simposium-tata-kelola-hukum-agraria-kawasan-industri",
    description: "Analisis kepastian hak atas tanah, perizinan amdal industri manufaktur, dan penyelesaian konflik agraria di koridor industri Cikarang-Bekasi.",
    eventDate: "25 November 2026",
    time: "13.30 - 17.00 WIB",
    location: "Auditorium Utama Fakultas Hukum Lt. 4",
    speaker: "Direktur Sengketa Tanah ATR/BPN & Asosiasi Kawasan Industri",
    speakerRole: "Regulator & Praktisi Agraria",
    badge: "Simposium",
    status: "PUBLISHED",
  },
  {
    id: 6,
    title: "Dialog Interaktif: Peluang Karir Advokat Korporasi & In-House Counsel Multinasional",
    slug: "dialog-interaktif-peluang-karir-advokat-korporasi",
    description: "Sharing session eksklusif bersama alumni Fakultas Hukum UPB yang berkarir di firma hukum top-tier dan badan arbitrase internasional.",
    eventDate: "08 Desember 2026",
    time: "09.30 - 12.00 WIB",
    location: "Amphi-Theater Fakultas Hukum Lt. 3",
    speaker: "Senior Legal Counsel Unilever Indonesia & Managing Partners Law Firm",
    speakerRole: "Praktisi Hukum Korporasi & Ikatan Alumni",
    badge: "Karir & Alumni",
    status: "PUBLISHED",
  },
];

export const initialFaculty: FacultyItem[] = [
  {
    id: 1,
    name: "Prof. Dr. Lorem Ipsum, S.H., LL.M.",
    titles: "Guru Besar Hukum Tata Negara & Peradilan Konstitusi",
    nip: "197405122001121002",
    specialization: "Hukum Tata Negara, Peradilan Konstitusi, Hukum Administrasi Publik",
    bioQuote: "Keadilan hukum bukan sebatas kepatuhan formal pada huruf-huruf undang-undang, melainkan komitmen etis untuk menegakkan hakiki martabat manusia.",
    profileImage: "/images/prof-hendra.jpg",
    researchLink: "https://sinta.kemdikbud.go.id",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    name: "Prof. Dr. Dolor Sit Amet, S.H., M.H.",
    titles: "Guru Besar Hukum Perdata & Transaksi Korporasi",
    nip: "198008232005012001",
    specialization: "Hukum Kontrak Bisnis, Hak Kekayaan Intelektual, Regulasi Fintech & AI",
    bioQuote: "Inovasi ekonomi tanpa kepastian regulasi adalah kerapuhan; hukum harus mampu menjadi navigator yang melindungi tanpa membelenggu kreativitas.",
    profileImage: "/images/prof-amaliah.jpg",
    researchLink: "https://sinta.kemdikbud.go.id",
    displayOrder: 2,
    isActive: true,
  },
];
