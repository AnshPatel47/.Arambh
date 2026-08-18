"use client";
import { useRevealOnScroll } from "./useRevealOnScroll";
import LeftPanel from "./LeftPanel";
import MapSection from "./MapSection";

export default function SmartIndia() {
  const { ref, show } = useRevealOnScroll(0.25);

  return (
    <section
      ref={ref}
      className="w-full bg-[#FBF7EE] overflow-x-hidden"
      style={{
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-12 lg:py-20">
        <LeftPanel />
        <MapSection show={show} />
      </div>
    </section>
  );
}