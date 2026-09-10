"use client";

import React from "react";
import { Language, VALS_EN, VALS_HI } from "@/data/websiteData";
import { Reveal } from "@/components/Reveal";

interface SpeechesViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const T = {
  eyebrow: { en: "Addresses", hi: "संबोधन" },
  lede: {
    en: "Addresses recorded in public reporting, with the occasion, date and venue as reported. Where no video or transcript exists in the archive, the card says so rather than inventing one.",
    hi: "सार्वजनिक रिपोर्टिंग में दर्ज संबोधन, अवसर, तिथि और स्थान सहित। जहाँ वीडियो या प्रतिलेख उपलब्ध नहीं है, वहाँ यह स्पष्ट रूप से दर्ज है।",
  },
  noVideo: { en: "Video — not on record", hi: "वीडियो — अभिलेख में नहीं" },
  noTranscript: { en: "Transcript — none", hi: "प्रतिलेख — उपलब्ध नहीं" },
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

export const SpeechesView: React.FC<SpeechesViewProps> = ({ lang }) => {
  const hi = lang === "hi";
  const vals = hi ? VALS_HI : VALS_EN;
  const tr = (o: { en: string; hi: string }) => (hi ? o.hi : o.en);
  const speeches = vals.speechList || [];

  return (
    <div style={{ background: "#F7F4EE", color: "#171717" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          <Eyebrow num="05" label={tr(T.eyebrow)} />
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
            {hi ? "भाषण" : "Speeches"}
          </h1>
          <p
            style={{
              font: "400 clamp(16px,1.2vw,19px)/1.72 'Archivo',sans-serif",
              color: "#3D3831",
              margin: 0,
              maxWidth: "60ch",
            }}
          >
            {tr(T.lede)}
          </p>
        </div>
      </Reveal>

      {/* ── List ─────────────────────────────────────────────── */}
      <Reveal as="section">
        <div
          className="max-w-[1680px] mx-auto"
          style={{ padding: "0 clamp(20px,3vw,48px)", borderTop: "2px solid #171717" }}
        >
          {speeches.map((s: any, idx: number) => (
            <Reveal
              as="article"
              key={idx}
              delay={Math.min(idx * 60, 360)}
              className="grid"
              style={{
                borderBottom: "1px solid rgba(23,23,23,.14)",
                padding: "clamp(26px,3vw,42px) 0",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                gap: "clamp(18px,2.4vw,36px)",
              }}
            >
              <div>
                <p
                  style={{
                    font: "600 10px/1 'Archivo',sans-serif",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#E87518",
                    margin: "0 0 12px",
                  }}
                >
                  {s.category}
                </p>
                <p
                  className="font-serif-brand"
                  style={{ fontWeight: 400, fontSize: "26px", lineHeight: 1.1, margin: "0 0 10px" }}
                >
                  {s.date}
                </p>
                <p
                  style={{
                    font: "500 11px/1.4 'Archivo',sans-serif",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#7A7268",
                    margin: 0,
                  }}
                >
                  {s.place}
                </p>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <h2
                  className="font-serif-brand"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(24px,2.2vw,32px)",
                    lineHeight: 1.16,
                    letterSpacing: "-.015em",
                    margin: "0 0 12px",
                  }}
                >
                  {s.title}
                </h2>
                <p style={{ font: "400 16px/1.72 'Archivo',sans-serif", color: "#3D3831", margin: "0 0 18px" }}>
                  {s.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    style={{
                      font: "600 10px/1 'Archivo',sans-serif",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "#7A7268",
                      border: "1px solid rgba(23,23,23,.24)",
                      padding: "8px 11px",
                    }}
                  >
                    {tr(T.noVideo)}
                  </span>
                  <span
                    style={{
                      font: "600 10px/1 'Archivo',sans-serif",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "#7A7268",
                      border: "1px solid rgba(23,23,23,.24)",
                      padding: "8px 11px",
                    }}
                  >
                    {tr(T.noTranscript)}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
};
