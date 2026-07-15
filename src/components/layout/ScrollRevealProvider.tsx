"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px", // Trigger slightly before element enters view
      }
    );

    // Keep track of observed elements to prevent double observing
    const observedElements = new Set<Element>();

    const observeNewElements = () => {
      const elements = document.querySelectorAll(".reveal, .rv-up");
      elements.forEach((el) => {
        if (!observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    };

    // Observe already rendered elements on mount
    observeNewElements();

    // Set up MutationObserver to detect lazy loaded dynamic components when they render
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldRequery = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldRequery = true;
          break;
        }
      }
      if (shouldRequery) {
        observeNewElements();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup observers on unmount or navigation
    return () => {
      observedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
