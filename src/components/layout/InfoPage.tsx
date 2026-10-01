"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ArrowRight,
  Info,
  Building2,
  Phone,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { InfoPageData } from "@/data/pagesData";

export function InfoPage({ data }: { data: InfoPageData }) {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader
        kicker={data.kicker}
        title={data.title}
        description={data.description}
        breadcrumbs={data.breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main Content Column (lg: 8 cols) */}
          <main className="lg:col-span-8 space-y-10">
            {data.sections.map((section, sIdx) => (
              <motion.section
                key={sIdx}
                id={section.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: sIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-[#E5E1DA] rounded-2xl p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                {section.kicker && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#800000] block mb-1.5">
                    {section.kicker}
                  </span>
                )}

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B1B] mb-3 leading-snug">
                  {section.title}
                </h2>

                <div className="w-12 h-0.5 bg-[#C5A059] mb-5" aria-hidden="true" />

                {/* Paragraph Content */}
                {section.content && section.content.length > 0 && (
                  <div className="space-y-4 text-xs sm:text-sm text-[#2C2928] leading-relaxed font-light mb-6">
                    {section.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Section Items / Cards */}
                {section.items && section.items.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {section.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="p-4 sm:p-5 rounded-xl bg-[#F8F7F4] border border-[#EFECE6] flex flex-col justify-between hover:border-[#800000]/30 transition-colors"
                      >
                        <div>
                          {item.badge && (
                            <span className="inline-block px-2 py-0.5 rounded-md bg-[#800000]/10 text-[#800000] text-[10px] font-bold uppercase tracking-wider mb-2">
                              {item.badge}
                            </span>
                          )}

                          {item.title && (
                            <h3 className="font-serif text-sm sm:text-base font-bold text-[#1C1B1B] mb-1">
                              {item.title}
                            </h3>
                          )}

                          {item.subtitle && (
                            <p className="text-[11px] font-medium text-[#800000] mb-2">
                              {item.subtitle}
                            </p>
                          )}

                          {item.description && (
                            <p className="text-xs text-[#5C5854] leading-relaxed font-light">
                              {item.description}
                            </p>
                          )}

                          {item.bullets && item.bullets.length > 0 && (
                            <ul className="mt-2.5 space-y-1 text-xs text-[#5C5854] list-disc list-inside font-light">
                              {item.bullets.map((b, bIdx) => (
                                <li key={bIdx}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {item.link && (
                          <div className="mt-4 pt-3 border-t border-[#E5E1DA]">
                            <Link
                              href={item.link.href}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#800000] hover:text-[#570000] transition-colors"
                            >
                              <span>{item.link.label}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty State / Neutral Placeholder */}
                {section.emptyState && (
                  <div className="mt-4 p-5 rounded-xl bg-[#F8F7F4] border border-dashed border-[#8E706C]/40 text-center">
                    <Info className="w-5 h-5 text-[#800000] mx-auto mb-2 opacity-80" />
                    <p className="text-xs sm:text-sm text-[#5C5854] italic font-light max-w-lg mx-auto">
                      {section.emptyState}
                    </p>
                  </div>
                )}

                {/* Callout Box */}
                {section.callout && (
                  <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#800000]/8 border-l-4 border-[#800000]">
                    <h4 className="font-serif text-sm font-bold text-[#800000] mb-1">
                      {section.callout.title}
                    </h4>
                    <p className="text-xs text-[#5C5854] leading-relaxed font-light">
                      {section.callout.text}
                    </p>
                  </div>
                )}
              </motion.section>
            ))}

            {/* Bottom CTA Card */}
            {data.cta && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#5A0000] text-white rounded-2xl p-6 sm:p-8 shadow-xs"
              >
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                  {data.cta.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E5E2E1] leading-relaxed mb-6 font-light max-w-2xl">
                  {data.cta.description}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={data.cta.buttonHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5A059] text-[#5A0000] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    <span>{data.cta.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {data.cta.secondaryText && data.cta.secondaryHref && (
                    <Link
                      href={data.cta.secondaryHref}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
                    >
                      <span>{data.cta.secondaryText}</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </main>

          {/* Sidebar: "Dalam Bagian Ini" (Yale Style Navigation) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-xs sticky top-24">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C5854] mb-3 pb-2 border-b border-[#F0EDED]">
                Dalam Bagian: {data.parentSectionTitle}
              </h3>

              <nav aria-label={`Navigasi bagian ${data.parentSectionTitle}`}>
                <ul className="space-y-1">
                  {data.siblings.map((sib, idx) => {
                    const isCurrent = pathname === sib.href;
                    return (
                      <li key={idx}>
                        <Link
                          href={sib.href}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                            isCurrent
                              ? "bg-[#800000] text-white font-semibold shadow-xs"
                              : "text-[#1C1B1B] hover:bg-[#F8F7F4] hover:text-[#800000]"
                          }`}
                        >
                          <span className="truncate">{sib.label}</span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                              isCurrent
                                ? "text-white"
                                : "text-[#5C5854] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5"
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Quick Contact Box */}
              <div className="mt-6 pt-4 border-t border-[#F0EDED] space-y-2.5 text-xs text-[#5C5854] font-light">
                <div className="flex items-center gap-2 text-[#1C1B1B] font-semibold mb-1">
                  <Building2 className="w-4 h-4 text-[#800000]" />
                  <span>Sekretariat Dekanat FH UPB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#800000] shrink-0" />
                  <span>(021) 2851 8181</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-[#800000] shrink-0" />
                  <a
                    href="https://wa.me/6281290008801"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[#800000] inline-flex items-center gap-1"
                  >
                    <span>Layanan WhatsApp PMB</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
