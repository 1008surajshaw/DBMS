import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"
import CourseInformationForm from './propertieBuilder'
export default function RenderSteps () {
   

    const steps = [
        {
            id:1,
            title:"properties Information",
        }
    ]
   return(
     <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item,index) => (
            
          <>
            <div
              className="flex flex-col items-center "
              key={index}
            >
              
              do this
            </div>
            
          </>
        ))}
      </div>

      <div className='relative mb-16 w-full select-none justify-between'>
        {steps.map ((item) =>{
            <>
              <div className='flex min-w-[130px] flex-col items-center gap-y-2'
              key={item.id}>
                do this
              </div>
            </>
        })}
      </div>
    
     <CourseInformationForm/>
     
     </>
   )
}
