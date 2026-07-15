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
      className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-center transition-all duration-500 ease-in-out bg-white ${
        isScrolled 
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
          <Link href="/consulting-services" className="text-[13px] font-medium text-neutral-600 hover:text-black transition-colors">
            Consulting Services
          </Link>
          
          <button className="flex items-center gap-1 text-[13px] font-medium text-neutral-600 hover:text-black transition-colors">
            Resources
            <ChevronDown size={13} className="text-neutral-400" />
          </button>

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