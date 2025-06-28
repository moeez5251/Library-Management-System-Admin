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
const DynamicPage = ({ params }) => {
  const [userid, setuserid] = useState("")
  const [MemberShip, setMemberShip] = useState("")
  const [role, setrole] = useState("Standard-User")
  const [disabledbtn, setdisabledbtn] = useState(true)
  const [togglepassword, settogglepassword] = useState(false)
  const [edit, setedit] = useState(false)
  const [user, setuser] = useState(true)
  const [inputs, setInputs] = useState({
    User_Name: '',
    Email: '',
    Membership_Type: MemberShip,
    Role: role
  })
  useEffect(() => {
    (async function getuserid() {
      const { slug } = await params
      setuserid(slug)
      const data = await fetch("http://localhost:5000/api/users/getbyid", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
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
        Email: res.Email
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
    setuser(false)
    try {

      const data = await fetch("http://localhost:5000/api/users/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
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
  return (
    <>
      <Toaster />
      <div className='mx-4 my-2'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className='text-base font-semibold text-black' href="/admin/members" prefetch={true}>Manage Users</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-[#113cb0] text-base">{inputs.User_Name.length > 0 ? inputs.User_Name : userid}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='bg-white mx-4 my-3 py-3 px-8 pb-12 rounded-md'>
        <div className='flex items-center justify-between border-b-2 pb-1.5'>
          <h2 className='font-semibold '>User information</h2>
          {
            !edit &&
            <p onClick={() => setedit(true)} className='text-sm text-[#6841c4] cursor-pointer hover:underline'>Edit Profile</p>
          }
        </div>

        <div className='flex flex-col gap-3 items-start'>
          <div className='my-3 w-full flex flex-col gap-5'>
            <div className='flex items-center justify-between'>

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
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2 items-start'>

                <div className='font-semibold text-sm flex items-start gap-1'>
                  MemberShip Type<Asterisk size={13} color='red' />
                </div>
                <div>
                  <Select disabled={!edit} value={MemberShip} onValueChange={setMemberShip}>
                    <SelectTrigger className="w-[190px]">
                      <SelectValue placeholder="MemberShip" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Urdu">Urdu</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
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
        edit &&
        <div className='flex items-center justify-center gap-3'>
          <button onClick={() => setedit(false)} className='bg-gray-300 px-4 py-2 rounded-sm cursor-pointer'>Cancel</button>
          {
            user &&
            <button onClick={handleupdateuser} disabled={disabledbtn} className='bg-[#6841c4] text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal disabled:bg-gray-300 disabled:pointer-events-none disabled:cursor-auto'>Update</button>

          }

          {
            !user &&
            <button disabled={true} className='bg-[#6841c4] text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal disabled:bg-gray-300 disabled:pointer-events-none disabled:cursor-auto'>Updating...</button>

          }

        </div>}
    </>
  )
}

export default DynamicPage