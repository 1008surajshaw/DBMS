import React, { useEffect, useState } from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom"
import HighlightText from "../pages/HighlightText"
import CTAButton from "../components/Button"
import { useSelector } from 'react-redux'
import { apiConnector } from '../services/apiconnector'
import { useDispatch } from 'react-redux'
import { getAllProperties } from '../services/propertiesDetailsAPI'
import { Card } from '../components/Card'
export const Home = () => {
  const {token} = useSelector((state) =>state.auth);
  const BASE_URL = `http://localhost:4000/api/v1`
  const [properties,setProperties] = useState([])
  const dispatch=useDispatch();
  useEffect( () =>{
   const getProperties = async () =>{
    const prop = await getAllProperties();
    
    setProperties(prop);
   }
   
    getProperties()
  }
  ,[])
  console.log(properties)
  return (
    <div >
        <div className='mt-5 relative -translate-y-9 mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white  justify-between'>

              
      <div className='group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
      {
        token == null && <Link to={"/signup"}>
      <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>

        <p>sell a Properties</p>
        <FaArrowRight/>

      </div>
      </Link>
      }
      {
        token !== null && <Link to={"/addProperties"}>
      <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>

        <p>add a Properties</p>
        <FaArrowRight/>

      </div>
      </Link>
      }
     
     
      </div>



      <div className='text-center text-4xl font-semibold mb-3 '>
      Welcome back! Let’s continue your search
      <HighlightText text={"coding Skills"}/>
      </div>

      <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
      "Welcome to [Dummy], where your dream home is just a click away. Discover the perfect property, the ideal investment, and the future you've always envisioned with our extensive listings of homes, apartments, and more."
      </div>

      <div className='flex flex-row gap-7 mt-8'>

      <CTAButton active={true} linkto={"/singup"}>
        let start
      </CTAButton>

      <CTAButton active={false} linkto={"/login"}>
        continue
      </CTAButton>
      </div>

      <Card properties={properties} />
      </div>




      </div> 
        
  )
}
