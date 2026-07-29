"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { stats } from "./about.data";

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/about_hero_bg.png"
          alt="Arambh Advisory Team collaborating"
          fill
          priority
          className="object-cover"
        />
      </div>

      <section className="relative z-20 w-full pt-44 pb-20 lg:pb-24 px-6 sm:px-12 md:px-16 flex flex-col justify-center min-h-[440px] lg:min-h-[480px]">
        {/* Dark Gradient Overlay to make text stand out (contained only inside the content section) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0" />
        
        <div className="relative z-20 mx-auto max-w-[1440px] w-full flex flex-col justify-center">
          {/* Breadcrumbs: Home › About */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#C2943A] mb-8 uppercase rv-up" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-white">About</span>
          </nav>

          <div className="max-w-2xl flex flex-col items-start text-left">
            <h1 
              className="text-[26px] leading-[1.2] md:text-[clamp(2rem,3.2vw,3.2rem)] md:leading-[1.05] tracking-[-0.04em] text-white mb-4 rv-up"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 500,
              }}
            >
              Small on purpose.
              <br />
              <span className="text-[#C2943A]">
                Accountable by design.
              </span>
            </h1>
            <p 
              className="text-[16px] leading-[1.6] text-zinc-300 max-w-xl rv-up"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 400,
              }}
            >
              Arambh means beginning. We exist so that a founder&apos;s beginning
              is done right: the structure, the filings, the funding, and a real
              person who stays on the line long after the certificates arrive.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar (Moved to transition/white area below, but retaining original styling over background image) */}
      <div className="relative z-20 w-full border-t border-white border-b border-white/10 bg-white/5 backdrop-blur-md overflow-hidden lg:h-[192px]">
        {/* Dark overlay to restore full dark shadow for stats section */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md -z-10" />
        
        {/* Animated Golden Line below the white border */}
        <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden z-30 pointer-events-none">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            className="h-full bg-[#C2943A]"
          />
        </div>

        <div className="mx-auto max-w-[1304px] w-full h-full px-6 lg:px-0 reveal">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 w-full h-full justify-center">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                className="flex flex-col items-center justify-start w-full lg:h-[190px] px-4 lg:px-8 py-6 lg:pt-[54px] relative overflow-hidden"
              >
                {/* Centered content block inside the column */}
                <div className="flex flex-col items-center text-center max-w-[260px] sm:max-w-[280px] lg:max-w-[300px] mx-auto w-full">
                  <h2 
                    className="text-[40px] md:text-[52px] font-bold leading-none tracking-tight text-[#C2943A]"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    {stat.value}
                  </h2>

                  <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-white/80">
                    {stat.label}
                  </p>
                </div>
                
                {/* Divider lines between cells */}
                {index !== stats.length - 1 && (
                  <>
                    {/* Desktop vertical line divider */}
                    <div className="hidden lg:block absolute right-0 top-[1px] bottom-[1px] w-px bg-white/10" />
                    
                    {/* Mobile/Tablet horizontal line divider */}
                    <div className="block lg:hidden absolute bottom-0 left-6 right-6 h-px bg-white/10" />
                  </>
                )}

                {/* Tablet vertical line divider for columns (2x2 layout on sm/md) */}
                {index % 2 === 0 && (
                  <div className="hidden sm:block lg:hidden absolute right-0 top-6 bottom-6 w-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}