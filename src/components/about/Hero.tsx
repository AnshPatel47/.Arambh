"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageHeroHeader from "@/components/PageHeroHeader";
import { stats } from "./about.data";

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/about_hero_bg.png"
          alt="Arambh Advisory Team collaborating"
          fill
          priority
          className="object-cover"
        />
      </div>

      <section className="relative z-20 w-full pt-44 pb-20 lg:pb-24 px-6 sm:px-12 md:px-16 flex flex-col justify-center min-h-[440px] lg:min-h-[480px]">
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0" />

        {/* Reusable Hero Header */}
        <PageHeroHeader
          breadcrumbCurrent="About"
          title={
            <>
              Small on purpose.
              <br />
              <span className="text-[#C2943A]">Accountable by design.</span>
            </>
          }
          description="Arambh means beginning. We exist so that a founder's beginning is done right: the structure, the filings, the funding, and a real person who stays on the line long after the certificates arrive."
        />
      </section>

      {/* Stats Bar */}
      <div className="relative z-20 w-full border-t border-white border-b border-white/10 bg-white/5 backdrop-blur-md overflow-hidden lg:h-[192px]">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md -z-10" />

        <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden z-30 pointer-events-none">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            className="h-full bg-[#C2943A]"
          />
        </div>

        <div className="mx-auto max-w-[1304px] w-full h-full px-6 lg:px-0 reveal">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 w-full h-full justify-center">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                className="flex flex-col items-center justify-start w-full lg:h-[190px] px-4 lg:px-8 py-6 lg:pt-[54px] relative overflow-hidden"
              >
                <div className="flex flex-col items-center text-center max-w-[260px] sm:max-w-[280px] lg:max-w-[300px] mx-auto w-full">
                  <h2
                    className="text-[40px] md:text-[52px] font-bold leading-none tracking-tight text-[#C2943A]"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    {stat.value}
                  </h2>

                  <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-white/80">
                    {stat.label}
                  </p>
                </div>

                {index !== stats.length - 1 && (
                  <>
                    <div className="hidden lg:block absolute right-0 top-[1px] bottom-[1px] w-px bg-white/10" />
                    <div className="block lg:hidden absolute bottom-0 left-6 right-6 h-px bg-white/10" />
                  </>
                )}

                {index % 2 === 0 && (
                  <div className="hidden sm:block lg:hidden absolute right-0 top-6 bottom-6 w-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}