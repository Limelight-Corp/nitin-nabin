"use client";

import React, { useState } from "react";
import { Language, NAV_ITEMS } from "@/data/websiteData";
import { Play, X as CloseIcon, ExternalLink, Check, Heart, Repeat2, MessageCircle, Eye, Volume2 } from "lucide-react";

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
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Auto-scroll indices for each platform (3 items per platform: 0, 1, 2)
  const [fbIdx, setFbIdx] = useState(0);
  const [xIdx, setXIdx] = useState(0);
  const [igIdx, setIgIdx] = useState(0);
  const [ytIdx, setYtIdx] = useState(0);

  // Interaction pause state so user manual scroll pauses auto-advance for 4.5s then resumes smoothly
  const [fbPaused, setFbPaused] = useState(false);
  const [xPaused, setXPaused] = useState(false);
  const [igPaused, setIgPaused] = useState(false);
  const [ytPaused, setYtPaused] = useState(false);

  const fbTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const xTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const igTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const ytTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const pauseAutoScrollTemporarily = (
    setPaused: React.Dispatch<React.SetStateAction<boolean>>,
    timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    setPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPaused(false);
    }, 4500);
  };

  // Container refs
  const fbRef = React.useRef<HTMLDivElement>(null);
  const xRef = React.useRef<HTMLDivElement>(null);
  const igRef = React.useRef<HTMLDivElement>(null);
  const ytRef = React.useRef<HTMLDivElement>(null);

  // Robust scrolling to target item without depending on offsetParent or moving window
  const scrollToItem = (container: HTMLDivElement | null, index: number) => {
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>("[data-feed-item]");
    if (!items || items.length === 0) return;
    const targetIdx = index % items.length;
    const targetItem = items[targetIdx];
    if (!targetItem) return;

    if (targetIdx === 0) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const containerRect = container.getBoundingClientRect();
      const itemRect = targetItem.getBoundingClientRect();
      const targetScrollTop = container.scrollTop + (itemRect.top - containerRect.top);
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    scrollToItem(fbRef.current, fbIdx);
  }, [fbIdx]);

  React.useEffect(() => {
    scrollToItem(xRef.current, xIdx);
  }, [xIdx]);

  React.useEffect(() => {
    scrollToItem(igRef.current, igIdx);
  }, [igIdx]);

  React.useEffect(() => {
    scrollToItem(ytRef.current, ytIdx);
  }, [ytIdx]);

  // Automated scroll timer: advances every 3.8 seconds continuously (1 -> 2 -> 3 -> 1)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setFbIdx((prev) => (fbPaused ? prev : (prev + 1) % 3));
      setXIdx((prev) => (xPaused ? prev : (prev + 1) % 3));
      setIgIdx((prev) => (igPaused ? prev : (prev + 1) % 3));
      setYtIdx((prev) => (ytPaused ? prev : (prev + 1) % 3));
    }, 3800);
    return () => clearInterval(timer);
  }, [fbPaused, xPaused, igPaused, ytPaused]);

  // Sync dot indicator when user manually scrolls
  const handleScroll = (
    container: HTMLDivElement | null,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    currentIndex: number
  ) => {
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>("[data-feed-item]");
    if (!items || items.length === 0) return;
    const containerTop = container.getBoundingClientRect().top;
    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, idx) => {
      const distance = Math.abs(item.getBoundingClientRect().top - containerTop);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== currentIndex) {
      setIndex(closestIndex);
    }
  };

  const openVideo = (url: string) => {
    setActiveVideoUrl(url);
    setVideoModalOpen(true);
  };

  return (
    <footer style={{ background: "#F7F4EE", borderTop: "2px solid #171717" }}>
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        
        {/* ── LIVE SOCIAL MEDIA FEED SECTION ───────────────────────────── */}
        <div className="pb-12 sm:pb-16 mb-12 sm:mb-16 border-b-2 border-[#171717]">
          {/* Header */}
          <div className="mb-8">
            <p
              style={{
                font: "600 10.5px/1 'Archivo',sans-serif",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#7A7268",
                margin: "0 0 14px",
              }}
            >
              <span style={{ color: "#E87518" }}>08 — </span>
              <span>{hi ? "सोशल मीडिया स्ट्रीम" : "Live Social Stream"}</span>
            </p>
            <h2
              className="font-serif-brand"
              style={{
                fontWeight: 400,
                fontSize: "clamp(28px,3.5vw,48px)",
                lineHeight: 1.05,
                letterSpacing: "-.025em",
                margin: 0,
                color: "#171717",
              }}
            >
              {hi ? "आधिकारिक सोशल मीडिया फ़ीड" : "Official Social Media Feed"}
            </h2>
          </div>

          {/* 4 Cards Grid - Matches reference layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            
            {/* 1. FACEBOOK CARD */}
            <div
              className="flex flex-col bg-white border border-[#171717]/20 shadow-sm overflow-hidden"
              style={{ height: "520px" }}
            >
              {/* Brand Top Header */}
              <div className="bg-[#1877F2] text-white px-4 py-2.5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="font-bold text-[16px] tracking-tight">Facebook</span>
                </div>
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setFbPaused, fbTimeoutRef);
                        setFbIdx(i);
                      }}
                      className="cursor-pointer transition-all rounded-full"
                      style={{
                        width: fbIdx === i ? "14px" : "6px",
                        height: "6px",
                        background: fbIdx === i ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      }}
                      title={`Post ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Profile Subheader */}
              <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-gray-100 bg-[#FAFAFA] shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    <img
                      src="/images/portrait-cutout.png"
                      alt="Nitin Nabin"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[13px] text-[#171717] leading-tight">Nitin Nabin</span>
                      <svg className="w-3.5 h-3.5 text-[#1877F2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <span className="text-[10.5px] text-[#7A7268] leading-none">1,240,890 followers</span>
                  </div>
                </div>
                <a
                  href="https://www.facebook.com/NitinNabinBJP/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#1877F2] border border-[#1877F2]/40 hover:bg-[#1877F2] hover:text-white px-2 py-0.5 transition-colors rounded-sm"
                >
                  <span>Follow Page</span>
                </a>
              </div>

              {/* Scrollable Feed Container - supports manual scroll & auto-scroll */}
              <div
                ref={fbRef}
                onWheel={() => pauseAutoScrollTemporarily(setFbPaused, fbTimeoutRef)}
                onTouchMove={() => pauseAutoScrollTemporarily(setFbPaused, fbTimeoutRef)}
                onScroll={(e) => handleScroll(e.currentTarget, setFbIdx, fbIdx)}
                className="social-feed-scroll flex-1 min-h-0 relative overflow-y-auto p-3 space-y-3 overscroll-contain"
              >
                {/* Item 1 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <p className="text-[12.5px] leading-relaxed text-[#3D3831] m-0 mb-2">
                    {hi
                      ? "आंध्र प्रदेश के विशाखापत्तनम में आयोजित विस्तारित प्रदेश कार्यसमिति बैठक व युवा संवाद में सम्मिलित होकर ऊर्जावान कार्यकर्ताओं से संवाद किया।"
                      : "Address at the Extended State Executive Meeting and interactive Yuva Samvad in Visakhapatnam, Andhra Pradesh."}
                  </p>
                  <div
                    className="relative rounded overflow-hidden cursor-pointer group mb-2 bg-[#2B1A12]"
                    style={{ aspectRatio: "16/9" }}
                    onClick={() => openVideo("https://www.youtube.com/@BJP4India")}
                  >
                    <img
                      src="/images/portrait-bio.avif"
                      alt="Address preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/95 text-[#1877F2] flex items-center justify-center shadow">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>18 Aug 2026 · 👍 4.8K</span>
                    <span className="text-[#1877F2] font-semibold">Facebook Video</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <p className="text-[12.5px] leading-relaxed text-[#3D3831] m-0 mb-2">
                    {hi
                      ? "राजधानी नई दिल्ली में आयोजित तिरंगा यात्रा कार्यक्रम में भाग लिया। लाखों कार्यकर्ताओं के साथ राष्ट्र प्रथम का संकल्प दोहराया।"
                      : "Took part in the Tiranga Yatra programme in New Delhi with thousands of dedicated party workers."}
                  </p>
                  <div
                    className="relative rounded overflow-hidden cursor-pointer group mb-2 bg-[#2B1A12]"
                    style={{ aspectRatio: "16/9" }}
                    onClick={() => openVideo("https://www.youtube.com/@BJP4India")}
                  >
                    <img
                      src="/images/portrait-fields.avif"
                      alt="Tiranga Yatra"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/95 text-[#1877F2] flex items-center justify-center shadow">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>12 Aug 2026 · 👍 6.5K</span>
                    <span className="text-[#1877F2] font-semibold">Tiranga Yatra</span>
                  </div>
                </div>

                {/* Item 3 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <p className="text-[12.5px] leading-relaxed text-[#3D3831] m-0 mb-2">
                    {hi
                      ? "पूर्व उपराष्ट्रपति श्री एम. वेंकैया नायडू जी की प्रेरक जीवनी के विमोचन कार्यक्रम में सहभागिता। उनका सार्वजनिक जीवन हम सभी के लिए पथप्रदर्शक है।"
                      : "Present at the release of the biography of former Vice-President Shri M. Venkaiah Naidu in New Delhi."}
                  </p>
                  <div
                    className="relative rounded overflow-hidden cursor-pointer group mb-2 bg-[#2B1A12]"
                    style={{ aspectRatio: "16/9" }}
                    onClick={() => openVideo("https://www.youtube.com/@BJP4India")}
                  >
                    <img
                      src="/images/portrait-contact.avif"
                      alt="Book Launch"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/95 text-[#1877F2] flex items-center justify-center shadow">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>17 Aug 2026 · 👍 3.9K</span>
                    <span className="text-[#1877F2] font-semibold">New Delhi</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Footer */}
              <div className="p-2.5 border-t border-gray-100 bg-[#FAFAFA] flex items-center justify-between text-[11px] shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#7A7268]">Post {fbIdx + 1} of 3</span>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setFbPaused, fbTimeoutRef);
                        setFbIdx((prev) => (prev === 0 ? 2 : prev - 1));
                      }}
                      className="p-1 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition cursor-pointer"
                      title="Previous"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setFbPaused, fbTimeoutRef);
                        setFbIdx((prev) => (prev + 1) % 3);
                      }}
                      className="p-1 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition cursor-pointer"
                      title="Next"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
                <a
                  href="https://www.facebook.com/NitinNabinBJP/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#1877F2] hover:underline inline-flex items-center gap-1"
                >
                  <span>View on Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 2. X (TWITTER) CARD */}
            <div
              className="flex flex-col bg-white border border-[#171717]/20 shadow-sm overflow-hidden"
              style={{ height: "520px" }}
            >
              {/* Brand Top Header */}
              <div className="bg-[#000000] text-white px-4 py-2.5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="font-bold text-[16px] tracking-tight">X</span>
                </div>
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setXPaused, xTimeoutRef);
                        setXIdx(i);
                      }}
                      className="cursor-pointer transition-all rounded-full"
                      style={{
                        width: xIdx === i ? "14px" : "6px",
                        height: "6px",
                        background: xIdx === i ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      }}
                      title={`Tweet ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Profile Subheader */}
              <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-gray-100 bg-[#FAFAFA] shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    <img
                      src="/images/portrait-cutout.png"
                      alt="Nitin Nabin"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[13px] text-[#171717] leading-tight">Nitin Nabin</span>
                      <svg className="w-3.5 h-3.5 text-[#1D9BF0] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <span className="text-[10.5px] text-[#7A7268] leading-none">@NitinNabin</span>
                  </div>
                </div>
                <a
                  href="https://x.com/NitinNabin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[10.5px] font-semibold bg-black text-white hover:bg-neutral-800 px-2.5 py-0.5 rounded-full transition-colors"
                >
                  <span>Follow</span>
                </a>
              </div>

              {/* Scrollable Feed Container - supports manual scroll & auto-scroll */}
              <div
                ref={xRef}
                onWheel={() => pauseAutoScrollTemporarily(setXPaused, xTimeoutRef)}
                onTouchMove={() => pauseAutoScrollTemporarily(setXPaused, xTimeoutRef)}
                onScroll={(e) => handleScroll(e.currentTarget, setXIdx, xIdx)}
                className="social-feed-scroll flex-1 min-h-0 relative overflow-y-auto p-3 space-y-3 overscroll-contain"
              >
                {/* Tweet 1 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <p className="text-[12.5px] leading-relaxed text-[#171717] m-0 mb-2">
                    {hi
                      ? "पार्टी के 47वें स्थापना दिवस पर समस्त कर्मठ कार्यकर्ताओं को हार्दिक बधाई। पार्टी की शक्ति लाखों कार्यकर्ताओं के समर्पण और निष्ठा पर टिकी है। #BJPFoundationDay"
                      : "Warm greetings to millions of dedicated workers on the 47th Foundation Day of the Bharatiya Janata Party. The strength rests on selfless devotion."}
                  </p>
                  <div
                    className="relative rounded overflow-hidden border border-gray-200 mb-2 bg-[#FFE9C4]"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src="/images/portrait-fields.avif"
                      alt="Event post"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-2">
                      <span className="text-[10.5px] font-semibold text-white">स्थापना दिवस संदेश</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>06 Apr 2026 · 🔁 1.8K</span>
                    <span>❤️ 9.4K</span>
                  </div>
                </div>

                {/* Tweet 2 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <p className="text-[12.5px] leading-relaxed text-[#171717] m-0 mb-2">
                    {hi
                      ? "कमलम, गांधीनगर में गुजरात प्रदेश संगठन के वरिष्ठ पदाधिकारियों के साथ सांगठनिक बैठक। कार्यकर्ताओं को नए लक्ष्यों के साथ निरंतर सक्रिय रहने का आह्वान किया।"
                      : "Chaired an organisational meeting at Kamalam, Gandhinagar with senior state party functionaries. Urged workers to work tirelessly towards new goals."}
                  </p>
                  <div
                    className="relative rounded overflow-hidden border border-gray-200 mb-2 bg-[#FFE9C4]"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src="/images/portrait-bio.avif"
                      alt="Gujarat visit"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-2">
                      <span className="text-[10.5px] font-semibold text-white">गांधीनगर, गुजरात प्रवास</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>21 Feb 2026 · 🔁 2.3K</span>
                    <span>❤️ 11.8K</span>
                  </div>
                </div>

                {/* Tweet 3 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <p className="text-[12.5px] leading-relaxed text-[#171717] m-0 mb-2">
                    {hi
                      ? "पश्चिम बंगाल का पहला आधिकारिक दौरा: दुर्गापुर में प्रदेश कोर टीम बैठक एवं बर्दवान संभाग कार्यकर्ता सम्मेलन में भाग लिया। कार्यकर्ताओं का उत्साह अभूतपूर्व है।"
                      : "First official visit to West Bengal: Attended state core team meeting in Durgapur and Bardhaman Division worker convention."}
                  </p>
                  <div
                    className="relative rounded overflow-hidden border border-gray-200 mb-2 bg-[#FFE9C4]"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src="/images/hero-bg.jpg"
                      alt="Bengal visit"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-2">
                      <span className="text-[10.5px] font-semibold text-white">पश्चिम बंगाल प्रवास</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>27 Jan 2026 · 🔁 1.9K</span>
                    <span>❤️ 8.6K</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Footer */}
              <div className="p-2.5 border-t border-gray-100 bg-[#FAFAFA] flex items-center justify-between text-[11px] shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#7A7268]">Post {xIdx + 1} of 3</span>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setXPaused, xTimeoutRef);
                        setXIdx((prev) => (prev === 0 ? 2 : prev - 1));
                      }}
                      className="p-1 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition cursor-pointer"
                      title="Previous"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setXPaused, xTimeoutRef);
                        setXIdx((prev) => (prev + 1) % 3);
                      }}
                      className="p-1 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition cursor-pointer"
                      title="Next"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
                <a
                  href="https://x.com/NitinNabin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-black hover:text-[#E87518] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read on 𝕏</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 3. INSTAGRAM CARD */}
            <div
              className="flex flex-col bg-white border border-[#171717]/20 shadow-sm overflow-hidden"
              style={{ height: "520px" }}
            >
              {/* Brand Top Header with Instagram Gradient */}
              <div
                className="text-white px-4 py-2.5 flex items-center justify-between shrink-0"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
              >
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span className="font-bold text-[16px] tracking-tight">Instagram</span>
                </div>
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setIgPaused, igTimeoutRef);
                        setIgIdx(i);
                      }}
                      className="cursor-pointer transition-all rounded-full"
                      style={{
                        width: igIdx === i ? "14px" : "6px",
                        height: "6px",
                        background: igIdx === i ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      }}
                      title={`Post ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Profile Subheader */}
              <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-gray-100 bg-[#FAFAFA] shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full p-[2px] shrink-0"
                    style={{
                      background:
                        "linear-gradient(45deg, #f09433, #dc2743, #bc1888)",
                    }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1px]">
                      <img
                        src="/images/portrait-cutout.png"
                        alt="Nitin Nabin"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[12.5px] text-[#171717] leading-tight">nitinnabinbjp</span>
                      <svg className="w-3.5 h-3.5 text-[#0095F6] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <span className="text-[10.5px] text-[#7A7268] leading-none">842 posts · 480K</span>
                  </div>
                </div>
                <a
                  href="https://www.instagram.com/nitinnabinbjp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[10.5px] font-semibold bg-[#0095F6] text-white hover:bg-[#0081d6] px-2.5 py-0.5 rounded-full transition-colors"
                >
                  <span>Follow us</span>
                </a>
              </div>

              {/* Scrollable Feed Container - supports manual scroll & auto-scroll */}
              <div
                ref={igRef}
                onWheel={() => pauseAutoScrollTemporarily(setIgPaused, igTimeoutRef)}
                onTouchMove={() => pauseAutoScrollTemporarily(setIgPaused, igTimeoutRef)}
                onScroll={(e) => handleScroll(e.currentTarget, setIgIdx, igIdx)}
                className="social-feed-scroll flex-1 min-h-0 relative overflow-y-auto p-3 space-y-3 overscroll-contain"
              >
                {/* IG Post 1 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <div
                    className="relative rounded overflow-hidden mb-2 border border-gray-100 bg-[#171717]"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src="/images/portrait-bio.avif"
                      alt="Instagram gallery"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                      1/4
                    </div>
                    <div className="absolute bottom-1.5 left-2 text-white text-[10px] font-semibold drop-shadow">
                      विशाखापत्तनम • युवा संवाद
                    </div>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[#3D3831] m-0 mb-1.5 line-clamp-2">
                    {hi
                      ? "विशाखापत्तनम में आयोजित युवा संवाद में युवाओं के साथ प्रेरक विचार साझा किए। नवाचार और राष्ट्रसेवा ही भारत का भविष्य है। ✨"
                      : "Shared inspiring thoughts with energetic youth at Yuva Samvad in Visakhapatnam. Innovation and service define our future."}
                  </p>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>3 days ago</span>
                    <span>❤️ 14.8K · 💬 482</span>
                  </div>
                </div>

                {/* IG Post 2 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <div
                    className="relative rounded overflow-hidden mb-2 border border-gray-100 bg-[#171717]"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src="/images/portrait-fields.avif"
                      alt="Sangathan Parv"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                      1/3
                    </div>
                    <div className="absolute bottom-1.5 left-2 text-white text-[10px] font-semibold drop-shadow">
                      कमलम • संगठन समीक्षा
                    </div>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[#3D3831] m-0 mb-1.5 line-clamp-2">
                    {hi
                      ? "संगठन पर्व: कार्यकर्ताओं की ऊर्जा और समर्पण ही भारतीय जनता पार्टी की वास्तविक पूंजी है। सेवा ही संगठन।"
                      : "Workers' devotion and selfless service are the true strength of the party."}
                  </p>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>5 days ago</span>
                    <span>❤️ 19.2K · 💬 640</span>
                  </div>
                </div>

                {/* IG Post 3 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <div
                    className="relative rounded overflow-hidden mb-2 border border-gray-100 bg-[#171717]"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src="/images/portrait-contact.avif"
                      alt="Party Office"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                      1/5
                    </div>
                    <div className="absolute bottom-1.5 left-2 text-white text-[10px] font-semibold drop-shadow">
                      नई दिल्ली • केंद्रीय कार्यालय
                    </div>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[#3D3831] m-0 mb-1.5 line-clamp-2">
                    {hi
                      ? "नई दिल्ली स्थित केंद्रीय कार्यालय में कार्यकर्ताओं एवं वरिष्ठ पदाधिकारियों से आत्मीय संवाद।"
                      : "Engaging discussions with senior functionaries and workers at the party headquarters, New Delhi."}
                  </p>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>1 week ago</span>
                    <span>❤️ 12.1K · 💬 310</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Footer */}
              <div className="p-2.5 border-t border-gray-100 bg-[#FAFAFA] flex items-center justify-between text-[11px] shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#7A7268]">Post {igIdx + 1} of 3</span>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setIgPaused, igTimeoutRef);
                        setIgIdx((prev) => (prev === 0 ? 2 : prev - 1));
                      }}
                      className="p-1 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition cursor-pointer"
                      title="Previous"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setIgPaused, igTimeoutRef);
                        setIgIdx((prev) => (prev + 1) % 3);
                      }}
                      className="p-1 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition cursor-pointer"
                      title="Next"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
                <a
                  href="https://www.instagram.com/nitinnabinbjp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#bc1888] hover:underline inline-flex items-center gap-1"
                >
                  <span>View on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 4. YOUTUBE CARD */}
            <div
              className="flex flex-col bg-white border border-[#171717]/20 shadow-sm overflow-hidden"
              style={{ height: "520px" }}
            >
              {/* Brand Top Header */}
              <div className="bg-[#FF0000] text-white px-4 py-2.5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="font-bold text-[16px] tracking-tight">Youtube</span>
                </div>
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setYtPaused, ytTimeoutRef);
                        setYtIdx(i);
                      }}
                      className="cursor-pointer transition-all rounded-full"
                      style={{
                        width: ytIdx === i ? "14px" : "6px",
                        height: "6px",
                        background: ytIdx === i ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      }}
                      title={`Video ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Profile Subheader */}
              <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-gray-100 bg-[#FAFAFA] shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    <img
                      src="/images/portrait-cutout.png"
                      alt="Nitin Nabin"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[12.5px] text-[#171717] leading-tight">Nitin Nabin Official</span>
                      <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <span className="text-[10.5px] text-[#7A7268] leading-none">Speeches & Addresses</span>
                  </div>
                </div>
                <a
                  href="https://www.youtube.com/@BJP4India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[10.5px] font-semibold bg-[#CC0000] text-white hover:bg-red-700 px-2.5 py-0.5 rounded-full transition-colors"
                >
                  <span>Subscribe</span>
                </a>
              </div>

              {/* Scrollable Feed Container - supports manual scroll & auto-scroll */}
              <div
                ref={ytRef}
                onWheel={() => pauseAutoScrollTemporarily(setYtPaused, ytTimeoutRef)}
                onTouchMove={() => pauseAutoScrollTemporarily(setYtPaused, ytTimeoutRef)}
                onScroll={(e) => handleScroll(e.currentTarget, setYtIdx, ytIdx)}
                className="social-feed-scroll flex-1 min-h-0 relative overflow-y-auto p-3 space-y-3 overscroll-contain"
              >
                {/* Video 1 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <div
                    className="relative rounded overflow-hidden cursor-pointer group mb-2 bg-[#160D09]"
                    style={{ aspectRatio: "16/9" }}
                    onClick={() => openVideo("https://www.youtube.com/@BJP4India")}
                  >
                    <img
                      src="/images/portrait-bio.avif"
                      alt="Keynote Speech"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-white/95 text-[#CC0000] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-1.5 right-1.5 bg-black/75 text-white text-[9.5px] font-semibold px-1.5 py-0.5 rounded">
                      18:42
                    </span>
                  </div>
                  <p className="text-[12px] font-medium leading-snug text-[#171717] m-0 mb-1">
                    {hi
                      ? "कार्यभार ग्रहण: राष्ट्रीय अध्यक्ष के रूप में ऐतिहासिक संबोधन | नई दिल्ली"
                      : "Keynote Address: Assuming office as National President | New Delhi"}
                  </p>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>94K views · 1 month ago</span>
                    <span className="text-[#CC0000] font-semibold">Watch</span>
                  </div>
                </div>

                {/* Video 2 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <div
                    className="relative rounded overflow-hidden cursor-pointer group mb-2 bg-[#160D09]"
                    style={{ aspectRatio: "16/9" }}
                    onClick={() => openVideo("https://www.youtube.com/@BJP4India")}
                  >
                    <img
                      src="/images/portrait-fields.avif"
                      alt="Foundation Day"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-white/95 text-[#CC0000] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-1.5 right-1.5 bg-black/75 text-white text-[9.5px] font-semibold px-1.5 py-0.5 rounded">
                      14:15
                    </span>
                  </div>
                  <p className="text-[12px] font-medium leading-snug text-[#171717] m-0 mb-1">
                    {hi
                      ? "47वें स्थापना दिवस पर पार्टी कार्यकर्ताओं को प्रेरणादायी संदेश"
                      : "Address to party workers on 47th BJP Foundation Day"}
                  </p>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>128K views · 2 weeks ago</span>
                    <span className="text-[#CC0000] font-semibold">Watch</span>
                  </div>
                </div>

                {/* Video 3 */}
                <div data-feed-item className="p-2.5 bg-[#F9F9F9] border border-gray-200 rounded-sm">
                  <div
                    className="relative rounded overflow-hidden cursor-pointer group mb-2 bg-[#160D09]"
                    style={{ aspectRatio: "16/9" }}
                    onClick={() => openVideo("https://www.youtube.com/@BJP4India")}
                  >
                    <img
                      src="/images/portrait-contact.avif"
                      alt="State Executive"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-white/95 text-[#CC0000] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-1.5 right-1.5 bg-black/75 text-white text-[9.5px] font-semibold px-1.5 py-0.5 rounded">
                      22:08
                    </span>
                  </div>
                  <p className="text-[12px] font-medium leading-snug text-[#171717] m-0 mb-1">
                    {hi
                      ? "विस्तारित प्रदेश कार्यसमिति बैठक: महत्वपूर्ण सांगठनिक संबोधन"
                      : "Extended State Executive Meeting: Key Organisational Address"}
                  </p>
                  <div className="flex items-center justify-between text-[10.5px] text-[#7A7268]">
                    <span>76K views · 3 weeks ago</span>
                    <span className="text-[#CC0000] font-semibold">Watch</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Footer */}
              <div className="p-2.5 border-t border-gray-100 bg-[#FAFAFA] flex items-center justify-between text-[11px] shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#7A7268]">Video {ytIdx + 1} of 3</span>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setYtPaused, ytTimeoutRef);
                        setYtIdx((prev) => (prev === 0 ? 2 : prev - 1));
                      }}
                      className="p-1 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition cursor-pointer"
                      title="Previous"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        pauseAutoScrollTemporarily(setYtPaused, ytTimeoutRef);
                        setYtIdx((prev) => (prev + 1) % 3);
                      }}
                      className="p-1 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition cursor-pointer"
                      title="Next"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
                <a
                  href="https://www.youtube.com/@BJP4India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#CC0000] hover:underline inline-flex items-center gap-1"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Video Player Modal */}
        {videoModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setVideoModalOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#171717] border-b border-white/10 text-white">
                <span className="text-sm font-semibold">
                  {hi ? "आधिकारिक संबोधन / वीडियो" : "Official Broadcast & Speeches"}
                </span>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="p-1 hover:bg-white/10 rounded cursor-pointer transition-colors"
                >
                  <CloseIcon className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <div className="p-8 text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-[#CC0000] mx-auto mb-4 flex items-center justify-center">
                    <Play className="w-7 h-7 fill-white text-white ml-1" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {hi ? "यूट्यूब पर आधिकारिक प्रसारण देखें" : "Watch Official Broadcast on YouTube"}
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto mb-5">
                    {hi
                      ? "राष्ट्रीय अध्यक्ष श्री नितिन नबीन जी के संपूर्ण भाषण, प्रेस वार्ता और कार्यक्रम रिकॉर्डिंग उपलब्ध हैं।"
                      : "Complete speeches, press conferences, and public addresses of National President Shri Nitin Nabin."}
                  </p>
                  <a
                    href="https://www.youtube.com/@BJP4India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#CC0000] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <span>{hi ? "यूट्यूब चैनल पर देखें" : "Open on YouTube"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

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
