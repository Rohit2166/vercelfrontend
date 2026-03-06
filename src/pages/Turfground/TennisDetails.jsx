import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../config/api";

const TennisDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const [ground, setGround] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState("");
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
    "8 PM - 9 PM"
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

  const handleBooking = async () => {
    if (!isAuthenticated) {
      alert("Please login to book a ground");
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

      if (!res.ok) throw new Error("Booking failed");

      alert("Booking Successful!");
      navigate("/my-bookings");
    } catch (err) {
      alert(err.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Image */}
        <div className="relative h-80 rounded-xl overflow-hidden mb-6">
          {ground?.images?.[0] ? (
            <img
              src={`${API}/uploads/${ground.images[0]}`}
              alt={ground.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h1 className="text-4xl font-bold mb-2">{ground?.name}</h1>
          <p className="text-green-400 text-xl mb-4">₹{ground?.price}/hour</p>
          <p className="text-gray-300 mb-2">📍 {ground?.location}</p>
          <p className="text-gray-300 mb-6">🏠 {ground?.address}</p>
          
          <p className="text-gray-400 mb-6">{ground?.description}</p>

          {/* Slots */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Select Time Slot</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 rounded text-sm ${
                    selectedSlot === slot
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={bookingLoading || !selectedSlot}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 p-4 rounded-lg font-semibold text-lg"
          >
            {bookingLoading ? "Processing..." : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TennisDetails;
