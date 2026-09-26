'use client'

import React, { useContext } from 'react';
import { ExerciseContext } from '@/context/ExerciseContext';
import { ExerciseDataTypes } from '@/types/excercise.type';
import { Bounce, toast } from 'react-toastify';
import { FaRegCalendarPlus } from 'react-icons/fa';

const toastOptions = {
    position: "top-right" as const,
    autoClose: 1000,           // no auto-dismiss timer
    hideProgressBar: true,      // hides the bar even if autoClose is on
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light' as const,
    transition: Bounce,
}

const AddTodayButton = ({ exercise }: { exercise: ExerciseDataTypes }) => {

    const { todayExercise, setTodayExercise, savedExercise } = useContext(ExerciseContext);


    // if one button pressed then automatically another button disabled
    const isAdded = todayExercise.some(
        (ex: ExerciseDataTypes) => ex.id === exercise.id
    );

    const isSaved = savedExercise.some(
        (ex: ExerciseDataTypes) => ex.id === exercise.id
    );

    const handleTodayExercise = () => {

        if (isAdded) {
            setTodayExercise(
                todayExercise.filter(
                    // (ex: ExerciseDataTypes) => ex.id !== exercise.id
                    (ex: ExerciseDataTypes) => ex.id === exercise.id
                )
            );
            // toast.info(`Removed from today's plan: ${exercise.name}`);
            toast.error(`Already in plan`, toastOptions);

        } else {
            setTodayExercise([...todayExercise, exercise]);

            toast.info(`Added to today's plan`, toastOptions);
        }
    };

    return (
        <button
            disabled={isSaved}
            className="flex items-center gap-2 border border-[#C2F800] rounded bg-[#C2F800] px-4 py-2 text-sm font-bold text-black transition hover:bg-transparent hover:text-[#C2F800] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleTodayExercise}
        >
            <FaRegCalendarPlus />
            {isAdded ? "Added to today's plan" : "Add to today's plan"}
        </button>
    );
};

export default AddTodayButton;

