"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { CaseStudy } from "./caseStudy.types";

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (study) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [study]);

  if (!study) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        bg-black/65
        backdrop-blur-sm
        transition-opacity
        duration-300
      "
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-2xl
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
          border
          border-[#E6DFD4]
          max-h-[85vh]
          animate-in
          fade-in-50
          zoom-in-95
          duration-200
        "
      >
        {/* Header Image Band */}
        <div className="relative w-full h-[220px] bg-neutral-100 flex-shrink-0">
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              absolute
              top-4
              right-4
              bg-white/20
              text-white
              hover:bg-white
              hover:text-black
              p-2
              rounded-full
              backdrop-blur-md
              transition-all
              focus:outline-none
              cursor-pointer
            "
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Area */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-3 text-xs text-[#C2943A] font-bold mb-2 uppercase tracking-wider">
              <span>{study.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C2943A]" />
              <span>{study.location}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {study.title}
            </h3>
          </div>
        </div>

        {/* Scrollable details body */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#333333]">
          {/* Key outcome achievements */}
          <div className="bg-[#F6F4F0] border-l-4 border-[#C2943A] p-4 rounded-r-xl flex items-center gap-4 border border-y-[#DDD6CA] border-r-[#DDD6CA] border-l-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#764A04]">
                Key Outcome Achieved
              </h4>
              <p className="text-sm font-bold text-neutral-900 mt-0.5">
                {study.metrics}
              </p>
            </div>
          </div>

          {/* Challenge Section */}
          <div className="space-y-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#999999] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C2943A]" /> The Challenge
            </h4>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              {study.challenge}
            </p>
          </div>

          {/* Solution Section */}
          <div className="space-y-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#999999] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C2943A]" /> Our Solution
            </h4>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              {study.solution}
            </p>
          </div>

          {/* Outcome Section */}
          <div className="space-y-2 pb-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#999999] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C2943A]" /> The Outcome
            </h4>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              {study.result}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E6DFD4] flex justify-end bg-[#FBF8F4] flex-shrink-0">
          <button
            onClick={onClose}
            className="
              px-5
              py-2
              bg-[#131313]
              hover:bg-[#333333]
              text-white
              rounded-xl
              text-xs
              font-bold
              transition-colors
              cursor-pointer
            "
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
}
