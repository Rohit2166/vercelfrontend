import React from "react";
import { useNavigate } from "react-router-dom";

const Section2 = () => {

const navigate = useNavigate();

const games = [

{
id:1,
name:"Box Cricket",
image:"/image-wm.png",
desc:"Play exciting box cricket with your friends anytime.",
route:"/Grounds/Cricket"
},

{
id:2,
name:"Badminton",
image:"/badminton.png",
desc:"Book indoor badminton courts near you easily.",
route:"/Grounds/Badminton"
},

{
id:3,
name:"Pickleball",
image:"/pickelball.png",
desc:"Experience the fast growing sport pickleball.",
route:"/Grounds/Pickelballl"
}

];


return (

<section className="py-16 bg-gray-900">

<div className="max-w-7xl mx-auto px-6">


{/* Heading */}

<div className="text-center">

<h2 className="text-4xl font-bold text-white">

Explore Top Sports Turfs

</h2>

<p className="text-gray-400 mt-3">

Choose your favorite sport and book your turf instantly

</p>

</div>



{/* Cards */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">


{games.map((game)=>(


<div

key={game.id}

onClick={()=>navigate(game.route)}

className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition"

>


{/* Image */}

<div className="overflow-hidden">

<img

src={game.image}

className="w-full h-56 object-cover hover:scale-125 transition duration-300"

/>

</div>



{/* Content */}

<div className="p-5">


<h3 className="text-white text-xl font-bold">

{game.name}

</h3>


<p className="text-gray-400 mt-2">

{game.desc}

</p>



<button

onClick={(e)=>{

e.stopPropagation();

navigate(game.route);

}}

className="mt-4 bg-green-500 px-5 py-2 rounded hover:bg-green-600"

>

Book Now

</button>


</div>


</div>


))}


</div>


</div>

</section>

);

};

export default Section2;