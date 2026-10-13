"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons/brand-icons";
import { buttonStyles } from "./ui/button-styles";
import { WhatsAppLink } from "./whatsapp-link";

const FORM_TAGS = new Set(["INPUT", "SELECT", "TEXTAREA"]);

/**
 * Mobile-only WhatsApp bar. Appears after the hero CTA scrolls out of view, hides again near the
 * final CTA (which already shows the button) and while a form field is focused (on-screen keyboard).
 */
export function StickyWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    const finalCta = document.getElementById("final-cta");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heroCta) {
          setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        } else if (entry.target === finalCta) {
          setFinalVisible(entry.isIntersecting);
        }
      }
    });
    if (heroCta) observer.observe(heroCta);
    if (finalCta) observer.observe(finalCta);

    const onFocusIn = (e: FocusEvent) =>
      setEditing(e.target instanceof HTMLElement && FORM_TAGS.has(e.target.tagName));
    const onFocusOut = () => setEditing(false);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const visible = pastHero && !finalVisible && !editing;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-navy-100 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(16,32,63,0.25)] backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <WhatsAppLink location="sticky_mobile" className={buttonStyles("primary", "lg", "w-full")}>
        <WhatsAppIcon className="size-5" />
        Semak Situasi Saya di WhatsApp
      </WhatsAppLink>
    </div>
  );
}
