"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { processSteps } from "./about.data";

export default function Process() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeStep = processSteps[activeIndex];

  return (
    <section className="w-full bg-white pt-10 pb-10 lg:pt-16 lg:pb-16 reveal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 w-full">
        
        {/* Tag at top */}
        <div className="flex items-center gap-2 bg-transparent px-0 py-2 w-fit mb-6 mx-auto lg:mx-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C2943A]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#333333]">
            THE PROCESS
          </span>
        </div>

        {/* Header Block: Left Heading, Right Description + Bottom Border Line */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left gap-8 lg:gap-16 pb-12 border-b border-[#E6DFD4]">
          <div className="flex-1">
            <h2 className="text-[36px] md:text-[48px] font-medium leading-[1.1] tracking-[-0.03em] text-[#131313]">
              Five steps, no surprises.
            </h2>
          </div>
          <div className="flex-1 lg:max-w-[500px]">
            <p className="text-[15px] md:text-[16px] leading-relaxed text-[#666665] pt-2">
              The same disciplined path for every client, from the first call to long after the certificates arrive.
            </p>
          </div>
        </div>

        {/* ══ STEPPER LAYOUT ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-12">
          
          {/* Left Column: Vertical Step Selector Buttons (h-76px, w-360px) with Dynamic Golden Line */}
          <div className="lg:col-span-4 flex flex-col gap-3 w-full max-w-[360px] mx-auto lg:mx-0 relative">
            {processSteps.map((step, index) => {
              const isActive = activeIndex === index;

              return (
                <div key={step.number} className="relative w-full max-w-[360px]">
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-center gap-3.5 px-4 h-[76px] w-full max-w-[360px] rounded-[20px] text-left transition-all duration-300 cursor-pointer border relative z-10 ${
                      isActive
                        ? "bg-[#FAF8F5] border-[#E6DFD4] shadow-sm scale-[1.01]"
                        : "bg-white border-transparent hover:bg-neutral-50"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-mono font-bold transition-all duration-300 relative z-20 ${
                        isActive
                          ? "bg-[#C2943A] text-white shadow-sm"
                          : "border border-zinc-300 bg-white text-zinc-700 shadow-xs"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                        isActive ? "text-[#C2943A]" : "text-zinc-500"
                      }`}>
                        STEP <span className="font-mono">{step.number}</span>
                      </span>
                      <span
                        className={`text-[14.5px] md:text-[15px] font-semibold transition-colors ${
                          isActive ? "text-[#131313]" : "text-[#131313]"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </button>

                  {/* Vertical Golden Line connecting to next step (starts at card/circle border, never inside card box or circle) */}
                  {index < processSteps.length - 1 && (
                    <div
                      className="absolute left-[33.5px] w-[2px] bg-[#C2943A] transition-all duration-300 z-20 pointer-events-none rounded-full"
                      style={{
                        top: activeIndex === index ? "76px" : "56px",
                        height: `${
                          (activeIndex === index + 1 ? 88 : 108) -
                          (activeIndex === index ? 76 : 56)
                        }px`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Center Column: Active Step Image (Height 428px perfectly matching 5 step buttons height) */}
          <div className="lg:col-span-4 flex justify-center items-start w-full">
            <div className="relative w-full max-w-[360px] h-[340px] sm:h-[380px] lg:h-[428px] rounded-[28px] overflow-hidden border border-[#E6DFD4] bg-white shadow-md">
              {activeStep.image && (
                <Image
                  src={activeStep.image}
                  alt={activeStep.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover object-center"
                />
              )}
            </div>
          </div>

          {/* Right Column: Active Step Details */}
          <div className="lg:col-span-4 flex flex-col items-start text-left justify-start pt-1 px-2 lg:px-4 min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#C2943A] mb-1.5 block">
                  STEP {activeStep.number}
                </span>
                <h3 className="text-[24px] md:text-[28px] font-semibold text-[#131313] tracking-tight mb-3">
                  {activeStep.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#666665] mb-4">
                  {activeStep.description}
                </p>

                {/* Bullet Points List */}
                {activeStep.bullets && (
                  <ul className="flex flex-col gap-2.5 mt-2">
                    {activeStep.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[13.5px] md:text-[14px] text-zinc-700 leading-snug">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C2943A] mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Preload inactive step images in the background */}
          <div className="hidden" aria-hidden="true">
            {processSteps.map((step) => step.image && (
              <Image
                key={`preload-${step.number}`}
                src={step.image}
                alt=""
                width={360}
                height={428}
                priority
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}