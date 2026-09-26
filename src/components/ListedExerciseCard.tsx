"use client";

import React from 'react';
import Image from 'next/image';
import { ExerciseDataTypes } from '@/types/excercise.type';

import { MdOutlineWatchLater } from 'react-icons/md';
import { GoFlame } from 'react-icons/go';
import { FaRegStar } from 'react-icons/fa';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

type ListedExerciseCardProps = {
    exercise: ExerciseDataTypes;
    onRemove: () => void;
};

const ListedExerciseCard = ({ exercise, onRemove }: ListedExerciseCardProps) => {
    return (
        <div className="flex items-center gap-4 w-full bg-[#0B0F19] border border-neutral-800 rounded-2xl px-4 py-3">
            {/* Thumbnail */}
            <div className="shrink-0">
                <Image
                    src={exercise.image}
                    alt={exercise.name}
                    width={64}
                    height={64}
                    className="rounded-xl w-16 h-16 object-cover"
                />
            </div>

            {/* Name / equipment / stats */}
            <div className="flex-1 min-w-0">
                <h3 className="uppercase font-extrabold text-white text-sm tracking-wide truncate">
                    {exercise.name}
                </h3>
                <p className="text-neutral-400 text-xs mt-0.5">{exercise.equipment}</p>

                <div className="flex items-center gap-4 mt-1.5">
                    <div className="flex items-center gap-1 text-neutral-300 text-xs">
                        <MdOutlineWatchLater className="text-[#C2F800]" />
                        {exercise.duration} min
                    </div>
                    <div className="flex items-center gap-1 text-neutral-300 text-xs">
                        <GoFlame className="text-[#C2F800]" />
                        {exercise.caloriesBurned} kcal
                    </div>
                    <div className="flex items-center gap-1 text-neutral-300 text-xs">
                        <FaRegStar className="text-[#C2F800]" />
                        {exercise.rating}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
                <button className="rounded-full border border-neutral-600 text-white text-xs font-semibold px-4 py-2 transition hover:border-[#C2F800] hover:text-[#C2F800]">
                    View Details
                </button>

                <button className="flex items-center gap-1.5 rounded-full bg-[#C2F800] text-black text-xs font-bold px-4 py-2 transition hover:bg-[#a9dd00]">
                    <IoCheckmarkOutline strokeWidth={10} />
                    Mark as Done
                </button>

                <button
                    onClick={onRemove}
                    aria-label="Remove"
                    className="text-neutral-500 hover:text-white transition ml-1"
                >
                    <RxCross2 className="font-bold" />
                </button>
            </div>
        </div>
    );
};

export default ListedExerciseCard;