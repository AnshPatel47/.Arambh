"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import SectionErrorBoundary from "@/components/ui/SectionErrorBoundary";

const Hero = dynamic(() => import("./Hero"), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-white animate-pulse" />
});

const Founders = dynamic(() => import("./Founders"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-white animate-pulse rounded-3xl" />
});

const Values = dynamic(() => import("./Values"), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-white animate-pulse rounded-3xl" />
});

const Process = dynamic(() => import("./Process"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-white animate-pulse rounded-3xl" />
});

const CTASection = dynamic(() => import("./CTASection"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-white animate-pulse rounded-3xl" />
});

export default function About() {
  useEffect(() => {
    // Add no-scrollbar class to html tag to remove right side scrollbar
    document.documentElement.classList.add("no-scrollbar");
    return () => {
      document.documentElement.classList.remove("no-scrollbar");
    };
  }, []);

  return (
    <main className="bg-white overflow-x-clip">
      <SectionErrorBoundary sectionName="About Hero">
        <Hero />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Founders">
        <Founders />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Values">
        <Values />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Process">
        <Process />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Problem & Solutions">
        <CTASection />
      </SectionErrorBoundary>
    </main>
  );
}