import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#FBF7EE] transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        {/* Elegant Spinning Circle */}
        <div className="relative h-12 w-12">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#C2943A]/20" />
          {/* Spinning Segment */}
          <div className="absolute inset-0 rounded-full border-4 border-[#C2943A] border-t-transparent animate-spin" />
        </div>
        
        {/* Arambh Brand Text */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[13px] font-bold tracking-[0.08em] text-[#131313] uppercase">
            Arambh Advisory
          </span>
          <span className="text-[9px] font-medium tracking-[0.1em] text-[#666666] uppercase mt-0.5">
            Services LLP
          </span>
        </div>
      </div>
    </div>
  );
}
