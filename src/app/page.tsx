import dynamic from "next/dynamic";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import ScrollToTopButton from "@/components/scrollarrow/ScrollToTopButton";

const Hero = dynamic(() => import("@/components/home/hero/Hero"), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-[#FBF7EE] animate-pulse" />
});

const HeroStats = dynamic(() => import("@/components/home/hero/HeroStats"), {
  ssr: false,
  loading: () => <div className="w-full h-[200px] bg-[#FBF7EE] animate-pulse" />
});

const Services = dynamic(() => import("@/components/home/services/Services"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-[#FBF7EE] animate-pulse rounded-3xl" />
});

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
    
      <main className="flex min-h-screen flex-col w-full bg-[#FBF7EE]">
        <SectionErrorBoundary sectionName="Hero">
          <Hero />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Hero Stats">
          <HeroStats />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Services">
          <Services />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Smart India">
          <SmartIndia />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Case Studies">
          <CaseStudies />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Blogs">
          <Blogs />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="FAQ">
          <FAQ />
        </SectionErrorBoundary>

        <ScrollToTopButton heroSectionId="hero-section" />
      </main>
  );
}