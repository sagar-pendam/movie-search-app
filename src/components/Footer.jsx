import React,{useContext} from 'react';
import { Clapperboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovieContext from "../context/MovieContext"
const Footer = () => {
    const {user,setuser} = useContext(MovieContext)
  return (
    <footer className="bg-[#001245] text-white py-8 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <Clapperboard className="text-[#5e3dff]" />
          <h1 className="text-xl font-bold text-white">Watch Movies</h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 flex-wrap text-sm text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          {user && <Link to="/favorite-movie-list" className="hover:text-white transition">Favorites</Link>}
          {user && <Link to="/watchlist-movie-list" className="hover:text-white transition">Watchlist</Link>}
          {!user && <Link to="/user-sign-in" className="hover:text-white transition">Sign In</Link>}
          {!user && <Link to="/user-sign-up" className="hover:text-white transition">Sign Up</Link>}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            <img src='/facebook.svg' alt='facebook' />
          </a>
          <a
            
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
           <img src='/instagram.svg' alt='instagram'/>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} Watch Movies. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
