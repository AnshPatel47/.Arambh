"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll"; 
import { Search } from "lucide-react"; 
import { services } from "@/constants/hero";
import ServiceCard from "./ServiceCard";

export default function ServicesSlider() {
  const [searchQuery, setSearchQuery] = useState("");
  
 
  const tags = ["Bookkeeper", "Tax Preparer", "Security", "Process"];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (autoScroll && !autoScroll.isPlaying()) {
      autoScroll.play();
    }
  }, [emblaApi]);


  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full min-h-0 flex-col rounded-[32px] border border-[#E8E1D8] bg-white p-8 md:p-10">
      
      {/* Header Info */}
      <div>
<div 
  className="inline-flex items-center gap-2 rounded-full bg-[#F6F4F0] px-4 py-0 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-600 shadow-sm border border-[#E8E1D8]"
  style={{
    height: "29px",
    fontFamily: "'DM Sans', sans-serif",
  }}
>
  <span className="h-2 w-2 rounded-full bg-[#333333]" />
  Services
</div>

        <h2 className="mt-3 text-xl font-semibold leading-snug text-[#1F1F1F]">
          Everything Your Business Needs Under One Roof
        </h2>
      </div>

  
<div className="mt-5 w-full">
  <div 
    className="
      relative 
      flex 
      w-full 
      items-center 
      rounded-2xl 
      bg-[#F4F2EE] 
      p-2 
      /* The 3D Trick: Stronger top inset shadow + light bottom border highlight */
      shadow-[inset_0_4px_6px_rgba(0,0,0,0.12),inset_0_1px_3px_rgba(0,0,0,0.2)] 
      border-t border-black/10
      border-b border-white
    "
  >
    <input
      type="text"
      placeholder="e.g. bookkeeper, tax preparer, compliance..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full bg-transparent px-4 py-2.5 text-sm text-[#090909] placeholder-neutral-400 outline-none"
    />
    
   
    <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#43413c] text-white shadow-md transition-transform active:scale-95 hover:bg-[#0b0b0b]">
      <Search size={18} />
    </button>
  </div>

 
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag === searchQuery ? "" : tag)}
              className={`rounded-full border px-4 py-1 text-xs font-medium transition-colors ${
                searchQuery === tag
                  ? "border-[#0F4C3A] bg-[#0F4C3A]/10 text-[#0F4C3A]"
                  : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* For Embla Slider */}
<div className="mt-6 w-full h-[280px]" style={{ touchAction: "pan-y" }}>
  <div className="embla h-full w-full overflow-hidden" ref={emblaRef}>
    <div className="embla__container flex h-full flex-nowrap items-stretch ml-[-24px]">
      {(filteredServices.length > 0 ? filteredServices : services).map((service) => (
        <div
          className="embla__slide h-full shrink-0 min-w-0 pl-6"
          key={service.id}
          style={{ flex: "0 0 544px" }}
        >
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  </div>
</div>

    </div>
  );
}