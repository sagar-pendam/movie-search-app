import React from 'react'

function MovieDetailsSkeleton() {
    return (
        <div className="bg-[#000B31] min-h-screen text-white py-12 animate-pulse">
        
        <div className="w-full flex items-center justify-center gap-4 flex-wrap">
          {/*  Poster & Title */}
          <div className="left-side px-4 flex gap-4 flex-col">
            <div className="h-6 w-60 bg-gray-700 rounded"></div>
            <div className="w-80 h-96 bg-gray-700 rounded"></div>
          </div>
  
          {/*  Description & Details */}
          <div className="right-side w-96 flex px-4 items-start self-start py-12 flex-col gap-3">
            <div className="h-20 w-full bg-gray-700 rounded"></div>
            <div className="w-full h-[1px] bg-gray-500"></div>
            <div className="h-4 w-48 bg-gray-700 rounded"></div>
            <div className="w-full h-[1px] bg-gray-500"></div>
            <div className="h-4 w-72 bg-gray-700 rounded"></div>
            <div className="w-full h-[1px] bg-gray-500"></div>
            <div className="h-4 w-60 bg-gray-700 rounded"></div>
            <div className="w-full h-[1px] bg-gray-500"></div>
            <div className="h-4 w-40 bg-gray-700 rounded"></div>
            <div className="w-full h-[1px] bg-gray-500"></div>
            <div className="flex gap-2">
              <div className="h-10 w-20 bg-gray-700 rounded"></div>
              <div className="h-10 w-20 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
  
        
        <div className="flex flex-col gap-6 mt-10">
          {/* Genres */}
          <div className="geners-dt flex flex-col px-14">
            <div className="h-4 w-24 bg-gray-700 rounded mb-4"></div>
            <div className="flex gap-4 flex-wrap">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 w-16 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
  
          {/* Director */}
          <div className="director-dt flex flex-col px-14 gap-4">
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
            <div className="h-4 w-32 bg-gray-700 rounded mx-4"></div>
          </div>
  
          {/* Writers */}
          <div className="geners-dt flex flex-col px-14">
            <div className="h-4 w-24 bg-gray-700 rounded mb-4"></div>
            <div className="flex gap-4 flex-wrap">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-24 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
  
          {/* Cast */}
          <div className="cast-dt flex flex-col px-14 gap-4">
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
            <div className="flex overflow-x-auto gap-4 py-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2 px-4 py-2 border border-gray-600 rounded w-60">
                  <div className="h-4 w-40 bg-gray-700 rounded"></div>
                  <div className="h-4 w-32 bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}

export default MovieDetailsSkeleton
