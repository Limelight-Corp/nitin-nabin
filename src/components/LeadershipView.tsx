"use client";

import React from "react";
import { Language, VALS_EN, VALS_HI } from "@/data/websiteData";
import { Reveal } from "@/components/Reveal";

interface LeadershipViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const T = {
  eyebrow: { en: "Responsibilities", hi: "दायित्व" },
  lede: {
    en: "Four fields of responsibility, each with its own record: the constituency, the ministries, the party organisation, and the national office.",
    hi: "दायित्व के चार क्षेत्र, प्रत्येक का अपना अभिलेख: निर्वाचन क्षेत्र, मंत्रालय, संगठन और राष्ट्रीय पद।",
  },
  keyResp: { en: "Key responsibilities", hi: "मुख्य दायित्व" },
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

export const LeadershipView: React.FC<LeadershipViewProps> = ({ lang }) => {
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
            <Eyebrow num="03" label={tr(T.eyebrow)} />
            <h1
              className="font-serif-brand"
              style={{
                fontWeight: 400,
                fontSize: "clamp(48px,8vw,124px)",
                lineHeight: 0.94,
                letterSpacing: "-.038em",
                margin: "0 0 26px",
              }}
            >
              {hi ? "नेतृत्व" : "Leadership"}
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
              src="/images/portrait-fields.avif"
              alt="Nitin Nabin, official portrait"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                maxHeight: "58vh",
                objectFit: "contain",
                objectPosition: "bottom",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>
      </Reveal>

      {/* ── Sections ─────────────────────────────────────────── */}
      {vals.leadSections.map((section, idx) => (
        <Reveal as="section" key={idx} style={{ borderBottom: "1px solid rgba(23,23,23,.16)" }}>
          <div
            className="max-w-[1680px] mx-auto grid"
            style={{
              padding: "clamp(40px,5vw,84px) clamp(20px,3vw,48px)",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
              gap: "clamp(28px,4vw,64px)",
            }}
          >
            <div>
              <p
                style={{
                  font: "600 10px/1 'Archivo',sans-serif",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#E87518",
                  margin: "0 0 16px",
                }}
              >
                {section.kicker}
              </p>
              <h2
                className="font-serif-brand"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(32px,3.6vw,56px)",
                  lineHeight: 1.05,
                  letterSpacing: "-.025em",
                  margin: "0 0 18px",
                }}
              >
                {section.title}
              </h2>
              <p style={{ font: "400 16px/1.72 'Archivo',sans-serif", color: "#3D3831", margin: 0, maxWidth: "48ch" }}>
                {section.overview}
              </p>
            </div>
            <div>
              <p
                style={{
                  font: "600 9.5px/1 'Archivo',sans-serif",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#7A7268",
                  margin: "0 0 14px",
                }}
              >
                {tr(T.keyResp)}
              </p>
              <ul className="list-none m-0 p-0">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="grid"
                    style={{
                      gridTemplateColumns: "110px 1fr",
                      gap: "16px",
                      padding: "13px 0",
                      borderBottom: "1px solid rgba(23,23,23,.14)",
                    }}
                  >
                    <span style={{ font: "500 12.5px/1.5 'Archivo',sans-serif", color: "#E87518" }}>
                      {item.when}
                    </span>
                    <span style={{ font: "400 15px/1.6 'Archivo',sans-serif", color: "#3D3831" }}>
                      {item.what}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};
