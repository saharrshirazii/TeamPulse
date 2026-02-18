import {useReducer} from "react"
import {checkInReducer} from "../reducers/checkInReducer"
import {checkin} from "../types"

export const useCheckins = () => {
  const [checkins, dispatch] = useReducer(checkInReducer, []);
    // Wraps dispatch in a named function for easier use [cite: 59]
  const addCheckin = (checkin: Omit<Checkin, "id" | "timestamp">) => {
    dispatch({ type: "ADD_CHECKIN", payload: checkin });
  };

  const removeCheckin = (id: string) => {
    dispatch({ type: "REMOVE_CHECKIN", payload: { id } });
  };

  const clearDay = (date: string) => {
    dispatch({ type: "CLEAR_DAY", payload: { date } });
  };

  return {
    checkins,
    addCheckin,
    removeCheckin,
    clearDay,
  };
};