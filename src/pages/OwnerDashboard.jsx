// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { Edit, Trash2, Plus } from "lucide-react";

// // ✅ Safe API URL fallback
// const API = import.meta.env.VITE_API_URL || "https://backendvercel-puce.vercel.app";

// const OwnerDashboard = () => {

//   const { user, token, isAuthenticated } = useAuth();

//   const navigate = useNavigate();

//   const [turfs, setTurfs] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");


//   // ✅ Check owner
//   useEffect(() => {

//     if (!isAuthenticated) {

//       navigate("/login");

//       return;

//     }

//     if (user?.role !== "owner") {

//       navigate("/");

//       return;

//     }

//     fetchOwnerTurfs();

//   }, [isAuthenticated, user, navigate, token]);


//   // ✅ Fetch turfs
//   const fetchOwnerTurfs = async () => {

//     try {

//       setLoading(true);

//       const response = await fetch(`${API}/api/grounds/owner`, {

//         headers: {

//           Authorization: `Bearer ${token}`

//         }

//       });

//       const data = await response.json();

//       if (!response.ok)

//         throw new Error(data.message || "Failed to fetch turfs");


//       setTurfs(data);

//       setError("");

//     }

//     catch (err) {

//       console.error("Error fetching turfs:", err);
//       setError(err.message);

//     }

//     finally {

//       setLoading(false);

//     }

//   };


//   // ✅ DELETE TURF
//   const handleDelete = async (id) => {

//     if (!window.confirm("Are you sure you want to delete this turf?")) {
//       return;
//     }

//     try {

//       const response = await fetch(`${API}/api/grounds/${id}`, {

//         method: "DELETE",

//         headers: {

//           Authorization: `Bearer ${token}`

//         }

//       });

//       const data = await response.json();

//       if (!response.ok)

//         throw new Error(data.message || "Failed to delete");


//       // remove from UI

//       setTurfs(turfs.filter((turf) => turf._id !== id));


//       alert("Turf deleted successfully");


//     }

//     catch (err) {

//       alert(err.message);

//     }

//   };



//   // ✅ Loading

//   if (loading)

//     return (

//       <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">

//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>

//       </div>

//     );



//   return (

//     <div className="min-h-screen bg-gray-900 text-white p-6">

//       <div className="max-w-6xl mx-auto">


//         {/* Header */}

//         <div className="flex justify-between items-center mb-8">

//           <div>

//             <h1 className="text-4xl font-bold">

//               Owner Dashboard

//             </h1>

//             <p className="text-gray-400 mt-1">

//               Welcome, {user?.name}

//             </p>

//           </div>


//           <Link

//             to="/add-turf"

//             className="bg-green-500 px-6 py-3 rounded flex items-center gap-2 hover:bg-green-600"

//           >

//             <Plus size={20} />

//             Add Turf

//           </Link>


//         </div>



//         {/* Error */}

//         {

//           error &&

//           <div className="bg-red-600 p-4 rounded mb-4">

//             <p>{error}</p>

//           </div>

//         }



//         {/* Turf List */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


//           {

//             turfs.length === 0 ? (

//               <div className="col-span-full text-center py-12">

//                 <p className="text-gray-400 text-xl mb-4">No turfs added yet</p>

//                 <Link

//                   to="/add-turf"

//                   className="bg-green-500 px-6 py-3 rounded inline-flex items-center gap-2"

//                 >

//                   <Plus size={20} />

//                   Add Your First Turf

//                 </Link>

//               </div>

//             ) : (

//               turfs.map((turf) => (

//                 <div key={turf._id} className="bg-gray-800 p-4 rounded-xl">


//                   <img

//                     src={turf.images && turf.images.length > 0 ? `${API}/uploads/${turf.images[0]}` : "/image-wm.png"}

//                     alt={turf.name}

//                     className="h-40 w-full object-cover rounded"

//                     onError={(e) => e.target.src = "/image-wm.png"}

//                   />


//                   <h2 className="text-xl mt-2 font-bold">

//                     {turf.name}

//                   </h2>


//                   <p className="text-green-400 font-semibold">

//                     ₹{turf.price} / hour

//                   </p>

//                   <p className="text-gray-400 text-sm">

//                     📍 {turf.location}

//                   </p>

//                   {turf.sport && (
//                     <span className="inline-block bg-blue-500 text-xs px-2 py-1 rounded mt-2">
//                       {turf.sport.toUpperCase()}
//                     </span>
//                   )}



//                   <div className="flex gap-2 mt-3">


//                     <Link

//                       to={`/edit-turf/${turf._id}`}

//                       className="bg-blue-500 p-2 flex-1 text-center rounded hover:bg-blue-600 flex items-center justify-center gap-2"

//                     >

//                       <Edit size={18} />

//                       Edit

//                     </Link>


//                     <button

//                       onClick={() => handleDelete(turf._id)}

//                       className="bg-red-500 p-2 flex-1 rounded hover:bg-red-600 flex items-center justify-center gap-2"

//                     >

//                       <Trash2 size={18} />

//                       Delete

//                     </button>


//                   </div>


//                 </div>

//               ))

//             )


//           }


//         </div>


//       </div>

//     </div>

//   );

// };

// export default OwnerDashboard;




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

  // Helper function to get image URL - handles both Cloudinary and local
  const getImageUrl = (image) => {
    if (!image) return "/image-wm.png";
    
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

const res = await fetch(`${API}/api/grounds/owner`, {

        method: "GET",

        headers: {

          Authorization: `Bearer ${token}`,

        },

      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message);

      setTurfs(data);

    }

    catch (err) {

      setError(err.message);

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