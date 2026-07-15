"use client";

import { useEffect } from "react";
import Hero from "./Hero";
import dynamic from "next/dynamic";

const Founders = dynamic(() => import("./Founders"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-[#F6F4F0] animate-pulse rounded-3xl" />
});

const Values = dynamic(() => import("./Values"), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-white animate-pulse rounded-3xl" />
});

const Process = dynamic(() => import("./Process"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-[#FFF8F6] animate-pulse rounded-3xl" />
});

const FounderNote = dynamic(() => import("./FounderNote"), {
  ssr: false,
  loading: () => <div className="w-full h-[450px] bg-[#F6F4F0] animate-pulse rounded-3xl" />
});

const CTASection = dynamic(() => import("./CTASection"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-[#FFF8F6] animate-pulse rounded-3xl" />
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
      <Hero />

      <Founders />

      <Values />

      <Process />

      <FounderNote />

      <CTASection />
    </main>
  );
}