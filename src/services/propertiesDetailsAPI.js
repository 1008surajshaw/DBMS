import { apiConnector } from "./apiconnector"
const BASE_URL = `http://localhost:4000/api/v1`


export const fetchPropertiesCategories = async () =>{
    let result =[]
    try{
      const response =await apiConnector("GET",BASE_URL + "/properties/showAllCategories")
      console.log("PROPERTIES_CATEGORIES_API API RESPONSE............", response)
      if( !response?.data?.success){
        throw new Error("Could Not Fetch properties Categories")
      }
      result = response?.data?.data
    }
    catch(error){
        console.log("PROPERTIES_CATEGORY_API API ERROR............", error)
     
    }
    return result
}

export const createRating = async (data, token) => {
   
    let success = false
    try {
      const response = await apiConnector("POST",BASE_URL + "/properties/createRating" , data, {
        Authorization: ` ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
     
    }
    
    return success
  }

  export const getAllProperties = async () =>{
   
    let result = []
    try{

        const response = await apiConnector("GET",BASE_URL+"/properties/getAllProperties")
        if(!response?.data?.success){
            throw new Error("Could Not Fetch properties Categories") 
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("GET_ALL_COURSE_API API ERROR............", error)
         
    }
   
    return result
}

export const addPropertiesDetails = async (data,token) =>{
    let result = null
  
    try{
        console.log("one")
        const response = await apiConnector("POST",BASE_URL + "/properties/createProperties",data,{
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`
        })
        console.log("one")

        console.log("CREATE properties API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Add properties Details")
        }
       
        result = response?.data?.data
    }
    catch(error){
        console.log("CREATE properties API ERROR............", error)
       
    }
    
    return result
}