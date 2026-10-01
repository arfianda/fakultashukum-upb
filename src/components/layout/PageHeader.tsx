"use client";

import React from "react";
import { motion } from "framer-motion";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/Breadcrumbs";

interface PageHeaderProps {
  title: string;
  kicker?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  kicker,
  description,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <header className="w-full bg-[#F8F7F4] border-b border-[#E5E1DA] pt-28 sm:pt-32 pb-10 sm:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {kicker && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#800000] mb-2 sm:mb-2.5"
            >
              {kicker}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#570000] tracking-tight leading-tight mb-4"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="w-16 h-1 bg-[#C5A059] mb-5"
            aria-hidden="true"
          />

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="text-base sm:text-lg text-[#5C5854] leading-relaxed font-light"
            >
              {description}
            </motion.p>
          )}

          {actions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
      </div>
    </header>
  );
}
