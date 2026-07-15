"use client";

import React, { useState, useEffect } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import CTABox from "./CTABox";
import { testimonials, ctaData } from "./testimonials.data";

interface TestimonialsListProps {
  scrollYProgress: MotionValue<number>;
}

export default function TestimonialsList({ scrollYProgress }: TestimonialsListProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Desktop Scroll-Driven Transformations:
  // Card 1 (Rahul Shah, index 0) starts active, scales down slightly
  const card1Scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.90]);

  // Card 2 (Neha Patel, index 1) slides up from below, then scales down slightly
  const card2Y = useTransform(scrollYProgress, [0.05, 0.35], [400, 12]);
  const card2Scale = useTransform(scrollYProgress, [0.35, 0.9], [1, 0.94]);
  const card2Opacity = useTransform(scrollYProgress, [0.05, 0.20], [0, 1]);

  // Card 3 (Karan Mehta, index 2) slides up from below, then scales down slightly
  const card3Y = useTransform(scrollYProgress, [0.35, 0.65], [400, 24]);
  const card3Scale = useTransform(scrollYProgress, [0.65, 0.9], [1, 0.98]);
  const card3Opacity = useTransform(scrollYProgress, [0.35, 0.50], [0, 1]);

  // CTA Box (Card 4) fades in and stays static in its stacked position
  const ctaOpacity = useTransform(scrollYProgress, [0.65, 0.80], [0, 1]);

  if (!isDesktop) {
    // Mobile Layout: standard layout, cards rendered in vertical column with a nice gap
    return (
      <div className="flex flex-col gap-6 w-full">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="w-full">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
        {/* Render CTA Box inside the flow for mobile */}
        <div className="mt-8 w-full">
          <CTABox data={ctaData} />
        </div>
      </div>
    );
  }

  // Desktop Layout: Sticky Overlapping Deck Stack (including CTA Box)
  return (
    <div className="relative w-full h-[540px] flex items-start justify-center">
      {/* Card 1 */}
      <motion.div
        style={{
          scale: card1Scale,
          transformOrigin: "top center",
          zIndex: 10,
        }}
        className="absolute top-0 left-0 w-full shadow-lg rounded-3xl"
      >
        <TestimonialCard testimonial={testimonials[0]} />
      </motion.div>

      {/* Card 2 */}
      <motion.div
        style={{
          scale: card2Scale,
          y: card2Y,
          opacity: card2Opacity,
          transformOrigin: "top center",
          zIndex: 20,
        }}
        className="absolute top-0 left-0 w-full shadow-lg rounded-3xl"
      >
        <TestimonialCard testimonial={testimonials[1]} />
      </motion.div>

      {/* Card 3 */}
      <motion.div
        style={{
          scale: card3Scale,
          y: card3Y,
          opacity: card3Opacity,
          transformOrigin: "top center",
          zIndex: 30,
        }}
        className="absolute top-0 left-0 w-full shadow-lg rounded-3xl"
      >
        <TestimonialCard testimonial={testimonials[2]} />
      </motion.div>

      {/* CTA Box (Card 4) */}
      <motion.div
        style={{
          y: 360,
          opacity: ctaOpacity,
          transformOrigin: "top center",
          zIndex: 40,
        }}
        className="absolute top-0 left-0 w-full shadow-lg rounded-3xl"
      >
        <CTABox data={ctaData} />
      </motion.div>
    </div>
  );
}