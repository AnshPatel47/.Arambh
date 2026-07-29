import dynamic from "next/dynamic";
import SectionErrorBoundary from "@/components/ui/SectionErrorBoundary";

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
    <main className="flex min-h-screen flex-col overflow-x-clip bg-[#FBF7EE]">
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


      {/* CaseStudies Section: -mt-30 (-120px) mobile / -mt-26 (-104px) desktop 
          adjusts ContactForm's pb-36 (144px) / pb-44 (176px) and CaseStudies pt-14 (56px) 
          to yield exactly 80px mobile / 128px desktop gap. */}
      <div className="-mt-30 lg:-mt-26">
        <CaseStudies />
      </div>

      {/* Blogs Section: -mt-18 (-72px) mobile / -mt-6 (-24px) desktop 
          adjusts CaseStudies' pb-14 (56px) and Blogs' pt-24 (96px) 
          to yield exactly 80px mobile / 128px desktop gap. */}
      <div className="-mt-18 lg:-mt-6">
        <Blogs />
      </div>

      {/* FAQ Section: -mt-28 (-112px) mobile / -mt-16 (-64px) desktop 
          adjusts Blogs' pb-24 (96px) and FAQ's pt-24 (96px) 
          to yield exactly 80px mobile / 128px desktop gap. */}
      <div className="-mt-28 lg:-mt-16">
        <SectionErrorBoundary sectionName="FAQ">
          <FAQ />
        </SectionErrorBoundary>
      </div>
    </main>
  );
}