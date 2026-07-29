import Image from "next/image";
import { CTAData } from "./testimonials.types";

interface CTABoxProps {
  data: CTAData;
}

export default function CTABox({ data }: CTABoxProps) {
  return (
    <div className="w-full flex flex-col gap-4 rounded-2xl border border-[#E6E0D6] bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md text-left">
      {/* Top Row: Avatar and Text */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-xl bg-white border border-[#E6E0D6] flex-shrink-0 relative">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="text-[16px] font-bold text-black leading-snug">
            {data.title}
          </h4>
          <p className="text-[13px] text-[#666666] leading-relaxed mt-0.5">
            {data.description}
          </p>
        </div>
      </div>

      {/* Button: Full Width, Rounded Corners, Black Background */}
      <button
        className="
          w-full
          rounded-xl
          bg-black
          py-3
          text-[14px]
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-[#222222]
          cursor-pointer
          text-center
        "
      >
        {data.buttonText}
      </button>
    </div>
  );
}