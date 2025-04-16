import React, { useContext, useState, useEffect } from 'react'
import MovieSearch from '../MovieSearch'
import "../../App.css"
import MovieContext from '../../context/MovieContext';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Favorites from '../Favorites'
import Watchlist from '../Watchlist'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../../firebase"
import { toast } from "react-toastify";
import HomeSkeleton from '../skeleton/HomeSkeleton';
import TypedText from '../TypedText';
import axios from 'axios';
function Home() {
    const { movieList, setmovieList, user, setuser } = useContext(MovieContext)
    const [movieName, setmovieName] = useState('')
    const [loading, setloading] = useState(true)
    const location = useLocation();
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

    const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/imdb/autocomplete',
        params: { query: 'avengers' },
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };


   
   //To handle user logged in or not
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setuser(currentUser)

            }
            else {
                setuser(null)
            }
            
        })

        const handleSearch = async () => {
            try {
                setloading(true)
                const response = await axios.request(options);
                setmovieList(response.data)
                setloading(false)
            } catch (error) {
                if (error.response?.status === 429) {
                    toast.error("API limit reached. Please wait.");
                  } else {
                    toast.error("Something went wrong.");
                  }
                console.log(error);
            }

        }
        handleSearch()
 }, [])




    return (
        <div className='bg-[#000B31] w-full'>
 <div className='flex gap-5 w-full items-center justify-center flex-col px-4 py-32'>
                < TypedText />
                {/* Display Movie List */}
                <div className='w-full flex flex-wrap gap-4 items-center justify-around '>
                    {loading ? (
                        <HomeSkeleton />
                    ) : movieList && movieList.length > 0 ? (
                        movieList.map((movie) => (
                            <div
                                key={movie?.id}
                                className='border bg-[#0f0025] backdrop:blur-3xl text-white sm:min-w-[50%] sm:max-w-[50%]  max-w-[80%] min-w-[80%] md:max-w-[30%] md:min-w-[30%] lg:max-w-[25%] lg:min-w-[25%] py-6 px-4 flex flex-col items-center gap-4 rounded-md'
                            >
                                <img className='w-48 h-60 rounded-sm' src={movie.primaryImage} alt={movie.originalTitle || "Movie Poster"} />
                                {/* movie details */}
                                <div className='flex flex-col items-start gap-4'>
                                    <h1 className='bg-red-500 px-4 py-2 text-sm rounded-md'>Title: {movie.originalTitle || "Unknown title"}</h1>
                                    <h1 className='bg-red-500 px-4 py-2 text-sm rounded-md'>Year: <span>{movie.releaseDate || "Unknown"}</span></h1>
                                    <h1 className='bg-red-500 px-4 py-2 text-sm rounded-md'>{movie.type || "Unknown"}</h1>
                                    <Link to={`/movie/${movie.id}`} className='underline text-gray-400 cursor-pointer hover:text-blue-400'>
                                        Details
                                    </Link>
                                </div>
                                {/* Favorites and WatchList Buttons */}
                                <div className='fav-watch-list flex items-center justify-between w-full'>
                                    <Favorites movie={movie} />
                                    <Watchlist movie={movie} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center text-gray-400 text-lg py-10 animate-pulse">
                             No movies found. Try a different search!
                        </div>

                    )}


                </div>

            </div>
        </div>
    )
}

export default Home
