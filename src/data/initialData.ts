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
];

export const initialEvents: EventItem[] = [
  {
    id: 1,
    title: "Seminar Nasional: Transformasi Hubungan Industrial di Era Digital",
    slug: "seminar-nasional-transformasi-hubungan-industrial-era-digital",
    description: "Peluang dan tantangan peran mahasiswa hukum dalam membangun sistem ketenagakerjaan yang berkeadilan dan berkelanjutan.",
    eventDate: "28 Oktober 2026",
    time: "08.30 - 13.00 WIB",
    location: "Auditorium Utama Universitas Pelita Bangsa",
    speaker: "Narasumber Pakar Hukum Ketenagakerjaan & Praktisi Hubungan Industrial",
    speakerRole: "Fakultas Hukum Universitas Pelita Bangsa",
    badge: "Seminar Nasional",
    status: "PUBLISHED",
  },
  {
    id: 2,
    title: "Legal Discussion: Refleksi Hari Buruh — Meninjau Keadilan dan Perlindungan Hukum bagi Pekerja",
    slug: "legal-discussion-refleksi-hari-buruh-perlindungan-pekerja",
    description: "Diskusi hukum Himakum FH UPB membedah keadilan dan perlindungan hukum bagi pekerja di Indonesia.",
    eventDate: "25 Oktober 2026",
    time: "13.00 - 16.00 WIB",
    location: "Gedung A Kampus Universitas Pelita Bangsa",
    speaker: "Arifin, S.H., M.H. (Moderator: Ilham Syadiqin)",
    speakerRole: "Dosen Hukum Ketenagakerjaan, Advokat & Kurator",
    badge: "Legal Discussion",
    status: "PUBLISHED",
  },
];

export const initialFaculty: FacultyItem[] = [
  {
    id: 1,
    name: "",
    titles: "Dekan Fakultas Hukum",
    nip: "-",
    specialization: "Dekan Fakultas Hukum Universitas Pelita Bangsa",
    bioQuote: "",
    profileImage: "/images/jajaran/dekan.jpg",
    displayOrder: 1,
    isActive: true,
    category: "dosen",
  },
  {
    id: 2,
    name: "",
    titles: "Wakil Dekan Fakultas Hukum",
    nip: "-",
    specialization: "Wakil Dekan Fakultas Hukum Universitas Pelita Bangsa",
    bioQuote: "",
    profileImage: "/images/jajaran/wakil-dekan-fh.jpg",
    displayOrder: 2,
    isActive: true,
    category: "dosen",
  },
  {
    id: 3,
    name: "",
    titles: "Ketua Program Studi Ilmu Hukum",
    nip: "-",
    specialization: "Ketua Program Studi Ilmu Hukum Fakultas Hukum Universitas Pelita Bangsa",
    bioQuote: "",
    profileImage: "/images/jajaran/kaprodi-fh.jpg",
    displayOrder: 3,
    isActive: true,
    category: "dosen",
  },
];
