import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import { WhatsAppLink } from "./whatsapp-link";

export function Footer() {
  const policyIsExternal = /^https?:\/\//.test(siteConfig.privacyPolicyUrl);
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-28 sm:px-6 md:pb-12">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              {siteConfig.person} — perbincangan awal dan semakan profil komitmen kewangan untuk
              debt consolidation.
            </p>
            <p className="mt-4 text-sm">
              WhatsApp:{" "}
              <WhatsAppLink location="footer" className="inline-flex min-h-11 items-center font-bold text-white underline-offset-4 hover:underline">
                {siteConfig.whatsapp.display}
              </WhatsAppLink>
            </p>
            <p className="text-sm">
              Email:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-11 items-center font-semibold break-all text-white underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
            <div className="mt-5">
              <SocialLinks location="footer" tone="dark" />
            </div>
          </div>

          <div className="space-y-6 text-xs leading-relaxed">
            <div id="notis-privasi">
              <h2 className="text-sm font-bold text-white">Notis privasi ringkas</h2>
              <p className="mt-2">
                Laman ini tidak menyimpan maklumat kewangan yang anda masukkan dalam Debt Snapshot —
                pengiraan berlaku dalam pelayar anda sahaja dan maklumat tersebut tidak dihantar ke
                sistem analitik. Jika anda memilih untuk menghantar maklumat melalui WhatsApp, mesej
                itu akan diterima oleh Hafiz dan tertakluk kepada terma serta dasar privasi WhatsApp.
                Maklumat tersebut digunakan hanya untuk menjawab pertanyaan dan membuat semakan awal
                bersama anda. Jangan kongsi nombor IC penuh, kata laluan, PIN, TAC/OTP atau butiran kad.
              </p>
              <p className="mt-2">
                <a
                  href={siteConfig.privacyPolicyUrl}
                  {...(policyIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-4"
                >
                  Baca dasar privasi penuh
                </a>
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Penafian</h2>
              <p className="mt-2">
                {siteConfig.brand} menyediakan perbincangan awal dan semakan profil kewangan secara
                umum. {siteConfig.person} bukan bank, pemberi pinjaman atau wakil AKPK. Maklumat di
                laman ini bukan nasihat kewangan peribadi. Sebarang pembiayaan adalah tertakluk kepada
                kelayakan, terma produk serta penilaian dan kelulusan pihak bank atau institusi
                pembiayaan berkaitan. Tiada jaminan kelulusan, ansuran lebih rendah, penambahbaikan
                DSR atau penjimatan kos.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-navy-300">
          © {siteConfig.brand}. Hak cipta terpelihara.
        </p>
      </div>
    </footer>
  );
}
