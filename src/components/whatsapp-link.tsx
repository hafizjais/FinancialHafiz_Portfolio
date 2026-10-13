"use client";

import type { ReactNode } from "react";
import { track, type CtaLocation } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
  location: CtaLocation;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

/** WhatsApp CTA with the default (non-personal) prefilled message. */
export function WhatsAppLink({ location, className, children, ariaLabel }: Props) {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => track("whatsapp_cta_click", { location, message_type: "default" })}
    >
      {children}
    </a>
  );
}
