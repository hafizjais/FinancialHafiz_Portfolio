import { WhatsAppIcon } from "./icons/brand-icons";
import { Logo } from "./logo";
import { buttonStyles } from "./ui/button-styles";
import { WhatsAppLink } from "./whatsapp-link";

const navItems = [
  { href: "#apa-itu", label: "Apa itu" },
  { href: "#cara", label: "Cara ia berfungsi" },
  { href: "#snapshot", label: "Debt Snapshot" },
  { href: "#kenali-hafiz", label: "Kenali Hafiz" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-700"
          aria-label="Financial Hafiz, ke atas halaman"
        >
          <Logo />
        </a>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="py-2 text-sm font-semibold text-navy-700 underline-offset-8 decoration-gold-400 decoration-2 hover:text-navy-950 hover:underline focus-visible:outline-2 focus-visible:outline-navy-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <WhatsAppLink location="header" className={buttonStyles("primary", "md", "shrink-0")}>
          <WhatsAppIcon className="size-4" />
          <span>
            WhatsApp<span className="hidden sm:inline"> Hafiz</span>
          </span>
        </WhatsAppLink>
      </div>
    </header>
  );
}
