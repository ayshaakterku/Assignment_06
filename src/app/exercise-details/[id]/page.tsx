import Image from "next/image";
import AddTodayButton from "@/components/add-button/AddTodayButton";
import SavedLaterButton from "@/components/add-button/SavedLaterButton";

interface ExerciseDetailsType {
  params: Promise<{
    id: string;
  }>;
}

const ExerciseDetails = async ({ params }: ExerciseDetailsType) => {
  // const { id } = await params;
  // const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
  // const dataDetails = await res.json();
  // console.log(dataDetails);

  const { id } = await params;
  const res = await fetch(
      `https://api.api-store.workers.dev/api/fitlog/${id}`
  );

  if (!res.ok) {
  throw new Error(
    "Oops! We couldn’t load this exercise. Please try again in a moment."
  );
}

  const dataDetails = await res.json();




  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6 px-4 py-8">
      {/* Image */}
      <div className="p-2 w-full md:w-1/2">
        <Image
          src={dataDetails.image}
          alt="Exercise Model"
          width={588}
          height={735}
          className="rounded-2xl w-full h-[400px] md:h-[650px] object-cover"
        />
      </div>

      {/* All contents */}
      <div className="w-full md:w-1/2">
        {/* Content */}
        <div className="px-4 pb-4 pt-1">
          {/* Title */}
          <h1 className="uppercase font-extrabold text-2xl text-white tracking-wide">
            {dataDetails.name}
          </h1>

          {/* Description */}
          <p className="text-neutral-300 text-sm mt-2 mb-4 leading-relaxed">
            {dataDetails.description}
          </p>

          {/* Muscle group badges */}
          <div className="flex gap-2 flex-wrap mb-4">
            {dataDetails.muscleGroups.map((item: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-[#C2F800] px-3 py-1 text-xs uppercase text-black font-bold tracking-wide"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Table */}
          <div className="bg-[#0B0F19] border border-neutral-800 rounded-2xl overflow-hidden w-full max-w-md mb-6">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-dashed border-neutral-700">
                  <td className="py-4 px-5 text-neutral-400 text-xs uppercase tracking-wider font-medium">
                    Equipment
                  </td>
                  <td className="py-4 px-5 text-white text-sm text-right">
                    {dataDetails.equipment}
                  </td>
                </tr>
                <tr className="border-b border-dashed border-neutral-700">
                  <td className="py-4 px-5 text-neutral-400 text-xs uppercase tracking-wider font-medium">
                    Difficulty
                  </td>
                  <td className="py-4 px-5 text-white text-sm text-right">
                    {dataDetails.difficulty}
                  </td>
                </tr>
                <tr className="border-b border-dashed border-neutral-700">
                  <td className="py-4 px-5 text-neutral-400 text-xs uppercase tracking-wider font-medium">
                    Sets
                  </td>
                  <td className="py-4 px-5 text-white text-sm text-right">
                    {dataDetails.sets}
                  </td>
                </tr>
                <tr className="border-b border-dashed border-neutral-700">
                  <td className="py-4 px-5 text-neutral-400 text-xs uppercase tracking-wider font-medium">
                    Reps
                  </td>
                  <td className="py-4 px-5 text-white text-sm text-right">
                    {dataDetails.reps}
                  </td>
                </tr>
                <tr className="border-b border-dashed border-neutral-700">
                  <td className="py-4 px-5 text-neutral-400 text-xs uppercase tracking-wider font-medium">
                    Duration
                  </td>
                  <td className="py-4 px-5 text-white text-sm text-right">
                    {dataDetails.duration} min
                  </td>
                </tr>
                <tr className="border-b border-dashed border-neutral-700">
                  <td className="py-4 px-5 text-neutral-400 text-xs uppercase tracking-wider font-medium">
                    Calories
                  </td>
                  <td className="py-4 px-5 text-white text-sm text-right">
                    {dataDetails.caloriesBurned} kcal
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 text-neutral-400 text-xs uppercase tracking-wider font-medium">
                    Rating
                  </td>
                  <td className="py-4 px-5 text-white text-sm text-right">
                    {dataDetails.rating}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Instructions */}
          <h2 className="font-bold text-white text-lg mb-2">INSTRUCTIONS</h2>
          <ol className="flex flex-col gap-3 mb-6 list-decimal list-inside marker:text-[#C2F800] marker:font-bold">
            {dataDetails.instructions.map((item: string, index: number) => (
              <li
                key={index}
                className="text-neutral-300 text-sm leading-relaxed pl-1"
              >
                {item}
              </li>
            ))}
          </ol>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            {/* <button className="flex items-center gap-2 border border-[#C2F800] rounded bg-[#C2F800] px-4 py-2 text-sm font-bold text-black transition hover:bg-transparent hover:text-[#C2F800]">
                            <FaRegCalendarPlus />
                            Add to today's plan
                        </button> */}

            <AddTodayButton exercise={dataDetails} />

            {/* <button className="flex items-center gap-2 border border-[#C2F800] rounded text-white px-4 py-2 text-sm font-bold transition hover:bg-[#C2F800] hover:text-black">
                            <FaRegBookmark />
                            Save for later
                        </button> */}

            <SavedLaterButton exercise={dataDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;
