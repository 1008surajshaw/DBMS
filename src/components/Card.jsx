import React from 'react'

export const Card = ({properties}) => {
  return (
    <div className='grid mt-20 grid-cols-3 gap-x-8 gap-y-8'>
        {
            properties.map((property,index)=>(
                <div key={index} >
               <div className='rounded-lg'>
               <img 
           src={property.thumbnail}
           alt="property image"
           className={`h-[12rem] w-full rounded-xl object-cover `}
           />
               </div>     
               <div className='flex flex-col gap-2 px-1 py-3'>
           <p className='text-xl text-richblack-5'>{property?.propertiesAddress}</p>
           
          
           <p className="text-xl text-richblack-5">Rs. {property?.price}</p>
           <p className='text-xl text-richblack-5'>
           contactNumber:
           <span>

            {property?.seller?.contactNumber}
           </span>
           </p>
         </div>
                </div>
            ))
        }
        </div>
  )
}
