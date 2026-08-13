import dynamic from "next/dynamic";
import ScrollToTopButton from "@/components/scrollarrow/ScrollToTopButton";

const About = dynamic(() => import("@/components/about/About"), {
  ssr: false,
  loading: () => <div className="w-full min-h-screen bg-white animate-pulse" />,
});

export default function AboutPage() {
  return (
    <>
      <About />
     
      <ScrollToTopButton heroSectionId="hero-section" />
     
    </>
  );
}
