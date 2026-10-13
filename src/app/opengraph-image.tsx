import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = "Debt Consolidation Malaysia bersama Hafiz — semak komitmen kewangan anda melalui WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const assets = join(process.cwd(), "src/assets");

const [extraBold, semiBold, portrait] = await Promise.all([
  readFile(join(assets, "fonts/PlusJakartaSans-ExtraBold.ttf")),
  readFile(join(assets, "fonts/PlusJakartaSans-SemiBold.ttf")),
  readFile(join(assets, "hafiz-portrait.jpg")),
]);
const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#10203f",
          fontFamily: "Jakarta",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            width: 760,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#0a152c",
                border: "2px solid rgba(249,198,43,0.5)",
                color: "#ffd84f",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              FH
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, color: "#ffd84f" }}>{siteConfig.brand}</div>
          </div>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.05, marginTop: 30, letterSpacing: -1.5 }}>
            Debt Consolidation Malaysia
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.35, marginTop: 22, color: "#c3d0ea" }}>
            Semak komitmen kewangan & fahami pilihan yang mungkin sesuai untuk anda.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              padding: "16px 28px",
              borderRadius: 999,
              background: "#f9c62b",
              color: "#0a152c",
              fontSize: 28,
              fontWeight: 800,
              alignSelf: "flex-start",
            }}
          >
            WhatsApp {siteConfig.whatsapp.display}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 48 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            src={portraitSrc}
            width={366}
            height={488}
            style={{ borderRadius: 32, border: "6px solid white", objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: extraBold, weight: 800, style: "normal" },
        { name: "Jakarta", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
