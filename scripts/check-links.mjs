import fs from "fs";
import path from "path";
import http from "http";

const ROOT_DIR = process.cwd();
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

// Files to scan
const filesToScan = [
  "src/components/Navbar.tsx",
  "src/components/Footer.tsx",
  "src/app/not-found.tsx",
  "src/components/AudiencePortalModal.tsx",
  "src/data/pagesData.ts",
];

const foundRoutes = new Set();

// Known dynamic test slugs
const sampleDynamicRoutes = [
  "/berita/fh-upb-sambut-mahasiswa-baru-integritas-litigasi",
  "/agenda/kuliah-pakar-penegakan-hukum-lingkungan-arbitrase",
  "/dosen/prof-dr-lorem-ipsum-s-h-ll-m",
  "/dosen/bidang/hukum-bisnis-korporasi",
  "/dosen/bidang/hukum-tata-negara",
  "/akademik/peminatan/hukum-pidana",
  "/akademik/peminatan/hukum-perdata-bisnis",
  "/akademik/peminatan/hukum-tata-negara",
  "/akademik/peminatan/hukum-internasional",
  "/tentang/fasilitas/perpustakaan-hukum",
  "/tentang/fasilitas/auditorium",
];

for (const relPath of filesToScan) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, "utf-8");

  // Regex for href="/..." or href: "/..."
  const regex = /(?:href[:=]\s*["'])(\/[a-zA-Z0-9\-_/?=&#]*)(?:["'])/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let route = match[1];
    // Strip hash
    if (route.includes("#")) {
      route = route.split("#")[0];
    }
    // Strip query string for route existence check unless testing query
    if (route.includes("?")) {
      route = route.split("?")[0];
    }
    if (route && route.startsWith("/")) {
      foundRoutes.add(route);
    }
  }
}

// Add sample dynamic routes
for (const dyn of sampleDynamicRoutes) {
  foundRoutes.add(dyn);
}

// Convert to sorted array
const routesToTest = Array.from(foundRoutes).sort();

console.log(`\n======================================================`);
console.log(`  FH UPB ROUTE INTEGRITY CHECKER`);
console.log(`  Testing ${routesToTest.length} unique routes against ${BASE_URL}`);
console.log(`======================================================\n`);

function checkRoute(route) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${route}`;
    http
      .get(url, (res) => {
        resolve({ route, status: res.statusCode });
      })
      .on("error", (err) => {
        resolve({ route, status: "ERROR", error: err.message });
      });
  });
}

async function run() {
  let hasFailures = false;
  const results = [];

  for (const route of routesToTest) {
    const res = await checkRoute(route);
    results.push(res);
    const isOk = res.status === 200 || res.status === 307 || res.status === 308;
    const marker = isOk ? "✓ OK" : "✗ FAILED";
    console.log(`${marker.padEnd(10)} [HTTP ${res.status}] ${route}`);
    if (!isOk) {
      hasFailures = true;
    }
  }

  console.log(`\n======================================================`);
  if (hasFailures) {
    console.error(`❌ VERIFIKASI GAGAL: Ditemukan route yang mengembalikan status non-200 / 404.`);
    process.exit(1);
  } else {
    console.log(`✅ VERIFIKASI BERHASIL: Seluruh ${routesToTest.length} route aktif dan mengembalikan HTTP 200!`);
    process.exit(0);
  }
}

run();
