"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AdmissionContextType {
  isOpen: boolean;
  openAdmission: () => void;
  closeAdmission: () => void;
}

const AdmissionContext = createContext<AdmissionContextType>({
  isOpen: false,
  openAdmission: () => {},
  closeAdmission: () => {},
});

export function AdmissionProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAdmission = () => setIsOpen(true);
  const closeAdmission = () => setIsOpen(false);

  return (
    <AdmissionContext.Provider value={{ isOpen, openAdmission, closeAdmission }}>
      {children}
    </AdmissionContext.Provider>
  );
}

export function useAdmission() {
  return useContext(AdmissionContext);
}
