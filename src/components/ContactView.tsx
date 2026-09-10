"use client";

import React from "react";
import { Language } from "@/data/websiteData";
import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface ContactViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const T = {
  eyebrow: { en: "Contact", hi: "संपर्क" },
  lede: {
    en: "Only channels that can be verified against a public, official source are listed. Nothing on this page has been assumed.",
    hi: "केवल वे माध्यम सूचीबद्ध हैं जिन्हें सार्वजनिक, आधिकारिक स्रोत से सत्यापित किया जा सका। इस पृष्ठ पर कुछ भी अनुमानित नहीं है।",
  },
  official: { en: "Official profile", hi: "आधिकारिक प्रोफ़ाइल" },
  officialBody: {
    en: "The party maintains the leader's official profile page, press releases and photographs.",
    hi: "पार्टी नेता की आधिकारिक प्रोफ़ाइल पृष्ठ, प्रेस विज्ञप्तियाँ और तस्वीरें रखती है।",
  },
  constituency: { en: "Constituency", hi: "निर्वाचन क्षेत्र" },
  constituencyBody: {
    en: "Legislative record for the Bankipur seat is published by PRS Legislative Research.",
    hi: "बांकीपुर सीट का विधायी अभिलेख पीआरएस लेजिस्लेटिव रिसर्च द्वारा प्रकाशित है।",
  },
  notListed: { en: "Not yet listed", hi: "अभी सूचीबद्ध नहीं" },
  notListedTitle: {
    en: "Office address, telephone, email, media desk",
    hi: "कार्यालय पता, टेलीफ़ोन, ईमेल, मीडिया डेस्क",
  },
  notListedBody: {
    en: "No publicly verified direct contact details were found for this profile. These fields stay empty until the office supplies them; they will not be estimated.",
    hi: "इस प्रोफ़ाइल के लिए कोई सार्वजनिक रूप से सत्यापित सीधा संपर्क विवरण नहीं मिला। कार्यालय द्वारा उपलब्ध कराए जाने तक ये फ़ील्ड खाली रहेंगी; इनका अनुमान नहीं लगाया जाएगा।",
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

export const ContactView: React.FC<ContactViewProps> = ({ lang }) => {
  const hi = lang === "hi";
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
            <Eyebrow num="08" label={tr(T.eyebrow)} />
            <h1
              className="font-serif-brand"
              style={{
                fontWeight: 400,
                fontSize: "clamp(46px,7.4vw,116px)",
                lineHeight: 0.94,
                letterSpacing: "-.038em",
                margin: "0 0 26px",
              }}
            >
              {hi ? "संपर्क करें" : "Get in touch"}
            </h1>
            <p
              style={{
                font: "400 clamp(16px,1.2vw,19px)/1.72 'Archivo',sans-serif",
                color: "#3D3831",
                margin: 0,
                maxWidth: "52ch",
              }}
            >
              {tr(T.lede)}
            </p>
          </div>
          <div style={{ background: "#F7F4EE", isolation: "isolate" }}>
            <img
              src="/images/portrait-contact.avif"
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

      {/* ── Channel grid ─────────────────────────────────────── */}
      <Reveal as="section">
        <div
          className="max-w-[1680px] mx-auto grid"
          style={{
            padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
            gap: "1px",
            background: "rgba(23,23,23,.18)",
            border: "1px solid rgba(23,23,23,.18)",
          }}
        >
          {/* Official profile */}
          <Reveal as="div" delay={0} style={{ background: "#F7F4EE", padding: "clamp(24px,2.6vw,36px)" }}>
            <p style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#E87518", margin: "0 0 16px" }}>
              {tr(T.official)}
            </p>
            <p className="font-serif-brand" style={{ fontSize: "26px", lineHeight: 1.2, margin: "0 0 14px" }}>
              Bharatiya Janata Party
            </p>
            <p style={{ font: "400 15px/1.65 'Archivo',sans-serif", color: "#3D3831", margin: "0 0 20px" }}>
              {tr(T.officialBody)}
            </p>
            <a
              href="https://www.bjp.org/shri-nitin-nabin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                background: "#E87518",
                color: "#171717",
                font: "600 11px/1 'Archivo',sans-serif",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                padding: "16px 20px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#8F430A";
                e.currentTarget.style.color = "#FFF8EC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E87518";
                e.currentTarget.style.color = "#171717";
              }}
            >
              <span>bjp.org/shri-nitin-nabin</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Reveal>

          {/* Constituency */}
          <Reveal as="div" delay={60} style={{ background: "#F7F4EE", padding: "clamp(24px,2.6vw,36px)" }}>
            <p style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#E87518", margin: "0 0 16px" }}>
              {tr(T.constituency)}
            </p>
            <p className="font-serif-brand" style={{ fontSize: "26px", lineHeight: 1.2, margin: "0 0 14px" }}>
              {hi ? "बांकीपुर, पटना" : "Bankipur, Patna"}
            </p>
            <p style={{ font: "400 15px/1.65 'Archivo',sans-serif", color: "#3D3831", margin: "0 0 20px" }}>
              {tr(T.constituencyBody)}
            </p>
            <a
              href="https://prsindia.org/mlatrack/nitin-nabin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                background: "transparent",
                color: "#171717",
                border: "1px solid rgba(23,23,23,.3)",
                font: "600 11px/1 'Archivo',sans-serif",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                padding: "16px 20px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(23,23,23,.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span>PRS MLA Track</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Reveal>

          {/* Not yet listed */}
          <Reveal as="div" delay={120} style={{ background: "#EFE9DF", padding: "clamp(24px,2.6vw,36px)" }}>
            <p style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#7A7268", margin: "0 0 16px" }}>
              {tr(T.notListed)}
            </p>
            <p className="font-serif-brand" style={{ fontSize: "26px", lineHeight: 1.2, margin: "0 0 14px" }}>
              {tr(T.notListedTitle)}
            </p>
            <p style={{ font: "400 15px/1.65 'Archivo',sans-serif", color: "#5C564F", margin: 0 }}>
              {tr(T.notListedBody)}
            </p>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
};
