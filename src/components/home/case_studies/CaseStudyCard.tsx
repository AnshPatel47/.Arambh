import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CaseStudy } from "./caseStudy.types";

interface CaseStudyCardProps {
  study: CaseStudy;
  onClick: () => void;
}

export default function CaseStudyCard({ study, onClick }: CaseStudyCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        flex
        w-[240px]
        h-[375px]
        sm:w-[294px]
        sm:h-[440px]
        shrink-0
        flex-col
        justify-between
        group
        cursor-pointer
        bg-white
        border
        border-zinc-200
        rounded-[18px]
        overflow-hidden
        mr-4
        sm:mr-6
        shadow-xs
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-lg
      "
    >
      <div>
        {/* 1. Image Container — Full landscape widescreen ratio on desktop */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden bg-zinc-100 rounded-t-[18px]">
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* 2. Card Body Area */}
        <div className="p-4 sm:p-6 flex flex-col">
          {/* Arambh Category Badge & Meta Line */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3 w-full">
            <span className="inline-block text-[10px] sm:text-[12px] font-semibold px-2 sm:px-3 py-0.5 rounded-full text-[#BD8E32] shrink-0">
              {study.category}
            </span>
            <span className="text-[10px] sm:text-[12px] text-zinc-500 font-medium shrink-0">
              {study.location} {study.readTime ? `• ${study.readTime}` : ""}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-DM sans text-sm sm:text-lg font-bold text-zinc-900 leading-snug mb-1.5 sm:mb-2 line-clamp-2">
            {study.title}
          </h3>

          {/* Excerpt */}
          <p className="text-DM sans text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3 font-normal mb-3 sm:mb-4">
            {study.excerpt}
          </p>
        </div>
      </div>

      {/* 3. Card Footer (Action Link on Left, No Border) */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 flex items-center justify-start mt-auto w-full">
        {/* Arambh Gold Pill Button */}
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BD8E32] group-hover:text-[#764A04] transition-all duration-200 cursor-pointer select-none"
        >
          Read full Story <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}

