import Image from "next/image";
import { Blog } from "./blog.types";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="flex w-[280px] xs:w-[320px] sm:w-[362.67px] shrink-0 snap-start flex-col gap-3 sm:gap-4">
      {/* Image */}
      <div
        className="
          relative
          h-[160px]
          xs:h-[180px]
          sm:h-[198px]
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-[#D9D9D9]
          bg-[#0000000D]
        "
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3
          className="
            text-[18px]
            font-semibold
            leading-[140%]
            tracking-[-0.02em]
            text-[#131313]
          "
        >
          {blog.title}
        </h3>

        <p
          className="
            text-[16px]
            font-normal
            leading-[150%]
            text-[#666666]
          "
        >
          {blog.date}
          <span className="mx-2">•</span>
          {blog.category}
        </p>
      </div>
    </article>
  );
}