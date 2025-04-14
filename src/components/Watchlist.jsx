import React, { useState, useContext, useRef, useEffect } from 'react'
import { Heart, Bookmark } from "lucide-react";
import { collection, addDoc, getDoc, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../firebase"
import MovieContext from "../context/MovieContext"
import { ToastContainer, Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Watchlist({movie, onRemove }) {

    const { user, setuser } = useContext(MovieContext)
    const [isWatchlist, setisWatchlist] = useState(false)
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const addOrRemoveWatchlistMovie = async () => {
        try {
            if (loading) return
            setloading(true)
            //If user logged in than execute this block
            if (user) {

                const id = user.uid
                const userRef = doc(db, "users", id)
                const userDocSnap = await getDoc(userRef)
                //If item exists in watchlist than remove
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();


                    const watchlist = userData.watchlist || [];

                    const isAlreadyInWatchlist = watchlist.some((watchlistMovie) => watchlistMovie.id === movie.id)
                    if (isAlreadyInWatchlist) {
                        // Filter out the movie to be removed
                        const watchlistMovie = watchlist.filter((watchlistMovie) => watchlistMovie.id !== movie.id)


                        await updateDoc(userRef, { watchlist: watchlistMovie })
                        setisWatchlist(false)
                        if (onRemove) onRemove(movie.id);
                       

                    }

                    //If item does not exists in  watchlistlist  than add
                    else {
                        // movie not in watchlist



                        await setDoc(userRef, { watchlist: arrayUnion({ id: movie.id, primaryImage: movie.primaryImage, originalTitle: movie.originalTitle, averageRating: movie.averageRating }) }, { merge: true })
                        setisWatchlist(true)
                    }
                    
                      return userData;
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
        const checkIfAddedInWatchList = async () => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap?.data();
                    const watchlist = userData.watchlist || [];
                    const exists = watchlist.some((item) => item.id === movie.id);
                    setisWatchlist(exists);
                    
                    
                }
            }
        };
        checkIfAddedInWatchList();
    }, [user, movie.id]);
  
    return (
        <div  onClick={addOrRemoveWatchlistMovie}  className={`cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
            <ToastContainer />
            <Bookmark className={`text-slate-500 w-6 h-6 ${isWatchlist && "fill-slate-500"}`} />
        </div>
    )
}

export default Watchlist
