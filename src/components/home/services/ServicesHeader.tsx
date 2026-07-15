import { ArrowRight, Wrench } from "lucide-react";

export default function ServicesHeader() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 w-full mb-10 text-left">
      {/* LEFT COLUMN: Tag + Heading */}
      <div className="w-full lg:max-w-[550px] flex flex-col items-start">
        {/* Our Services Tag */}
        <div className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#DDD5C9] bg-white px-3 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <Wrench size={13} className="text-[#333333]" />
          <span className="text-[12px] font-semibold text-[#333333] tracking-wide">
            Our services
          </span>
        </div>

        {/* Heading */}
        <h3 className="mt-4 text-[32px] md:text-[40px] lg:text-[46px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#131313]">
          What we can do
          <br />
          for you
        </h3>
      </div>

      {/* RIGHT COLUMN: Description + CTA Button */}
      <div className="w-full lg:max-w-[460px] flex flex-col items-start lg:pt-12">
        <p className="text-[15px] md:text-[16px] leading-relaxed font-medium text-[#666665]">
          Empowering businesses with expert guidance, strategic planning,
          government recognition, compliance support, and funding assistance —
          all under one roof.
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <button
            className="
              group
              flex
              items-center
              gap-4
              rounded-full
              border
              border-[#DDD5C9]
              bg-[#E6DFD4]
              px-6
              py-2.5
              shadow-[0_5px_15px_rgba(0,0,0,0.02)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]
              cursor-pointer
            "
          >
            <span className="text-[14px] font-semibold text-[#333333]">
              See our services
            </span>

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#222222]
                text-white
                transition-transform
                duration-300
                group-hover:-rotate-45
                active:-rotate-45
              "
            >
              <ArrowRight size={16} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}