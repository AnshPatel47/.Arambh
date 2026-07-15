"use client";
import { useRevealOnScroll } from "./useRevealOnScroll";
import LeftPanel from "./LeftPanel";
import MapSection from "./MapSection";

export default function SmartIndia() {
  const { ref, show } = useRevealOnScroll(0.25);

  return (
    <section
      ref={ref}
      style={{
        width: "100%",
        background: "#FBF7EE",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 100,
          padding: "80px 80px",
          boxSizing: "border-box",
        }}
      >
        <LeftPanel />
        <MapSection show={show} />
      </div>
    </section>
  );
}