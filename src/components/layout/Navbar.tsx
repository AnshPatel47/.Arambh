"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScheduleCallModal } from "@/components/schedule-call/ScheduleCallContext";

export default function Navbar() {
  const { openModal } = useScheduleCallModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const navBackground = "#ffffff";

const primaryColor = "#1F1F1F";
const secondaryColor = "#666666";

const buttonBackground = "#131313";
const buttonColor = "#ffffff";
  return (

    <header
    className={`fixed top-0 left-0 right-0 z-[100] w-full flex justify-center transition-all duration-500 ${
  isScrolled ? "pt-0 px-0" : "pt-4 px-4"
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
          relative
        `}
     style={{
  maxWidth: isScrolled ? "100%" : "930px",
  height: "60px",

  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: isScrolled ? "2rem" : "16px",
  paddingRight: isScrolled ? "2rem" : "16px",

  borderRadius: isScrolled ? "0px" : "16px",

  backgroundColor: navBackground,

  backdropFilter: isScrolled ? "blur(18px)" : "none",
  WebkitBackdropFilter: isScrolled ? "blur(18px)" : "none",

  borderLeft: isScrolled ? "none" : "1px solid #E8E1D8",
  borderRight: isScrolled ? "none" : "1px solid #E8E1D8",
  borderTop: isScrolled ? "none" : "1px solid #E8E1D8",
  borderBottom: "1px solid " + (isScrolled ? "rgba(0,0,0,.06)" : "#E8E1D8"),

  boxShadow: isScrolled
    ? "0 8px 30px rgba(0,0,0,.08)"
    : "0 1px 2px rgba(0,0,0,.05)",
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
              className="text-[13px] font-bold leading-tight tracking-[0.03em] whitespace-nowrap"
style={{
  fontFamily: "'DM Sans', sans-serif",
  color: primaryColor,
}}
            >
              ARAMBH ADVISORY
            </span>
            <span
              className="text-[9px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap mt-0.5"
style={{
  fontFamily: "'DM Sans', sans-serif",
  color: secondaryColor,
}}
            >
              SERVICES LLP
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Link href="/services" className="text-[13px] font-medium transition-colors"
style={{
  color: secondaryColor,
}}>
            Consulting Services
          </Link>

          {/* Resources Dropdown */}
          <div className="relative group">
           <button
  className="flex items-center gap-1 text-[13px] font-medium transition-colors py-2"
  style={{
    color: secondaryColor,
  }}
>
              Resources
              <ChevronDown
  size={13}
  style={{ color: secondaryColor }}
  className="group-hover:rotate-180 transition-transform duration-200"
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

          <Link href="/about" className="text-[13px] font-medium transition-colors"
style={{
  color: secondaryColor,
}}>
            About
          </Link>

          <Link href="/contact" className="text-[13px] font-medium transition-colors"
style={{
  color: secondaryColor,
}}>
            Contact
          </Link>
        </div>

        <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="hidden lg:block shrink-0">
          <button
            onClick={openModal}
            className="rounded-full px-4 py-2 text-[11px] font-semibold transition shadow-sm inline-block cursor-pointer"
            style={{
              background: buttonBackground,
              color: buttonColor,
            }}
          >
            Schedule a Call
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-600 hover:text-black focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E8E1D8] rounded-2xl shadow-xl p-5 flex flex-col gap-4 lg:hidden z-[99]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="text-[14px] font-semibold text-[#1F1F1F] py-2 border-b border-neutral-100 hover:text-[#C2943A] transition-colors"
              >
                Consulting Services
              </Link>

              <div className="flex flex-col gap-2 py-1 border-b border-neutral-100">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Resources</span>
                <Link
                  href="/resources/blogs"
                  onClick={() => setIsOpen(false)}
                  className="text-[14px] font-medium text-[#666666] pl-3 py-1 hover:text-[#C2943A] transition-colors"
                >
                  Blog & Articles
                </Link>
                <Link
                  href="/resources/case_studies"
                  onClick={() => setIsOpen(false)}
                  className="text-[14px] font-medium text-[#666666] pl-3 py-1 hover:text-[#C2943A] transition-colors"
                >
                  Case Studies
                </Link>
              </div>

              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-[14px] font-semibold text-[#1F1F1F] py-2 border-b border-neutral-100 hover:text-[#C2943A] transition-colors"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-[14px] font-semibold text-[#1F1F1F] py-2 hover:text-[#C2943A] transition-colors"
              >
                Contact
              </Link>

              <button
                onClick={() => {
                  setIsOpen(false);
                  openModal();
                }}
                className="mt-2 w-full text-center rounded-xl py-3 text-[13px] font-bold transition shadow-md inline-block bg-[#131313] text-white cursor-pointer"
              >
                Schedule a Call
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </header>
  );
}