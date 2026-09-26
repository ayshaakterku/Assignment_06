'use client'

import React, { useContext } from 'react';
import { ExerciseContext } from '@/context/ExerciseContext';
import { ExerciseDataTypes } from '@/types/excercise.type';
import { toast } from 'react-toastify';
import { FaRegBookmark } from 'react-icons/fa';

const SavedLaterButton = ({ exercise }: { exercise: ExerciseDataTypes }) => {

    const {
        savedExercise,
        setSavedExercise,
        todayExercise,
    } = useContext(ExerciseContext);

    const isSaved = savedExercise.some(
        (ex: ExerciseDataTypes) => ex.id === exercise.id
    );

    const isAdded = todayExercise.some(
        (ex: ExerciseDataTypes) => ex.id === exercise.id
    );

    const handleSavedForLater = () => {

        if (isSaved) {
            setSavedExercise(
                savedExercise.filter(
                    (ex: ExerciseDataTypes) => ex.id !== exercise.id
                )
            );

            toast.info(`Removed from saved: ${exercise.name}`);
        } else {
            setSavedExercise([...savedExercise, exercise]);

            toast.success(`Saved: ${exercise.name}`);
        }
    };

    return (
        <button
            disabled={isAdded}
            className="flex items-center gap-2 border border-[#C2F800] rounded text-white px-4 py-2 text-sm font-bold transition hover:bg-[#C2F800] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleSavedForLater}
        >
            <FaRegBookmark />
            {isSaved ? "Saved" : "Save for later"}
        </button>
    );
};

export default SavedLaterButton;


// 'use client'
// import React, { useContext } from 'react';
// import { ExerciseContext } from '@/context/ExerciseContext';
// import { ExerciseDataTypes } from '@/types/excercise.type';
// import { toast } from 'react-toastify';
// import { FaRegBookmark } from 'react-icons/fa';

// const SavedLaterButton = ({ exercise }: { exercise: ExerciseDataTypes }) => {

//     const { savedExercise, setSavedExercise } = useContext(ExerciseContext);

//     const handleSavedForLater = () => {
//         console.log('Saved Later Exercise triggered');
//         setSavedExercise([...savedExercise, exercise])
//         toast.success(`You have successfully add: ${exercise.name}`)
//         console.log("todayExercise:", savedExercise);
//     }

//     const isSaved = savedExercise.some(
//         (ex: ExerciseDataTypes) => ex.id === exercise.id
//     );

//     return (
//         <button
//             disabled={isSaved}
//             className="flex items-center gap-2 border border-[#C2F800] rounded text-white px-4 py-2 text-sm font-bold transition hover:bg-[#C2F800] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
//             onClick={handleSavedForLater}
//         >
//             <FaRegBookmark />
//             {isSaved ? "Saved" : "Save for later"}
//         </button>
//     );
// };

// export default SavedLaterButton;


// 'use client'
// import React, { useContext } from 'react';
// import { ExerciseContext } from '@/context/ExerciseContext';
// import { ExerciseDataTypes } from '@/types/excercise.type';
// import { toast } from 'react-toastify';
// import { FaRegBookmark } from 'react-icons/fa';

// const SavedLaterButton = ({ exercise }: { exercise: ExerciseDataTypes }) => {

//     const { savedExercise, setSavedExercise } = useContext(ExerciseContext);

//     const handleSavedForLater = () => {
//         console.log('Saved Later Exercise triggered');
//         setSavedExercise([...savedExercise, exercise])
//         toast.success(`You have successfully add: ${exercise.name}`)
//         console.log("todayExercise:", savedExercise);
//     }

//     return (
//         <button className="flex items-center gap-2 border border-[#C2F800] rounded text-white px-4 py-2 text-sm font-bold transition hover:bg-[#C2F800] hover:text-black" onClick={handleSavedForLater}>
//         <FaRegBookmark />
//         Save for later
//     </button>
//     );
// };

// export default SavedLaterButton;