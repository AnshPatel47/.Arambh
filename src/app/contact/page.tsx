"use client";
import React, { useState } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import { ChevronRight, MessageSquare, Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Mock API submission
    setTimeout(() => {
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    }, 1500);
  };


  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[520px] flex items-center">

        {/* Background Image (Shown completely on the right) */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/contact_hero_netbounce.webp')" }}
        />

        {/* Dark Gradient Overlay (the "shadow") */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-DM sans font-semibold tracking-widest text-[#BD8E32] mb-8 " aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-white">Contact Us</span>
          </nav>

          <div className="max-w-2xl flex flex-col items-start text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-4">
              Let's Start a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BD8E32] to-[#f8d08b]">
                Conversation.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl text-DM sans">
              Whether you need expert advice on corporate compliance, startup registration, or business structuring, our advisory team is ready to guide you.
            </p>

            {/* Call Us Now Button */}
            <div className="mt-8">
              <a
                href="tel:+918866556327"
                className="group flex items-center gap-3 bg-[#BD8E32] hover:bg-[#a67c29] text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(189,142,50,0.25)] hover:shadow-[0_0_30px_rgba(189,142,50,0.4)] hover:-translate-y-1 text-DM sans"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                Call Us Now
              </a>
            </div>
          </div>

        </div>
      </section>
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start px-6 sm:px-12 md:px-16 pt-10 pb-8 md:pt-12 md:pb-10 flex-grow">
        <div className="flex flex-col">
          <h1 className="text-[34px] sm:text-[40px] font-bold text-[#111] tracking-tight mb-8 text-DM sans">
            Send Us a Message
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-[#F6F4F0] text-[#666665] placeholder-zinc-400 py-5 pl-14 pr-5 rounded-2xl border-1px focus:outline-none focus:ring-2 focus:ring-zinc-200 text-base"
                />
              </div>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#F6F4F0] text-[#666665] placeholder-zinc-400 py-5 pl-14 pr-5 rounded-2xl border-1px focus:outline-none focus:ring-2 focus:ring-zinc-200 text-base"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622c0-1.037.828-1.84 1.854-1.84h4.863c.383 0 .733.204.918.54l1.58 2.87c.156.284.06.634-.216.812l-1.393.904a11.026 11.026 0 0 0 3.902 3.902l.904-1.393c.178-.276.528-.372.812-.216l2.87 1.58c.336.185.54.535.54.918v4.863c0 1.026-.803 1.854-1.84 1.854a15.42 15.42 0 0 1-15.42-15.42Z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone no."
                  required
                  className="w-full bg-[#F6F4F0] text-[#666665] placeholder-zinc-400 py-5 pl-14 pr-5 rounded-2xl border-1px focus:outline-none focus:ring-2 focus:ring-zinc-200 text-base"
                />
              </div>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  className="w-full bg-[#F6F4F0] text-[#666665] placeholder-zinc-400 py-5 pl-14 pr-5 rounded-2xl border-1px focus:outline-none focus:ring-2 focus:ring-zinc-200 text-base"
                />
              </div>
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message.."
                required
                rows={5}
                className="w-full bg-[#F6F4F0] text-[#666665] placeholder-zinc-400 py-6 px-6 rounded-2xl border-1px focus:outline-none focus:ring-2 focus:ring-zinc-200 text-base resize-none "
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-black hover:bg-zinc-800 text-white font-semibold py-5 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-300 text-base shadow-sm mt-3 cursor-pointer text-DM sans"
            >
              {status === "sending" ? "Sending..." : "Send a Message"}
            </button>
            {status === "success" && (
              <p className="text-emerald-600 font-medium text-center mt-2">
                Thank you! Your message has been sent successfully.
              </p>
            )}
          </form>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            {/* Reachout Badge */}

            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-gray-500 bg-white text-DM sans font-bold tracking-widest text-gray-900 uppercase">
              <span className="w-2 h-2 rounded-full bg-gray-900 mr-2"></span>
              Reachout
            </div>

            <h2 className="text-[32px] text-DM sans sm:text-[40px] font-semibold font-DM font-sans text-[#131313] tracking-tight mb-6">
              Contact Information
            </h2>

            <div className="flex flex-col gap-5 text-base text-DM sans">
              <div className="flex items-center gap-6 text-[#000000]">
                <span className="text-black flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622c0-1.037.828-1.84 1.854-1.84h4.863c.383 0 .733.204.918.54l1.58 2.87c.156.284.06.634-.216.812l-1.393.904a11.026 11.026 0 0 0 3.902 3.902l.904-1.393c.178-.276.528-.372.812-.216l2.87 1.58c.336.185.54.535.54.918v4.863c0 1.026-.803 1.854-1.84 1.854a15.42 15.42 0 0 1-15.42-15.42Z" />
                  </svg>
                </span>
                <span className="font-medium">+91 88665 56327</span>
              </div>
              <div className="flex items-center gap-5 text-[#000000]">
                <span className="text-black flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="font-medium">info@arambhservices.com</span>
              </div>
              <div className="flex items-start gap-6 text-[#000000]">
                <span className="text-black mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </span>
                <div className="flex flex-col text-DM sans">
                  <span className="font-medium">Ahmedabad, Gujarat, India</span>
                  <span className="text-black mt-1 flex-shrink-0">
                    Mon – Sat, 9:30 AM – 6:30 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="w-full h-[220px] sm:h-[240px] rounded-3xl overflow-hidden shadow-sm border border-zinc-100 mt-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117510.96395610817!2d72.43962804368149!3d23.02024368021966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fccd11d0872ee11!2sAhmedabad%2C%20Gujarat%20380009!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ahmedabad Office Map"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
