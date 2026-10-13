import { CalendarCheck, Eye, Map, TrendingDown, Waves, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./ui/section-heading";

const benefits: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: "Pengurusan bayaran lebih mudah",
    body: "Berpotensi mengurangkan bilangan bayaran dan tarikh yang perlu diingat setiap bulan.",
    Icon: CalendarCheck,
  },
  {
    title: "Komitmen bulanan lebih jelas",
    body: "Proses semakan membantu anda melihat gambaran penuh komitmen semasa.",
    Icon: Eye,
  },
  {
    title: "Ansuran bulanan mungkin lebih rendah",
    body: "Bergantung pada kelayakan, kadar, tempoh dan terma pembiayaan yang ditawarkan.",
    Icon: TrendingDown,
  },
  {
    title: "Cashflow berpotensi lebih terurus",
    body: "Jika struktur bayaran baharu sesuai, ruang bajet bulanan mungkin lebih selesa.",
    Icon: Waves,
  },
  {
    title: "Pelan bayaran lebih tersusun",
    body: "Satu jadual bayaran yang jelas boleh memudahkan perancangan kewangan anda.",
    Icon: Map,
  },
];

const compareItems = [
  "Kadar faedah / keuntungan",
  "Fi & caj",
  "Tempoh bayaran",
  "Amaun penyelesaian (settlement)",
  "Jumlah bayaran keseluruhan",
];

export function Benefits() {
  return (
    <section aria-labelledby="kelebihan-title" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="kelebihan-title" eyebrow="Potensi manfaat" title="Apa Yang Mungkin Anda Dapat">
          <p>Setiap manfaat di bawah bergantung pada kelayakan dan terma sebenar — bukan jaminan.</p>
        </SectionHeading>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map(({ title, body, Icon }) => (
            <li
              key={title}
              className="rounded-3xl border border-navy-100 bg-white p-5 shadow-[0_2px_16px_-8px_rgba(16,32,63,0.15)] transition-shadow hover:shadow-[0_8px_28px_-10px_rgba(16,32,63,0.25)]"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-navy-900 text-gold-300">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700">{body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-3xl bg-navy-50 p-5 sm:p-6">
          <h3 className="text-base font-bold text-navy-950">Sebelum membuat keputusan, bandingkan:</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {compareItems.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-navy-800 ring-1 ring-navy-100"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-navy-700">
            Ansuran bulanan yang lebih rendah tidak semestinya bermaksud jumlah kos yang lebih rendah.
          </p>
        </div>
      </div>
    </section>
  );
}
