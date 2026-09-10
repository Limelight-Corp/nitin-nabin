"use client";

import React from "react";
import { Language, VALS_EN, VALS_HI } from "@/data/websiteData";
import { Reveal } from "@/components/Reveal";

interface AboutViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const T = {
  eyebrow: { en: "About", hi: "परिचय" },
  contents: { en: "Contents", hi: "विषय-सूची" },
  lede: {
    en: "A complete account of the public record: where he began, the seats he has held, the portfolios he has run, and the organisational offices that led to the national presidency.",
    hi: "सार्वजनिक अभिलेख का पूरा विवरण: आरंभ, निर्वाचन क्षेत्र, मंत्रालय और वे संगठनात्मक दायित्व जो राष्ट्रीय अध्यक्ष पद तक ले गए।",
  },
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

export const AboutView: React.FC<AboutViewProps> = ({ lang }) => {
  const hi = lang === "hi";
  const vals = hi ? VALS_HI : VALS_EN;
  const tr = (o: { en: string; hi: string }) => (hi ? o.hi : o.en);

  return (
    <div style={{ background: "#F7F4EE", color: "#171717" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]">
        <div
          className="max-w-[1680px] mx-auto grid items-end"
          style={{
            padding: "clamp(30px,4vw,58px) clamp(20px,3vw,48px) 0",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
            gap: "clamp(20px,3vw,56px)",
          }}
        >
          <div style={{ paddingBottom: "clamp(34px,4vw,70px)" }}>
            <Eyebrow num="01" label={tr(T.eyebrow)} />
            <h1
              className="font-serif-brand"
              style={{
                fontWeight: 400,
                fontSize: "clamp(46px,7vw,110px)",
                lineHeight: 0.95,
                letterSpacing: "-.035em",
                margin: "0 0 26px",
                maxWidth: "12ch",
              }}
            >
              {hi ? "सार्वजनिक जीवन की यात्रा" : "A Life in Public Service"}
            </h1>
            <p
              style={{
                font: "400 clamp(16px,1.2vw,19px)/1.72 'Archivo',sans-serif",
                color: "#3D3831",
                margin: 0,
                maxWidth: "54ch",
              }}
            >
              {tr(T.lede)}
            </p>
          </div>
          <div style={{ background: "#F7F4EE", isolation: "isolate" }}>
            <img
              src="/images/portrait-bio.avif"
              alt="Nitin Nabin, documentary portrait"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                maxHeight: "62vh",
                objectFit: "contain",
                objectPosition: "bottom",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>
      </Reveal>

      {/* ── Contents + Body ─────────────────────────────────── */}
      <Reveal as="section">
        <div
          className="max-w-[1680px] mx-auto grid"
          style={{
            padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
            gap: "clamp(32px,5vw,72px)",
          }}
        >
          <nav data-sticky="" style={{ position: "sticky", top: "110px", alignSelf: "start" }}>
            <p
              style={{
                font: "600 10.5px/1 'Archivo',sans-serif",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#7A7268",
                margin: "0 0 18px",
              }}
            >
              {tr(T.contents)}
            </p>
            <ul className="list-none m-0 p-0" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {vals.bioSections.map((b) => (
                <li key={b.id}>
                  <a
                    href={`#${b.id}`}
                    className="flex items-baseline gap-2.5"
                    style={{
                      textDecoration: "none",
                      color: "#171717",
                      transition: "color .18s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#E87518")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#171717")}
                  >
                    <span style={{ font: "500 11px/1.4 'Archivo',sans-serif", color: "#7A7268" }}>
                      {b.num}
                    </span>
                    <span style={{ font: "500 14px/1.4 'Archivo',sans-serif" }}>{b.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ gridColumn: "span 2", maxWidth: "74ch" }}>
            {vals.bioSections.map((b, idx) => (
              <Reveal
                as="article"
                key={b.id}
                id={b.id}
                delay={Math.min(idx * 60, 360)}
                style={{
                  scrollMarginTop: "110px",
                  borderBottom:
                    idx === vals.bioSections.length - 1
                      ? "none"
                      : "1px solid rgba(23,23,23,.16)",
                  padding: idx === 0 ? "0 0 clamp(28px,3.2vw,44px)" : "clamp(28px,3.2vw,44px) 0",
                }}
              >
                <p
                  style={{
                    font: "600 12px/1 'Archivo',sans-serif",
                    letterSpacing: ".14em",
                    color: "#E87518",
                    margin: "0 0 14px",
                  }}
                >
                  {b.num}
                </p>
                <h2
                  className="font-serif-brand"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(26px,2.8vw,40px)",
                    lineHeight: 1.1,
                    letterSpacing: "-.02em",
                    margin: "0 0 16px",
                  }}
                >
                  {b.title}
                </h2>
                <p style={{ font: "400 17px/1.75 'Archivo',sans-serif", color: "#3D3831", margin: 0 }}>
                  {b.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};
