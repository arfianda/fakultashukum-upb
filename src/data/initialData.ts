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
    title: "Analisis Putusan Mahkamah Konstitusi: Menjaga Imparsialitas dan Kedaulatan Hukum Indonesia",
    slug: "analisis-putusan-mahkamah-konstitusi-menjaga-imparsialitas",
    excerpt: "Kajian mendalam terhadap doktrin pemisahan kekuasaan dan pertimbangan yuridis hakim konstitusi dalam menjaga wibawa peradilan tata negara pasca-pemilu serentak.",
    content: `
      <p class="lead">Kajian mendalam terhadap doktrin pemisahan kekuasaan (trias politica) dan pertimbangan yuridis hakim konstitusi dalam menjaga wibawa peradilan tata negara pasca-pemilu serentak.</p>
      <p>Dalam dinamika ketatanegaraan kontemporer, Mahkamah Konstitusi menempati garda terdepan sebagai pengawal konstitusi (the guardian of constitution) sekaligus pelindung hak asasi manusia (the protector of human rights). Putusan-putusan terbaru menunjukkan tantangan luar biasa dalam menyeimbangkan kepastian hukum formil dengan keadilan substantif yang diharapkan publik.</p>
      <blockquote>"Keadilan konstitusional tidak boleh tersandera oleh kalkulasi politik jangka pendek, melainkan harus berpijak kokoh pada asas kepatutan dan nalar hukum yang luhur."</blockquote>
      <p>Melalui telaah doktrinal dan komparatif, riset ini menyoroti perlunya penguatan sistem rekrutmen hakim konstitusi serta penegakan etika peradilan yang transparan guna mengembalikan marwah lembaga peradilan tertinggi di Republik Indonesia.</p>
    `,
    category: "Yurisprudensi & Konstitusi",
    author: "Prof. Dr. Hendra Gunawan, S.H., LL.M.",
    authorRole: "Guru Besar Hukum Tata Negara",
    publishedAt: "22 September 2026",
    readTime: "6 menit baca",
    coverImage: "/images/hero-library.jpg",
    status: "PUBLISHED",
  },
  {
    id: 2,
    title: "Rekonstruksi Hukum Bisnis Digital & AI di Era Globalisasi",
    slug: "rekonstruksi-hukum-bisnis-digital-dan-ai",
    excerpt: "Kolaborasi Fakultas Hukum UPB dengan konsorsium hukum Asia Pasifik membedah yurisdiksi kontrak pintar (smart contract) dan tanggung jawab keperdataan kecerdasan buatan.",
    content: `
      <p>Perkembangan pesat sistem otomasi cerdas dan kecerdasan buatan (artificial intelligence) memicu disrupsi fundamental terhadap doktrin perjanjian klasik dalam Kitab Undang-Undang Hukum Perdata.</p>
      <p>Fakultas Hukum UPB menginisiasi draft rekomendasi kebijakan bagi pembaharuan hukum perikatan perdata di Indonesia, dengan menitikberatkan pada keabsahan tanda tangan kriptografis, klausul force majeure algoritmik, dan perlindungan konsumen lintas batas negara.</p>
    `,
    category: "Hukum Bisnis & Teknologi",
    author: "Prof. Dr. Amaliah Hidayat, S.H., M.H.",
    authorRole: "Pakar Hukum Perdata & Transaksi Digital",
    publishedAt: "19 September 2026",
    readTime: "4 menit baca",
    status: "PUBLISHED",
  },
  {
    id: 3,
    title: "Fakultas Hukum UPB Raih Juara 1 Kompetisi Peradilan Semu Tingkat Nasional 2026",
    slug: "fh-upb-raih-juara-1-kompetisi-peradilan-semu-nasional-2026",
    excerpt: "Delegasi mahasiswa membuktikan ketajaman argumentasi yuridis dalam simulasi sengketa tata kelola korporasi dan tindak pidana ekonomi kerah putih di tingkat nasional.",
    content: `
      <p>Delegasi Moot Court Society Fakultas Hukum Universitas Pelita Bangsa menorehkan prestasi gemilang dengan meraih Trofi Juara 1 serta Penghargaan Berkas Kasus Terbaik dalam National Moot Court Competition (NMCC) 2026.</p>
      <p>Kemenangan ini membuktikan keunggulan pembinaan komprehensif di Laboratorium Peradilan Semu modern UPB yang membekali mahasiswa sejak semester awal dengan kemahiran drafting berkas perkara, teknik silang interogasi saksi, dan retorika pledoi.</p>
    `,
    category: "Prestasi Mahasiswa",
    author: "Tim Redaksi Civitas FH",
    authorRole: "Biro Komunikasi & Publikasi",
    publishedAt: "15 September 2026",
    readTime: "3 menit baca",
    status: "PUBLISHED",
  },
  {
    id: 4,
    title: "Peluncuran Edisi Khusus Pelita Law Review Terindeks SINTA 2",
    slug: "peluncuran-edisi-khusus-pelita-law-review-sinta-2",
    excerpt: "Menghadirkan diskursus kontemporer seputar keadilan restoratif dan regulasi dekarbonisasi industri dalam jurnal hukum terakreditasi nasional berkala ilmiah.",
    content: `
      <p>Jurnal berkala ilmiah Pelita Law Review resmi menerbitkan Volume 8 Nomor 2 edisi tematik 'Keadilan Ekologis dan Transisi Energi Berkeadilan'. Jurnal ini memuat artikel kontribusi para akademisi dari dalam dan luar negeri.</p>
      <p>Seluruh manuskrip dapat diakses secara terbuka (Open Access) melalui portal repositori riset akademik Fakultas Hukum UPB.</p>
    `,
    category: "Jurnal & Publikasi Ilmiah",
    author: "Dewan Editorial Pelita Law Review",
    authorRole: "Pusat Riset & Publikasi Ilmiah",
    publishedAt: "10 September 2026",
    readTime: "5 menit baca",
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
    speaker: "Prof. Dr. Hendra Gunawan, S.H., LL.M. & Hakim Agung Mahkamah Agung RI",
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
    speaker: "Almira Rahmadhany, S.H., LL.M. & Managing Partners HHP Law Firm",
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
];

export const initialFaculty: FacultyItem[] = [
  {
    id: 1,
    name: "Prof. Dr. Hendra Gunawan, S.H., LL.M.",
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
    name: "Prof. Dr. Amaliah Hidayat, S.H., M.H.",
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
