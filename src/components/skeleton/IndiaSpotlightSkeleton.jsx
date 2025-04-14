import React from 'react'

function IndiaSpotlightSkeleton() {
    return (

        <div className='flex flex-wrap items-center justify-around gap-4'>
            {/* show movie list */}
            {/* movie card */}
            {Array(50).fill(0).map((_, index) => (
                <div key={index} className='flex cursor-pointer hover:bg-[#434242] hover:text-white hover:border-slate-600 border-2 transition-all duration-300  flex-wrap  backdrop-blur-lg   px-4 py-4 rounded-lg shadow-sm  justify-center gap-4 w-full'>
                    {/* left side */}
                    <div className='left-box flex flex-col gap-4 w-auto'>
                        {/* <img className='w-16 h-16 rounded-md' src={movie.primaryImage || '/placeholder.jpg'} alt={movie.originalTitle} /> */}
                        <div className='w-16 h-16 rounded-md bg-gray-200 animate-pulse'></div>
                        <div className='w-16 h-4 rounded-md bg-gray-200 animate-pulse'></div>
                        {/* <p>{convertMinutes(movie.runtimeMinutes)}</p> */}
                    </div>
                    {/* horizontal line */}
                    {/* <div className='w-[2px]   bg-gray-200 rounded-full '>
               </div> */}
                    {/* right side */}
                    <div className='flex flex-col w-[79%] gap-4'>
                        <div className='w-[60%] h-4 bg-gray-200 animate-pulse rounded-lg'></div>

                        {/* release dt and rating dt */}
                        <div className='flex gap-4 flex-wrap w-full '>
                            <div className='flex gap-4 sm:w-[40%] w-[50%] '>
                                {/* <span className='flex gap-2'> <Star className='fill-yellow-400 text-yellow-400 w-4' /> 8 / 10</span> */}
                                <div className='w-[25%] h-6 bg-yellow-200 animate-pulse rounded-lg'></div>
                                <div className='w-[60%] h-4 bg-gray-200 animate-pulse rounded-lg'></div>
                            </div>
                            <div className='w-[2px] sm:flex hidden  bg-gray-200 rounded-full '>
                            </div>
                            <div className='flex gap-2 items-center  sm:w-[43%] w-full'>
                                <div className='min-w-[40%] h-4 bg-gray-200 animate-pulse rounded-lg'></div>:
                                <div className='min-w-[34%] h-4 bg-gray-200 animate-pulse rounded-lg'></div>
                            </div>
                            {/* <p className='font-semibold'>Language : <span className='font-extralight'>English</span></p> */}
                        </div>
                        {/* Genrens Details */}
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='min-w-[28%] max-w-[30%] h-4 bg-gray-200 animate-pulse rounded-lg'></div>

                            <ul className='flex overflow-x-auto gap-2 py-2 w-full'>

                                {/* {movie.genres?.length > 0 && movie.genres.map((genre) => {
                                    return <li key={genre} className='px-4 py-1 rounded-full border max-w-fit font-light text-sm  bg-slate-900 text-white shadow-slate-400'>{genre}</li>
                                })} */}
                                {Array(3).fill(0).map((_, index) => {
                                    return <li key={index} className='w-[25%] h-8 bg-gray-200 animate-pulse rounded-full' ></li>
                                })}
                            </ul>
                        </div>
                        {/* more details */}


                        <div className='w-[34%] h-4 bg-gray-200 animate-pulse rounded-lg'></div>

                        <div className='flex items-center justify-between w-auto  gap-2'>

                            <div className='w-[12%] h-8 bg-red-200 animate-pulse rounded-lg'>

                            </div>
                            <div className='w-[12%] h-8 bg-gray-200 animate-pulse rounded-lg'>

                            </div>
                        </div>
                    </div>


                </div>

            ))}
        </div>
    )
}

export default IndiaSpotlightSkeleton
