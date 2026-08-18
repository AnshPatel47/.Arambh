"use client";

import React ,{useState} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo1 from "../../../public/assets/images/logo1.png";
import Link from "next/link";

interface DynamicServiceLinkProps {
  slug: string;
  title: string;
}

const PAGE_BACKGROUND_MAP: Record<string, string> = {
  "/": "#FBF7EE",         // Home page bottom color
  "/about": "#F8F4EC",    // About page bottom color
  "/services": "#ffffff", // Services page bottom color
  "/contact": "#ffffff",  // Contact page bottom color
  "/resources/blogs": "#ffffff",// Resources page bottom color
  "/resources/case_studies": "#ffffff"   // Resources page bottom color
};


export default function Footer() {
<<<<<<< HEAD
  const pathname = usePathname();
    const [email, setEmail] = useState("");
=======
  const [email, setEmail] = useState("");
>>>>>>> 39494f8 (new changes)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const topBgColor = PAGE_BACKGROUND_MAP[pathname] || "#ffffff"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/footer-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setStatusMessage({
          type: "success",
          text: "Thank you! We've received your request.",
        });
        setEmail("");
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "Network error. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-transparent pt-0 text-zinc-300 font-sans relative z-50 overflow-hidden">
      
   {/* ── DYNAMIC CONTAINER MATCHING PREVIOUS SECTION ── */}
<div 
  style={{ backgroundColor: topBgColor }} 
  className="w-full transition-colors duration-300 pt-6 pb-12"
>

        {/* ── BOLD & PREMIUM GOLD CARD ── */}
        <div className="w-[96%] sm:w-[96%] max-w-[1280px] mx-auto relative z-20 mt-0 md:-mt-0 mb-10 bg-gradient-to-b from-[#120E07] via-[#764A04] to-[#DC8800] py-10 px-5 sm:px-8 md:px-12 rounded-2xl overflow-hidden shadow-xl">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-12">

            {/* Left Side: Heading text */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h4 className="text-xl md:text-3xl font-DM sans font-semibold text-white mt-1 md:mt-2 mb-2 tracking-tight">
                Stay Connected With Us
              </h4>
              <p className="font-DM sans text-white/90 text-sm md:text-lg mb-6 md:mb-8 font-normal leading-relaxed">
                Subscribe or reach out to our advisory team directly.
              </p>
            </div> 

            {/* Right Side: Input Field + Button Group */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center gap-3">
               <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col sm:flex-row items-center justify-center gap-3"
               >
              <div className="w-full sm:w-64 lg:w-72 shadow-md rounded-lg sm:rounded-full overflow-hidden shrink-0">
                <input
                 type="email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 placeholder="Enter your email address"
                 disabled = {isSubmitting}
                 className="w-full bg-white text-zinc-900 rounded-full sm:rounded-full px-7 py-3 text-sm font-DM sans placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#120E07] transition-all appearance-none"
                 />      
              </div> 
              <button 
                type="submit"
                disabled ={isSubmitting}
                className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#120E07] hover:bg-black text-white font-semibold text-sm font-DM sans transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer shrink-0"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <a
                href="tel:+918866556327"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#120E07] hover:bg-black text-white font-semibold text-sm font-DM sans transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#C2943A]">
                 <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                Call Now
              </a>
            </form>

              {/* Status Message Display */}
              {statusMessage && (
                <span
                  className={`text-xs font-DM sans text-center md:text-right mt-1 ${
                    statusMessage.type === "success"
                      ? "text-green-300 font-medium"
                      : "text-red-300 font-medium"
                  }`}
                >
                  {statusMessage.text}
                </span>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* Dark Footer Container */}
      <div className="w-full bg-gradient-to-b from-[#120E07] via-[#764A04] to-[#DC8800] relative z-10">

        {/* ── MAIN FOOTER CONTENT WRAPPER ── */}
        <div className="max-w-[1440px] mx-auto w-full relative z-10">

          {/* UPPER PART */}
          <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row justify-between pt-[40px] px-8 lg:px-0 pb-[16px] gap-12 lg:gap-0">

            {/* Col 1: Arambh Advisory Logo & Description */}
            <div className="flex flex-col gap-6 w-full lg:w-[368px] text-left text-base">
              <div className="flex items-center gap-3">
                <div className="text-white flex items-center">
                  <img
                    src="/assets/images/Vector.png"
                    alt="Arambh Advisory Logo"
                    className="w-auto h-8 object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white tracking-wide">ARAMBH ADVISORY</span>
                  <span className="text-[10px] text-zinc-400 font-semibold tracking-widest mt-0.5">SERVICES LLP</span>
                </div>
              </div>
              <p className="font-DM sans text-[14px] text-zinc-400 leading-relaxed">
                Arambh Advisory helps startups and MSMEs turn ideas into successful businesses. From company registration and government recognition to funding support and compliance.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/aramabh-services-llp/posts/?feedView=all" 
                  target="_blank"
                  className="text-zinc-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" 
                  /></svg>
                </a>
                  <a
                    href="https://www.instagram.com/arambh_services?igsh=MW1iYjQ2cTVkM2Riag%3D%3D&igsi=MW1iYjQ2cTVkM2Riag%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label="Instagram"
                   >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
              </div>
            </div>

            {/* Col 2 & 3: Quick Links & Services */}
            <div className="flex flex-row gap-4 sm:gap-6 lg:gap-[48px] w-full max-w-[386px] text-left text-base">
              <div className="flex flex-col gap-5 w-1/2">
                <h3 className="text-DM sans text-[12px] font-bold uppercase tracking-widest text-zinc-400">Quick Links</h3>
                <ul className="flex flex-col gap-3 text-DM sans text-[14px] font-medium text-zinc-300">
                  <li><a href="/about" className="hover:text-amber-400 transition-colors">About Us</a></li>
                  <li><a href="/" className="hover:text-amber-400 transition-colors">Government Schemes</a></li>
                  <li><a href="/resources/blogs" className="hover:text-amber-400 transition-colors">Blog</a></li>
                  <li><a href="/" className="hover:text-amber-400 transition-colors">FAQs</a></li>
                  <li><a href="/contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="flex flex-col gap-5 w-1/2 ">
                <h3 className="text-DM sans text-[12px] font-bold uppercase tracking-widest text-zinc-400">Services</h3>
                <ul className="flex flex-col gap-3 text-DM sans text-[14px] font-medium text-zinc-300">
                  <li><a href="/services/business-registration" className="hover:text-amber-400 transition-colors">Startup Registration</a></li>
                  <li><a href="/services/dpiit-recognition" className="hover:text-amber-400 transition-colors">DPIIT Recognition</a></li>
                  <li><a href="/services/msme-registration" className="hover:text-amber-400 transition-colors">MSME Registration</a></li>
                  <li><a href="/services/government-funding" className="hover:text-amber-400 transition-colors">Government Funding Support</a></li>
                  <li><a href="/services/business-consulting" className="hover:text-amber-400 transition-colors">Business Consulting</a></li>
                  <li><a href="/services/compliance-regulatory-support" className="hover:text-amber-400 transition-colors">Compliance & Advisory</a></li>
                </ul>
              </div>
            </div>

            {/* Col 4: Reach Out */}
          <div className="flex flex-col gap-[20px] w-full lg:w-[236px] text-left text-base">
            <h3 className="text-DM sans text-[12px] font-bold uppercase tracking-widest text-zinc-400">Reach Out</h3>
            <div className="flex flex-col gap-4 text-DM sans">
               <a
                 href="tel:+918866556327"
                 className="flex items-center gap-4 text-[14px] cursor-pointer hover:opacity-80 transition-opacity"
                 >
                 <span className="text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622c0-1.037.828-1.84 1.854-1.84h4.863c.383 0 .733.204.918.54l1.58 2.87c.156.284.06.634-.216.812l-1.393.904a11.026 11.026 0 0 0 3.902 3.902l.904-1.393c.178-.276.528-.372.812-.216l2.87 1.58c.336.185.54.535.54.918v4.863c0 1.026-.803 1.854-1.84 1.854a15.42 15.42 0 0 1-15.42-15.42Z" />
                 </svg>
                 </span>
                 <span className="font-medium text-white hover:text-[#BD8E32] transition-colors">
                 +91 88665 56327
                 </span>
                 </a>
                 <a href="mailto:contact@arambhadvisory.com"
                    className="flex items-center gap-4 text-[14px] cursor-pointer hover:opacity-80 transition-opacity"
                   >
                   <span className="text-white">
                    <svg 
                     xmlns="http://www.w3.org/2000/svg" 
                     fill="none" 
                     viewBox="0 0 24 24" 
                     strokeWidth={1.5} 
                     stroke="currentColor" 
                     className="w-5 h-5"
                     >
                     <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" 
                     />
                   </svg>
                   </span>
                    <span className="font-medium text-white hover:text-[#BD8E32] transition-colors whitespace-normal break-all lg:break-normal">
                        @arambhadvisory.com
                    </span>
                  </a>   
                   <a
                     href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Ahmedabad, Gujarat, India")}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-start gap-4 text-[14px] group cursor-pointer"
                    >
                      <span className="text-white mt-0.5 group-hover:text-[#BD8E32] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                         </svg>
                      </span>
                       <div className="flex flex-col font-sans">
                           <span className="font-medium text-white group-hover:text-[#BD8E32] transition-colors">
                           Ahmedabad, Gujarat, India
                           </span>
                           <span className="text-white/80 text-[12px] mt-0.5">
                            Mon – Sat, 9:30 AM – 6:30 PM
                          </span>
                       </div>
                 </a>                 
            </div>
           </div>
          </div>
          {/* BOTTOM PART (Parent container MUST have overflow-hidden & relative) */}
          <div className="relative px-8 lg:px-0 pt-12 pb-10 w-full max-w-[1280px] mx-auto min-h-[340px] overflow-hidden">

            {/* CTA Content */}
            <div className="flex flex-col w-full lg:w-[477px] relative z-20 text-left">
              <h2 className="text-[36px] sm:text-[42px] font-semibold font-DM sans tracking-tight leading-tight text-white mb-4">
                Ready to give your business a strong start?
              </h2>
              <p className="text-white/80 text-DM sans sm:text-[15px] font-sans leading-relaxed mb-8">
                Book a free 30-minute call. We give you honest advice on what your business actually needs, with no commitments.
              </p>
              <div>
                <a
                  href="tel:+918866556327"
                  // className="px-[clamp(16px,2vw,36px)] py-[clamp(8px,1vw,12px)]"
                  className="py-[clamp(8px,1vw,12px)] px-[clamp(16px,2vw,28px)] break-words rounded-lg font-DM sans bg-white/20 text-white font-medium backdrop-blur-sm shadow-[0px_0px_10px_0px_#FFFFFF90_inset,0px_0px_4px_0px_#FFFFFF90] inline-block hover:bg-white/30 transition-all"
                > 
                  Schedule a Call
                </a>
              </div>            
            </div>

            {/* Copyright Line */}
            <div className="mt-6 sm:mt-10 relative z-20 text-left max-w-[65%] sm:max-w-none">
              <span className="text-DM sans text-[12px] text-white/60 block">
                © 2026 Arambh Advisory. All rights reserved.
              </span>
            </div>

            {/* Flush Corner Logo Background */}
            <div className="absolute right-0 bottom-0 pointer-events-none select-none z-10 leading-none">
              <Image
                src={logo1}
                alt="Arambh Advisory Logo Background"
                className="w-[180px] sm:w-[220px] lg:w-[280px] h-auto object-contain object-bottom opacity-70 lg:opacity-80 block"
              />      
            </div>                                                  
          </div>          
        </div>
      </div>
    </footer>
  );
}