'use client'
import React, { createContext, useState } from 'react';

export const ExerciseContext = createContext({})


const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {

    const [todayExercise, setTodayExercise] = useState([])
    const [savedExercise, setSavedExercise] = useState([])

    const sharedData = {
        todayExercise, setTodayExercise, savedExercise, setSavedExercise
    }

    return (
        <ExerciseContext value={sharedData}>{children}</ExerciseContext>
    );
};

export default ExerciseProvider;