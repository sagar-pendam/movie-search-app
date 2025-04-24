import React, { useState,useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth ,db} from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye ,EyeOff} from 'lucide-react';
import Loader from "../../components/Loader"
import { toast } from "react-toastify";
import { collection, addDoc, getDoc, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false)
  const { register, formState: { errors,isSubmitting }, setError, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false)
 
  const onSubmit = async (data) => {
   
    try {
      setloading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      setloading(false)
      toast.success("Account created successfully!");
        // Check if Firestore doc exists, create if not
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        favorites: [],
        watchlist: [],
       
      });
    }
      navigate("/");
    } catch (error) {
      setloading(false)
      toast.error("Signup failed. " + error.message);
      if (error.code === "auth/email-already-in-use") {
       
        setError("email",{type:"manual",message:"This email is already registered. Please log in"})
      }
      else{
        console.log(error);
        
        setError("email",{type:"manual",message:"Invalid username or password!"})
      }
     
    }
  }
  useEffect(() => {
    if (errors.email) {
      document.querySelector("input[name='email']")?.focus();
    } else if (errors.password) {
      document.querySelector("input[name='password']")?.focus();
    }
  }, [errors]);
  
  return (
    <div className="flex items-center px-4 justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        {loading && <Loader/> }
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
          name="email"
            type="email"
            placeholder="Email"
            {...register("email", { required:{value:true,message:"Please enter email"},pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"Invalid email"}})} 

            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
           {errors.email && <span className="text-red-400 animate-pulse">{errors.email.message}</span>}
         <div className="flex flex-col gap-2 relative">
         <input
         name="password"
            type={showPassword ? "text":"password"}
            placeholder="Password"
            {...register("password", { required:{value:true,message:"Please enter password"},
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message:
                  "Password must be 8+ characters, include uppercase, lowercase, number & special character",
              } })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button  type="button"  onClick={()=>{setshowPassword(!showPassword)}} className="text-sm cursor-pointer hover:text-gray-400 transition-all duration-300 absolute z-40 right-2 top-3"> {showPassword ?   <EyeOff className="w-4 h-4 "  />:<Eye className="w-4 h-4 " /> }</button>
          {errors.password && <span className="text-red-400 animate-pulse">{errors.password.message}</span>}
         </div>
          <button
          disabled={loading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="flex gap-2 items-center py-4">
          <p className="text-sm">Already have an account ?</p>
          <Link to={"/user-sign-in"} className="text-blue-400 text-sm cursor-pointer hover:text-blue-400">Log In</Link>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
