"use client";
import Image from "next/image";
import { PINS, MAP_BOX, MAP_LAYER } from "./pins.data";
import MapPin from "./MapPin";

interface MapSectionProps {
  show: boolean;
}

export default function MapSection({ show }: MapSectionProps) {
  return (
    <div className="map-scale-container w-full max-w-full overflow-hidden flex justify-center items-center">
      <div
        className="map-scale-wrapper"
        style={{
          position: "relative",
          width: MAP_BOX.w,     
          height: MAP_BOX.h,  
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: MAP_LAYER.left,
            top: MAP_LAYER.top,
            width: MAP_LAYER.width,
            height: MAP_LAYER.height,
            transform: "rotate(3deg) scale(1.5)", 
            transformOrigin: "center center",
          }}
        >
          <Image
            src="/images/indiamap.svg"
            alt="3D Map of India"
            fill
            priority
            fetchPriority="high"
            style={{
              objectFit: "fill",
              filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.22))",
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable={false}
          />
        </div>

        {PINS.map((pin) => (
          <MapPin key={pin.id} pin={pin} show={show} />
        ))}
      </div>
    </div>
  );
}