"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { processSteps } from "./about.data";

export default function Process() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#FFF8F6] py-14 md:py-16 reveal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 w-full text-center">
        
        {/* Header Column */}
        <div className="flex flex-col items-center justify-center text-center gap-3 rv-up mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD6CA] bg-white px-4 py-1.5 w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B68A45]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#333333]">
              THE PROCESS
            </span>
          </div>

          <h2 className="mt-4 text-[32px] md:text-[38px] lg:text-[40px] font-semibold leading-[120%] tracking-[-0.03em] text-[#131313]">
            Five steps, no surprises.
          </h2>

          <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-[#666665]">
            The same disciplined path for every client, from the first call to long after the certificates arrive.
          </p>
        </div>

        {/* ══ MOBILE TIMELINE ══ */}
        <div className="lg:hidden relative w-full flex flex-col gap-10 pl-6 md:pl-16 pr-4 mt-6 select-none">
          {/* Vertical line background */}
          <div className="absolute left-[38px] md:left-[78px] top-4 bottom-4 w-[2px] bg-neutral-200" />
          {/* Animated vertical line */}
          <div
            className="absolute left-[38px] md:left-[78px] top-4 w-[2px] bg-[#B68A45] origin-top transition-transform duration-[2500ms] ease-out-sine"
            style={{
              transform: inView ? "scaleY(1)" : "scaleY(0)",
              height: "calc(100% - 32px)",
            }}
          />

          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex gap-6 md:gap-10 items-start text-left"
            >
              {/* Circle */}
              <div
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B68A45] bg-white text-[13px] font-bold text-[#B68A45] shadow-sm transition-all duration-500"
                style={{
                  transform: inView ? "scale(1)" : "scale(0.6)",
                  opacity: inView ? 1 : 0,
                  transitionDelay: `${100 + index * 400}ms`,
                }}
              >
                {step.number}
              </div>
              {/* Text */}
              <div className="flex-1 pt-1.5">
                <h4 className="text-[16px] font-semibold text-[#131313]">
                  {step.title}
                </h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#666666]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          {/* End Arrow on mobile */}
          <div className="relative flex gap-6 md:gap-10 items-center">
            <div
              className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B68A45] text-white shadow-md transition-all duration-500"
              style={{
                transform: inView ? "scale(1)" : "scale(0.6)",
                opacity: inView ? 1 : 0,
                transitionDelay: `${100 + processSteps.length * 400}ms`,
              }}
            >
              <ArrowUpRight size={18} />
            </div>
            <span className="text-[13px] font-semibold text-[#B68A45] pt-0.5">
              We are with you all the way
            </span>
          </div>
        </div>

        {/* ══ DESKTOP HORIZONTAL WAVY TIMELINE ══ */}
        <div className="hidden lg:block relative w-full min-h-[290px] mt-12 select-none max-w-6xl mx-auto">
          
          {/* SVG Wavy Line Overlay */}
          <svg
            className="absolute top-0 left-0 w-full h-[110px] pointer-events-none"
            viewBox="0 0 1000 110"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Base line */}
            <path
              d="M 100 30 C 200 30, 200 70, 300 70 C 400 70, 400 30, 500 30 C 600 30, 600 70, 700 70 C 800 70, 800 30, 900 30 C 935 30, 950 18, 970 15"
              stroke="#E8E2D8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Animated drawing line */}
            <path
              d="M 100 30 C 200 30, 200 70, 300 70 C 400 70, 400 30, 500 30 C 600 30, 600 70, 700 70 C 800 70, 800 30, 900 30 C 935 30, 950 18, 970 15"
              stroke="#B68A45"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset={inView ? 0 : 1000}
              style={{
                transition: "stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </svg>

          {/* Steps columns */}
          <div className="grid grid-cols-5 w-full relative z-10">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center px-4 relative h-[250px]"
                >
                  {/* Step Circle */}
                  <div
                    className="absolute w-10 h-10 rounded-full border border-[#B68A45]/80 bg-white flex items-center justify-center font-bold text-[13px] text-[#B68A45] shadow-sm z-20 transition-all duration-700"
                    style={{
                      top: isEven ? "50px" : "10px",
                      transform: inView ? "scale(1)" : "scale(0.6)",
                      opacity: inView ? 1 : 0,
                      transitionDelay: `${100 + index * 500}ms`,
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Step Text Content */}
                  <div
                    className="absolute flex flex-col items-center transition-all duration-1000"
                    style={{
                      top: isEven ? "100px" : "60px",
                      transform: inView ? "translateY(0)" : "translateY(12px)",
                      opacity: inView ? 1 : 0,
                      transitionDelay: `${250 + index * 500}ms`,
                    }}
                  >
                    <h4 className="text-[15px] font-semibold text-[#131313]">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#666666] max-w-[190px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End Arrow on desktop */}
          <div
            className="absolute w-10 h-10 rounded-full bg-[#B68A45] flex items-center justify-center text-white shadow-md z-20 transition-all duration-700"
            style={{
              top: "-5px",
              left: "97%",
              transform: inView ? "scale(1) translateX(-50%)" : "scale(0.6) translateX(-50%)",
              opacity: inView ? 1 : 0,
              transitionDelay: "2600ms",
            }}
          >
            <ArrowUpRight size={18} />
          </div>

        </div>

      </div>
    </section>
  );
}