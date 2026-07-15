import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FAQCTA() {
  return (
    <div
      className="
        w-[457px]
        h-[154px]
        rounded-2xl
        border
        border-[#DDD6CA]
        bg-white
        p-4
        flex
        flex-col
        justify-between
      "
    >
      {/* Top */}
      <div className="flex items-start gap-4">
        <Image
          src="/images/rahul.svg"
          alt="Rahul"
          width={56}
          height={56}
          className="rounded-xl object-cover"
        />

        <div className="flex-1">
          <h3 className="text-[18px] font-semibold leading-[140%] text-[#131313]">
            Book a 15 Min Call
          </h3>

          <p className="mt-1 text-[15px] leading-7 text-[#6B6B6B] font-medium ">
            If you have any questions, just book a 15-minute call with us
            before subscribing.
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        className="
          font-medium
          h-[44px]
          w-full
          rounded-full
          bg-[#131313]
          text-white
          text-[15px]
          flex
          items-center
          justify-center
          gap-2
          transition-all
          duration-300
          hover:bg-black
        "
      >
        Schedule a Call
        <ArrowRight size={18} />
      </button>
    </div>
  );
}