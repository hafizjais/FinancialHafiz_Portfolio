import { ShieldAlert } from "lucide-react";
import { WhatsAppIcon } from "./icons/brand-icons";
import { buttonStyles } from "./ui/button-styles";
import { SectionHeading } from "./ui/section-heading";
import { WhatsAppLink } from "./whatsapp-link";

const steps = [
  {
    title: "Kenali situasi anda",
    body: "Anda kongsikan maklumat asas tentang pendapatan dan komitmen semasa.",
  },
  {
    title: "Semak profil kewangan",
    body: "Kita semak pendapatan, kemudahan sedia ada, baki tertunggak dan komitmen bulanan.",
  },
  {
    title: "Fahami pilihan",
    body: "Kita bincangkan pilihan yang mungkin sesuai — termasuk had dan risikonya.",
  },
  {
    title: "Tentukan langkah seterusnya",
    body: "Jika sesuai, teruskan dengan semakan dokumen dan proses permohonan pihak pembiayaan berkaitan.",
  },
];

export function ProcessTimeline() {
  return (
    <section id="cara" aria-labelledby="cara-title" className="bg-navy-950 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="cara-title" eyebrow="Cara ia berfungsi" title="4 Langkah Mudah" tone="dark">
          <p>Proses yang jelas, tanpa tekanan. Anda tentukan sama ada mahu teruskan.</p>
        </SectionHeading>

        <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-gold-400/0 via-gold-400/60 to-gold-400/0 md:block"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-gold-400 text-lg font-extrabold text-navy-950 ring-8 ring-navy-950">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-200">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-5">
          <p className="flex max-w-xl items-start gap-2.5 rounded-2xl bg-white/5 px-4 py-3 text-sm leading-relaxed text-navy-100 ring-1 ring-white/10">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-gold-300" aria-hidden="true" />
            <span>
              <strong className="text-white">Semakan awal bukan kelulusan pembiayaan.</strong> Keputusan
              akhir dibuat oleh bank atau institusi pembiayaan selepas penilaian rasmi.
            </span>
          </p>
          <WhatsAppLink location="process" className={buttonStyles("primary", "lg", "w-full sm:w-auto")}>
            <WhatsAppIcon className="size-5" />
            Mulakan Langkah 1 di WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
