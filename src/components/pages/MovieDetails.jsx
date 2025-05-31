import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom'
import { ChevronUp } from 'lucide-react';
import { Star } from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';
import Favorites from '../Favorites';
import Watchlist from '../Watchlist';
import MovieDetailsSkeleton from '../skeleton/MovieDetailsSkeleton';
import  MovieContext  from '../../context/MovieContext';
import { toast } from "react-toastify";
function MovieDetails() {
    const [showCast, setshowCast] = useState(true)
    const [loading, setloading] = useState(true)
    const { id } = useParams();
    const navigate = useNavigate()
    const [movie, setmovie] = useState(null)
    const  { movieList, setmovieList, user, setuser, favoriteList, setfavoriteList } = useContext(MovieContext)
     const [languages, setlanguages] = useState(
      [
            {
              "name": "Afar",
              "iso_639_1": "aa"
            },
            {
              "name": "Abkhazian",
              "iso_639_1": "ab"
            },
            {
              "name": "Avestan",
              "iso_639_1": "ae"
            },
            {
              "name": "Afrikaans",
              "iso_639_1": "af"
            },
            {
              "name": "Akan",
              "iso_639_1": "ak"
            },
            {
              "name": "Amharic",
              "iso_639_1": "am"
            },
            {
              "name": "Aragonese",
              "iso_639_1": "an"
            },
            {
              "name": "Arabic",
              "iso_639_1": "ar"
            },
            {
              "name": "Assamese",
              "iso_639_1": "as"
            },
            {
              "name": "Avaric",
              "iso_639_1": "av"
            },
            {
              "name": "Aymara",
              "iso_639_1": "ay"
            },
            {
              "name": "Azerbaijani",
              "iso_639_1": "az"
            },
            {
              "name": "Bashkir",
              "iso_639_1": "ba"
            },
            {
              "name": "Belarusian",
              "iso_639_1": "be"
            },
            {
              "name": "Bulgarian",
              "iso_639_1": "bg"
            },
            {
              "name": "Bislama",
              "iso_639_1": "bi"
            },
            {
              "name": "Bambara",
              "iso_639_1": "bm"
            },
            {
              "name": "Bengali",
              "iso_639_1": "bn"
            },
            {
              "name": "Tibetan",
              "iso_639_1": "bo"
            },
            {
              "name": "Breton",
              "iso_639_1": "br"
            },
            {
              "name": "Bosnian",
              "iso_639_1": "bs"
            },
            {
              "name": "Catalan",
              "iso_639_1": "ca"
            },
            {
              "name": "Chechen",
              "iso_639_1": "ce"
            },
            {
              "name": "Chamorro",
              "iso_639_1": "ch"
            },
            {
              "name": "Corsican",
              "iso_639_1": "co"
            },
            {
              "name": "Cree",
              "iso_639_1": "cr"
            },
            {
              "name": "Czech",
              "iso_639_1": "cs"
            },
            {
              "name": "Church Slavic",
              "iso_639_1": "cu"
            },
            {
              "name": "Chuvash",
              "iso_639_1": "cv"
            },
            {
              "name": "Welsh",
              "iso_639_1": "cy"
            },
            {
              "name": "Danish",
              "iso_639_1": "da"
            },
            {
              "name": "German",
              "iso_639_1": "de"
            },
            {
              "name": "Divehi",
              "iso_639_1": "dv"
            },
            {
              "name": "Dzongkha",
              "iso_639_1": "dz"
            },
            {
              "name": "Ewe",
              "iso_639_1": "ee"
            },
            {
              "name": "Greek",
              "iso_639_1": "el"
            },
            {
              "name": "English",
              "iso_639_1": "en"
            },
            {
              "name": "Esperanto",
              "iso_639_1": "eo"
            },
            {
              "name": "Spanish",
              "iso_639_1": "es"
            },
            {
              "name": "Estonian",
              "iso_639_1": "et"
            },
            {
              "name": "Basque",
              "iso_639_1": "eu"
            },
            {
              "name": "Persian",
              "iso_639_1": "fa"
            },
            {
              "name": "Fulah",
              "iso_639_1": "ff"
            },
            {
              "name": "Finnish",
              "iso_639_1": "fi"
            },
            {
              "name": "Fijian",
              "iso_639_1": "fj"
            },
            {
              "name": "Faroese",
              "iso_639_1": "fo"
            },
            {
              "name": "French",
              "iso_639_1": "fr"
            },
            {
              "name": "Western Frisian",
              "iso_639_1": "fy"
            },
            {
              "name": "Irish",
              "iso_639_1": "ga"
            },
            {
              "name": "Gaelic",
              "iso_639_1": "gd"
            },
            {
              "name": "Galician",
              "iso_639_1": "gl"
            },
            {
              "name": "Guarani",
              "iso_639_1": "gn"
            },
            {
              "name": "Gujarati",
              "iso_639_1": "gu"
            },
            {
              "name": "Manx",
              "iso_639_1": "gv"
            },
            {
              "name": "Hausa",
              "iso_639_1": "ha"
            },
            {
              "name": "Hebrew",
              "iso_639_1": "he"
            },
            {
              "name": "Hindi",
              "iso_639_1": "hi"
            },
            {
              "name": "Hiri Motu",
              "iso_639_1": "ho"
            },
            {
              "name": "Croatian",
              "iso_639_1": "hr"
            },
            {
              "name": "Haitian",
              "iso_639_1": "ht"
            },
            {
              "name": "Hungarian",
              "iso_639_1": "hu"
            },
            {
              "name": "Armenian",
              "iso_639_1": "hy"
            },
            {
              "name": "Herero",
              "iso_639_1": "hz"
            },
            {
              "name": "Interlingua",
              "iso_639_1": "ia"
            },
            {
              "name": "Indonesian",
              "iso_639_1": "id"
            },
            {
              "name": "Interlingue",
              "iso_639_1": "ie"
            },
            {
              "name": "Igbo",
              "iso_639_1": "ig"
            },
            {
              "name": "Sichuan Yi",
              "iso_639_1": "ii"
            },
            {
              "name": "Inupiaq",
              "iso_639_1": "ik"
            },
            {
              "name": "Ido",
              "iso_639_1": "io"
            },
            {
              "name": "Icelandic",
              "iso_639_1": "is"
            },
            {
              "name": "Italian",
              "iso_639_1": "it"
            },
            {
              "name": "Inuktitut",
              "iso_639_1": "iu"
            },
            {
              "name": "Japanese",
              "iso_639_1": "ja"
            },
            {
              "name": "Javanese",
              "iso_639_1": "jv"
            },
            {
              "name": "Georgian",
              "iso_639_1": "ka"
            },
            {
              "name": "Kongo",
              "iso_639_1": "kg"
            },
            {
              "name": "Kikuyu",
              "iso_639_1": "ki"
            },
            {
              "name": "Kuanyama",
              "iso_639_1": "kj"
            },
            {
              "name": "Kazakh",
              "iso_639_1": "kk"
            },
            {
              "name": "Kalaallisut",
              "iso_639_1": "kl"
            },
            {
              "name": "Central Khmer",
              "iso_639_1": "km"
            },
            {
              "name": "Kannada",
              "iso_639_1": "kn"
            },
            {
              "name": "Korean",
              "iso_639_1": "ko"
            },
            {
              "name": "Kanuri",
              "iso_639_1": "kr"
            },
            {
              "name": "Kashmiri",
              "iso_639_1": "ks"
            },
            {
              "name": "Kurdish",
              "iso_639_1": "ku"
            },
            {
              "name": "Komi",
              "iso_639_1": "kv"
            },
            {
              "name": "Cornish",
              "iso_639_1": "kw"
            },
            {
              "name": "Kirghiz",
              "iso_639_1": "ky"
            },
            {
              "name": "Latin",
              "iso_639_1": "la"
            },
            {
              "name": "Luxembourgish",
              "iso_639_1": "lb"
            },
            {
              "name": "Ganda",
              "iso_639_1": "lg"
            },
            {
              "name": "Limburgan",
              "iso_639_1": "li"
            },
            {
              "name": "Lingala",
              "iso_639_1": "ln"
            },
            {
              "name": "Lao",
              "iso_639_1": "lo"
            },
            {
              "name": "Lithuanian",
              "iso_639_1": "lt"
            },
            {
              "name": "Luba-Katanga",
              "iso_639_1": "lu"
            },
            {
              "name": "Latvian",
              "iso_639_1": "lv"
            },
            {
              "name": "Malagasy",
              "iso_639_1": "mg"
            },
            {
              "name": "Marshallese",
              "iso_639_1": "mh"
            },
            {
              "name": "Maori",
              "iso_639_1": "mi"
            },
            {
              "name": "Macedonian",
              "iso_639_1": "mk"
            },
            {
              "name": "Malayalam",
              "iso_639_1": "ml"
            },
            {
              "name": "Mongolian",
              "iso_639_1": "mn"
            },
            {
              "name": "Marathi",
              "iso_639_1": "mr"
            },
            {
              "name": "Malay",
              "iso_639_1": "ms"
            },
            {
              "name": "Maltese",
              "iso_639_1": "mt"
            },
            {
              "name": "Burmese",
              "iso_639_1": "my"
            },
            {
              "name": "Nauru",
              "iso_639_1": "na"
            },
            {
              "name": "Bokmål, Norwegian; Norwegian Bokmål",
              "iso_639_1": "nb"
            },
            {
              "name": "Ndebele, North; North Ndebele",
              "iso_639_1": "nd"
            },
            {
              "name": "Nepali",
              "iso_639_1": "ne"
            },
            {
              "name": "Ndonga",
              "iso_639_1": "ng"
            },
            {
              "name": "Dutch",
              "iso_639_1": "nl"
            },
            {
              "name": "Norwegian Nynorsk; Nynorsk, Norwegian",
              "iso_639_1": "nn"
            },
            {
              "name": "Norwegian",
              "iso_639_1": "no"
            },
            {
              "name": "Ndebele, South; South Ndebele",
              "iso_639_1": "nr"
            },
            {
              "name": "Navajo",
              "iso_639_1": "nv"
            },
            {
              "name": "Chichewa",
              "iso_639_1": "ny"
            },
            {
              "name": "Occitan",
              "iso_639_1": "oc"
            },
            {
              "name": "Ojibwa",
              "iso_639_1": "oj"
            },
            {
              "name": "Oromo",
              "iso_639_1": "om"
            },
            {
              "name": "Oriya",
              "iso_639_1": "or"
            },
            {
              "name": "Ossetian",
              "iso_639_1": "os"
            },
            {
              "name": "Panjabi",
              "iso_639_1": "pa"
            },
            {
              "name": "Pali",
              "iso_639_1": "pi"
            },
            {
              "name": "Polish",
              "iso_639_1": "pl"
            },
            {
              "name": "Pushto",
              "iso_639_1": "ps"
            },
            {
              "name": "Portuguese",
              "iso_639_1": "pt"
            },
            {
              "name": "Quechua",
              "iso_639_1": "qu"
            },
            {
              "name": "Romansh",
              "iso_639_1": "rm"
            },
            {
              "name": "Rundi",
              "iso_639_1": "rn"
            },
            {
              "name": "Romanian",
              "iso_639_1": "ro"
            },
            {
              "name": "Russian",
              "iso_639_1": "ru"
            },
            {
              "name": "Kinyarwanda",
              "iso_639_1": "rw"
            },
            {
              "name": "Sanskrit",
              "iso_639_1": "sa"
            },
            {
              "name": "Sardinian",
              "iso_639_1": "sc"
            },
            {
              "name": "Sindhi",
              "iso_639_1": "sd"
            },
            {
              "name": "Northern Sami",
              "iso_639_1": "se"
            },
            {
              "name": "Sango",
              "iso_639_1": "sg"
            },
            {
              "name": "Sinhala",
              "iso_639_1": "si"
            },
            {
              "name": "Slovak",
              "iso_639_1": "sk"
            },
            {
              "name": "Slovenian",
              "iso_639_1": "sl"
            },
            {
              "name": "Samoan",
              "iso_639_1": "sm"
            },
            {
              "name": "Shona",
              "iso_639_1": "sn"
            },
            {
              "name": "Somali",
              "iso_639_1": "so"
            },
            {
              "name": "Albanian",
              "iso_639_1": "sq"
            },
            {
              "name": "Serbian",
              "iso_639_1": "sr"
            },
            {
              "name": "Swati",
              "iso_639_1": "ss"
            },
            {
              "name": "Sotho, Southern",
              "iso_639_1": "st"
            },
            {
              "name": "Sundanese",
              "iso_639_1": "su"
            },
            {
              "name": "Swedish",
              "iso_639_1": "sv"
            },
            {
              "name": "Swahili",
              "iso_639_1": "sw"
            },
            {
              "name": "Tamil",
              "iso_639_1": "ta"
            },
            {
              "name": "Telugu",
              "iso_639_1": "te"
            },
            {
              "name": "Tajik",
              "iso_639_1": "tg"
            },
            {
              "name": "Thai",
              "iso_639_1": "th"
            },
            {
              "name": "Tigrinya",
              "iso_639_1": "ti"
            },
            {
              "name": "Turkmen",
              "iso_639_1": "tk"
            },
            {
              "name": "Tagalog",
              "iso_639_1": "tl"
            },
            {
              "name": "Tswana",
              "iso_639_1": "tn"
            },
            {
              "name": "Tonga",
              "iso_639_1": "to"
            },
            {
              "name": "Turkish",
              "iso_639_1": "tr"
            },
            {
              "name": "Tsonga",
              "iso_639_1": "ts"
            },
            {
              "name": "Tatar",
              "iso_639_1": "tt"
            },
            {
              "name": "Twi",
              "iso_639_1": "tw"
            },
            {
              "name": "Tahitian",
              "iso_639_1": "ty"
            },
            {
              "name": "Uighur",
              "iso_639_1": "ug"
            },
            {
              "name": "Ukrainian",
              "iso_639_1": "uk"
            },
            {
              "name": "Urdu",
              "iso_639_1": "ur"
            },
            {
              "name": "Uzbek",
              "iso_639_1": "uz"
            },
            {
              "name": "Venda",
              "iso_639_1": "ve"
            },
            {
              "name": "Vietnamese",
              "iso_639_1": "vi"
            },
            {
              "name": "Volapük",
              "iso_639_1": "vo"
            },
            {
              "name": "Walloon",
              "iso_639_1": "wa"
            },
            {
              "name": "Wolof",
              "iso_639_1": "wo"
            },
            {
              "name": "Xhosa",
              "iso_639_1": "xh"
            },
            {
              "name": "Yiddish",
              "iso_639_1": "yi"
            },
            {
              "name": "Yoruba",
              "iso_639_1": "yo"
            },
            {
              "name": "Zhuang",
              "iso_639_1": "za"
            },
            {
              "name": "Chinese",
              "iso_639_1": "zh"
            },
            {
              "name": "Zulu",
              "iso_639_1": "zu"
            }
          ])
          const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  
    const options = {
      method: 'GET',
      url: `https://imdb236.p.rapidapi.com/api/imdb/${id}`,
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
      }
    };
    const fetchMovieData = async () => {
        try {
            setloading(true)
            const response = await axios.request(options);                  
            setmovie(response.data)           
            setloading(false)
            
        } catch (error) {
          if (error.response?.status === 429) {
            toast.error("API limit reached. Please wait.");
          } else {
            toast.error("Something went wrong.");
          }
            
            console.error(error);
            navigate("/")
        }
    }

    
    useEffect(() => {
           fetchMovieData()
    }, [id])
    function convertMinutes(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

   
   
  
    const findLanguage = (code) => {
      console.log("find language");
      if (!code || !languages || languages.length === 0) return false;
      const match = languages.find(lang => lang.iso_639_1 === code);
     
      console.log(match);
      console.log(code);
      
      
      return match ? match.name : "Unknown";
    };
    
    
    
    return (
        <div className='flex flex-col '>
            {/* More Details About Movie */}
           {loading ? <MovieDetailsSkeleton/> :
          (movie ?  
          (<div className='bg-[#000B31] min-h-screen text-white py-12'>
            {/* Movie Full Details */}
            <div className='w-full flex items-center justify-center gap-4 flex-wrap'>
                {/* movie poster and title details */}
                <div className='left-side px-4 flex gap-4 flex-col items-center'>
                    <h1 className='text-2xl font-bold'>{movie.originalTitle || "Unknown title"}</h1>
                    <img className='w-80 h-96' src={movie.primaryImage} alt={movie.originalTitle} />

                </div>
                {/* movie description */}
                <div className='right-side w-96 flex px-4 items-start self-start py-12 flex-col gap-3'>
                    <p>{movie.description || "Not found"}</p>
                    <div className='w-full h-[1px] bg-gray-400'></div>
                    <p className='flex flex-wrap gap-2'><span>Released </span>: {movie.startYear || "Unknown"}</p>
                    <div className='w-full h-[1px] bg-gray-400'></div>
                    <p className="text-sm text-white mt-1 flex flex-wrap gap-2">
  <span className="font-semibold text-white">Languages : </span>{" "}
  {movie?.spokenLanguages?.length > 0
    ? movie.spokenLanguages.map((lang,index) => findLanguage(lang)).join(", ")
    : "Unknown"}
</p>



                    <div className='w-full h-[1px] bg-gray-400'></div>
                    <p className=''>Imdb Rating   <span className='flex gap-2'><Star className='fill-[#ffea00] text-[#ffea00]' /> {movie.averageRating || "N/A"}/10</span></p>
                    <div className='w-full h-[1px] bg-gray-400'></div>
                    <p>Runtime : {convertMinutes(movie.runtimeMinutes) || "Not found"}</p>
                    <div className='w-full h-[1px] bg-gray-400'></div>
                    {/* Favorite and Watchlist */}
                    <div className='flex gap-2 items-center'>
                       <Favorites movie={movie} />
                       <Watchlist movie={movie} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                {/* geners details */}
                <div className='geners-dt flex flex-col px-14'>
                    <h1 className='text-[#999999]'>Geners</h1>
                    <ul className='flex gap-4 p-4 text-sm flex-wrap'>
                        {movie.genres.length > 0 ? (movie.genres.map((genre) => {
                            return <li key={genre} className='text-blue-400 font-bold'>{genre}</li>
                        })):<li  className='text-blue-400 font-bold'>No genres listed</li>}
                    </ul>
                </div>

                {/* director details */}
                <div className='director-dt flex flex-col px-14 gap-4'>
                    <h1 className='text-[#999999]'>Director</h1>
                    <h2 className='mx-4 font-bold text-sm'>{movie.directors[0].fullName || "Unknown"}</h2>
                </div>

                {/* writers details */}
                <div className='geners-dt flex flex-col px-14'>
                    <h1 className='text-[#999999]'>Writers</h1>
                    <ul className='flex gap-4 p-4 text-sm flex-wrap'>
                        {movie.writers.length > 0 ? (movie.writers.map((writer, index) => {
                            return <li key={writer.id} className='font-bold'>{writer.fullName} {index < movie.writers.length - 1 && ", "}</li>
                        })):<li  className='font-bold'>Unkown</li>}
                    </ul>
                </div>
                {/* cast details */}
                <div className='cast-dt flex flex-col px-14'>
                    <button onClick={()=>{setshowCast(!showCast)}} className='text-[#999999] flex gap-2 cursor-pointer hover:text-gray-200'>Cast {showCast ? <ChevronUp className='hover:text-gray-100 cursor-pointer' color="#999999" strokeWidth={1.75} /> : <ChevronDown className='hover:text-gray-200 cursor-pointer' color="#999999" strokeWidth={1.75} />}</button>

                    {showCast && <ul className='px-4 flex gap-2 w-full overflow-x-auto text-sm scroll-smooth scroll-m-4 scroll-p-14 py-8'>
                        {movie?.cast?.length > 0 ?(movie.cast.map((casting,index) => {
                            return <li key={index} className='flex gap-4 border py-2 px-4 '> <span className='font-semibold'>{casting.fullName || "Unknown"} &#40;{casting.job || "Unknown"}&#41;</span> <div className='w-[1px] h-full bg-gray-400 rounded-full'></div> <span className='text-gray-400'>{casting?.characters[0] || "Unknown"}</span></li>
                        })):<li>No cast found</li>}
                    </ul>}
                </div>

            </div>


        </div>):<div className='flex h-screen items-center justify-center font-bold'>Somthing went wrong</div>)}
            {/* Movies dt */}
            <div className='flex flex-col gap-4 px-8 sm:px-24 py-28 bg-[#f0f8ff]'>
                <h1 className='font-bold sm:text-3xl text-lg'>Movies</h1>
                <ul className='flex flex-col gap-2 px-4 text-sm'>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500'     to={"/movies-list/top250-movies"}  >Top 250 Movies</Link></li>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500'     to={"/movies-list/most-popular-movies"}   >Most Popular Movies</Link></li>
                </ul>

            </div>

            {/* TV Shows dt */}
            <div className='flex flex-col gap-4 px-8 sm:px-24 py-28  bg-[#fff96a]'>
                <h1 className='font-bold sm:text-3xl text-lg'>TV Shows</h1>
                <ul className='flex flex-col gap-2 px-4 text-sm'>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500'   to={"/movies-list/top250-tv"} >Top 250 TV Shows</Link></li>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500' to={"/movies-list/most-popular-tv"}>Most Popular TV Shows</Link></li>
                </ul>

            </div>

             {/* India Spotlight dt */}
             <div className='flex flex-col gap-4 px-8 sm:px-24  py-28 bg-[#f5f5dc]'>
                <h1 className='font-bold sm:text-3xl text-lg'>India Spotlight</h1>
                <ul className='flex flex-col gap-2 px-4 text-sm'>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500' to={"/india-spotlight/top-rated-malayalam-movies"}>Top Rated Malayalam Movies</Link></li>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500' to={"/india-spotlight/top-rated-tamil-movies"}>Top Rated Tamil Movies</Link></li>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500' to={"/india-spotlight/top-rated-telugu-movies"}>Top Rated Telugu Movies</Link></li>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500' to={"/india-spotlight/top-rated-indian-movies"}>Top Rated Indian Movies</Link></li>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500' to={"/india-spotlight/trending-tamil"}>Trending Tamil Movies</Link></li>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500' to={"/india-spotlight/trending-telugu"}>Trending Telugu Movies</Link></li>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500' to={"/india-spotlight/upcoming"}>Most Anticipated New India Movies and Shows</Link></li>
                </ul>

            </div>
            {/* Upcoming Movies dt */}
            <div className='flex flex-col gap-4 px-8 sm:px-24  py-28 bg-black'>
                <h1 className='font-bold sm:text-3xl text-lg text-white'>Up Coming Movies</h1>
                <ul className='flex flex-col gap-2 px-4 text-sm'>
                    <li><Link className='text-gray-400 underline cursor-pointer hover:text-gray-500' to={"/upcoming-releases"}>Movies</Link></li>
                    
                </ul>

            </div>
        </div>
    )
}

export default MovieDetails
