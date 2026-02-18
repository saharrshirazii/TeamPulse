//mood
export type Mood = "great" | "good" | "okay" | "tired"|"stressed";

//energy level
export type EnergyLevel = 1 | 2 | 3 | 4 | 5;

//check in
export interface Checkin{
    id: string;
    name: string;
    mood: Mood;
    energy: EnergyLevel;
    comment?: string;
    timestamp: Date;
} 

export interface DayStats{
    averageEnergy: number;
    moodDistribution: Record<Mood, number>;
    totalCheckins: number;
}