import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

function Footer() {

  return (

    <footer className="bg-gray-700 text-white ">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


          {/* Logo and About */}

          <div>

            <div className="flex items-center gap-3 mb-4">

              <img
                src="/image.png"
                alt="logo"
                className="h-10 w-10 rounded-full"
              />

              <h2 className="text-xl font-bold">
                CRIC-BOX
              </h2>

            </div>

            <p className="text-gray-300 text-sm">

              Book your favorite box cricket ground anytime, anywhere. Find nearby turfs, check availability, and enjoy the game with your friends hassle-free.

            </p>

          </div>



          {/* Quick Links */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-300">

              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/Grounds" className="hover:text-yellow-400">
                  Grounds
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-yellow-400">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-yellow-400">
                  Contact
                </Link>
              </li>

            </ul>

          </div>



          {/* Social Media */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <Link to="https://www.facebook.com" target="_blank"><Facebook className="hover:text-yellow-400 cursor-pointer" /></Link>

              <Link to="https://www.instagram.com" target="_blank"><Instagram className="hover:text-yellow-400 cursor-pointer" /></Link>

              <Link to="https://www.twitter.com" target="_blank"><Twitter className="hover:text-yellow-400 cursor-pointer" /></Link>

              <Link to="https://www.youtube.com" target="_blank"><Youtube className="hover:text-yellow-400 cursor-pointer" /></Link>

            </div>

          </div>


        </div>


        {/* Bottom */}

        <div className="border-t border-green-700 mt-8 pt-4 text-center text-gray-400 text-sm">

          © 2026 CRIC-BOX. All rights reserved.

        </div>


      </div>

    </footer>

  );

}

export default Footer;