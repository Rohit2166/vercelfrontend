import React from 'react'
import { Link } from 'react-router-dom'

const Grounds = () => {

const grounds = [

{
 id:1,
 name:"Cricket",
 image:"/image-wm.png",
 route:"/grounds/Cricket"
},

{
 id:2,
 name:"Pickleball",
 image:"/pickelball.png",
 route:"/grounds/Pickelballl"
},

{
 id:3,
 name:"Badminton",
 image:"/badminton.png",
 route:"/grounds/Badminton"
},

{
 id:4,
 name:"Basketball",
 image:"/basketball.png",
 route:"/grounds/Basketball"
},

{
 id:5,
 name:"Tennis",
 image:"/tennis.png",
 route:"/grounds/Tennis"
}

]

return (

<div className='min-h-screen bg-gray-900 text-white'>


{/* Heading */}

<h1 className='text-4xl text-center font-bold pt-6'>

Grounds

</h1>



{/* Ground Cards */}

<div className='flex flex-wrap justify-center gap-6 p-6'>


{grounds.map((ground)=>(


<div

key={ground.id}

className='bg-gray-800 w-72 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition'

>


{/* Image */}

<img

src={ground.image}

alt={ground.name}

className='h-48 w-full object-cover'

onError={(e)=>{

e.target.src="/image-wm.png"

}}

/>



{/* Name */}

<div className='text-center p-4'>


<h2 className='text-xl font-semibold mb-3'>

{ground.name}

</h2>



{/* Button */}

<Link to={ground.route}>


<button

className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'

>

Check it

</button>


</Link>


</div>


</div>


))}


</div>


</div>

)

}

export default Grounds