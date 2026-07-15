"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsList from "./TestimonialsList";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire Testimonials section track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 100px", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative w-full bg-white h-auto lg:h-[230vh]"
    >
      {/* Sticky container that spans the viewport height on desktop, normal container on mobile */}
      <div className="relative lg:sticky lg:top-[100px] lg:h-[calc(100vh-100px)] w-full flex items-center overflow-visible lg:overflow-hidden py-16 lg:py-0">
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
            px-6
            md:px-10
            lg:px-20
            xl:px-20
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              justify-between
              gap-16
              lg:gap-32
              items-start
            "
          >
            {/* Left Side: Header */}
            <div className="w-full lg:max-w-[500px]">
              <TestimonialsHeader />
            </div>

            {/* Right Side: Animated Card Stack */}
            <div className="w-full max-w-[531px]">
              <TestimonialsList scrollYProgress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}