import { SectionHeading } from "./ui/section-heading";

const benefits = [
  {
    title: "Pengurusan bayaran lebih mudah",
    body: "Berpotensi mengurangkan bilangan bayaran dan tarikh yang perlu diingat setiap bulan.",
  },
  {
    title: "Komitmen bulanan lebih jelas",
    body: "Proses semakan membantu anda melihat gambaran penuh komitmen semasa.",
  },
  {
    title: "Ansuran bulanan mungkin lebih rendah",
    body: "Bergantung pada kelayakan, kadar, tempoh dan terma pembiayaan yang ditawarkan.",
  },
  {
    title: "Cashflow berpotensi lebih terurus",
    body: "Jika struktur bayaran baharu sesuai, ruang bajet bulanan mungkin lebih selesa.",
  },
  {
    title: "Pelan bayaran lebih tersusun",
    body: "Satu jadual bayaran yang jelas boleh memudahkan perancangan kewangan anda.",
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
    <section aria-labelledby="kelebihan-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="kelebihan-title" title="Apa Yang Mungkin Anda Dapat">
          <p>Setiap manfaat di bawah bergantung pada kelayakan dan terma sebenar, bukan jaminan.</p>
        </SectionHeading>

        <dl className="mt-10 border-t border-navy-900">
          {benefits.map(({ title, body }) => (
            <div
              key={title}
              className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[minmax(0,20rem)_1fr] sm:gap-10"
            >
              <dt className="font-serif text-xl leading-snug font-bold text-navy-950">{title}</dt>
              <dd className="max-w-prose leading-relaxed text-navy-700">{body}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-10">
          <h3 className="font-serif text-xl leading-snug font-bold text-navy-950">
            Sebelum membuat keputusan, bandingkan:
          </h3>
          <div>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {compareItems.map((item) => (
                <li key={item} className="border-b border-rule py-2.5 font-semibold text-navy-900">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-prose leading-relaxed text-navy-700">
              Ansuran bulanan yang lebih rendah tidak semestinya bermaksud jumlah kos yang lebih
              rendah.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
