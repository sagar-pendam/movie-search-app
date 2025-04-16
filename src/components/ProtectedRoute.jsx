import React,{useContext} from 'react'
import { Navigate } from 'react-router-dom'
import MovieContext from '../context/MovieContext'
function ProtectedRoute({children}) {
   const {user,setuser} = useContext(MovieContext);
   if(!user){
    return <Navigate to="/user-sign-in" />
   }
   return children
}

export default ProtectedRoute
