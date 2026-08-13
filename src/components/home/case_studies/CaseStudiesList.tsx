"use client";

import { caseStudiesData } from "./caseStudy.data";
import CaseStudyCard from "./CaseStudyCard";
import { CaseStudy } from "./caseStudy.types";

interface CaseStudiesListProps {
  onSelectStudy: (study: CaseStudy) => void;
}

export default function CaseStudiesList({
  onSelectStudy,
}: CaseStudiesListProps) {
  const doubledCaseStudies = [...caseStudiesData, ...caseStudiesData];

  return (
    <div
      className="overflow-hidden w-full reveal"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)",
      }}
    >
      <div className="animate-marquee flex gap-0">
        {doubledCaseStudies.map((study, index) => (
          <CaseStudyCard
            key={`${study.id}-${index}`}
            study={study}
            onClick={() => onSelectStudy(study)}
          />
        ))}
      </div>
    </div>
  );
}