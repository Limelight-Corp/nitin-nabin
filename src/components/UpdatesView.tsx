"use client";

import React from "react";
import { Language, UPDATES } from "@/data/websiteData";
import { Reveal } from "@/components/Reveal";

interface UpdatesViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const T = {
  eyebrow: { en: "Newsroom", hi: "समाचार कक्ष" },
  lede: {
    en: "Engagements and statements reported since taking national office in January 2026.",
    hi: "जनवरी 2026 में राष्ट्रीय पद ग्रहण करने के बाद से रिपोर्ट किए गए कार्यक्रम और वक्तव्य।",
  },
  featured: { en: "Featured", hi: "प्रमुख" },
};

function Eyebrow({
  num,
  label,
  color = "#7A7268",
}: {
  num: string;
  label: string;
  color?: string;
}) {
  return (
    <p
      style={{
        font: "600 10.5px/1 'Archivo',sans-serif",
        letterSpacing: ".2em",
        textTransform: "uppercase",
        color,
        margin: "0 0 22px",
      }}
    >
      <span style={{ color: "#E87518" }}>{num} — </span>
      <span>{label}</span>
    </p>
  );
}

export const UpdatesView: React.FC<UpdatesViewProps> = ({ lang }) => {
  const hi = lang === "hi";
  const tr = (o: { en: string; hi: string }) => (hi ? o.hi : o.en);
  const featured = UPDATES[0];
  const rest = UPDATES.slice(1);

  return (
    <div style={{ background: "#F7F4EE", color: "#171717" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          <Eyebrow num="07" label={tr(T.eyebrow)} />
          <h1
            className="font-serif-brand"
            style={{
              fontWeight: 400,
              fontSize: "clamp(48px,8vw,124px)",
              lineHeight: 0.96,
              letterSpacing: "-.035em",
              margin: "0 0 20px",
            }}
          >
            {hi ? "अपडेट" : "Updates"}
          </h1>
          <p
            style={{
              font: "400 clamp(16px,1.2vw,19px)/1.72 'Archivo',sans-serif",
              color: "#3D3831",
              margin: 0,
              maxWidth: "58ch",
            }}
          >
            {tr(T.lede)}
          </p>
        </div>
      </Reveal>

      {/* ── Featured ─────────────────────────────────────────── */}
      {featured && (
        <Reveal
          as="section"
          className="max-w-[1680px] mx-auto grid"
          style={{
            padding: "clamp(36px,4.4vw,64px) clamp(20px,3vw,48px)",
            borderTop: "2px solid #171717",
            borderBottom: "1px solid rgba(23,23,23,.16)",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
            gap: "clamp(24px,3.4vw,52px)",
          }}
        >
          <div>
            <p style={{ font: "600 10px/1 'Archivo',sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#E87518", margin: "0 0 14px" }}>
              {featured.category[lang]} · {tr(T.featured)}
            </p>
            <h2
              className="font-serif-brand"
              style={{ fontWeight: 400, fontSize: "clamp(30px,3vw,44px)", lineHeight: 1.1, letterSpacing: "-.02em", margin: "0 0 12px" }}
            >
              {featured.title[lang]}
            </h2>
            <p style={{ font: "500 11px/1.4 'Archivo',sans-serif", letterSpacing: ".08em", textTransform: "uppercase", color: "#7A7268", margin: 0 }}>
              {featured.date} · {featured.location[lang]}
            </p>
          </div>
          <div>
            <p style={{ font: "400 17px/1.75 'Archivo',sans-serif", color: "#3D3831", margin: 0, maxWidth: "50ch" }}>
              {featured.summary[lang]}
            </p>
          </div>
        </Reveal>
      )}

      {/* ── Rest ─────────────────────────────────────────────── */}
      <Reveal as="section">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(36px,4.4vw,64px) clamp(20px,3vw,48px)" }}>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,290px),1fr))",
              gap: "1px",
              background: "rgba(23,23,23,.18)",
              border: "1px solid rgba(23,23,23,.18)",
            }}
          >
            {rest.map((u, idx) => (
              <Reveal
                as="article"
                key={idx}
                delay={Math.min(idx * 60, 360)}
                className="flex flex-col"
                style={{ background: "#F7F4EE", padding: "clamp(20px,2vw,28px)" }}
              >
                <div className="flex items-center justify-between gap-3" style={{ marginBottom: "14px" }}>
                  <span style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#E87518" }}>
                    {u.category[lang]}
                  </span>
                  <span style={{ font: "500 11px/1 'Archivo',sans-serif", color: "#7A7268" }}>{u.date}</span>
                </div>
                <h3 className="font-serif-brand" style={{ fontWeight: 400, fontSize: "21px", lineHeight: 1.2, margin: "0 0 10px" }}>
                  {u.title[lang]}
                </h3>
                <p style={{ font: "400 14.5px/1.62 'Archivo',sans-serif", color: "#3D3831", margin: 0, flex: 1 }}>
                  {u.summary[lang]}
                </p>
                <p
                  style={{
                    font: "500 11px/1.4 'Archivo',sans-serif",
                    color: "#7A7268",
                    margin: 0,
                    paddingTop: "14px",
                    marginTop: "14px",
                    borderTop: "1px solid rgba(23,23,23,.14)",
                  }}
                >
                  {u.location[lang]}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};
