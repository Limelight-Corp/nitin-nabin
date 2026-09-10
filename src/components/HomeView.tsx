"use client";

import React, { useState } from "react";
import {
  Language,
  VALS_EN,
  VALS_HI,
  MILESTONES,
} from "@/data/websiteData";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface HomeViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const T = {
  eyebrow: {
    intro: { en: "Introduction", hi: "परिचय" },
    timeline: { en: "Timeline", hi: "कालक्रम" },
    resp: { en: "Responsibilities", hi: "दायित्व" },
    record: { en: "Public Record", hi: "सार्वजनिक अभिलेख" },
    newsroom: { en: "Newsroom", hi: "समाचार कक्ष" },
    addresses: { en: "Addresses", hi: "संबोधन" },
    photo: { en: "Photo Stories", hi: "चित्र कथाएँ" },
    national: { en: "National Leadership", hi: "राष्ट्रीय नेतृत्व" },
  },
  ctaJourney: { en: "Explore Journey", hi: "यात्रा देखें" },
  ctaUpdates: { en: "Latest Updates", hi: "नवीनतम अपडेट" },
  ctaBio: { en: "Read Full Biography", hi: "पूरी जीवनी पढ़ें" },
  ctaLeadRecord: { en: "Full Leadership Record →", hi: "पूरा नेतृत्व अभिलेख →" },
  ctaAllUpdates: { en: "View All Updates →", hi: "सभी अपडेट देखें →" },
  journeySub: {
    en: "Twenty years of public office, from a by-election in Patna to the national presidency. Select a year to open the record.",
    hi: "पटना के एक उपचुनाव से राष्ट्रीय अध्यक्ष पद तक, बीस वर्षों का सार्वजनिक जीवन। विवरण देखने के लिए वर्ष चुनें।",
  },
  fieldsNote: {
    en: "One public journey, expressed through four distinct arenas — constituency, government, organisation and national leadership.",
    hi: "एक सार्वजनिक यात्रा, चार भिन्न क्षेत्रों में अभिव्यक्त — निर्वाचन क्षेत्र, सरकार, संगठन और राष्ट्रीय नेतृत्व।",
  },
  officesSub: {
    en: "Every entry is drawn from a public record and dated to it. Programme-level initiatives from the ministerial tenures are not listed — those need departmental sourcing before publication.",
    hi: "प्रत्येक प्रविष्टि सार्वजनिक अभिलेख से ली गई और तिथिबद्ध है। मंत्री कार्यकाल की योजनागत पहलें यहाँ सूचीबद्ध नहीं हैं — उनके लिए विभागीय स्रोत आवश्यक है।",
  },
  speechesNote: {
    en: "Occasions, dates and venues are taken from public reporting. Video and transcripts are not linked, and none has been reconstructed.",
    hi: "अवसर, तिथि और स्थान सार्वजनिक रिपोर्टिंग से लिए गए हैं। वीडियो और प्रतिलेख संलग्न नहीं हैं, और कोई भी पुनर्रचित नहीं किया गया है।",
  },
  photoNote: {
    en: "Six albums awaiting event photography. Drop images into any frame to fill it.",
    hi: "छह एल्बम, कार्यक्रम की तस्वीरों की प्रतीक्षा में। किसी भी फ़्रेम में तस्वीर छोड़कर भरें।",
  },
  bio: [
    {
      en: "Nitin Nabin entered electoral politics in 2006, contesting a by-election for the Patna West seat in the Bihar Legislative Assembly following the death of his father, Nabin Kishore Prasad Sinha, a four-time legislator from the same constituency. He was twenty-six.",
      hi: "नितिन नबीन ने 2006 में चुनावी राजनीति में प्रवेश किया, जब उनके पिता और उसी क्षेत्र से चार बार विधायक रहे नबीन किशोर प्रसाद सिन्हा के निधन के बाद पटना पश्चिम सीट पर उपचुनाव हुआ। उस समय उनकी आयु छब्बीस वर्ष थी।",
    },
    {
      en: "When Patna West was reorganised as Bankipur ahead of the 2010 election, he contested and won there, and has been returned at every state election since — 2010, 2015, 2020 and 2025 — making him a five-term member of the Assembly. In the 2025 election he polled 98,299 votes and won by a margin of 51,936.",
      hi: "2010 के चुनाव से पहले पटना पश्चिम का पुनर्गठन बांकीपुर के रूप में हुआ। उन्होंने वहाँ से चुनाव लड़ा और जीते, और तब से हर विधानसभा चुनाव — 2010, 2015, 2020 और 2025 — में निर्वाचित हुए हैं। 2025 के चुनाव में उन्हें 98,299 मत मिले और 51,936 मतों के अंतर से जीत दर्ज की।",
    },
    {
      en: "Alongside his legislative work he built a long record in party organisation: state president of the Bharatiya Janata Yuva Morcha in Bihar, national general secretary of the Yuva Morcha, and party in-charge for Sikkim and Chhattisgarh. In the Nitish Kumar-led government of Bihar he held the Road Construction, Urban Development and Housing, and Law and Justice portfolios.",
      hi: "विधायी कार्य के साथ-साथ उन्होंने संगठन में लंबा अनुभव अर्जित किया: भारतीय जनता युवा मोर्चा के बिहार प्रदेश अध्यक्ष, युवा मोर्चा के राष्ट्रीय महामंत्री, तथा सिक्किम और छत्तीसगढ़ के प्रभारी। नीतीश कुमार के नेतृत्व वाली बिहार सरकार में उन्होंने पथ निर्माण, नगर विकास एवं आवास तथा विधि एवं न्याय विभाग सँभाले।",
    },
    {
      en: "In December 2025 the party's Parliamentary Board appointed him National Working President — the youngest in the party's history and the first from Bihar — and he resigned from the Bihar cabinet. On 20 January 2026 he was elected National President, unopposed, at the party headquarters in New Delhi.",
      hi: "दिसंबर 2025 में पार्टी के संसदीय बोर्ड ने उन्हें राष्ट्रीय कार्यकारी अध्यक्ष नियुक्त किया — पार्टी के इतिहास में सबसे युवा और बिहार से पहले — और उन्होंने बिहार मंत्रिमंडल से इस्तीफा दे दिया। 20 जनवरी 2026 को नई दिल्ली स्थित पार्टी मुख्यालय में वे निर्विरोध राष्ट्रीय अध्यक्ष निर्वाचित हुए।",
    },
  ],
  record: { en: "Record", hi: "अभिलेख" },
  noTranscript: {
    en: "No video or transcript on record",
    hi: "कोई वीडियो या प्रतिलेख उपलब्ध नहीं",
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

export const HomeView: React.FC<HomeViewProps> = ({ lang, onNavigate }) => {
  const hi = lang === "hi";
  const vals = hi ? VALS_HI : VALS_EN;
  const [activeField, setActiveField] = useState(0);
  const [activeYear, setActiveYear] = useState(
    MILESTONES[0]?.year || "2006"
  );

  const tr = (o: { en: string; hi: string }) => (hi ? o.hi : o.en);
  const selectedField = vals.fields[activeField] || vals.fields[0];
  const selectedLead = vals.leadSections[activeField] || vals.leadSections[0];
  const activeMilestone =
    MILESTONES.find((m) => m.year === activeYear) || MILESTONES[0];

  return (
    <div className="space-y-0" style={{ background: "#F7F4EE", color: "#171717" }}>
      {/* ── 01 HERO ─────────────────────────────────────────────── */}
      <Reveal
        as="section"
        data-hero=""
        className="relative overflow-hidden border-b-2 border-[#171717]"
        style={{
          backgroundColor: "#FFF8ED",
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundPosition: "78% center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "min(818px, 86vh)",
        }}
      >
        <div
          data-hero-scrim=""
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg,rgba(255,248,237,.94) 0%,rgba(255,248,237,.72) 38%,rgba(255,248,237,.1) 60%,rgba(255,248,237,0) 72%)",
          }}
        />
        <div
          data-hero-inner=""
          className="relative max-w-[1680px] mx-auto"
          style={{ padding: "clamp(46px,7vw,120px) clamp(20px,3vw,48px) clamp(44px,6vw,104px)" }}
        >
          <div style={{ maxWidth: "672px" }}>
            <h1
              data-hero-title=""
              className="font-serif-brand"
              style={{
                fontWeight: 400,
                fontSize: "clamp(58px,9.2vw,142px)",
                lineHeight: 0.9,
                letterSpacing: "-.035em",
                margin: "0 0 clamp(16px,2vw,26px)",
                color: "#E87518",
              }}
            >
              {hi ? (
                <>नितिन<br />नबीन</>
              ) : (
                <>Nitin<br />Nabin</>
              )}
            </h1>
            <p
              className="font-serif-brand"
              style={{
                fontWeight: 400,
                fontSize: "clamp(22px,2.2vw,34px)",
                lineHeight: 1.18,
                letterSpacing: "-.02em",
                color: "#21130D",
                margin: "0 0 20px",
              }}
            >
              {hi ? (
                <>राष्ट्रीय अध्यक्ष<br />भारतीय जनता पार्टी</>
              ) : (
                <>National President,<br />Bharatiya Janata Party</>
              )}
            </p>
            <p
              style={{
                font: "400 clamp(16px,1.25vw,19px)/1.72 'Archivo',sans-serif",
                color: "#3D3831",
                margin: "0 0 clamp(24px,3vw,36px)",
                maxWidth: "46ch",
              }}
            >
              {hi
                ? "जनविश्वास, संगठनात्मक कार्य और सेवा के प्रति निरंतर प्रतिबद्धता से आकार लेती एक यात्रा।"
                : "A journey shaped by public trust, grassroots organisation and an enduring commitment to service."}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("journey")}
                className="btn-lead"
                style={{ background: "#E87518", color: "#171717" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#8F430A";
                  e.currentTarget.style.color = "#FFF8EC";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#E87518";
                  e.currentTarget.style.color = "#171717";
                }}
              >
                <span>{tr(T.ctaJourney)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("updates")}
                className="btn-lead"
                style={{
                  background: "rgba(255,248,237,.7)",
                  color: "#21130D",
                  border: "1px solid rgba(33,19,13,.34)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#21130D";
                  e.currentTarget.style.color = "#FFF8EC";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,248,237,.7)";
                  e.currentTarget.style.color = "#21130D";
                }}
              >
                <span>{tr(T.ctaUpdates)}</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── 02 INTRODUCTION ────────────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]">
        <div
          className="max-w-[1680px] mx-auto grid"
          style={{
            padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))",
            gap: "clamp(32px,5vw,84px)",
          }}
        >
          <div>
            <Eyebrow num="02" label={tr(T.eyebrow.intro)} />
            <h2
              className="font-serif-brand"
              style={{
                fontWeight: 400,
                fontSize: "clamp(38px,5vw,76px)",
                lineHeight: 1.02,
                letterSpacing: "-.028em",
                margin: "0 0 32px",
                maxWidth: "14ch",
              }}
            >
              {hi ? (
                "सार्वजनिक जीवन की यात्रा"
              ) : (
                <>A Life in <em style={{ fontStyle: "italic", color: "#E87518" }}>Public Service</em></>
              )}
            </h2>
            <button
              onClick={() => onNavigate("about")}
              className="inline-flex items-center gap-2.5 cursor-pointer"
              style={{
                background: "transparent",
                border: 0,
                borderBottom: "2px solid #E87518",
                padding: "0 0 8px",
                font: "600 12px/1 'Archivo',sans-serif",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#171717",
              }}
            >
              <span>{tr(T.ctaBio)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div
              className="grid"
              style={{
                marginTop: "clamp(34px,4vw,60px)",
                borderTop: "2px solid #171717",
                paddingTop: "24px",
                gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                gap: "22px 24px",
              }}
            >
              {vals.keyFacts.map((fact, idx) => (
                <div key={idx}>
                  <p
                    style={{
                      font: "600 9.5px/1 'Archivo',sans-serif",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "#7A7268",
                      margin: "0 0 9px",
                    }}
                  >
                    {fact.k}
                  </p>
                  <p style={{ font: "400 14.5px/1.5 'Archivo',sans-serif", margin: 0 }}>
                    {fact.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p
              className="font-serif-brand"
              style={{
                fontSize: "clamp(21px,1.7vw,26px)",
                lineHeight: 1.5,
                margin: "0 0 24px",
              }}
            >
              {tr(T.bio[0])}
            </p>
            {T.bio.slice(1).map((p, idx) => (
              <p
                key={idx}
                style={{
                  font: "400 16.5px/1.72 'Archivo',sans-serif",
                  color: "#3D3831",
                  margin: idx === T.bio.length - 2 ? 0 : "0 0 18px",
                }}
              >
                {tr(p)}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 03 TIMELINE ────────────────────────────────────────────── */}
      <Reveal
        as="section"
        className="relative overflow-hidden border-b-2 border-[#171717]"
        style={{ background: "#FFE9C4", color: "#171717" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(1700px 1614px at 80% 20%,rgba(244,107,22,.2) 0%,rgba(244,107,22,0) 34%)",
          }}
        />
        <div
          className="relative max-w-[1680px] mx-auto"
          style={{ padding: "clamp(44px,5.5vw,100px) 0 clamp(38px,4.5vw,76px)" }}
        >
          <div
            className="flex flex-wrap items-end justify-between gap-6"
            style={{
              padding: "0 clamp(20px,3vw,48px)",
              marginBottom: "clamp(30px,3.6vw,54px)",
            }}
          >
            <div>
              <Eyebrow num="03" label={tr(T.eyebrow.timeline)} color="#7B3A10" />
              <h2
                className="font-serif-brand"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(40px,6vw,88px)",
                  lineHeight: 1,
                  letterSpacing: "-.03em",
                  margin: 0,
                }}
              >
                {hi ? "यात्रा" : <>The <em style={{ fontStyle: "italic", color: "#E87518" }}>Journey</em></>}
              </h2>
            </div>
            <p
              style={{
                font: "400 15px/1.65 'Archivo',sans-serif",
                color: "#5C564F",
                margin: 0,
                maxWidth: "40ch",
              }}
            >
              {tr(T.journeySub)}
            </p>
          </div>

          <div
            data-rail=""
            data-lenis-prevent
            className="overflow-x-auto overflow-y-hidden"
            style={{ padding: "0 clamp(20px,3vw,48px) 6px" }}
          >
            <div className="relative flex" style={{ minWidth: "max-content" }}>
              <div
                className="absolute pointer-events-none"
                style={{ left: 0, right: 0, top: "52px", height: "1px", background: "rgba(33,19,13,.28)" }}
              />
              {MILESTONES.map((m) => {
                const isSelected = activeYear === m.year;
                return (
                  <button
                    key={m.year}
                    onClick={() => setActiveYear(m.year)}
                    className="relative flex flex-col items-center gap-3.5 cursor-pointer"
                    style={{
                      flex: "none",
                      width: "clamp(150px,12.5vw,190px)",
                      background: isSelected ? "rgba(255,248,236,.75)" : "transparent",
                      boxShadow: isSelected ? "inset 0 -4px 0 #E87518" : "none",
                      border: 0,
                      padding: "22px 16px 26px",
                      color: "#21130D",
                      opacity: isSelected ? 1 : 0.62,
                      transition: "opacity .2s ease, background .2s ease, box-shadow .2s ease",
                    }}
                  >
                    <span
                      style={{
                        font: "600 10px/1 'Archivo',sans-serif",
                        letterSpacing: ".13em",
                        textTransform: "uppercase",
                        color: "#7B3A10",
                        textAlign: "center",
                      }}
                    >
                      {m.category[lang]}
                    </span>
                    <span
                      style={{
                        width: "13px",
                        height: "13px",
                        borderRadius: "50%",
                        background: "#FFB15E",
                        boxShadow: "0 0 0 6px #2A1A11,0 0 0 7px #FFB15E",
                        display: "block",
                      }}
                    />
                    <span
                      className="font-serif-brand"
                      style={{
                        fontSize: "clamp(30px,2.6vw,40px)",
                        lineHeight: 1,
                        letterSpacing: "-.03em",
                      }}
                    >
                      {m.year}
                    </span>
                    <span
                      style={{
                        font: "500 12px/1.4 'Archivo',sans-serif",
                        color: "#5C564F",
                        textAlign: "center",
                      }}
                    >
                      {m.short[lang]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ padding: "0 clamp(20px,3vw,48px)", marginTop: "clamp(26px,3vw,42px)" }}>
            <div
              className="grid"
              style={{
                background: "rgba(255,248,236,.72)",
                border: "1px solid rgba(33,19,13,.2)",
                boxShadow: "0 22px 70px rgba(42,26,17,.12)",
                padding: "clamp(24px,3vw,44px)",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
                gap: "clamp(22px,3vw,52px)",
              }}
            >
              <div>
                <div className="flex items-baseline gap-4 mb-4.5">
                  <span
                    className="font-serif-brand"
                    style={{ fontSize: "clamp(54px,5.6vw,82px)", lineHeight: 0.85, letterSpacing: "-.04em", color: "#E87518" }}
                  >
                    {activeMilestone.year}
                  </span>
                  <span style={{ font: "600 10px/1.4 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#7B3A10" }}>
                    {activeMilestone.category[lang]}
                  </span>
                </div>
                <h3
                  className="font-serif-brand"
                  style={{ fontWeight: 400, fontSize: "clamp(25px,2.3vw,35px)", lineHeight: 1.16, margin: "0 0 12px", letterSpacing: "-.015em" }}
                >
                  {activeMilestone.title[lang]}
                </h3>
                <p style={{ font: "500 11px/1.4 'Archivo',sans-serif", letterSpacing: ".13em", textTransform: "uppercase", color: "#7A7268", margin: 0 }}>
                  {activeMilestone.location[lang]}
                </p>
              </div>
              <div>
                <p style={{ font: "400 16px/1.7 'Archivo',sans-serif", color: "#3D3831", margin: "0 0 20px" }}>
                  {activeMilestone.body[lang]}
                </p>
                <p style={{ font: "600 10px/1.4 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#7A7268", margin: "0 0 6px" }}>
                  {tr(T.record)}
                </p>
                <p style={{ font: "400 14px/1.5 'Archivo',sans-serif", margin: 0 }}>
                  {activeMilestone.record[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── 04 RESPONSIBILITIES / FOUR FIELDS ──────────────────────── */}
      <Reveal
        as="section"
        className="relative overflow-hidden border-b-2 border-[#171717]"
        style={{ background: "#21130D", color: "#FFF8EC" }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            left: "-20%",
            top: "-20%",
            width: "140%",
            height: "140%",
            background:
              "radial-gradient(1836px 1836px at 50% 45%,rgba(224,112,29,.26) 0%,rgba(224,112,29,0) 30%),radial-gradient(2977px 2977px at 18% 12%,rgba(255,255,255,.08) 0%,rgba(255,255,255,0) 22%),linear-gradient(128deg,#29160E 0%,#160D09 52%,#32170B 100%)",
          }}
        />
        <div
          className="relative max-w-[1920px] mx-auto"
          style={{ padding: "clamp(48px,6vw,107px) clamp(20px,3vw,48px) clamp(48px,5.8vw,94px)" }}
        >
          <div
            className="grid items-end"
            style={{
              maxWidth: "1584px",
              margin: "0 auto",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
              gap: "clamp(24px,4vw,72px)",
              marginBottom: "clamp(34px,4.4vw,72px)",
            }}
          >
            <div>
              <Eyebrow num="04" label={tr(T.eyebrow.resp)} color="#F69A50" />
              <h2
                className="font-serif-brand"
                style={{ fontWeight: 400, fontSize: "clamp(46px,6.2vw,96px)", lineHeight: 0.98, letterSpacing: "-.03em", margin: 0, color: "#FFF8EC" }}
              >
                {hi ? "कार्य के चार क्षेत्र" : <>Four <em style={{ fontStyle: "italic", color: "#F69A50" }}>Fields</em><br />of Work</>}
              </h2>
            </div>
            <p
              style={{
                font: "400 clamp(16px,1.3vw,19px)/1.72 'Archivo',sans-serif",
                color: "rgba(248,240,227,.7)",
                margin: 0,
                borderLeft: "1px solid rgba(248,240,227,.25)",
                paddingLeft: "25px",
                maxWidth: "46ch",
              }}
            >
              {tr(T.fieldsNote)}
            </p>
          </div>

          {/* Field stage */}
          <div
            data-fieldstage=""
            className="relative mx-auto"
            style={{
              maxWidth: "1584px",
              aspectRatio: "1584/1030",
              minHeight: "640px",
              overflow: "hidden",
              background: "linear-gradient(135deg,rgba(255,255,255,.043) 0%,rgba(255,255,255,.01) 100%)",
              border: "1px solid rgba(255,247,233,.24)",
              boxShadow: "0 44px 120px rgba(0,0,0,.28)",
            }}
          >
            <div
              data-fielddeco=""
              className="absolute pointer-events-none"
              style={{
                left: "25.38%",
                top: "12.14%",
                width: "49.24%",
                aspectRatio: "1",
                borderRadius: "50%",
                border: "1px solid rgba(246,154,80,.24)",
              }}
            />
            <div
              data-fielddeco=""
              className="absolute pointer-events-none"
              style={{
                left: "31.69%",
                top: "21.84%",
                width: "36.62%",
                aspectRatio: "1",
                borderRadius: "50%",
                border: "1px dashed rgba(246,154,80,.24)",
              }}
            />
            <span
              aria-hidden
              data-fielddeco=""
              className="font-serif-brand absolute pointer-events-none"
              style={{
                left: "23.6%",
                top: "11.6%",
                fontWeight: 400,
                fontSize: "min(790px,49vw)",
                lineHeight: 0.68,
                letterSpacing: "-.12em",
                color: "rgba(255,248,236,.055)",
                transform: "rotate(-6deg)",
                transformOrigin: "0 0",
                whiteSpace: "nowrap",
              }}
            >
              04
            </span>

            {/* Center portrait */}
            <div
              data-fielddeco=""
              className="absolute"
              style={{
                left: "37.83%",
                top: "29.97%",
                width: "24.33%",
                height: "67.63%",
                opacity: 0.9,
                borderRadius: "96px 96px 27px 27px",
                background: "radial-gradient(557px 557px at 50% 25%,#F7C99F 0%,#DD6F21 46%,#8B3312 100%)",
                boxShadow: "0 40px 100px rgba(0,0,0,.45), 0 0 0 1px rgba(255,247,233,.2)",
                pointerEvents: "none",
              }}
            />
            <img
              data-fielddeco=""
              src="/images/portrait-cutout.png"
              alt="Nitin Nabin, official portrait"
              className="absolute pointer-events-none"
              style={{
                left: "33.7%",
                top: "18.3%",
                width: "34.6%",
                height: "79.7%",
                objectFit: "contain",
                objectPosition: "bottom",
              }}
            />

            {vals.fields.map((f, idx) => {
              const isSelected = activeField === idx;
              const isOrange = f.pos.bg === "#EF893D";
              return (
                <Reveal
                  as="button"
                  key={idx}
                  data-fieldcard=""
                  delay={Math.min(idx * 60, 360)}
                  slide={false}
                  onClick={() => setActiveField(idx)}
                  className="absolute text-left cursor-pointer flex flex-col overflow-hidden"
                  style={{
                    left: f.pos.left,
                    top: f.pos.top,
                    width: f.pos.width,
                    transform: `rotate(${f.pos.rot})${isSelected ? " translateY(-10px) scale(1.02)" : ""}`,
                    background: isSelected ? (isOrange ? "#EF893D" : "#FFFDF6") : f.pos.bg,
                    color: f.pos.fg,
                    border: `1px solid ${isSelected ? "#E87518" : "rgba(255,255,255,.5)"}`,
                    boxShadow: isSelected
                      ? "0 40px 100px rgba(0,0,0,.45), 0 0 0 2px #E87518"
                      : "0 22px 70px rgba(0,0,0,.28)",
                    padding: "clamp(18px,1.9vw,31px)",
                    gap: "clamp(10px,1vw,16px)",
                    zIndex: isSelected ? 5 : 1,
                    transition: "transform .25s cubic-bezier(.22,.61,.36,1), box-shadow .25s ease, background .2s ease",
                  }}
                >
                  <div className="flex items-start justify-between gap-3.5">
                    <span style={{ font: "600 9px/1 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#7B3A10" }}>
                      {f.kicker}
                    </span>
                    <span className="font-serif-brand" style={{ fontSize: "25px", lineHeight: 1, color: "#D9661B" }}>↗</span>
                  </div>
                  <h3
                    className="font-serif-brand"
                    style={{ fontWeight: 400, fontSize: "clamp(26px,2.55vw,40px)", lineHeight: 0.98, letterSpacing: "-.03em", margin: 0, color: "#21130D" }}
                  >
                    {f.title1}
                    <br />
                    {f.title2 || ""}
                  </h3>
                  <p style={{ font: "400 clamp(13px,.95vw,14.5px)/1.62 'Archivo',sans-serif", color: "#3D3831", margin: 0, flex: 1 }}>
                    {f.body}
                  </p>
                  <div
                    className="flex items-baseline gap-3.5"
                    style={{ borderTop: "1px solid rgba(33,19,13,.22)", paddingTop: "clamp(10px,1vw,15px)" }}
                  >
                    <span className="font-serif-brand" style={{ fontSize: "clamp(26px,2.2vw,35px)", lineHeight: 1, letterSpacing: "-.03em", color: "#21130D" }}>
                      {f.stat}
                    </span>
                    <span style={{ font: "600 10px/1.35 'Archivo',sans-serif", letterSpacing: ".13em", textTransform: "uppercase", color: "#7B3A10" }}>
                      {f.statLabel}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Picked field detail */}
          <div
            className="grid mx-auto"
            style={{
              maxWidth: "1584px",
              margin: "clamp(28px,3.2vw,52px) auto 0",
              borderTop: "1px solid rgba(255,247,233,.24)",
              paddingTop: "clamp(24px,2.6vw,40px)",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
              gap: "clamp(22px,3vw,56px)",
            }}
          >
            <div>
              <p style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#F69A50", margin: "0 0 14px" }}>
                {selectedField.kicker}
              </p>
              <h3
                className="font-serif-brand"
                style={{ fontWeight: 400, fontSize: "clamp(28px,3vw,46px)", lineHeight: 1.04, letterSpacing: "-.028em", margin: "0 0 16px", color: "#FFF8EC" }}
              >
                {selectedLead.title}
              </h3>
              <p style={{ font: "400 16px/1.72 'Archivo',sans-serif", color: "rgba(248,240,227,.7)", margin: "0 0 22px", maxWidth: "46ch" }}>
                {selectedLead.overview}
              </p>
              <button
                onClick={() => onNavigate("leadership")}
                className="inline-flex items-center gap-2.5 cursor-pointer"
                style={{
                  background: "#E87518",
                  color: "#21130D",
                  border: 0,
                  font: "600 11px/1 'Archivo',sans-serif",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  padding: "16px 20px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FFB15E")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#E87518")}
              >
                <span>{tr(T.ctaLeadRecord)}</span>
              </button>
            </div>
            <ul className="list-none m-0 p-0">
              {selectedLead.items.map((it, i) => (
                <li
                  key={i}
                  className="grid"
                  style={{
                    gridTemplateColumns: "118px 1fr",
                    gap: "16px",
                    padding: "13px 0",
                    borderBottom: "1px solid rgba(255,247,233,.16)",
                  }}
                >
                  <span style={{ font: "500 12.5px/1.5 'Archivo',sans-serif", color: "#F69A50" }}>{it.when}</span>
                  <span style={{ font: "400 15px/1.6 'Archivo',sans-serif", color: "rgba(248,240,227,.78)" }}>{it.what}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* ── 05 PUBLIC RECORD / OFFICES ─────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          <div
            className="grid items-end"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
              gap: "clamp(24px,4vw,68px)",
              marginBottom: "clamp(26px,3.2vw,46px)",
            }}
          >
            <div>
              <Eyebrow num="05" label={tr(T.eyebrow.record)} />
              <h2
                className="font-serif-brand"
                style={{ fontWeight: 400, fontSize: "clamp(38px,5vw,76px)", lineHeight: 1.02, letterSpacing: "-.028em", margin: 0 }}
              >
                {hi ? "पद एवं दायित्व" : "Offices Held"}
              </h2>
            </div>
            <p style={{ font: "400 15px/1.7 'Archivo',sans-serif", color: "#3D3831", margin: 0, maxWidth: "52ch" }}>
              {tr(T.officesSub)}
            </p>
          </div>

          <div className="overflow-x-auto" style={{ borderTop: "2px solid #171717" }}>
            <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr>
                  <th scope="col" style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#7A7268", padding: "15px 18px 15px 0", borderBottom: "1px solid rgba(23,23,23,.24)", width: "22%" }}>
                    {hi ? "अवधि" : "Period"}
                  </th>
                  <th scope="col" style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#7A7268", padding: "15px 18px", borderBottom: "1px solid rgba(23,23,23,.24)" }}>
                    {hi ? "पद" : "Office"}
                  </th>
                  <th scope="col" style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#7A7268", padding: "15px 0 15px 18px", borderBottom: "1px solid rgba(23,23,23,.24)", width: "26%" }}>
                    {hi ? "संस्था" : "Body"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {vals.offices.map((o, idx) => (
                  <Reveal
                    as="tr"
                    key={idx}
                    delay={Math.min(idx * 60, 360)}
                    style={{ borderBottom: "1px solid rgba(23,23,23,.12)" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = "#FFE9C4")}
                    onMouseLeave={(e: React.MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ font: "500 14px/1.5 'Archivo',sans-serif", color: "#E87518", padding: "18px 18px 18px 0", whiteSpace: "nowrap", verticalAlign: "top" }}>
                      {o.period}
                    </td>
                    <td className="font-serif-brand" style={{ padding: "18px", verticalAlign: "top", fontSize: "20px", lineHeight: 1.3 }}>
                      {o.title}
                    </td>
                    <td style={{ font: "400 14px/1.5 'Archivo',sans-serif", color: "#3D3831", padding: "18px 0 18px 18px", verticalAlign: "top" }}>
                      {o.body}
                    </td>
                  </Reveal>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* ── 06 NEWSROOM / UPDATES ──────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]" style={{ background: "#2B1A12", color: "#FFF8EC" }}>
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          <div className="flex flex-wrap items-end justify-between gap-5.5" style={{ marginBottom: "clamp(26px,3.2vw,46px)" }}>
            <div>
              <Eyebrow num="06" label={tr(T.eyebrow.newsroom)} color="#F69A50" />
              <h2
                className="font-serif-brand"
                style={{ fontWeight: 400, fontSize: "clamp(38px,5vw,76px)", lineHeight: 1.02, letterSpacing: "-.028em", margin: 0, color: "#FFF8EC" }}
              >
                {hi ? "नवीनतम अपडेट" : "Latest Updates"}
              </h2>
            </div>
            <button
              onClick={() => onNavigate("updates")}
              className="cursor-pointer"
              style={{
                background: "transparent",
                border: 0,
                borderBottom: "2px solid #E87518",
                padding: "0 0 8px",
                font: "600 12px/1 'Archivo',sans-serif",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#FFF8EC",
              }}
            >
              {tr(T.ctaAllUpdates)}
            </button>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,262px),1fr))", gap: "20px" }}>
            {(vals.updatesHome || []).slice(0, 4).map((u: any, idx: number) => (
              <Reveal
                as="article"
                key={idx}
                delay={Math.min(idx * 60, 360)}
                className="flex flex-col"
                style={{
                  background: "#FFF8EC",
                  color: "#21130D",
                  border: "1px solid rgba(255,247,233,.24)",
                  boxShadow: "0 22px 70px rgba(0,0,0,.28)",
                  transition: "transform .25s cubic-bezier(.22,.61,.36,1), background .2s ease",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.background = "#FFE9C4")}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.background = "#FFF8EC")}
              >
                <div
                  className="flex items-center justify-between gap-3"
                  style={{ padding: "15px 19px", borderBottom: "1px solid rgba(33,19,13,.16)" }}
                >
                  <span style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".15em", textTransform: "uppercase", color: "#7B3A10" }}>
                    {u.category}
                  </span>
                  <span style={{ font: "500 11px/1 'Archivo',sans-serif", color: "#7A7268" }}>{u.date}</span>
                </div>
                <div className="flex flex-col gap-2.5 flex-1" style={{ padding: "20px 19px 22px" }}>
                  <h3 className="font-serif-brand" style={{ fontWeight: 400, fontSize: "22px", lineHeight: 1.22, margin: 0, letterSpacing: "-.012em" }}>
                    {u.title}
                  </h3>
                  <p style={{ font: "400 14.5px/1.62 'Archivo',sans-serif", color: "#3D3831", margin: 0, flex: 1 }}>
                    {u.summary}
                  </p>
                  <p style={{ font: "500 11px/1.4 'Archivo',sans-serif", color: "#7A7268", margin: 0, paddingTop: "12px", borderTop: "1px solid rgba(33,19,13,.14)" }}>
                    {u.location}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 07 ADDRESSES / SPEECHES ─────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          <div className="flex flex-wrap items-end justify-between gap-5.5" style={{ marginBottom: "clamp(26px,3.2vw,46px)" }}>
            <div>
              <Eyebrow num="07" label={tr(T.eyebrow.addresses)} />
              <h2
                className="font-serif-brand"
                style={{ fontWeight: 400, fontSize: "clamp(38px,5vw,76px)", lineHeight: 1.02, letterSpacing: "-.028em", margin: 0 }}
              >
                {hi ? "भाषण" : "Speeches"}
              </h2>
            </div>
            <p
              style={{
                font: "400 14px/1.6 'Archivo',sans-serif",
                color: "#5C564F",
                margin: 0,
                maxWidth: "44ch",
                borderLeft: "2px solid #E87518",
                paddingLeft: "16px",
              }}
            >
              {tr(T.speechesNote)}
            </p>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
              gap: "1px",
              background: "rgba(23,23,23,.18)",
              border: "1px solid rgba(23,23,23,.18)",
            }}
          >
            {(vals.speechesHome || []).slice(0, 4).map((s: any, idx: number) => (
              <Reveal
                as="article"
                key={idx}
                delay={Math.min(idx * 60, 360)}
                className="flex flex-col gap-2.5"
                style={{
                  background: "#F7F4EE",
                  padding: "clamp(20px,2vw,30px)",
                  minHeight: "230px",
                  transition: "background .2s ease",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.background = "#FFE9C4")}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.background = "#F7F4EE")}
              >
                <span style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".15em", textTransform: "uppercase", color: "#E87518" }}>
                  {s.category}
                </span>
                <h3 className="font-serif-brand" style={{ fontWeight: 400, fontSize: "23px", lineHeight: 1.22, margin: 0, flex: 1 }}>
                  {s.title}
                </h3>
                <p style={{ font: "500 11px/1.5 'Archivo',sans-serif", letterSpacing: ".1em", textTransform: "uppercase", color: "#7A7268", margin: 0 }}>
                  {s.meta}
                </p>
                <p
                  style={{
                    font: "600 10px/1.4 'Archivo',sans-serif",
                    letterSpacing: ".11em",
                    textTransform: "uppercase",
                    color: "#9C948A",
                    margin: 0,
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(23,23,23,.12)",
                  }}
                >
                  {tr(T.noTranscript)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 08 PHOTO STORIES ────────────────────────────────────────── */}
      <Reveal as="section" className="border-b-2 border-[#171717]">
        <div className="max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,100px) clamp(20px,3vw,48px)" }}>
          <div className="flex flex-wrap items-end justify-between gap-5.5" style={{ marginBottom: "clamp(26px,3.2vw,46px)" }}>
            <div>
              <Eyebrow num="08" label={tr(T.eyebrow.photo)} />
              <h2
                className="font-serif-brand"
                style={{ fontWeight: 400, fontSize: "clamp(38px,5vw,76px)", lineHeight: 1.02, letterSpacing: "-.028em", margin: 0 }}
              >
                {hi ? "चित्र अभिलेख" : <>The <em style={{ fontStyle: "italic", color: "#E87518" }}>Visual</em> Record</>}
              </h2>
            </div>
            <p style={{ font: "400 14px/1.6 'Archivo',sans-serif", color: "#5C564F", margin: 0, maxWidth: "40ch" }}>
              {tr(T.photoNote)}
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,215px),1fr))", gap: "12px" }}>
            {vals.albums.map((a, idx) => (
              <Reveal
                as="button"
                key={idx}
                delay={Math.min(idx * 60, 360)}
                onClick={() => onNavigate("media")}
                className="relative text-left cursor-pointer"
                style={{
                  border: "1px solid rgba(33,19,13,.2)",
                  background: "#FFE9C4",
                  minHeight: "210px",
                  overflow: "hidden",
                }}
              >
                <div
                  className="relative flex flex-col items-start gap-1.5 justify-end h-full"
                  style={{ padding: "15px", minHeight: "210px" }}
                >
                  <span style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".15em", textTransform: "uppercase", color: "#FFF8EC", background: "#E87518", padding: "5px 8px" }}>
                    {a.count}
                  </span>
                  <span className="font-serif-brand" style={{ fontSize: "23px", lineHeight: 1.1, color: "#21130D", background: "#FFF8EC", padding: "5px 9px" }}>
                    {a.title}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 09 NATIONAL LEADERSHIP ARC ──────────────────────────────── */}
      <Reveal as="section" className="relative overflow-hidden" style={{ background: "#FFE9C4", color: "#171717" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(1700px 1614px at 20% 30%,rgba(244,107,22,.2) 0%,rgba(244,107,22,0) 34%)" }}
        />
        <div className="relative max-w-[1680px] mx-auto" style={{ padding: "clamp(44px,5.5vw,104px) clamp(20px,3vw,48px)" }}>
          <Eyebrow num="09" label={tr(T.eyebrow.national)} color="#E87518" />
          <h2
            className="font-serif-brand"
            style={{
              fontWeight: 400,
              fontSize: "clamp(40px,6.2vw,96px)",
              lineHeight: 0.98,
              letterSpacing: "-.035em",
              margin: "0 0 clamp(30px,3.6vw,58px)",
              maxWidth: "20ch",
            }}
          >
            {hi ? (
              "बांकीपुर से राष्ट्रीय संगठन तक"
            ) : (
              <>From Bankipur to the <em style={{ fontStyle: "italic", color: "#E87518" }}>National</em> organisation</>
            )}
          </h2>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: "clamp(20px,2.4vw,40px)" }}>
            {vals.arc.map((step, idx) => {
              const targetPage = step.target || (idx === 0 ? "journey" : "leadership");
              return (
                <Reveal
                  as="button"
                  key={idx}
                  delay={Math.min(idx * 60, 360)}
                  onClick={() => onNavigate(targetPage)}
                  className="flex flex-col gap-3.5 text-left cursor-pointer"
                  style={{
                    background: "rgba(255,248,236,.7)",
                    border: "1px solid rgba(33,19,13,.2)",
                    padding: "clamp(22px,2.4vw,38px)",
                    color: "#171717",
                    transition: "transform .25s cubic-bezier(.22,.61,.36,1), background .2s ease, border-color .2s ease",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.background = "#FFF8EC")}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.background = "rgba(255,248,236,.7)")}
                >
                  <span style={{ font: "600 9.5px/1 'Archivo',sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#7B3A10" }}>
                    {step.step}
                  </span>
                  <h3 className="font-serif-brand" style={{ fontWeight: 400, fontSize: "clamp(25px,2.3vw,35px)", lineHeight: 1.1, margin: 0, letterSpacing: "-.02em" }}>
                    {step.title}
                  </h3>
                  <p style={{ font: "500 11px/1.4 'Archivo',sans-serif", letterSpacing: ".13em", textTransform: "uppercase", color: "#7A7268", margin: 0 }}>
                    {step.years}
                  </p>
                  <p style={{ font: "400 15px/1.68 'Archivo',sans-serif", color: "#3D3831", margin: 0, flex: 1 }}>
                    {step.body}
                  </p>
                  <span style={{ font: "600 10.5px/1 'Archivo',sans-serif", letterSpacing: ".13em", textTransform: "uppercase", color: "#E87518" }}>
                    {step.cta} →
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
};
