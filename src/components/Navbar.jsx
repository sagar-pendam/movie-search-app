import React, { useState, useContext, useEffect } from 'react'
import { Clapperboard } from 'lucide-react';
import MovieDetails from './pages/MovieDetails';
import MovieSearch from './MovieSearch';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { auth } from "./../firebase"
import { ToastContainer, Bounce, toast } from 'react-toastify';
import { signOut } from "firebase/auth";
import MovieContext from "../context/MovieContext"
import { Heart, Bookmark, Menu, X } from "lucide-react";
import { onAuthStateChanged } from 'firebase/auth'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, setuser } = useContext(MovieContext)
  const [isMenuOpen, setisMenuOpen] = useState(false)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setuser(currentUser)
      }
      else {
        setuser(null)
      }

    })

  }, [])
  const handleLogOutUser = () => {
    signOut(auth).then(() => {

      setuser(null)
      toast.success("Logged out successfully!");
      if (location.pathname !== "/") {
        navigate("/")
      }
    }).catch((error) => {
      toast.error("Logout failed. " + error.message);

    });

  }

  return (
    <nav className='flex  transition-all duration-500 h-auto flex-wrap gap-4 justify-between px-4 items-center py-2 shadow-sm backdrop-blur-xl shadow-[#3dffa5] bg-[#3dffa5]'>

      {/* logo */}

      <div className='flex gap-2 items-center justify-center'>
        <Link to={"/"} className='flex gap-1'>
          <h1 className='text-gray-600 font-bold'>Watch Movies </h1>
          <Clapperboard className='text-[#5e3dff]' /></Link>
      </div>
      {/* Full menu */}
      <div className=' justify-between gap-8 lg:flex hidden'>
        {/* Search bar */}
        <MovieSearch />
        {/* signup and signin button */}
        <div className='flex gap-2 items-center'>
          {!user && <Link to={"/user-sign-up"} className='px-4 py-2 font-semibold cursor-pointer hover:bg-blue-500 transition-all duration-300 text-white bg-blue-400 rounded-3xl'>Sign Up</Link>
          }

          {user && <button onClick={handleLogOutUser} className='bg-blue-400  cursor-pointer hover:bg-blue-500 transition-all duration-300 flex items-center justify-center font-semibold text-sm py-2 px-4 rounded-full text-white gap-2'> <LogOut className='w-4 h-4' /> Log Out</button>}
          {!user && <Link to={"/user-sign-in"} className='px-4 font-semibold py-2 text-white bg-slate-800 cursor-pointer hover:bg-slate-700 transition-all duration-300 rounded-3xl'>
            Sign In
          </Link>
          }
        </div>

        {/* Favorite and WatchList Links */}
        {user && (
          <div className="flex gap-4 items-center">
            <Link to="/favorite-movie-list" className="flex items-center gap-1 text-red-500 font-semibold hover:underline">
              Favorite List <Heart className="w-5 h-5 fill-red-500" />
            </Link>
            <Link to="/watchlist-movie-list" className="flex items-center gap-1 text-gray-500 font-semibold hover:underline">
              Watchlist <Bookmark className="w-5 h-5 fill-gray-500" />
            </Link>
          </div>
        )}

        {/* User Profile */}
        {user &&  <div className="flex items-center gap-2">
    {user.photoURL && (
      <img src={user.photoURL || "profile.jpg"} alt="Profile" className="w-8 h-8 rounded-full" />
    )}
    <span className="text-sm font-medium text-gray-600">{user.displayName || user.email}</span>
  </div>}
      </div>
      {/* Burger Menu */}
      <button className='lg:hidden flex cursor-pointer text-gray-500' onClick={() => { setisMenuOpen(!isMenuOpen) }}>{isMenuOpen ? <X /> : <Menu />}</button>
      {/* Mobile menu */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden lg:hidden flex flex-col gap-4 w-full ${!isMenuOpen ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"}`}>

        {/* Search bar */}
        <MovieSearch />
        {/* signup and signin button */}
        <div className='flex gap-2 items-center'>
          {!user && <Link to={"/user-sign-up"} className='px-4 py-2 font-semibold cursor-pointer hover:bg-blue-500 transition-all duration-300 text-white bg-blue-400 rounded-3xl'>Sign Up</Link>
          }

          {user && <button onClick={handleLogOutUser} className='bg-blue-400  cursor-pointer hover:bg-blue-500 transition-all duration-300 flex items-center justify-center font-semibold text-sm py-2 px-4 rounded-full text-white gap-2'> <LogOut className='w-4 h-4' /> Log Out</button>}
          {!user && <Link to={"/user-sign-in"} className='px-4 font-semibold py-2 text-white bg-slate-800 cursor-pointer hover:bg-slate-700 transition-all duration-300 rounded-3xl'>
            Sign In
          </Link>
          }
        </div>

        {/* Favorite and WatchList Links */}
        {user && (
          <div className="flex gap-4 items-center">
            <Link to="/favorite-movie-list" className="flex items-center gap-1 text-red-500 font-semibold hover:underline">
              Favorite List <Heart className="w-5 h-5 fill-red-500" />
            </Link>
            <Link to="/watchlist-movie-list" className="flex items-center gap-1 text-gray-500 font-semibold hover:underline">
              Watchlist <Bookmark className="w-5 h-5 fill-gray-500" />
            </Link>
          </div>
        )}

        {/* User Profile */}
       {user &&  <div className="flex items-center gap-2">
    {user.photoURL && (
      <img src={user.photoURL || "profile.jpg"} alt="Profile" className="w-8 h-8 rounded-full" />
    )}
    <span className="text-sm font-medium text-gray-600">{user.displayName || user.email}</span>
  </div>}
      </div>
    </nav>
  )
}

export default Navbar
