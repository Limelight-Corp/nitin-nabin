"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Language } from "@/data/websiteData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onNavigate: (page: string) => void;
}

const SEARCH_INDEX = [
  {
    type: { en: "Biography", hi: "जीवनी" },
    title: { en: "Nitin Nabin", hi: "नितिन नबीन" },
    date: "b. 1980",
    page: "about",
    snippet: {
      en: "Born 23 May 1980 in Ranchi. Son of Nabin Kishore Prasad Sinha, four-time MLA from Patna West.",
      hi: "23 मई 1980, राँची में जन्म। पटना पश्चिम से चार बार विधायक रहे नबीन किशोर प्रसाद सिन्हा के पुत्र।",
    },
  },
  {
    type: { en: "Journey", hi: "यात्रा" },
    title: { en: "Patna West by-election", hi: "पटना पश्चिम उपचुनाव" },
    date: "2006",
    page: "journey",
    snippet: {
      en: "First elected to the Bihar Legislative Assembly at twenty-six.",
      hi: "छब्बीस वर्ष की आयु में पहली बार बिहार विधानसभा के लिए निर्वाचित।",
    },
  },
  {
    type: { en: "Journey", hi: "यात्रा" },
    title: {
      en: "Bankipur — five consecutive terms",
      hi: "बांकीपुर – लगातार पाँच कार्यकाल",
    },
    date: "2010–2025",
    page: "journey",
    snippet: {
      en: "Returned from Bankipur in 2010, 2015, 2020 and 2025.",
      hi: "2010, 2015, 2020 और 2025 में बांकीपुर से निर्वाचित।",
    },
  },
  {
    type: { en: "Office", hi: "पद" },
    title: {
      en: "Minister of Road Construction, Bihar",
      hi: "पथ निर्माण मंत्री, बिहार",
    },
    date: "2021–2022",
    page: "work",
    snippet: {
      en: "Appointed 9 February 2021; held until 9 August 2022.",
      hi: "9 फरवरी 2021 को नियुक्त; 9 अगस्त 2022 तक।",
    },
  },
  {
    type: { en: "Office", hi: "पद" },
    title: {
      en: "Minister of Law & Justice, Bihar",
      hi: "विधि एवं न्याय मंत्री, बिहार",
    },
    date: "2024–2025",
    page: "work",
    snippet: {
      en: "Held from 15 March 2024 to 26 February 2025.",
      hi: "15 मार्च 2024 से 26 फरवरी 2025 तक।",
    },
  },
  {
    type: { en: "Office", hi: "पद" },
    title: { en: "National President", hi: "राष्ट्रीय अध्यक्ष" },
    date: "2026–",
    page: "leadership",
    snippet: {
      en: "Elected unopposed on 20 January 2026, succeeding J. P. Nadda.",
      hi: "20 जनवरी 2026 को निर्विरोध निर्वाचित, जे. पी. नड्डा के उत्तराधिकारी।",
    },
  },
  {
    type: { en: "Speech", hi: "भाषण" },
    title: {
      en: "47th Foundation Day address",
      hi: "47वें स्थापना दिवस पर संबोधन",
    },
    date: "6 Apr 2026",
    page: "speeches",
    snippet: {
      en: "Said the party's strength rests on the dedication of lakhs of workers.",
      hi: "कहा कि पार्टी की शक्ति लाखों कार्यकर्ताओं के समर्पण पर टिकी है।",
    },
  },
  {
    type: { en: "Update", hi: "अपडेट" },
    title: {
      en: "First official visit to West Bengal",
      hi: "पश्चिम बंगाल का पहला आधिकारिक दौरा",
    },
    date: "27 Jan 2026",
    page: "updates",
    snippet: {
      en: "Core team meeting in Durgapur; district meeting in Asansol.",
      hi: "दुर्गापुर में कोर टीम बैठक; आसनसोल में जिला बैठक।",
    },
  },
  {
    type: { en: "Media", hi: "मीडिया" },
    title: { en: "Press references", hi: "प्रेस संदर्भ" },
    date: "2025–2026",
    page: "media",
    snippet: {
      en: "Nine reference links to original publications.",
      hi: "मूल प्रकाशनों के नौ संदर्भ लिंक।",
    },
  },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  onNavigate,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_INDEX.filter((r) => {
      if (!q) return true;
      const haystack = (
        r.title[lang] +
        " " +
        r.snippet[lang] +
        " " +
        r.date +
        " " +
        r.type[lang]
      ).toLowerCase();
      return haystack.includes(q);
    });
  }, [query, lang]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 160,
        background: "rgba(23, 23, 23, 0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "clamp(16px, 8vh, 110px) 16px",
      }}
      className="animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(880px, 100%)",
          background: "#F7F4EE",
          border: "2px solid #171717",
          display: "flex",
          flexDirection: "column",
          maxHeight: "76vh",
          borderRadius: 0,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
        }}
      >
        {/* Top Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "17px 20px",
            borderBottom: "2px solid #171717",
            background: "transparent",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7A7268"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search query"
            placeholder={lang === "hi" ? "संग्रह में खोजें" : "Search the archive"}
            style={{
              flex: 1,
              border: 0,
              background: "transparent",
              outline: "none",
              font: "400 19px/1.3 'Archivo', sans-serif",
              color: "#171717",
            }}
          />

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid rgba(23, 23, 23, 0.24)",
              color: "#7A7268",
              font: "600 10px/1 'Archivo', sans-serif",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              padding: "9px 11px",
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div
          data-lenis-prevent
          style={{
            overflowY: "auto",
            maxHeight: "calc(76vh - 65px)",
          }}
        >
          {filteredResults.length === 0 ? (
            <div style={{ padding: "52px 20px", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "22px",
                  margin: "0 0 8px",
                  color: "#171717",
                }}
              >
                {lang === "hi"
                  ? "कोई प्रविष्टि इस खोज से मेल नहीं खाती।"
                  : "No entries match that search."}
              </p>
              <p
                style={{
                  font: "400 14px/1.6 'Archivo', sans-serif",
                  color: "#5C564F",
                  margin: 0,
                }}
              >
                {lang === "hi"
                  ? "बांकीपुर, पथ निर्माण, छत्तीसगढ़, या 2026 खोजें।"
                  : "Try Bankipur, Road Construction, Chhattisgarh, or 2026."}
              </p>
            </div>
          ) : (
            filteredResults.map((r, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onNavigate(r.page);
                  onClose();
                }}
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "82px 1fr auto",
                  gap: "16px",
                  alignItems: "start",
                  padding: "17px 20px",
                  border: 0,
                  borderBottom: "1px solid rgba(23, 23, 23, 0.1)",
                  background: "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  borderRadius: 0,
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#EFE9DF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Type Tag */}
                <span
                  style={{
                    font: "600 9.5px/1.5 'Archivo', sans-serif",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "#E87518",
                    paddingTop: "3px",
                  }}
                >
                  {r.type[lang]}
                </span>

                {/* Title & Snippet */}
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Newsreader', Georgia, serif",
                      fontSize: "19px",
                      color: "#171717",
                      lineHeight: 1.2,
                    }}
                  >
                    {r.title[lang]}
                  </span>
                  <span
                    style={{
                      font: "400 13px/1.5 'Archivo', sans-serif",
                      color: "#5C564F",
                    }}
                  >
                    {r.snippet[lang]}
                  </span>
                </span>

                {/* Date */}
                <span
                  style={{
                    font: "500 11px/1.5 'Archivo', sans-serif",
                    color: "#7A7268",
                    whiteSpace: "nowrap",
                    paddingTop: "4px",
                  }}
                >
                  {r.date}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
