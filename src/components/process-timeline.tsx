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
    body: "Kita bincangkan pilihan yang mungkin sesuai, termasuk had dan risikonya.",
  },
  {
    title: "Tentukan langkah seterusnya",
    body: "Jika sesuai, teruskan dengan semakan dokumen dan proses permohonan pihak pembiayaan berkaitan.",
  },
];

export function ProcessTimeline() {
  return (
    <section id="cara" aria-labelledby="cara-title" className="bg-navy-950 py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="cara-title" title="4 Langkah Mudah" tone="dark">
            <p>Proses yang jelas, tanpa tekanan. Anda tentukan sama ada mahu teruskan.</p>
          </SectionHeading>
          <p className="mt-8 max-w-sm leading-relaxed text-navy-100">
            <strong className="text-white">Semakan awal bukan kelulusan pembiayaan.</strong> Keputusan
            akhir dibuat oleh bank atau institusi pembiayaan selepas penilaian rasmi.
          </p>
          <WhatsAppLink location="process" className={buttonStyles("primary", "lg", "mt-6 w-full sm:w-auto")}>
            <WhatsAppIcon className="size-5" />
            Mulakan Langkah 1 di WhatsApp
          </WhatsAppLink>
        </div>

        <ol className="border-t border-white/30">
          {steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-white/15 py-6 sm:grid-cols-[5rem_1fr]">
              <span aria-hidden="true" className="font-serif text-5xl leading-none font-bold text-gold-400 sm:text-6xl">
                {index + 1}
              </span>
              <div>
                <h3 className="font-serif text-xl font-bold sm:text-2xl">{step.title}</h3>
                <p className="mt-1.5 max-w-prose leading-relaxed text-navy-100">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
