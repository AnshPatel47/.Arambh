"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [contactId, setContactId] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const formDataRef = useRef(formData);
  const contactIdRef = useRef(contactId);
  const isSavingRef = useRef(false);
  const pendingSaveRef = useRef<typeof formData | null>(null);
  const pendingResolveRef = useRef<(() => void) | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize contactId from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedId = localStorage.getItem("arambh_contact_id");
      if (savedId) {
        setContactId(savedId);
        contactIdRef.current = savedId;
      }
    }
  }, []);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    contactIdRef.current = contactId;
  }, [contactId]);

  const saveToServer = useCallback(async (data: typeof formData, currentId: string | null): Promise<void> => {
    const hasData = Object.values(data).some((val) => val.trim() !== "");
    if (!hasData) return;

    if (isSavingRef.current) {
      pendingSaveRef.current = data;
      return new Promise<void>((resolve) => {
        const prevResolve = pendingResolveRef.current;
        pendingResolveRef.current = () => {
          if (prevResolve) prevResolve();
          resolve();
        };
      });
    }

    isSavingRef.current = true;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentId,
          ...data,
        }),
      });
      const resData = await response.json();
      if (resData.success && resData.contactId) {
        setContactId(resData.contactId);
        contactIdRef.current = resData.contactId;
        if (typeof window !== "undefined") {
          localStorage.setItem("arambh_contact_id", resData.contactId);
        }
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
    } finally {
      isSavingRef.current = false;
      if (pendingSaveRef.current) {
        const nextData = pendingSaveRef.current;
        pendingSaveRef.current = null;
        const resolvePending = pendingResolveRef.current;
        pendingResolveRef.current = null;

        await saveToServer(nextData, contactIdRef.current);
        if (resolvePending) resolvePending();
      }
    }
  }, []);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      saveToServer(formData, contactIdRef.current);
    }, 1500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [formData, saveToServer]);

  const handleBlur = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    saveToServer(formDataRef.current, contactIdRef.current);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    await saveToServer(formData, contactIdRef.current);

    setStatus("success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
    setContactId(null);
    contactIdRef.current = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("arambh_contact_id");
    }
    pendingSaveRef.current = null;
    isSavingRef.current = false;
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-0 px-6 md:px-10 lg:px-20 xl:px-20 pt-10 pb-36 md:pt-12 md:pb-44 flex-grow bg-white">
      {/* Left Column: Form Section */}
      <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-[540px] md:h-[480px] justify-between bg-white">
        {/* Left side box layout (Send Us a Message title + fields) - gap reduced to 20px */}
        <div className="flex flex-col w-full md:w-[540px] gap-[20px] opacity-1 mb-5">
          {/* Title */}
          <h1
            className="text-[#131313] flex items-end pb-2 font-semibold text-DM sans text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.03em]"
          >
            Send Us a Message
          </h1>
          
          {/* Form inputs container: gap 16px between rows */}
          <div className="flex flex-col gap-[16px] w-full">
            {/* Row 1: Name and Email */}
            <div className="flex flex-col sm:flex-row w-full md:w-[540px] gap-[16px] items-center">
              {/* Name Field: bg-[#F6F4F0], text-[#666665], border-[#DDD5C9], 16px padding, 12px radius, 8px gap */}
              <div className="w-full sm:flex-1 h-[52px] flex items-center gap-[8px] px-[16px] border border-[#DDD5C9] rounded-[12px] bg-[#F6F4F0] focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400 transition-all duration-200">
                <span className="flex items-center pointer-events-none text-[#666665]/60 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                  className="w-full bg-transparent text-[#666665] placeholder-[#666665]/60 outline-none border-0 p-0 text-base"
                />
              </div>
              {/* Email Field */}
              <div className="w-full sm:flex-1 h-[52px] flex items-center gap-[8px] px-[16px] border border-[#DDD5C9] rounded-[12px] bg-[#F6F4F0] focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400 transition-all duration-200">
                <span className="flex items-center pointer-events-none text-[#666665]/60 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-[#666665] placeholder-[#666665]/60 outline-none border-0 p-0 text-base"
                />
              </div>
            </div>

            {/* Row 2: Phone and Company */}
            <div className="flex flex-col sm:flex-row w-full md:w-[540px] gap-[16px] items-center">
              {/* Phone Field */}
              <div className="w-full sm:flex-1 h-[52px] flex items-center gap-[8px] px-[16px] border border-[#DDD5C9] rounded-[12px] bg-[#F6F4F0] focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400 transition-all duration-200">
                <span className="flex items-center pointer-events-none text-[#666665]/60 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622c0-1.037.828-1.84 1.854-1.84h4.863c.383 0 .733.204.918.54l1.58 2.87c.156.284.06.634-.216.812l-1.393.904a11.026 11.026 0 0 0 3.902 3.902l.904-1.393c.178-.276.528-.372.812-.216l2.87 1.58c.336.185.54.535.54.918v4.863c0 1.026-.803 1.854-1.84 1.854a15.42 15.42 0 0 1-15.42-15.42Z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your phone no."
                  className="w-full bg-transparent text-[#666665] placeholder-[#666665]/60 outline-none border-0 p-0 text-base"
                />
              </div>
              {/* Company Field */}
              <div className="w-full sm:flex-1 h-[52px] flex items-center gap-[8px] px-[16px] border border-[#DDD5C9] rounded-[12px] bg-[#F6F4F0] focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400 transition-all duration-200">
                <span className="flex items-center pointer-events-none text-[#666665]/60 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your company name"
                  className="w-full bg-transparent text-[#666665] placeholder-[#666665]/60 outline-none border-0 p-0 text-base"
                />
              </div>
            </div>

            {/* Write your message Field: 540px width, 160px height, 16px padding, 12px radius, bg-[#F6F4F0], text-[#666665] */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Write your message.."
                className="w-full md:w-[540px] h-[160px] border border-[#DDD5C9] focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 rounded-[12px] p-[16px] bg-[#F6F4F0] text-base text-[#666665] placeholder-[#666665]/60 resize-none outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Send a Message Button (below the box layout) */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full md:w-[540px] h-[52px] flex items-center justify-center gap-[8px] border border-black bg-black hover:bg-zinc-800 text-white font-semibold rounded-[12px] py-[10px] px-[16px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-300 text-base shadow-sm mt-3 cursor-pointer text-DM sans"
        >
          {status === "sending" ? "Sending..." : "Send a Message"}
        </button>
        {status === "success" && (
          <p className="text-emerald-600 font-medium text-center mt-2">
            Thank you! Your message has been sent successfully.
          </p>
        )}
      </form>

      {/* Right Column: Info and Map Section (540px width, 480px height) */}
      <div className="w-full md:w-[540px] md:h-[480px] flex flex-col justify-between opacity-1 bg-white">
        {/* Contact Info block */}
        <div className="flex flex-col gap-[24px]">
          <div>
            {/* Reachout Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD5C9] bg-[#F6F4F0] px-3 py-[6px] mb-4">
              <span className="h-2 w-2 rounded-full bg-[#333333]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.15em] leading-[140%] text-[#333333]">
                Reachout
              </span>
            </div>

            <h2
              className="text-[#131313] mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.03em" }}
            >
              Contact Information
            </h2>
          </div>

          <div className="flex flex-col gap-[16px] text-base text-DM sans">
            <div className="flex items-center gap-6 text-[#000000]">
              <span className="text-black flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622c0-1.037.828-1.84 1.854-1.84h4.863c.383 0 .733.204.918.54l1.58 2.87c.156.284.06.634-.216.812l-1.393.904a11.026 11.026 0 0 0 3.902 3.902l.904-1.393c.178-.276.528-.372.812-.216l2.87 1.58c.336.185.54.535.54.918v4.863c0 1.026-.803 1.854-1.84 1.854a15.42 15.42 0 0 1-15.42-15.42Z" />
                </svg>
              </span>
              <span className="font-medium font-mono">+91 88665 56327</span>
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
                  Mon – Sat, <span className="font-mono">9:30 AM – 6:30 PM</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container: 540px width, flexible height, border-radius 16px, border-width 1px */}
        <div className="w-full md:w-[540px] flex-grow md:flex-1 min-h-[180px] rounded-[16px] border border-zinc-200 overflow-hidden mt-4">
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
  );
}
