import React,{useContext} from 'react'
import { Navigate } from 'react-router-dom'
import MovieContext from '../context/MovieContext'
import Loader from './Loader';
function ProtectedRoute({children}) {
   const {user,setuser,authLoading} = useContext(MovieContext);
   if (authLoading) {
      return <div className="text-center py-10 flex items-center h-screen justify-center">Please Wait ... <Loader/></div>; 
    }
  
    if (!user) {
      return <Navigate to="/signin" />;
    }
  
    return children;
}

export default ProtectedRoute
