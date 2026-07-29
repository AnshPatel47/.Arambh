"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Search } from "lucide-react";
import { schemes } from "./hero.data"; 
import SchemeCard from "./SchemeCard";

const TAGS = ["NAIF", "Startup India", "Performance"];

export default function SchemesSlider() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const query = debouncedSearchQuery.toLowerCase().trim();

  const handleTagClick = (tag: string) => {
    const nextQuery = tag === searchQuery ? "" : tag;
    setSearchQuery(nextQuery);
    setDebouncedSearchQuery(nextQuery);
  };

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
  }, [emblaApi]);

  // Dynamically compute the gradient fade mask based on scroll capability
  let maskStyle = "none";
  if (canScrollPrev && canScrollNext) {
    maskStyle = "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)";
  } else if (canScrollPrev) {
    maskStyle = "linear-gradient(to right, transparent 0%, black 5%)";
  } else if (canScrollNext) {
    maskStyle = "linear-gradient(to right, black 95%, transparent 100%)";
  }

  // Which schemes match the current query?
  const isMatch = (s: (typeof schemes)[0]) => {
    if (!query) return true;
    return (
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query)
    );
  };

  return (
    <div
      className="flex h-full min-h-0 flex-col p-4 pt-4 md:p-6 md:pt-4 md:pl-8 lg:pr-0"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div>
        <h2
          className="text-[#1F1F1F] tracking-tight font-medium"
          style={{
            fontSize: "clamp(1.35rem, 2vw, 1.75rem)",
          }}
        >
          Govt. Schemes
        </h2>
        <p className="mt-2 text-[#666665] text-[15px]">
          Helping You Access the Right Government Opportunities
        </p>
      </div>

      {/* Search bar */}
      <div className="mt-5 w-full">
        <div
          className="relative flex w-full items-center rounded-2xl bg-white p-2 border border-[#E8E1D8]"
          style={{
            boxShadow: "0 6px 16px -4px rgba(0,0,0,0.07), inset 0 1px 0 #ffffff",
          }}
        >
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-4 py-2 text-sm text-[#1F1F1F] placeholder-neutral-400 outline-none font-normal"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#131313] text-white shadow-sm transition-all active:scale-95 hover:bg-[#222222]">
            <Search size={16} />
          </button>
        </div>

        {/* Filter chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`rounded-full border px-3.5 py-1 text-[11.5px] font-medium transition-all ${
                searchQuery === tag
                  ? "border-[#131313] bg-[#131313] text-white"
                  : "border-[#E0DAD2] bg-white text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Dynamic search context link */}
        {debouncedSearchQuery && (
          <div className="mt-4 w-full p-4 border border-[#E0DAD2] rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-between cursor-pointer hover:bg-white hover:shadow-sm transition-all group">
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#131313]">Explore {debouncedSearchQuery} Services</span>
              <span className="text-[12px] text-neutral-500 mt-0.5">Click to view all details and requirements.</span>
            </div>
            <span className="text-[#131313] text-lg font-light group-hover:translate-x-1 transition-transform">→</span>
          </div>
        )}
      </div>

      {/* Cards — duplicated 4× so Embla always has enough for infinite loop */}
      <div
        className="mt-5 w-full flex-1 overflow-hidden relative"
        style={{
          touchAction: "pan-y",
          maskImage: maskStyle,
          WebkitMaskImage: maskStyle,
        }}
      >
        <div className="embla h-full w-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex h-full flex-nowrap items-stretch ml-[-14px]">
            {/* Render copies so loop never runs out of slides, but only if not searching */}
            {(debouncedSearchQuery ? [0] : [0, 1, 2, 3]).flatMap((copyIdx) =>
              schemes.filter(isMatch).map((scheme) => (
                <div
                  className="embla__slide h-full shrink-0 min-w-0 pl-[14px] transition-opacity duration-300 flex-[0_0_254px] sm:flex-[0_0_294px]"
                  key={`copy-${copyIdx}-${scheme.id}`}
                >
                  <SchemeCard scheme={scheme} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}