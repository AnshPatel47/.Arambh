"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "../components/Footer";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#ffff] flex flex-col justify-between">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[520px] flex items-center">
        {/* Background Image (Shown completely on the right) */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/contact_hero_netbounce.webp')" }}
        />

        {/* Dark Gradient Overlay (the "shadow") */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#C2943A] mb-8 uppercase" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-white">Contact Us</span>
          </nav>

          <div className="max-w-2xl flex flex-col items-start text-left">
            <h1
              className="text-[26px] leading-[1.2] md:text-[clamp(2rem,3.2vw,3.2rem)] md:leading-[1.05] tracking-[-0.04em] text-white mb-4"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 500,
              }}
            >
              {"Let's Start a"} <br />
              <span className="text-[#C2943A]">
                Conversation.
              </span>
            </h1>
            <p
              className="text-[16px] leading-[1.6] text-zinc-300 max-w-xl"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 400,
              }}
            >
              Whether you need expert advice on corporate compliance, startup registration, or business structuring, our advisory team is ready to guide you.
            </p>

            {/* Call Us Now Button */}
            <div className="mt-8">
              <a
                href="tel:+918866556327"
                className="group flex items-center gap-3 bg-[#C2943A] hover:bg-[#a67c29] text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(194,148,58,0.25)] hover:shadow-[0_0_30px_rgba(194,148,58,0.4)] hover:-translate-y-1 text-DM sans"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}
