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
    const data=await fetch("/api/resource/add",{
      method:"POST",
        credentials: "include",

      headers:{
        "Content-Type":"application/json",
           
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
      <div className='bg-white px-4 rounded-lg shadow-md mx-3 pt-4 pb-8 dark:bg-[#1b2536] '>
        <div className='border-b-2 pb-2 dark:border-[#252f40]'>

          <h2 className='font-semibold'>Library Details</h2>
        </div>
        <div className='md:flex md:items-center grid grid-cols-1 items-center sm:grid-cols-2 md:justify-between my-3'>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              Library Name
            </div>
            <div className='w-full sm:w-[90%]'>
              <input value={inputs.Name} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full sm:w-[90%]' type="text" name="Name" id="Library_Name" />
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              Email
            </div>
            <div className='w-full sm:w-[90%]'>
              <input value={inputs.Email} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full sm:w-[90%]' type="text" name="Email" id="Email" />
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              Website
            </div>
            <div className='w-full sm:w-[90%]'>
              <input value={inputs.Website} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base placeholder:font-semibold w-full sm:w-[90%]' type="text" name="Website" id="Website" placeholder='www.example.com' />
            </div>
          </div>
        </div>
        <div className='w-fit mx-auto mt-8 md:mt-4'>
          <button disabled={issubmitting} onClick={handlesubmit} className='bg-[#6841c4] text-white px-4 w-fit py-2 rounded-md scale-95 hover:scale-100 transition-all duration-200 font-semibold  cursor-pointer disabled:bg-gray-500 disabled:pointer-events-none'>
            Add Resource
          </button>
        </div>
      </div>

    </>
  )
}

export default Resources