"use client";

import { Mail } from "lucide-react";
import { track, type CtaLocation, type SocialNetwork } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
import { FacebookIcon, ThreadsIcon } from "./icons/brand-icons";

const links: {
  network: SocialNetwork;
  label: string;
  href: string;
  Icon: (props: { className?: string }) => React.ReactNode;
}[] = [
  { network: "facebook", label: "Facebook", href: siteConfig.facebook, Icon: FacebookIcon },
  { network: "threads", label: "Threads", href: siteConfig.threads, Icon: ThreadsIcon },
  { network: "email", label: "Email", href: `mailto:${siteConfig.email}`, Icon: Mail },
];

type Props = {
  location: CtaLocation;
  tone?: "light" | "dark";
  /** Show the full email address instead of the "Email" label. */
  showEmailAddress?: boolean;
  align?: "start" | "center";
};

export function SocialLinks({ location, tone = "light", showEmailAddress = false, align = "start" }: Props) {
  const linkTone =
    tone === "dark"
      ? "border-white/20 text-white hover:border-white/50 hover:bg-white/10 focus-visible:outline-gold-300"
      : "border-navy-100 bg-white text-navy-800 hover:border-navy-300 hover:bg-navy-50 focus-visible:outline-navy-700";

  return (
    <ul className={`flex flex-wrap gap-2.5 ${align === "center" ? "justify-center" : ""}`}>
      {links.map(({ network, label, href, Icon }) => {
        const isEmail = network === "email";
        return (
          <li key={network}>
            <a
              href={href}
              {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              onClick={() => track("social_link_click", { network, location })}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${linkTone}`}
            >
              <Icon className="size-4 shrink-0" />
              <span className="break-all">{isEmail && showEmailAddress ? siteConfig.email : label}</span>
              {!isEmail && <span className="sr-only"> (buka di tab baharu)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
