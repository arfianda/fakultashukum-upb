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
  category?: "dosen" | "staf";
}

export const initialPosts: PostItem[] = [
  {
    id: 1,
    title: "Seminar Nasional Fakultas Hukum UPB: Transformasi Hubungan Industrial di Era Digital dan Peran Mahasiswa Hukum",
    slug: "seminar-fakultas-hukum-transformasi-hubungan-industrial-era-digital",
    excerpt: "Fakultas Hukum Universitas Pelita Bangsa menggelar seminar nasional strategis membedah disrupsi ketenagakerjaan, perlindungan pekerja platform digital, serta peran mahasiswa hukum dalam menegakkan keadilan berkelanjutan.",
    content: `
      <p class="lead">Bertempat di Auditorium Utama Kampus Universitas Pelita Bangsa, Fakultas Hukum UPB sukses menyelenggarakan <strong>Seminar Nasional</strong> bertajuk <em>"Transformasi Hubungan Industrial di Era Digital: Peluang dan Tantangan Peran Mahasiswa Hukum dalam Membangun Sistem Ketenagakerjaan yang Berkeadilan dan Berkelanjutan"</em>.</p>
      <p>Seminar akbar ini menghadirkan kolaborasi strategis antara pakar hukum ketenagakerjaan, praktisi perburuhan, serta delegasi akademik mitra universitas. Forum ini membedah secara komprehensif bagaimana akselerasi transformasi digital dan otomatisasi industri telah mengubah lanskap hubungan kerja konvensional di Indonesia, khususnya di koridor manufaktur dan bisnis Cikarang-Bekasi.</p>
      <blockquote>"Hukum ketenagakerjaan tidak boleh tertinggal di belakang lompatan teknologi digital. Mahasiswa hukum harus hadir bukan sekadar sebagai pembaca undang-undang, melainkan arsitek perlindungan sosial yang memastikan keadilan substantif bagi setiap pekerja."</blockquote>
      <p>Dalam sesi pemaparan utama, para narasumber menyoroti celah hukum dalam perlindungan tenaga kerja ekonomi berbasis aplikasi (gig economy), hak privasi data pekerja, serta pentingnya pembaharuan mekanisme penyelesaian perselisihan hubungan industrial (PPHI) yang lebih adaptif, cepat, dan berkeadilan.</p>
      <p>Acara ini dihadiri oleh ratusan mahasiswa lintas angkatan, jajaran dekanat, dosen pengajar, serta perwakilan serikat pekerja industri. Diskusi interaktif diakhiri dengan perumusan rekomendasi kebijakan ketenagakerjaan berkeadilan dari Fakultas Hukum UPB.</p>
    `,
    category: "Seminar Nasional",
    author: "Biro Humas & Publikasi FH UPB",
    authorRole: "Sekretariat Fakultas Hukum",
    publishedAt: "28 Oktober 2026",
    readTime: "5 menit baca",
    coverImage: "/images/berita/seminar-fakultas-hukum.jpg",
    status: "PUBLISHED",
  },
  {
    id: 2,
    title: "Refleksi Hari Buruh: Himakum FH UPB Gelar Legal Discussion Kaji Keadilan dan Perlindungan Hukum Pekerja",
    slug: "legal-discussion-refleksi-hari-buruh-keadilan-pekerja",
    excerpt: "Menghadirkan narasumber Arifin, S.H., M.H. (Dosen Hukum Ketenagakerjaan, Advokat, dan Kurator), diskusi hukum Himakum FH UPB membedah dinamika upah layak, jaminan sosial ketenagakerjaan, dan advokasi buruh.",
    content: `
      <p class="lead">Sebagai wujud kepedulian intelektual terhadap dinamika ketenagakerjaan nasional, Himpunan Mahasiswa Ilmu Hukum (Himakum) Fakultas Hukum Universitas Pelita Bangsa menyelenggarakan <strong>Legal Discussion</strong> dengan mengangkat tema <em>"Refleksi Hari Buruh: Meninjau Keadilan dan Perlindungan Hukum bagi Pekerja di Indonesia"</em> bertempat di Gedung A UPB.</p>
      <p>Forum diskusi menghadirkan <strong>Arifin, S.H., M.H.</strong> (Dosen Hukum Ketenagakerjaan FH UPB, Advokat, dan Kurator) sebagai narasumber utama, dipandu secara interaktif oleh <strong>Ilham Syadiqin</strong> (Kepala Divisi Penelitian dan Pengembangan Himakum).</p>
      <blockquote>"Pekerja adalah pilar utama ketahanan ekonomi bangsa. Perlindungan hukum yang kokoh bukan beban bagi dunia usaha, melainkan prasyarat mutlak terciptanya iklim industri yang sehat dan beradab."</blockquote>
      <p>Diskusi mengupas secara kritis implementasi regulasi ketenagakerjaan terkini, status Perjanjian Kerja Waktu Tertentu (PKWT), keselamatan dan kesehatan kerja (K3), serta tantangan kurator dalam proses kepailitan perusahaan yang melibatkan pemenuhan hak upah terutang buruh.</p>
      <p>Antusiasme peserta terlihat dari tajamnya dialog antara mahasiswa dengan narasumber mengenai peran Klinik Bantuan Hukum (KLBH) FH UPB dalam memberikan advokasi pro-bono bagi masyarakat dan buruh lokal di kawasan industri Kabupaten Bekasi.</p>
    `,
    category: "Diskusi Hukum & Advokasi",
    author: "Himakum FH UPB",
    authorRole: "Himpunan Mahasiswa Ilmu Hukum",
    publishedAt: "25 Oktober 2026",
    readTime: "4 menit baca",
    coverImage: "/images/berita/legal-discussion-ketenagakerjaan.jpg",
    status: "PUBLISHED",
  },
  {
    id: 3,
    title: "Ratusan Mahasiswa dan Pimpinan Fakultas Padati Auditorium Utama dalam Pembukaan Pekan Ilmiah Hukum UPB",
    slug: "pembukaan-pekan-ilmiah-hukum-upb-padati-auditorium",
    excerpt: "Dengan khidmat menyanyikan lagu Indonesia Raya dan Mars Pelita Bangsa, ratusan mahasiswa berjas almamater kebanggaan bersama jajaran dekanat resmi membuka rangkaian simposium dan seminar hukum nasional.",
    content: `
      <p class="lead">Lautan sivitas akademika berjas almamater merah kebanggaan memadati Auditorium Utama Universitas Pelita Bangsa dalam rangka seremonial pembukaan rangkaian <strong>Pekan Ilmiah &amp; Seminar Akbar Fakultas Hukum UPB</strong>.</p>
      <p>Acara dibuka secara khidmat dengan menyanyikan lagu kebangsaan Indonesia Raya yang diikuti secara serentak oleh pimpinan fakultas, dewan guru besar, jajaran dosen, serta ratusan mahasiswa hukum dari berbagai tingkatan semester.</p>
      <p>Dalam sambutan pembuka, pimpinan fakultas menegaskan bahwa kegiatan keilmuan berskala besar ini merupakan bukti nyata komitmen akademik Fakultas Hukum UPB dalam merespons isu-isu hukum kontemporer serta melatih kematangan dialektika para calon sarjana hukum.</p>
      <blockquote>"Kehadiran penuh rekan-rekan mahasiswa di auditorium ini adalah cerminan energi intelektual yang haus akan kebenaran dan keadilan hukum. Jadikan momentum ini untuk mempertajam argumentasi yuridis dan empati sosial."</blockquote>
      <p>Rangkaian kegiatan pekan ilmiah ini mencakup seminar pleno ketenagakerjaan, bedah buku yurisprudensi, simulasi persidangan peradilan semu, hingga klinik penulisan jurnal ilmiah hukum terindeks nasional.</p>
    `,
    category: "Warta Kampus",
    author: "Biro Kemahasiswaan FH UPB",
    authorRole: "Divisi Dokumentasi & Acara",
    publishedAt: "22 Oktober 2026",
    readTime: "3 menit baca",
    coverImage: "/images/berita/antusiasme-mahasiswa-seminar.jpg",
    status: "PUBLISHED",
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
  {
    id: 7,
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
    name: "",
    titles: "Dekan Fakultas Hukum",
    nip: "-",
    specialization: "Pimpinan Fakultas Hukum, Kebijakan Akademik & Tata Kelola Institusi",
    bioQuote: "Keadilan hukum bukan sebatas kepatuhan formal pada huruf-huruf undang-undang, melainkan komitmen etis untuk menegakkan hakiki martabat manusia.",
    profileImage: "/images/jajaran/dekan.jpg",
    researchLink: "https://sinta.kemdikbud.go.id",
    displayOrder: 1,
    isActive: true,
    category: "dosen",
  },
  {
    id: 2,
    name: "",
    titles: "Wakil Dekan Fakultas Hukum",
    nip: "-",
    specialization: "Bidang Akademik, Kemahasiswaan, dan Kerja Sama Kelembagaan",
    bioQuote: "Inovasi pendidikan hukum harus mampu menjadi navigator yang membangun integritas akademik, kemahiran litigasi, dan kepekaan sosial mahasiswa.",
    profileImage: "/images/jajaran/wakil-dekan-fh.jpg",
    researchLink: "https://sinta.kemdikbud.go.id",
    displayOrder: 2,
    isActive: true,
    category: "dosen",
  },
  {
    id: 3,
    name: "",
    titles: "Ketua Program Studi Ilmu Hukum",
    nip: "-",
    specialization: "Koordinasi Kurikulum Sarjana Hukum (S.H.), Mutu Pengajaran & Riset",
    bioQuote: "Kurikulum hukum yang adaptif dan berbasis praktik peradilan adalah kunci mencetak lulusan sarjana hukum yang siap bersaing di tingkat nasional.",
    profileImage: "/images/jajaran/kaprodi-fh.jpg",
    researchLink: "https://sinta.kemdikbud.go.id",
    displayOrder: 3,
    isActive: true,
    category: "dosen",
  },
  {
    id: 4,
    name: "Arifin, S.H., M.H.",
    titles: "Dosen Tetap Hukum Ketenagakerjaan & Praktisi Litigasi",
    nip: "198504112012121003",
    specialization: "Hukum Ketenagakerjaan, Hubungan Industrial, Kepailitan & Kurator",
    bioQuote: "Perlindungan hukum yang kokoh bagi pekerja dan kepastian usaha adalah dua pilar yang saling menguatkan dalam ketahanan ekonomi nasional.",
    profileImage: "/images/jajaran/dekan.jpg",
    researchLink: "https://sinta.kemdikbud.go.id",
    displayOrder: 4,
    isActive: true,
    category: "dosen",
  },
  {
    id: 5,
    name: "",
    titles: "Kepala Sekretariat & Administrasi Akademik Fakultas Hukum",
    nip: "-",
    specialization: "Layanan Administrasi Akademik, Persuratan Dekanat, Tata Usaha & Yudisium",
    bioQuote: "Pelayanan administrasi akademik yang tertib, responsif, dan transparan adalah fondasi kelancaran studi setiap mahasiswa Fakultas Hukum.",
    profileImage: "/images/jajaran/wakil-dekan.jpg",
    displayOrder: 5,
    isActive: true,
    category: "staf",
  },
  {
    id: 6,
    name: "",
    titles: "Staf Operasional Laboratorium Hukum & Sistem Informasi",
    nip: "-",
    specialization: "Administrasi Laboratorium Peradilan Semu, Penjadwalan Sidang & Dukungan SIAKAD",
    bioQuote: "Memastikan kesiapan sarana ruang sidang semu dan infrastruktur digital fakultas agar kegiatan praktikum litigasi berjalan optimal.",
    profileImage: "/images/jajaran/dekan.jpg",
    displayOrder: 6,
    isActive: true,
    category: "staf",
  },
];
