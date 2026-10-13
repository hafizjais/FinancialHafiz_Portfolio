import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dasar Privasi | Financial Hafiz",
  description: "Bagaimana Financial Hafiz mengendalikan maklumat yang anda kongsi melalui laman ini dan WhatsApp.",
  alternates: { canonical: "/privasi" },
};

// NOTE: This is a plain-language draft. Have it reviewed (e.g. against PDPA 2010 obligations)
// before running paid traffic, and update the "Dikemas kini" date whenever it changes.
const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Maklumat yang kami terima",
    body: [
      "Laman ini tidak mempunyai borang pendaftaran dan tidak menyimpan maklumat kewangan anda di pelayan.",
      "Alat Debt Snapshot berfungsi sepenuhnya dalam pelayar anda. Angka yang anda masukkan tidak disimpan dalam pelayar, tidak dihantar ke pelayan kami dan tidak dihantar ke sistem analitik. Maklumat itu hilang apabila anda menekan Reset, menutup atau memuat semula halaman.",
      "Jika anda menekan butang WhatsApp, aplikasi WhatsApp akan dibuka dengan mesej yang telah diisi. Mesej hanya dihantar jika anda sendiri menekan butang hantar dalam WhatsApp.",
    ],
  },
  {
    title: "2. Maklumat yang anda kongsi melalui WhatsApp atau email",
    body: [
      "Maklumat yang anda hantar (contohnya nama, nombor telefon, anggaran pendapatan dan komitmen) diterima oleh Hafiz dan digunakan hanya untuk menjawab pertanyaan anda serta membuat semakan awal bersama anda.",
      "Perbualan WhatsApp juga tertakluk kepada terma dan dasar privasi WhatsApp/Meta.",
      "Maklumat anda tidak akan dijual. Jika anda memilih untuk meneruskan permohonan pembiayaan, maklumat yang diperlukan hanya akan dikongsi dengan pihak bank atau institusi pembiayaan berkaitan dengan persetujuan anda.",
      "Jangan kongsi nombor IC penuh, kata laluan perbankan, PIN, TAC/OTP atau butiran kad melalui WhatsApp kepada sesiapa.",
    ],
  },
  {
    title: "3. Analitik dan cookies",
    body: [
      "Laman ini mungkin menggunakan alat analitik (contohnya Google Analytics atau Meta Pixel) untuk memahami prestasi laman secara agregat — contohnya bilangan lawatan dan klik butang. Data ini tidak termasuk maklumat kewangan yang anda masukkan.",
      "Parameter kempen (UTM) daripada pautan iklan mungkin disimpan sementara dalam sesi pelayar untuk tujuan atribusi kempen.",
      "Cookie \"fh_hero\" mungkin digunakan untuk memastikan anda melihat versi tajuk yang sama semasa ujian A/B. Ia hanya mengandungi nilai \"a\" atau \"b\".",
    ],
  },
  {
    title: "4. Simpanan dan hak anda",
    body: [
      "Perbualan disimpan selama yang diperlukan untuk tujuan perbincangan dan susulan. Anda boleh meminta untuk menyemak, membetulkan atau memadam maklumat yang telah anda kongsi pada bila-bila masa melalui WhatsApp atau email di bawah.",
    ],
  },
];

export default function PrivacyPage() {
  const policyIsExternal = /^https?:\/\//.test(siteConfig.privacyPolicyUrl);
  return (
    <div className="min-h-dvh bg-cream">
      <header className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-4 sm:px-6">
          <Link href="/" aria-label="Kembali ke laman utama Financial Hafiz">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-950"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke laman utama
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">Dasar Privasi</h1>
        <p className="mt-2 text-sm text-navy-600">Dikemas kini: 13 Oktober 2026</p>
        {policyIsExternal && (
          <p className="mt-4 rounded-xl bg-white p-4 text-sm text-navy-800 ring-1 ring-navy-100">
            Versi terkini dasar privasi boleh dibaca di{" "}
            <a href={siteConfig.privacyPolicyUrl} className="font-semibold underline">
              {siteConfig.privacyPolicyUrl}
            </a>
            .
          </p>
        )}

        <div className="mt-8 space-y-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy-100 sm:p-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-navy-950">{section.title}</h2>
              <div className="mt-2 space-y-3 leading-relaxed text-navy-700">
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          <section>
            <h2 className="text-lg font-bold text-navy-950">5. Hubungi</h2>
            <p className="mt-2 leading-relaxed text-navy-700">
              WhatsApp: {siteConfig.whatsapp.display}
              <br />
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold break-all text-navy-900 underline">
                {siteConfig.email}
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
