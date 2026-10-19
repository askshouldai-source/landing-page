import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ShouldAI: Should I? We'll tell you. A calm check-in before you spend.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          background: "linear-gradient(160deg, #5C4E9C 0%, #433C78 45%, #201A3C 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 40,
            top: -120,
            fontSize: 820,
            fontWeight: 800,
            color: "rgba(255,255,255,0.07)",
          }}
        >
          ?
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} width={72} height={72} style={{ borderRadius: 16 }} alt="" />
          <span style={{ fontSize: 44, fontWeight: 800 }}>ShouldAI</span>
        </div>
        <div style={{ marginTop: 56, fontSize: 96, fontWeight: 800, fontStyle: "italic", lineHeight: 1.05 }}>
          Should I? We&apos;ll tell you.
        </div>
        <div style={{ marginTop: 28, fontSize: 40, color: "rgba(255,255,255,0.8)" }}>
          A calm check-in before you spend.
        </div>
      </div>
    ),
    size,
  );
}
