import React, { useEffect, useState, useContext } from 'react'
import { db } from "../../firebase"
import { collection, addDoc, getDoc, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { Link ,useNavigate} from 'react-router-dom';
import { Star,Heart, Bookmark } from 'lucide-react';
import MovieContext from '../../context/MovieContext';
import Favorites from '../Favorites';
import FavAndWatchListSkeleton from '../skeleton/FavAndWatchListSkeleton';
function FavoriteMovieList() {
  const { user, setuser } = useContext(MovieContext)
  const [favMovieList, setfavMovieList] = useState([])
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()
  const showAllFavoriotes = async () => {
    

    const id = user?.uid || null
    if(id)
    {
      const userRef = doc(db, "users", id)
    const userDocSnap = await getDoc(userRef)

   const userData = userDocSnap.data()
   setfavMovieList(userData?.favorites || [])
    }
    setloading(false)
  }

  useEffect(() => {
    showAllFavoriotes()
  }, [user])
  const handleCardClick = (movieId, e) => {
    // prevent navigation if click was on Favorite button
    if (e.target.closest('.favorite-btn')) return
    navigate(`/movie/${movieId}`);
  };
  const handleRemoveFromFavorites = async(movieId) => {
    setfavMovieList(prev => prev.filter(movie => movie.id !== movieId));   
   await showAllFavoriotes()
  };
  return (
    <div className='flex items-center py-8 justify-center w-full min-h-screen'>
      {loading ? <FavAndWatchListSkeleton/>:
      favMovieList?.length > 0 ? 
      ( <div className='fav-container flex-col gap-4 flex w-[80%]'>
         <div className='flex gap-2 items-center '>
           <h1 className='text-2xl  font-semibold text-blue-400'>Favorite Movies</h1>
           <span><Heart className='w-4 h-4 fill-red-400' /></span>
           </div>
         <ul className='flex flex-col items-center backdrop-blur-sm bg-slate-900 shadow-slate-900   text-white shadow-lg p-5 border rounded-lg justify-center gap-4 w-full'>
           {favMovieList?.map((movie, index) => (
             <li key={index} className='w-full'>
               <div onClick={(e) => handleCardClick(movie.id, e)}  className='movie-cart cursor-pointer custom-shadow mt-4 px-4 gap-4 w-full py-2 flex items-center flex-wrap justify-around border rounded-lg'>
                 <img className='w-16 h-16 rounded-md' src={movie.primaryImage} alt={movie.originalTitle} />
                 <div className='flex gap-1 flex-col w-[80%]'>
                   <h1 className='font-semibold'>{movie.originalTitle || "Unknown title"}</h1>
                   <div className='w-full h-[1px] bg-gray-200'></div>
                   <div className='flex flex-col gap-1 '>
                     <p className='font-semibold'>IMDb Rating</p>
                     <span className='flex gap-2 items-center text-sm'>
                       <Star className='fill-[#ffea00] w-4 h-4 text-[#ffea00] text-sm' />
                       {movie.averageRating || "N/A"}/10
                     </span>
                   </div>
                 </div>
                 {/* <Favorites /> */}
                <div className='favorite-btn'>
                <Favorites movie={movie} onRemove={handleRemoveFromFavorites} />
                
                </div>
               </div>
             </li>
           ))}
         </ul>
 
       </div>) : (<h1 className='font-bold'>No Item Found</h1>)
      }
    </div>
  )
}

export default FavoriteMovieList
