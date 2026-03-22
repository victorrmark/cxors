"use client";

import { createContext, useContext } from "react";

interface DateContextType {
  greeting: string;
  date: string;
}

const DateContext = createContext<DateContextType | null>(null);

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within DateProvider");
  }
  return context;
};

export const DateProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DateContextType;
}) => {
  return (
    <DateContext.Provider value={value}>
      {children}
    </DateContext.Provider>
  );
};