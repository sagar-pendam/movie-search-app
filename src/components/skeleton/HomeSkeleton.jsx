import React from 'react'
import { Link } from 'react-router-dom'
function HomeSkeleton() {
    return (
        <div className='w-full flex flex-wrap gap-4 items-center justify-around '>
        {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className='border bg-[#593392] backdrop:blur-3xl text-white sm:min-w-[32%] sm:max-w-[50%] max-w-[80%] min-w-[80%] md:max-w-[30%] md:min-w-[30%] lg:max-w-[25%] lg:min-w-[25%] py-6 px-4 flex flex-col items-center gap-4 rounded-md'>

                <div className='w-48 h-60 rounded-sm bg-gray-300 animate-pulse'></div>

                {/* Movie details */}
                <div className='flex flex-col items-start gap-4 w-full'>
                    <h1 className='bg-gray-300 px-4 py-4 rounded-md w-full  animate-pulse'></h1>
                    <h1 className='bg-gray-300 px-4 py-4 rounded-md w-24 animate-pulse'></h1>
                    <h1 className='bg-gray-300 px-4 py-4 rounded-md w-20 animate-pulse'></h1>
                    <button className='bg-gray-300 px-4 py-4 rounded-md w-24 animate-pulse'> </button>
                </div>
                <div className='fav-watch-list flex items-center justify-between w-full'>
                    <div className='bg-gray-300 animate-pulse w-10 h-10 rounded-md'>

                    </div>
                    <div className='bg-gray-300 animate-pulse w-10 h-10 rounded-md'>

                    </div>

                    </div>
                

            </div>
        ))}

    </div>
    )
}

export default HomeSkeleton
