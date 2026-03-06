
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();


  // ✅ State

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  // ✅ Submit Handler

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);



    try {

      // call AuthContext login

      await login(email, password);


      // redirect after login

      navigate("/");

    }

    catch (err) {

      setError(

        err.message ||

        "Invalid email or password"

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

        <div className="text-white text-center px-12">

          <h1 className="text-4xl font-bold mb-4">

            Welcome Back

          </h1>

          <p className="text-lg">

            Login to book and manage your turfs

          </p>

        </div>

      </div>





      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-900 px-6">

        <div className="w-full max-w-md">



          <h2 className="text-3xl font-bold text-white text-center mb-6">

            Login to CricBox

          </h2>



          {/* ERROR */}

          {

            error && (

              <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">

                {error}

              </div>

            )

          }




          {/* FORM */}

          <form

            onSubmit={handleSubmit}

            className="space-y-5"

          >



            {/* EMAIL */}

            <input

              type="email"

              placeholder="Enter Email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"

              required

            />




            {/* PASSWORD */}

            <div className="relative">

              <input

                type={showPassword ? "text" : "password"}

                placeholder="Enter Password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"

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





            {/* BUTTON */}

            <button

              type="submit"

              disabled={loading}

              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 p-3 rounded text-white font-semibold"

            >

              {

                loading

                ?

                "Logging in..."

                :

                "Login"

              }

            </button>



          </form>




          {/* SIGNUP */}

          <p className="text-gray-400 text-center mt-6">

            Don't have account?

            <Link

              to="/Signup"

              className="text-green-500 ml-2 hover:underline"

            >

              Signup

            </Link>

          </p>



        </div>

      </div>



    </div>

  );

}



export default LoginPage;

