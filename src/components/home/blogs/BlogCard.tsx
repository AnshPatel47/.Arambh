"use client";

import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  blog: any;
  onSelect?: (blog: any) => void;
}

export default function BlogCard({ blog, onSelect }: BlogCardProps) {
  const authorName = blog.authorName || blog.author?.name || "Arambh Editorial Team";
  const authorAvatar =
    blog.authorAvatar ||
    blog.author?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80";
  const readTime = blog.readTime || "5 min read";
  const excerpt =
    blog.excerpt ||
    blog.description ||
    "A complete walkthrough of corporate compliance, funding, and strategic growth.";

  return (
    <article
      onClick={() => onSelect?.(blog)}
      className="w-full h-full bg-white border border-zinc-200 rounded-[18px] overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div>
        <div className="relative w-full aspect-[16/9.5] overflow-hidden bg-zinc-100">
          <Image
            src={blog.image || "/assets/images/placeholder.jpg"}
            alt={blog.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block text-[12px] font-semibold px-3 py-1 rounded-full bg-[#F2E6CE] text-[#91671B]">
              {blog.category}
            </span>
            <span className="text-[12px] text-zinc-400 font-medium">
              {blog.date}
            </span>
          </div>

          <h3 className="text-base font-bold text-zinc-900 leading-snug mb-2 line-clamp-2">
            {blog.title}
          </h3>

          <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 font-normal mb-2">
            {excerpt}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-300">
            <Image
              src={authorAvatar}
              alt={authorName}
              fill
              className="object-cover"
              sizes="24px"
            />
          </div>
          <p className="text-[11px] font-semibold text-zinc-800">
            {authorName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-400" /> {readTime}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(blog);
            }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold border border-[#BD8E32] text-[#BD8E32] hover:bg-[#BD8E32] hover:text-white transition-all duration-200 cursor-pointer"
          >
            Read <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
}