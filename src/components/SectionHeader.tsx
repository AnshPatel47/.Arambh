import React from "react";

interface SectionHeaderProps {
  title: React.ReactNode;
  badge?: string;
  description?: string;
  align?: "center" | "left";
  alignMobile?: "center" | "left";
  theme?: "light" | "dark";
  className?: string;
}

export default function SectionHeader({
  title,
  badge,
  description,
  align = "center",
  alignMobile = "center",
  theme = "light",
  className = "",
}: SectionHeaderProps) {
  const isLeftDesktop = align === "left";
  const isLeftMobile = alignMobile === "left";
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full max-w-3xl ${
        /* Mobile Alignment: default centered */
        isLeftMobile ? "text-left mx-0" : "text-center mx-auto"
      } ${
        /* Desktop Alignment: keeps exact desktop layout untouched */
        isLeftDesktop ? "sm:text-left sm:mx-0" : "sm:text-center sm:mx-auto"
      } ${className}`}
    >
      {/* Optional Badge/Tag */}
      {badge && (
        <span className="text-xs font-bold uppercase tracking-widest text-[#C2943A] block mb-2">
          {badge}
        </span>
      )}

      {/* Uniform Mobile Heading Size & Height (text-[24px] leading-[1.25]) */}
      <h2
        className={`text-[24px] sm:text-[32px] font-semibold leading-[1.25] sm:leading-[120%] tracking-[-0.02em] ${
          description ? "mb-3 sm:mb-4" : "mb-0"
        } ${isDark ? "text-white" : "text-zinc-900"}`}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed ${
            isDark ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}