"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, Plus, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useScheduleCallModal } from "./ScheduleCallContext";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleCalender from "./ScheduleCalender";
import { TIME_SLOTS_12H, TIME_SLOTS_24H, formatSelectedDate } from "./schedule.data";

export default function ScheduleCallModal() {
  const { isOpen, closeModal, openModal } = useScheduleCallModal();

  // Views: 'calendar' | 'form' | 'success'
  const [view, setView] = useState<"calendar" | "form" | "success">("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [is24h, setIs24h] = useState(false);
  const [mobileShowTimes, setMobileShowTimes] = useState(false);
  const [isCalendarLoading, setIsCalendarLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
  const [showGuestSection, setShowGuestSection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Stop background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Intercept global schedule clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = target.closest("a, button");
      if (!element) return;

      const href = element.getAttribute("href");
      const text = element.textContent?.trim();

      if (href === "/schedule" || href === "#schedule" || text === "Schedule a Call") {
        e.preventDefault();
        openModal();
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [openModal]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Reset modal state on open/close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView("calendar");
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setName("");
        setEmail("");
        setAdditionalNotes("");
        setGuests([]);
        setShowGuestSection(false);
        setMobileShowTimes(false);
        setIsInitialLoad(true);
      }, 300);
    } else {
      setIsCalendarLoading(true);
      setIsInitialLoad(true);
      const today = new Date();
      setSelectedDate(today);
      setMobileShowTimes(false);

      const timer = setTimeout(() => {
        setIsCalendarLoading(false);
        setIsInitialLoad(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    setMobileShowTimes(true);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTimeSlot(time);
    setView("form");
  };

  const handleAddGuest = () => {
    if (!showGuestSection) {
      setShowGuestSection(true);
      setGuests([""]);
    } else {
      setGuests([...guests, ""]);
    }
  };

  const handleGuestEmailChange = (index: number, val: string) => {
    const nextGuests = [...guests];
    nextGuests[index] = val;
    setGuests(nextGuests);
  };

  const handleRemoveGuest = (index: number) => {
    const nextGuests = guests.filter((_, i) => i !== index);
    setGuests(nextGuests);
    if (nextGuests.length === 0) {
      setShowGuestSection(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !email || !selectedDate || !selectedTimeSlot) {
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("/api/schedule-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        date: selectedDate.toISOString(),
        time: selectedTimeSlot,
        notes: additionalNotes,
        guests,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to create booking");
    }

    console.log("Schedule booking created:", data.bookingId);

    setView("success");
  } catch (error) {
    console.error("Schedule booking error:", error);
    alert("Failed to schedule the meeting. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const slots = is24h ? TIME_SLOTS_24H : TIME_SLOTS_12H;
  const timeLabel = selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }) : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            onClick={closeModal}
            className="fixed top-6 right-6 md:top-8 md:right-8 z-[10000] p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/40 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={24} />
          </motion.button>

          {/* Modal Container: locked height to 520px identical to the calendar state */}
          <motion.div
            ref={modalRef}
            layout
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ 
              layout: { type: "spring", bounce: 0, duration: 0.5 },
              default: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
            }}
            className={`relative w-full md:max-w-none bg-[#131210] border border-[#2A2925] rounded-3xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh] ${
              view === "calendar"
                ? selectedDate 
                  ? "md:w-[1180px] md:h-[520px]" 
                  : "md:w-[560px] md:h-[520px]"
                : "md:w-[800px] md:h-[520px]"
            }`}
          >
            {/* View 1: Booking Success */}
            {view === "success" ? (
              <motion.div 
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-col items-center justify-center p-8 md:p-12 w-full text-center text-white bg-[#131210]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                >
                  <CheckCircle2 size={64} className="text-[#C2943A] mb-6" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-3 tracking-tight">This meeting is scheduled</h2>
                <p className="text-[14px] text-neutral-400 max-w-[420px] leading-relaxed mb-6">
                  A calendar invitation and Zoom link have been sent to your email address. We look forward to talking with you!
                </p>
                {selectedDate && selectedTimeSlot && (
                  <div className="p-4 bg-[#1A1815] border border-[#2A2925] rounded-xl flex flex-col gap-1 w-full max-w-[340px] text-left mb-8">
                    <span className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">Confirmed Details</span>
                    <span className="text-[14px] font-semibold text-white mt-1">{formatSelectedDate(selectedDate)}</span>
                    <span className="text-[13px] text-neutral-400">{selectedTimeSlot} (30 mins)</span>
                  </div>
                )}
                <button
                  onClick={closeModal}
                  className="rounded-full bg-[#C2943A] px-8 py-3 text-[13px] text-white font-semibold transition hover:bg-[#A87E2E] active:scale-95 cursor-pointer shadow-lg shadow-[#C2943A]/20"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <>
                {/* Left Sidebar Info Panel */}
                <ScheduleHeader selectedDate={selectedDate} selectedTimeSlot={selectedTimeSlot} />

                {/* Right Interactive Area */}
                <div className="flex-1 flex flex-col overflow-y-auto min-h-0 bg-[#131210] h-full">
                  <AnimatePresence mode="wait">
                    {view === "form" ? (
                      <motion.form
                        key="booking-form"
                        initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onSubmit={handleSubmit}
                        className="p-6 md:p-8 flex flex-col justify-between h-full text-left text-neutral-200 overflow-y-auto"
                      >
                         <div className="flex flex-col gap-3.5">
                           {/* Your name field */}
                           <div className="flex flex-col gap-1">
                             <label className="text-[13px] font-semibold text-white">Your name *</label>
                             <input
                               type="text"
                               required
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               className="w-full px-3 py-2 rounded-xl bg-[#1A1815] border border-[#2A2925] text-white text-sm focus:outline-none focus:border-[#C2943A] transition-colors"
                             />
                           </div>

                           {/* Email address field */}
                           <div className="flex flex-col gap-1">
                             <label className="text-[13px] font-semibold text-white">Email address *</label>
                             <input
                               type="email"
                               required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className="w-full px-3 py-2 rounded-xl bg-[#1A1815] border border-[#2A2925] text-white text-sm focus:outline-none focus:border-[#C2943A] transition-colors"
                             />
                           </div>

                           {/* Additional notes field */}
                           <div className="flex flex-col gap-1">
                             <label className="text-[13px] font-semibold text-white">Additional notes</label>
                             <textarea
                               value={additionalNotes}
                               onChange={(e) => setAdditionalNotes(e.target.value)}
                               placeholder="Please share anything that will help prepare for our meeting."
                               rows={2}
                               className="w-full px-3 py-2 rounded-xl bg-[#1A1815] border border-[#2A2925] text-white text-sm focus:outline-none focus:border-[#C2943A] transition-colors resize-none"
                             />
                           </div>

                           {/* Add guests section */}
                           {!showGuestSection ? (
                             <button
                               type="button"
                               onClick={handleAddGuest}
                               className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer w-fit"
                             >
                               <Plus size={14} /> Add guests
                             </button>
                           ) : (
                             <div className="flex flex-col gap-2">
                               <div className="flex items-center justify-between">
                                 <span className="text-xs font-semibold text-neutral-300">Guest Email(s)</span>
                                 <button
                                   type="button"
                                   onClick={handleAddGuest}
                                   className="text-xs text-[#C2943A] hover:underline flex items-center gap-1"
                                 >
                                   <Plus size={12} /> Add another
                                 </button>
                               </div>
                               {guests.map((guestEmail, index) => (
                                 <div key={index} className="flex items-center gap-2">
                                   <input
                                     type="email"
                                     value={guestEmail}
                                     onChange={(e) => handleGuestEmailChange(index, e.target.value)}
                                     placeholder="guest@example.com"
                                     className="flex-1 px-3 py-1.5 rounded-xl bg-[#1A1815] border border-[#2A2925] text-white text-sm focus:outline-none focus:border-[#C2943A]"
                                   />
                                   <button
                                     type="button"
                                     onClick={() => handleRemoveGuest(index)}
                                     className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                                   >
                                     <Trash2 size={16} />
                                   </button>
                                 </div>
                               ))}
                             </div>
                           )}
                         </div>

                         {/* Footer navigation */}
                         <div className="flex items-center justify-between pt-3 border-t border-[#2A2925] mt-2">
                           <button
                             type="button"
                             onClick={() => setView("calendar")}
                             className="text-xs font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                           >
                             Back
                           </button>
                           <button
                             type="submit"
                             disabled={isSubmitting}
                             className="rounded-xl bg-[#C2943A] px-6 py-2 text-[13px] text-white font-semibold transition hover:bg-[#A87E2E] active:scale-95 cursor-pointer shadow-lg shadow-[#C2943A]/20 disabled:opacity-50"
                           >
                             {isSubmitting ? "Confirming..." : "Confirm"}
                           </button>
                         </div>
                      </motion.form>
                    ) : (
                      /* View 3: Calendar and Time Selection */
                      <motion.div
                        key="calendar-view"
                        initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col md:flex-row h-full min-h-0 w-full"
                      >
                      <LayoutGroup id="schedule-layout">
                        {/* Calendar view */}
                        <motion.div
                          layout
                          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                          className={`flex justify-center flex-1 min-w-0 overflow-hidden ${mobileShowTimes ? "hidden md:flex" : "flex"}`}
                        >
                          <ScheduleCalender
                            selectedDate={selectedDate}
                            onSelectDate={handleSelectDate}
                            isLoading={isCalendarLoading}
                            setIsLoading={setIsCalendarLoading}
                          />
                        </motion.div>

                        {/* Time Slots Selection Drawer */}
                        {selectedDate && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`md:border-l border-[#2A2925] flex-col p-6 w-full md:w-[280px] shrink-0 overflow-hidden ${mobileShowTimes ? "flex" : "hidden md:flex"}`}
                          >
                            {/* Back to Calendar for Mobile view */}
                            <button
                              onClick={() => setMobileShowTimes(false)}
                              className="md:hidden flex items-center gap-2 text-[12px] font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider mb-4 cursor-pointer"
                            >
                              <ArrowLeft size={14} /> Back to calendar
                            </button>

                            <div className="flex items-center justify-between mb-4 min-w-[232px]">
                              <span className="text-[13px] font-bold text-white uppercase tracking-wider">
                                {timeLabel}
                              </span>

                              {/* 12h/24h toggle */}
                              {!isCalendarLoading && (
                                <div className="flex rounded-lg overflow-hidden border border-[#2A2925] bg-[#1A1815] p-0.5 text-[10px] font-bold">
                                  <button
                                    type="button"
                                    onClick={() => setIs24h(false)}
                                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${!is24h ? "bg-[#C2943A] text-white" : "text-neutral-400 hover:text-white"}`}
                                  >
                                    12h
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setIs24h(true)}
                                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${is24h ? "bg-[#C2943A] text-white" : "text-neutral-400 hover:text-white"}`}
                                  >
                                    24h
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Time Slots List / Skeleton */}
                            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 max-h-[300px] md:max-h-none min-w-[232px]">
                              {isCalendarLoading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                  <div
                                    key={`slot-skeleton-${index}`}
                                    className="w-full h-[46px] rounded-xl bg-[#2A2925] animate-pulse"
                                  />
                                ))
                              ) : (
                                slots.map((slot) => (
                                  <button
                                    key={slot}
                                    onClick={() => handleSelectTime(slot)}
                                    className="w-full text-center py-3 rounded-xl border border-[#2A2925] bg-[#1A1815] text-neutral-300 hover:text-white font-semibold text-sm hover:border-[#C2943A] active:scale-98 transition-all cursor-pointer"
                                  >
                                    {slot}
                                  </button>
                                ))
                              )}
                            </div>
                          </motion.div>
                        )}
                      </LayoutGroup>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}