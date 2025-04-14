import React, { useState, useContext } from 'react'
import axios from 'axios';
import { toast } from "react-toastify";
import Favorites from './Favorites';
import Watchlist from './Watchlist';
import { Link } from 'react-router-dom';
import MovieContext from "../context/MovieContext"
import { useNavigate, useLocation } from 'react-router-dom';


function MovieSearch() {
    const { movieList, setmovieList } = useContext(MovieContext)
    const [movieName, setmovieName] = useState('')
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/imdb/autocomplete',
        params: {query: movieName},
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
      };



    const result = {
        "Search": [
            {
                "Title": "Guardians of the Galaxy",
                "Year": "2014",
                "imdbID": "tt0816692",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BM2ZmNjQ2MzAtNDlhNi00MmQyLWJhZDMtNmJiMjFlOWY4MzcxXkEyXkFqcGc@._V1_SX300.jpg"
            },
            {
                "Title": "Guardians of the Galaxy Vol. 2",
                "Year": "2017",
                "imdbID": "tt3896198",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"
            },
            {
                "Title": "Guardians of the Galaxy Vol. 3",
                "Year": "2023",
                "imdbID": "tt6791350",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BOTJhOTMxMmItZmE0Ny00MDc3LWEzOGEtOGFkMzY4MWYyZDQ0XkEyXkFqcGc@._V1_SX300.jpg"
            },
            {
                "Title": "Rise of the Guardians",
                "Year": "2012",
                "imdbID": "tt1446192",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTkzMjgwMDg1M15BMl5BanBnXkFtZTcwMTgzNTI1OA@@._V1_SX300.jpg"
            },
            {
                "Title": "The Guardians of the Galaxy Holiday Special",
                "Year": "2022",
                "imdbID": "tt13623136",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZDA3MzdlYTQtMTUxNi00ZjJmLTkyOTYtNDkzYmIzYTJkZjMzXkEyXkFqcGc@._V1_SX300.jpg"
            },
            {
                "Title": "Legend of the Guardians: The Owls of Ga'Hoole",
                "Year": "2010",
                "imdbID": "tt1219342",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjE0NjA5OTA4N15BMl5BanBnXkFtZTcwODA3MTA3Mw@@._V1_SX300.jpg"
            },
            {
                "Title": "The Guardians of Justice (Will Save You!)",
                "Year": "2022–",
                "imdbID": "tt16549788",
                "Type": "series",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTVlNmMxODQtZGFkYy00MzE0LTg4YjMtZDNhNDY1NWZkNjhjXkEyXkFqcGc@._V1_SX300.jpg"
            },
            {
                "Title": "Naruto the Movie 3: Guardians of the Crescent Moon Kingdom",
                "Year": "2006",
                "imdbID": "tt1071815",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNDkzNTAxMjAtMGI0Ni00M2E4LWI0YTgtNTkzMGVhYjAwYTBhXkEyXkFqcGc@._V1_SX300.jpg"
            },
            {
                "Title": "7 Guardians of the Tomb",
                "Year": "2018",
                "imdbID": "tt4915672",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMWNkZTQwZjctZmUzNy00OTA3LTg3N2QtMWEwNDE1NTIxM2JjXkEyXkFqcGc@._V1_SX300.jpg"
            },
            {
                "Title": "Guardians of the Formula",
                "Year": "2023",
                "imdbID": "tt20365920",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTAwMGRjNTAtNTVjYi00M2Y2LTk0OTItMWNkNmM3NDJkODQ2XkEyXkFqcGc@._V1_SX300.jpg"
            }
        ],
        "totalResults": "161",
        "Response": "True"
    }
    const handleSearch = async () => {
        try {
           if(movieName.trim().length > 0){
             const response = await axios.request(options);
            setmovieList(response.data)
            if (response.data.length === 0) {
                toast.info("No movies found matching your search.");
                setmovieName("")
                setmovieList([])
                
              }
          
          
            // Only navigate if not already on home page
            if (location.pathname !== '/') {
                navigate('/');
            }
            setmovieName("")
           
           }
        } catch (error) {
            setmovieName("")  
            toast.error("Something went wrong while searching.");
            console.log(error);
        }

    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };
  
    return (

        // {/* Movie Search Button & Input */}
        <div className='flex  gap-4'>
            <input onKeyDown={handleKeyDown} className='px-4 py-2  text-sm border border-red-400 rounded-md  w-[80%] outline-red-400 shadow-red-500 focus:shadow-2xl outline-4 focus:shadow-red-500' type='text' placeholder='Search movie or series' value={movieName} onChange={(e) => setmovieName(e.target.value)} />
            <button onClick={handleSearch} disabled={!movieName} className={`transition-all duration-300 px-4 py-1 sm:text-sm  bg-red-400 text-white rounded-lg shadow-md shadow-red-500 ${!movieName ? "opacity:50 " : "cursor-pointer hover:bg-red-500"}`}>Search</button>
        </div>

    )

}

export default MovieSearch
