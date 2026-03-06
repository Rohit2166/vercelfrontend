import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, EffectCoverflow } from "swiper/modules";

import 'swiper/css';

import 'swiper/css/effect-coverflow';

import 'swiper/css/pagination';

import API from "../../config/api";


export default function BasketballDetails(){

const {id}=useParams();

const navigate=useNavigate();

const {token,isAuthenticated}=useAuth();

const [ground, setGround] = useState(null);

const [selectedSlot, setSelectedSlot] = useState("");

const [loading, setLoading] = useState(true);

const [bookingLoading, setBookingLoading] = useState(false);


const slots = [

"6:00 AM - 7:00 AM",

"7:00 AM - 8:00 AM",

"8:00 AM - 9:00 AM",

"9:00 AM - 10:00 AM",

"10:00 AM - 11:00 AM",

"11:00 AM - 12:00 PM",

"12:00 PM - 1:00 PM",

"1:00 PM - 2:00 PM",

"2:00 PM - 3:00 PM",

"3:00 PM - 4:00 PM",

"4:00 PM - 5:00 PM",

"5:00 PM - 6:00 PM",

"6:00 PM - 7:00 PM",

"7:00 PM - 8:00 PM",

"8:00 PM - 9:00 PM",

];


useEffect(()=>{

const fetchGround = async () => {

try {

setLoading(true);

const res = await fetch(`${API}/api/grounds/${id}`);

const data = await res.json();

if (!res.ok) throw new Error();

setGround(data);

}

catch {

setGround(null);

}

finally {

setLoading(false);

}

};

fetchGround();

},[id]);


const handleBooking = async () => {

if (!isAuthenticated) {

alert("Please login");

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

groundId: ground._id || id,

bookingDate: new Date(),

timeSlot: selectedSlot

})

});


const data = await res.json();


if (!res.ok)

throw new Error(data.message || "Booking failed");


alert("Booking Successful!");


navigate("/my-bookings");

}


catch (err) {

alert(err.message);

}


finally {

setBookingLoading(false);

}

};



if (loading)

return (

<div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">

<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>

</div>

);




if (!ground)

return (

<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">

<div className="text-center">

<h1 className="text-2xl mb-4">Ground not found</h1>

<button

onClick={() => navigate('/')}

className="bg-green-500 px-4 py-2 rounded"

>

Go Home

</button>

</div>

</div>

);




return (

<div className="min-h-screen bg-gray-900 text-white p-6">


<h1 className="text-4xl font-bold text-center mb-6">

{ground.name}

</h1>




{/* Image Swiper */}

{ground.images?.length > 0 ? (

<Swiper

effect="coverflow"

slidesPerView="auto"

centeredSlides 

pagination

modules={[Pagination, EffectCoverflow]}

className="h-64 md:h-96 rounded-xl mb-6"

>


{ground.images.map((img, i) => (

<SwiperSlide key={i}>



<img

src={`${API}/uploads/${img}`}

className="h-full w-full object-cover"

onError={(e)=>e.target.src="/basketball.png"}

/>



</SwiperSlide>

))}



</Swiper>

) : (

<img

src={ground.image ? `${API}/uploads/${ground.image}` : "/basketball.png"}

className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"

onError={(e)=>e.target.src="/basketball.png"}

/>

)}




{/* Details */}

<div className="bg-gray-800 p-6 rounded-xl mb-6">

<div className="flex flex-wrap gap-4 mb-4">

<span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">

{ground.sport?.toUpperCase() || "BASKETBALL"}

</span>

</div>

<p className="text-gray-300 mb-2">📍 {ground.location}</p>

<p className="text-gray-300 mb-2">🏠 {ground.address}</p>

<p className="text-3xl text-green-400 font-bold mb-4">₹{ground.price} / hour</p>

{ground.description && (

<p className="text-gray-400">{ground.description}</p>

)}

</div>




{/* Time Slots */}

<div className="bg-gray-800 p-6 rounded-xl mb-6">

<h2 className="text-xl font-bold mb-4">Select Time Slot</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-3">


{

slots.map(slot => (

<button

key={slot}

onClick={()=>setSelectedSlot(slot)}

className={`p-3 rounded-lg font-semibold transition 

${selectedSlot===slot

?

"bg-green-500 text-white"

:

"bg-gray-700 hover:bg-gray-600"

}`}

>

{slot}

</button>

))

}


</div>




</div>




<button

onClick={handleBooking}

disabled={bookingLoading || !selectedSlot}

className={`w-full py-4 rounded-xl text-lg font-bold transition ${

bookingLoading || !selectedSlot

?

"bg-gray-600 cursor-not-allowed"

:

"bg-green-500 hover:bg-green-600"

}`}

>

{bookingLoading ? 'Booking...' : selectedSlot ? `Book Now - ${selectedSlot}` : 'Select a time slot'}

</button>




</div>

);

}
