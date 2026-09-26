import Image from 'next/image';
import Link from 'next/link';
import bannerImage from "../../assets/banner.png"

const Banner = () => {
    return (
        <section className="container mx-auto mt-8 flex items-center justify-between gap-6 border rounded-2xl border-[#222630] bg-[#15171D] px-6 py-8">


            {/* Left Content */}
            <div className="w-[55%] pl-10">
                <p className="mb-2 text-sm font-bold tracking-widest text-[#C2F800]">
                    WORKOUT LIBRARY
                </p>

                <h1 className="mb-3 text-3xl font-extrabold leading-tight text-white">
                    TRAIN WITH INTENT. LOG
                    <br />
                    EVERY SET.
                </h1>

                <p className="mb-5 max-w-lg text-sm leading-6 text-[#9CA3AF]">
                    FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
                    today's plan, and watch the week's work add up.
                </p>

                <Link
                    href=""
                    className="inline-block border border-[#C2F800] rounded bg-[#C2F800] px-4 py-2 text-sm font-bold text-black transition hover:bg-transparent hover:text-[#C2F800]"
                >
                    BROWSE WORKOUTS
                </Link>
            </div>

            {/* Image */}
            <div className="w-[25%]">
                <Image
                    src={bannerImage}
                    alt="Workout banner"
                    className="h-auto w-full object-cover"
                    priority
                />
            </div>

        </section>
    );
};

export default Banner;