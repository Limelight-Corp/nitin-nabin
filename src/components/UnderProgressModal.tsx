"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Language } from "@/data/websiteData";

interface UnderProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onNavigate: (page: string) => void;
}

export const UnderProgressModal: React.FC<UnderProgressModalProps> = ({
  isOpen,
  onClose,
  lang,
  onNavigate,
}) => {
  const hi = lang === "hi";

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDismiss = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="under-progress-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-[#0F0D0A]/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[540px] bg-[#FFFDF9] border border-[#171717]/20 shadow-2xl overflow-hidden my-auto"
            style={{ borderRadius: "0px" }}
          >
            {/* Top Saffron Border Accent */}
            <div className="h-1.5 w-full bg-[#E87518]" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              aria-label={hi ? "बंद करें" : "Close notice"}
              className="absolute top-4 right-4 p-2 text-[#7A7268] hover:text-[#171717] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Dignified Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF4E5] border border-[#E87518]/30 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E87518] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E87518]" />
                </span>
                <span
                  style={{
                    font: "600 11px/1.2 'Archivo', sans-serif",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "#A44C09",
                  }}
                >
                  {hi ? "आधिकारिक सूचना • विकास कार्य प्रगति पर" : "Official Notice • Under Development"}
                </span>
              </div>

              {/* Title & Icon Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-[#FFF4E5] border border-[#E87518]/40 text-[#E87518] flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2
                    id="under-progress-title"
                    className="font-serif-brand text-[24px] sm:text-[28px] font-normal text-[#171717] leading-tight"
                  >
                    {hi ? "पोर्टल विकास कार्य प्रगति पर है" : "Website Under Development"}
                  </h2>
                  <p
                    style={{
                      font: "500 13px/1.4 'Archivo', sans-serif",
                      color: "#7A7268",
                      marginTop: "3px",
                    }}
                  >
                    {hi ? "श्री नितिन नबीन • आधिकारिक डिजिटल मंच" : "Shri Nitin Nabin • Official Digital Portal"}
                  </p>
                </div>
              </div>

              {/* Gentle, Dignified Message Body */}
              <div
                className="pt-4 border-t border-[#171717]/10 space-y-3"
                style={{
                  font: "400 14.5px/1.7 'Archivo', sans-serif",
                  color: "#3D3831",
                }}
              >
                <p>
                  {hi ? (
                    <>
                      श्री नितिन नबीन जी के आधिकारिक पोर्टल का निर्माण एवं नवीनीकरण कार्य प्रगति पर है।
                      हम आपके लिए एक संपूर्ण, प्रामाणिक और सहज डिजिटल अनुभव तैयार कर रहे हैं।
                    </>
                  ) : (
                    <>
                      The official portal of Shri Nitin Nabin is currently under active development.
                      We are crafting an authentic, comprehensive, and seamless digital experience.
                    </>
                  )}
                </p>
                <p className="text-[13.5px] text-[#5C564F]">
                  {hi ? (
                    <>
                      शीघ्र ही संपूर्ण सार्वजनिक अभिलेख, यात्रा विवरण एवं नवीनतम समाचार यहाँ उपलब्ध होंगे।
                      तब तक आप पोर्टल का पूर्वावलोकन देख सकते हैं।
                    </>
                  ) : (
                    <>
                      The complete archive of public records, legislative journey, and updates will be
                      fully unveiled shortly. In the meantime, you are welcome to preview the portal.
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
