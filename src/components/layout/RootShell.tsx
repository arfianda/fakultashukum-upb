"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdmissionModal } from "@/components/AdmissionModal";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { useAdmission } from "@/context/AdmissionContext";

export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const { isOpen, openAdmission, closeAdmission } = useAdmission();

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SkipToContent />
      <ScrollToTop />
      <Navbar onOpenAdmission={openAdmission} />
      <main id="main-content" className="flex-1 w-full overflow-hidden">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>
      <Footer />
      <AdmissionModal isOpen={isOpen} onClose={closeAdmission} />
    </>
  );
}
