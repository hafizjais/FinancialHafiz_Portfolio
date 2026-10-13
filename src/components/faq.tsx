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
    <section id="faq" aria-labelledby="faq-title" className="bg-mist py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" title="Soalan Yang Selalu Ditanya" />
          <p className="mt-6 text-navy-800">
            Ada soalan lain?
            <br />
            <WhatsAppLink
              location="faq"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-4 hover:decoration-navy-900"
            >
              <WhatsAppIcon className="size-4" />
              Tanya Hafiz di WhatsApp
            </WhatsAppLink>
          </p>
        </div>

        <div className="border-t border-navy-900">
          {faqItems.map((item) => {
            const isOpen = open.includes(item.id);
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;
            return (
              <div key={item.id} className="border-b border-navy-300">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left font-serif text-lg font-semibold text-navy-950 hover:text-navy-700 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-navy-700 sm:text-xl"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-5 shrink-0 text-navy-700 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="pb-6">
                  <div className="max-w-prose space-y-3 leading-relaxed text-navy-800">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {item.link && (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-4 hover:decoration-navy-900"
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
      </div>
    </section>
  );
}
