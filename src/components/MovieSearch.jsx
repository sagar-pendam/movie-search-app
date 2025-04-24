import React, { useState, useContext  } from 'react'
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
    const [isSearching, setisSearching] = useState(false)
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



  
    
    

    const handleSearch = async () => {
        try {
            if(movieName.trim().length > 0){
             setisSearching(true)
              const response = await axios.request(options);
              console.log("response.data");
              
              console.log(response.data)
             
              
             setmovieList(response.data)
             if ( !response.data || response.data.length === 0) {
                 toast.info("No movies found matching your search.");
                 setmovieName("")
                 setmovieList([])
                 
               }
               setmovieName("")
           
             // Only navigate if not already on home page
             if (location.pathname !== '/') {
                 navigate('/');
             }
             
            
            }
         } catch (error) {
             setmovieName("")  
             if (error.response?.status === 429) {
                 toast.error("API limit reached. Please wait.");
               } else {
                 toast.error("Something went wrong.");
               }
             
             console.log(error);
         }
         finally{
             setisSearching(false)
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
            <button  onClick={handleSearch}
        disabled={!movieName || isSearching}
        className={`transition-all duration-300 px-4 py-1 sm:text-sm bg-red-400 text-white rounded-lg shadow-md shadow-red-500 ${
          !movieName || isSearching
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-red-500"
        }`}>{isSearching ? "Searching..." : "Search"}</button>
        </div>

    )

}

export default MovieSearch
