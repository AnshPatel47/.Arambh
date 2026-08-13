"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroHeaderProps {
  breadcrumbCurrent: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function PageHeroHeader({
  breadcrumbCurrent,
  title,
  description,
  align = "left",
  className = "",
}: PageHeroHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`relative z-20 mx-auto max-w-[1440px] w-full flex flex-col justify-center ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {/* Breadcrumbs: HOME › CURRENT PAGE */}
      <nav
        className={`flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#C2943A] mb-6 sm:mb-8 uppercase rv-up ${
          isCenter ? "justify-center" : "justify-start"
        }`}
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-zinc-500" />
        <span className="text-white">{breadcrumbCurrent}</span>
      </nav>

      {/* Main Header Content */}
      <div
        className={`max-w-2xl flex flex-col ${
          isCenter ? "items-center text-center" : "items-start text-left"
        }`}
      >
        {/* Responsive Heading */}
        <h1
          className="text-[26px] xs:text-[30px] sm:text-[36px] md:text-[clamp(2rem,3.2vw,3.2rem)] leading-[1.2] md:leading-[1.05] tracking-[-0.04em] text-white mb-4 rv-up"
          style={{
            fontFamily: "var(--font-dm), sans-serif",
            fontWeight: 500,
          }}
        >
          {title}
        </h1>

        {/* Responsive Description */}
        {description && (
          <p
            className="text-[14px] sm:text-[16px] leading-[1.6] text-zinc-300 max-w-xl rv-up"
            style={{
              fontFamily: "var(--font-dm), sans-serif",
              fontWeight: 400,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}