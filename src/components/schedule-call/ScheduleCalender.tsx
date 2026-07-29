"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_NAMES, DAY_NAMES, getDaysInMonth, getFirstDayOfMonth } from "./schedule.data";

interface ScheduleCalenderProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function ScheduleCalender({ selectedDate, onSelectDate, isLoading, setIsLoading }: ScheduleCalenderProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    // Prevent navigating to past months
    if (currentYear === today.getFullYear() && currentMonth <= today.getMonth()) return;
    
    setIsLoading(true);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 350);
  };

  const nextMonth = () => {
    setIsLoading(true);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 350);
  };

  const isPrevDisabled = currentYear === today.getFullYear() && currentMonth <= today.getMonth();

  // Create array of days for grid
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingArray = Array.from({ length: firstDayIndex });

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    onSelectDate(clickedDate);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isPast = (day: number) => {
    const cellDate = new Date(currentYear, currentMonth, day);
    // Set hours to midnight for date-only comparison
    cellDate.setHours(0, 0, 0, 0);
    const tempToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return cellDate < tempToday;
  };

  return (
    <div className="flex flex-col text-left p-6 w-full md:max-w-[360px] select-none bg-[#131210]">
      {/* Month Selection Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[15px] font-bold text-white tracking-wide">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            disabled={isPrevDisabled}
            className={`p-2 rounded-xl transition-all ${
              isPrevDisabled
                ? "text-neutral-700 cursor-not-allowed"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekdays Labels */}
      <div className="grid grid-cols-7 gap-1.5 mb-2 text-center">
        {DAY_NAMES.map((name) => (
          <span key={name} className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase py-1">
            {name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center">
        {isLoading ? (
          Array.from({ length: 35 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#2A2925] animate-pulse mx-auto"
            />
          ))
        ) : (
          <>
            {/* Padding Cells for offset */}
            {paddingArray.map((_, index) => (
              <div key={`pad-${index}`} className="aspect-square" />
            ))}

            {/* Calendar Day Cells */}
            {daysArray.map((day) => {
              const past = isPast(day);
              const active = isSelected(day);
              return (
                <button
                  key={`day-${day}`}
                  disabled={past}
                  onClick={() => handleDayClick(day)}
                  className={`
                    w-9 h-9 md:w-10 md:h-10 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-center relative outline-none mx-auto
                    ${past 
                      ? "text-neutral-700 cursor-not-allowed" 
                      : active
                        ? "bg-[#C2943A] text-white border-2 border-[#C2943A] shadow-md shadow-[#C2943A]/20"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white cursor-pointer border border-transparent"
                    }
                  `}
                >
                  {day}
                  {/* Optional: Add dot for current date */}
                  {day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() && (
                    <span className={`absolute bottom-1 h-1 w-1 rounded-full ${active ? "bg-white" : "bg-[#C2943A]"}`} />
                  )}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
