import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { DM_Sans } from "next/font/google";
import { getServiceBySlug } from "@/lib/services";
import ScrollToTopButton from "@/components/scrollarrow/ScrollToTopButton";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

interface DynamicServiceProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DynamicServicePage({ params }: DynamicServiceProps) {
  // 1. Await params before accessing `slug` (Required in Next.js 15+)
  const { slug } = await params;

  // 2. Fetch service data
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const fallbackImage = "/assets/images/services_hero.webp";
  const rawImage = service?.image || fallbackImage;
  const imageSrc = rawImage.startsWith("/") ? rawImage : `/${rawImage}`;

  return (
    <div className={`min-h-screen bg-white ${dmSans.className}`}>
      {/* ── HERO SECTION (Matching Blog & Case Studies Page Hero Standard) ── */}
      <section 
        id="hero-section" 
        className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[560px] md:min-h-[560px] flex flex-col justify-start"
      >
        {/* Background Image Cover */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">
          {/* Breadcrumbs */}
          <nav
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#C2943A] mb-6 sm:mb-8 uppercase txt-up"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-white">{service.title}</span>
          </nav>

          {/* Header Content */}
          <div className="reveal max-w-2xl flex flex-col items-start text-left">
            <h1
              className="text-[26px] xs:text-[30px] sm:text-[36px] md:text-[clamp(2rem,3.2vw,3.2rem)] leading-[1.2] md:leading-[1.05] tracking-[-0.04em] text-white mb-4 txt-up txt-delay-1"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 500,
              }}
            >
              <span className="text-[#C2943A]">{service.title}</span>
            </h1>
            <p
              className="text-[14px] sm:text-[16px] leading-[1.6] text-zinc-300 max-w-xl txt-up txt-delay-2"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 400,
              }}
            >
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Detailed Content */}
          <div className="lg:col-span-8 rv-up">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">
              Service Details
            </h2>
            <p className="text-zinc-700 text-lg leading-relaxed whitespace-pre-line mb-8">
              {service.description}
            </p>

            <button className="bg-[#C2943A] hover:bg-[#a67c29] text-white px-5 py-4 rounded-xl font-bold transition-all shadow-md cursor-pointer">
              Get Started with {service.title}
            </button>
          </div>

          {/* Sidebar Action Box */}
          <div className="lg:col-span-4 rv-up" style={{ transitionDelay: "150ms" }}>
            <div className="bg-[#ffff] text-zinc-900 border border-zinc-300 p-6 rounded-2xl sticky top-8">
              <h3 className="text-xl font-bold border-b border-zinc-400 text-[#C2943A] mb-3">
                Need Guidance?
              </h3>
              <p className="text-zinc-900 text-s mb-6 mt-6">
                Talk to our expert consultants to understand the exact compliance
                and procedure steps for your business.
              </p>
              <button className="w-full bg-[#C2943A] hover:bg-[#a67c29] text-white py-3 px-6 rounded-xl font-semibold transition-all cursor-pointer">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </main>

      <section className="w-full bg-white pt-8 sm:pt-6 pb-20 sm:pb-32 md:pb-20 relative z-0" />
      <ScrollToTopButton heroSectionId="hero-section" />
    </div>
  );
}