import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Service } from "./service.types";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  return (
    <div className="flex flex-col group cursor-pointer w-full flex-shrink-0">
      {/* Image Card */}
      <div
        className="
          relative
          w-full
          aspect-[4/3]
          rounded-[32px]
          overflow-hidden
          border
          border-[#E6DFD4]
          bg-[#FBF8F4]
          transition-all
          duration-500
          group-hover:-translate-y-1.5
          group-hover:shadow-2xl
        "
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Title Inside Card Bottom-Left */}
        <div className="absolute bottom-6 left-6 pr-16 text-left">
          <h3
            className="
              text-[18px]
              md:text-[22px]
              font-semibold
              leading-snug
              text-white
              transition-colors
              duration-300
              group-hover:text-[#B68A45]
            "
          >
            {service.title}
          </h3>
        </div>

        {/* Arrow Button overlaid on bottom right */}
        <div className="absolute bottom-6 right-6">
          <div
            className="
              w-9
              h-9
              rounded-full
              bg-white
              border
              border-[#DDD6CB]
              flex
              items-center
              justify-center
              text-[#131313]
              shadow-md
              transition-all
              duration-300
              group-hover:bg-white
              group-hover:text-black
              group-hover:-rotate-45
              active:-rotate-45
            "
          >
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}