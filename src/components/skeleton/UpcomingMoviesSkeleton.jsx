import React from 'react'

function UpcomingMoviesSkeleton() {
    return (
        <div className='flex flex-col gap-8'>
        {[1, 2,3].map((_, index) => (
          <div key={index} className='flex bg-[#ffac14] flex-col gap-4 border py-2 px-4 rounded-lg'>
           
            <h1 className='text-2xl font-semibold'>
              Release on <span className="inline-block bg-gray-300 h-6 w-24 rounded animate-pulse"></span>
            </h1>
      
            <div className='flex flex-col gap-4 w-full justify-between'>
              {[1, 2].map((_, idx) => (
                <div key={idx} className='flex bg-white/30 backdrop-blur-lg flex-wrap w-full justify-between border-2 gap-4 px-4 py-2 rounded-lg'>
                 
                  <div className='flex gap-4 px-4 py-2 justify-center sm:flex-row flex-col sm:items-start items-center'>
                    
                    <div className='md:w-16 md:h-16 w-28 h-28 rounded-md bg-gray-300 animate-pulse'></div>
      
                    <div className='flex flex-col gap-1 w-full'>
                     
                      <div className='h-5 w-40 bg-gray-300 rounded animate-pulse'></div>
      
                      
                      <ul className='flex gap-2 overflow-x-auto flex-wrap mt-1'>
                        {[1, 2, 3].map((_, creditIdx) => (
                          <li key={creditIdx} className='h-6 w-20 bg-gray-400 rounded-full animate-pulse'></li>
                        ))}
                      </ul>
      
                      
                      <div className='w-full h-[2px] bg-gray-200 my-2'></div>
      
                      
                      <ul className='flex gap-2 overflow-x-auto flex-wrap'>
                        {[1, 2].map((_, genreIdx) => (
                          <li key={genreIdx} className='h-6 w-20 bg-gray-400 rounded-full animate-pulse'></li>
                        ))}
                      </ul>
      
                     
                      <div className='h-4 w-24 mt-2 bg-gray-300 rounded animate-pulse'></div>
                    </div>
                  </div>
      
                  
                  <div className='h-8 w-20 bg-gray-300 rounded-md animate-pulse'></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
    )
}

export default UpcomingMoviesSkeleton
