"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routeNameMap: Record<string, string> = {
  akademik: "Program Studi Hukum",
  penerimaan: "Penerimaan & Bantuan Biaya",
  dosen: "Tenaga Pengajar",
  "kehidupan-mahasiswa": "Kehidupan Mahasiswa",
  "pusat-studi": "Pusat Studi & Laboratorium",
  berita: "Warta & Kajian Hukum",
  agenda: "Agenda Akademik",
  tentang: "Tentang Fakultas Hukum",
  kontak: "Kontak & Layanan Dekanat",
  admin: "Portal Administrasi",
  "kebijakan-privasi": "Kebijakan Privasi",
  aksesibilitas: "Aksesibilitas Web",
};

export function Breadcrumbs({ items }: { items?: BreadcrumbItem[] }) {
  const pathname = usePathname();

  // If items are not passed, generate automatically from path segments
  const breadcrumbList: BreadcrumbItem[] = React.useMemo(() => {
    if (items && items.length > 0) {
      return [{ label: "Beranda", href: "/" }, ...items];
    }

    if (!pathname || pathname === "/") return [];

    const segments = pathname.split("/").filter(Boolean);
    const accumulated: BreadcrumbItem[] = [{ label: "Beranda", href: "/" }];

    let currentHref = "";
    segments.forEach((seg, idx) => {
      currentHref += `/${seg}`;
      const isLast = idx === segments.length - 1;
      const mappedName =
        routeNameMap[seg] ||
        seg
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

      accumulated.push({
        label: mappedName,
        href: isLast ? undefined : currentHref,
      });
    });

    return accumulated;
  }, [items, pathname]);

  if (breadcrumbList.length <= 1) return null;

  return (
    <nav aria-label="Navigasi remah roti" className="w-full mb-4">
      <ol
        className="flex flex-wrap items-center gap-1.5 text-xs text-[#5C5854]"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbList.map((item, index) => {
          const isLast = index === breadcrumbList.length - 1;

          return (
            <li
              key={index}
              className="inline-flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-[#8E706C]/70 shrink-0"
                  aria-hidden="true"
                />
              )}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#800000] hover:underline transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#800000] rounded-xs"
                  itemProp="item"
                >
                  {index === 0 ? (
                    <span className="inline-flex items-center gap-1">
                      <Home className="w-3.5 h-3.5 text-[#800000] shrink-0" />
                      <span itemProp="name">{item.label}</span>
                    </span>
                  ) : (
                    <span itemProp="name">{item.label}</span>
                  )}
                </Link>
              ) : (
                <span
                  className="font-medium text-[#1C1B1B] max-w-[280px] sm:max-w-md truncate"
                  aria-current="page"
                  itemProp="name"
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
