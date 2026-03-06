import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../config/api';

const Badminton = () => {

const navigate = useNavigate();

const [search, setSearch] = useState("");

const [grounds, setGrounds] = useState([]);

const [loading, setLoading] = useState(true);

 const [error, setError] = useState(null);


useEffect(() => {

const fetchGrounds = async () => {

try {

setLoading(true);

const response = await fetch(`${API}/api/grounds/sport/badminton`);

if (!response.ok) throw new Error("Failed");

const data = await response.json();

setGrounds(data);
setError(null);

}

catch (err) {
console.error("Error fetching badminton grounds:", err);
setError(true);

setGrounds([

{

_id: "1",

name: "Smash Badminton Arena",

image: "badminton.png",

location: "Malviya Nagar, Jaipur",

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


const filteredGrounds = grounds.filter((ground)=>

ground.name?.toLowerCase().includes(search.toLowerCase())

);


if (loading) {

return (

<div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">

<div>

<p className="text-xl mb-3">

Loading badminton courts...

</p>

<div className="animate-spin h-12 w-12 border-b-2 border-green-500 rounded-full mx-auto"></div>

</div>

</div>

);

}


return (

<div className="min-h-screen bg-gray-900 text-white">


<h1 className="text-4xl text-center font-bold pt-6">

Badminton Courts

</h1>



<div className="flex justify-center mt-6">

<input

type="text"

placeholder="Search Court"

className="w-80 p-3 rounded border border-white bg-gray-800"

onChange={(e)=>setSearch(e.target.value)}

/>

</div>


<div className="flex flex-wrap justify-center gap-6 p-6">


{filteredGrounds.map((ground)=>(


<div

key={ground._id}

onClick={()=>navigate(`/Badminton-Details/${ground._id}`)}

className="bg-gray-800 w-72 rounded-xl cursor-pointer hover:scale-105 transition"

>


<img

src={

ground.image

? `${API}/uploads/${ground.image}`

: "/badminton.png"

}

className="h-48 w-full object-cover"

onError={(e)=>e.target.src="/badminton.png"}

/>


<div className="text-center p-4">


<h2>{ground.name}</h2>


<p className="text-gray-400">

📍 {ground.location}

</p>


<p className="text-green-400">

₹{ground.price} / hour

</p>


<button

onClick={(e)=>{

e.stopPropagation();

navigate(`/Badminton-Details/${ground._id}`);

}}

className="bg-green-500 mt-3 px-4 py-2 rounded"

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

export default Badminton;
