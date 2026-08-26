"use client";

import { useState } from "react";
import CaseStudiesHeader from "./CaseStudiesHeader";
import CaseStudiesList from "./CaseStudiesList";
// Import the main dedicated popup component
import CaseStudyDetailModal from "@/components/blog&case_study/CasestudiesDetail"; 
import { CaseStudy } from "./caseStudy.types";

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <section
      id="case-studies"
      className="w-full bg-[#FBF7EE] py-14 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 flex flex-col gap-10">
        {/* Header */}
        <CaseStudiesHeader />

        {/* Horizontal Line */}
        <div className="w-full border-t border-[#E6DFD4]" />

        {/* Cards List slider */}
        <div className="flex flex-col gap-10">
          <CaseStudiesList onSelectStudy={setSelectedStudy} />
        </div>

        {/* Reused Shared Popup Modal */}
        <CaseStudyDetailModal
          study={selectedStudy}
          onClose={() => setSelectedStudy(null)}
        />
      </div>
    </section>
  );
}