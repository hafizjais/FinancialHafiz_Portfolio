import { siteConfig } from "./site";

export function whatsappUrl(message: string = siteConfig.whatsapp.defaultMessage): string {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp with a message that may contain personal context (selected concerns or the
 * debt snapshot summary).
 *
 * A detached anchor is used on purpose: the link never exists in the page DOM, so automatic
 * outbound-link tracking (e.g. GA4 enhanced measurement) cannot capture the prefilled text.
 */
export function openWhatsApp(message: string): void {
  const anchor = document.createElement("a");
  anchor.href = whatsappUrl(message);
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.click();
}
