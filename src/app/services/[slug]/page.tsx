import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DM_Sans } from "next/font/google";
import { getServiceBySlug } from "@/lib/services";
import Footer from "@/app/components/Footer";
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

  // Safe string check with optional chaining
  const rawImage = service?.image || fallbackImage;

  const imageSrc = rawImage.startsWith("/")
    ? rawImage
    : `/${rawImage}`;

  return (
    <div className={`min-h-screen bg-white ${dmSans.className}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-24 pb-16 sm:pt-60 sm:pb-20 md:pt-44 md:pb-32 px-6 sm:px-12 md:px-16 min-h-[560px] md:min-h-[620px]">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/contact_hero_netbounce.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241c0e] via-[#220E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">
          <nav
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#C2943A] mb-6 uppercase"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-500">/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span className="text-zinc-500">/</span>
            <span className="text-[#ffff]">{service.title}</span>
          </nav>

          <h1 className="text-2xl text-[#C2943A] md:text-3xl font-bold mb-8 mt-12">{service.title}</h1>
          <p className="text-zinc-200 text-lg max-w-2xl">{service.description}</p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Detailed Content */}
          <div className="lg:col-span-8">


            <h2 className="text-2xl font-bold text-zinc-900 mb-6">
              Service Details
            </h2>
            <p className="text-zinc-700 text-lg leading-relaxed whitespace-pre-line mb-8">
              {service.details || service.description || ""}
            </p>

            <button className="bg-[#C2943A] hover:bg-[#a67c29] text-white px-5 py-4 rounded-xl font-bold transition-all shadow-md">
              Get Started with {service.title}
            </button>
          </div>

          {/* Sidebar Action Box */}
          <div className="lg:col-span-4">
            <div className="bg-[#ffff] text-zinc-900 border border-zinc-300 p-6 rounded-2xl sticky top-8">
              <h3 className="text-xl font-bold border-b border-zinc-400 text-[#C2943A] mb-3">
                Need Guidance?
              </h3>
              <p className="text-zinc-900 text-s mb-6 mt-6">
                Talk to our expert consultants to understand the exact compliance
                and procedure steps for your business.
              </p>
              <button className="w-full bg-[#C2943A] hover:bg-[#a67c29] text-white py-3 px-6 rounded-xl font-semibold transition-all">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </main>
      <section className="w-full bg-white pt-8 sm:pt-6 pb-20 sm:pb-32 md:pb-20 relative z-0"></section>
     <ScrollToTopButton heroSectionId="hero-section" />
    <Footer />
    </div>
  );
}