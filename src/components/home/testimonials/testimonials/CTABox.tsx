import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CTAData } from "./testimonials.types";

interface CTABoxProps {
  data: CTAData;
}

export default function CTABox({ data }: CTABoxProps) {
  return (
    <div className="w-full h-[100px] flex items-center justify-between rounded-[22px] border border-[#E6E0D6] bg-[#F6F4F0] p-3 px-6 shadow-sm transition-all duration-300 hover:shadow-md text-left">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-[14px] bg-white border border-[#E6E0D6] flex-shrink-0 relative">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[14px] font-bold text-[#111111] leading-tight">
            {data.title}
          </span>
          <span className="text-[10px] font-bold text-[#B68A45] tracking-wider uppercase mt-1">
            Book a 15-Min Call
          </span>
        </div>
      </div>

      <button
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-black
          px-5
          py-2.5
          text-[13px]
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-[#222222]
          cursor-pointer
          shrink-0
        "
      >
        {data.buttonText}
        <ArrowRight size={14} />
      </button>
    </div>
  );
}