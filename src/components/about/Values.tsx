import Image from "next/image";
import { values } from "./about.data";

export default function Values() {
  return (
    <section className="w-full bg-white py-20 reveal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 w-full">
        
        {/* WHAT WE BELIEVE Tag at the starting of section */}
        <div className="flex items-center gap-2 bg-transparent px-0 py-2 w-fit mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B68A45]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#333333]">
            WHAT WE BELIEVE
          </span>
        </div>

        {/* Header Block: Heading on the left, Description on the right (with horizontal lines on top and bottom) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 py-12 border-t border-b border-[#E6DFD4]">
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

        {/* 4 Alternating Grid Rows with horizontal dividers only */}
        <div className="flex flex-col">
          {values.map((value, index) => {
            const isTextLeft = index % 2 === 0; // 01 and 03 are text left, 02 and 04 are text right

            return (
              <div key={value.number} className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-16 items-center w-full">
                  {isTextLeft ? (
                    <>
                      {/* Left Column: Text */}
                      <div className="lg:col-span-6 flex flex-col justify-center text-left">
                        <div className="flex items-baseline gap-3.5 mb-4">
                          <span className="text-[18px] md:text-[20px] font-bold text-[#B68A45] tracking-tight font-mono">
                            {value.number}
                          </span>
                          <h3 className="text-[22px] md:text-[26px] font-semibold text-[#131313] tracking-tight">
                            {value.title}
                          </h3>
                        </div>
                        <p className="text-[15px] md:text-[16px] leading-8 text-[#666666]">
                          {value.description}
                        </p>
                      </div>

                      {/* Right Column: Smaller, Centered, Rounded Image */}
                      <div className="lg:col-span-6 flex items-center justify-center w-full">
                        <div className="relative w-full max-w-[480px] h-[300px] rounded-[24px] overflow-hidden shadow-md">
                          <Image
                            src={`/images/value_${value.number}.png`}
                            alt={value.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 480px"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left Column: Smaller, Centered, Rounded Image */}
                      <div className="lg:col-span-6 flex items-center justify-center w-full">
                        <div className="relative w-full max-w-[480px] h-[300px] rounded-[24px] overflow-hidden shadow-md">
                          <Image
                            src={`/images/value_${value.number}.png`}
                            alt={value.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 480px"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* Right Column: Text */}
                      <div className="lg:col-span-6 flex flex-col justify-center text-left">
                        <div className="flex items-baseline gap-3.5 mb-4">
                          <span className="text-[18px] md:text-[20px] font-bold text-[#B68A45] tracking-tight font-mono">
                            {value.number}
                          </span>
                          <h3 className="text-[22px] md:text-[26px] font-semibold text-[#131313] tracking-tight">
                            {value.title}
                          </h3>
                        </div>
                        <p className="text-[15px] md:text-[16px] leading-8 text-[#666666]">
                          {value.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Horizontal divider line between rows, but not after the last one */}
                {index < values.length - 1 && (
                  <div className="w-full h-px bg-[#E6DFD4]" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}