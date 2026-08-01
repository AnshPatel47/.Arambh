"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

interface Service {
  id: string;
  slug: string;
  title: string;
  category?: string;
  description?: string;
  status?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  // Services States
  const [dbServices, setDbServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [contactId, setContactId] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const formDataRef = useRef(formData);
  const selectedServicesRef = useRef(selectedServices);
  const contactIdRef = useRef(contactId);
  const isSavingRef = useRef(false);
  const pendingSaveRef = useRef<{ data: typeof formData; services: string[] } | null>(null);
  const pendingResolveRef = useRef<(() => void) | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Database se direct updated services fetch karna
useEffect(() => {
  async function fetchServicesFromDB() {
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = await res.json();

      console.log("ContactForm Fetched API Data:", data);

      if (data.success && Array.isArray(data.services) && data.services.length > 0) {
        // Status check case-insensitive & null handling
        const activeServices = data.services.filter((s: Service) => {
          if (!s.status) return true; // If status is not defined, show it
          return s.status.toLowerCase() === "active";
        });

        // Agar filtering ke baad services bachti hain toh wo dikhao, warna saari dikha do
        setDbServices(activeServices.length > 0 ? activeServices : data.services);
      } else if (Array.isArray(data) && data.length > 0) {
        setDbServices(data);
      } else {
        setDbServices([]);
      }
    } catch (err) {
      console.error("Failed to load services from DB in ContactForm:", err);
      setDbServices([]);
    } finally {
      setServicesLoading(false);
    }
  }

  fetchServicesFromDB();
}, []);
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
    selectedServicesRef.current = selectedServices;
  }, [selectedServices]);

  useEffect(() => {
    contactIdRef.current = contactId;
  }, [contactId]);

  const saveToServer = useCallback(
    async (data: typeof formData, services: string[], currentId: string | null): Promise<void> => {
      const hasData = Object.values(data).some((val) => val.trim() !== "") || services.length > 0;
      if (!hasData) return;

      if (isSavingRef.current) {
        pendingSaveRef.current = { data, services };
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
            services,
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
          const nextPayload = pendingSaveRef.current;
          pendingSaveRef.current = null;
          const resolvePending = pendingResolveRef.current;
          pendingResolveRef.current = null;

          await saveToServer(nextPayload.data, nextPayload.services, contactIdRef.current);
          if (resolvePending) resolvePending();
        }
      }
    },
    []
  );

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      saveToServer(formData, selectedServices, contactIdRef.current);
    }, 1500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [formData, selectedServices, saveToServer]);

  const handleBlur = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    saveToServer(formDataRef.current, selectedServicesRef.current, contactIdRef.current);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    await saveToServer(formData, selectedServices, contactIdRef.current);

    setStatus("success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
    setSelectedServices([]);
    setContactId(null);
    contactIdRef.current = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("arambh_contact_id");
    }
    pendingSaveRef.current = null;
    isSavingRef.current = false;
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 px-6 md:px-10 lg:px-20 xl:px-20 pt-6 pb-36 md:pt-2 md:pb-44 flex-grow bg-white">
      {/* Left Column: Form Section */}
      <form onSubmit={handleSubmit} className="flex flex-col w-full lg:flex-1 justify-between bg-white">
        <div className="flex flex-col w-full gap-[5px] opacity-1 mb-5">
          <h1 className="text-[#131313] flex items-end pb-2 font-semibold text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.03em]">
            Send Us a Message
          </h1>

          <div className="flex flex-col gap-[16px] w-full">
            {/* Row 1: Name and Email */}
            <div className="flex flex-col sm:flex-row w-full gap-[16px] items-center">
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
            <div className="flex flex-col sm:flex-row w-full gap-[16px] items-center">
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

            {/* Message Field */}
            <div className="w-full">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Write your message.."
                className="w-full h-[140px] border border-[#DDD5C9] focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 rounded-[12px] p-[16px] bg-[#F6F4F0] text-base text-[#666665] placeholder-[#666665]/60 resize-none outline-none transition-all duration-200"
              />
            </div>

            {/* Dynamic Services Section (Fetching directly from DB) */}
            <div className="flex flex-col gap-3 mt-1">
              <label className="text-[#131313] font-semibold text-lg md:text-xl tracking-tight">
                Services you are interested in
              </label>

              {servicesLoading ? (
                /* Skeleton Loader while DB fetches */
                <div className="flex flex-wrap gap-2 animate-pulse">
                  <div className="h-9 w-28 bg-[#F6F4F0] rounded-full"></div>
                  <div className="h-9 w-36 bg-[#F6F4F0] rounded-full"></div>
                  <div className="h-9 w-24 bg-[#F6F4F0] rounded-full"></div>
                </div>
              ) : dbServices.length === 0 ? (
                <p className="text-sm text-zinc-400">No services found in database.</p>
              ) : (
                /* Live DB Services Pills */
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {dbServices.map((service) => {
                    const isSelected = selectedServices.includes(service.title);

                    return (
                      <button
                        key={service.id || service.slug}
                        type="button"
                        onClick={() => toggleService(service.title)}
                        className={`flex items-center gap-2 px-2 py-1 text-sm md:text-base font-medium rounded-full border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-[#EAF3EA] text-[#C2943A] border-[#d4a038] shadow-sm"
                            : "bg-[#faf6ed] text-[#555554] border-[#DDD5C9] hover:border-zinc-400"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#C2943A] flex-shrink-0" />
                        )}
                        <span>{service.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full h-[52px] flex items-center justify-center gap-[8px] border border-black bg-black hover:bg-zinc-800 text-white font-semibold rounded-[12px] py-[10px] px-[16px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-300 text-base shadow-sm mt-3 cursor-pointer"
        >
          {status === "sending" ? "Sending..." : "Send a Message"}
        </button>

        {status === "success" && (
          <p className="text-emerald-600 font-medium text-center mt-2">
            Thank you! Your message has been sent successfully.
          </p>
        )}
      </form>

      {/* Right Column: Map Section */}
      <div className="w-full lg:flex-1 flex flex-col justify-between opacity-1 bg-white">
        <div className="w-full flex-grow md:flex-1 min-h-[350px] lg:min-h-[520px] rounded-[16px] border border-zinc-200 overflow-hidden mt-4 lg:mt-0">
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