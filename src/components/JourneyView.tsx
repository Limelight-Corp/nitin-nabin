"use client";

import React, { useState } from "react";
import { Language, MILESTONES } from "@/data/websiteData";
import { Reveal } from "@/components/Reveal";

interface JourneyViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const T = {
  eyebrow: { en: "Timeline", hi: "कालक्रम" },
  lede: {
    en: "Ten dated milestones between the 2006 by-election and the national presidency, filtered by the kind of responsibility each represents.",
    hi: "2006 के उपचुनाव से राष्ट्रीय अध्यक्ष पद तक के दस तिथिबद्ध पड़ाव, दायित्व के प्रकार के अनुसार छाँटे गए।",
  },
};

const FILTERS: { id: string; label: { en: string; hi: string } }[] = [
  { id: "All", label: { en: "All", hi: "सभी" } },
  { id: "Elections", label: { en: "Elections", hi: "चुनाव" } },
  { id: "Governance", label: { en: "Governance", hi: "शासन" } },
  { id: "Organisation", label: { en: "Organisation", hi: "संगठन" } },
  { id: "National Role", label: { en: "National Role", hi: "राष्ट्रीय" } },
];

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

export const JourneyView: React.FC<JourneyViewProps> = ({ lang }) => {
  const hi = lang === "hi";
  const tr = (o: { en: string; hi: string }) => (hi ? o.hi : o.en);
  const [filter, setFilter] = useState("All");

  const filtered = MILESTONES.filter((m) => filter === "All" || m.filter === filter);

  return (
    <div style={{ background: "#F7F4EE", color: "#171717" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]" style={{ background: "#FAE7D2" }}>
        <div
          className="max-w-[1680px] mx-auto"
          style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}
        >
          <Eyebrow num="02" label={tr(T.eyebrow)} />
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
            {hi ? "यात्रा" : "The Journey"}
          </h1>
          <p
            style={{
              font: "400 clamp(16px,1.2vw,19px)/1.72 'Archivo',sans-serif",
              color: "#3D3831",
              margin: "0 0 clamp(26px,3vw,40px)",
              maxWidth: "56ch",
            }}
          >
            {tr(T.lede)}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className="cursor-pointer"
                  style={{
                    font: "600 10px/1 'Archivo',sans-serif",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    padding: "12px 15px",
                    border: "1px solid rgba(23,23,23,.24)",
                    background: active ? "#E87518" : "transparent",
                    color: active ? "#171717" : "#3D3831",
                    transition: "background .18s ease, color .18s ease",
                  }}
                >
                  {tr(f.label)}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* ── List ─────────────────────────────────────────────── */}
      <Reveal as="section">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "0 clamp(20px,3vw,48px)" }}>
          {filtered.map((m, idx) => (
            <Reveal
              as="article"
              key={idx}
              delay={Math.min(idx * 60, 360)}
              className="grid"
              style={{
                borderTop: "1px solid rgba(23,23,23,.16)",
                padding: "clamp(28px,3.2vw,46px) 0",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
                gap: "clamp(18px,2.4vw,36px)",
              }}
            >
              <div>
                <p
                  className="font-serif-brand"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(48px,5.4vw,80px)",
                    lineHeight: 1,
                    letterSpacing: "-.03em",
                    color: "#E87518",
                    margin: "0 0 12px",
                  }}
                >
                  {m.year}
                </p>
                <p
                  style={{
                    font: "600 10px/1.4 'Archivo',sans-serif",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#7A7268",
                    margin: "0 0 8px",
                  }}
                >
                  {m.category[lang]}
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
                  {m.location[lang]}
                </p>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <h2
                  className="font-serif-brand"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(24px,2.4vw,34px)",
                    lineHeight: 1.14,
                    letterSpacing: "-.018em",
                    margin: "0 0 12px",
                  }}
                >
                  {m.title[lang]}
                </h2>
                <p style={{ font: "400 16px/1.72 'Archivo',sans-serif", color: "#3D3831", margin: "0 0 16px" }}>
                  {m.body[lang]}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    font: "500 12px/1.5 'Archivo',sans-serif",
                    color: "#3D3831",
                    background: "#EFE9DF",
                    padding: "6px 12px",
                  }}
                >
                  {m.record[lang]}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
};
