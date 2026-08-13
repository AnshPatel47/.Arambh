import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function ServicesHeader() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-16 w-full mb-10 text-center lg:text-left">
      {/* LEFT COLUMN: Uses unified SectionHeader */}
      <div className="w-full lg:max-w-[550px]">
        <SectionHeader
          align="left"
          title={<>What we can do<br />for you</>}
        />
      </div>

      {/* RIGHT COLUMN: Description + CTA Button */}
      <div className="w-full lg:max-w-[460px] flex flex-col items-center lg:items-start">
        <p className="text-[15px] md:text-[16px] leading-relaxed font-medium text-[#666665]">
          Empowering businesses with expert guidance, strategic planning,
          government recognition, compliance support, and funding assistance —
          all under one roof.
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <Link
            href="/services"
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
          </Link>
        </div>
      </div>
    </div>
  );
}