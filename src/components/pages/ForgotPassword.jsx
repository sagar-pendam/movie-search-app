import React from 'react'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, Bounce, toast } from 'react-toastify';
function ForgotPassword() {
    const [loading, setLoading] = useState(false);

    const { register, formState: { errors, isSubmitted, isSubmitSuccessful }, setError, handleSubmit } = useForm();

    const handlePasswordReset = async (email) => {

    }

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, data.email)
            setLoading(false);
          
            toast.info("Password reset email sent!")
        }
        catch (error) {
            if (error.response?.status === 429) {
                toast.error("API limit reached. Please wait.");
              } else if (error.code === "auth/user-not-found") {
                setError("email", { type: "manual", message: "No account found with this email." }) 
              } 
            setError("email", { type: "manual", message: "Error sending password reset email" })
            console.error("Error sending password reset email:", error.message);
           

        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {isSubmitSuccessful ? <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4">
                <div className="flex  flex-col gap-2 items-center justify-center">
                    <h2 className="text-2xl font-bold  text-center text-gray-800">Check your inbox</h2>
                    <p className='text-gray-500 text-sm text-wrap text-center'>
                        An email with a link to reset your password was sent to the email address associated with your account.
                    </p>

                </div>
                <Link className="text-gray-400 text-sm  cursor-pointer underline hover:text-gray-500" to={"/user-forgot-password"}> Resend</Link>

            </div> :
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4">
                    <div className="flex  flex-col gap-2 items-center justify-center">
                        <h2 className="text-2xl font-bold  text-center text-gray-800">Reset your password</h2>
                        <p className='text-gray-500 text-sm text-wrap text-center'>Enter your email address or username and we’ll send you a link to reset your password</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input
                        name='email'
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: { value: true, message: "Please enter email" }, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <span className="text-red-400 animate-pulse">{errors.email.message}</span>}

                        <button
                          disabled={loading}
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                        >
                            {loading ? "Sending..." : "Reset Password"}
                        </button>
                    </form>



                </div>}
        </div>
    )
}

export default ForgotPassword
