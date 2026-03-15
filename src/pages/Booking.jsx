import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../config/api";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  
  const [ground, setGround] = useState(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const slots = [
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",    
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
  ];

  useEffect(() => {
    const fetchGround = async () => {
      try {
        const res = await fetch(`${API}/api/grounds/${id}`);
        const data = await res.json();
        setGround(data);
      } catch (err) {
        console.error("Error fetching ground:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGround();
  }, [id]);

  const handleBook = async () => {
    if (!isAuthenticated) {
      alert("Please login first");
      navigate("/LoginPage");
      return;
    }

    if (!date) {
      alert("Please select a date");
      return;
    }

    if (!slot) {
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
          bookingDate: date,
          timeSlot: slot
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      alert("Booking Successful!");
      navigate("/my-bookings");
    } catch (err) {
      alert(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Book Ground</h1>

        {ground && (
          <div className="bg-gray-800 p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-bold mb-2">{ground.name}</h2>
            <p className="text-gray-400 mb-2">📍 {ground.location}</p>
            <p className="text-green-400 text-xl font-bold">₹{ground.price} / hour</p>
          </div>
        )}

        {/* Date Selection */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold mb-4">Select Date</h3>
          <input 
            type="date" 
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 bg-gray-700 rounded-lg text-white"
          />
        </div>

        {/* Time Slots */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold mb-4">Select Time Slot</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={`p-3 rounded-lg font-semibold transition ${
                  slot === s
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBook}
          disabled={bookingLoading || !date || !slot}
          className={`w-full py-4 rounded-xl text-lg font-bold transition ${
            bookingLoading || !date || !slot
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {bookingLoading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}
