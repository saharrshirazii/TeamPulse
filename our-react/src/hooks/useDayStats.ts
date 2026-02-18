import {useMemo} from "react"
import {Checkin, DayStats, Mood} from "../types"

export const useDayStats = (checkins: Checkin[]): DayStats => {
  return useMemo(() => {
    //how many people checked in
    const totalCheckins = checkins.length;

    // Default distribution object initialized to zero for all moods
    const moodDistribution: Record<Mood, number> = {
      great: 0,
      good: 0,
      okay: 0,
      tired: 0,
      stressed: 0,
    };
    //If no one has checked in yet, the function stops here and returns zeros
    if (totalCheckins === 0) {
      return { averageEnergy: 0, moodDistribution, totalCheckins: 0 };
    }

    //This loops through every person's check-in once.
    let totalEnergy = 0;

    checkins.forEach((c) => {
      totalEnergy += c.energy;
      moodDistribution[c.mood]++;
    });

    return {
        //It divides the total energy by the number of people and uses
      averageEnergy: Number((totalEnergy / totalCheckins).toFixed(1)), // Rounds to one decimal
      moodDistribution,
      totalCheckins,
    };
  }, [checkins]); // Only recalculates when the checkins array changes
};