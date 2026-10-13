import Image from "next/image";
import background from "@/content/background.png";
import { heroHeadlines } from "@/content/hero-variants";
import type { HeroVariant } from "@/lib/analytics";
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
    <section aria-labelledby="hero-title" className="relative isolate flex flex-col overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-9 pb-12 sm:px-6 xl:py-16">
        <div className="max-w-xl xl:max-w-md">
          <p className="font-serif text-lg text-navy-700">Hi, saya Hafiz.</p>

          <h1
            id="hero-title"
            className="mt-3 font-serif text-[2.1rem] leading-[1.12] font-bold tracking-tight text-balance text-navy-950 sm:text-5xl xl:text-[2.75rem]"
          >
            {heroHeadlines[variant]}
          </h1>

          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-navy-800">
            Credit card, personal loan dan komitmen lain semakin membebankan cashflow? Semak dahulu
            sama ada debt consolidation sesuai dengan situasi kewangan anda.
          </p>

          <div id="hero-cta" className="mt-7 flex flex-col items-start">
            <WhatsAppLink location="hero" className={buttonStyles("primary", "lg", "w-full sm:w-auto")}>
              <WhatsAppIcon className="size-5" />
              Semak Situasi Saya di WhatsApp
            </WhatsAppLink>
            <a
              href="#apa-itu"
              className="inline-flex min-h-12 items-center text-base font-semibold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-4 hover:decoration-navy-900"
            >
              Fahami Debt Consolidation
            </a>
          </div>
          <p className="py-3 text-base font-semibold text-navy-800">Perbincangan awal percuma.</p>

          <ul className="border-t border-navy-300">
            {valuePoints.map((point) => (
              <li key={point} className="border-b border-navy-300 py-3 font-semibold text-navy-900">
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-navy-800">
            Sebarang pilihan pembiayaan adalah tertakluk kepada kelayakan anda serta penilaian dan
            kelulusan pihak bank atau institusi pembiayaan berkaitan.
          </p>
        </div>
      </div>

      {/*
        Photo. From 1280px it fills the space to the right of the 28rem text column (starting
        2rem after it, aligned to the centred 72rem container) and fades in from the left edge.
        Below 1280px it is a strip under the text, framed on the two faces.
      */}
      <div className="relative order-last h-72 sm:h-96 lg:h-[28rem] xl:absolute xl:inset-y-0 xl:right-0 xl:left-[calc(max(0px,(100vw_-_72rem)/2)_+_1.5rem_+_28rem_+_2rem)] xl:-z-10 xl:h-auto xl:[mask-image:linear-gradient(to_right,transparent,black_12%)]">
        <Image
          src={background}
          alt=""
          fill
          placeholder="blur"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[48%_40%] xl:object-[45%_50%]"
        />
      </div>
    </section>
  );
}
