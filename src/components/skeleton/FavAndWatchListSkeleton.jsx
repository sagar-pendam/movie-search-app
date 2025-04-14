import React from 'react'

function FavAndWatchListSkeleton() {
    return (
        <ul className='flex flex-col items-center backdrop-blur-sm bg-slate-900 shadow-slate-900 text-white shadow-lg p-5 border rounded-lg justify-center gap-4 w-full'>
            {[1, 2, 3].map((_, index) => (
                <li key={index} className='w-full'>
                    <div className='movie-cart mt-4 px-4 gap-4 w-full py-2 flex items-center justify-around border rounded-lg animate-pulse'>
                        <div className='w-16 h-16 rounded-md bg-gray-300'></div>
                        <div className='flex flex-col gap-2 w-[80%]'>
                            <div className='h-5 bg-gray-300 w-40 rounded'></div>
                            <div className='w-full h-[1px] bg-gray-400'></div>
                            <div className='flex flex-col gap-1'>
                                <div className='h-4 bg-gray-300 w-24 rounded'></div>
                                <div className='flex gap-2 items-center text-sm'>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='h-4 w-10 bg-gray-300 rounded'></div>
                                </div>
                            </div>
                        </div>
                        <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
                    </div>
                </li>
            ))}
        </ul>

    )
}

export default FavAndWatchListSkeleton
