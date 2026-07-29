"use client";

import Image from "next/image";
import { useScheduleCallModal } from "@/components/schedule-call/ScheduleCallContext";

export default function FAQCTA() {
  const { openModal } = useScheduleCallModal();
  return (
    <div
      className="
        w-full
        max-w-[457px]
        h-auto
        min-h-[135px]
        sm:min-h-[154px]
        lg:h-[154px]
        rounded-2xl
        border
        border-[#E6E0D6]
        bg-white
        p-4
        flex
        flex-col
        justify-between
        gap-3
        sm:gap-4
        lg:gap-0
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
      "
    >
      {/* Top Row: Avatar and Text */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-xl bg-white border border-[#E6E0D6] flex-shrink-0 relative">
          <Image
            src="/images/rahul.svg"
            alt="Rahul"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center text-left">
          <h4 className="text-[16px] font-bold text-black leading-snug">
            Grow your business like above
          </h4>
          <p className="text-[13px] text-[#666666] leading-relaxed mt-0.5">
            If you have any questions, just book a 15-minute call with us before subscribing.
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={openModal}
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
        Schedule a Call
      </button>
    </div>
  );
}