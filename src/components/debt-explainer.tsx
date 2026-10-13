import { SectionHeading } from "./ui/section-heading";

const before = [
  { label: "Credit card A", date: "Bayar 5hb" },
  { label: "Credit card B", date: "Bayar 12hb" },
  { label: "Personal loan", date: "Bayar 25hb" },
];

export function DebtExplainer() {
  return (
    <section id="apa-itu" aria-labelledby="apa-itu-title" className="bg-mist py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="apa-itu-title" title="Apa Itu Debt Consolidation?">
          <p>
            Debt consolidation ialah konsep menggabungkan hutang tertentu ke dalam satu pembiayaan
            baharu, jika tersedia dan sesuai dengan profil pemohon. Tujuannya mungkin termasuk
            memudahkan pengurusan bayaran atau menyusun komitmen kewangan.
          </p>
        </SectionHeading>

        <div className="mt-10 grid gap-px bg-navy-900/15 lg:grid-cols-2">
          <figure className="bg-white p-6 sm:p-8">
            <figcaption className="font-serif text-xl font-bold text-navy-950">Sebelum</figcaption>
            <ul className="mt-5">
              {before.map(({ label, date }) => (
                <li key={label} className="flex items-baseline gap-3 py-2.5">
                  <span className="font-semibold text-navy-900">{label}</span>
                  <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-navy-300" />
                  <span className="text-sm font-semibold text-navy-700">{date}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-rule pt-4 text-navy-700">
              Pelbagai tarikh bayaran setiap bulan.
            </p>
          </figure>

          <figure className="flex flex-col bg-navy-900 p-6 text-white sm:p-8">
            <figcaption className="font-serif text-xl font-bold">Berpotensi selepas</figcaption>
            <ul className="mt-5">
              <li className="flex items-baseline gap-3 py-2.5">
                <span className="font-semibold">Satu pembiayaan baharu</span>
                <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-navy-400" />
              </li>
              <li className="flex items-baseline gap-3 py-2.5">
                <span className="font-semibold">Satu jadual bayaran bulanan</span>
                <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-navy-400" />
              </li>
            </ul>
            <p className="mt-auto border-t border-white/20 pt-4 text-navy-100">
              Jika produk tersedia dan permohonan diluluskan oleh pihak pembiayaan.
            </p>
          </figure>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <p className="max-w-prose leading-relaxed text-navy-800">
            <strong className="font-serif text-lg font-bold text-navy-950">
              Tidak semua hutang semestinya boleh digabungkan.
            </strong>{" "}
            Susunan sebenar bergantung kepada produk yang tersedia dan kelulusan pihak pembiayaan.
            Pinjaman perumahan, kereta atau PTPTN, misalnya, tidak boleh dianggap automatik termasuk.
          </p>
          <p className="max-w-prose leading-relaxed text-navy-800">
            <strong className="font-serif text-lg font-bold text-navy-950">Penting:</strong> satu
            bayaran tidak semestinya bermaksud kos keseluruhan lebih rendah. Tempoh bayaran yang
            lebih panjang boleh meningkatkan jumlah kos pembiayaan.
          </p>
        </div>
      </div>
    </section>
  );
}
