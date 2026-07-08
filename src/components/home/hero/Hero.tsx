"use client";

import Image from "next/image";
import ServicesSlider from "./ServicesSlider";

export default function Hero() {
  return (
    <section className="w-full bg-[#FCFBF9] pt-32 pb-12 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* THE FIX: Replaced custom layout with md:divide-x division layout to make that clean vertical line! */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[580px] divide-y md:divide-y-0 md:divide-x divide-[#E8E1D8]">
          
          {/* Left Column Section - REMOVED: rounded, borders, shadows, and background */}
          <div className="flex flex-col items-center justify-center p-8 md:p-10 md:pr-16">
            
            {/* Top Content Group */}
            <div className="flex flex-col items-center w-full flex-1 justify-center">
              {/* Badge */}
              <div 
                className="inline-flex mx-auto w-fit items-center gap-2 rounded-full border border-[#E8E1D8] bg-[#F6F4F0] px-4 py-0 text-xs font-semibold uppercase tracking-wider text-neutral-500"
                style={{
                  height: "29px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span className="h-2 w-2 rounded-full bg-[#333333]" />
                Trusted by 350+ Businesses
              </div>

              {/* Headings & Text */}
              <h1 
                className="mt-6 text-[40px] font-semibold text-[#1F1F1F] tracking-tight text-center"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  lineHeight: '120%',       
                  letterSpacing: '-0.02em', 
                }}
              >
                Your Trusted Startup & Business Growth Partner
              </h1>
              
              <p 
                className="mt-4 text-[16px] font-normal text-[#666666] text-center"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  lineHeight: '140%',        
                  letterSpacing: '-0.02em',  
                }}
              >
                Whether you're launching your first startup or growing an established MSME, Arambh Advisory simplifies every step with expert guidance, faster approvals, and end-to-end consulting.
              </p>
            </div>

            {/* Bottom Content Group (Buttons + Features) */}
            <div className="flex-1 w-full flex flex-col items-center justify-center pt-6">
              <div className="flex flex-wrap gap-4 justify-center w-full">
                <button className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition">
                  Book a Free Consultation
                </button>
                <button className="rounded-full border border-[#E8E1D8] bg-white px-6 py-3 text-sm font-medium text-black hover:bg-neutral-50 transition">
                  Explore Services
                </button>
              </div>

              {/* Features checklist */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 w-full">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-5 w-5 shrink-0">
                    <Image
                      src="/images/rosette-discount-check-filled.svg" 
                      alt="Checkmark icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-base font-medium text-[#1F1F1F]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Faster Approvals
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="relative h-5 w-5 shrink-0">
                    <Image
                      src="/images/rosette-discount-check-filled.svg" 
                      alt="Checkmark icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-base font-medium text-[#1F1F1F]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Transparent Process
                  </span>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column Section */}
          <ServicesSlider />

        </div>

      </div>
    </section>
  );
}