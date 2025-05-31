import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Watchlist from '../Watchlist';
import Favorites from '../Favorites';
import IndiaSpotlightSkeleton from '../skeleton/IndiaSpotlightSkeleton';
import axios from 'axios';
import { toast } from "react-toastify";
function IndiaSpotlight() {
    const { category } = useParams()
    const [moviesList, setmoviesList] = useState([])
    const [loading, setloading] = useState(true)
    const [title, settitle] = useState("")
    const [languages, setlanguages] = useState([
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
        url: `https://imdb236.p.rapidapi.com/imdb/india/${category}`,
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
      };
      
    useEffect(() => {
        if (category === "top-rated-tamil-movies") {
            settitle("Top Rated Tamil Movies")
        }
        if (category === "top-rated-telugu-movies") {
            settitle("Top Rated Telugu Movies")
        }
        if (category === "top-rated-malayalam-movies") {
            settitle("Top Rated Malayalam Movies")
        }
        if (category === "top-rated-indian-movies") {
            settitle("Top Rated Indian Movies")
        }
        if (category === "trending-telugu") {
            settitle("Trending Telugu Movies")
        }
        if (category === "trending-tamil") {
            settitle("Trending Tamil Movies")
        }
        if (category === "upcoming") {
            settitle("Most Anticipated New India Movies and Shows")
        }
        const fetchData = async () => {
            try {
                setloading(true)
                const response = await axios.request(options);
                setmoviesList(response.data)
              

                setloading(false)
            } catch (error) {
              if (error.response?.status === 429) {
                toast.error("API limit reached. Please wait.");
              } else {
                toast.error("Something went wrong.");
              }
                console.error(error);
            }
        }
        fetchData()
    }, [category])
    function convertMinutes(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }
    const findLanguage = (code)=>{
        const language = languages.filter((lang)=> lang.iso_639_1 === code)  
        return language[0].name
    }
    return (

        <div className='flex flex-col gap-8 p-5 w-full'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>India Spotlight </h1>
                <h2 className='text-gray-400'>Top 50 Malayalam movies as rated by IMDb Users</h2>
            </div>
            <div className='flex flex-col sm:w-[80%]  px-4 py-10 gap-4'>
                <h1 className='text-lg font-semibold text-yellow-400'>{title}</h1>

                {/* show movie list */}
                {loading ? <IndiaSpotlightSkeleton />
                    :
                    <div className='flex flex-wrap items-center justify-around gap-4'>

                        {/* movie card */}
                        {moviesList && moviesList.length > 0 ?
                            (
                                moviesList.map((movie, index) => {
                                    return <div key={index} className='flex cursor-pointer hover:bg-[#434242] hover:text-white hover:border-slate-600 border-2 transition-all duration-300  flex-wrap  backdrop-blur-lg   px-4 py-4 rounded-lg shadow-sm  justify-center gap-4 w-full'>
                                        {/* left side */}
                               < div className='left-box flex flex-col gap-4 w-auto'>
                                        <img
                                            className='w-16 h-16 rounded-md'
                                            src={movie.primaryImage || '/placeholder.jpg'}
                                            alt={movie.originalTitle || 'N/A'}
                                        />
                                        <p>{convertMinutes(movie.runtimeMinutes) || 'Unknown duration'}</p>
                                    </div>
                                    {/* horizontal line */ }
                                    {/* <div className='w-[2px]   bg-gray-200 rounded-full '>
                                </div> */}
                                    {/* right side */ }
                                    <div className='flex flex-col w-[79%] gap-4'>
                                        <h1 className='font-semibold'>{movie.originalTitle || 'Untitled Movie'}</h1>
                                        {/* release dt and rating dt */}
                                        <div className='flex gap-4 flex-wrap '>
                                            <div className='flex gap-4'>
                                                <span className='flex gap-2'> <Star className='fill-yellow-400 text-yellow-400 w-4' /> {movie.averageRating || 'N/A'} / 10</span>
                                            </div>
                                            <div className='w-[2px] sm:flex hidden  bg-gray-200 rounded-full '>
                                            </div>
                                            {/* Language */}
                                            <p className='font-semibold'>Language : {movie.spokenLanguages?.length > 0 ?(movie.spokenLanguages.map((langCode,index)=>{
                                                 
                                                return <span key={index}>{findLanguage(langCode)} {index < movie.spokenLanguages.length -1 && ", "}</span>
                                            })):"Unknown"}</p>
                                        </div>
                                        {/* Genrens Details */}
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='font-semibold'>Genres</h1>
                                            <ul className='flex overflow-x-auto gap-2 py-2'>

                                                {movie.genres?.length > 0 ? ( movie.genres.map((genre) => {
                                                    return <li key={genre} className='px-4 py-1 rounded-full border max-w-fit font-light text-sm  bg-slate-900 text-white shadow-slate-400'>{genre}</li>
                                                })): <li className='text-sm text-gray-500 italic'>No genres listed</li>}
                                            </ul>
                                        </div>
                                        {/* more details */}


                                        <Link to={`/movie/${movie.id}`} className='underline text-gray-400 cursor-pointer hover:text-blue-400'>Details</Link>

                                        <div className='flex items-center justify-between w-auto  gap-2'>
                                            <Favorites movie={movie} />
                                            <Watchlist movie={movie} />
                                        </div>
                                    </div>
    
                            </div>

                })
                ):<div className='flex h-screen justify-center items-center w-full'>No movies found or something went wrong.</div>}
            </div> }
        </div>
        </div >
    )
}

export default IndiaSpotlight
