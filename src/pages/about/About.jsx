import React from "react";
import { Link } from "react-router-dom";

const About = () => {

  return (

    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/image-wm.png')"   // put cricket image in public folder
      }}
    >

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/80"></div>


      {/* Content */}

      <div className="relative z-10 text-white px-6 py-12">


        {/* Heading */}

        <h1 className="text-5xl font-bold text-center text-green-500 mb-10">

          About CRICBOX

        </h1>



        {/* Main Content */}

        <div className="max-w-5xl mx-auto space-y-6 text-lg text-gray-300">


          <p>

            <span className="text-green-400 font-semibold">CRICBOX</span> is a modern sports ground booking platform that allows users to easily discover and book box cricket and other sports grounds. Our system connects players and ground owners on one platform, making booking simple, fast, and efficient.

          </p>


          <p>

            Players can search grounds, check availability, and book instantly, while ground owners can add and manage their facilities. Our goal is to digitize sports ground booking and improve accessibility for everyone.

          </p>


          {/* Features */}

          <div>

            <h2 className="text-2xl text-green-400 font-semibold mb-3">

              Key Features

            </h2>

            <ul className="list-disc list-inside space-y-2">

              <li>Book Box Cricket, Badminton, Basketball, Pickleball, and Tennis courts</li>

              <li>Role-based login for Customer and Owner</li>

              <li>Owner dashboard to add and manage grounds</li>

              <li>Real-time booking system</li>

              <li>Secure and responsive platform</li>

            </ul>

          </div>


          {/* Developer Section */}

          <div className="pt-8 border-t border-gray-700">

            <h2 className="text-2xl text-green-400 font-semibold mb-4">

              Developer Information

            </h2>


            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">

              <h3 className="text-xl font-bold text-white">

                Rohit Saini

              </h3>

              <p className="text-gray-400">

                Full Stack Developer

              </p>

              <p className="text-gray-400 mt-2">

                This project is built using MERN Stack (MongoDB, Express.js, React.js, Node.js) with modern UI and secure authentication system.

              </p>

            </div>

          </div>



          {/* Contact Button */}

          <div className="text-center pt-10">

            <Link to="/contact">

              <button className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg text-lg font-semibold transition duration-300">

                Contact Us

              </button>

            </Link>

          </div>



          {/* Footer Line */}

          <p className="text-center text-green-400 font-semibold pt-10 text-xl">

            Your Game. Your Turf. Book Now.

          </p>


        </div>


      </div>

    </div>

  );

};

export default About;