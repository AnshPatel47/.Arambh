"use client";
import { Pin } from "./pins.data";

interface MapPinProps {
  pin: Pin;
  show: boolean;
}

export default function MapPin({ pin, show }: MapPinProps) {
  const isLeft = pin.side === "left";
  const lineSrc = isLeft ? "/images/popup-left-line.svg" : "/images/popup-right-line.svg";

  // Base delay based on pin order
  const baseDelay = pin.delay;
  
  // Sequential delays
  const dotDelay = baseDelay;
  const lineDelay = baseDelay + 200;
  const cardDelay = baseDelay + 500;

  return (
    <div
      style={{
        position: "absolute",
        left: `${pin.left}%`,
        top: `${pin.top}%`,
        width: `${pin.width}%`,
        height: `${pin.height}%`,
        zIndex: 10,
        display: "flex",
        flexDirection: isLeft ? "row" : "row-reverse",
        alignItems: "flex-start",
      }}
    >
      {/* Popup card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          justifyContent: "center",
          zIndex: 2,
          userSelect: "none",
          whiteSpace: "nowrap",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0) scale(1)" : "translateY(10px) scale(0.92)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          transitionDelay: `${cardDelay}ms`,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: "#131313", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3 }}>
          {pin.title}
        </span>
        <span style={{ fontSize: 9, fontWeight: 600, color: "#88887F", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>
          {pin.sub}
        </span>
      </div>

      {/* Connector line + dot */}
      <div style={{ position: "relative", flexShrink: 0, marginTop: 4 }}>
        <div
          style={{
            overflow: "hidden",
            height: 70,
            width: 16,
            transition: "clip-path 0.4s ease",
            transitionDelay: `${lineDelay}ms`,
            clipPath: show ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          }}
        >
          <img
            src={lineSrc}
            alt=""
            aria-hidden="true"
            style={{ width: 16, height: 70, display: "block", userSelect: "none", pointerEvents: "none" }}
            draggable={false}
          />
        </div>
        
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: isLeft ? "auto" : 0,
            right: isLeft ? 0 : "auto",
            transform: isLeft ? "translate(50%, 50%)" : "translate(-50%, 50%)",
            opacity: show ? 0.85 : 0,
            transition: "opacity 0.3s ease",
            transitionDelay: `${dotDelay}ms`,
          }}
        >
          <img
            src="/images/blackcircle.svg"
            alt=""
            aria-hidden="true"
            style={{ width: 29, height: 28, display: "block", userSelect: "none", pointerEvents: "none" }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}