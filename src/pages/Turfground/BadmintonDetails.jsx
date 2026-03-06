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

"6:00 AM - 7:00 AM",

"7:00 AM - 8:00 AM",

"8:00 AM - 9:00 AM",

"5:00 PM - 6:00 PM",

"6:00 PM - 7:00 PM",

"7:00 PM - 8:00 PM",

];


// Fetch ground

useEffect(() => {

const fetchGround = async () => {

try {

const res = await fetch(`${API}/api/grounds/${id}`);

if (!res.ok) throw new Error();

const data = await res.json();

setGround(data);

}

catch {

setGround({

_id: id,

name: "Sample Badminton Court",

price: 400,

location: "Jaipur",

description: "Sample Court",

image: "badminton.png"

});

}

finally {

setLoading(false);

}

};

if (id) fetchGround();

}, [id]);



// Booking

const handleConfirmBooking = async () => {


if (!selectedSlot) {

alert("Please select slot");

return;

}


if (!isAuthenticated) {

alert("Please login first");

navigate("/LoginPage");

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

groundId: ground._id,

bookingDate: new Date(),

timeSlot: selectedSlot

})

});


if (!res.ok) throw new Error();


alert("Booking Confirmed ✅");

navigate("/my-bookings");

}

catch {

alert("Booking Failed");

}

finally {

setBookingLoading(false);

}

};



if (loading)

return (

<div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">

Loading...

</div>

);



return (

<div className="min-h-screen bg-gray-900 text-white p-6">


<h1 className="text-4xl mb-6">

{ground?.name}

</h1>



{/* Images */}


<Swiper

effect="coverflow"

centeredSlides

slidesPerView="auto"

pagination

modules={[EffectCoverflow, Pagination]}

>


{ground?.images?.length > 0

?

ground.images.map((img, i) => (

<SwiperSlide key={i}>

<img

src={`${API}/uploads/${img}`}

className="h-[400px] w-full object-cover"

onError={(e) => e.target.src = "/badminton.png"}

/>

</SwiperSlide>

))

:

<SwiperSlide>

<img

src={

ground?.image

?

`${API}/uploads/${ground.image}`

:

"/badminton.png"

}

className="h-[400px] w-full object-cover"

/>

</SwiperSlide>

}


</Swiper>



<p className="mt-4">

{ground?.description}

</p>


<p>

📍 {ground?.location}

</p>


<p className="text-green-400 text-xl">

₹{ground?.price}/hour

</p>



{/* Slots */}


<div className="mt-6">


{slots.map((slot, i) => (

<button

key={i}

onClick={() => setSelectedSlot(slot)}

className={`p-2 m-2 rounded

${selectedSlot === slot

?

"bg-green-500"

:

"bg-gray-700"

}

`}

>

{slot}

</button>

))}


</div>



<button

onClick={handleConfirmBooking}

disabled={bookingLoading}

className="bg-green-500 px-6 py-3 mt-6 rounded"

>

{bookingLoading ? "Booking..." : "Book Now"}

</button>


</div>

);

};


export default BadmintonDetails;