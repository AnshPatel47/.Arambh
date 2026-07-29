"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Video, Globe, Calendar } from "lucide-react";
import { formatSelectedDate } from "./schedule.data";

interface ScheduleHeaderProps {
  selectedDate: Date | null;
  selectedTimeSlot: string | null;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number], delay },
});

export default function ScheduleHeader({ selectedDate, selectedTimeSlot }: ScheduleHeaderProps) {
  const timeZone = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Asia/Kolkata";

  return (
    <div className="flex flex-col text-left gap-6 p-6 md:p-8 text-neutral-200 border-r border-[#2A2925] h-full bg-[#131210] md:max-w-[340px] w-full shrink-0">
      {/* Brand Header */}
      <motion.div {...fadeUp(0.06)} className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 flex items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="Arambh Advisory Logo"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[12px] font-semibold text-neutral-400 tracking-wider uppercase">
            Arambh Advisory
          </span>
          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">
            Services LLP
          </span>
        </div>
      </motion.div>

      {/* Title & Description */}
      <motion.div {...fadeUp(0.14)} className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
          Quick Intro Call
        </h2>
        <p className="text-[13px] text-neutral-400 leading-relaxed font-normal">
          Let us know your startup or business requirements and ask any questions you have. We are here to help.
        </p>
      </motion.div>

      {/* Details List */}
      <motion.div {...fadeUp(0.22)} className="flex flex-col gap-3.5 pt-4">
        {/* Date and Time confirmation (only visible if selected) */}
        {selectedDate && selectedTimeSlot && (
          <div className="flex items-start gap-3 text-[13px] font-medium text-[#C2943A]">
            <Calendar size={16} className="mt-0.5 shrink-0" />
            <div className="flex flex-col leading-relaxed">
              <span>{formatSelectedDate(selectedDate)}</span>
              <span className="text-[12px] opacity-90 mt-0.5">{selectedTimeSlot} (30 mins)</span>
            </div>
          </div>
        )}

        {/* Duration */}
        <div className="flex items-center gap-3 text-[13px] font-medium text-neutral-300">
          <Clock size={16} className="text-neutral-500 shrink-0" />
          <span>30m</span>
        </div>

        {/* Meeting Type */}
        <div className="flex items-center gap-3 text-[13px] font-medium text-neutral-300">
          <Video size={16} className="text-neutral-500 shrink-0" />
          <span>Zoom Video Call</span>
        </div>

        {/* Timezone */}
        <div className="flex items-center gap-3 text-[13px] font-medium text-neutral-300">
          <Globe size={16} className="text-neutral-500 shrink-0" />
          <span className="truncate">{timeZone}</span>
        </div>
      </motion.div>
    </div>
  );
}
