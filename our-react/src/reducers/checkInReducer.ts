import { Checkin, Mood } from "../types";

export type CheckinAction =
  | { type: "ADD_CHECKIN"; payload: Omit<Checkin, "id" | "timestamp"> }
  | { type: "REMOVE_CHECKIN"; payload: { id: string } }
  | { type: "CLEAR_DAY"; payload: { date: string } };

export const checkInReducer = (state: Checkin[], action: CheckinAction): Checkin[] => {
 switch(action.type){
    case "ADD_CHECKIN":
        // Create a new Checkin object, generating id and timestamp here
        const newCheckin: Checkin = {
        ...action.payload,
        id: crypto.randomUUID(), // Standard web API for unique IDs
        timestamp: new Date(),
      };
      return [...state, newCheckin];

    case "REMOVE_CHECKIN":
      // Filter out the check-in with the matching ID [cite: 48, 53]
      return state.filter((checkin) => checkin.id !== action.payload.id);

    case "CLEAR_DAY":
      // Remove check-ins that match the provided date string [cite: 48, 54]
      // Typically used to clear the current day's logs
      return state.filter(
        (checkin) => checkin.timestamp.toISOString().split("T")[0] !== action.payload.date
      );

    default:
      return state;
 }
}

  