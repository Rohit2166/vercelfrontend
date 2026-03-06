import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../config/api";

const MyBookings = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellationStatus, setCancellationStatus] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/LoginPage");
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/api/bookings/user/bookings`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(data);
        setError(null);

        // Check cancellation eligibility for each booking
        data.forEach(async (booking) => {
          if (booking.status !== 'cancelled') {
            try {
              const checkResponse = await fetch(`${API}/api/bookings/${booking._id}/check-cancel`, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              });
              const checkData = await checkResponse.json();
              setCancellationStatus(prev => ({
                ...prev,
                [booking._id]: checkData
              }));
            } catch (err) {
              console.log('Error checking cancellation status:', err);
            }
          }
        });
      } catch (err) {
        setError(err.message);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, isAuthenticated, navigate]);

  const handleCancelBooking = async (bookingId) => {
    try {
      // Get cancellation status
      const statusData = cancellationStatus[bookingId];
      if (!statusData || !statusData.canCancel) {
        alert(statusData?.message || "Cannot cancel this booking");
        return;
      }

      if (!window.confirm("Are you sure you want to cancel this booking?")) {
        return;
      }

      const response = await fetch(`${API}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }
      
      setBookings(bookings.filter(b => b._id !== bookingId));
      setCancellationStatus(prev => {
        const updated = { ...prev };
        delete updated[bookingId];
        return updated;
      });
      alert("Booking Cancelled Successfully! Confirmation email sent to you and the owner.");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold mb-2">Loading your bookings...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">My Bookings</h1>

      {error && (
        <div className="bg-red-600 p-4 rounded mb-4 text-center">
          <p>Error: {error}</p>
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center text-gray-400 text-xl">
          <p>No bookings yet. Start booking your favorite grounds!</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-800 w-80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              {/* Ground Image */}
              {booking.groundImage && (
                <img
                  src={`${API}/uploads/${booking.groundImage}`}
                  alt={booking.groundName}
                  className="h-40 w-full object-cover"
                  onError={(e) => e.target.src = "/image-wm.png"}
                />
              )}

              {/* Details */}
              <div className="p-4">
                <h2 className="text-xl font-bold">{booking.groundName}</h2>
                <p className="text-gray-400 text-sm">{booking.sportType}</p>

                <p className="text-gray-400 mt-2">
                  📍 {booking.location}
                </p>

                <p className="text-blue-400 mt-2">
                  📅 {new Date(booking.bookingDate).toLocaleDateString()}
                </p>

                <p className="text-yellow-400">
                  ⏰ {booking.timeSlot}
                </p>

                <p className="text-blue-400 font-semibold mt-2">
                  💰 ₹{booking.price}
                </p>

                <p className={`text-sm mt-2 font-semibold ${
                  booking.status === 'confirmed' ? 'text-green-400' :
                  booking.status === 'cancelled' ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  Status: {booking.status?.toUpperCase()}
                </p>

                {booking.status !== 'cancelled' && cancellationStatus[booking._id] && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-300 mb-2">
                      {cancellationStatus[booking._id].canCancel 
                        ? `⏰ ${cancellationStatus[booking._id].minutesRemaining} minutes left to cancel`
                        : `❌ Cannot cancel - booked ${cancellationStatus[booking._id].minutesElapsed} minutes ago`
                      }
                    </p>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={!cancellationStatus[booking._id].canCancel}
                      className={`w-full py-2 rounded transition font-semibold ${
                        cancellationStatus[booking._id].canCancel
                          ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {cancellationStatus[booking._id].canCancel ? 'Cancel Booking' : 'Cannot Cancel'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;