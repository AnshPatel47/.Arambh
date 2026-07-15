import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Scheme } from "./hero.types"; // Make sure this path is correct for your types

interface SchemeCardProps {
  scheme: Scheme;
}

export default function SchemeCard({ scheme }: SchemeCardProps) {
  // Safety fallback to prevent crashes if data is missing
  if (!scheme) return null;

  return (
    <article
      className="relative flex h-[340px] w-[280px] flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Amount badge — top left */}
      <div
        className="absolute left-3 top-3 z-10 flex items-center rounded-full px-2.5 py-[5px]"
        style={{ backgroundColor: scheme.bgColor }}
      >
        <span className="text-[9px] font-medium uppercase tracking-wider text-[#333333]">
          {scheme.amount}
        </span>
      </div>

      {/* Arrow button — top right */}
      <button
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors hover:bg-neutral-50"
        style={{ border: "1px solid rgba(0,0,0,0.10)" }}
      >
        <ArrowUpRight size={14} className="text-neutral-500" />
      </button>

      {/* Colored image area - dynamically uses the color from hero.data.ts */}
      <div
        className="relative flex h-[160px] w-full items-center justify-center"
        style={{ background: scheme.bgColor }}
      >
        <Image
          src={scheme.icon}
          alt={scheme.title}
          width={110}
          height={110}
          className="h-[90px] w-[90px] object-contain"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col p-4 flex-1">
        <h3 className="text-[14.5px] font-semibold leading-snug text-[#131313] line-clamp-2">
          {scheme.title}
        </h3>
        <p className="mt-2 text-[12.5px] font-normal leading-relaxed text-[#666666] line-clamp-3">
          {scheme.description}
        </p>
      </div>
    </article>
  );
}