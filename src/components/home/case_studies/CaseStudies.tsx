"use client";

import { useState } from "react";
import CaseStudiesHeader from "./CaseStudiesHeader";
import CaseStudiesList from "./CaseStudiesList";
import CaseStudyModal from "./CaseStudyModal";
import { CaseStudy } from "./caseStudy.types";

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <section
      id="case-studies"
      className="w-full bg-[#F6F4F0] py-14 border-t border-b border-[#E6DFD4] overflow-hidden"
    >
      <div
        className="
          mx-auto
          max-w-[1440px]
          px-6
          lg:px-20
          flex
          flex-col
          gap-10
        "
      >
        {/* Header */}
        <CaseStudiesHeader />

        {/* Cards List slider */}
        <div className="flex flex-col gap-10">
          <CaseStudiesList onSelectStudy={setSelectedStudy} />
        </div>

        {/* Detail Modal */}
        <CaseStudyModal
          study={selectedStudy}
          onClose={() => setSelectedStudy(null)}
        />
      </div>
    </section>
  );
}
