"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { HomeView } from "@/components/HomeView";
import { BottomNav } from "@/components/BottomNav";
import { UnderProgressModal } from "@/components/UnderProgressModal";
import { Language } from "@/data/websiteData";

const PAGE_EXIT_MS = 400;

export default function Page() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [lang, setLang] = useState<Language>("en");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [underProgressOpen, setUnderProgressOpen] = useState<boolean>(true);

  // Synchronize initial page with URL hash and block access to any other page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash && hash !== "home") {
        // Block direct hash access to other pages (e.g. #about, #journey, #contact)
        window.history.replaceState(null, "", window.location.pathname);
        setCurrentPage("home");
        setUnderProgressOpen(true);
      } else {
        setCurrentPage("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Global keydown shortcut for Search modal (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const handleNavigate = (page: string) => {
    if (page && page !== "home") {
      // Strictly prevent access to any other page while under development
      setUnderProgressOpen(true);
      if (window.location.hash && window.location.hash !== "#home") {
        window.history.replaceState(null, "", window.location.pathname);
      }
      return;
    }

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: PAGE_EXIT_MS / 1000 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setCurrentPage("home");
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#171717]">
      {/* Dynamic Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Area — Strictly locked to HomeView while under development */}
      <main data-main="" className="flex-1 pt-21">
        <HomeView lang={lang} onNavigate={handleNavigate} />
      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
      />

      {/* Global Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />

      {/* Global Real-time Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        lang={lang}
        onNavigate={handleNavigate}
      />

      {/* Global Under Progress Notice Modal */}
      <UnderProgressModal
        isOpen={underProgressOpen}
        onClose={() => setUnderProgressOpen(false)}
        lang={lang}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
