import { ExerciseDataTypes } from '@/types/excercise.type';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';
import { GoFlame } from 'react-icons/go';
import { MdOutlineWatchLater } from 'react-icons/md';


interface IExerciseDataTypes{
    exData: ExerciseDataTypes
}

const ExerciseCard = ({exData}:IExerciseDataTypes) => {
    return (
            <Link
                key={exData.id}
                href={`/exercise-details/${exData.id}`}
                className="block bg-[#0D0D0D] border border-neutral-800 rounded-3xl overflow-hidden w-full hover:border-neutral-700 transition-colors"
            >
                {/* Image */}
                <div className="p-2">
                    <Image
                        src={exData.image}
                        alt="Exercise Model"
                        width={400}
                        height={220}
                        className="rounded-2xl w-full h-[220px] object-cover"
                    />
                </div>

                {/* Content */}
                <div className="px-4 pb-4 pt-1">
                    {/* Muscle group badges */}
                    <div className="flex gap-2 flex-wrap mb-3">
                        {exData.muscleGroups.map((item, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-[#C2F800] px-3 py-1 text-xs uppercase text-black font-bold tracking-wide"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="uppercase font-extrabold text-xl text-white tracking-wide">
                        {exData.name}
                    </h1>

                    {/* Equipment */}
                    <p className="text-neutral-400 text-sm mt-1">
                        {exData.equipment}
                    </p>

                    <hr className="border-neutral-800 my-3" />

                    {/* Stats row */}
                    <div className="flex items-center gap-5 text-neutral-300 text-sm">
                        <p className="flex items-center gap-1.5">
                            <MdOutlineWatchLater className="text-neutral-400" />
                            {exData.duration} min
                        </p>
                        <p className="flex items-center gap-1.5">
                            <GoFlame className="text-neutral-400" />
                            {exData.caloriesBurned} kcal
                        </p>
                        <p className="flex items-center gap-1.5">
                            <FaRegStar className="text-[#C2F800]" />
                            {exData.rating}
                        </p>
                    </div>
                </div>
            </Link>
        
    );
};

export default ExerciseCard;