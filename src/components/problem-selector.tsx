"use client";

import { useState } from "react";
import {
  Check,
  CreditCard,
  Gauge,
  HandCoins,
  Home,
  ListRestart,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { concernMessage, concerns } from "@/content/concerns";
import { track } from "@/lib/analytics";
import { openWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons/brand-icons";
import { buttonStyles } from "./ui/button-styles";
import { SectionHeading } from "./ui/section-heading";

const icons: Record<string, LucideIcon> = {
  credit_cards: CreditCard,
  personal_loans: HandCoins,
  high_commitment: Gauge,
  tight_cashflow: Wallet,
  dsr_home: Home,
  restructure: ListRestart,
};

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
    <section aria-labelledby="situasi-title" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="situasi-title" eyebrow="Mula di sini" title="Mana Satu Situasi Yang Paling Dekat Dengan Anda?">
          <p>Pilih satu atau lebih. Pilihan anda akan dimasukkan ke dalam mesej WhatsApp supaya perbualan lebih mudah dimulakan.</p>
        </SectionHeading>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {concerns.map((concern) => {
            const Icon = icons[concern.id] ?? Wallet;
            const isSelected = selected.includes(concern.id);
            return (
              <li key={concern.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggle(concern.id)}
                  className={`group flex h-full min-h-20 w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-navy-700 ${
                    isSelected
                      ? "border-navy-700 bg-navy-50 shadow-md"
                      : "border-navy-100 bg-white hover:border-navy-300 hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
                      isSelected ? "bg-navy-800 text-gold-300" : "bg-navy-50 text-navy-700"
                    }`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-[0.95rem] font-semibold leading-snug text-navy-900">
                    {concern.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                      isSelected ? "border-navy-800 bg-navy-800 text-white" : "border-navy-200 text-transparent"
                    }`}
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p aria-live="polite" className="text-sm font-semibold text-navy-700">
            {selected.length === 0
              ? "Tiada situasi dipilih — anda masih boleh terus berbual."
              : `${selected.length} situasi dipilih`}
          </p>
          <button type="button" onClick={handleDiscuss} className={buttonStyles("primary", "lg", "w-full sm:w-auto")}>
            <WhatsAppIcon className="size-5" />
            Discuss Situasi Saya
          </button>
          <p className="max-w-md text-xs leading-relaxed text-navy-600">
            Pilihan ini hanya untuk memulakan perbincangan. Ia tidak menentukan kelayakan anda untuk
            sebarang pembiayaan.
          </p>
        </div>
      </div>
    </section>
  );
}
