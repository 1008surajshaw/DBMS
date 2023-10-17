import React from 'react'
import  { useEffect, useState } from 'react'
import { BsChevronDown } from "react-icons/bs"
import {Link,matchPath, useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  {AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai"
import { useSelector } from 'react-redux'
import { apiConnector } from '../services/apiconnector'
// import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle} from "react-icons/io"
//import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../components/ProfileDropDown'
import { ACCOUNT_TYPE } from '../utils/constants'
import {RxCross1} from "react-icons/rx"
import { matchRoutes } from 'react-router-dom'
import { logout } from '../services/authApi'
import { VscDashboard, VscSignOut } from "react-icons/vsc";

const NavbarLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
        title: "About Us",
        path: "/about",
    },
    {
        title: "Contact Us",
        path: "/contact",
    },
    {
      title: "Catalog",
      // path: '/catalog',
    },
  ]
  const subLinks=[
    {
     title:"Apartment",
     path:"/category/apartment"
    },
    {
     title:"Bungalow",
     path:"/category/bungalow"
    },{
     title:"Farmhouse",
     path:"/category/farmhouse"
    },{
     title:"Flat",
     path:"/category/flat"
    }

 ]


 const VerticalNavMenu = ({isMenuOpen,setIsMenuOpen}) => {
    const {token} = useSelector((state) =>state.auth);
    
    
  
 
  const { user } =useSelector((state) =>state.profile); 
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const [loading,setLoading] = useState(false)
  
  
  
   const matchRoute =(route) =>{
    return matchPath({ path:route },location.pathname)
  }
  const location =useLocation();

    const handleModal=()=>{
        if(isMenuOpen){
            setIsMenuOpen(false)
        }
       }
   
       return (
        <div className="fixed  inset-0 z-[1000] bg-white  grid top-[3.5rem] place-items-center overflow-auto  bg-opacity-10 backdrop-blur-sm lg:hidden">
            <div className="w-[100%]  rounded-lg   p-6">

                <div className='flex flex-col gap-4 items-center'>
                {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              .map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.title
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.title}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Properties Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}

                    {


                        token === null && (<Link to={"/login"} >
                            <button onClick={()=> handleModal()} className='text-white  bg-richblack-800 rounded-md   py-[8px] px-[12px] text-sm  hover:bg-richblack-700 hover:text-richblack-25 '>
                                Log in
                            </button>
                        </Link>)
                    }
                    {
                        token === null && (<Link to={"/signup"} >
                            <button onClick={()=> handleModal()} className='text-white  bg-richblack-800 rounded-md   py-[8px] px-[12px] text-sm  hover:bg-richblack-700 hover:text-richblack-25'>
                                Sign up
                            </button>
                        </Link>

                        )
                    }
                   

                </div>
            </div>
        </div>
    )
}


export default VerticalNavMenu