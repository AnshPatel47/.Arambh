import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Service } from "./hero.types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className="
        relative
        flex
        h-full
        w-[520px]
        flex-col
        justify-between
        rounded-[12px]
        border
        border-black/10
        bg-[#F6F4F0]
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div>
        <div 
          className="
            flex 
            h-16 
            w-16 
            items-center 
            justify-center 
            rounded-[8px] 
            border 
            border-black/10 
            bg-white 
            p-2 
            shadow-sm
          "
        >
          <Image
            src={service.icon}
            alt={service.title}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-semibold leading-snug text-[#1F1F1F]">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-[#666666]">
          {service.description}
        </p>
      </div>

      <button
        className="
          absolute
          right-5
          top-5
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border
          border-black/10
          bg-white
          transition-colors
          hover:bg-neutral-50
        "
      >
        <ArrowUpRight size={14} className="text-neutral-700" />
      </button>
    </article>
  );
}