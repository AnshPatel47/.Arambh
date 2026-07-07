<<<<<<< HEAD
"use client";

import React from "react";
import Link from "next/link";
import Footer from "./components/Footer";
import { DM_Sans } from "next/font/google";
import {
  Building2,
  Award,
  Landmark,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import ScrollToTopButton from "../components/scrollarrow/ScrollToTopButton";

// Configure DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});
=======
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/hero/Hero";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Navbar />
      <Hero />
    </main>
  );
}
import Image from "next/image";
>>>>>>> e2b361e (Created Home page)

export default function Home() {
  return (
    <div className={`min-h-screen bg-[#F8F9FA] text-zinc-900 antialiased flex flex-col justify-between ${dmSans.className}`}>
      
      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#120E07]/90 backdrop-blur-md border-b border-white/5 py-4 px-6 sm:px-12 md:px-16">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/assets/images/Vector.png" 
              alt="Arambh Advisory Logo" 
              className="w-auto h-8 object-contain" 
            />
            <div className="flex flex-col text-left">
              <span className="font-bold text-white tracking-wide text-sm sm:text-base">ARAMBH ADVISORY</span>
              <span className="text-[9px] text-zinc-400 font-semibold tracking-widest mt-0.5">SERVICES LLP</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link href="/" className="hover:text-[#BD8E32] transition-colors text-white">Home</Link>
            <Link href="/services" className="hover:text-[#BD8E32] transition-colors">Services</Link>
            <Link href="/resources/case_studies" className="hover:text-[#BD8E32] transition-colors">Case Studies</Link>
            <Link href="/resources" className="hover:text-[#BD8E32] transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-[#BD8E32] transition-colors">Contact</Link>
          </nav>

          <Link 
            href="/contact" 
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#BD8E32] hover:bg-[#a67c29] text-white transition-all shadow-[0_0_15px_rgba(189,142,50,0.2)]"
          >
            Get Free Consultation
          </Link>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-52 pb-36 px-6 sm:px-12 md:px-16 min-h-[620px] flex items-center">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-40" 
          style={{ backgroundImage: "url('/assets/images/services_hero.webp')" }} 
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/95 to-[#120E07]/60 z-10" />
        
        {/* Soft Gold Glow behind the text */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#BD8E32]/10 rounded-full blur-[120px] z-0 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-[#BD8E32]/30 bg-[#BD8E32]/10 text-DM sans font-semibold tracking-widest text-[#BD8E32] uppercase backdrop-blur-sm text-xs">
                Premium Corporate Advisory
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white mb-6">
                Empowering Startups <br />
                & MSMEs to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BD8E32] to-[#f8d08b]">
                  Build Compliant Giants
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl mb-8">
                End-to-end consulting for startup registration, DPIIT recognition, tax exemptions, and government seed funding programs. We handle the complex compliance while you focus on scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link 
                  href="/services" 
                  className="group flex items-center justify-center gap-3 bg-[#BD8E32] hover:bg-[#a67c29] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(189,142,50,0.25)] hover:shadow-[0_0_30px_rgba(189,142,50,0.4)]"
                >
                  Explore Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center justify-center border border-white/20 hover:border-white hover:bg-white/5 text-white px-8 py-4 rounded-lg font-semibold transition-all"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>

            {/* Right graphic card column */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#BD8E32] rounded-full blur-[90px] opacity-10 pointer-events-none" />
              <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="/assets/images/br2.png" 
                  alt="Arambh Team Advisory" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120E07]/60 via-transparent to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─ FEATURES STATS SECTION ── */}
      <section className="bg-white py-12 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#BD8E32]">500+</p>
              <p className="text-zinc-500 text-sm font-semibold mt-1">Startups Registered</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#BD8E32]">₹15Cr+</p>
              <p className="text-zinc-500 text-sm font-semibold mt-1">Government Funding Secured</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#BD8E32]">99%</p>
              <p className="text-zinc-500 text-sm font-semibold mt-1">Success Audit Rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#BD8E32]">10+</p>
              <p className="text-zinc-500 text-sm font-semibold mt-1">Multi-State Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FOOTER ── */}
      <section className="w-full bg-white text-zinc-900 pt-8 sm:pt-12 pb-20 sm:pb-32 md:pb-20 relative z-0"></section>
      <Footer />
    </div>
  );
}
