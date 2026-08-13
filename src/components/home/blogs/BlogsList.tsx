"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import BlogCard from "./BlogCard";
import { blogs } from "./blog.data";

export default function BlogsList() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
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

  if (canScrollPrev && canScrollNext) {
    maskStyle =
      "linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)";
  } else if (canScrollPrev) {
    maskStyle =
      "linear-gradient(to right, transparent 0%, black 2.5%, black 100%)";
  } else if (canScrollNext) {
    maskStyle =
      "linear-gradient(to right, black 0%, black 97.5%, transparent 100%)";
  }

  // Duplicate cards so there is always enough content for
  // continuous auto-scrolling on desktop and mobile.
  const doubledBlogs = [...blogs, ...blogs];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage: maskStyle,
        WebkitMaskImage: maskStyle,
      }}
    >
      <div
        ref={emblaRef}
        className="overflow-hidden w-full"
        style={{
          touchAction: "pan-y",
        }}
      >
      <div className="flex flex-nowrap">
  {doubledBlogs.map((blog, index) => (
    <div
      key={`${blog.id}-${index}`}
      className="shrink-0 min-w-0 pr-6"
    >
      <BlogCard blog={blog} />
    </div>
  ))}
</div>
      </div>
    </div>
  );
}