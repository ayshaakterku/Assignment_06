"use client";
import { ExerciseDataTypes } from "@/types/excercise.type";
import React, { createContext, useEffect, useState } from "react";


// Here all data will be saved in local storage except "isDone and setIsDone"

type ExerciseContextType = {
  todayExercise: ExerciseDataTypes[];
  setTodayExercise: React.Dispatch<React.SetStateAction<ExerciseDataTypes[]>>;

  savedExercise: ExerciseDataTypes[];
  setSavedExercise: React.Dispatch<React.SetStateAction<ExerciseDataTypes[]>>;

};

export const ExerciseContext = createContext<ExerciseContextType>({
  todayExercise: [],
  setTodayExercise: () => { },
  savedExercise: [],
  setSavedExercise: () => { },

});

const TODAY_KEY = "todayExercise";
const SAVED_KEY = "savedExercise";

// Safely read from localStorage (returns [] on server or if parsing fails)
function getStoredValue(key: string): ExerciseDataTypes[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return [];
  }
}

const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {
  const [todayExercise, setTodayExercise] = useState<ExerciseDataTypes[]>([]);
  const [savedExercise, setSavedExercise] = useState<ExerciseDataTypes[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once, after mount (avoids SSR mismatch)
  useEffect(() => {
    setTodayExercise(getStoredValue(TODAY_KEY));
    setSavedExercise(getStoredValue(SAVED_KEY));
    setHydrated(true);
  }, []);

  // Save todayExercise whenever it changes
  useEffect(() => {
    if (!hydrated) return; // don't overwrite storage with initial [] before load
    try {
      localStorage.setItem(TODAY_KEY, JSON.stringify(todayExercise));
    } catch (error) {
      console.error("Error saving todayExercise to localStorage:", error);
    }
  }, [todayExercise, hydrated]);

  // Save savedExercise whenever it changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(savedExercise));
    } catch (error) {
      console.error("Error saving savedExercise to localStorage:", error);
    }
  }, [savedExercise, hydrated]);

  const sharedData = {
    todayExercise,
    setTodayExercise,
    savedExercise,
    setSavedExercise,
  };

  return <ExerciseContext value={sharedData}>{children}</ExerciseContext>;
};

export default ExerciseProvider;
