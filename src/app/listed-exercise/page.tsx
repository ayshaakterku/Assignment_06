'use client'
import { ExerciseContext } from '@/context/ExerciseContext';
import { ExerciseDataTypes } from '@/types/excercise.type';
import React, { useContext, useState, Suspense } from 'react';
import Image from "next/image";

import ListedExerciseCard from '@/components/ListedExerciseCard';
import { MdOutlineWatchLater } from 'react-icons/md';
import { GoFlame } from 'react-icons/go';
import { FaRegStar } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { IoCheckmarkOutline } from 'react-icons/io5';

import { toast, Bounce } from 'react-toastify';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'; // ADDED

const toastOptions = {
    position: 'top-center' as const,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light' as const,
    transition: Bounce,
}

type SortKey = 'duration' | 'rating' | 'caloriesBurned' | '';
type TabKey = 'today' | 'saved';

const ListedExercise = () => {

    const { todayExercise, setTodayExercise, savedExercise, setSavedExercise } = useContext(ExerciseContext);

    const [sortBy, setSortBy] = useState<SortKey>('duration');

    // --- URL-synced tab state (ADDED) ---
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
    // --- end addition ---

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

    const totalMinutes = todayExercise.reduce(
        (sum: number, ex: ExerciseDataTypes) => sum + Number(ex.duration),
        0
    );
    const totalCalories = todayExercise.reduce(
        (sum: number, ex: ExerciseDataTypes) => sum + Number(ex.caloriesBurned),
        0
    );

    function removeToadyExById(id: string) {
        const todayEx = todayExercise.find((t: ExerciseDataTypes) => String(t.id) === id)
        if (todayEx) {
            toast.success(`${todayEx.name} removed from your stack`, toastOptions)
        }
        setTodayExercise((prev: ExerciseDataTypes[]) => prev.filter((t: ExerciseDataTypes) => String(t.id) !== id))
    };

    function removeSavedExById(id: string) {
        const savedEx = savedExercise.find((t: ExerciseDataTypes) => String(t.id) === id)
        if (savedEx) {
            toast.success(`${savedEx.name} removed from your stack`, toastOptions)
        }
        setSavedExercise((prev: ExerciseDataTypes[]) => prev.filter((t: ExerciseDataTypes) => String(t.id) !== id))
    }

    const activeList = activeTab === 'today' ? sortedTodayExercise : sortedSavedExercise;
    const removeFn = activeTab === 'today' ? removeToadyExById : removeSavedExById;

    // ... rest of your JSX stays EXACTLY the same, including the tab buttons which already call setActiveTab('today') / setActiveTab('saved')
    const emptyMessage = (
        <div className="flex flex-col items-center justify-center text-center bg-[#0B0F19] rounded-2xl px-6 py-14">
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

            {/* Header */}
            <div>
                <h2 className="font-extrabold text-3xl md:text-4xl text-white tracking-wide">
                    MY PLAN
                </h2>
                <p className="text-neutral-400 text-sm mt-1">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            {/* Stats panel */}
            <div className="bg-[#0B0F19] border border-neutral-800 rounded-2xl grid grid-cols-3 px-6 py-5">
                <div>
                    <p className="text-[#8A92A0] text-xs uppercase tracking-wide">Exercises</p>
                    <h1 className="text-[#C2F800] font-extrabold text-2xl mt-1">{todayExercise.length}</h1>
                </div>
                <div>
                    <p className="text-[#8A92A0] text-xs uppercase tracking-wide">Minutes</p>
                    <h1 className="text-white font-extrabold text-2xl mt-1">{totalMinutes}</h1>
                </div>
                <div>
                    <p className="text-[#8A92A0] text-xs uppercase tracking-wide">Calories</p>
                    <h1 className="text-white font-extrabold text-2xl mt-1">{totalCalories}</h1>
                </div>
            </div>

            {/* Tabs + Sort */}
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

            {/* Exercise list */}
            <div className="space-y-3">
                {activeList.length > 0 ? (
                    activeList.map((exercise: ExerciseDataTypes) => (
                        <ListedExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            onRemove={() => removeFn(String(exercise.id))}
                        />
                    ))
                ) : (
                    <div className="text-center text-lg font-semibold text-neutral-400 py-10">
                        {emptyMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListedExercise;
// 'use client'
// import { ExerciseContext } from '@/context/ExerciseContext';
// import { ExerciseDataTypes } from '@/types/excercise.type';
// import React, { useContext, useState } from 'react';
// import Image from "next/image";

// import ListedExerciseCard from '@/components/ListedExerciseCard';
// import { MdOutlineWatchLater } from 'react-icons/md';
// import { GoFlame } from 'react-icons/go';
// import { FaRegStar } from 'react-icons/fa';
// import { RxCross2 } from 'react-icons/rx';
// import { IoCheckmarkOutline } from 'react-icons/io5';

// import { toast, Bounce } from 'react-toastify';
// import Link from 'next/link';

// const toastOptions = {
//     position: 'top-center' as const,
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: 'light' as const,
//     transition: Bounce,
// }




// type SortKey = 'duration' | 'rating' | 'caloriesBurned' | '';
// type TabKey = 'today' | 'saved';

// const ListedExercise = () => {

//     const { todayExercise, setTodayExercise, savedExercise, setSavedExercise } = useContext(ExerciseContext);

//     const [sortBy, setSortBy] = useState<SortKey>('duration');
//     const [activeTab, setActiveTab] = useState<TabKey>('today');

//     const sortExercise = (exercise: ExerciseDataTypes[]) => {
//         const sortedExercise = [...exercise];
//         if (sortBy === "duration") {
//             sortedExercise.sort((a, b) => b.duration - a.duration)
//         } else if (sortBy === "rating") {
//             sortedExercise.sort((a, b) => b.rating - a.rating)
//         } else if (sortBy === "caloriesBurned") {
//             sortedExercise.sort((a, b) => b.caloriesBurned - a.caloriesBurned)
//         }
//         return sortedExercise
//     }

//     const sortedTodayExercise = sortExercise(todayExercise);
//     const sortedSavedExercise = sortExercise(savedExercise);

//     const totalMinutes = todayExercise.reduce(
//         (sum: number, ex: ExerciseDataTypes) => sum + Number(ex.duration),
//         0
//     );
//     const totalCalories = todayExercise.reduce(
//         (sum: number, ex: ExerciseDataTypes) => sum + Number(ex.caloriesBurned),
//         0
//     );

//     // Individual Id removed from stack list
//     function removeToadyExById(id: string) {
//         const todayEx = todayExercise.find((t: ExerciseDataTypes) => String(t.id) === id)
//         if (todayEx) {
//             toast.success(`${todayEx.name} removed from your stack`, toastOptions)
//         }
//         setTodayExercise((prev: ExerciseDataTypes[]) => prev.filter((t: ExerciseDataTypes) => String(t.id) !== id))
//     };

//     function removeSavedExById(id: string) {
//         const savedEx = savedExercise.find((t: ExerciseDataTypes) => String(t.id) === id)
//         if (savedEx) {
//             toast.success(`${savedEx.name} removed from your stack`, toastOptions)
//         }
//         setSavedExercise((prev: ExerciseDataTypes[]) => prev.filter((t: ExerciseDataTypes) => String(t.id) !== id))
//     }

//     const activeList = activeTab === 'today' ? sortedTodayExercise : sortedSavedExercise;
//     const removeFn = activeTab === 'today' ? removeToadyExById : removeSavedExById;

















// 'use client'
// import { ExerciseContext } from '@/context/ExerciseContext';
// import { ExerciseDataTypes } from '@/types/excercise.type';
// import React, { useContext, useState } from 'react';
// import Image from "next/image";

// import ListedExerciseCard from '@/components/ListedExerciseCard';
// import { MdOutlineWatchLater } from 'react-icons/md';
// import { GoFlame } from 'react-icons/go';
// import { FaRegStar } from 'react-icons/fa';
// import { RxCross2 } from 'react-icons/rx';
// import { IoCheckmarkOutline } from 'react-icons/io5';

// import { toast, Bounce } from 'react-toastify';

// const toastOptions = {
//   position: 'top-center' as const,
//   autoClose: 2000,
//   hideProgressBar: false,
//   closeOnClick: false,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: 'light' as const,
//   transition: Bounce,
// }

// const ListedExercise = () => {

//     const { todayExercise, setTodayExercise, savedExercise, setSavedExercise } = useContext(ExerciseContext);

//     const [sortBy, setSortBy] = useState<
//         'duration' | 'rating' | 'caloriesBurned' | ''
//     >('');

//     const sortExercise = (exercise: ExerciseDataTypes[]) => {
//         const sortedExercise = [...exercise];
//         if (sortBy === "duration") {
//             sortedExercise.sort((a, b) => b.duration - a.duration)
//         } else if (sortBy === "rating") {
//             sortedExercise.sort((a, b) => b.rating - a.rating)
//         } else if (sortBy === "caloriesBurned") {
//             sortedExercise.sort((a, b) => b.caloriesBurned - a.caloriesBurned)
//         }
//         return sortedExercise
//     }

//     const sortedTodayExercise = sortExercise(todayExercise);
//     const sortedSavedExercise = sortExercise(savedExercise);

//     // Individual Id removed from stack list
//     function removeToadyExById(id: string) {
//         const todayEx = todayExercise.find((t:ExerciseDataTypes) => String(t.id) === id)
//         if (todayEx) {
//             toast.success(`${todayEx.name} removed from your stack`, toastOptions)
//         }
//         setTodayExercise((prev:ExerciseDataTypes[]) => prev.filter((t:ExerciseDataTypes) => String(t.id) !== id))
//     };

//     function removeSavedExById(id: string) {
//         const toadySave = savedExercise.find((t:ExerciseDataTypes) => String(t.id) === id)
//         if (toadySave) {
//             toast.success(`${toadySave.name} removed from your stack`, toastOptions)
//         }
//         savedExercise((prev:ExerciseDataTypes[]) => prev.filter((t:ExerciseDataTypes) => String(t.id) !== id))
//     }


//     return (
//         <div className="space-y-3 container mx-auto py-[20px]">



//             <h2 className="my-2 rounded-3xl py-2  font-bold text-4xl text-left stroke-10" >
//                 MY PLAN
//             </h2>
//             <p>Cap of five lifts for today. Finish them, then load more.</p>

//             <div className='bg-[#14171E] grid grid-cols-3'>
//                 <div>
//                     <p className='text-[#8A92A0]'>Exercise</p>
//                     <h1 className='text-[#C2F800] '>{todayExercise.length}</h1>
//                 </div>
//                 <div>
//                     <p className='text-[#8A92A0]'>Minutes</p>
//                     <h1 className="text-white">
//                         {todayExercise.reduce(
//                             (sum: number, ex: ExerciseDataTypes) => sum + Number(ex.duration),
//                             0
//                         )}
//                     </h1>
//                 </div>
//                 <div>
//                     <p className='text-[#8A92A0]'>Calories</p>
//                     <h1 className="text-white">
//                         {todayExercise.reduce(
//                             (sum: number, ex: ExerciseDataTypes) => sum + Number(ex.caloriesBurned),
//                             0
//                         )}
//                     </h1>
//                 </div>
//             </div>




//             {/* Sorting */}
//             <div className="text-right">
//                 <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value as 'duration' | 'rating' | 'caloriesBurned' | '')}
//                     defaultValue="Pick a Runtime"
//                     className="select select-success">
//                     <option disabled={true}>Sort by</option>
//                     <option value={"duration"}>Duration</option>
//                     <option value={'rating'}>Rating</option>
//                     <option value={'caloriesBurned'}>Calories</option>
//                 </select>
//             </div>

//             {/* name of each tab group should be unique */}
//             <div className="tabs tabs-border">
//                 <input type="radio" name="my_tabs_2" className="tab" aria-label={`Today's Plan: (${todayExercise.length})`} />
//                 <div className="space-y-2 tab-content border-base-300 bg-base-100 p-10">

//                     {/* With sorting system */}
//                     {sortedTodayExercise.length > 0 ? sortedTodayExercise.map((exercise: ExerciseDataTypes) => {
//                         return (
//                             <div key={exercise.id} className="flex items-center gap-4 w-full bg-[#0B0F19] border border-neutral-800 rounded-2xl px-4 py-3">
//                                 {/* Thumbnail */}
//                                 <div className="shrink-0">
//                                     <Image
//                                         src={exercise.image}
//                                         alt={exercise.name}
//                                         width={64}
//                                         height={64}
//                                         className="rounded-xl w-16 h-16 object-cover"
//                                     />
//                                 </div>

//                                 {/* Name / equipment / stats */}
//                                 <div className="flex-1 min-w-0">
//                                     <h3 className="uppercase font-extrabold text-white text-sm tracking-wide truncate">
//                                         {exercise.name}
//                                     </h3>
//                                     <p className="text-neutral-400 text-xs mt-0.5">
//                                         {exercise.equipment}
//                                     </p>

//                                     <div className="flex items-center gap-4 mt-1.5">
//                                         <div className="flex items-center gap-1 text-neutral-300 text-xs">
//                                             <MdOutlineWatchLater className="text-neutral-400" />
//                                             {exercise.duration} min
//                                         </div>
//                                         <div className="flex items-center gap-1 text-neutral-300 text-xs">
//                                             <GoFlame className="text-neutral-400" />
//                                             {exercise.caloriesBurned} kcal
//                                         </div>
//                                         <div className="flex items-center gap-1 text-neutral-300 text-xs">
//                                             <FaRegStar className="text-[#C2F800]" />
//                                             {exercise.rating}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Actions */}
//                                 <div className="flex items-center gap-3 shrink-0">
//                                     <button className="rounded-full border border-neutral-600 text-white text-xs font-semibold px-4 py-2 transition hover:border-[#C2F800] hover:text-[#C2F800]">
//                                         View Details
//                                     </button>

//                                     <button className="flex items-center gap-1.5 rounded-full bg-[#C2F800] text-black text-xs font-bold px-4 py-2 transition hover:bg-[#a9dd00]">
//                                         <IoCheckmarkOutline strokeWidth={10} />
//                                         Mark as Done
//                                     </button>

//                                     <button
//                                         onClick={()=>removeToadyExById(String(exercise.id))}
//                                         aria-label="Remove"
//                                         className="text-neutral-500 hover:text-white transition ml-1"
//                                     >
//                                         <RxCross2 className='font-bold' />
//                                     </button>
//                                 </div>
//                             </div>)
//                     }) : <p className="text-center text-lg font-semibold">No read book found</p>}



//                 </div>


//                 <input type="radio" name="my_tabs_2" className="tab" aria-label={`Saved: (${savedExercise.length})`} defaultChecked />
//                 <div className="space-y-3 tab-content border-base-300 bg-base-100 p-10">

//                     {/* With sorting system */}
//                     {sortedSavedExercise.length > 0 ? sortedSavedExercise.map((exercise: ExerciseDataTypes) => {
//                         return (<div key={exercise.id} className="flex items-center gap-4 w-full bg-[#0B0F19] border border-neutral-800 rounded-2xl px-4 py-3">
//                             {/* Thumbnail */}
//                             <div className="shrink-0">
//                                 <Image
//                                     src={exercise.image}
//                                     alt={exercise.name}
//                                     width={64}
//                                     height={64}
//                                     className="rounded-xl w-16 h-16 object-cover"
//                                 />
//                             </div>

//                             {/* Name / equipment / stats */}
//                             <div className="flex-1 min-w-0">
//                                 <h3 className="uppercase font-extrabold text-white text-sm tracking-wide truncate">
//                                     {exercise.name}
//                                 </h3>
//                                 <p className="text-neutral-400 text-xs mt-0.5">
//                                     {exercise.equipment}
//                                 </p>

//                                 <div className="flex items-center gap-4 mt-1.5">
//                                     <div className="flex items-center gap-1 text-neutral-300 text-xs">
//                                         <MdOutlineWatchLater className="text-neutral-400" />
//                                         {exercise.duration} min
//                                     </div>
//                                     <div className="flex items-center gap-1 text-neutral-300 text-xs">
//                                         <GoFlame className="text-neutral-400" />
//                                         {exercise.caloriesBurned} kcal
//                                     </div>
//                                     <div className="flex items-center gap-1 text-neutral-300 text-xs">
//                                         <FaRegStar className="text-[#C2F800]" />
//                                         {exercise.rating}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Actions */}
//                             <div className="flex items-center gap-3 shrink-0">
//                                 <button className="rounded-full border border-neutral-600 text-white text-xs font-semibold px-4 py-2 transition hover:border-[#C2F800] hover:text-[#C2F800]">
//                                     View Details
//                                 </button>

//                                 <button className="flex items-center gap-1.5 rounded-full bg-[#C2F800] text-black text-xs font-bold px-4 py-2 transition hover:bg-[#a9dd00]">
//                                     <IoCheckmarkOutline strokeWidth={10} />
//                                     Mark as Done
//                                 </button>

//                                 <button
//                                     onClick={()=>removeSavedExById(String(exercise.id))}
//                                     aria-label="Remove"
//                                     className="text-neutral-500 hover:text-white transition ml-1"
//                                 >
//                                     <RxCross2 className='font-bold' />
//                                 </button>
//                             </div>
//                         </div>)
//                     }) : <p className="text-center text-lg font-semibold">No wishlist book found</p>}


//                 </div>


//             </div>
//         </div>
//     );
// };

// export default ListedExercise;