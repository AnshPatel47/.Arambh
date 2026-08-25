"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import BlogCard from "./BlogCard";
import BlogDetailModal, { BlogPost } from "@/components/blog&case_study/BlogDetail";

export default function BlogsList() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Fetch blogs from database
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to fetch homepage blogs:", err);
      }
    }
    fetchBlogs();
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [
      AutoScroll({
        speed: 1.2,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("init", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("init", onSelect);
    };
  }, [emblaApi]);

  let maskStyle = "none";
  if (canScrollPrev && canScrollNext)
    maskStyle = "linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)";
  else if (canScrollPrev)
    maskStyle = "linear-gradient(to right, transparent 0%, black 2.5%, black 100%)";
  else if (canScrollNext)
    maskStyle = "linear-gradient(to right, black 0%, black 97.5%, transparent 100%)";

  // Duplicate items for continuous auto-scroll loop
  const doubledBlogs = blogs.length > 0 ? [...blogs, ...blogs] : [];

  if (blogs.length === 0) return null;

  // Adapt selected blog structure to fit the BlogPost interface expected by BlogDetailModal
  const adaptedBlog: BlogPost | null = selectedBlog
    ? {
        id: String((selectedBlog as any).id || ""),
        title: (selectedBlog as any).title || "",
        category: (selectedBlog as any).category || "",
        excerpt: (selectedBlog as any).excerpt || (selectedBlog as any).description || "",
        content: (selectedBlog as any).content || (selectedBlog as any).excerpt || (selectedBlog as any).description || "",
        date: (selectedBlog as any).date || "",
        readTime: (selectedBlog as any).readTime || "5 min read",
        author: {
          name: typeof (selectedBlog as any).author === "object" ? (selectedBlog as any).author?.name : (selectedBlog as any).authorName || (selectedBlog as any).author || "Arambh Team",
          avatar: typeof (selectedBlog as any).author === "object" ? (selectedBlog as any).author?.avatar : (selectedBlog as any).authorAvatar || "",
          role: typeof (selectedBlog as any).author === "object" ? (selectedBlog as any).author?.role : (selectedBlog as any).authorRole || "Editorial Team",
        },
        image: (selectedBlog as any).image || "/assets/images/placeholder.jpg",
      }
    : null;

  return (
    <>
      {/* Fixed Layout Carousel Container */}
      <div
        className="w-full overflow-hidden py-4"
        style={{ maskImage: maskStyle, WebkitMaskImage: maskStyle }}
      >
        <div ref={emblaRef} className="overflow-hidden w-full">
          <div className="flex gap-6">
            {doubledBlogs.map((blog, index) => (
              <div
                key={`${blog.id}-${index}`}
                className="flex-[0_0_320px] sm:flex-[0_0_380px] min-w-0"
              >
                <BlogCard blog={blog} onSelect={(selected) => setSelectedBlog(selected)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shared Blog Detail Modal */}
      <BlogDetailModal
        post={adaptedBlog}
        onClose={() => setSelectedBlog(null)}
      />
    </>
  );
}