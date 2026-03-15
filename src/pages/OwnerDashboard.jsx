import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import API from "../config/api";

const OwnerDashboard = () => {

  const { token, user } = useAuth();

  const navigate = useNavigate();

  const [turfs, setTurfs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Helper function to get image URL - handles Cloudinary, local, and base64
  const getImageUrl = (image) => {
    if (!image) return "/image-wm.png";
    
    // If it's a base64 image, return it directly
    if (image.startsWith('data:')) {
      return image;
    }
    
    // If it's already a full URL (Cloudinary), return it
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    
    // Otherwise, it's a local filename - use /uploads path
    return `${API}/uploads/${image}`;
  };

  // ✅ Fetch turfs when page loads
  useEffect(() => {

    if (!token) {

      navigate("/login");

      return;

    }

    fetchTurfs();

  }, [token]);



  // ✅ GET OWNER TURFS
  const fetchTurfs = async () => {

    try {

      setLoading(true);

      const apiUrl = API.replace(/\/$/, '');
      const url = `${apiUrl}/api/grounds/owner`;
      
      console.log("Fetching from:", url);
      console.log("Token exists:", !!token);

      const res = await fetch(url, {

        method: "GET",

        headers: {

          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        },

      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.log("Error response:", errorText);
        throw new Error(`Server returned ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      
      console.log("Response data:", data);

      setTurfs(data);

    }

    catch (err) {
      
      console.error("Fetch turfs error:", err);
      setError(err.message || "Failed to connect to server. Please check if backend is running.");

    }

    finally {

      setLoading(false);

    }

  };



  // ✅ DELETE TURF
  const deleteTurf = async (id) => {

    if (!window.confirm("Delete this turf?")) return;

    try {

      const res = await fetch(`${API}/api/grounds/${id}`, {

        method: "DELETE",

        headers: {

          Authorization: `Bearer ${token}`,

        },

      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message);

      // update UI
      setTurfs(turfs.filter(turf => turf._id !== id));

      alert("Deleted successfully");

    }

    catch (err) {

      alert(err.message);

    }

  };



  // ✅ LOADING
  if (loading)

    return (

      <div className="min-h-screen flex justify-center items-center bg-gray-900">

        <div className="animate-spin h-12 w-12 border-b-2 border-green-500 rounded-full"></div>

      </div>

    );



  return (

    <div className="min-h-screen bg-gray-900 text-white p-6">

      <div className="max-w-6xl mx-auto">




        {/* HEADER */}

        <div className="flex justify-between mb-6">

          <div>

            <h1 className="text-3xl font-bold">

              Owner Dashboard

            </h1>

            <p className="text-gray-400">

              Welcome {user?.name}

            </p>

          </div>



          <Link
            to="/add-turf"
            className="bg-green-500 px-4 py-2 rounded flex gap-2 items-center"
          >

            <Plus size={20} />

            Add Turf

          </Link>

        </div>




        {/* ERROR */}

        {error && (

          <div className="bg-red-500 p-3 mb-4 rounded">

            {error}

          </div>

        )}




        {/* TURF LIST */}

        <div className="grid md:grid-cols-3 gap-6">



          {turfs.length === 0 ? (

            <h2>No Turf Added</h2>

          )

            :

            turfs.map((turf) => (

              <div
                key={turf._id}
                className="bg-gray-800 p-4 rounded-lg"
              >




                  {/* IMAGE */}

                  <img

                    src={
                      turf.images?.length
                        ? getImageUrl(turf.images[0])
                        : "/image-wm.png"
                    }

                    className="h-40 w-full object-cover rounded"
                    
                    onError={(e) => e.target.src = '/image-wm.png'}

                  />




                  {/* NAME */}

                  <h2 className="text-xl font-bold mt-2">

                    {turf.name}

                  </h2>




                  {/* PRICE */}

                  <p className="text-green-400">

                    ₹{turf.price}

                  </p>




                  {/* LOCATION */}

                  <p className="text-gray-400">

                    {turf.location}

                  </p>




                  {/* SPORT */}

                  <p>

                    {turf.sport}

                  </p>




                  {/* BUTTONS */}

                  <div className="flex gap-2 mt-3">



                    <Link

                      to={`/edit-turf/${turf._id}`}

                      className="bg-blue-500 flex-1 text-center py-2 rounded flex items-center justify-center gap-1"

                    >

                      <Edit size={18} />

                      Edit

                    </Link>




                    <button

                      onClick={() => deleteTurf(turf._id)}

                      className="bg-red-500 flex-1 py-2 rounded flex items-center justify-center gap-1"

                    >

                      <Trash2 size={18} />

                      Delete

                    </button>



                  </div>



              </div>

            ))

          }



        </div>



      </div>

    </div>

  );

};

export default OwnerDashboard;