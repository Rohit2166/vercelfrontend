import React, { useState } from "react";
import API from "../../config/api";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(`${API}/api/contact`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)

      });

      if (!res.ok) {
        throw new Error("Server response failed");
      }

      const data = await res.json();

      console.log("Server Response:", data);

      alert("Message Sent Successfully ✅");

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    }

    catch (error) {

      console.error("Error:", error.message);

      alert("Error sending message ❌");

    }

  };


  return (

    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/image-wm.png')" }}
    >

      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 text-white px-6 py-12">

        <h1 className="text-5xl font-bold text-center text-green-500 mb-10">
          Contact Us
        </h1>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-4"
          >

            <h2 className="text-2xl font-semibold text-green-400">
              Send Message
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 py-3 rounded font-semibold"
            >
              Send Message
            </button>

          </form>


          {/* Info */}

          <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-4">

            <h2 className="text-2xl font-semibold text-green-400">
              Contact Information
            </h2>

            <p>📍 Jaipur, Rajasthan, India</p>

            <p>📧 rohit20saini05@gmail.com</p>

            <p>📞 +91 7688929930</p>

            <hr className="border-gray-700"/>

            <div>

              <h3 className="text-xl font-semibold text-green-400">
                Developer
              </h3>

              <p>Rohit Saini</p>

              <p className="text-gray-400">MERN Developer</p>

            </div>

          </div>

        </div>

        <p className="text-center text-green-400 font-semibold pt-10 text-xl">
          Your Game. Your Turf. Book Now.
        </p>

      </div>

    </div>

  );

};

export default Contact;
