"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ctaCards } from "./about.data";

const tabNames = ["Business Foundation", "Business Growth"];

export default function CTASection() {
  const [activeTab, setActiveTab] = useState(0);
  const card = ctaCards[activeTab];

  return (
    <section
      className="w-full pt-0 pb-20 lg:pt-0 lg:pb-32 reveal overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 60% 45% at 10% 18%,rgba(245,158,11,.14) 0%,transparent 60%),radial-gradient(ellipse 55% 45% at 90% 85%,rgba(13,74,34,.11) 0%,transparent 60%),#F8F4EC",
      }}
    >
      {/* Top Divider Line */}
      <div className="w-full border-t border-[#E6DFD4] opacity-80" />

      <div className="mx-auto max-w-[1240px] px-6 lg:px-12 pt-12 lg:pt-20">
        {/* Section Heading & Description */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-10 md:mb-12">
          <h2 className="text-[32px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.03em] text-[#131313] mb-4">
            Solving Your <span className="text-[#C2943A]">Business Foundation</span> & <span className="text-[#C2943A]">Strategic Growth</span> Hurdles
          </h2>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-[#666665]">
            Every stage of the entrepreneurial journey comes with distinct challenges. We turn legal complexities and compliance burdens into clear, execution-ready roadmaps.
          </p>
        </div>

        {/* Top Pill Buttons Navigation */}
        <div className="flex flex-row items-center justify-center gap-2.5 mb-10 md:mb-16 w-full max-w-[480px] mx-auto px-4">
          {tabNames.map((name, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={name}
                onClick={() => setActiveTab(index)}
                className={`flex-1 text-center py-2.5 sm:py-3 px-4 sm:px-7 rounded-full text-[13px] sm:text-[15px] font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-black text-white shadow-[0_10px_25px_-5px_rgba(0,77,37,0.35)] scale-[1.02]"
                    : "bg-white text-[#4A4A49] border border-[#E6DFD4] hover:bg-[#F5F1EA] hover:text-[#131313]"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Problem & Solution Interactive View */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-[68px] relative pb-8 lg:pb-12">
          {/* Problem Card + Button Column */}
          <div className="w-full lg:flex-1 flex flex-col justify-between">
            <div className="rounded-[28px] border border-[#FCE3CA] bg-gradient-to-br from-[#FFFDF9] via-[#FFF8F0] to-[#FFF2E2] p-7 md:p-9 text-left shadow-[0_16px_36px_-8px_rgba(217,119,6,0.09),0_4px_12px_-2px_rgba(0,0,0,0.03)] transition-all duration-300 min-h-[230px] flex flex-col justify-start">
              <div className="flex items-center gap-2.5 mb-5 shrink-0">
                <span className="relative flex items-center justify-center h-4 w-4 shrink-0 rounded-full bg-gradient-to-tr from-[#D97706] to-[#F59E0B] shadow-[0_0_8px_rgba(217,119,6,0.45)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                </span>
                <h4 className="text-[22px] md:text-[24px] font-bold text-[#131313] tracking-[-0.01em]">
                  Problem
                </h4>
              </div>
              <p className="text-[15px] md:text-[16px] font-semibold text-[#131313] leading-snug mb-3">
                {card.problem.title}
              </p>
              <p className="text-[14px] text-[#555554] leading-relaxed">
                {card.problem.description}
              </p>
            </div>

            {/* Action Button below Problem Card - Hidden on Mobile */}
            <div className="hidden lg:block mt-8">
              <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-white text-[14px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_8px_20px_-4px_rgba(0,77,37,0.3)] w-[210px] sm:w-[240px]">
                <span>{card.button}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Connecting Curved Arrow */}
          <div className="flex justify-center items-center shrink-0 self-center lg:absolute lg:left-1/2 lg:-translate-x-[38px] lg:top-24 py-2 lg:py-0 z-10">
            <svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#0D4A22] transform rotate-90 lg:rotate-0 shrink-0"
              style={{ filter: "drop-shadow(0px 1px 3px rgba(13, 74, 34, 0.25))" }}
            >
              <path
                d="M 4 8 Q 24 8 38 30 Q 52 52 72 52 M 64 46 L 72 52 L 65 58"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Solution Card Column (Adjusted Downwards on Desktop) */}
          <div className="w-full lg:flex-1 flex flex-col justify-start lg:mt-12">
            <div className="rounded-[28px] border border-[#DCFCE7] bg-gradient-to-br from-[#F5FBF7] via-[#EFFBF3] to-[#E3F8EB] p-7 md:p-9 text-left shadow-[0_16px_36px_-8px_rgba(22,163,74,0.09),0_4px_12px_-2px_rgba(0,0,0,0.03)] transition-all duration-300 min-h-[230px] flex flex-col justify-start">
              <div className="flex items-center gap-2.5 mb-5 shrink-0">
                <span className="relative flex items-center justify-center h-4 w-4 shrink-0 rounded-full bg-gradient-to-tr from-[#15803D] to-[#22C55E] shadow-[0_0_8px_rgba(22,163,74,0.45)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                </span>
                <h4 className="text-[22px] md:text-[24px] font-bold text-[#131313] tracking-[-0.01em]">
                  Solution
                </h4>
              </div>
              <p className="text-[15px] md:text-[16px] font-semibold text-[#131313] leading-snug mb-3">
                {card.solution.title}
              </p>
              <p className="text-[14px] text-[#334155] leading-relaxed">
                {card.solution.description}
              </p>
            </div>

            {/* Action Button below Solution Card - Visible on Mobile only */}
            <div className="block lg:hidden mt-8">
              <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-white text-[14px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_8px_20px_-4px_rgba(0,77,37,0.3)] w-[210px] sm:w-[240px]">
                <span>{card.button}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}