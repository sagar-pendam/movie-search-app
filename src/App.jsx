import { useState, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favorites from './components/Favorites';
import MovieDetails from './components/pages/MovieDetails';
import Watchlist from './components/Watchlist';
import Home from './components/pages/Home';
import Movies from './components/pages/Movies';
import IndiaSpotlight from './components/pages/IndiaSpotlight';
import UpcomingMovies from './components/pages/UpcomingMovies';
import Navbar from './components/Navbar';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import ForgotPassword from './components/pages/ForgotPassword';
import FavoriteMovieList from './components/pages/FavoriteMovieList';
import { ToastContainer,Bounce } from "react-toastify";
import WatchListMovieList from './components/pages/WatchListMovieList';
import MovieContext from './context/MovieContext';
import Footer from './components/Footer';
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const [count, setCount] = useState(0)
  const [movieList, setmovieList] = useState([])
  const [user, setuser] = useState(null)
  const [favoriteList, setfavoriteList] = useState([])

  return (
    <>
      <MovieContext.Provider value={{ movieList, setmovieList, user, setuser, favoriteList, setfavoriteList }}>

        <BrowserRouter>
          <Navbar />
          <ToastContainer position="top-right" autoClose={4000}

            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce} />
             <ScrollToTop/>
          <Routes>
           
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<MovieDetails />} />
            <Route path='/movies-list/:category' element={<Movies />} />
            <Route path='/india-spotlight/:category' element={<IndiaSpotlight />} />
            <Route path='/upcoming-releases' element={<UpcomingMovies />} />
            <Route path='/user-sign-up' element={<SignUp />} />
            <Route path='/user-sign-in' element={<SignIn />} />
            <Route path='/user-forgot-password' element={<ForgotPassword />} />
            <Route path='/favorite-movie-list' element={<ProtectedRoute><FavoriteMovieList /></ProtectedRoute>} />
            <Route path='/watchlist-movie-list' element={<ProtectedRoute><WatchListMovieList /></ProtectedRoute>} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </MovieContext.Provider>
    </>
  )
}

export { MovieContext }
export default App

