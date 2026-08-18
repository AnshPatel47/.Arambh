"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  {
    value: 250,
    suffix: "+",
    label: "Founders & businesses guided from idea\nto incorporation",
  },
  {
    value: 50,
    prefix: "₹",
    suffix: " Cr+",
    label: "In business funding & capital facilitated\nwith zero collateral",
  },
  {
    value: 20,
    suffix: "+",
    label: "Expert advisors ensuring end-to-end\ngrowth & compliance",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function HeroStats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#FBF7EE] flex flex-col items-center justify-center relative"
    >
      {/* Container aligned edge-to-edge with the 1440px max grid */}
      <div className="mx-auto max-w-[1440px] w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full grid grid-cols-1 md:grid-cols-3 items-center justify-between"
        >
          {stats.map((s, index) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              className="relative flex flex-col items-center justify-center py-8 md:py-12 px-4 text-center w-full"
            >
              {/* Stat Number */}
              <span
                className="text-[40px] md:text-[52px] font-bold text-[#C2943A] leading-none tracking-tight text-center"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                <AnimatedCounter
                  end={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  isInView={isInView}
                />
              </span>

              {/* Description */}
              <span
                className="mt-3 text-[13px] md:text-[14px] leading-relaxed font-medium text-[#666665] text-center whitespace-pre-line"
                style={{ fontFamily: "var(--font-dm), sans-serif" }}
              >
                {s.label}
              </span>

              {/* Dividers */}
              {index !== stats.length - 1 && (
                <>
                  <div className="hidden md:block absolute right-0 top-8 bottom-8 w-px bg-[#E6DFD4]" />
                  <div className="block md:hidden absolute bottom-0 left-6 right-6 h-px bg-[#E6DFD4]" />
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}