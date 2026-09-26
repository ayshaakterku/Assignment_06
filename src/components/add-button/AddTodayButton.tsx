'use client'
import React, { useContext } from 'react';
import { ExerciseContext } from '@/context/ExerciseContext';
import { ExerciseDataTypes } from '@/types/excercise.type';
import { toast } from 'react-toastify';
import { FaRegCalendarPlus } from 'react-icons/fa';


const AddTodayButton = ({ exercise }: { exercise: ExerciseDataTypes }) => {

    // const [ todayExercise, setTodayExercise ] = useContext(ExerciseContext);
    const { todayExercise, setTodayExercise } = useContext(ExerciseContext);

    const handleTodayExercise = () => {
        console.log('Toady Exercise triggered');
        setTodayExercise([...todayExercise, exercise])
        toast.success(`You have successfully add: ${exercise.name}`)
        console.log("todayExercise:", todayExercise);
    }

    return (
        <button className="flex items-center gap-2 border border-[#C2F800] rounded bg-[#C2F800] px-4 py-2 text-sm font-bold text-black transition hover:bg-transparent hover:text-[#C2F800]" onClick={handleTodayExercise}>
            <FaRegCalendarPlus />
            Add to today's plan
        </button>
    );
};

export default AddTodayButton;





{/* <div className="flex gap-3 flex-wrap">
    <button className="flex items-center gap-2 border border-[#C2F800] rounded bg-[#C2F800] px-4 py-2 text-sm font-bold text-black transition hover:bg-transparent hover:text-[#C2F800]">
        <FaRegCalendarPlus />
        Add to today's plan
    </button>

    <button className="flex items-center gap-2 border border-[#C2F800] rounded text-white px-4 py-2 text-sm font-bold transition hover:bg-[#C2F800] hover:text-black">
        <FaRegBookmark />
        Save for later
    </button>
</div>
                </div > */}