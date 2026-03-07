import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../config/api";

function AddTurf() {

  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    address: "",
    sport: "cricket",
    price: "",
    description: ""
  });

  const [images, setImages] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  if (!user || user.role !== "owner") {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-2xl">Only Owner Allowed</h1>
      </div>
    );
  }


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    // Convert to base64 immediately
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(promises).then(base64Images => {
      setImages(base64Images);
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      // Send as JSON with base64 images
      const payload = {
        name: form.name,
        location: form.location,
        address: form.address,
        sport: form.sport,
        price: form.price,
        description: form.description,
        images: images
      };

      const apiUrl = API.replace(/\/$/, '');
      const url = `${apiUrl}/api/grounds/add`;
      
      console.log("Submitting to:", url);

      const res = await fetch(url, {

        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)

      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.log("Error response:", errorText);
        throw new Error(errorText || "Failed to add turf");
      }

      const data = await res.json();

      console.log("Response data:", data);

      alert("Turf Added Successfully");

      navigate("/owner/dashboard");

    }

    catch (err) {

      console.error("Add turf error:", err);
      setError(err.message || "Failed to add turf. Please try again.");

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-900 text-white p-6">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-6">Add New Turf</h1>

        {error && (
          <div className="bg-red-600 p-4 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl">

          <div className="mb-4">
            <label className="block mb-2">Turf Name</label>
            <input 
              name="name" 
              placeholder="Enter turf name" 
              onChange={handleChange} 
              required 
              className="w-full p-3 bg-gray-700 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input 
              name="location" 
              placeholder="Enter location" 
              onChange={handleChange} 
              required 
              className="w-full p-3 bg-gray-700 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <input 
              name="address" 
              placeholder="Enter address" 
              onChange={handleChange} 
              required 
              className="w-full p-3 bg-gray-700 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Sport Type</label>
            <select 
              name="sport" 
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded"
            >
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="badminton">Badminton</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="pickleball">Pickleball</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Price (per hour)</label>
            <input 
              name="price" 
              type="number"
              placeholder="Enter price" 
              onChange={handleChange} 
              required 
              className="w-full p-3 bg-gray-700 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea 
              name="description" 
              placeholder="Enter description" 
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded h-24"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Images</label>
            <input 
              type="file" 
              multiple 
              onChange={handleImage} 
              accept="image/*"
              className="w-full p-3 bg-gray-700 rounded"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded font-bold text-lg ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {loading ? "Adding Turf..." : "Add Turf"}
          </button>

        </form>

      </div>

    </div>

  );

}

export default AddTurf;
