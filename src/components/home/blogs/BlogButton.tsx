import { ArrowRight } from "lucide-react";

export default function BlogButton() {
  return (
    <div className="flex justify-center">
      <button
        className="
          inline-flex
          h-[40px]
          items-center
          gap-2
          rounded-xl
          border
          border-[#D9D9D9]
          bg-[#0000000D]
          px-4
          text-[14px]
          font-medium
          leading-[140%]
          text-[#131313]
          transition-colors
          duration-300
          hover:bg-[#00000014]
        "
      >
        Read All
        <ArrowRight size={16} />
      </button>
    </div>
  );
}