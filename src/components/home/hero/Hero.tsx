"use client";

import Image from "next/image";
import SchemesSlider from "./SchemesSlider"; 

export default function Hero() {
  return (
    <section
      className="relative w-full pt-[72px] pb-10 overflow-hidden flex items-center min-h-[480px]"
      style={{ background: "#FBF7EE" }}
    >
      {/* Centered vertical line spanning to hero ends */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E6DFD4] -translate-x-1/2 z-0" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 w-full">

          {/* ══ LEFT PANEL ══ */}
          <div className="lg:col-span-6 flex flex-col items-start text-left w-full lg:max-w-[500px] lg:ml-auto lg:mr-8 reveal">

            <h1
              className="text-[#131313] tracking-[-0.04em] rv-up"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontSize: "clamp(2rem, 3.2vw, 3.2rem)",
                fontWeight: 500,
                lineHeight: "1.05",
                maxWidth: "100%",
              }}
            >
              <span>Your Trusted Startup &amp;</span>
              <br />
              <span>Business Growth Partner</span>
            </h1>

            {/* Description */}
            <p
              className="mt-5 text-[#666665] max-w-[460px] rv-up"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "1.6",
              }}
            >
              Whether you&apos;re launching your first startup or growing an
              established MSME, Arambh Advisory simplifies every step with
              expert guidance and end-to-end consulting.
            </p>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-3 w-full rv-up">
              <button
                className="rounded-full bg-[#131313] px-5 py-2.5 text-[13px] text-white font-semibold transition-all hover:bg-black hover:shadow-lg hover:-translate-y-[1px] active:scale-95 cursor-pointer"
                style={{ fontFamily: "var(--font-dm), sans-serif" }}
              >
                Book a Free Consultation
              </button>

              <button
                className="rounded-full bg-transparent border border-black px-5 py-2.5 text-[13px] text-black font-semibold transition-all hover:bg-black hover:text-white hover:shadow-lg hover:-translate-y-[1px] active:scale-95 cursor-pointer"
                style={{ fontFamily: "var(--font-dm), sans-serif" }}
              >
                Explore Services
              </button>
            </div>

            {/* Trust checklist */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 w-full rv-up">
              {["Faster Approvals", "Transparent Process"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="relative h-[18px] w-[18px] shrink-0">
                    <Image
                      src="/images/rosette-discount-check-filled.svg"
                      alt="check"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="text-[13px] font-medium text-[#444444]"
                    style={{ fontFamily: "var(--font-dm), sans-serif" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT PANEL ══ */}
          <div className="lg:col-span-6 w-full lg:mr-auto lg:ml-0 reveal">
            <SchemesSlider />
          </div>
        </div>
      </div>
    </section>
  );
}