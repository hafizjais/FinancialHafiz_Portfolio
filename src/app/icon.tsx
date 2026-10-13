import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const font = await readFile(join(process.cwd(), "src/assets/fonts/PlusJakartaSans-ExtraBold.ttf"));

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#10203f",
          color: "#ffd84f",
          fontSize: 30,
          fontWeight: 800,
          fontFamily: "Jakarta",
          letterSpacing: -1,
        }}
      >
        FH
      </div>
    ),
    { ...size, fonts: [{ name: "Jakarta", data: font, weight: 800, style: "normal" }] },
  );
}
