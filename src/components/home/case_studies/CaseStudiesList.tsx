"use client";

import { caseStudiesData } from "./caseStudy.data";
import CaseStudyCard from "./CaseStudyCard";
import { CaseStudy } from "./caseStudy.types";

interface CaseStudiesListProps {
  onSelectStudy: (study: CaseStudy) => void;
}

export default function CaseStudiesList({ onSelectStudy }: CaseStudiesListProps) {
  // Duplicate data to ensure infinite loop functions seamlessly on all screen sizes
  const doubledCaseStudies = [...caseStudiesData, ...caseStudiesData];

  return (
    <div className="overflow-hidden w-full reveal">
      {/* CSS infinite scrolling marquee */}
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
