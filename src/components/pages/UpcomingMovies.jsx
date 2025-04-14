import React, { useState, useEffect } from 'react'
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import Watchlist from '../Watchlist';
import UpcomingMoviesSkeleton from '../skeleton/UpcomingMoviesSkeleton';
import axios from 'axios';
function UpcomingMovies() {
    const [countryCode, setcountryCode] = useState(
        [])

    const [selectedCountry, setselectedCountry] = useState({
        name: "India",
        iso_3166_1: "IN"
    })
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/imdb/upcoming-releases',
        params: {
            countryCode: selectedCountry.iso_3166_1,
            type: 'MOVIE'
        },
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };
    const fetchData = async () => {
        try {

            setloading(true)
            const response = await axios.request(options);
            setmoviesList(response.data)
            setloading(false)
        } catch (error) {
            console.error(error);
        }
    }
    const [moviesList, setmoviesList] = useState([])
    const [loading, setloading] = useState(false)


    useEffect(() => {
        const fetchCountry = async () => {
            const options = {
                method: 'GET',
                url: 'https://imdb236.p.rapidapi.com/imdb/countries',
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);

                setcountryCode(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchCountry()
        fetchData()
    }, [])

    useEffect(() => {

        fetchData()


    }, [selectedCountry])
    return (
        <div className='flex flex-col p-10 gap-4'>
            <div className='flex justify-evenly items-center flex-wrap gap-4  font-bold'>   
                 <h1 className='text-2xl text-blue-400'>Upcoming Releases </h1>
                {/* Select Country Option */}
                <select
                    id="countries"
                    disabled={loading}
                    value={selectedCountry.iso_3166_1}
                    onChange={(e) => {
                        const selected = countryCode.find(c => c.iso_3166_1 === e.target.value);
                        setselectedCountry(selected);
                    }}
                    className={`border border-slate-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {countryCode.map((c, index) => (
                        <option key={index} value={c.iso_3166_1}>
                            {c.name}
                        </option>
                    ))}
                </select>

            </div>
            <div className='w-full h-[1px] bg-gray-200 shadow-xl shadow-gray-500'></div>
            {/* Movies List */}
            {loading ? (<UpcomingMoviesSkeleton />) :
                (<div className='flex flex-col gap-8'>
                    {
                        moviesList?.length > 0 ?
                            moviesList?.map((movie) => {
                                return <div key={movie.date} className='flex bg-[#ffac14] flex-col gap-4 border py-2 px-4 rounded-lg'>
                                    <h1 className='text-2xl  font-semibold'>Release on <span>{movie.date}</span></h1>
                                    <div className='flex flex-col gap-4 w-full justify-between'>
                                        {movie?.titles?.length > 0 ?
                                            movie.titles?.map((movie) => {
                                                return <div key={movie.id} className='flex bg-white/30 backdrop-blur-lg flex-wrap w-full justify-between  border-2 gap-4 px-4 py-2 rounded-lg'>
                                                    {/* left side content */}
                                                    <div className='flex   gap-4 px-4 py-2 justify-center sm:flex-row flex-col sm:items-start items-center'>
                                                        <img className='md:w-16 md:h-16 rounded-md h-28 w-28' src={movie.primaryImage} alt={movie.originalTitle} />
                                                        <div className='flex flex-col gap-1'>
                                                            <h1 className='font-semibold'>{movie.originalTitle}</h1>
                                                            <ul className='flex gap-2 overflow-x-auto max-h-56 overflow-y-auto flex-wrap'>
                                                                {movie?.description || "Not Found"}
                                                            </ul>
                                                            <div className='w-full h-[2px] bg-gray-200 shadow-xl shadow-gray-700 my-1'></div>
                                                            <ul className='flex gap-2  overflow-x-auto flex-wrap'>
                                                                {movie?.genres
                                                                    ?.length > 0 ? (
                                                                    movie.genres
                                                                        .map((category, index) => (
                                                                            <li
                                                                                key={index}
                                                                                className="px-4 py-1 border rounded-full text-sm bg-slate-900 text-white"
                                                                            >
                                                                                {category}
                                                                            </li>
                                                                        ))
                                                                ) : (
                                                                    <li className="text-sm text-gray-500 italic">No genres available</li>
                                                                )}

                                                            </ul>
                                                            <Link to={`/movie/${movie.id}`} className='underline text-gray-400 cursor-pointer hover:text-blue-400'>Details</Link>

                                                        </div>
                                                    </div>
                                                    {/* right side content */}

                                                    {/* <Watchlist movie={movie} />*/}

                                                </div>
                                            }) : <div>No Releases</div>}
                                    </div>
                                </div>
                            }) : <div className='w-full flex h-screen items-center justify-center'>No Item Found</div>
                    }
                </div>)}
        </div>
    )
}

export default UpcomingMovies
