import Image from "next/image";
import { stats } from "./about.data";

export default function Hero() {
  return (
    <section className="relative w-full pt-[72px] pb-0 overflow-hidden flex flex-col justify-between min-h-[650px] lg:min-h-[700px] reveal">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/about_hero_bg.png"
          alt="Arambh Advisory Team collaborating"
          fill
          priority
          className="object-cover"
        />
        {/* Dark Shadow Overlay to make text stand out */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[0.5px] z-10" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto max-w-[1440px] px-6 lg:px-20 w-full flex-1 flex flex-col justify-center py-16">
        {/* Breadcrumbs: Home › About */}
        <div className="flex items-center gap-2 text-[14px] text-white/60 mb-6 font-medium">
          <span>Home</span>
          <span className="text-white/40">›</span>
          <span className="text-white">About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Eyebrow & Heading (Left Side) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-4 rv-up">
            <h1 className="text-[36px] md:text-[48px] lg:text-[54px] font-semibold leading-[115%] tracking-[-0.04em] text-white">
              Small on purpose.
              <br />
              Accountable by design.
            </h1>
          </div>

          {/* Main Description Content (Center/Right Side) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left rv-up">
            <p className="text-[18px] md:text-[20px] leading-8 md:leading-9 text-neutral-200">
              Arambh means beginning. We exist so that a founder&apos;s beginning
              is done right: the structure, the filings, the funding, and a real
              person who stays on the line long after the certificates arrive.
            </p>
          </div>

        </div>
      </div>

      {/* Stats Bar at the bottom of Hero */}
      <div className="relative z-20 w-full border-t border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                className="flex flex-col justify-start px-4 md:px-8 py-10 md:py-12 relative"
              >
                <h2 
                  className="text-[40px] md:text-[52px] font-bold leading-none tracking-tight text-white"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {stat.value}
                </h2>

                <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-white/80">
                  {stat.label}
                </p>
                
                {/* Vertical line divider on desktop */}
                {index !== stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}