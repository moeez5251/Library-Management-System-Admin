"use client"
import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import { Asterisk, CircleAlert, CircleCheckBig } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { validate } from 'react-email-validator'
const DynamicPage = ({ params }) => {
  const [userid, setuserid] = useState("")
  const [MemberShip, setMemberShip] = useState("")
  const [role, setrole] = useState("Standard-User")
  const [disabledbtn, setdisabledbtn] = useState(true)
  const [edit, setedit] = useState(false)
  const [user, setuser] = useState(true)
  const [toggleact, settoggleact] = useState(false)
  const [inputs, setInputs] = useState({
    User_Name: '',
    Email: '',
    Membership_Type: MemberShip,
    Role: role,
    Status: ""
  })

  useEffect(() => {
    (async function getuserid() {
      const { slug } = await params
      setuserid(slug)
      const data = await fetch("https://library-management-system-hvhv.onrender.com/api/users/getbyid", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        credentials: "include",

        body: JSON.stringify({
          ID: slug
        })
      },)
      if (!data.ok) {
        toast.error("Something went wrong")
        return
      }
      const res = await data.json()
      setInputs({
        ...inputs,
        User_Name: res.User_Name,
        Email: res.Email,
        Status: res.Status
      })
      setMemberShip(res.Membership_Type)
      setrole(res.Role)
    })()

    return () => {

    }
  }, [])
  useEffect(() => {
    setInputs({
      ...inputs,
      Membership_Type: MemberShip,
      Role: role
    })
    return () => {

    }
  }, [MemberShip, role])
  useEffect(() => {
    if (inputs.User_Name.trim() !== '' && inputs.Email.trim() !== '' && MemberShip.trim() !== '' && role.trim() !== '') {
      setdisabledbtn(false)
    }
    else {
      setdisabledbtn(true)
    }
    return () => {

    }

  }, [inputs])

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });

  }
  const handleupdateuser = async () => {
    if (!validate(inputs.Email)) {
      toast.custom((t) => (
        <div className={`bg-red-700 text-white p-4 rounded-md shadow-lg flex items-center gap-3
                ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <CircleAlert size={20} />
          <p className='text-sm'>Please enter a valid email address.</p>
        </div>
      ));
      return;
    }
    setuser(false)
    try {

      const data = await fetch("https://library-management-system-hvhv.onrender.com/api/users/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        credentials: "include",

        body: JSON.stringify({
          ID: userid,
          User_Name: inputs.User_Name,
          Email: inputs.Email,
          Role: role,
          Membership_Type: MemberShip
        })
      })
      if (!data.ok) {
        toast.error("Error in updating user")
        setuser(true)
        return
      }
      const res = await data.json()
      toast.custom((t) => (
        <div className={`bg-green-600 text-white p-4 rounded-md shadow-lg flex items-center gap-2
                   ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <CircleCheckBig size={20} />
          <p className='text-sm'>{res.message} </p>
        </div>

      ));
    }
    catch (error) {
      toast.error("Something went wrong while updating user")
    }
    setuser(true)
    setedit(false)
  }
  const handleactivateaccount = async () => {
    settoggleact(true)
    try {

      const data = await fetch("https://library-management-system-hvhv.onrender.com/api/users/activate", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        credentials: "include",

        body: JSON.stringify({
          ID: userid
        })
      })
      if (!data.ok) {
        toast.error("Error in activating account")
        settoggleact(false)
        return
      }
      const res = await data.json()
      toast.custom((t) => (
        <div className={`bg-green-600 text-white p-4 rounded-md shadow-lg flex items-center gap-2
                   ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <CircleCheckBig size={20} />
          <p className='text-sm'>{res.message} </p>
        </div>

      ));
      settoggleact(false)
      setInputs({
        ...inputs,
        Status: "Active"
      })
    }
    catch {
      toast.error("Something went wrong while activating account")
      settoggleact(false)
      
    }

  }
  const handledeactivate = async () => {
    settoggleact(true)
    try {
      const data = await fetch("https://library-management-system-hvhv.onrender.com/api/users/deactivate", {
      method: "POST",
        credentials: "include",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(Array.from([userid]))
    })
    if(!data.ok) {
      toast.error("Error in deactivating account")
      settoggleact(false)
      return
    }
    const res = await data.json()
      toast.custom((t) => (
        <div className={`bg-red-700 text-white p-4 rounded-md shadow-lg flex items-center gap-2
                   ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <CircleAlert size={20} />
          <p className='text-sm'>{res.message} </p>
        </div>

      ));
      settoggleact(false)
      setInputs({
        ...inputs,
        Status: "Deactivated"
      })
    }
    catch (error) {
      toast.error("Something went wrong while deactivating account")
      settoggleact(false)
    }
  }
  return (
    <>
      <Toaster />
      <div className='sm:mx-4 my-2'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className='text-base font-semibold text-black dark:text-white' href="/admin/members" prefetch={true}>Manage Users</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-[#113cb0] text-base dark:text-[#486698]">{inputs.User_Name.length > 0 ? inputs.User_Name : userid}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='bg-white sm:mx-4 my-3 py-3 px-8 pb-12 rounded-md dark:bg-[#1b2536]'>
        <div className='flex items-center justify-between border-b-2 pb-1.5'>
          <h2 className='font-semibold '>User information</h2>
          {
            !edit &&
            <p onClick={() => setedit(true)} className='text-sm text-[#6841c4] cursor-pointer hover:underline'>Edit Profile</p>
          }
        </div>

        <div className='flex flex-col gap-3 items-start'>
          <div className='my-3 w-full flex flex-col gap-5'>
            <div className='flex items-start gap-5 sm:items-center justify-between flex-col sm:flex-row'>

              <div className='flex flex-col gap-2 items-start'>

                <div className='font-semibold text-sm flex items-start gap-1'>
                  User Name<Asterisk size={13} color='red' />
                </div>
                <div>
                  <input disabled={!edit} value={inputs.User_Name} onChange={handleInputChange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base  disabled:bg-none disabled:border-none disabled:py-0 disabled:px-0 disabled:text-sm' type="text" name="User_Name" id="User_Name" placeholder='Loading...' />
                </div>
              </div>
              <div className='flex flex-col gap-2 items-start'>

                <div className='font-semibold text-sm flex items-start gap-1'>
                  Email<Asterisk size={13} color='red' />
                </div>
                <div>
                  <input disabled={!edit} value={inputs.Email} onChange={handleInputChange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base disabled:bg-none disabled:border-none disabled:py-0 disabled:px-0 disabled:text-sm disabled:w-[190px]' type="text" name="Email" id="Email" placeholder='Loading...' />
                </div>
              </div>
            </div>
            <div className='flex items-start gap-5 sm:items-center justify-between flex-col sm:flex-row'>
              <div className='flex flex-col gap-2 items-start'>

                <div className='font-semibold text-sm flex items-start gap-1'>
                  MemberShip Type<Asterisk size={13} color='red' />
                </div>
                <div>
                  <Select disabled={!edit} value={MemberShip} onValueChange={setMemberShip}>
                    <SelectTrigger className="w-[190px]">
                      <SelectValue className="dark:bg-[#1b2536]" placeholder="MemberShip" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#1b2536]">
                      <SelectItem className="dark:bg-[#1b2536] dark:hover:bg-[#1b2550]" value="English">English</SelectItem>
                      <SelectItem className="dark:bg-[#1b2536] dark:hover:bg-[#1b2550]" value="Urdu">Urdu</SelectItem>
                      <SelectItem className="dark:bg-[#1b2536] dark:hover:bg-[#1b2550]" value="French">French</SelectItem>
                      <SelectItem className="dark:bg-[#1b2536] dark:hover:bg-[#1b2550]" value="Hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='flex flex-col gap-2 items-start'>

                <div className='font-semibold text-sm flex items-start gap-1'>
                  Role<Asterisk size={13} color='red' />
                </div>
                <div>
                  <RadioGroup value={role} onValueChange={setrole} className="flex items-center" defaultValue="Standard-User">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem disabled={!edit} value="Standard-User" id="Standard-User" />
                      <Label htmlFor="Standard-User">Standard User</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem disabled={!edit} value="Admin" id="Admin" />
                      <Label htmlFor="Admin">Admin</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      {
        !edit && inputs.Status === "Deactivated" && !toggleact &&
        < div className='flex items-center mx-4 gap-3'>
          <button onClick={handleactivateaccount} disabled={toggleact} className='bg-green-600 text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal'>Activate Account</button>
        </div >
      }
      {
        !edit && inputs.Status === "Deactivated" && toggleact &&
        < div className='flex items-center mx-4 gap-3'>
          <button disabled={true} className='bg-green-700 text-white px-4 py-2 rounded-sm pointer-events-none cursor-auto'>Activating...</button>
        </div >
      }
      {
        !edit && inputs.Status === "Active" && !toggleact &&
        < div className='flex items-center mx-4 gap-3'>
          <button onClick={handledeactivate} disabled={toggleact} className='bg-red-700 text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal'>Deactivate Account</button>
        </div >
      }
      {
        !edit && inputs.Status === "Active" && toggleact &&
        < div className='flex items-center mx-4 gap-3'>
          <button  disabled={true} className='bg-red-800 text-white px-3 py-2 rounded-sm pointer-events-none cursor-auto'>Deactivating...</button>
        </div >
      }

      {
        edit &&
        <div className='flex items-center justify-center gap-3'>
          <button onClick={() => setedit(false)} className='bg-gray-300 px-4 py-2 rounded-sm cursor-pointer dark:bg-[#162130]'>Cancel</button>
          {
            user &&
            <button onClick={handleupdateuser} disabled={disabledbtn} className='bg-[#6841c4] text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal disabled:bg-gray-300 disabled:pointer-events-none disabled:cursor-auto dark:disabled:bg-gray-600'>Update</button>

          }

          {
            !user &&
            <button disabled={true} className='bg-[#6841c4] text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal disabled:bg-gray-300 disabled:pointer-events-none disabled:cursor-auto dark:disabled:bg-gray-600'>Updating...</button>

          }

        </div>
      }
    </>
  )
}

export default DynamicPage