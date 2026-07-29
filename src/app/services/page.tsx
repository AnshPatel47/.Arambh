"use client";

import React, { useState } from "react";
import { DM_Sans } from "next/font/google";
import {
  Building2,
  Award,
  Landmark,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  Menu,
  ChevronDown
} from "lucide-react";
import Footer from "../components/Footer";

// Configure DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

// Content extracted from Figma (Added 'image' property to each)
const servicesData = [
  {
    id: "business-registration",
    title: "Business Registration",
    description: "Transform your idea into a legally recognized business with expert guidance at every step. We help you choose the right business structure, manage documentation, and complete the registration process efficiently.",
    icon: Building2,
    color: "bg-blue-100 text-blue-700",
    image: "assets/images/service_registration.png"
  },
  {
    id: "startup-recognition",
    title: "Startup India & Government Recognition",
    description: "Government recognition can open doors to funding, tax benefits, and valuable support programs. Our team assists you in obtaining Startup India, DPIIT, MSME, and other relevant registrations, ensuring a smooth and hassle-free application process.",
    icon: Award,
    color: "bg-amber-100 text-amber-700",
    image: "assets/images/service_startup.png"
  },
  {
    id: "funding-grants",
    title: "Government Funding & Grants",
    description: "Navigating government schemes can be overwhelming. We identify funding opportunities that match your business, prepare the required documentation, and guide you through the application process to improve your chances of success.",
    icon: Landmark,
    color: "bg-green-100 text-green-700",
    image: "assets/images/service_funding.png"
  },
  {
    id: "strategy-growth",
    title: "Business Strategy & Growth Consulting",
    description: "Whether you're launching a new venture or scaling an existing business, we provide strategic guidance tailored to your goals. From business planning to market positioning and growth roadmaps, we help you make informed decisions with confidence.",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-700",
    image: "assets/images/service_strategy.png"
  },
  {
    id: "compliance-regulatory",
    title: "Compliance & Regulatory Support",
    description: "Managing legal and regulatory requirements shouldn't slow your business down. We provide ongoing compliance support, helping you meet statutory obligations, reduce risks, and maintain smooth business operations throughout your journey.",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-700",
    image: "assets/images/i5.png"
  },
  {
    id: "end-to-end",
    title: "End-to-End Advisory Services",
    description: "From company registration and government recognition to funding support and long-term business advisory, Arambh Advisory offers comprehensive solutions under one roof. Our integrated approach ensures you always have expert guidance as your business evolves.",
    icon: Briefcase,
    color: "bg-indigo-100 text-indigo-700",
    image: "assets/images/service_endtoend.png"
  }
];

export default function ServicesPage() {
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeService = servicesData.find(s => s.id === activeServiceId) || servicesData[0];
  // const ActiveIcon = activeService.icon; // Keeping this commented out since we are using images now

  return (
    <div className={`min-h-screen bg-[#ffff] ${dmSans.className}`}>

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[520px] flex items-center mb-16">

        {/* Background Image Cover */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/services_hero.webp')" }}
        />

        {/* Dark Gradient Overlay (the "shadow") */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#C2943A] mb-6 uppercase" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-zinc-900">/</span>
            <span className="text-white">Services</span>
          </nav>
          <div className="max-w-2xl flex flex-col items-start text-left">
            <h1 
              className="text-[26px] leading-[1.2] md:text-[clamp(2rem,3.2vw,3.2rem)] md:leading-[1.05] tracking-[-0.04em] text-white mb-4"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 500,
              }}
            >
              Explore Our <br />
              <span className="text-[#C2943A]">
                Advisory Services.
              </span>
            </h1>
            <p 
              className="text-[16px] leading-[1.6] text-zinc-300 max-w-xl"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 400,
              }}
            >
              From business incorporation and DPIIT startup recognition to securing government seed grants and compliance audits—we provide end-to-end support for your corporate journey.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">

        {/* Mobile Dropdown Menu (Visible only on small screens) */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-between text-DM sans font-semibold text-[#C2943A]"
          >
            <div className="flex items-center gap-2">
              <Menu className="w-5 h-5" />
              All Services
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isMobileMenuOpen && (
            <div className="mt-2 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
              {servicesData.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveServiceId(service.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-0 text-DM sans ${activeServiceId === service.id ? "bg-amber-50 text-[#C2943A] font-bold" : "text-zinc-900"
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-8">
              {/* Sidebar Header */}
              <div className="bg-[#C2943A] text-white p-6 rounded-t-xl">
                <h2 className="font-bold text-xl mb-1">Available Services</h2>
                <p className="text-amber-100 text-sm">{servicesData.length} services</p>
              </div>

              {/* Sidebar List */}
              <div className="bg-white border-x border-b border-gray-200 rounded-b-xl shadow-sm overflow-hidden">
                {servicesData.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 last:border-0 border-l-4 text-DM sans
                      ${activeServiceId === service.id
                        ? "bg-[#faf8f5] text-[#C2943A] font-bold border-[#C2943A]"
                        : "text-zinc-900 hover:bg-gray-50 hover:text-[#C2943A] border-transparent"
                      }
                    `}
                  >
                    <span className="pr-4">{service.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[450px]">

              {/* Text Content */}
              <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#C2943A] mb-6 leading-tight">
                  {activeService.title}
                </h2>
                <p className="DM sans text-neutral-800 leading-relaxed text-base sm:text-lg">
                  {activeService.description}
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <button className="bg-[#C2943A] hover:bg-[#a67c29] text-white px-6 py-3 rounded-xl text-DM sans font-semibold transition-all shadow-md cursor-pointer">
                    Consult an Expert
                  </button>
                  <button className="border border-zinc-300 text-zinc-900 hover:border-[#C2943A] hover:text-[#C2943A] px-6 py-3 rounded-xl text-DM sans font-semibold transition-all cursor-pointer">
                    Know Details
                  </button>
                </div>
              </div>

              {/* Visual Asset (Now using images) */}
              <div className="md:w-2/5 relative min-h-[250px] md:min-h-full bg-gray-100">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── 3. FEATURES SECTION ── */}
      <section className="bg-[#ffff] pt-16 pb-36 md:pb-44 px-6 sm:px-12 md:px-16 border-t border-zinc-300 mt-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-[#C2943A]/10 text-DM sans font-bold tracking-widest text-[#C2943A] uppercase text-xs">
              Why Arambh
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-DM">Why Partner With Arambh?</h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="relative w-full aspect-[2/1] overflow-hidden bg-neutral-100">
                <img
                  src="/assets/images/why_advisory.png"
                  alt="Dedicated Advisory"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-zinc-900 DM sans mb-2">Dedicated Advisory</h4>
                <p className="text-neutral-500 DM sans leading-relaxed text-sm">Direct assistance from qualified professionals at every checkpoint of your registration or funding application.</p>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="relative w-full aspect-[2/1] overflow-hidden bg-neutral-100">
                <img
                  src="/assets/images/why_delivery.png"
                  alt="Time-Bound Delivery"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-zinc-900 DM sans mb-2">Time-Bound Delivery</h4>
                <p className="text-neutral-500 DM sans leading-relaxed text-sm">Structured timelines for drafting, documentation, and filing, ensuring your startup gets certified on schedule.</p>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="relative w-full aspect-[2/1] overflow-hidden bg-neutral-100">
                <img
                  src="/assets/images/why_scaling.png"
                  alt="Compliant Scaling"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-zinc-900 DM sans mb-2">Compliant Scaling</h4>
                <p className="text-neutral-500 DM sans leading-relaxed text-sm">From sole proprietor migrations to Series-A VC audit readiness, we keep your cap table and registers pristine.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side "Free Consultation" Sticky Button (Like in the reference site) */}
      {/* <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
        <button
          className="bg-[#C2943A] hover:bg-[#a67c29] text-white font-semibold py-3 px-4 rounded-r-lg shadow-lg transform -rotate-180 transition-colors flex items-center gap-2"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className="text-sm tracking-wider" style={{ writingMode: 'vertical-rl' }}>
            Free Consultation
          </span>
        </button>
      </div> */}
      {/* <section className="w-full bg-white text-zinc-900 pt-8 sm:pt-12 pb-20 sm:pb-32 md:pb-20 relative z-0"></section> */}
       <Footer />
    </div>
  );
}
