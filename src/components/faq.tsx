"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { faqItems } from "@/content/faq";
import { track } from "@/lib/analytics";
import { WhatsAppIcon } from "./icons/brand-icons";
import { SectionHeading } from "./ui/section-heading";
import { WhatsAppLink } from "./whatsapp-link";

export function Faq() {
  const [open, setOpen] = useState<string[]>([]);

  const toggle = (id: string) => {
    const isOpen = open.includes(id);
    setOpen((current) => (isOpen ? current.filter((x) => x !== id) : [...current, id]));
    if (!isOpen) track("faq_opened", { faq_id: id });
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading id="faq-title" eyebrow="Soalan lazim" title="Soalan Yang Selalu Ditanya" />

        <div className="mt-10 divide-y divide-navy-100 overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm">
          {faqItems.map((item) => {
            const isOpen = open.includes(item.id);
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-navy-950 transition-colors hover:bg-navy-50/60 focus-visible:bg-navy-50 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-navy-700 sm:px-6"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-5 shrink-0 text-navy-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5 sm:px-6"
                >
                  <div className="space-y-3 text-[0.95rem] leading-relaxed text-navy-700">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {item.link && (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-4 hover:decoration-navy-900"
                      >
                        {item.link.label}
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">(buka di tab baharu)</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-navy-700">
          Ada soalan lain?{" "}
          <WhatsAppLink
            location="faq"
            className="inline-flex min-h-11 items-center gap-1.5 font-bold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-4 hover:decoration-navy-900"
          >
            <WhatsAppIcon className="size-4" />
            Tanya Hafiz di WhatsApp
          </WhatsAppLink>
        </p>
      </div>
    </section>
  );
}
