import Image from "next/image";
import { founders } from "./about.data";

export default function Founders() {
  return (
    <section className="w-full bg-white pt-20 pb-10 lg:pt-32 lg:pb-16 reveal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header Column (Left Side) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-3 rv-up">
            <div className="flex items-center gap-2 bg-transparent px-0 py-2 w-fit mb-6 mx-auto lg:mx-0">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C2943A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#333333]">
                THE PEOPLE
              </span>
            </div>

            <h2 className="mt-4 text-[32px] md:text-[40px] font-semibold leading-[115%] tracking-[-0.03em] text-[#131313]">
              Two founders.
            </h2>

            <p className="mt-4 text-[15px] md:text-[16px] leading-7 text-[#666666] max-w-sm mx-auto lg:mx-0">
              Most founders don&apos;t fail at the idea — they get worn down by paperwork and consultants who vanish. We built Arambh to be the opposite: direct founder access, clear fees up front, and deadlines we actually keep.
            </p>
          </div>

          {/* Founder Cards */}
          <div className="lg:col-span-8 rounded-[24px] border border-[#DDD6CA] bg-white overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#DDD6CA] rv-up">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="flex flex-col h-[460px] md:h-[480px] bg-white"
              >
                {/* Top 80% Image */}
                <div className="relative w-full h-[80%] overflow-hidden bg-neutral-100">
                  <Image
                    src={founder.image || "/images/founders.jpeg"}
                    alt={founder.name}
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </div>

                {/* Bottom 20% Details */}
                <div className="w-full h-[20%] flex flex-col justify-center items-start px-6 bg-white">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#C2943A]">
                    {founder.role}
                  </p>
                  <h3 className="mt-1 text-[20px] md:text-[22px] font-normal text-[#131313] leading-tight ">
                    {founder.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}