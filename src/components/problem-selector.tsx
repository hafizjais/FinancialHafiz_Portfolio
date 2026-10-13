"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { concernMessage, concerns } from "@/content/concerns";
import { track } from "@/lib/analytics";
import { openWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons/brand-icons";
import { buttonStyles } from "./ui/button-styles";
import { SectionHeading } from "./ui/section-heading";

export function ProblemSelector() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );

  const handleDiscuss = () => {
    track("whatsapp_cta_click", {
      location: "problem_selector",
      message_type: selected.length > 0 ? "concern" : "default",
    });
    openWhatsApp(concernMessage(selected));
  };

  return (
    <section aria-labelledby="situasi-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="situasi-title" title="Mana Satu Situasi Yang Paling Dekat Dengan Anda?">
            <p>
              Tandakan satu atau lebih. Pilihan anda akan dimasukkan ke dalam mesej WhatsApp supaya
              perbualan lebih mudah dimulakan.
            </p>
          </SectionHeading>

          <div className="mt-8">
            <p aria-live="polite" className="text-sm font-semibold text-navy-700">
              {selected.length === 0
                ? "Tiada situasi dipilih. Anda masih boleh terus berbual."
                : `${selected.length} situasi dipilih`}
            </p>
            <button
              type="button"
              onClick={handleDiscuss}
              className={buttonStyles("primary", "lg", "mt-3 w-full sm:w-auto")}
            >
              <WhatsAppIcon className="size-5" />
              Discuss Situasi Saya
            </button>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-700">
              Pilihan ini hanya untuk memulakan perbincangan. Ia tidak menentukan kelayakan anda untuk
              sebarang pembiayaan.
            </p>
          </div>
        </div>

        <ul className="border-t border-navy-900">
          {concerns.map((concern) => {
            const isSelected = selected.includes(concern.id);
            return (
              <li key={concern.id} className="border-b border-rule">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggle(concern.id)}
                  className={`flex min-h-18 w-full items-center gap-4 px-1 py-4 text-left transition-colors focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-navy-700 sm:px-3 ${
                    isSelected ? "bg-gold-50" : "hover:bg-mist"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-6 shrink-0 place-items-center rounded-sm border-2 transition-colors ${
                      isSelected ? "border-navy-900 bg-navy-900 text-gold-300" : "border-navy-400 text-transparent"
                    }`}
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="font-serif text-lg leading-snug font-semibold text-navy-950 sm:text-xl">
                    {concern.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
