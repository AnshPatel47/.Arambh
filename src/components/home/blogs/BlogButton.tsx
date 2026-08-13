import Link from "next/link";

export default function BlogButton() {
  return (
    <div className="flex justify-center">
      <Link
        href="/resources/blogs"
        style={{ fontFamily: "var(--font-dm), sans-serif" }}
        className="
          inline-flex
          h-[40px]
          w-[86px]
          items-center
          justify-center
          gap-[8px]
          rounded-[12px]
          border
          border-[#D9D9D9]
          bg-[#0000000D]
          pt-[10px]
          pb-[10px]
          pl-[16px]
          pr-[16px]
          text-[14px]
          font-semibold
          leading-[140%]
          text-[#131313]
          whitespace-nowrap
          transition-colors
          duration-300
          hover:bg-[#00000014]
          cursor-pointer
        "
      >
        Read All
      </Link>
    </div>
  );
}