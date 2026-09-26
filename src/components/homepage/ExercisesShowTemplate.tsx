import { ExerciseDataTypes } from '@/types/excercise.type';
import React from 'react';
import ExerciseCard from './ExerciseCard';

const getExercisesData = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data = await res.json()
    return data;

}


const ExercisesShowTemplate = async () => {
    const excerciseData = await getExercisesData()
    console.log(excerciseData);
    return (

        <div className="container mx-auto py-8">
            <div className="mb-6">
                <h1 className='font-bold text-3xl text-white'>THE LIBRARY</h1>
                <p className='text-[#9CA3AF]'>Twelve lifts covering every major muscle group.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {excerciseData.map((exData: ExerciseDataTypes) => {
                    return <ExerciseCard key={exData.id} exData={exData} />
                })}
            </div>
        </div>
    );
};

export default ExercisesShowTemplate;