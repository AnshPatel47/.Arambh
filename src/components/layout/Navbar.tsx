"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-center transition-all duration-500 ease-in-out bg-white ${isScrolled
        ? "pt-0 backdrop-blur-md border-b border-neutral-200/60 shadow-sm"
        : "pt-4"
        }`}
    >

      <nav
        className={`
          flex 
          items-center 
          justify-between 
          transition-all 
          duration-500 
          ease-in-out
          w-full
        `}
        style={{
          maxWidth: isScrolled ? "100%" : "930px",
          height: "60px",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: isScrolled ? "2rem" : "16px",
          paddingRight: isScrolled ? "2rem" : "16px",
          borderRadius: isScrolled ? "0px" : "16px",
          backgroundColor: isScrolled ? "transparent" : "#ffffff",
          borderColor: isScrolled ? "transparent" : "#E8E1D8",
          borderWidth: isScrolled ? "0px" : "1px",
          boxShadow: isScrolled ? "none" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
      >

        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-[28px] w-[28px] shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Arambh Advisory Logo"
              width={28}
              height={28}
              className="object-contain h-full w-full"
            />
          </div>

          <div className="flex flex-col justify-center select-none" style={{ width: "150px" }}>
            <span
              className="text-[13px] font-bold leading-tight tracking-[0.03em] text-[#1F1F1F] whitespace-nowrap"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              ARAMBH ADVISORY
            </span>
            <span
              className="text-[9px] font-semibold tracking-[0.08em] text-neutral-400 uppercase whitespace-nowrap mt-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              SERVICES LLP
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Link href="/services" className="text-[13px] font-medium text-neutral-600 hover:text-black transition-colors">
            Consulting Services
          </Link>

          {/* Resources Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[13px] font-medium text-neutral-600 hover:text-black transition-colors py-2">
              Resources
              <ChevronDown
                size={13}
                className="text-neutral-400 group-hover:rotate-180 transition-transform duration-200"
              />
            </button>
            <div className="absolute left-0 mt-0 pt-2 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 bg-transparent z-50">
              <div className="bg-white border border-neutral-200/80 rounded-2xl shadow-xl p-2 w-[280px] flex flex-col gap-1">
                <Link
                  href="/resources/blogs"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group/item"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                    <Image
                      src="/assets/images/blog_hero.webp"
                      alt="Blog"
                      fill
                      sizes="40px"
                      className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-neutral-800 group-hover/item:text-black transition-colors">Blog & Articles</span>
                    <span className="text-[11px] text-neutral-400 font-medium">Industry news and updates</span>
                  </div>
                </Link>
                <Link
                  href="/resources/case_studies"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group/item"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                    <Image
                      src="/assets/images/case_studies_hero.webp"
                      alt="Case Studies"
                      fill
                      sizes="40px"
                      className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-neutral-800 group-hover/item:text-black transition-colors">Case Studies</span>
                    <span className="text-[11px] text-neutral-400 font-medium">Real outcomes for our clients</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/about" className="text-[13px] font-medium text-neutral-600 hover:text-black transition-colors">
            About
          </Link>

          <Link href="/contact" className="text-[13px] font-medium text-neutral-600 hover:text-black transition-colors">
            Contact
          </Link>
        </div>

        <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="shrink-0">
          <Link
            href="/schedule"
            className="rounded-full bg-black px-4 py-2 text-[11px] font-semibold text-white hover:bg-neutral-800 transition shadow-sm inline-block"
          >
            Schedule a Call
          </Link>
        </div>

      </nav>
    </header>
  );
}