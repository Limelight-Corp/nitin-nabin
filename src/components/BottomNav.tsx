"use client";

import React from "react";
import { Language } from "@/data/websiteData";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
  lang,
}) => {
  const tabs = [
    {
      id: "home",
      en: "Home",
      hi: "होम",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 10.5 12 3l9 7.5V21H3z" />
        </svg>
      ),
    },
    {
      id: "journey",
      en: "Journey",
      hi: "यात्रा",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 20V4M4 12h10M20 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        </svg>
      ),
    },
    {
      id: "updates",
      en: "Updates",
      hi: "अपडेट",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 5h16M4 12h16M4 19h10" />
        </svg>
      ),
    },
    {
      id: "speeches",
      en: "Speeches",
      hi: "भाषण",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v11M8 8a4 4 0 0 0 8 0M5 21h14" />
        </svg>
      ),
    },
    {
      id: "media",
      en: "Media",
      hi: "मीडिया",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      data-tabbar=""
      aria-label="Quick navigation"
      className="mobile-tabbar"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 120,
        gridTemplateColumns: "repeat(5, 1fr)",
        background: "rgba(30,17,11,.96)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid rgba(255,247,233,.18)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = currentPage === tab.id;
        const label = lang === "hi" ? tab.hi : tab.en;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onNavigate(tab.id)}
            style={{
              background: isActive ? "rgba(232,117,24,.1)" : "transparent",
              border: 0,
              borderTop: isActive
                ? "2px solid #E87518"
                : "2px solid transparent",
              padding: "9px 4px 10px",
              minHeight: "56px",
              cursor: "pointer",
              color: isActive ? "#E87518" : "rgba(255,248,236,.6)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              transition: "all .15s ease",
            }}
          >
            {tab.icon}
            <span
              style={{
                font: "600 9px/1 'Archivo', sans-serif",
                letterSpacing: ".09em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
