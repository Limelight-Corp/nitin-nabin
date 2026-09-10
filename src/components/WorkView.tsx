"use client";

import React, { useState } from "react";
import { Language, VALS_EN, VALS_HI, UPDATES } from "@/data/websiteData";
import { Reveal } from "@/components/Reveal";

interface WorkViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const T = {
  eyebrow: { en: "Public Record", hi: "सार्वजनिक अभिलेख" },
  lede: {
    en: "An archive of dated public activity — offices assumed and engagements reported. Departmental programmes are excluded until each can be sourced to a government record.",
    hi: "तिथिबद्ध सार्वजनिक गतिविधि का संग्रह — ग्रहण किए गए पद और रिपोर्ट किए गए कार्यक्रम। विभागीय योजनाएँ तब तक शामिल नहीं हैं जब तक उनका सरकारी स्रोत उपलब्ध न हो।",
  },
  office: { en: "Office", hi: "पद" },
  empty: {
    en: "No entries in this category yet.",
    hi: "इस श्रेणी में अभी कोई प्रविष्टि नहीं है।",
  },
};

const FILTERS: { id: string; label: { en: string; hi: string } }[] = [
  { id: "All", label: { en: "All", hi: "सभी" } },
  { id: "Elections", label: { en: "Elections", hi: "चुनाव" } },
  { id: "Governance", label: { en: "Governance", hi: "शासन" } },
  { id: "Organisation", label: { en: "Organisation", hi: "संगठन" } },
  { id: "National Role", label: { en: "National Role", hi: "राष्ट्रीय" } },
  { id: "Public Events", label: { en: "Public Events", hi: "सार्वजनिक कार्यक्रम" } },
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

interface Entry {
  category: string;
  date: string;
  title: string;
  body: string;
  location: string;
  cat?: string;
}

const OFFICE_CAT_FALLBACK: Record<number, string> = {
  0: "Elections",
  1: "Elections",
  2: "Organisation",
  3: "Governance",
  4: "Organisation",
  5: "Governance",
  6: "Governance",
  7: "National Role",
  8: "National Role",
};

export const WorkView: React.FC<WorkViewProps> = ({ lang }) => {
  const hi = lang === "hi";
  const vals = hi ? VALS_HI : VALS_EN;
  const tr = (o: { en: string; hi: string }) => (hi ? o.hi : o.en);
  const [filter, setFilter] = useState("All");

  const officeEntries: Entry[] = vals.offices.map((o, idx) => ({
    category: tr(T.office),
    date: o.period,
    title: o.title,
    body: o.body,
    location: o.body,
    cat: o.cat || OFFICE_CAT_FALLBACK[idx],
  }));

  const updateEntries: Entry[] = UPDATES.map((u) => ({
    category: u.category[lang],
    date: u.date,
    title: u.title[lang],
    body: u.summary[lang],
    location: u.location[lang],
    cat: u.cat,
  }));

  const all = [...officeEntries, ...updateEntries];
  const filtered = all.filter((e) => filter === "All" || e.cat === filter);

  return (
    <div style={{ background: "#F7F4EE", color: "#171717" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          <Eyebrow num="04" label={tr(T.eyebrow)} />
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
            {hi ? "कार्य एवं पहल" : "Work & Initiatives"}
          </h1>
          <p
            style={{
              font: "400 clamp(16px,1.2vw,19px)/1.72 'Archivo',sans-serif",
              color: "#3D3831",
              margin: "0 0 clamp(26px,3vw,40px)",
              maxWidth: "62ch",
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

      {/* ── Card grid ────────────────────────────────────────── */}
      <Reveal as="section">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          {filtered.length === 0 ? (
            <p style={{ font: "400 15px/1.6 'Archivo',sans-serif", color: "#7A7268" }}>{tr(T.empty)}</p>
          ) : (
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,290px),1fr))",
                gap: "1px",
                background: "rgba(23,23,23,.18)",
                border: "1px solid rgba(23,23,23,.18)",
              }}
            >
              {filtered.map((e, idx) => (
                <Reveal
                  as="article"
                  key={idx}
                  delay={Math.min(idx * 60, 360)}
                  className="flex flex-col"
                  style={{ background: "#F7F4EE", padding: "clamp(20px,2vw,28px)" }}
                >
                  <div className="flex items-center justify-between gap-3" style={{ marginBottom: "14px" }}>
                    <span
                      style={{
                        font: "600 9.5px/1 'Archivo',sans-serif",
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "#E87518",
                      }}
                    >
                      {e.category}
                    </span>
                    <span style={{ font: "500 11px/1 'Archivo',sans-serif", color: "#7A7268" }}>{e.date}</span>
                  </div>
                  <h3
                    className="font-serif-brand"
                    style={{ fontWeight: 400, fontSize: "21px", lineHeight: 1.2, margin: "0 0 10px" }}
                  >
                    {e.title}
                  </h3>
                  <p style={{ font: "400 14.5px/1.62 'Archivo',sans-serif", color: "#3D3831", margin: 0, flex: 1 }}>
                    {e.body}
                  </p>
                  <p
                    style={{
                      font: "500 11px/1.4 'Archivo',sans-serif",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "#7A7268",
                      margin: 0,
                      paddingTop: "14px",
                      marginTop: "14px",
                      borderTop: "1px solid rgba(23,23,23,.14)",
                    }}
                  >
                    {e.location}
                  </p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
};
