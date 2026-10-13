import { AlertTriangle, ArrowRight, CalendarCheck, CalendarDays, CreditCard, HandCoins, Info, Landmark } from "lucide-react";
import { SectionHeading } from "./ui/section-heading";

const before = [
  { label: "Credit card A", date: "Bayar 5hb", Icon: CreditCard },
  { label: "Credit card B", date: "Bayar 12hb", Icon: CreditCard },
  { label: "Personal loan", date: "Bayar 25hb", Icon: HandCoins },
];

export function DebtExplainer() {
  return (
    <section id="apa-itu" aria-labelledby="apa-itu-title" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="apa-itu-title" eyebrow="Faham dahulu" title="Apa Itu Debt Consolidation?">
          <p>
            Debt consolidation ialah konsep menggabungkan hutang tertentu ke dalam satu pembiayaan
            baharu, jika tersedia dan sesuai dengan profil pemohon. Tujuannya mungkin termasuk
            memudahkan pengurusan bayaran atau menyusun komitmen kewangan.
          </p>
        </SectionHeading>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          {/* BEFORE */}
          <figure className="rounded-3xl border border-navy-100 bg-white p-5 shadow-sm sm:p-6">
            <figcaption className="text-xs font-bold uppercase tracking-[0.18em] text-navy-500">
              Sebelum
            </figcaption>
            <ul className="mt-4 space-y-2.5">
              {before.map(({ label, date, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-navy-50/60 px-4 py-3"
                >
                  <Icon className="size-5 shrink-0 text-navy-600" aria-hidden="true" />
                  <span className="flex-1 font-semibold text-navy-900">{label}</span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-navy-600 ring-1 ring-navy-100">
                    {date}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-navy-700">
              <CalendarDays className="size-4 text-navy-500" aria-hidden="true" />
              Pelbagai tarikh bayaran setiap bulan
            </p>
          </figure>

          <div className="flex items-center justify-center" aria-hidden="true">
            <span className="grid size-12 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-md">
              <ArrowRight className="size-5 rotate-90 lg:rotate-0" />
            </span>
          </div>

          {/* POTENTIAL AFTER */}
          <figure className="flex flex-col rounded-3xl bg-navy-900 p-5 text-white shadow-lg sm:p-6">
            <figcaption className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
              Berpotensi selepas
            </figcaption>
            <ul className="mt-4 space-y-2.5">
              <li className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                <Landmark className="size-5 shrink-0 text-gold-300" aria-hidden="true" />
                <span className="font-semibold">Satu pembiayaan baharu</span>
              </li>
              <li className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                <CalendarCheck className="size-5 shrink-0 text-gold-300" aria-hidden="true" />
                <span className="font-semibold">Satu jadual bayaran bulanan</span>
              </li>
            </ul>
            <p className="mt-auto pt-4 text-sm text-navy-200">
              Jika produk tersedia dan permohonan diluluskan oleh pihak pembiayaan.
            </p>
          </figure>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex gap-3 rounded-2xl border border-navy-100 bg-white p-4 sm:p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-navy-600" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-navy-800">
              <strong className="font-bold text-navy-950">Tidak semua hutang semestinya boleh digabungkan.</strong>{" "}
              Susunan sebenar bergantung kepada produk yang tersedia dan kelulusan pihak pembiayaan.
              Pinjaman perumahan, kereta atau PTPTN, misalnya, tidak boleh dianggap automatik
              termasuk.
            </p>
          </div>
          <div className="flex gap-3 rounded-2xl border border-gold-300 bg-gold-50 p-4 sm:p-5">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-gold-700" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-navy-800">
              <strong className="font-bold text-navy-950">Penting:</strong> satu bayaran tidak
              semestinya bermaksud kos keseluruhan lebih rendah. Tempoh bayaran yang lebih panjang
              boleh meningkatkan jumlah kos pembiayaan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
