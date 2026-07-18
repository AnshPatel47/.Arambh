"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { services } from "./service.data";
import Image from "next/image";

export default function ServicesSlider() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="w-full">
      {/* ══ MOBILE LAYOUT: Vertical Accordion (lg:hidden) ══ */}
      <div className="flex flex-col gap-3 w-full lg:hidden">
        {services.map((service, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={service.id}
              onClick={() => setActiveIndex(index)}
              className={`relative w-full overflow-hidden rounded-[20px] border border-[#E6DFD4] bg-white transition-all duration-500 ease-in-out cursor-pointer ${
                isActive ? "h-[300px]" : "h-[68px]"
              }`}
            >
              {/* Background Image (faded in when active) */}
              <div
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              </div>

              {/* COLLAPSED HEADER ROW */}
              <div className="relative z-10 flex items-center justify-between px-5 h-[68px]">
                <div className="flex items-center gap-3">
                  <span className={`text-[14px] font-bold font-mono transition-colors duration-300 ${
                    isActive ? "text-[#B68A45]" : "text-[#666665]"
                  }`}>
                    0{index + 1}
                  </span>
                  <span className={`text-[15px] font-semibold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-[#131313]"
                  }`}>
                    {service.title}
                  </span>
                </div>
                <div className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
                  isActive 
                    ? "border-white/20 bg-white/10 text-white rotate-180" 
                    : "border-neutral-200 bg-neutral-50 text-neutral-500"
                }`}>
                  <ChevronDown size={14} />
                </div>
              </div>

              {/* EXPANDED CONTENT AREA */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-5 left-5 right-5 z-10 flex flex-col items-start gap-3 text-left"
                >
                  <p className="text-[13px] leading-relaxed text-white/80">
                    {service.description}
                  </p>
                  <button className="flex items-center gap-1.5 text-[12px] font-semibold text-[#B68A45] hover:text-white transition-colors mt-1">
                    See details <ArrowRight size={12} />
                  </button>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* ══ DESKTOP LAYOUT: Horizontal Accordion (hidden lg:flex) ══ */}
      <div 
        className="hidden lg:flex w-full gap-4 h-[440px] items-stretch overflow-hidden"
      >
        {services.map((service, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={service.id}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#E6DFD4] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer bg-white group ${
                isActive ? "flex-[3.5]" : "flex-[0.7]"
              }`}
            >
              {/* Cover Image */}
              <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />
              </div>

              {/* TOP HEADER: Number and Arrow */}
              <div className="relative z-20 p-6 flex w-full justify-between items-center">
                <span className={`text-[18px] font-bold font-mono transition-colors duration-300 ${
                  isActive ? "text-[#B68A45]" : "text-white/40"
                }`}>
                  0{index + 1}
                </span>
                
                <div className={`h-8 w-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#B68A45] transition-all duration-300 rotate-0 group-hover:-rotate-45 ${
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                }`}>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* BOTTOM CONTENT / VERTICAL TEXT */}
              {isActive ? (
                /* Expanded state content */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="relative z-20 p-6 pt-0 mt-auto flex flex-col gap-3 text-left"
                >
                  <h4 className="text-[20px] font-bold text-white leading-tight">
                    {service.title}
                  </h4>
                  <p className="text-[13px] text-white/80 leading-relaxed max-w-[340px]">
                    {service.description}
                  </p>
                </motion.div>
              ) : (
                /* Collapsed state vertical title */
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <span
                    className="text-[16px] font-bold text-white/70 whitespace-nowrap tracking-wide select-none transition-colors group-hover:text-white"
                    style={{
                      writingMode: "vertical-lr",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {service.title}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}