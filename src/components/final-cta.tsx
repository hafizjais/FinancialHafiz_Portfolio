import { siteConfig } from "@/lib/site";
import { WhatsAppIcon } from "./icons/brand-icons";
import { SocialLinks } from "./social-links";
import { buttonStyles } from "./ui/button-styles";
import { WhatsAppLink } from "./whatsapp-link";

export function FinalCta() {
  return (
    <section id="final-cta" aria-labelledby="final-cta-title" className="bg-navy-900 py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
        <div>
          <h2
            id="final-cta-title"
            className="max-w-xl font-serif text-[2rem] leading-[1.12] font-bold tracking-tight text-balance sm:text-5xl"
          >
            Jom Semak Situasi Kewangan Anda Dahulu.
          </h2>
          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-navy-100">
            Mulakan dengan perbualan ringkas. Kita semak maklumat asas dan fahami pilihan yang mungkin
            sesuai dengan profil anda.
          </p>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-navy-200">
            Perbincangan awal bukan permohonan atau kelulusan pembiayaan. Sebarang pembiayaan adalah
            tertakluk kepada kelayakan, terma produk dan kelulusan pihak bank atau institusi pembiayaan
            berkaitan.
          </p>
        </div>

        <div className="border-t border-white/30 pt-6">
          <p className="font-serif text-3xl font-bold text-gold-300 sm:text-4xl">{siteConfig.whatsapp.display}</p>
          <WhatsAppLink location="final_cta" className={buttonStyles("primary", "lg", "mt-5 w-full sm:w-auto")}>
            <WhatsAppIcon className="size-5" />
            WhatsApp Hafiz Sekarang
          </WhatsAppLink>
          <div className="mt-4">
            <SocialLinks location="final_cta" tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
