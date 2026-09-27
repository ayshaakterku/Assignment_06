"use client";

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { ExerciseDataTypes } from '@/types/excercise.type';
import { MdOutlineWatchLater } from 'react-icons/md';
import { GoFlame } from 'react-icons/go';
import { FaRegStar } from 'react-icons/fa';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';
import { Bounce, toast } from 'react-toastify';
import { ExerciseContext } from '@/context/ExerciseContext';
import { useEffect } from "react";
type ListedExerciseCardProps = {
    exercise: ExerciseDataTypes;
    onRemove: () => void;
};

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

const ListedExerciseCard = ({ exercise, onRemove }: ListedExerciseCardProps) => {


    // for Mark as done button; data will be save in local storage
    const [isDone, setIsDone] = useState<boolean>(false);

    useEffect(() => {
        const saved = localStorage.getItem(`exerciseDone:${exercise.id}`);

        if (saved === "true") {
            setIsDone(true);
        }
    }, [exercise.id]);

    const handleMarkAsDone = (): void => {
        setIsDone(true);
        localStorage.setItem(`exerciseDone:${exercise.id}`, "true");
        toast.info("Marked as done", toastOptions);
    };

    const handleMarkAsDoneUndo = (): void => {
        setIsDone(false);
        localStorage.setItem(`exerciseDone:${exercise.id}`, "false");
    };


    return (
        <div className="flex w-full flex-col gap-4 rounded-2xl border border-neutral-800 bg-[#0B0F19] px-4 py-3 sm:flex-row sm:items-center">

            {/* Thumbnail */}
            <div className="shrink-0">
                <Image
                    src={exercise.image}
                    alt={exercise.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl object-cover"
                />
            </div>

            {/* Name / Equipment / Stats */}
            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-extrabold uppercase tracking-wide text-white">
                    {exercise.name}
                </h3>

                <p className="mt-0.5 text-xs text-neutral-400">
                    {exercise.equipment}
                </p>

                {/* Stats */}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">

                    <div className="flex items-center gap-1 text-xs text-neutral-300">
                        <MdOutlineWatchLater className="text-[#C2F800]" />
                        <span>{exercise.duration} min</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-neutral-300">
                        <GoFlame className="text-[#C2F800]" />
                        <span>{exercise.caloriesBurned} kcal</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-neutral-300">
                        <FaRegStar className="text-[#C2F800]" />
                        <span>{exercise.rating}</span>
                    </div>

                </div>
            </div>

            {/* Actions */}
            <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">

                {/* View Details */}
                <Link
                    href={`/exercise-details/${exercise.id}`}
                    className="flex-1 rounded-full border border-neutral-600 px-4 py-2 text-center text-xs font-semibold text-white transition hover:border-[#C2F800] hover:text-[#C2F800] sm:flex-none"
                >
                    View Details
                </Link>

                {/* Mark as Done */}
                <button
                    onClick={isDone ? handleMarkAsDoneUndo : handleMarkAsDone}
                    className="flex-1 rounded-full bg-[#C2F800] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#a9dd00] sm:flex-none"
                >
                    {isDone ? (
                        <span className="flex items-center justify-center gap-1.5">
                            <IoCheckmarkOutline
                                className="text-lg font-bold"
                                strokeWidth={10}
                            />
                            Marked as Done
                        </span>
                    ) : (
                        "Mark as Done!"
                    )}
                </button>

                {/* Remove */}
                <button
                    onClick={() => {
                        handleMarkAsDoneUndo();
                        onRemove();
                    }}
                    aria-label="Remove"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
                >
                    <RxCross2 className="font-bold" />
                </button>

            </div>
        </div>

    );
};

export default ListedExerciseCard;