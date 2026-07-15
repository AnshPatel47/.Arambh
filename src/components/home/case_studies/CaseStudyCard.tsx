import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
        w-[294px]
        h-[440px]
        shrink-0
        flex-col
        justify-between
        group
        cursor-pointer
        bg-white
        border
        border-[#E6DFD4]
        rounded-[24px]
        overflow-hidden
        mr-6
        transition-all
        duration-500
        hover:-translate-y-3
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
        hover:border-transparent
      "
    >
      {/* Image container */}
      <div className="relative w-full h-[190px] overflow-hidden bg-[#FBF8F4]">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Industry Tag Overlay */}
        <div className="absolute top-4 left-4 bg-black/75 text-[#B68A45] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-[#B68A45]/30 backdrop-blur-sm">
          {study.industry}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 p-4 flex-grow text-left justify-between overflow-hidden">
        <div className="flex flex-col gap-1.5">
          {/* Category & Location */}
          <div className="flex items-center justify-between text-[10px] font-bold text-[#B68A45] uppercase tracking-wider">
            <span>{study.category}</span>
            <span className="text-[#999999] font-normal">{study.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-semibold leading-snug text-[#131313] transition-colors group-hover:text-[#B68A45] line-clamp-2 min-h-[40px] flex items-center">
            {study.title}
          </h3>

          {/* Horizontal Line */}
          <hr className="border-t border-[#E6DFD4] my-0.5" />

          {/* Excerpt */}
          <p className="text-[12px] text-[#666666] leading-relaxed line-clamp-3">
            {study.excerpt}
          </p>
        </div>

        {/* Bottom Area: Metrics & Action Link */}
        <div className="flex items-center justify-between mt-1 pt-2 border-t border-dashed border-[#E6DFD4]/60">
          <div className="flex items-center gap-1 rounded-lg bg-[#F6F4F0] border border-[#DDD6CA] px-2 py-0.5 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="text-[9px] font-bold text-[#333333] tracking-wide">
              {study.metrics}
            </span>
          </div>

          <span className="text-[12px] font-semibold text-[#B68A45] group-hover:text-[#8c652d] transition-colors flex items-center gap-0.5 select-none">
            Read study <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}
