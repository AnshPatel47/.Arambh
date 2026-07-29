"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Global module-level flag to trace if loader already ran in the session
let hasLoadedGlobal = false;

export default function ClientMountLoader({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(hasLoadedGlobal);
  const [isTransitionLoading, setIsTransitionLoading] = useState(false);
  const pathname = usePathname();

  // Reset transition loader whenever the pathname changes
  useEffect(() => {
    setIsTransitionLoading(false);
  }, [pathname]);

  // Initial mount load
  useEffect(() => {
    if (!hasLoadedGlobal) {
      hasLoadedGlobal = true;
      setMounted(true);
    }
  }, []);

  // Listen to document links click to intercept page transitions
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // 1. Only handle left-clicks without modifier keys
      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // 2. Find closest anchor ancestor of the clicked element
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      // 3. Ignore if default is prevented, or target is _blank
      if (e.defaultPrevented) return;
      if (anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // 4. Ignore external links, mailto/tel, hash anchors on current page
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Check if same origin (internal link)
        if (targetUrl.origin !== currentUrl.origin) {
          return;
        }

        // Check if path is different (ignore same-page hash scrolling)
        if (targetUrl.pathname === currentUrl.pathname) {
          return;
        }

        // Show transition loader
        setIsTransitionLoading(true);
      } catch {
        // Fallback for invalid URLs
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  // Safety fallback to prevent permanently stuck loader
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isTransitionLoading) {
      timeout = setTimeout(() => {
        setIsTransitionLoading(false);
      }, 8000); // 8-second safety fallback
    }
    return () => clearTimeout(timeout);
  }, [isTransitionLoading]);

  const showLoader = !mounted || isTransitionLoading;

  if (showLoader) {
    return (
      <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#FBF7EE] transition-opacity duration-300">
        <div className="flex flex-col items-center gap-4">
          {/* Elegant Spinning Circle */}
          <div className="relative h-12 w-12">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[#C2943A]/20" />
            {/* Spinning Segment */}
            <div className="absolute inset-0 rounded-full border-4 border-[#C2943A] border-t-transparent animate-spin" />
          </div>

          {/* Arambh Brand Text */}
          <div className="flex flex-col items-center text-center">
            <span className="text-[13px] font-bold tracking-[0.08em] text-[#131313] uppercase">
              Arambh Advisory
            </span>
            <span className="text-[9px] font-medium tracking-[0.1em] text-[#666666] uppercase mt-0.5">
              Services LLP
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
