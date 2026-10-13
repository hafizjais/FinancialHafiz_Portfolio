import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import headshot from "@/assets/hafiz-headshot.jpg";
import { siteConfig } from "@/lib/site";
import { WhatsAppIcon } from "./icons/brand-icons";
import { SocialLinks } from "./social-links";
import { buttonStyles } from "./ui/button-styles";
import { WhatsAppLink } from "./whatsapp-link";

const helpItems = [
  "Semak komitmen bulanan dan baki hutang semasa anda.",
  "Terangkan pilihan yang mungkin sesuai — termasuk had dan risikonya.",
  "Bantu anda faham langkah dan dokumen jika anda memilih untuk teruskan.",
];

export function About() {
  return (
    <section id="kenali-hafiz" aria-labelledby="kenali-title" className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-navy-100 bg-gradient-to-b from-navy-50 to-white p-6 text-center shadow-sm">
          <Image
            src={headshot}
            alt="Potret profesional Hafiz Jais"
            placeholder="blur"
            sizes="160px"
            className="mx-auto size-40 rounded-full object-cover object-top ring-4 ring-white shadow-lg"
          />
          <p className="mt-5 text-xl font-extrabold text-navy-950">{siteConfig.fullName}</p>
          <p className="mt-1 text-sm font-semibold text-gold-700">{siteConfig.role}</p>
          <p className="mt-0.5 text-sm text-navy-600">{siteConfig.brand}</p>
          <div className="mt-5 flex justify-center">
            <SocialLinks location="about" align="center" />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">Siapa saya</p>
          <h2 id="kenali-title" className="mt-2 text-[1.75rem] leading-tight font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Kenali Hafiz
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-navy-700 sm:text-lg">
            Saya membantu anda memahami situasi komitmen kewangan semasa dan menyemak pilihan yang
            mungkin sesuai, supaya anda boleh membuat keputusan dengan lebih jelas.
          </p>

          <ul className="mt-6 space-y-3">
            {helpItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-navy-800">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden="true" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-start gap-3 rounded-2xl bg-navy-50 p-4 text-sm leading-relaxed text-navy-800">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-navy-600" aria-hidden="true" />
            <span>
              <strong className="text-navy-950">Ketelusan:</strong> saya bukan bank, pemberi pinjaman
              atau wakil AKPK. Sebarang keputusan pembiayaan dibuat oleh bank atau institusi
              pembiayaan berkaitan selepas penilaian mereka.
            </span>
          </p>

          <div className="mt-7">
            <WhatsAppLink location="about" className={buttonStyles("primary", "lg", "w-full sm:w-auto")}>
              <WhatsAppIcon className="size-5" />
              Berbual Dengan Hafiz
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
