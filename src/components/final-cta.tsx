import { siteConfig } from "@/lib/site";
import { WhatsAppIcon } from "./icons/brand-icons";
import { SocialLinks } from "./social-links";
import { buttonStyles } from "./ui/button-styles";
import { WhatsAppLink } from "./whatsapp-link";

export function FinalCta() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-title"
      className="border-t-4 border-gold-400 bg-navy-900 py-16 text-white sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2
          id="final-cta-title"
          className="text-balance text-[1.9rem] leading-tight font-extrabold tracking-tight sm:text-5xl"
        >
          Jom Semak Situasi Kewangan Anda Dahulu.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-navy-100 sm:text-lg">
          Mulakan dengan perbualan ringkas. Kita semak maklumat asas dan fahami pilihan yang mungkin
          sesuai dengan profil anda.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <WhatsAppLink location="final_cta" className={buttonStyles("primary", "lg", "w-full sm:w-auto sm:px-10")}>
            <WhatsAppIcon className="size-5" />
            WhatsApp Hafiz Sekarang
          </WhatsAppLink>
          <p className="text-lg font-bold tracking-wide text-gold-200">{siteConfig.whatsapp.display}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <SocialLinks location="final_cta" tone="dark" align="center" />
        </div>

        <p className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-navy-200">
          Perbincangan awal bukan permohonan atau kelulusan pembiayaan. Sebarang pembiayaan adalah
          tertakluk kepada kelayakan, terma produk dan kelulusan pihak bank atau institusi pembiayaan
          berkaitan.
        </p>
      </div>
    </section>
  );
}
