"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center pt-4 px-4 bg-white/75 backdrop-blur-md transition-all">
      
    
      <nav
        className="
          flex 
          items-center 
          justify-between 
          border 
          border-[#E8E1D8] 
          bg-white 
          shadow-sm
        "
        style={{
          width: "930px",
          height: "60px",
          paddingTop: "10px",
          paddingRight: "16px",
          paddingBottom: "10px",
          paddingLeft: "16px",
          borderRadius: "16px",
        }}
      >
        <Link href="/" className="flex items-center gap-3 group">
          
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
            <span className="text-[13px] font-bold leading-tight tracking-[0.03em] text-[#1F1F1F] whitespace-nowrap">
              ARAMBH ADVISORY
            </span>
            <span className="text-[9px] font-semibold tracking-[0.08em] text-neutral-400 uppercase whitespace-nowrap mt-0.5">
              SERVICES LLP
            </span>
          </div>
          
        </Link>

        {/* Navigation Routes */}
        <div className="flex items-center gap-6">
          <Link href="/consulting-services" className="text-[14px] font-medium text-neutral-600 hover:text-black transition-colors">
            Consulting Services
          </Link>
          
          <button className="flex items-center gap-1 text-[14px] font-medium text-neutral-600 hover:text-black transition-colors">
            Resources
            <ChevronDown size={14} className="text-neutral-400" />
          </button>

          <Link href="/about" className="text-[14px] font-medium text-neutral-600 hover:text-black transition-colors">
            About
          </Link>
          
          <Link href="/contact" className="text-[14px] font-medium text-neutral-600 hover:text-black transition-colors">
            Contact
          </Link>
        </div>

        {/* Action Button */}
        <div>
          <Link 
            href="/schedule" 
            className="rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition shadow-sm inline-block"
          >
            Schedule a Call
          </Link>
        </div>

      </nav>
    </header>
  );
}