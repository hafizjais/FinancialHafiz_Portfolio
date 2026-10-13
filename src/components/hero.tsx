import Image from "next/image";
import { ArrowDown, CheckCircle2, MessageCircle } from "lucide-react";
import portrait from "@/assets/hafiz-portrait.jpg";
import headshot from "@/assets/hafiz-headshot.jpg";
import { heroHeadlines } from "@/content/hero-variants";
import type { HeroVariant } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
import { WhatsAppIcon } from "./icons/brand-icons";
import { buttonStyles } from "./ui/button-styles";
import { WhatsAppLink } from "./whatsapp-link";

const valuePoints = [
  "Review komitmen semasa.",
  "Fahami pilihan yang mungkin sesuai.",
  "Semak kelayakan sebelum membuat keputusan.",
];

export function Hero({ variant }: { variant: HeroVariant }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-navy-50 via-white to-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10rem] size-[28rem] rounded-full bg-gold-200/40 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-8 pb-14 sm:px-6 sm:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pt-16 lg:pb-20">
        <div className="motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-navy-100 bg-white py-1 pr-4 pl-1 text-sm font-semibold text-navy-800 shadow-sm">
            <Image
              src={headshot}
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full object-cover object-top"
            />
            Hi, saya Hafiz 👋
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-balance text-[2rem] leading-[1.1] font-extrabold tracking-tight text-navy-950 sm:text-5xl lg:text-[3.35rem]"
          >
            {heroHeadlines[variant]}
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-navy-700 sm:text-lg">
            Credit card, personal loan dan komitmen lain semakin membebankan cashflow? Semak dahulu
            sama ada debt consolidation sesuai dengan situasi kewangan anda.
          </p>

          <div id="hero-cta" className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:[&>a]:whitespace-nowrap">
            <WhatsAppLink location="hero" className={buttonStyles("primary", "lg")}>
              <WhatsAppIcon className="size-5" />
              Semak Situasi Saya di WhatsApp
            </WhatsAppLink>
            <a href="#apa-itu" className={buttonStyles("secondary", "lg")}>
              Fahami Debt Consolidation
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            {valuePoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm font-semibold leading-snug text-navy-800"
              >
                <CheckCircle2 className="mt-px size-5 shrink-0 text-gold-600" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-xl border-l-2 border-gold-400 pl-3 text-xs leading-relaxed text-navy-600">
            Sebarang pilihan pembiayaan adalah tertakluk kepada kelayakan anda serta penilaian dan
            kelulusan pihak bank atau institusi pembiayaan berkaitan.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-none">
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-navy-900" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-navy-100 shadow-xl">
            <Image
              src={portrait}
              alt="Hafiz, perunding Financial Hafiz, tersenyum sambil memberi isyarat bagus"
              placeholder="blur"
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 90vw"
              loading="eager"
              fetchPriority="high"
              className="aspect-[3/4] h-auto w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl border border-navy-100 bg-white/95 p-3 shadow-lg backdrop-blur sm:left-auto sm:-left-6 sm:right-auto">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-bold text-navy-950">Perbincangan awal percuma</span>
              <span className="text-navy-600">
                {siteConfig.fullName} · {siteConfig.role}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
