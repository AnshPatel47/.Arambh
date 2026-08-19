"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  location: string;
  excerpt: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: string;
  image: string;
  readTime?: string;
}

export interface CaseStudyDetailModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyDetailModal({
  study,
  onClose,
}: CaseStudyDetailModalProps) {
  // Close modal on Escape key press & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (study) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Card Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col border border-zinc-900/50 max-h-[85vh] mt-12">
        {/* Header Image Band */}
        <div className="relative w-full h-[250px] sm:h-[200px] bg-neutral-100 flex-shrink-0">
          <img
            src={study.image}
            alt={study.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 text-white hover:bg-white hover:text-black p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all focus:outline-none z-10 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Header Metadata & Title */}
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 pr-10 sm:pr-6 text-white font-sans">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#BD8E32] font-semibold text-sm sm:text-base mb-1 sm:mb-2">
              <span>{study.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" />
              <span>{study.location}</span>
            </div>
            <h3 className="text-base sm:text-2xl font-semibold tracking-tight line-clamp-2 sm:line-clamp-none">
              {study.title}
            </h3>
          </div>
        </div>

        {/* Scrollable Details Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-neutral-800">
          {/* Highlight Metrics Banner */}
          <div className="bg-[#F6F4F0] border-l-4 border-[#BD8E32] p-3.5 sm:p-4 rounded-r-xl flex items-center gap-3 sm:gap-4">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold uppercase tracking-wider text-[10px] sm:text-xs text-[#764A04]">
                Key Outcome Achieved
              </h4>
              <p className="font-bold text-zinc-900 text-sm sm:text-base mt-0.5">
                {study.metrics}
              </p>
            </div>
          </div>

          {/* Challenge Section */}
          <div className="space-y-1.5 sm:space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-zinc-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" /> The Challenge
            </h4>
            <p className="text-xs sm:text-base text-zinc-900 leading-relaxed font-sans">
              {study.challenge}
            </p>
          </div>

          {/* Solution Section */}
          <div className="space-y-1.5 sm:space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-zinc-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" /> The Solution
            </h4>
            <p className="text-xs sm:text-base text-zinc-900 leading-relaxed font-sans">
              {study.solution}
            </p>
          </div>

          {/* Result Section */}
          <div className="space-y-1.5 sm:space-y-2 pb-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-zinc-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" /> The Outcome
            </h4>
            <p className="text-xs sm:text-base text-zinc-900 leading-relaxed font-sans">
              {study.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}