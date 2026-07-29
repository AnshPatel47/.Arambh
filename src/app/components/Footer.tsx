"use client";

import React from "react";
import Image from "next/image";
import logo1 from "../../../public/assets/images/logo1.png";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent pt-0 text-zinc-300 font-sans relative z-50">
      
      {/* Dark Footer Container */}
      <div className="w-full bg-gradient-to-b from-[#120E07] via-[#764A04] to-[#DC8800] relative z-10">

        {/* ── BOLD & PREMIUM GOLD OVERLAPPING BOX ── */}
        <section className="w-full bg-white text-zinc-900 pt-8 sm:pt-12 pb-20 sm:pb-32 md:pb-20 relative z-0"></section>
        <div className="sm:w-[96%] max-w-9xl mx-auto relative z-20 -mt-64 md:-mt-56 mb-8 bg-gradient-to-r from-[#C2943A] to-[#72561d] py-6 px-5 sm:px-8 md:px-10 rounded-2xl ">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Left Side: Heading text */}
             <div className="w-full md:w-1/2 text-center md:text-left">
              <h4 className="text-xl md:text-3xl text-DM sans font-bold text-white mt-5 mb-3 tracking-tight">
                Stay Connected With Us
              </h4>
              <p className="font-DM sans text-white/90 md:text-lg mb-8 font-normal leading-relaxed">
                Subscribe or reach out to our advisory team directly.
              </p>
            </div> 

            {/* Right Side: Input Field + Button Group */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="w-full sm:w-72 shadow-md rounded-full overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-white text-zinc-900 rounded-lg px-5 py-3.5 text-DM sans placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#120E07] transition-all"
                />         
              </div> 
               <button type ="submit"
                className="w-full sm:w-auto text-center px-7 py-3 rounded-full bg-[#120E07] hover:bg-black text-white font-semibold text-DM sans transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"> Submit
                </button>
              <a
                href="tel:+918866556327"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#120E07] hover:bg-black text-white font-semibold text-DM sans transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#C2943A]">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                Call Now
              </a>
              
            </div>
          </div>
        </div>  
        {/* ── MAIN FOOTER CONTENT WRAPPER ── */}
        <div className="max-w-[1440px] mx-auto w-full relative z-10">

          {/* UPPER PART: Top Section based on Figma sizing */}
          <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row justify-between pt-[40px] px-8 lg:px-0 pb-[16px] gap-12 lg:gap-0">

            {/* Col 1: Arambh Advisory Logo & Description (Width: 368px) */}
            <div className="flex flex-col gap-6 w-full lg:w-[368px] text-left">
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
              <p className="text-DM sans text-[15px] text-zinc-400 leading-relaxed">
                Arambh Advisory helps startups and MSMEs turn ideas into successful businesses. From company registration and government recognition to funding support and compliance.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="X / Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>

            {/* Col 2 & 3: Quick Links & Services (Width: 386px total, gap: 48px) */}
            <div className="flex flex-row gap-[48px] w-full lg:w-[386px] text-left">
              <div className="flex flex-col gap-5 w-1/2">
                <h3 className="text-DM sans text-[12px] font-bold uppercase tracking-widest text-zinc-400">Quick Links</h3>
                <ul className="flex flex-col gap-3 text-DM sans text-[14px] font-medium text-zinc-300">
                  <li><a href="/about" className="hover:text-amber-400 transition-colors">About Us</a></li>
                  <li><a href="/schemes" className="hover:text-amber-400 transition-colors">Government Schemes</a></li>
                  <li><a href="/blog" className="hover:text-amber-400 transition-colors">Blog</a></li>
                  <li><a href="/faqs" className="hover:text-amber-400 transition-colors">FAQs</a></li>
                  <li><a href="/contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="flex flex-col gap-5 w-1/2">
                <h3 className="text-DM sans text-[12px] font-bold uppercase tracking-widest text-zinc-400">Services</h3>
                <ul className="flex flex-col gap-3 text-DM sans text-[14px] font-medium text-zinc-300 whitespace-nowrap">
                  <li><a href="/services/startup" className="hover:text-amber-400 transition-colors">Startup Registration</a></li>
                  <li><a href="/services/dpiit" className="hover:text-amber-400 transition-colors">DPIIT Recognition</a></li>
                  <li><a href="/services/msme" className="hover:text-amber-400 transition-colors">MSME Registration</a></li>
                  <li><a href="/services/funding" className="hover:text-amber-400 transition-colors">Government Funding Support</a></li>
                  <li><a href="/services/consulting" className="hover:text-amber-400 transition-colors">Business Consulting</a></li>
                  <li><a href="/services/compliance" className="hover:text-amber-400 transition-colors">Compliance & Advisory</a></li>
                </ul>
              </div>
            </div>

            {/* Col 4: Reach Out (Width: 236px) */}
            <div className="flex flex-col gap-[20px] w-full lg:w-[236px] text-left">
              <h3 className="text-DM sans text-[12px] font-bold uppercase tracking-widest text-zinc-400">Reach Out</h3>
              <div className="flex flex-col gap-4 text-DM sans">
                <div className="flex items-center gap-4 text-[14px]">
                  <span className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622c0-1.037.828-1.84 1.854-1.84h4.863c.383 0 .733.204.918.54l1.58 2.87c.156.284.06.634-.216.812l-1.393.904a11.026 11.026 0 0 0 3.902 3.902l.904-1.393c.178-.276.528-.372.812-.216l2.87 1.58c.336.185.54.535.54.918v4.863c0 1.026-.803 1.854-1.84 1.854a15.42 15.42 0 0 1-15.42-15.42Z" /></svg>
                  </span>
                  <span className="font-medium text-white">+91 88665 56327</span>
                </div>
                <div className="flex items-center gap-4 text-[14px]">
                  <span className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                  </span>
                  <span className="font-medium text-white">info@arambhservices.com</span>
                </div>
                <div className="flex items-start gap-4 text-[14px]">
                  <span className="text-white mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" /></svg>
                  </span>
                  <div className="flex flex-col text-DM sans">
                    <span className="font-medium text-white">Ahmedabad, Gujarat, India</span>
                    <span className="text-white/80 text-[12px] mt-0.5">Mon – Sat, 9:30 AM – 6:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM PART: CTA Section */}
          <div className="relative px-8 lg:px-0 pt-12 pb-10 w-full max-w-[1280px] mx-auto min-h-[340px]">

            {/* CTA Content (Width: 477px, Gap: ~40px via margins) */}
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
                  className="px-7 py-3.5 rounded-lg font-DM sans bg-white/20 text-white font-medium backdrop-blur-sm shadow-[0px_0px_10px_0px_#FFFFFF90_inset,0px_0px_4px_0px_#FFFFFF90] inline-block hover:bg-white/30 transition-all"
                >
                  Schedule a Call
                </a>
              </div>

              <span className="text-DM sans text-[12px] text-white/60 mt-16 md:mt-20">
                © 2026 Arambh Advisory. All rights reserved.
              </span>
            </div>

            {/* Desktop-only Logo Background strictly matching Figma size */}
            <div className="hidden lg:block absolute right-[80px] bottom-0 pointer-events-none select-none z-0">
              <Image
                src={logo1}
                alt="Arambh Advisory Logo Background"
                className="w-[314px] h-[296px] object-contain object-bottom opacity-80"
              />
            </div>

            {/* Mobile-only Logo */}
            <div className="flex lg:hidden mt-12 mb-4 pointer-events-none select-none z-0 justify-center">
              <Image
                src={logo1}
                alt="Arambh Advisory Logo Background"
                className="w-[280px] h-auto object-contain opacity-50"
              />
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}