import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../Loader";
import { ToastContainer, Bounce, toast } from 'react-toastify';
import { collection, addDoc, getDoc, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { Eye, EyeOff } from 'lucide-react';
const SignIn = () => {

  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const { register, formState: { errors }, setError, handleSubmit } = useForm();
  const [showPassword, setshowPassword] = useState(false)

  const onSubmit = async (data) => {
    try {
      setloading(true)
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user

      setloading(false)
      toast.success("Logged in successfully!");
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
      setloading(false);

      if (error.code === "auth/invalid-credential") {
        setError("password", {
          type: "manual",
          message: "Incorrect password.",
        });
      } else if (error.code === "auth/user-not-found") {
        setError("email", { type: "manual", message: "No account found with this email." });
      } else if (error.code === "auth/too-many-requests") {
        setError("email", { type: "manual", message: "Too many attempts. Try again later." });
      } else {
        setError("email", { type: "manual", message: "Login failed. Please try again." });
      }



    }



  }

  const googleLoginButton = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user


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

    }
    catch (error) {
      console.error(error)



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

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4">
        {loading && <Loader />}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <button
          type="button"
          onClick={googleLoginButton}
          className="flex gap-2 items-center justify-center px-4 py-2 rounded-lg border mx-auto cursor-pointer hover:bg-gray-100 transition-all duration-300"
        >
          Google <img src="./google.png" className="w-4 h-4" alt="" />
        </button>

        <div className="flex items-center justify-center">
          <span className="text-gray-400 text-sm">OR</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            name="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: { value: true, message: "Please enter email" }, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
            className={`w-full px-4 py-2 border ${errors.email ? " focus:outline-none focus:ring-1 focus:ring-red-500" : "border-gray-300 ring-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              } rounded-lg `}
          />
          {errors.email && <span className="text-red-400 animate-pulse">{errors.email.message}</span>}
          <div className="flex flex-col gap-2 relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"

              {...register("password", { required: { value: true, message: "Please enter password" }, minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="button" onClick={() => { setshowPassword(!showPassword) }} className="text-sm cursor-pointer hover:text-gray-400 transition-all duration-300 absolute z-40 right-2 top-3"> {showPassword ? <EyeOff className="w-4 h-4 " /> : <Eye className="w-4 h-4 " />}</button>
            {errors.password && <span className="text-red-400 animate-pulse">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>
        {/* Sign Up and Forgot password Links */}
        <div className="flex flex-col items-center gap-4" >
          <Link className="text-blue-400 text-sm  cursor-pointer hover:text-blue-500" to={"/user-forgot-password"}> Forgot password ?</Link>

          <div className="flex gap-2 items-center">
            <p className="text-sm font-thin">New to WatchMovie ?</p>
            <Link className="text-blue-400 text-sm  cursor-pointer hover:text-blue-500" to={"/user-sign-up"}> Sign up</Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
