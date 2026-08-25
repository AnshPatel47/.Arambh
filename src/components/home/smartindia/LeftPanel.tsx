"use client";

import { useScheduleCallModal } from "../../schedule-call/ScheduleCallContext";
import SectionHeader from "@/components/SectionHeader"; 

const STATS = [
  { value: "₹50 CR+", label: "FUNDING OPPORTUNITIES FACILITATED" },
  { value: "20+", label: "INDUSTRY EXPERTS" },
  { value: "250+", label: "BUSINESSES SUPPORTED" },
];

export default function LeftPanel() {
  const { openModal } = useScheduleCallModal();

  return (
    <div className="flex-shrink-0 w-full max-w-[396.32px] flex flex-col gap-10 items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">

      {/* Reusable Section Header with forced center alignment until lg (1024px) */}
      <SectionHeader
        align="left"
        alignMobile="center"
        className="w-full ![text-align:center] lg:![text-align:left] !mx-auto lg:!mx-0"
        title={
          <>
            <span className="text-[#131313]">Empowering </span>
            <span className="text-[#C2943A] block lg:inline">Businesses Across India</span>
          </>
        }
        description="Growing our network of successful businesses, one state at a time."
      />

      {/* Stat cards wrapped in one bordered container */}
      <div
        className="w-full flex flex-col border border-[#E6E0D6] rounded-[16px] p-[4px] gap-[4px] bg-transparent text-center lg:text-left"
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            className="w-full flex flex-col items-center lg:items-start bg-white border border-[#E6E0D6] rounded-[12px] py-5 px-6"
          >
            <div className="text-[24px] font-bold text-[#131313]" style={{ fontFamily: "var(--font-geist-mono)" }}>
              {s.value}
            </div>
            <div className="text-[11px] font-semibold text-[#88887F] uppercase tracking-[0.08em] mt-1 text-center lg:text-left">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={openModal}
        style={{
          width: "fit-content",
          background: "#131313",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "14px 32px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          transition: "box-shadow 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.18)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Book a Call
      </button>
    </div>
  );
}