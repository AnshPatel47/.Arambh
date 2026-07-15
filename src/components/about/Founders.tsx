import { Phone } from "lucide-react";
import { founders } from "./about.data";

export default function Founders() {
  return (
    <section className="w-full bg-[#F6F4F0] py-24 reveal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header Column (Left Side) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left gap-3 rv-up">
            <div className="inline-flex items-center gap-2 bg-transparent px-0 py-2 w-fit">
              <span className="h-2 w-2 rounded-full bg-[#131313]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#333333]">
                THE PEOPLE
              </span>
            </div>

            <h2 className="mt-4 text-[32px] md:text-[40px] font-semibold leading-[115%] tracking-[-0.03em] text-[#131313]">
              Two founders.
              <br />
              One number you can
              <br />
              actually call.
            </h2>

            <p className="mt-4 text-[15px] md:text-[16px] leading-7 text-[#666666] max-w-sm">
              We intentionally stay small. It means you always know who is
              working on your business, who to call when something changes,
              and who is responsible when it matters.
            </p>
          </div>

          {/* Founder Cards (Center/Right Side) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 rv-up">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="flex flex-col justify-between rounded-[24px] border border-[#DDD6CA] bg-white p-7 text-left transition-all duration-300 hover:shadow-lg h-full"
              >
                <div>
                  {/* Avatar */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F6F4F0] text-lg font-semibold text-[#131313]">
                    {founder.initials}
                  </div>

                  {/* Name */}
                  <h3 className="mt-5 text-[22px] md:text-[24px] font-semibold text-[#131313]">
                    {founder.name}
                  </h3>

                  {/* Role */}
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.08em] text-[#8B7355]">
                    {founder.role}
                  </p>

                  {/* Description */}
                  <p className="mt-5 text-[15px] md:text-[16px] leading-7 text-[#666666]">
                    {founder.description}
                  </p>
                </div>

                {/* Phone */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDD6CA] bg-[#F6F4F0]">
                    <Phone size={16} />
                  </div>

                  <span className="text-[15px] font-medium text-[#131313]">
                    {founder.phone}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}