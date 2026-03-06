import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import API from "../../config/api";

const BadmintonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const [ground, setGround] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const slots = [
    "6 AM - 7 AM",
    "7 AM - 8 AM",
    "8 AM - 9 AM",
    "9 AM - 10 AM",
    "10 AM - 11 AM",
    "11 AM - 12 PM",
    "12 PM - 1 PM",
    "1 PM - 2 PM",
    "2 PM - 3 PM",
    "3 PM - 4 PM",
    "4 PM - 5 PM",
    "5 PM - 6 PM",
    "6 PM - 7 PM",
    "7 PM - 8 PM",
    "8 PM - 9 PM",
    "9 PM - 10 PM"
  ];

  // Helper function to get image URL - handles both Cloudinary and local
  const getImageUrl = (image) => {
    if (!image) return "/badminton.png";
    
    // If it's already a full URL (Cloudinary), return it
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    
    // Otherwise, it's a local filename - use /uploads path
    return `${API}/uploads/${image}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/grounds/${id}`);
        const data = await res.json();
        setGround(data);
      } catch {
        setGround(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      alert("Login First");
      navigate("/LoginPage");
      return;
    }
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    setBookingLoading(true);
    try {
      const res = await fetch(`${API}/api/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          groundId: id,
          bookingDate: new Date(),
          timeSlot: selectedSlot
        })
      });

      if (!res.ok) throw new Error();
      alert("Booked Successfully");
      navigate("/my-bookings");
    } catch {
      alert("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  // Get all images - handle both Cloudinary URLs and local filenames
  const getAllImages = () => {
    if (!ground?.images || ground.images.length === 0) return [];
    return ground.images.map(img => getImageUrl(img));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!ground) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Ground not found</h1>
          <button onClick={() => navigate('/')} className="bg-green-500 px-4 py-2 rounded">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const images = getAllImages();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">{ground.name}</h1>

        {images.length > 0 ? (
          <Swiper 
            modules={[Pagination, EffectCoverflow]} 
            pagination
            className="h-64 md:h-96 rounded-xl mb-6"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt={`${ground.name} ${i + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img src="/badminton.png" alt={ground.name} className="w-full h-64 md:h-96 object-cover rounded-xl mb-6" />
        )}

        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
              {ground.sport?.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-300 mb-2">📍 {ground.location}</p>
          <p className="text-gray-300 mb-2">🏠 {ground.address}</p>
          <p className="text-3xl text-green-400 font-bold mb-4">₹{ground.price} / hour</p>
          {ground.description && <p className="text-gray-400">{ground.description}</p>}
        </div>

        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h2 className="text-xl font-bold mb-4">Select Time Slot</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {slots.map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-lg font-semibold transition ${
                  selectedSlot === slot ? 'bg-green-500 text-white' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={bookingLoading || !selectedSlot}
          className={`w-full py-4 rounded-xl text-lg font-bold transition ${
            bookingLoading || !selectedSlot ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {bookingLoading ? 'Booking...' : selectedSlot ? `Book Now - ${selectedSlot}` : 'Select a time slot'}
        </button>
      </div>
    </div>
  );
};

export default BadmintonDetails;
