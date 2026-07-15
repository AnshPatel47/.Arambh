"use client";

const STATS = [
  { value: "₹50 CR+", label: "FUNDING OPPORTUNITIES FACILITATED" },
  { value: "20+",      label: "INDUSTRY EXPERTS" },
  { value: "250+",     label: "BUSINESSES SUPPORTED" },
];

export default function LeftPanel() {
  return (
    <div style={{ flexShrink: 0, width: 396.32, display: "flex", flexDirection: "column", gap: 40 }}>

      {/* Tag removed + heading + subtitle */}
      <div style={{ width: 396.32, display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.03em", margin: 0 }}>
          <span style={{ color: "#131313" }}>Empowering</span>
          <br />
          <span style={{ color: "#B68A45" }}>Businesses Across India</span>
        </h2>

        <p style={{ fontSize: 16, lineHeight: 1.6, color: "#666665", margin: 0, maxWidth: 340 }}>
          Growing our network of successful businesses, one state at a time.
        </p>
      </div>

      {/* Stat cards wrapped in one bordered container */}
      <div 
        style={{ 
          width: 396.32, 
          display: "flex", 
          flexDirection: "column", 
          border: "1px solid #E8E1D8",
          borderRadius: 16,
          background: "#FFFFFF",
          overflow: "hidden"
        }}
      >
        {STATS.map((s, i) => (
          <div key={s.label} style={{ borderBottom: i < STATS.length - 1 ? "1px solid #E8E1D8" : "none", padding: "20px 24px" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#131313", fontFamily: "var(--font-geist-mono)" }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#88887F", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
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