"use client";

interface SmartCardProps {
  value: string;
  label: string;
}

export default function SmartCard({ value, label }: SmartCardProps) {
  return (
    <div
      style={{
        flex: 1,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.05)",
        borderRadius: 16,
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: "default",
        transition: "box-shadow 0.25s, transform 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.09)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span style={{ fontSize: 22, fontWeight: 500, color: "#131313", fontFamily: "var(--font-geist-mono)" }}>
        {value}
      </span>
      <span style={{ marginTop: 4, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#666665" }}>
        {label}
      </span>
    </div>
  );
}