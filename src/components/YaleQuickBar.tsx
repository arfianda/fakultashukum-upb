"use client";

import React from "react";
import { Newspaper, Users, Landmark, Compass } from "lucide-react";

export function YaleQuickBar() {
  const items = [
    { label: "BERITA & WARTA", href: "#berita", icon: Newspaper },
    { label: "DIREKTORI DOSEN", href: "#fakultas", icon: Users },
    { label: "TENTANG FAKULTAS", href: "#dekan", icon: Landmark },
    { label: "TUR KAMPUS", href: "#fasilitas", icon: Compass },
  ];

  return (
    <section className="bg-[#410000] border-t border-[#570000]" aria-label="Akses Cepat Halaman Utama">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="py-5 px-4 text-center text-white hover:bg-[#570000] transition-colors border-r border-[#570000] last:border-r-0 border-b md:border-b-0 flex items-center justify-center gap-2.5 group"
            >
              <item.icon className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
              <span className="font-serif text-xs tracking-widest font-normal uppercase text-white group-hover:text-[#E8D8B0]">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
