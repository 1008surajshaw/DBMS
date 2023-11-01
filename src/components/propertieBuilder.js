import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPropertiesDetails,fetchPropertiesCategories } from '../services/propertiesDetailsAPI'
import IconBtn from "./IconBtn"
import Upload from "./Upload"
import ChipInput from  "./ChipInput"
import RequirementsField from "./RequirementField"

import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useNavigate } from 'react-router-dom'

export default function CourseInformationForm ()  {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    }= useForm()
 
    
     const navigate = useNavigate();
    const dispatch =useDispatch()
    const { token } =useSelector((state) =>state.auth)
   
    const [loading,setLoading ] =useState(false)
    const [ propertiescategories, setPropertiesCategories ] =useState([])

    useEffect(() => {
      const getCategories = async () => {
        setLoading(true)
        const categories = await fetchPropertiesCategories()
      
          // console.log("categories", categories)
          setPropertiesCategories(categories)
        
        setLoading(false)
      }
      getCategories()
    }, [])
  
    const options = [
        {
            id:1,
            name:"Rent"
        },
        {
            id:2,
            name:"Sell"
        },
    ]
  
    const onSubmit = async (data) => {
  
      const formData = new FormData()
      formData.append("propertiesAddress", data.propertiesAddress)
      formData.append("propertiesDescription", data.propertiesDescription)
      formData.append("price", data.price)
      formData.append("options", data.options)
      formData.append("tag", JSON.stringify(data.tag))
      formData.append("category", data.propertiescategories)
      formData.append("instructions", JSON.stringify(data.instructions))
      formData.append("thumbnailImage", data.thumbnail)
      setLoading(true)
     // console.log(formData)
      const result = await addPropertiesDetails(formData, token)
      if (result) {
       
        console.log("Done bhai")
      }
      navigate("/")
      setLoading(false)
    }
  
  
  return (
   <form
   onSubmit={handleSubmit(onSubmit)}
   className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
   >

     {/* properties Title */}
     <div className='flex flex-col space-y-2'>
       <label className='text-sm label-style text-richblack-5' htmlFor='propertiesAddress'>
       properties Address <sup className='text-pink-200'>*</sup>
       </label>
       <input
        id='propertiesAddress'
        placeholder='Enter properties Title'
        className='form-style'
        {...register("propertiesAddress",{required: true})}
       />
       {
        errors.propertiesAddress && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
            properties Address is required
            </span>
        )
       }
     </div>
      <div className='flex flex-col space-y-2'>
      <label className='text-sm text-richblack-5' htmlFor='options'>
        type <sup className="text-pink-200">*</sup>
       </label>
       <select
        {...register("options", { required:true })}
        defaultValue=""
        id='options'
        className='form-style w-full'
        >
        <option value="" disabled={true}>
             Choose a type
        </option>
          
          {
            !loading && 
            options?.map((options,idx) =>(
                <option key={idx} value={options?._id}>
                {options?.name}
                </option>
               ))
          }
        </select>
        {
            errors.category && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                   Category is required
                </span>
            )
        }
      </div>
     {/* properties Short Decription */}
     <div className='flex flex-col space-y-2'>
       <label className='text-sm text-richblack-5' htmlFor='propertiesDescription'>
       properties Description <sup className="text-pink-200">*</sup>
       </label>
       <textarea 
        id="propertiesDescription"
        placeholder="Enter Description"
        {...register("propertiesDescription", { required: true })}
        className="form-style resize-x-none min-h-[130px] w-full"
       />
       {
        errors.propertiesDescription && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              properties Description is required
            </span>
        )
       }
     </div>

      {/* properties Price */}
      <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='price'>
           properties Price <sup className="text-pink-200">*</sup> 
        </label>
        <div className='relative'>
            <input 
                id='price'
                placeholder='Enter price'
                {...register("price",{
                    required:true,
                    valueAsNumber:true,
                    pattern :{
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    }

                })}
                className='form-style w-full !pl-12'
            />
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-800" />
        </div>
        {errors.price && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            properties Price is required
          </span>
        )}
      </div>

      {/* coursecategory */}

      <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='propertiescategories'>
           properties Category <sup className="text-pink-200">*</sup>
        </label>
        <select
        {...register("propertiescategories", { required:true })}
        defaultValue=""
        id='category'
        className='form-style w-full'
        >
        <option value="" disabled={true}>
             Choose a Category
        </option>
          
          {
            !loading && 
            propertiescategories?.map((category,idx) =>(
                <option key={idx} value={category?._id}>
                {category?.name}
                </option>
               ))
          }
        </select>
        {
            errors.category && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                   Category is required
                </span>
            )
        }
      </div>

      {/* properties Tags */}
      <ChipInput
        label="tag"
        name="tag"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* properties Thumbnail image */}
      <Upload
        name="thumbnail"
        label="properties Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
       
      />
      {/* benefit of the properties */}
      
       
      {/* Requirements Instruction */}
      <RequirementsField 
        name="instructions"
        label=" Instructions"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

   
      <div className='flex justify-end gap-x-2'>
        
        <IconBtn 
          disabled={loading}
          text ={"save"}
          >
           <MdNavigateNext />
          </IconBtn>
      </div>

 
   </form>
  )
}
