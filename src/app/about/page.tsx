import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/about/About"), {
  ssr: false,
  loading: () => <div className="w-full min-h-screen bg-white animate-pulse" />
});

export default function AboutPage() {
  return (
    <>
      <About />
      {/* Footer will be added by another team member */}
    </>
  );
}