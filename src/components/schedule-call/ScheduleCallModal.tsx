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
  const [notes, setNotes] = useState("");
  const [softwareStack, setSoftwareStack] = useState("");
  const [roleRequirements, setRoleRequirements] = useState("");
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
        setNotes("");
        setSoftwareStack("");
        setRoleRequirements("");
        setGuests([]);
        setShowGuestSection(false);
        setMobileShowTimes(false);
        setIsInitialLoad(true);
      }, 300); // Wait for transition out
    } else {
      setIsCalendarLoading(true);
      setIsInitialLoad(true);
      const today = new Date();
      setSelectedDate(today);
      setMobileShowTimes(true);

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
    // Transition directly to booking form
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    // Mock API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setView("success");
    }, 1200);
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
            transition={{ duration: 0.28, ease: "easeInOut" }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-[4px]"
          />

          {/* Close Button outside box */}
          <button
            onClick={closeModal}
            className="fixed top-6 right-6 md:top-8 md:right-8 z-[10000] p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/40 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.975, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.975, opacity: 0, y: 14 }}
            transition={{ duration: 0.34, ease: [0.2, 0.8, 0.2, 1] }}
            className={`relative w-full md:max-w-none bg-[#131210] border border-[#2A2925] rounded-3xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh] transition-all duration-500 ease-in-out ${view === "calendar"
                ? "md:w-[1180px] md:h-[520px]"
                : "md:w-[760px] md:h-[590px]"
              }`}
          >

            {/* View 1: Booking Success */}
            {view === "success" ? (
              <div className="flex flex-col items-center justify-center p-8 md:p-12 w-full text-center text-white bg-[#131210]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
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
              </div>
            ) : (
              <>
                {/* Left Sidebar Info Panel */}
                <ScheduleHeader selectedDate={selectedDate} selectedTimeSlot={selectedTimeSlot} />

                {/* Right Interactive Area */}
                <div className="flex-1 flex flex-col overflow-y-auto min-h-0 bg-[#131210]">
                  <AnimatePresence mode="wait">
                    {view === "form" ? (
                      <motion.form
                        key="booking-form"
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        onSubmit={handleSubmit}
                        className="p-6 md:p-8 flex flex-col gap-5 text-left text-neutral-200"
                      >
                        {/* Back to Calendar Navigation */}
                        <button
                          type="button"
                          onClick={() => setView("calendar")}
                          className="flex items-center gap-2 text-[12px] font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider mb-2 self-start cursor-pointer"
                        >
                          <ArrowLeft size={14} /> Back to calendar
                        </button>

                        <h3 className="text-lg font-bold text-white tracking-tight mb-1">Enter Details</h3>

                        {/* Name input */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="booking-name" className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider">
                            Your Name *
                          </label>
                          <input
                            id="booking-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="First and last name"
                            className="w-full bg-[#1A1815] border border-[#2A2925] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none focus:border-[#C2943A] transition-all"
                          />
                        </div>

                        {/* Email input */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="booking-email" className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider">
                            Email Address *
                          </label>
                          <input
                            id="booking-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full bg-[#1A1815] border border-[#2A2925] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none focus:border-[#C2943A] transition-all"
                          />
                        </div>

                        {/* Software stack input */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="booking-software-stack" className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider">
                            Software Stack / Primary Technologies
                          </label>
                          <input
                            id="booking-software-stack"
                            type="text"
                            value={softwareStack}
                            onChange={(e) => setSoftwareStack(e.target.value)}
                            placeholder="e.g. React, Next.js, Python, Node.js"
                            className="w-full bg-[#1A1815] border border-[#2A2925] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none focus:border-[#C2943A] transition-all"
                          />
                        </div>

                        {/* Role requirements input */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="booking-role-requirements" className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider">
                            Role Requirements / Project Needs
                          </label>
                          <textarea
                            id="booking-role-requirements"
                            rows={2}
                            value={roleRequirements}
                            onChange={(e) => setRoleRequirements(e.target.value)}
                            placeholder="Describe the roles, expertise, or talent requirements you need"
                            className="w-full bg-[#1A1815] border border-[#2A2925] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none focus:border-[#C2943A] transition-all resize-none"
                          />
                        </div>

                        {/* Additional notes input */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="booking-notes" className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider">
                            Additional Notes
                          </label>
                          <textarea
                            id="booking-notes"
                            rows={2}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Please share anything that will help prepare for our meeting."
                            className="w-full bg-[#1A1815] border border-[#2A2925] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none focus:border-[#C2943A] transition-all resize-none"
                          />
                        </div>

                        {/* Guests inputs */}
                        {showGuestSection && guests.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider">
                              Guest Emails
                            </label>
                            <div className="flex flex-col gap-2">
                              {guests.map((gEmail, idx) => (
                                <div key={`guest-${idx}`} className="flex items-center gap-2">
                                  <input
                                    type="email"
                                    value={gEmail}
                                    onChange={(e) => handleGuestEmailChange(idx, e.target.value)}
                                    placeholder="guest@example.com"
                                    className="flex-1 bg-[#1A1815] border border-[#2A2925] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none focus:border-[#C2943A] transition-all"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveGuest(idx)}
                                    className="p-3 text-neutral-500 hover:text-red-400 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Add Guests trigger buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleAddGuest}
                            className="flex items-center gap-2 text-[13px] font-semibold text-[#C2943A] hover:text-[#A87E2E] transition-colors cursor-pointer py-1"
                          >
                            <Plus size={16} /> {showGuestSection ? "Add another guest" : "Add guests"}
                          </button>
                        </div>

                        {/* Actions and details */}
                        <div className="mt-4 pt-5 flex flex-col gap-4">
                          <p className="text-[11px] text-neutral-500 leading-normal">
                            By proceeding, you agree to Arambh Advisory&apos;s{" "}
                            <a href="#" className="underline hover:text-neutral-400 transition-colors">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="underline hover:text-neutral-400 transition-colors">
                              Privacy Policy
                            </a>
                            .
                          </p>
                          <div className="flex items-center justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setView("calendar")}
                              className="px-6 py-2.5 rounded-full text-[13px] font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="rounded-full bg-[#C2943A] px-7 py-3 text-[13px] text-white font-semibold transition hover:bg-[#A87E2E] disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#C2943A]/20"
                            >
                              {isSubmitting ? "Confirming..." : "Confirm Booking"}
                            </button>
                          </div>
                        </div>
                      </motion.form>
                    ) : (
                      /* View 3: Calendar and Time Selection */
                      <motion.div
                        key="calendar-view"
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 25 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex flex-col md:flex-row h-full min-h-0 w-full"
                      >
                      <LayoutGroup id="schedule-layout">
                        {/* Calendar view (hidden on mobile if times list is active) */}
                        <motion.div
                          layout
                          transition={{ type: "spring", stiffness: 220, damping: 30, mass: 0.7 }}
                          className={`flex justify-center flex-1 min-w-0 overflow-hidden ${mobileShowTimes ? "hidden md:flex" : "flex"}`}
                        >
                          <ScheduleCalender
                            selectedDate={selectedDate}
                            onSelectDate={handleSelectDate}
                            isLoading={isCalendarLoading}
                            setIsLoading={setIsCalendarLoading}
                          />
                        </motion.div>

                        {/* Time Slots Selection Drawer (jointed on the right) */}
                        <AnimatePresence>
                          {selectedDate && !isInitialLoad && (
                            <motion.div
                              layout
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: 280, opacity: 1 }}
                              exit={{ width: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 220, damping: 30, mass: 0.7 }}
                              className={`md:border-l border-[#2A2925] flex-col p-6 w-full md:w-[280px] shrink-0 overflow-hidden ${mobileShowTimes ? "flex" : "hidden md:flex"
                                }`}
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
                                      className={`px-2 py-1 rounded transition-colors cursor-pointer ${!is24h ? "bg-[#C2943A] text-white" : "text-neutral-400 hover:text-white"
                                        }`}
                                    >
                                      12h
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setIs24h(true)}
                                      className={`px-2 py-1 rounded transition-colors cursor-pointer ${is24h ? "bg-[#C2943A] text-white" : "text-neutral-400 hover:text-white"
                                        }`}
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
                        </AnimatePresence>
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
