"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowUpRight, 
  Briefcase, 
  Building2, 
  Landmark, 
  Coins, 
  Wallet, 
  Sprout, 
  GraduationCap, 
  HeartPulse, 
  Rocket, 
  ShieldCheck, 
  Award, 
  FileText 
} from "lucide-react";
import { Scheme } from "./hero.types";

interface SchemeCardProps {
  scheme: Scheme;
}

// Map Lucide icons by exact icon name string
const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Building2,
  Landmark,
  Coins,
  Wallet,
  Sprout,
  GraduationCap,
  HeartPulse,
  Rocket,
  ShieldCheck,
  Award,
  FileText,
};

// Automatic fallback: matches keywords in scheme title to a relevant icon
const getMatchingIconByTitle = (title: string = ""): React.ElementType => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("loan") || lowerTitle.includes("bank") || lowerTitle.includes("subsidy")) return Landmark;
  if (lowerTitle.includes("finance") || lowerTitle.includes("fund") || lowerTitle.includes("money")) return Coins;
  if (lowerTitle.includes("business") || lowerTitle.includes("job") || lowerTitle.includes("work")) return Briefcase;
  if (lowerTitle.includes("startup") || lowerTitle.includes("tech") || lowerTitle.includes("innovation")) return Rocket;
  if (lowerTitle.includes("farm") || lowerTitle.includes("agri") || lowerTitle.includes("crop")) return Sprout;
  if (lowerTitle.includes("edu") || lowerTitle.includes("student") || lowerTitle.includes("scholarship")) return GraduationCap;
  if (lowerTitle.includes("health") || lowerTitle.includes("med") || lowerTitle.includes("care")) return HeartPulse;
  if (lowerTitle.includes("scheme") || lowerTitle.includes("policy") || lowerTitle.includes("gov")) return ShieldCheck;

  return Award; // Universal fallback
};

export default function SchemeCard({ scheme }: SchemeCardProps) {
  if (!scheme) return null;

  // Render Icon logic
  const renderSchemeVisual = () => {
    const iconValue = scheme.icon?.trim() || "";

    // 1. If it's a valid relative path or absolute URL, use Next.js Image
    if (iconValue.startsWith("/") || iconValue.startsWith("http://") || iconValue.startsWith("https://")) {
      return (
        <Image
          src={iconValue}
          alt={scheme.title}
          width={90}
          height={90}
          priority
          className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] object-contain"
        />
      );
    }

    // 2. If icon matches an explicit Lucide icon name string in database (e.g. "Briefcase")
    const IconComponent = iconMap[iconValue] || getMatchingIconByTitle(scheme.title);

    return (
      <div className="p-4 rounded-2xl bg-white/70 shadow-sm border border-black/5 flex items-center justify-center">
        <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-[#C2943A]" />
      </div>
    );
  };

  return (
    <Link href={`/schemes/${scheme.id}`} className="block group">
      <article
        className="relative flex h-[300px] sm:h-[340px] w-[240px] sm:w-[280px] flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        style={{
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Arrow Indicator on Hover */}
        <div className="absolute right-3 top-3 z-10 p-1.5 rounded-full bg-white/80 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4 text-zinc-800" />
        </div>

        {/* Amount/Category badge */}
        <div
          className="absolute left-3 top-3 z-10 flex items-center rounded-full px-2.5 py-[5px]"
          style={{ backgroundColor: scheme.bgColor || "#F3F4F6" }}
        >
          <span className="text-[9px] font-medium uppercase tracking-wider text-[#333333] font-mono">
            {scheme.amount || "Government Scheme"}
          </span>
        </div>

        {/* Dynamic Background Area (Uses solid/soft background color with matched icon) */}
        <div
          className="relative flex h-[120px] sm:h-[160px] w-full items-center justify-center transition-colors"
          style={{ background: scheme.bgColor || "#F9FAFB" }}
        >
          {renderSchemeVisual()}
        </div>

        {/* Text content */}
        <div className="flex flex-col p-3.5 sm:p-4 flex-1">
          <h3 className="text-[13px] sm:text-[14.5px] font-semibold leading-snug text-[#131313] line-clamp-2 group-hover:text-[#C2943A] transition-colors">
            {scheme.title}
          </h3>
          <p className="mt-1.5 sm:mt-2 text-[11.5px] sm:text-[12.5px] font-normal leading-relaxed text-[#666666] line-clamp-3">
            {scheme.description}
          </p>
        </div>
      </article>
    </Link>
  );
}