import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/seo";

export const alt = "Ernesto Vizcaíno, AI / Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mono = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

export default async function OpenGraphImage() {
  const avatar = await readFile(
    path.join(process.cwd(), "public", "profile.jpg"),
  );
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#fafafa",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #dedede 1px, transparent 0)",
          backgroundSize: "16px 16px",
          color: "#242424",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "56px 72px",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: 30,
            boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 24px 60px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "42px 48px",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              color: "#858585",
              display: "flex",
              fontSize: 18,
              justifyContent: "space-between",
              ...mono,
            }}
          >
            <span style={{ display: "flex" }}>Portfolio · 2026</span>
            <span style={{ display: "flex" }}>{profile.location}</span>
          </div>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 770,
              }}
            >
              <div style={{ alignItems: "center", display: "flex" }}>
                <div
                  style={{
                    border: "1px solid #dddddd",
                    borderRadius: 22,
                    display: "flex",
                    height: 104,
                    overflow: "hidden",
                    position: "relative",
                    width: 104,
                  }}
                >
                  <img
                    alt=""
                    src={avatarSrc}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "#10b981",
                    border: "5px solid #ffffff",
                    borderRadius: 999,
                    display: "flex",
                    height: 24,
                    marginLeft: -18,
                    marginTop: 82,
                    width: 24,
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 58,
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  marginTop: 30,
                }}
              >
                {profile.name}
              </div>
              <div
                style={{
                  color: "#717171",
                  display: "flex",
                  fontSize: 30,
                  letterSpacing: "-0.015em",
                  marginTop: 14,
                }}
              >
                {profile.role}
              </div>
            </div>

            <div
              style={{
                alignItems: "flex-start",
                borderLeft: "1px solid #e8e8e8",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                paddingLeft: 42,
                width: 238,
              }}
            >
              <span
                style={{
                  color: "#8a8a8a",
                  display: "flex",
                  fontSize: 15,
                  ...mono,
                }}
              >
                Building
              </span>
              {["AI products", "Full stack", "Fintech · SaaS"].map((item) => (
                <span
                  key={item}
                  style={{
                    color: "#444444",
                    display: "flex",
                    fontSize: 22,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              borderTop: "1px solid #ececec",
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 26,
            }}
          >
            <span
              style={{
                color: "#737373",
                display: "flex",
                fontSize: 20,
                maxWidth: 700,
              }}
            >
              From first idea to production, with useful products and measurable
              outcomes.
            </span>
            <span
              style={{
                color: "#555555",
                display: "flex",
                fontSize: 15,
                marginLeft: 36,
                ...mono,
              }}
            >
              {new URL(siteConfig.url).hostname}
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
