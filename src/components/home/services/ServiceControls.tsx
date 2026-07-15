"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface ServiceControlsProps {
  onPrev: () => void;
  onNext: () => void;
  progress: number;
}

export default function ServiceControls({
  onPrev,
  onNext,
  progress,
}: ServiceControlsProps) {
  return (
    <div className="flex items-center gap-5">
      {/* Previous Button */}
      <button
        onClick={onPrev}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-[#D9D3C8]
          bg-white
          text-[#333333]
          transition-all
          duration-300
          hover:bg-black
          hover:text-white
        "
      >
        <ArrowLeft size={18} strokeWidth={2} />
      </button>

      {/* Progress */}
      <div className="relative w-44 h-[2px] bg-[#DDD5C9] rounded-full overflow-visible">
        {/* Active Line */}
        <div
          className="absolute left-0 top-0 h-full bg-black transition-all duration-300"
          style={{
            width: `${Math.max(progress, 8)}%`,
          }}
        />

        {/* Indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
          style={{
            left: `${Math.max(progress, 8)}%`,
          }}
        >
          <div className="w-4 h-4 rounded-full border border-[#D9D3C8] bg-[#F6F4F0] shadow-sm" />
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-[#D9D3C8]
          bg-white
          text-[#333333]
          transition-all
          duration-300
          hover:bg-black
          hover:text-white
        "
      >
        <ArrowRight size={18} strokeWidth={2} />
      </button>
    </div>
  );
}