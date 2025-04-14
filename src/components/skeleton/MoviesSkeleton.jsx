import React, { useState, useRef, useEffect } from 'react'

import { Link } from 'react-router-dom';


function MoviesSkeleton() {
   
    return (
        

           
            
            <div className='flex flex-wrap gap-4 min-h-screen w-[80%] bg-[#939393] mx-auto justify-around items-center py-8 border rounded-md'>

           
                { Array(50).fill(0).map((_,index) => {

                    return <div key={index} className='movie-cart backdrop:blur-3xl flex text-white justify-center items-center  bg-white border px-4 py-4 gap-8  md:max-w-[40%] sm:flex-col sm:w-[60%] w-[90%] h-[520px] overflow-y-auto sm:flex- flex-col'>
                        {/* <img className='w-40 h-44' src={movie.primaryImage} /> */}
                        <div className='w-40 h-44 bg-gray-200 animate-pulse' ></div>
                        <div className='flex flex-col gap-2 items-center justify-center w-full'>

                            <div className='bg-gray-200 min-w-[80%] animate-pulse h-4 rounded-lg'></div>
                            <div className='bg-gray-200 min-w-[40%] animate-pulse h-4 rounded-lg'></div>
                            <div className='bg-gray-200 min-w-[40%] animate-pulse h-4 rounded-lg'></div>
                            <div className='w-full  items-center justify-center flex gap-2 '>
                                <div className='bg-gray-200 w-[12%] animate-pulse h-8 rounded-lg'></div>
                                <div className='bg-gray-200 w-[16%] animate-pulse h-4 rounded-lg'></div>
                            </div>
                            <div className='bg-gray-200 w-[16%] animate-pulse h-4 rounded-lg'></div>
                            <div className='bg-gray-200 w-[20%] animate-pulse h-4 rounded-lg'></div>


                            <div className='bg-gray-200 w-[24%] animate-pulse h-4 rounded-lg'></div>
                            <ul className='flex gap-4 '>
                                {Array(3).fill(0).map((_, index) => (
                                    <li key={index} className="flex gap-2 items-center">
                                        <div className="h-5 w-16 bg-gray-300 rounded animate-pulse"></div>
                                        {index < 2 && <div className="h-5 w-[1px] bg-gray-400 rounded-full"></div>}
                                    </li>
                                ))}
                            </ul>
                            <Link  className='underline text-gray-100 cursor-pointer hover:text-blue-400'>Details</Link>

                            <div className='fav-watch-list flex items-center justify-between w-full'>
                            <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                })}

            </div>
     
    )
}

export default MoviesSkeleton
