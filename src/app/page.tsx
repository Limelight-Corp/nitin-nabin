"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { HomeView } from "@/components/HomeView";
import { AboutView } from "@/components/AboutView";
import { JourneyView } from "@/components/JourneyView";
import { LeadershipView } from "@/components/LeadershipView";
import { WorkView } from "@/components/WorkView";
import { SpeechesView } from "@/components/SpeechesView";
import { MediaView } from "@/components/MediaView";
import { UpdatesView } from "@/components/UpdatesView";
import { ContactView } from "@/components/ContactView";
import { BottomNav } from "@/components/BottomNav";
import { Language } from "@/data/websiteData";

// Single source of truth for the route crossfade's exit duration, shared
// with the scroll-to-top glide in handleNavigate below so they finish
// together instead of racing each other.
const PAGE_EXIT_MS = 400;

export default function Page() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [lang, setLang] = useState<Language>("hi");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Synchronize initial page with URL hash and listen to hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      const validPages = [
        "home",
        "about",
        "journey",
        "leadership",
        "work",
        "speeches",
        "media",
        "updates",
        "contact",
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
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
    // Scroll to top BEFORE swapping content: the outgoing page stays fully
    // mounted for PAGE_EXIT_MS (AnimatePresence "wait"), so there's a full
    // scrollable range to glide through. Keeping this duration <= the exit
    // transition's duration means we reach 0 before the shorter incoming
    // page mounts — otherwise the browser clamps scrollY the instant the
    // (now taller-than-content) scroll position becomes invalid, which
    // reads as a jarring snap instead of a smooth scroll.
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: PAGE_EXIT_MS / 1000 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setCurrentPage(page);
    window.location.hash = page;
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

      {/* Main Page Area */}
      <main data-main="" className="flex-1 pt-21">
        <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: PAGE_EXIT_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
        >
          {currentPage === "home" && (
            <HomeView lang={lang} onNavigate={handleNavigate} />
          )}
          {currentPage === "about" && (
            <AboutView lang={lang} onNavigate={handleNavigate} />
          )}
          {currentPage === "journey" && (
            <JourneyView lang={lang} onNavigate={handleNavigate} />
          )}
          {currentPage === "leadership" && (
            <LeadershipView lang={lang} onNavigate={handleNavigate} />
          )}
          {currentPage === "work" && (
            <WorkView lang={lang} onNavigate={handleNavigate} />
          )}
          {currentPage === "speeches" && (
            <SpeechesView lang={lang} onNavigate={handleNavigate} />
          )}
          {currentPage === "media" && (
            <MediaView lang={lang} onNavigate={handleNavigate} />
          )}
          {currentPage === "updates" && (
            <UpdatesView lang={lang} onNavigate={handleNavigate} />
          )}
          {currentPage === "contact" && (
            <ContactView lang={lang} onNavigate={handleNavigate} />
          )}
        </motion.div>
        </AnimatePresence>
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
    </div>
  );
}
