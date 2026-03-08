import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../config/api';

const Tennis = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [grounds, setGrounds] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // Helper function to get optimized image URL using Cloudinary transformations
  const getOptimizedImageUrl = (image, width = 400, height = 300) => {
    if (!image) return "/tennis.png";
    
    // If it's a base64 image, return it directly
    if (image.startsWith('data:')) {
      return image;
    }
    
    // If it's already a full URL (Cloudinary), add transformation parameters
    if (image.startsWith('http://') || image.startsWith('https://')) {
      // Check if it's a Cloudinary URL
      if (image.includes('cloudinary')) {
        // Add Cloudinary transformation parameters for optimization
        const separator = image.includes('?') ? '&' : '?';
        return `${image}${separator}f_auto,q_auto,w_${width},h_${height},c_fill`;
      }
      return image;
    }
    
    // Otherwise, it's a local filename - use /uploads path
    return `${API}/uploads/${image}`;
  };

  // Get first image from images array or fallback to image field
  const getGroundImage = (ground) => {
    if (ground.images && ground.images.length > 0) {
      return getOptimizedImageUrl(ground.images[0]);
    }
    if (ground.image) {
      return getOptimizedImageUrl(ground.image);
    }
    return "/tennis.png";
  };

  useEffect(() => {

    const fetchGrounds = async () => {

      try {

        setLoading(true);

        const response = await fetch(`${API}/api/grounds/sport/tennis`);

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();

        setGrounds(data);

        setError(null);

      }

      catch (err) {
        console.error("Error fetching tennis grounds:", err);

        setError(true);

        // fallback data

        setGrounds([

          {

            _id: '1',

            name: "Tennis Court",

            image: "tennis.png",

            location: "Jaipur",

            price: 400

          }

        ]);

      }

      finally {

        setLoading(false);

      }

    };


    fetchGrounds();


  }, []);



  const filteredGrounds = grounds.filter((ground) =>

    ground.name?.toLowerCase().includes(search.toLowerCase())

  );



  if (loading) {

    return (

      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">

        <div className="text-center">

          <p className="text-xl mb-3">Loading tennis turfs...</p>

          <div className="animate-spin h-12 w-12 border-b-2 border-green-500 rounded-full mx-auto"></div>

        </div>

      </div>

    );

  }



  return (

    <div className='min-h-screen bg-gray-900 text-white'>



      <h1 className='text-4xl text-center font-bold pt-6'>

        Tennis Turfs

      </h1>



      <div className='flex justify-center mt-6'>

        <input

          type="text"

          placeholder="Search Turf..."

          className='w-80 p-3 rounded border border-white bg-gray-800'

          onChange={(e) => setSearch(e.target.value)}

        />

      </div>



      {error && (

        <p className="text-center text-red-400 mt-4">

          Showing sample data

        </p>

      )}



      <div className='flex flex-wrap justify-center gap-6 p-6'>



        {filteredGrounds.map((ground) => (



          <div

            key={ground._id}

            onClick={() => navigate(`/Turfground/${ground._id}`)}

            className='bg-gray-800 w-72 rounded-xl cursor-pointer hover:scale-105 transition'

          >



            <img

              src={getGroundImage(ground)}

              className='h-48 w-full object-cover'

              onError={(e) => e.target.src = '/tennis.png'}

            />



            <div className='text-center p-4'>



              <h2 className='text-xl font-bold'>

                {ground.name}

              </h2>



              <p className='text-gray-400'>

                📍 {ground.location}

              </p>



              <p className='text-green-400 font-semibold'>

                ₹{ground.price} / hour

              </p>



              <button

                onClick={(e) => {

                  e.stopPropagation();

                  navigate(`/Turfground/${ground._id}`);

                }}

                className='bg-green-500 mt-3 px-4 py-2 rounded'

              >

                Try Now

              </button>



            </div>



          </div>



        ))}



      </div>



    </div>

  )

}


export default Tennis;
