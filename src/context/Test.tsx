// ##without local storage setting context provider

/** 
'use client'
import { ExerciseDataTypes } from '@/types/excercise.type';
import React, { createContext, useState } from 'react';

type ExerciseContextType = {
    todayExercise: ExerciseDataTypes[];
    setTodayExercise: React.Dispatch<React.SetStateAction<ExerciseDataTypes[]>>;

    savedExercise: ExerciseDataTypes[];
    setSavedExercise: React.Dispatch<React.SetStateAction<ExerciseDataTypes[]>>;
};

export const ExerciseContext = createContext<ExerciseContextType>({
    todayExercise: [],
    setTodayExercise: () => {},
    savedExercise: [],
    setSavedExercise: () => {},
});

const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {

    const [todayExercise, setTodayExercise] = useState<ExerciseDataTypes[]>([]);
    const [savedExercise, setSavedExercise] = useState<ExerciseDataTypes[]>([]);

    const sharedData = {
        todayExercise, setTodayExercise, savedExercise, setSavedExercise
    }

    return (
        <ExerciseContext value={sharedData}>{children}</ExerciseContext>
    );
};

export default ExerciseProvider;

*/

