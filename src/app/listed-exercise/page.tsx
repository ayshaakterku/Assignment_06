'use client'
import { Suspense } from 'react';
import { ExerciseContext } from '@/context/ExerciseContext';
import { ExerciseDataTypes } from '@/types/excercise.type';
import React, { useContext, useState } from 'react';
import ListedExerciseCard from '@/components/ListedExerciseCard';
import { toast, Bounce } from 'react-toastify';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ListedExerciseCardForSaved from '@/components/ListedExerciseCardForSaved';

const toastOptions = {
    position: "top-right" as const,
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light' as const,
    transition: Bounce,
}

type SortKey = 'duration' | 'rating' | 'caloriesBurned' | '';
type TabKey = 'today' | 'saved';

// Renamed: inner component that actually uses useSearchParams
const ListedExerciseContent = () => {

    const { todayExercise, setTodayExercise, savedExercise, setSavedExercise } = useContext(ExerciseContext);

    const [sortBy, setSortBy] = useState<SortKey>('duration');

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const tabFromUrl = (searchParams.get('tab') as TabKey) || 'today';
    const [activeTab, setActiveTabState] = useState<TabKey>(tabFromUrl);

    const setActiveTab = (tab: TabKey) => {
        setActiveTabState(tab);
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', tab);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const sortExercise = (exercise: ExerciseDataTypes[]) => {
        const sortedExercise = [...exercise];
        if (sortBy === "duration") {
            sortedExercise.sort((a, b) => b.duration - a.duration)
        } else if (sortBy === "rating") {
            sortedExercise.sort((a, b) => b.rating - a.rating)
        } else if (sortBy === "caloriesBurned") {
            sortedExercise.sort((a, b) => b.caloriesBurned - a.caloriesBurned)
        }
        return sortedExercise
    }

    const sortedTodayExercise = sortExercise(todayExercise);
    const sortedSavedExercise = sortExercise(savedExercise);

    function removeToadyExById(id: string) {
        const todayEx = todayExercise.find((t: ExerciseDataTypes) => String(t.id) === id)
        if (todayEx) {
            toast.error("Removed from today's plan", toastOptions)
        }
        setTodayExercise((prev: ExerciseDataTypes[]) => prev.filter((t: ExerciseDataTypes) => String(t.id) !== id))
    };

    function removeSavedExById(id: string) {
        const savedEx = savedExercise.find((t: ExerciseDataTypes) => String(t.id) === id)
        if (savedEx) {
            toast.error("Removed from Saved for later", toastOptions)
        }
        setSavedExercise((prev: ExerciseDataTypes[]) => prev.filter((t: ExerciseDataTypes) => String(t.id) !== id))
    }

    const activeList = activeTab === 'today' ? sortedTodayExercise : sortedSavedExercise;
    const removeFn = activeTab === 'today' ? removeToadyExById : removeSavedExById;

    const totalMinutes = activeList.reduce(
        (sum: number, ex: ExerciseDataTypes) => sum + Number(ex.duration),
        0
    );
    const totalCalories = activeList.reduce(
        (sum: number, ex: ExerciseDataTypes) => sum + Number(ex.caloriesBurned),
        0
    );

    const emptyMessage = (
        <div className="flex flex-col items-center justify-center text-center bg-[#111317] border border-dotted border-white/10 rounded-2xl px-6 py-14">
            <h2 className="font-extrabold text-2xl md:text-3xl text-white tracking-wide">NOTHING HERE YET</h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-sm">
                {activeTab === 'today'
                    ? 'Browse the library and add a lift to get today moving.'
                    : 'Browse the library and add a lift to get upcoming move.'}
            </p>
            <Link
                href='/'
                className="mt-6 rounded-full bg-[#C2F800] text-black text-sm font-bold px-6 py-3 transition hover:bg-[#a9dd00]"
            >
                Go to workouts
            </Link>
        </div>
    );

    return (
        <div className="space-y-4 container mx-auto py-[20px]">

            <div>
                <h2 className="font-extrabold text-3xl md:text-4xl text-white tracking-wide">
                    MY PLAN
                </h2>
                <p className="text-neutral-400 text-sm mt-1">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

                {/* Summar Table */}
            <div className="bg-[#0B0F19] border border-neutral-800 rounded-2xl grid grid-cols-3 divide-x divide-neutral-800 px-6 py-5">
                <div className='pl-8'>
                    <p className="text-[#8A92A0] text-xs uppercase tracking-wide">Exercises</p>
                    <h1 className="text-[#C2F800] font-extrabold text-5xl mt-1">{activeList.length}</h1>
                </div>
                <div className='pl-8'>
                    <p className="text-[#8A92A0] text-xs uppercase tracking-wide">Minutes</p>
                    <h1 className="text-white font-extrabold text-5xl mt-1">{totalMinutes}</h1>
                </div>
                <div className='pl-8'>
                    <p className="text-[#8A92A0] text-xs uppercase tracking-wide">Calories</p>
                    <h1 className="text-white font-extrabold text-5xl mt-1">{totalCalories}</h1>
                </div>
            </div>


            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-[#0B0F19] border border-neutral-800 rounded-full p-1">
                    <button
                        onClick={() => setActiveTab('today')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${activeTab === 'today'
                            ? 'bg-neutral-200 text-black'
                            : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${activeTab === 'saved'
                            ? 'bg-neutral-200 text-black'
                            : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        Saved
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-neutral-400 text-xs">Sort By</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortKey)}
                        className="bg-[#0B0F19] border border-neutral-700 text-white text-xs rounded-lg px-3 py-1.5 outline-none focus:border-[#C2F800]"
                    >
                        <option value="duration">Duration</option>
                        <option value="rating">Rating</option>
                        <option value="caloriesBurned">Calories</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                {activeList.length > 0 ? (
                    activeTab === 'today' ? (
                        activeList.map((exercise: ExerciseDataTypes) => (
                            <ListedExerciseCard
                                key={exercise.id}
                                exercise={exercise}
                                onRemove={() => removeFn(String(exercise.id))}
                            />
                        ))
                    ) : (
                        activeList.map((exercise: ExerciseDataTypes) => (
                            <ListedExerciseCardForSaved
                                key={exercise.id}
                                exercise={exercise}
                                onRemove={() => removeFn(String(exercise.id))}
                            />
                        ))
                    )
                ) : (
                    <div className="text-center text-lg font-semibold text-neutral-400 py-10">
                        {emptyMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

// New default export wraps the content in Suspense
const ListedExercise = () => {
    return (
        <Suspense fallback={null}>
            <ListedExerciseContent />
        </Suspense>
    );
};

export default ListedExercise;

