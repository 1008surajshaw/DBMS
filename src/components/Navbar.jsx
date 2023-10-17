import  { useEffect, useState } from 'react'
import { BsChevronDown } from "react-icons/bs"
import {Link,matchPath, useLocation} from "react-router-dom"
import {NavbarLinks} from "../data/navbar-links"
import  {AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai"
import { useSelector } from 'react-redux'
// import { apiConnector } from '../../services/apiconnector'
// import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle} from "react-icons/io"
//import {AiOutlineShoppingCart} from "react-icons/ai"
import {RxCross1} from "react-icons/rx"
import VerticalNavMenu from './VericalNav'
import ProfileDropDown from './ProfileDropDown'
function Navbar  () {

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
  
 
  const {token} = useSelector((state) =>state.auth);
  const BASE_URL =process.env.REACT_APP_BASE_URL
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading,setLoading] =useState(false)
  const location =useLocation();





 

  const matchRoute =(route) =>{
    return matchPath({ path:route },location.pathname)
  }
 
  

  
  return (
    <>

    
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
      location.pathname !== "/" ? "bg-richblack-800" : ""
    } transition-all duration-200`}>
      <div className={`flex w-11/12 max-w-maxContent items-center justify-between `}>
        
        
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
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
          </ul>
        </nav>
        {/* login/signup/Dashboard */}
        
          <div className="hidden items-center gap-x-4 md:flex">
        
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
          
       
        <div className='block transition-all duration-600 md:hidden cursor-pointer' onClick={()=>setIsMenuOpen((prev)=>!prev)}>
        {
                     
          isMenuOpen ? (<RxCross1 fontSize={24} className='text-white' />):(<AiOutlineMenu fontSize={24} className='text-white' />)

        }

        </div>
        
      </div>
        
        
    </div>
    {
      isMenuOpen && (<VerticalNavMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />)
    }
    </>
  )
}

export default Navbar