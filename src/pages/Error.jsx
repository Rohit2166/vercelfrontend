import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">

     
      <div className="absolute w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-blue-600 opacity-20 rounded-full blur-3xl animate-bounce"></div>


      
      <div className="text-center z-10">

       
        <h1 className="text-9xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text animate-pulse">
          404
        </h1>

       
        <p className="text-xl mt-4 text-gray-300 animate-fadeIn">
          Oops! Page not found
        </p>

        <p className="text-gray-500 mt-2">
          The page you are looking for does not exist.
        </p>


        {/* Button */}
        <Link to="/">

          <button className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:scale-110 hover:shadow-purple-500/50 hover:shadow-lg transition duration-300">

            Go Home

          </button>

        </Link>

      </div>

    </div>
    </div>
  )
}

export default Error
