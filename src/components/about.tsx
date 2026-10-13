import Image from "next/image";
import headshot from "@/assets/hafiz-headshot.jpg";
import { siteConfig } from "@/lib/site";
import { WhatsAppIcon } from "./icons/brand-icons";
import { SocialLinks } from "./social-links";
import { buttonStyles } from "./ui/button-styles";
import { WhatsAppLink } from "./whatsapp-link";

export function About() {
  return (
    <section id="kenali-hafiz" aria-labelledby="kenali-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[19rem_1fr] lg:gap-16">
        <div>
          <Image
            src={headshot}
            alt="Potret profesional Hafiz Jais"
            placeholder="blur"
            sizes="(min-width: 1024px) 304px, 60vw"
            className="aspect-[4/5] w-3/5 max-w-xs object-cover object-top lg:w-full"
          />
          <p className="mt-3 text-sm leading-snug text-navy-700">
            <span className="font-serif text-base font-bold text-navy-950">{siteConfig.fullName}</span>
            <br />
            {siteConfig.role}, {siteConfig.brand}
            <br />
            Kuala Lumpur, Johor, Penang dan Sabah
          </p>
        </div>

        <div>
          <h2 id="kenali-title" className="font-serif text-[1.85rem] leading-[1.15] font-bold tracking-tight text-navy-950 sm:text-[2.4rem]">
            Kenali Hafiz
          </h2>
          <div className="mt-5 max-w-prose space-y-4 text-[1.0625rem] leading-relaxed text-navy-800">
            <p>
              Saya membantu anda memahami situasi komitmen kewangan semasa dan menyemak pilihan yang
              mungkin sesuai, supaya anda boleh membuat keputusan dengan lebih jelas.
            </p>
            <p>
              Kita mula dengan menyemak komitmen bulanan dan baki hutang anda. Kemudian saya
              terangkan pilihan yang mungkin sesuai, termasuk had dan risikonya. Jika anda memilih
              untuk teruskan, saya bantu anda faham langkah dan dokumen yang diperlukan.
            </p>
            <p>
              Saya bukan bank, pemberi pinjaman atau wakil AKPK. Sebarang keputusan pembiayaan dibuat
              oleh bank atau institusi pembiayaan berkaitan selepas penilaian mereka.
            </p>
          </div>

          <p className="mt-6 font-hand text-4xl leading-none text-navy-900" aria-hidden="true">
            Hafiz
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <WhatsAppLink location="about" className={buttonStyles("primary", "lg", "w-full sm:w-auto")}>
              <WhatsAppIcon className="size-5" />
              Berbual Dengan Hafiz
            </WhatsAppLink>
            <SocialLinks location="about" />
          </div>
        </div>
      </div>
    </section>
  );
}
