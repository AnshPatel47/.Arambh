"use client";

import React, { useState, useEffect } from "react";
import { DM_Sans } from "next/font/google";
import { Menu, ChevronDown } from "lucide-react";
import ScrollToTopButton from "../../components/scrollarrow/ScrollToTopButton";
import PageHeroHeader from "../../components/PageHeroHeader";
import Link from "next/link";

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
}

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (data.success && data.services.length > 0) {
          setServices(data.services);
          setActiveServiceId(data.services[0].id);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const activeService = services.find((s) => s.id === activeServiceId) || services[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#C2943A] font-semibold text-lg">
          <div className="w-5 h-5 border-2 border-[#C2943A] border-t-transparent rounded-full animate-spin" />
          Loading services...
        </div>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-zinc-600 text-lg">No services found.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${dmSans.className}`}>

      {/* ── 1. HERO SECTION ── */}
      <section
        id="hero-section"
        className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[560px] flex flex-col justify-start mb-16"
      >
        {/* Background Image Cover */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/services_hero.webp')" }}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20 flex flex-col items-start">
          <PageHeroHeader
            breadcrumbCurrent="Services"
            title={
              <>
                Explore Our <br />
                <span className="text-[#C2943A]">
                  Advisory Services.
                </span>
              </>
            }
            description="From business incorporation and DPIIT startup recognition to securing government seed grants and compliance audits—we provide end-to-end support for your corporate journey."
          />
        </div>
      </section>

      {/* ── 2. MAIN SERVICES DISPLAY ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">

        {/* Mobile Dropdown Menu (Scrollable) */}
        <div className="lg:hidden mb-6 reveal">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-between font-semibold text-[#C2943A] shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Menu className="w-5 h-5" />
              <span>All Services ({services.length})</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isMobileMenuOpen && (
            <div className="mt-2 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden max-h-[350px] overflow-y-auto divide-y divide-gray-100">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveServiceId(service.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                    activeServiceId === service.id
                      ? "bg-amber-50 text-[#C2943A] font-bold"
                      : "text-zinc-900 hover:bg-gray-50"
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-4 rv-up">
            <div className="sticky top-8">
              <div className="bg-[#C2943A] font-sans text-white p-6 rounded-t-xl">
                <h2 className="font-bold text-xl">Available Services</h2>
                <p className="text-amber-100 text-sm">{services.length} services available</p>
              </div>

              <div className="bg-white border-x border-b border-zinc-300 rounded-b-xl shadow-sm overflow-hidden">
                <div className="max-h-[340px] overflow-y-auto divide-y divide-zinc-200 font-sans">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveServiceId(service.id)}
                      className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 border-l-4 ${
                        activeServiceId === service.id
                          ? "bg-[#f3f0eb] text-[#C2943A] font-bold"
                          : "text-zinc-900 hover:bg-gray-50 hover:text-[#C2943A] border-transparent"
                      }`}
                    >
                      <span className="pr-4 leading-snug">{service.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content Card */}
          <div className="lg:col-span-8 rv-up" style={{ transitionDelay: "150ms" }}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden flex flex-col md:flex-row min-h-[440px]">

              <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#C2943A] mb-6 leading-tight">
                  {activeService.title}
                </h2>
                <p className="text-zinc-900 leading-relaxed text-base sm:text-lg">
                  {activeService.description}
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <button className="bg-[#C2943A] hover:bg-[#a67c29] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md cursor-pointer">
                    Consult an Expert
                  </button>
                  <Link
                    href={`/services/${activeService.slug}`}
                    className="border border-zinc-300 text-zinc-900 hover:border-[#C2943A] hover:text-[#C2943A] px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer inline-block text-center"
                  >
                    Know Details
                  </Link>
                </div>
              </div>

              <div className="md:w-2/5 relative min-h-[250px] md:min-h-full bg-gray-100">
                <img
                  src={activeService.image || "/assets/images/service_registration.png"}
                  alt={activeService.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── 3. FEATURES SECTION ── */}
      <section className="bg-white pt-16 pb-36 md:pb-44 px-6 sm:px-12 md:px-16 border-t border-zinc-300 mt-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12 text-center reveal">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">Why Partner With Arambh?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rv-up bg-white border border-zinc-300 rounded-3xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="relative w-full aspect-[2/1] overflow-hidden bg-neutral-100">
                <img
                  src="/assets/images/why_advisory.png"
                  alt="Dedicated Advisory"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Dedicated Advisory</h3>
                <p className="text-zinc-900 leading-relaxed text-sm">Direct assistance from qualified professionals at every checkpoint of your registration or funding application.</p>
              </div>
            </div>

            <div className="rv-up bg-white border border-zinc-300 rounded-3xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col" style={{ transitionDelay: "150ms" }}>
              <div className="relative w-full aspect-[2/1] overflow-hidden bg-neutral-100">
                <img
                  src="/assets/images/why_delivery.png"
                  alt="Time-Bound Delivery"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Time-Bound Delivery</h3>
                <p className="text-zinc-900 leading-relaxed text-sm">Structured timelines for drafting, documentation, and filing, ensuring your startup gets certified on schedule.</p>
              </div>
            </div>

            <div className="rv-up bg-white border border-zinc-300 rounded-3xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col" style={{ transitionDelay: "300ms" }}>
              <div className="relative w-full aspect-[2/1] overflow-hidden bg-neutral-100">
                <img
                  src="/assets/images/why_scaling.png"
                  alt="Compliant Scaling"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Compliant Scaling</h3>
                <p className="text-zinc-900 leading-relaxed text-sm">From sole proprietor migrations to Series-A VC audit readiness, we keep your cap table and registers pristine.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTopButton heroSectionId="hero-section" />
    </div>
  );
}