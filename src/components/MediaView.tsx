"use client";

import React, { useState } from "react";
import { Language, VALS_EN, VALS_HI, PRESS } from "@/data/websiteData";
import { Reveal } from "@/components/Reveal";

interface MediaViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

type Tab = "press" | "photos" | "videos" | "documents";

const T = {
  eyebrow: { en: "Media Library", hi: "मीडिया संग्रह" },
  tabs: {
    press: { en: "Press", hi: "प्रेस" },
    photos: { en: "Photos", hi: "तस्वीरें" },
    videos: { en: "Videos", hi: "वीडियो" },
    documents: { en: "Documents", hi: "दस्तावेज़" },
  },
  pressIntro: {
    en: "Reference links to the original publications. Headlines are reproduced as published; no article is republished here.",
    hi: "मूल प्रकाशनों के संदर्भ लिंक। शीर्षक यथावत हैं; कोई लेख यहाँ पुनःप्रकाशित नहीं किया गया है।",
  },
  videosTitle: {
    en: "No video is held in this archive yet.",
    hi: "इस संग्रह में अभी कोई वीडियो नहीं है।",
  },
  videosBody: {
    en: "Speech and event video will appear here once official recordings are supplied. Nothing has been sourced from third-party uploads.",
    hi: "आधिकारिक रिकॉर्डिंग मिलने पर भाषण और कार्यक्रम के वीडियो यहाँ दिखाई देंगे। तृतीय-पक्ष अपलोड से कुछ नहीं लिया गया है।",
  },
  documentsTitle: {
    en: "No documents have been published yet.",
    hi: "अभी कोई दस्तावेज़ प्रकाशित नहीं हुआ है।",
  },
  documentsBody: {
    en: "Affidavits, departmental orders and official releases will be listed here with their issuing authority and date.",
    hi: "शपथपत्र, विभागीय आदेश और आधिकारिक विज्ञप्तियाँ यहाँ जारीकर्ता प्राधिकरण और तिथि के साथ सूचीबद्ध होंगी।",
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

export const MediaView: React.FC<MediaViewProps> = ({ lang }) => {
  const hi = lang === "hi";
  const vals = hi ? VALS_HI : VALS_EN;
  const tr = (o: { en: string; hi: string }) => (hi ? o.hi : o.en);
  const [tab, setTab] = useState<Tab>("press");

  const tabList: Tab[] = ["press", "photos", "videos", "documents"];

  return (
    <div style={{ background: "#F7F4EE", color: "#171717" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          <Eyebrow num="06" label={tr(T.eyebrow)} />
          <h1
            className="font-serif-brand"
            style={{
              fontWeight: 400,
              fontSize: "clamp(48px,8vw,124px)",
              lineHeight: 0.96,
              letterSpacing: "-.035em",
              margin: "0 0 clamp(26px,3vw,40px)",
            }}
          >
            {hi ? "मीडिया" : "Media"}
          </h1>

          <div className="flex flex-wrap gap-6" style={{ borderBottom: "1px solid rgba(23,23,23,.16)" }}>
            {tabList.map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="cursor-pointer"
                  style={{
                    background: "transparent",
                    border: 0,
                    borderBottom: active ? "2px solid #E87518" : "2px solid transparent",
                    padding: "0 0 14px",
                    font: "600 11px/1 'Archivo',sans-serif",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: active ? "#171717" : "#7A7268",
                  }}
                >
                  {tr(T.tabs[t])}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* ── Body ─────────────────────────────────────────────── */}
      <Reveal as="section">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          {tab === "press" && (
            <>
              <p style={{ font: "400 15px/1.7 'Archivo',sans-serif", color: "#3D3831", margin: "0 0 32px", maxWidth: "60ch" }}>
                {tr(T.pressIntro)}
              </p>
              <div style={{ borderTop: "2px solid #171717" }}>
                {PRESS.map((item, idx) => (
                  <Reveal
                    as="a"
                    key={idx}
                    delay={Math.min(idx * 60, 360)}
                    href={item.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid"
                    style={{
                      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,160px),1fr))",
                      gap: "14px",
                      alignItems: "baseline",
                      borderBottom: "1px solid rgba(23,23,23,.14)",
                      padding: "18px 8px",
                      textDecoration: "none",
                      color: "#171717",
                      transition: "background .15s ease",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.background = "#EFE9DF")}
                    onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ font: "600 10px/1.4 'Archivo',sans-serif", letterSpacing: ".1em", textTransform: "uppercase", color: "#E87518" }}>
                      {item.outlet}
                    </span>
                    <span style={{ font: "400 15px/1.5 'Archivo',sans-serif", gridColumn: "span 2" }}>
                      {item.title}
                    </span>
                    <span style={{ font: "500 11px/1.4 'Archivo',sans-serif", color: "#7A7268" }}>{item.date}</span>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {tab === "photos" && (
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,215px),1fr))", gap: "12px" }}>
              {vals.albums.map((a, idx) => (
                <Reveal
                  as="div"
                  key={idx}
                  delay={Math.min(idx * 60, 360)}
                  className="relative"
                  style={{ background: "#EFE9DF", minHeight: "230px", border: "1px solid rgba(23,23,23,.14)" }}
                >
                  <div className="flex flex-col items-start gap-1.5 justify-end h-full" style={{ padding: "15px", minHeight: "230px" }}>
                    <span style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFF8EC", background: "#E87518", padding: "5px 8px" }}>
                      {a.count}
                    </span>
                    <span className="font-serif-brand" style={{ fontSize: "22px", lineHeight: 1.1, color: "#21130D", background: "#FFF8EC", padding: "5px 9px" }}>
                      {a.title}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {tab === "videos" && (
            <div style={{ background: "#EFE9DF", padding: "clamp(32px,4vw,56px)" }}>
              <h2
                className="font-serif-brand"
                style={{ fontWeight: 400, fontSize: "clamp(24px,2.4vw,34px)", lineHeight: 1.16, margin: "0 0 14px" }}
              >
                {tr(T.videosTitle)}
              </h2>
              <p style={{ font: "400 16px/1.7 'Archivo',sans-serif", color: "#3D3831", margin: 0, maxWidth: "60ch" }}>
                {tr(T.videosBody)}
              </p>
            </div>
          )}

          {tab === "documents" && (
            <div style={{ background: "#EFE9DF", padding: "clamp(32px,4vw,56px)" }}>
              <h2
                className="font-serif-brand"
                style={{ fontWeight: 400, fontSize: "clamp(24px,2.4vw,34px)", lineHeight: 1.16, margin: "0 0 14px" }}
              >
                {tr(T.documentsTitle)}
              </h2>
              <p style={{ font: "400 16px/1.7 'Archivo',sans-serif", color: "#3D3831", margin: 0, maxWidth: "60ch" }}>
                {tr(T.documentsBody)}
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
};
