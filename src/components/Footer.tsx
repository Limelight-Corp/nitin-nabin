"use client";

import React from "react";
import { Language, NAV_ITEMS } from "@/data/websiteData";

interface FooterProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const SOURCES = [
  { label: "bjp.org — official profile", href: "https://www.bjp.org/shri-nitin-nabin" },
  { label: "PRS Legislative Research", href: "https://prsindia.org/mlatrack/nitin-nabin" },
  { label: "DD News", href: "https://ddnews.gov.in/en/nitin-nabin-takes-charge-as-bjp-national-president/" },
  { label: "Akashvani News", href: "https://www.newsonair.gov.in/" },
  { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Nitin_Nabin" },
];

// Verified official accounts only — cross-checked against bjp.org's social
// stream and each platform's own profile bio before listing here.
const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "https://x.com/NitinNabin",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nitinnabinbjp/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/NitinNabinBJP/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8.06h2.71l.4-3.14H13.5V7.8c0-.91.25-1.53 1.56-1.53h1.67V3.46c-.29-.04-1.28-.12-2.44-.12-2.41 0-4.06 1.47-4.06 4.17v2.33H7.5v3.14h2.73V21z" />
      </svg>
    ),
  },
];

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const hi = lang === "hi";
  return (
    <footer style={{ background: "#F7F4EE", borderTop: "2px solid #171717" }}>
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-8 lg:pb-12 border-b-2 border-[#171717]">
          {/* Col 1: Brand */}
          <div>
            <p
              className="m-0 mb-3"
              style={{
                fontFamily: "'Newsreader',Georgia,serif",
                fontSize: "clamp(30px,3vw,44px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                color: "#171717",
              }}
            >
              {hi ? "नितिन नबीन" : "Nitin Nabin"}
            </p>
            <p
              className="m-0"
              style={{
                font: "600 10.5px/1.5 'Archivo',sans-serif",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#7A7268",
              }}
            >
              {hi ? (
                <>राष्ट्रीय अध्यक्ष<br />भारतीय जनता पार्टी</>
              ) : (
                <>National President<br />Bharatiya Janata Party</>
              )}
            </p>

            <div className="flex items-center gap-2.5 mt-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex items-center justify-center transition-colors"
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid rgba(23,23,23,.2)",
                    color: "#3D3831",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#E87518";
                    e.currentTarget.style.borderColor = "#E87518";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#3D3831";
                    e.currentTarget.style.borderColor = "rgba(23,23,23,.2)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Sections */}
          <div>
            <p className="m-0 mb-4 text-[9.5px] font-semibold uppercase tracking-[.16em] text-[#7A7268]">
              {hi ? "अनुभाग" : "Sections"}
            </p>
            <div className="flex flex-col gap-2.5 items-start">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="bg-transparent border-0 p-0 cursor-pointer text-left text-[14px] text-[#3D3831] hover:text-[#E87518] transition-colors"
                >
                  {hi ? item.hi : item.en}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Sources */}
          <div>
            <p className="m-0 mb-4 text-[9.5px] font-semibold uppercase tracking-[.16em] text-[#7A7268]">
              {hi ? "स्रोत" : "Sources"}
            </p>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-[#3D3831] hover:text-[#E87518] transition-colors no-underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verification policy */}
          <div>
            <p className="m-0 mb-4 text-[9.5px] font-semibold uppercase tracking-[.16em] text-[#7A7268]">
              {hi ? "सत्यापन नीति" : "Verification policy"}
            </p>
            <p className="text-[13.5px] leading-[1.65] text-[#3D3831] m-0 mb-3">
              {hi
                ? "यहाँ दिया गया प्रत्येक तथ्य सूचीबद्ध सार्वजनिक स्रोतों से लिया गया है। जिस विवरण की पुष्टि सार्वजनिक अभिलेख से नहीं हो सकी, उसे अनुमान लगाने के बजाय छोड़ दिया गया है।"
                : "Every factual statement here is drawn from the public sources listed. Where a detail could not be verified against a public record, it is left out rather than estimated."}
            </p>
            <p className="text-[13.5px] leading-[1.65] text-[#5C564F] m-0">
              {hi
                ? "तस्वीरें कार्यालय द्वारा उपलब्ध कराई जाती हैं। रिक्त फ़्रेम उस सामग्री को दर्शाते हैं जो अभी प्राप्त नहीं हुई है; इस साइट पर कोई चित्र निर्मित नहीं है और कोई प्रतिलेख पुनर्रचित नहीं है।"
                : "Photographs are supplied by the office. Empty frames indicate material not yet provided; no image on this site is generated, and no transcript has been reconstructed."}
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-wrap gap-4 items-baseline justify-between">
          <p className="m-0 text-xs text-[#7A7268]">
            {hi
              ? "© 2026. सूचनात्मक सार्वजनिक-प्रोफ़ाइल साइट। यह पार्टी का आधिकारिक प्रकाशन नहीं है।"
              : "© 2026. Informational public-profile site. Not an official party publication."}
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-[#7A7268]">{hi ? "सुगम्यता" : "Accessibility"}</span>
            <span className="text-xs text-[#7A7268]">{hi ? "गोपनीयता" : "Privacy"}</span>
            <span className="text-xs text-[#7A7268]">{hi ? "संशोधन" : "Corrections"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
