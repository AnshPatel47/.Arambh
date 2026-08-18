"use client";

import Image from "next/image";
import Link from "next/link";
import SchemesSlider from "./SchemesSlider";
import { useScheduleCallModal } from "../../schedule-call/ScheduleCallContext";

export default function Hero() {
  const { openModal } = useScheduleCallModal();
  return (
    <section
      id="hero-section"
      className="relative w-full pt-24 lg:pt-28 pb-10 overflow-hidden flex items-center min-h-[480px]"
      style={{ background: "#FBF7EE" }}
    >
      {/* Centered vertical line */}
           <div className="hidden lg:block absolute left-1/2 top-[80px] bottom-0 w-px bg-[#E6DFD4] -translate-x-1/2 z-0 reveal" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-20 w-full">
   <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 w-full">

          {/* ══ LEFT PANEL ══ */}
       
 <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-[500px] lg:mr-auto lg:ml-0 lg:self-start lg:sticky lg:top-[120px] reveal">
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
             <span className="hidden md:inline">
  <span className="whitespace-nowrap">Your Trusted Startup &amp;</span>
  <br />
  <span className="whitespace-nowrap">Business Growth Partner</span>
</span>
              <span className="inline md:hidden text-[26px] leading-[1.2]">
                Your Trusted
                <br />
                Startup &amp; Business
                <br />
                Growth Partner
              </span>
            </h1>

            {/* Description */}
            <p
              className="mt-5 text-[#666665] max-w-[460px] mx-auto lg:mx-0 rv-up text-center lg:text-left"
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
            <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 w-full rv-up items-center px-4 sm:px-0">
              <button
                onClick={openModal}
                className="w-full max-w-[280px] sm:w-auto rounded-full bg-[#131313] px-5 py-2.5 text-[13px] text-white font-semibold transition-all hover:bg-black hover:shadow-lg hover:-translate-y-[1px] active:scale-95 cursor-pointer text-center"
                style={{ fontFamily: "var(--font-dm), sans-serif" }}
              >
                Book a Free Consultation
              </button>

              <Link
                href="/services"
                className="w-full max-w-[280px] sm:w-auto rounded-full bg-transparent border border-black px-5 py-2.5 text-[13px] text-black font-semibold transition-all hover:shadow-lg hover:-translate-y-[1px] active:scale-95 cursor-pointer text-center block"
                style={{ fontFamily: "var(--font-dm), sans-serif" }}
              >
                Explore Services
              </Link>
            </div>

            {/* Trust checklist */}
            <div className="mt-6 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-x-5 sm:gap-x-6 w-full rv-up">
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
                    className="text-[13px] font-medium text-[#444444] whitespace-nowrap"
                    style={{ fontFamily: "var(--font-dm), sans-serif" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT PANEL ══ */}
          <div className="lg:col-span-6 w-full lg:ml-auto lg:mr-0 lg:-mt-6 reveal">
            <SchemesSlider />
          </div>
        </div>
      </div>
    </section>
  );
}