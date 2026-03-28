
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";


const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/");
  };

  return (

    <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">


          {/* Logo */}

          <div className="text-2xl font-bold h-20 w-20 flex items-center justify-center object-cover overflow-hidden rounded-full">

           <img src="/image.png" alt="CricBox" />

          </div>


          {/* Desktop Menu */}

          <ul className="hidden md:flex gap-8 font-semibold items-center">

            <li className="hover:text-orange-400">
              <Link to="/">Home</Link>
            </li>

            <li className="hover:text-orange-400">
              <Link to="/About">About</Link>
            </li>

            <li className="hover:text-orange-400">
              <Link to="/Contact">Contact</Link>
            </li>

            {isAuthenticated ? (
              <>
                {user?.role === 'customer' && (
                  <>
                    <li className="hover:text-orange-400">
                      <Link to="/Grounds">Grounds</Link>
                    </li>
                    <li className="hover:text-orange-400">
                      <Link to="/my-bookings">My Bookings</Link>
                    </li>
                  </>
                )}
                {user?.role === 'owner' && (
                  <li className="hover:text-orange-400">
                    <Link to="/owner/dashboard">Dashboard</Link>
                  </li>
                )}
                <li className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                  >
                    <User size={18} />
                    <span>{user?.name}</span>
                  </button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 bg-gray-700 rounded shadow-lg w-48 z-50">
                      <div className="px-4 py-3 border-b border-gray-600">
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm text-gray-300">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-600 flex items-center gap-2 text-red-400"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <li className="hover:text-orange-400">
                <Link to="/LoginPage">Login</Link>
              </li>
            )}

          </ul>


          {/* Mobile Menu Button */}

          <div className="md:hidden">

            <button onClick={() => setIsOpen(!isOpen)}>

              {isOpen ? <X size={28} /> : <Menu size={28} />}

            </button> 

          </div>

        </div>

      </div>


      {/* Mobile Menu */}

      {isOpen && (

        <div className="md:hidden bg-gray-800 px-4 pb-4">

          <ul className="flex flex-col gap-4 font-semibold">

            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>

            <li>
              <Link to="/About" onClick={() => setIsOpen(false)}>About</Link>
            </li>

            <li>
              <Link to="/Contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </li>

            {isAuthenticated ? (
              <>
                {user?.role === 'customer' && (
                  <>
                    <li>
                      <Link to="/Grounds" onClick={() => setIsOpen(false)}>Grounds</Link>
                    </li>
                    <li>
                      <Link to="/my-bookings" onClick={() => setIsOpen(false)}>My Bookings</Link>
                    </li>
                  </>
                )}
                {user?.role === 'owner' && (
                  <li>
                    <Link to="/owner/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/LoginPage" onClick={() => setIsOpen(false)}>Login</Link>
              </li>
            )}

          </ul>

        </div>

      )}

    </nav>

  );

};

export default Navbar;