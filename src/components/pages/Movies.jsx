import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Favorites from '../Favorites';
import Watchlist from '../Watchlist';
import { ListFilter } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { X } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import MoviesSkeleton from "../skeleton/MoviesSkeleton"
import axios from 'axios';
import { toast } from "react-toastify";
function Movies() {
    const [showButton, setShowButton] = useState(false);
    const [loading, setloading] = useState(false)
    const { category } = useParams()
    const [moviesList, setmoviesList] = useState([])
    const [title, settitle] = useState(null)
    const [results, setresults] = useState(250)
    const [filterItems, setfilterItems] = useState([])
    const [isFilterOpe, setisFilterOpe] = useState("")
    const [geners, setgeners] = useState([
        "Drama",
        "Comedy",
        "Documentary",
        "Action",
        "Romance",
        "Thriller",
        "Crime",
        "Horror",
        "Adventure",
        "Family",
        "Animation",
        "Reality-TV",
        "Mystery",
        "Music",
        "Talk-Show",
        "Fantasy",
        "History",
        "Biography",
        "Sci-Fi",
        "Sport",
        "Musical",
        "Adult",
        "War",
        "News",
        "Game-Show",
        "Western",
        "Short",
        "Film-Noir"
    ])
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");


    const currentYear = new Date().getFullYear();

    const [minImdbRatingValue, setMinImdbRatingValue] = useState("");
    const [maxImdbRatingValue, setMaxImdbRatingValue] = useState("");
    const closeRef = useRef(null)

    const [isFilterOpen, setisFilterOpen] = useState(false)//To check Filter menu open or close

    const [isFiltered, setisFiltered] = useState(false)//To check User filtered list or not
    const [filteredMovies, setfilteredMovies] = useState([])
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const options = {
        method: 'GET',
        url: `https://imdb236.p.rapidapi.com/imdb/${category}`,
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };

    const handleFilterOpenAndCloseBtn = (param) => {
        if (closeRef) {


            if (isFilterOpen) {
                closeRef.current.style.width = "0%"
                closeRef.current.style.display = "none";
                setisFilterOpen(!isFilterOpen)
            }
            else {
                closeRef.current.style.width = "80%"
                closeRef.current.style.display = "flex";

                setisFilterOpen(!isFilterOpen)
            }

        }
    }


    const handleYearChange = (e) => {
        ;

        const id = e.target.id;
        const regex = /^\d+$/;

        if (regex.test(e.target.value) && e.target.value.length <= 6) {
            const newValue = e.target.value;

            if (id === "startYear") {
                setMinValue(newValue);
                setfilterItems((prevFilters) => {
                    return prevFilters.map((item) =>
                        item.hasOwnProperty("releaseYear")
                            ? { ...item, releaseYear: { after: newValue, before: item.releaseYear.before } }
                            : item
                    );
                });
            } else if (id === "endYear") {
                setMaxValue(newValue);
                setfilterItems((prevFilters) => {
                    return prevFilters.map((item) =>
                        item.hasOwnProperty("releaseYear")
                            ? { ...item, releaseYear: { after: item.releaseYear.after, before: newValue } }
                            : item
                    );
                });
            }
        }
    };


    const handleYearChangeInFilter = (name) => {
        if (name === "releaseYear") {
            setMaxValue("")
            setMinValue("")
        }
        else {
            setMinImdbRatingValue("")
            setMaxImdbRatingValue("")
        }
        // alert("hi")
    }

    const handleImdbRatingChange = (e) => {
        const id = e.nativeEvent.target.id;
        const regex = /^\d*\.?\d*$/;

        if (regex.test(e.target.value) && (e.target.value === "" || Number(e.target.value) <= 10)) {
            if (id === "startRating") {
                setMinImdbRatingValue(e.target.value);
                setfilterItems((prev) => {
                    const ratingItem = prev.find(item => item.hasOwnProperty("userRating"));
                    if (ratingItem) {
                        return prev.map((item) =>
                            item.hasOwnProperty("userRating")
                                ? { ...item, userRating: { starRating: e.target.value, endRating: maxImdbRatingValue } }
                                : item
                        );
                    } else {
                        return [...prev, { userRating: { starRating: e.target.value, endRating: maxImdbRatingValue } }];
                    }
                });
            } else {
                setMaxImdbRatingValue(e.target.value);
                setfilterItems((prev) => {
                    const ratingItem = prev.find(item => item.hasOwnProperty("userRating"));
                    if (ratingItem) {
                        return prev.map((item) =>
                            item.hasOwnProperty("userRating")
                                ? { ...item, userRating: { starRating: minImdbRatingValue, endRating: e.target.value } }
                                : item
                        );
                    } else {
                        return [...prev, { userRating: { starRating: minImdbRatingValue, endRating: e.target.value } }];
                    }
                });
            }
        }
    };


    const handleGenres = (name) => {
       
        //filtering genres
        setfilterItems((prev) => {
            const genresItem = prev.find(item => item.hasOwnProperty("genres"));

            if (genresItem) {
                // If genres object exists, update it
                return prev.map(item =>
                    item.hasOwnProperty("genres")
                        ? { ...item, genres: item.genres.includes(name) ? item.genres : [...item.genres, name] }
                        : item
                );
            } else {
                // If genres object doesn't exist, add a new one
                return [...prev, { genres: [name] }];
            }
        });



        

        

    }

    const handleremoveFilterItem = (name) => {
        
        const isGenresItem = name.hasOwnProperty("genres")
       

        if (isGenresItem) {
            setfilterItems((prev) => {

                return prev.map((item) => {
                    if (item.hasOwnProperty("genres") && Array.isArray(item.genres)) {
                        return { ...item, genres: item.genres.filter((child) => child !== name.genres[0]) }
                    }
                    return item
                })
            })


        }
        else {
            setfilterItems([...filterItems.filter((item) => !(item.hasOwnProperty(Object.keys(name)[0])))])
        }
        //Deleting genres object from filterItems if it has empty array
        setfilterItems(prevFilters => prevFilters.filter(item =>
            !(item.hasOwnProperty("genres") && Array.isArray(item.genres) && item.genres.length === 0)
        ));

    }
    function convertMinutes(minutes) {

        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    useEffect(() => {
        if (minValue === "" && maxValue === "") {
            //if release year is empty than remove releaseYear item from filter
            const releaseYearItem = filterItems.find((item) => item.hasOwnProperty("releaseYear"))
            if (releaseYearItem) {
                setfilterItems([...filterItems.filter((item) => !(item.hasOwnProperty("releaseYear")))])

            }
        }
    }, [maxValue, minValue])
    useEffect(() => {
        if (minImdbRatingValue === "" && maxImdbRatingValue === "") {
            //if Rating year is empty than remove userRating item from filter
            const userRatingItem = filterItems.find((item) => item.hasOwnProperty("userRating"))
            if (userRatingItem) {
                setfilterItems([...filterItems.filter((item) => !(item.hasOwnProperty("userRating")))])

            }
        }
    }, [maxImdbRatingValue, minImdbRatingValue])


    useEffect(() => {


        if (filterItems.length > 0) {
            setisFiltered(true);
            setfilteredMovies(moviesList.filter(movie => {
                return filterItems.every(filter => {
                    if (filter.hasOwnProperty("genres")) {
                        return filter.genres.some(genre => movie.genres.includes(genre));
                    }
                    if (filter.hasOwnProperty("releaseYear")) {
                        const after = Number(filter.releaseYear.after) || 0;
                        const before = Number(filter.releaseYear.before) || 1990;
                        return movie.releaseYear >= after && movie.releaseYear <= before;
                    }
                    if (filter.hasOwnProperty("userRating")) {
                        const rating = Number(movie.averageRating);
                        const startRating = Number(filter.userRating.starRating) || 0;
                        const endRating = Number(filter.userRating.endRating) || 10;
                        return rating >= startRating && rating <= endRating;
                    }
                    return true;
                });
            }));



        }
        else {


            setisFiltered(false)


        }




    }, [filterItems, moviesList]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 2212) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };



    useEffect(() => {
        if (filteredMovies.length > 0 && isFiltered) {
            setresults(filteredMovies.length)
        }
        if (isFiltered == false) {
            setresults(moviesList.length)
        }
    }, [filteredMovies, isFiltered])

    //To fetch data from api 
    useEffect(() => {
        if (category === "top250-movies") {
            settitle("Top 250 Movies")
        }
        if (category === "most-popular-movies") {
            settitle("Most Popular Movies")
        }
        if (category === "top250-tv") {
            settitle("Top 250 TV Shows")
        }
        if (category === "most-popular-tv") {
            settitle("Most Popular TV Shows")
        }
        const fetchMovie = async () => {
            try {
                if (category) {
                    setloading(true)
                    const response = await axios.request(options);
                   
                    setmoviesList(response.data)
                    setloading(false)
                    setresults(response.data.length)
                }

            } catch (error) {
                if (error.response?.status === 429) {
                    toast.error("API limit reached. Please wait.");
                  } else {
                    toast.error("Something went wrong.");
                  }
                console.error(error);
            }
        }
        fetchMovie()      
    }, [category])

    return (
        <>

            <div className='flex items-center flex-col gap-4 relative z-10'>

                {/* Back to Top Button */}
                {showButton && <button onClick={scrollToTop} className='px-4 py-2 rounded-full border shadow-xl fixed top-8 flex items-center gap-2 cursor-pointer hover:text-white backdrop-blur-sm  transition-all duration-300 font-semibold'><ChevronUp /> Back to top</button>
                }
                {/* Filter Menu */}
                <div ref={closeRef} className={` transition-all duration-300 w-[80%] h-[80%] overflow-y-auto gap-6 px-5 py-10 shadow-lg ${isFilterOpen ? 'flex items-center  flex-col' : 'hidden'} shadow-red-200 border rounded-lg fixed top-[10%] bg-white mx-auto z-60`}>
                    {/* close button */}
                    <button className={`self-end relative right-0 top-0 `} onClick={() => { handleFilterOpenAndCloseBtn("close") }}> <CircleX className=' cursor-pointer hover:text-gray-700' /></button>
                    {/* Filter List */}
                    {/* Genres List */}
                    <div className='flex px-5 border flex-col gap-4 py-6 rounded-md '>
                        <h1 className='font-bold text-blue-400'>Genres</h1>
                        <ul className='flex gap-2 items-center flex-wrap h-60 overflow-y-auto'>

                            {geners.map((item, index) => {
                                return <li key={index} onClick={() => { handleGenres(item) }} className='border shadow-lg hover:bg-slate-800 hover:text-white transition-all duration-300 cursor-pointer font-semibold px-4 py-2 rounded-lg text-slate-800'>{item}</li>
                            })}
                        </ul>
                    </div>


                    {/* IMDB Rating & Number of Votes        */}
                    <div className='flex px-5 border flex-col gap-4 py-6 rounded-md  w-full'>
                        <h1 className='font-bold text-blue-400 w-full'>IMDB Ratings</h1>
                        {/* Taking Input */}
                        {/* User Rating */}
                        <div className='flex gap-2 w-full flex-col px-2'>
                            <h3 className='font-semibold text-slate-800'>User Rating</h3>
                            <div className='flex gap-2 w-full sm:flex-row flex-col items-center'>
                                <input
                                    className='border w-[80%] sm:w-[50%] py-2 px-4'
                                    type="number"
                                    id='startRating'
                                    step="0.1"
                                    value={minImdbRatingValue}  // Fixed variable name
                                    onChange={(e) => handleImdbRatingChange(e)}  // Fixed setter function
                                    placeholder="Rating 1.0"
                                />
                                to
                                <input
                                    className='border w-[80%] sm:w-[50%] py-2 px-4'
                                    type="number"
                                    id='maxYear'
                                    step="0.1"
                                    value={maxImdbRatingValue}  // Fixed variable name
                                    onChange={(e) => handleImdbRatingChange(e)}  // Fixed setter function
                                    placeholder="Rating 10.0"
                                />
                            </div>
                        </div>

                    </div>
                </div>
                {/* Heading And Filter Button */}
                <div className='flex flex-col gap-4 items-start justify-center w-[80%] '>
                    {/* Heading Dt */}
                    <div className='flex flex-col gap-4 py-4 '>
                        <h1 className='text-3xl font-semibold text-yellow-300'>{title && title}</h1>
                        <p className='text-gray-400'>As rated by regular IMDb voters.</p>
                    </div>
                    {/* Filter Button */}
                    <div className='flex flex-wrap gap-4 flex-col'>
                        <button disabled={loading} onClick={() => { handleFilterOpenAndCloseBtn("close") }} className={`cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>  <ListFilter /></button>
                        {/* Filtered Items List */}
                        <ul className='flex gap-2 flex-wrap'>
                            {filterItems.length > 0 &&
                                filterItems.map((item) => (
                                    item.hasOwnProperty("genres") ? item.genres.map((child, index) => < li key={index} className='border flex py-2 gap-2 items-center px-4 rounded-lg border-green-400' ><span
                                    >

                                        {child}

                                    </span>

                                        <button onClick={() => { handleremoveFilterItem(item); }} >  <X className='text-sm hover:text-red-400' /></button></li>)

                                        : <li key={item} className='border flex py-2 gap-2 items-center px-4 rounded-lg border-green-400'><span
                                        >

                                            {item.hasOwnProperty("releaseYear") && (maxValue === "" && minValue !== "") && <span>Release Year : After {minValue}</span>}
                                            {item.hasOwnProperty("releaseYear") && (maxValue !== "" && minValue === "") && <span>Release Year : Before {maxValue}</span>}
                                            {item.hasOwnProperty("releaseYear") && (maxValue !== "" && minValue !== "") && <span>Release Year : {minValue} to {maxValue}</span>}

                                            {item.hasOwnProperty("userRating") && (maxImdbRatingValue === "" && minImdbRatingValue !== "") && <span>User Rating : {minImdbRatingValue} or Above</span>}
                                            {item.hasOwnProperty("userRating") && (maxImdbRatingValue !== "" && minImdbRatingValue === "") && <span>User Rating : {maxImdbRatingValue} or Below</span>}
                                            {item.hasOwnProperty("userRating") && (maxImdbRatingValue !== "" && minImdbRatingValue !== "") && <span>User Rating : {minImdbRatingValue} to {maxImdbRatingValue}</span>}

                                        </span>

                                            <button onClick={() => { handleremoveFilterItem(item); if (item.hasOwnProperty(Object.keys(item)[0])) handleYearChangeInFilter(Object.keys(item)[0]) }} >  <X className='text-sm hover:text-red-400' /></button></li>
                                ))
                            }
                        </ul>
                        {/* Show Total Result */}
                        {!loading && <div className='flex items-center justify-end w-full '><span className='border px-4 py-2 rounded-lg text-sm text-blue-400 '>Result : {results}</span></div>}


                    </div>


                </div>
                {/* Listing Movies */}
                <div className='flex flex-wrap gap-4 min-h-screen w-[80%] bg-[#939393] mx-auto justify-around items-center py-8 border rounded-md'>

                    {loading ? <MoviesSkeleton /> : (isFiltered ? filteredMovies?.map((movie) => {

                        return <div key={movie.id} className='movie-cart backdrop:blur-3xl flex text-white justify-center items-center  bg-[#515151] border px-4 py-4 gap-8  md:max-w-[40%] sm:flex-col sm:w-[60%] w-[90%] h-[520px] overflow-y-auto sm:flex- flex-col'>
                            <img className='w-40 h-44' src={movie.primaryImage} alt={movie.originalTitle} />
                            <div className='flex flex-col gap-2 w-[100%] items-center justify-center'>
                                <h1 >{movie.originalTitle || "Unknown title"}</h1>
                                <h2 className=''>Imdb Rating   <span className='flex gap-2'><Star className='fill-[#ffea00] text-[#ffea00] text-sm' /> {movie.averageRating || "N/A"}/10</span></h2>
                                <h3>{convertMinutes(movie.runtimeMinutes) || "Runtime unknown"}</h3>
                                <h4>{movie.releaseDate || "Released date unknown"}</h4>

                                <h1 className='text-[#ffffff]'>Geners</h1>
                                <ul className='flex gap-4 '>
                                    {movie?.genres?.length > 0 ? (movie?.genres.map((genre, index) => {
                                        return <li key={genre} className='text-blue-400 font-bold flex gap-2 items-center'>{genre} {(index != movie?.genres.length - 1) && <div className='h-5 w-[1px] bg-gray-400 rounded-full'></div>}</li>
                                    })) : <li className='text-blue-400 font-bold flex gap-2 items-center'>No geners listed</li>}
                                </ul>
                                <Link to={`/movie/:${movie.id}`} className='underline text-gray-100 cursor-pointer hover:text-blue-400'>Details</Link>

                                <div className='fav-watch-list flex items-center justify-center gap-4 w-full'>
                                    <Favorites movie={movie} />
                                    <Watchlist movie={movie} />
                                </div>
                            </div>
                        </div>
                    }) :

                        (moviesList && moviesList.length > 0 ? (
                            moviesList?.map((movie) => {

                                return <div key={movie.id} className='movie-cart backdrop:blur-3xl flex text-white justify-center items-center  bg-[#515151] border px-4 py-4 gap-8  md:max-w-[40%] sm:flex-col sm:w-[60%] w-[90%] h-[520px] overflow-y-auto sm:flex- flex-col'>
                                    <img className='w-40 h-44' src={movie.primaryImage} />
                                    <div className='flex flex-col gap-2 items-center justify-center'>
                                        <h1 >{movie.originalTitle || "Unknown title"}</h1>
                                        <h2 className=''>Imdb Rating   <span className='flex gap-2'><Star className='fill-[#ffea00] text-[#ffea00] text-sm' /> {movie.averageRating || "N/A"}/10</span></h2>
                                        <h3>{convertMinutes(movie.runtimeMinutes) || "Runtime unknown"}</h3>
                                        <h4>{movie.releaseDate || "Released date unknown"}</h4>


                                        <h1 className='text-[#ffffff]'>Geners</h1>
                                        {Array.isArray(movie?.genres) && movie.genres.length > 0 && (
                                            <ul className='flex gap-4 '>
                                            {movie?.genres?.length > 0 ? (movie?.genres.map((genre, index) => {
                                                return <li key={genre} className='text-blue-400 font-bold flex gap-2 items-center'>{genre} {(index != movie?.genres.length - 1) && <div className='h-5 w-[1px] bg-gray-400 rounded-full'></div>}</li>
                                            })) : <li className='text-blue-400 font-bold flex gap-2 items-center'>No geners listed</li>}
                                        </ul>
                                        )}

                                        <Link to={`/movie/${movie.id}`} className='underline text-gray-100 cursor-pointer hover:text-blue-400'>Details</Link>

                                        <div className='fav-watch-list flex items-center justify-center gap-4 w-full'>
                                            <Favorites movie={movie} />
                                            <Watchlist movie={movie} />
                                        </div>
                                    </div>
                                </div>
                            })
                        ) : <div className='flex h-screen justify-center items-center w-full'> Somthing went wrong</div>)
                    )}

                </div>
            </div >
        </>
    )

}

export default Movies
