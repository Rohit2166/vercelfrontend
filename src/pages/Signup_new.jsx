
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Signup() {

  const navigate = useNavigate();

  const { signup } = useAuth();



  // ✅ States

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState("customer");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);




  // ✅ Submit Handler

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");



    // Password match check

    if (password !== confirmPassword) {

      return setError("Passwords do not match");

    }



    // Password length check

    if (password.length < 6) {

      return setError("Password must be at least 6 characters");

    }



    setLoading(true);



    try {

      await signup(

        name,

        email,

        password,

        role

      );



      // Redirect after signup

      navigate("/");

    }

    catch (err) {

      setError(

        err.message ||

        "Signup failed"

      );

    }

    finally {

      setLoading(false);

    }

  };





  return (

    <div className="min-h-screen flex">



      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-400 to-green-900 items-center justify-center">

        <h1 className="text-white text-4xl font-bold text-center px-8">

          Join CricBox and Book Your Favourite Turf

        </h1>

      </div>





      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-900 px-6">

        <div className="w-full max-w-md">



          <h2 className="text-3xl text-white font-bold text-center mb-6">

            Create Account

          </h2>



          {/* ERROR */}

          {

            error &&

            (

              <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">

                {error}

              </div>

            )

          }





          {/* ROLE */}

          <div className="flex justify-center gap-6 mb-6 text-white">


            <label className="flex items-center cursor-pointer">

              <input

                type="radio"

                value="customer"

                checked={role==="customer"}

                onChange={(e)=>setRole(e.target.value)}

              />

              <span className="ml-2">

                Customer

              </span>

            </label>



            <label className="flex items-center cursor-pointer">

              <input

                type="radio"

                value="owner"

                checked={role==="owner"}

                onChange={(e)=>setRole(e.target.value)}

              />

              <span className="ml-2">

                Owner

              </span>

            </label>



          </div>





          {/* FORM */}

          <form

            onSubmit={handleSubmit}

            className="space-y-4"

          >



            {/* NAME */}

            <input

              type="text"

              placeholder="Full Name"

              value={name}

              onChange={(e)=>setName(e.target.value)}

              className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500"

              required

            />




            {/* EMAIL */}

            <input

              type="email"

              placeholder="Email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500"

              required

            />




            {/* PASSWORD */}

            <div className="relative">

              <input

                type={

                  showPassword

                  ?

                  "text"

                  :

                  "password"

                }

                placeholder="Password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

                className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500"

                required

              />


              <span

                onClick={()=>setShowPassword(!showPassword)}

                className="absolute right-3 top-3 text-gray-400 cursor-pointer"

              >

                {

                  showPassword

                  ?

                  <EyeOff size={20}/>

                  :

                  <Eye size={20}/>

                }

              </span>

            </div>




            {/* CONFIRM PASSWORD */}

            <input

              type="password"

              placeholder="Confirm Password"

              value={confirmPassword}

              onChange={(e)=>setConfirmPassword(e.target.value)}

              className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500"

              required

            />





            {/* BUTTON */}

            <button

              type="submit"

              disabled={loading}

              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 p-3 rounded text-white font-semibold"

            >

              {

                loading

                ?

                "Creating Account..."

                :

                "Signup"

              }

            </button>




          </form>




          {/* LOGIN */}

          <p className="text-gray-400 text-center mt-6">

            Already have account?

            <Link

              to="/LoginPage"

              className="text-green-500 ml-2"

            >

              Login

            </Link>

          </p>



        </div>

      </div>



    </div>

  );

}



export default Signup;

