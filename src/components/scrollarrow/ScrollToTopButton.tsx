"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopButtonProps {
  /** Hero section ID to trigger after scrolling past it */
  heroSectionId?: string;
  /** Fallback scroll Y distance in pixels */
  scrollThreshold?: number;
  className?: string;
}

export default function ScrollToTopButton({
  heroSectionId = "hero-section",
  scrollThreshold = 400,
  className = "",
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let threshold = scrollThreshold;

      if (heroSectionId) {
        const heroEl = document.getElementById(heroSectionId);
        if (heroEl) {
          threshold = heroEl.offsetHeight;
        }
      }

      // Show button as soon as user scrolls past hero section
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroSectionId, scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[999] w-11 h-11 rounded-full bg-[#BD8E32] hover:bg-[#764A04] text-white flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer ${className}`}
      title="Scroll to top"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}