import React, { useState, useContext, useRef, useEffect } from 'react'
import { Heart, Bookmark } from "lucide-react";
import { collection, addDoc, getDoc, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../firebase"
import MovieContext from "../context/MovieContext"
import { ToastContainer, Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Favorites({ movie, onRemove }) {

  const { user, setuser } = useContext(MovieContext)
  const [isFav, setisFav] = useState(false)
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const addFavorite = async () => {
    try {
      if (loading) return
      setloading(true)
      //If user logged in than execute this block
      if (user) {
        const id = user.uid
        const userRef = doc(db, "users", id)
        const userDocSnap = await getDoc(userRef)
        //If item exists in favorites list than remove
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          const favorites = userData.favorites || [];

          const isAlreadyFavorited = favorites.some((favmovie) => favmovie.id === movie.id)
          if (isAlreadyFavorited) {
            // Filter out the movie to be removed
            const favMovie = favorites.filter((favmovie) => favmovie.id !== movie.id)
            await updateDoc(userRef, { favorites: favMovie })
            setisFav(false)
            if (onRemove) onRemove(movie.id)
          }

          //If item does not exists in  favorites list  than add
          else {
            // movie not in favorites
            await setDoc(userRef, { favorites: arrayUnion({ id: movie.id, primaryImage: movie.primaryImage, originalTitle: movie.originalTitle, averageRating: movie.averageRating }) }, { merge: true })
            setisFav(true)
          }
       
        }
      }
      //If user not signed up or logged in than redirect to signup page
      else {
        navigate("/user-sign-up")
        console.log("No such document!");
      }
    }
    catch (e) {

      console.error("Error adding document: ", e);
    }
    finally {
      setloading(false)
    }
  }

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const favorites = userData.favorites || [];
          const exists = favorites.some((fav) => fav.id === movie.id);
          setisFav(exists);
        }
      }
    };
    checkIfFavorited();
  }, [user, movie.id]);
  return (
    <div onClick={addFavorite} className={`cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
      <ToastContainer />
      <Heart className={`text-red-500 w-6 h-6 ${isFav && "fill-red-500"}`} />
    </div>
  )
}

export default Favorites
