import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/hero/Hero";
import HeroStats from "@/components/home/hero/HeroStats";
import Services from "@/components/home/services/Services";
import dynamic from "next/dynamic";

const SmartIndia = dynamic(() => import("@/components/home/smartindia/SmartIndia"), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-[#FBF7EE] animate-pulse rounded-3xl" />
});

const Testimonials = dynamic(() => import("@/components/home/testimonials/testimonials/Testimonials"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-white animate-pulse rounded-3xl" />
});

const CaseStudies = dynamic(() => import("@/components/home/case_studies/CaseStudies"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-white animate-pulse rounded-3xl" />
});

const Blogs = dynamic(() => import("@/components/home/blogs/Blogs"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-[#FFF8F6] animate-pulse rounded-3xl" />
});

const FAQ = dynamic(() => import("@/components/home/faq/FAQ"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-white animate-pulse rounded-3xl" />
});

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <Hero />
      <HeroStats />
      <Services />
      <SmartIndia />
      <Testimonials />
      <CaseStudies />
      <Blogs />
      <FAQ />
    </main>
  );
}