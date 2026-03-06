import React from 'react'
import Navbar from './components/Home/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Error from './pages/Error'
import Grounds from './pages/Grounds/Grounds'
import About from './pages/about/About'
import Contact from './pages/Contact/Contact'
import LoginPage from './pages/LoginPage_new'
import Footer from './components/Footer/Footer'
import Signup from './pages/Signup_new'
import Cricket from './pages/Grounds/Cricket'
import Pickelballl from './pages/Grounds/Pickelballl'
import Badminton from './pages/Grounds/Badminton'
import Basketball from './pages/Grounds/Basketball'
import Tennis from './pages/Grounds/Tennis'
import OwnerDashboard from "./pages/OwnerDashboard";
import AddTurf from "./pages/AddTurf";
import EditTurf from "./pages/EditTurf";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import TurfDetails from "./pages/Turfground/TurfDetails";
import BadmintonDetails from "./pages/Turfground/BadmintonDetails";
import BasketballDetails from "./pages/Turfground/BasketballDetails";
import PickleballDetails from "./pages/Turfground/PickleballDetails";
import TennisDetails from "./pages/Turfground/TennisDetails";




const App = () => {
  return (
    
    <div>
      

      <Navbar/>
      <Routes>
        
<Route path='*' element={<Error/>}/>
  <Route path="/" element={<Home/>}/>
  <Route path="/edit-turf/:id" element={<EditTurf />} />
  <Route path="/owner/dashboard" element={<OwnerDashboard />} />
  <Route path="/add-turf" element={<AddTurf />} />
<Route path='/Grounds' element={<Grounds/>}/>
  <Route path="/Grounds/Cricket" element={<Cricket/>}/>
<Route path="/Grounds/Pickelballl" element={<Pickelballl/>}/>
  <Route path="/Grounds/Badminton" element={<Badminton/>}/>
<Route path="/Grounds/Basketball" element={<Basketball/>}/>
  <Route path="/Grounds/Tennis" element={<Tennis/>}/>
  <Route path="/booking/:id" element={<Booking />} />
<Route path="/my-bookings" element={<MyBookings />} />
  <Route path='/About' element={<About/>}/>
    <Route path='/Contact' element={<Contact/>}/>
  <Route path='/LoginPage' element={<LoginPage/>}/>
    <Route path='/Signup' element={<Signup/>}/>
  <Route path="/Turfground/:id" element={<TurfDetails />} />
    <Route path="/Badminton-Details/:id" element={<BadmintonDetails />} />
  <Route path="/Basketball-Details/:id" element={<BasketballDetails />} />
    <Route path="/Pickleball-Details/:id" element={<PickleballDetails />} />
  <Route path="/Tennis-Details/:id" element={<TennisDetails />} />
    
  </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
