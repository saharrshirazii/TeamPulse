import React, { createContext, useMemo, ReactNode } from "react";
import { Checkin, DayStats } from "../types";
import { useCheckins } from "../hooks/useCheckins";
import { useDayStats } from "../hooks/useDayStats";

// Define the shape of the Context
interface CheckInContextType {
  checkins: Checkin[];
  todayCheckins: Checkin[];
  stats: DayStats;
  addCheckin: (checkin: Omit<Checkin, "id" | "timestamp">) => void;
  removeCheckin: (id: string) => void;
  clearDay: (date: string) => void;
}

// Create the Context object. It starts as undefined because there is no data until the app actually starts running.
export const CheckInContext = createContext<CheckInContextType | undefined>(undefined);

// Create the Provider component. The children are all the other parts of your app (the Form, the Dashboard, etc.) that will sit inside this provider.
export const CheckInProvider = ({ children }: { children: ReactNode }) => {
  // Pull logic from our custom hook
  const { checkins, addCheckin, removeCheckin, clearDay } = useCheckins();

  // Filter check-ins for today using useMemo 
  const todayCheckins = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return checkins.filter(
      (c) => c.timestamp.toISOString().split("T")[0] === today
    );
  }, [checkins]);

  // Get statistics based on today's check-ins 
  const stats = useDayStats(todayCheckins);

  //This gathers everything into one object called value.
  const value = {
    checkins,
    todayCheckins,
    stats,
    addCheckin,
    removeCheckin,
    clearDay,
  };

  return (
    <CheckInContext.Provider value={value}>
      {children}
    </CheckInContext.Provider>
  );
};