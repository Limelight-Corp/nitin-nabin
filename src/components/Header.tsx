"use client";

import React, { useState, useEffect } from "react";
import { Language, NAV_ITEMS } from "@/data/websiteData";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  lang,
  onToggleLang,
  onOpenSearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, y / totalHeight));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* Top Header Bar */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(30,17,11,.94)",
          backdropFilter: "blur(14px) saturate(1.2)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,247,233,.16)",
        }}
      >
        <div
          data-hdr-inner=""
          style={{
            maxWidth: "1680px",
            margin: "0 auto",
            padding: "0 clamp(18px, 3vw, 48px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            height: scrolled ? "64px" : "84px",
            transition: "height .28s ease",
          }}
        >
          {/* Brand Mark */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "13px",
              background: "transparent",
              border: 0,
              padding: 0,
              cursor: "pointer",
              color: "#FFF8EC",
              flex: "none",
              textAlign: "left",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                background: "#E87518",
                flex: "none",
                display: "block",
              }}
            />
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
              }}
            >
              <span
                data-i18n="brand"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "20px",
                  fontWeight: 500,
                  letterSpacing: "-.01em",
                  color: "#FFF8EC",
                }}
              >
                {lang === "hi" ? "नितिन नबीन" : "Nitin Nabin"}
              </span>
              <span
                data-deskonly=""
                data-i18n="role.short"
                style={{
                  font: "600 9.5px/1.4 'Archivo', sans-serif",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#C9A987",
                  marginTop: "4px",
                }}
              >
                {lang === "hi"
                  ? "राष्ट्रीय अध्यक्ष, भाजपा"
                  : "National President, BJP"}
              </span>
            </span>
          </button>

          {/* Desktop Navigation Links (data-navdesk) */}
          <nav
            data-navdesk=""
            aria-label="Primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(10px, 1.3vw, 22px)",
            }}
          >
            {NAV_ITEMS.map((n) => {
              const active = currentPage === n.id;
              const label = lang === "hi" ? n.hi : n.en;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => onNavigate(n.id)}
                  style={{
                    background: "transparent",
                    border: 0,
                    borderBottom: active
                      ? "2px solid #E87518"
                      : "2px solid transparent",
                    padding: "7px 0",
                    cursor: "pointer",
                    font: active
                      ? "700 12px/1 'Archivo', sans-serif"
                      : "500 12px/1 'Archivo', sans-serif",
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    color: active ? "#FFF8EC" : "rgba(255,248,236,.62)",
                    transition: "color .2s ease, border-color .2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#FFF8EC";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "rgba(255,248,236,.62)";
                    }
                  }}
                >
                  {label}
                </button>
              );
            })}

            {/* Desktop Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search the archive"
              title="Search the archive"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "transparent",
                border: "1px solid rgba(255,247,233,.28)",
                color: "#FFF8EC",
                font: "500 11px/1 'Archivo', sans-serif",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                padding: "10px 11px",
                cursor: "pointer",
                transition: "background .2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,247,233,.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Desktop Language Switcher [ EN | हिं ] */}
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(255,247,233,.28)",
              }}
            >
              <button
                type="button"
                onClick={() => onToggleLang("en")}
                style={{
                  background: lang === "en" ? "#E87518" : "transparent",
                  color: lang === "en" ? "#171717" : "rgba(255,248,236,.62)",
                  border: 0,
                  padding: "10px 11px",
                  cursor: "pointer",
                  font: "600 10.5px/1 'Archivo', sans-serif",
                  letterSpacing: ".1em",
                  transition: "background .2s ease, color .2s ease",
                }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onToggleLang("hi")}
                lang="hi"
                style={{
                  background: lang === "hi" ? "#E87518" : "transparent",
                  color: lang === "hi" ? "#171717" : "rgba(255,248,236,.62)",
                  border: 0,
                  borderLeft: "1px solid rgba(255,247,233,.28)",
                  padding: "9px 11px",
                  cursor: "pointer",
                  font: "600 12px/1 'Noto Serif Devanagari', 'Newsreader', serif",
                  transition: "background .2s ease, color .2s ease",
                }}
              >
                हिं
              </button>
            </div>

            {/* Saffron Desktop CTA Button */}
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#E87518",
                color: "#171717",
                border: 0,
                font: "600 11px/1 'Archivo', sans-serif",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                padding: "12px 15px",
                cursor: "pointer",
                borderRadius: 0,
                whiteSpace: "nowrap",
                transition: "background .2s ease, color .2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#8F430A";
                e.currentTarget.style.color = "#F7F4EE";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E87518";
                e.currentTarget.style.color = "#171717";
              }}
            >
              {lang === "hi"
                ? "सत्यापित अपडेट देखें"
                : "FOLLOW VERIFIED UPDATES"}
            </button>
          </nav>

          {/* Mobile Right Controls (data-navmob) */}
          <div
            data-navmob=""
            style={{
              display: "none",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/* 1. Mobile Search Icon Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search the archive"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid rgba(255,247,233,.28)",
                color: "#FFF8EC",
                padding: "12px",
                cursor: "pointer",
                minWidth: "44px",
                minHeight: "44px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* 2. Mobile Language Toggle Button */}
            <button
              type="button"
              onClick={() => onToggleLang(lang === "en" ? "hi" : "en")}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,247,233,.28)",
                color: "#FFF8EC",
                padding: "12px 12px",
                cursor: "pointer",
                font: "600 11px/1 'Archivo', sans-serif",
                letterSpacing: ".08em",
                minHeight: "44px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {lang === "en" ? "हिं" : "EN"}
            </button>

            {/* 3. Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                background: "transparent",
                border: "1px solid rgba(255,247,233,.28)",
                color: "#FFF8EC",
                font: "600 11px/1 'Archivo', sans-serif",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                padding: "12px 13px",
                cursor: "pointer",
                minHeight: "44px",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              <span>{lang === "hi" ? "मेन्यू" : "MENU"}</span>
            </button>
          </div>
        </div>

        {/* Saffron Reading Progress Bar */}
        <div
          style={{
            height: "2px",
            background: "#E87518",
            transformOrigin: "0 50%",
            transform: `scaleX(${scrollProgress})`,
            transition: "transform .1s linear",
          }}
        />
      </header>

      {/* Exact Mobile Full-Screen Sidebar / Drawer */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            background: "#21130D",
            color: "#FFF8EC",
            display: "flex",
            flexDirection: "column",
            animation: "nnFade .26s ease both",
          }}
        >
          {/* Top Bar inside Drawer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px clamp(20px, 5vw, 40px)",
              borderBottom: "1px solid rgba(255,247,233,.2)",
            }}
          >
            <span
              data-i18n="brand"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "20px",
                fontWeight: 500,
                letterSpacing: "-.01em",
                color: "#FFF8EC",
              }}
            >
              {lang === "hi" ? "नितिन नबीन" : "Nitin Nabin"}
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              data-i18n="close"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,247,233,.3)",
                color: "#FFF8EC",
                font: "600 11px/1 'Archivo', sans-serif",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                padding: "13px 15px",
                cursor: "pointer",
              }}
            >
              {lang === "hi" ? "बंद करें" : "CLOSE"}
            </button>
          </div>

          {/* Drawer Scrollable Navigation Body */}
          <nav
            aria-label="Mobile"
            data-lenis-prevent
            style={{
              flex: 1,
              overflowY: "auto",
              padding:
                "6px clamp(20px, 5vw, 40px) calc(40px + env(safe-area-inset-bottom))",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Search The Archive Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenSearch();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "14px 0 6px",
                padding: "16px 18px",
                background: "rgba(255,247,233,.08)",
                border: "1px solid rgba(255,247,233,.24)",
                color: "rgba(255,248,236,.72)",
                cursor: "pointer",
                minHeight: "52px",
                textAlign: "left",
                font: "400 15px/1 'Archivo', sans-serif",
                width: "100%",
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span data-i18n="search.placeholder">
                {lang === "hi" ? "संग्रह में खोजें" : "Search the archive"}
              </span>
            </button>

            {/* 9 Items: 01 Home, 02 About, ... */}
            {NAV_ITEMS.map((n) => {
              const label = lang === "hi" ? n.hi : n.en;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    onNavigate(n.id);
                    setMenuOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "16px",
                    padding: "19px 0",
                    border: 0,
                    borderBottom: "1px solid rgba(255,247,233,.14)",
                    background: "transparent",
                    color: "#FFF8EC",
                    minHeight: "44px",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      font: "600 10px/1 'Archivo', sans-serif",
                      letterSpacing: ".14em",
                      color: "#E87518",
                      width: "24px",
                      flex: "none",
                    }}
                  >
                    {n.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "29px",
                      fontWeight: 400,
                      letterSpacing: "-.01em",
                      color: "#FFF8EC",
                    }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}

            {/* Saffron Full Width CTA Button */}
            <button
              type="button"
              onClick={() => {
                onNavigate("contact");
                setMenuOpen(false);
              }}
              data-i18n="cta.follow"
              style={{
                marginTop: "26px",
                background: "#E87518",
                color: "#21130D",
                border: 0,
                font: "700 12px/1 'Archivo', sans-serif",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                padding: "20px",
                cursor: "pointer",
                minHeight: "52px",
                textAlign: "left",
                width: "100%",
              }}
            >
              {lang === "hi"
                ? "सत्यापित अपडेट प्राप्त करें"
                : "FOLLOW VERIFIED UPDATES"}
            </button>
          </nav>
        </div>
      )}
    </>
  );
};
