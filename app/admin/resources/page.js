"use client"
import { Toaster } from '@/components/ui/sonner'
import React, { useEffect, useState } from 'react'
import { validate } from 'react-email-validator'
import { toast } from 'sonner'
const Resources = () => {
  const [inputs, setInputs] = useState({
    Name: "",
    Email: "",
    Website: ""
  })
  const [issubmitting, setissubmitting] = useState(false)
  const handlechange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }
  const handlesubmit = async () => {
    setissubmitting(true)
    if (inputs.Name.trim() === "" || inputs.Email.trim() === "" || inputs.Website.trim() === "") {
      toast.error("Please fill all the fields")
      setissubmitting(false)
      return
    }
    try {
      new URL(inputs.Website)
    }
    catch {
      toast.error("Please enter a valid URL")
      setissubmitting(false)
      return
    }
    if(!validate(inputs.Email)){
      toast.error("Please enter a valid email address")
      setissubmitting(false)
      return
    }
    const data=await fetch("https://library-management-system-hvhv.onrender.com/api/resource/add",{
      method:"POST",
        credentials: "include",

      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        Name:inputs.Name,
        Email:inputs.Email,
        Website:inputs.Website
      })
    })
    if(!data.ok){
      toast.error("Error in adding resource")
      setissubmitting(false)
      return
    }
    toast.success("Resource added successfully")
    setissubmitting(false)
    setInputs({
      Name: "",
      Email: "",
      Website: ""
    })
  } 
  return (
    <>
      <Toaster />
      <h1 className='font-semibold text-lg m-3'>Add Resource</h1>
      <div className='bg-white px-4 rounded-lg shadow-md mx-3 pt-4 pb-8 '>
        <div className='border-b-2 pb-2'>

          <h2 className='font-semibold'>Library Details</h2>
        </div>
        <div className='flex items-center justify-between my-3'>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              Library Name
            </div>
            <div>
              <input value={inputs.Name} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Name" id="Library_Name" />
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              Email
            </div>
            <div>
              <input value={inputs.Email} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Email" id="Email" />
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              Website
            </div>
            <div>
              <input value={inputs.Website} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base placeholder:font-semibold' type="text" name="Website" id="Website" placeholder='www.example.com' />
            </div>
          </div>
        </div>
        <div className='w-fit mx-auto mt-4'>
          <button disabled={issubmitting} onClick={handlesubmit} className='bg-[#6841c4] text-white px-4 w-fit py-2 rounded-md scale-95 hover:scale-100 transition-all duration-200 font-semibold  cursor-pointer disabled:bg-gray-500 disabled:pointer-events-none'>
            Add Resource
          </button>
        </div>
      </div>

    </>
  )
}

export default Resources