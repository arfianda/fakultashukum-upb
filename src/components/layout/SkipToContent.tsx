"use client";

import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-[#5A0000] focus:text-white focus:text-sm focus:font-semibold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059] rounded-md transition-transform"
    >
      Lewati ke konten utama
    </a>
  );
}
