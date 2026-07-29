import Image from "next/image";
import { values } from "./about.data";

export default function Values() {
  return (
    <section className="w-full bg-white pt-10 pb-10 lg:pt-16 lg:pb-16 reveal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 w-full">
        
        {/* WHAT WE BELIEVE Tag at the starting of section */}
        <div className="flex items-center gap-2 bg-transparent px-0 py-2 w-fit mb-6 mx-auto lg:mx-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C2943A]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#333333]">
            WHAT WE BELIEVE
          </span>
        </div>

        {/* Header Block: Heading on the left, Description on the right (with horizontal lines on top and bottom) */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left gap-8 lg:gap-16 py-12 border-t border-b border-[#E6DFD4]">
          <div className="flex-1">
            <h2 className="text-[36px] md:text-[48px] font-medium leading-[1.1] tracking-[-0.03em] text-[#131313]">
              An advisor owes you
              <br />
              more than filings.
            </h2>
          </div>
          <div className="flex-1 lg:max-w-[500px]">
            <p className="text-[15px] md:text-[16px] leading-relaxed text-[#666665] pt-2">
              These are the standards we hold ourselves to, and the reason founders stay with us long after the certificates arrive.
            </p>
          </div>
        </div>

        {/* Editorial Bento Grid (2-Column Equal Height Layout: Left = 01 + 03, Right = 02 + 04) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mt-10 md:mt-12 items-stretch">
          
          {/* Left Column: Card 01 (Fixed ~260px) + Card 03 (Flex-1) */}
          <div className="flex flex-col justify-between gap-4 lg:gap-5 w-full h-full">
            {/* Card 01: Horizontal Split (Fixed height 260px on desktop) */}
            <div className="flex flex-col sm:flex-row h-auto lg:h-[260px] shrink-0 rounded-[24px] bg-[#FAF8F5] overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="sm:w-[42%] relative min-h-[200px] sm:min-h-full bg-neutral-100 overflow-hidden">
                <Image
                  src={`/images/value_${values[0].number}.png`}
                  alt={values[0].title}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="sm:w-[58%] p-6 md:p-7 flex flex-col justify-center text-left">
                <div className="inline-flex items-center justify-center bg-[#C2943A]/10 text-[#C2943A] px-2.5 py-0.5 rounded text-[12px] font-mono font-bold w-fit mb-2.5">
                  {values[0].number}
                </div>
                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#131313] tracking-tight mb-2">
                  {values[0].title}
                </h3>
                <p className="text-[14px] md:text-[14.5px] leading-relaxed text-[#666666]">
                  {values[0].description}
                </p>
              </div>
            </div>

            {/* Card 03: Vertical Stack (Flex-1 fills remaining height) */}
            <div className="flex flex-col flex-1 h-full rounded-[24px] bg-[#FAF8F5] overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="w-full h-[250px] sm:h-[260px] lg:h-[270px] shrink-0 relative bg-neutral-100 overflow-hidden">
                <Image
                  src={`/images/value_${values[2].number}.png`}
                  alt={values[2].title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col justify-center flex-1 text-left">
                <div className="inline-flex items-center justify-center bg-[#C2943A]/10 text-[#C2943A] px-2.5 py-0.5 rounded text-[12px] font-mono font-bold w-fit mb-2.5">
                  {values[2].number}
                </div>
                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#131313] tracking-tight mb-2">
                  {values[2].title}
                </h3>
                <p className="text-[14px] md:text-[14.5px] leading-relaxed text-[#666666]">
                  {values[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Card 02 (Flex-1) + Card 04 (Fixed ~260px) */}
          <div className="flex flex-col justify-between gap-4 lg:gap-5 w-full h-full">
            {/* Card 02: Vertical Stack (Flex-1 fills remaining height) */}
            <div className="flex flex-col flex-1 h-full rounded-[24px] bg-[#FAF8F5] overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="w-full h-[250px] sm:h-[260px] lg:h-[270px] shrink-0 relative bg-neutral-100 overflow-hidden">
                <Image
                  src={`/images/value_${values[1].number}.png`}
                  alt={values[1].title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col justify-center flex-1 text-left">
                <div className="inline-flex items-center justify-center bg-[#C2943A]/10 text-[#C2943A] px-2.5 py-0.5 rounded text-[12px] font-mono font-bold w-fit mb-2.5">
                  {values[1].number}
                </div>
                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#131313] tracking-tight mb-2">
                  {values[1].title}
                </h3>
                <p className="text-[14px] md:text-[14.5px] leading-relaxed text-[#666666]">
                  {values[1].description}
                </p>
              </div>
            </div>

            {/* Card 04: Horizontal Split (Fixed height 260px on desktop - Aligned to bottom of Card 03) */}
            <div className="flex flex-col sm:flex-row h-auto lg:h-[260px] shrink-0 rounded-[24px] bg-[#FAF8F5] overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="sm:w-[42%] relative min-h-[200px] sm:min-h-full bg-neutral-100 overflow-hidden">
                <Image
                  src={`/images/value_${values[3].number}.png`}
                  alt={values[3].title}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 35vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="sm:w-[58%] p-6 md:p-7 flex flex-col justify-center text-left">
                <div className="inline-flex items-center justify-center bg-[#C2943A]/10 text-[#C2943A] px-2.5 py-0.5 rounded text-[12px] font-mono font-bold w-fit mb-2.5">
                  {values[3].number}
                </div>
                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#131313] tracking-tight mb-2">
                  {values[3].title}
                </h3>
                <p className="text-[14px] md:text-[14.5px] leading-relaxed text-[#666666]">
                  {values[3].description}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}