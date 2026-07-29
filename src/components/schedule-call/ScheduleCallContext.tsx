"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ScheduleCallContextProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ScheduleCallContext = createContext<ScheduleCallContextProps | undefined>(undefined);

export function ScheduleCallProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ScheduleCallContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ScheduleCallContext.Provider>
  );
}

export function useScheduleCallModal() {
  const context = useContext(ScheduleCallContext);
  if (context === undefined) {
    throw new Error("useScheduleCallModal must be used within a ScheduleCallProvider");
  }
  return context;
}
