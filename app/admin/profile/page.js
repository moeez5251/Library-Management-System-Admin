"use client"
import { Toaster } from '@/components/ui/sonner';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, transformValue } from "motion/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
const Settings = () => {
  const [inputs, setInputs] = useState({
    user_id: '',
    UserName: '',
    Email: '',
    OldPassword: '',
    NewPassword: '',
    ReNew: ''
  });
  const [icons, setIcons] = useState({
    oldPasswordVisible: false,
    newPasswordVisible: false,
    reNewPasswordVisible: false
  })
  const [issubmitting, setissubmitting] = useState(false);
  const [opening, setopening] = useState(false)
  const [otpvalue, setotpvalue] = useState("")
  const [isverifying, setisverifying] = useState(false);
  const [selectedTab, setSelectedTab] = useState("otp");
  const [dialoginputs, setDialoginputs] = useState({
    NewPassword: '',
    ReNew: ''
  })
  const [dialogicons, setDialogicons] = useState({
    newPasswordVisible: false,
    reNewPasswordVisible: false
  })
  const [disabledchange, setDisabledchange] = useState(true)
  const handlechange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });

  }
  useEffect(() => {
    if (inputs.OldPassword && inputs.NewPassword && inputs.ReNew) {
      setissubmitting(true);
    }
    else {
      setissubmitting(false);
    }
    return () => {

    }
  }, [inputs])
  const handlechangepassword = async () => {
    setissubmitting(false);
    if (inputs.NewPassword.trim().length < 8 && inputs.ReNew.trim().length < 8) {
      toast.custom((t) => (
        <div className={`bg-red-600 text-white p-4 text-sm rounded-md shadow-lg
        ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <AlertCircle className='inline mr-2' size={16} />
          Password must be at least 8 characters long.
        </div>
      ));
      setissubmitting(true);
      return;
    }
    if (inputs.NewPassword !== inputs.ReNew) {
      toast.custom((t) => (
        <div className={`bg-red-600 text-white p-4 text-sm rounded-md shadow-lg
        ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <AlertCircle className='inline mr-2' size={16} />
          New Password Must be same.
        </div>
      ));
      setissubmitting(true);
      return;
    }
    if (inputs.OldPassword === inputs.NewPassword) {
      toast.custom((t) => (
        <div className={`bg-red-600 text-white p-4 text-sm rounded-md shadow-lg
        ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <AlertCircle className='inline mr-2' size={16} />
          New Password must be different from Old Password.
        </div>
      ));
      setissubmitting(true);
      return;
    }
    const data = await fetch("https://library-management-system-hvhv.onrender.com/api/users/changepassword", {
      method: 'PUT',
      credentials: "include",

      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({
        ID: inputs.user_id,
        OldPassword: inputs.OldPassword,
        NewPassword: inputs.NewPassword
      })
    })
    if (!data.ok) {
      const errorData = await data.json();
      toast.error(errorData.error);
      setissubmitting(true);
      return;
    }
    const response = await data.json();
    toast.custom((t) => (
      <div className={`bg-green-600 text-white p-4 text-sm rounded-md
      shadow-lg ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        {response.message}
      </div>
    ));
    setInputs({
      ...inputs,
      OldPassword: '',
      NewPassword: '',
      ReNew: ''
    })
    setissubmitting(true);
    await fetch("https://library-management-system-hvhv.onrender.com/api/notifications/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      credentials: "include",
      body: JSON.stringify({
        Message: "Your Password was Changed",
        Userid: localStorage.getItem("userID")
      })
    })
  }
  useEffect(() => {
    (async () => {
      const data = await fetch("https://library-management-system-hvhv.onrender.com/api/users/getbyid", {
        method: 'POST',
        credentials: "include",

        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ID: localStorage.getItem("userID")
        })
      })
      if (!data.ok) {

        toast.error("Failed to fetch user data");
        return;
      }
      const userData = await data.json();
      setInputs({
        user_id: localStorage.getItem("userID"),
        UserName: userData.User_Name,
        Email: userData.Email,
        OldPassword: '',
        NewPassword: '',
        ReNew: ''
      });
    })()
    return () => {

    }
  }, [])
  const handledialog = async () => {
    setopening(true);

    const data = await fetch("https://library-management-system-hvhv.onrender.com/api/mail/otp", {
      method: 'POST',
      credentials: "include",

      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({
        Name: inputs.UserName,
        Email: inputs.Email
      })
    });
    if (!data.ok) {
      const errorData = await data.json();
      toast.error(errorData.error);
      return;
    }

  }
  const handleResend = async () => {
    const data = await fetch("https://library-management-system-hvhv.onrender.com/api/mail/resend", {
      method: 'POST',
      credentials: "include",

      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({
        Name: inputs.UserName,
        Email: inputs.Email
      })
    });
    if (!data.ok) {
      const errorData = await data.json();
      toast.error(errorData.error);
      return;
    }
    toast.success("OTP Resent Successfully");
  }
  const handleverify = async (e) => {
    setisverifying(true);
    const data = await fetch("https://library-management-system-hvhv.onrender.com/api/mail/verify", {
      method: 'POST',
      credentials: "include",

      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({
        Email: inputs.Email,
        OTP: otpvalue.length === 6 ? otpvalue : e
      })
    });
    if (!data.ok) {
      const errorData = await data.json();
      toast.error(errorData.error);
      setisverifying(false);
      return;

    }
    setSelectedTab("change");
    setotpvalue("");
    setisverifying(false);
  }
  const handledialoginputs = (e) => {
    setDialoginputs({
      ...dialoginputs,
      [e.target.name]: e.target.value
    })
  }

  const handlereset = async () => {
    setisverifying(true);
    if (dialoginputs.NewPassword.trim().length < 8) {
      toast.custom((t) => (
        <div className={`bg-red-600 text-white p-4 text-sm rounded-md shadow-lg
        ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <AlertCircle className='inline mr-2' size={16} />
          Password must be at least 8 characters long.
        </div>
      ));
      setisverifying(false);
      return;
    }
    const data = await fetch("https://library-management-system-hvhv.onrender.com/api/mail/reset", {
      method: 'POST',
      credentials: "include",

      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({
        ID: inputs.user_id,
        Email: inputs.Email,
        NewPassword: dialoginputs.NewPassword
      })
    });
    if (!data.ok) {
      const errorData = await data.json();
      toast.error(errorData.error);
      return;
    }
    toast.success("Password updated Successfully");
    setDialoginputs({
      NewPassword: '',
      ReNew: ''
    });
    setSelectedTab("otp");
    setopening(false);
    setisverifying(false);
    await fetch("https://library-management-system-hvhv.onrender.com/api/notifications/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      credentials: "include",
      body: JSON.stringify({
        Message: "Your password just reset",
        Userid: localStorage.getItem("userID")
      })
    })
  }
  useEffect(() => {
    if (dialoginputs.NewPassword && dialoginputs.ReNew && dialoginputs.NewPassword === dialoginputs.ReNew) {
      setDisabledchange(false);
    }
    else {
      setDisabledchange(true);
    }

    return () => {

    }
  }, [dialoginputs])

  return (
    <>
      <Toaster />
      <div className='bg-white mx-4 my-3 py-5 px-8 pb-12 rounded-md'>
        <div className='font-semibold border-b-2 pb-1 text-lg'>
          Account Information
        </div>
        <div className='my-3 flex items-center justify-between'>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              User id
            </div>
            <div>
              <input disabled value={inputs.user_id} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="user_id" id="user_id" placeholder='Loading...' />
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              User Name
            </div>
            <div>
              <input disabled value={inputs.UserName} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="UserName" id="UserName" placeholder='Loading...' />
            </div>
          </div>
        </div>
        <div className='my-4 flex items-center justify-between'>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              Email
            </div>
            <div>
              <input disabled value={inputs.Email} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Email" id="Email" placeholder='Loading...' />
            </div>
          </div>

        </div>

        <div className='font-semibold border-b-2 pb-1 text-lg flex items-center justify-between'>
          Change Password
          <div onClick={handledialog} className='text-sm font-semibold text-[#6841c4] cursor-pointer hover:underline '>Forget Password ?</div>
        </div>
        <div className='my-3 flex items-center justify-between'>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              Old Password
            </div>
            <div className='relative'>
              <input value={inputs.OldPassword} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type={icons.oldPasswordVisible ? "text" : "password"} name="OldPassword" id="OldPassword" placeholder='Enter Old Password' />
              {
                !icons.oldPasswordVisible &&
                <Eye onClick={() => { setIcons({ ...icons, oldPasswordVisible: true }) }} className='absolute -right-5 top-2 cursor-pointer' size={18} />
              }
              {
                icons.oldPasswordVisible &&
                <EyeOff onClick={() => { setIcons({ ...icons, oldPasswordVisible: false }) }} className='absolute -right-5 top-2 cursor-pointer' size={18} />
              }
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              New Password
            </div>
            <div className='relative'>
              <input value={inputs.NewPassword} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type={icons.newPasswordVisible ? "text" : "password"} name="NewPassword" id="NewPassword" placeholder='Enter New Password' />
              {
                !icons.newPasswordVisible &&
                <Eye onClick={() => { setIcons({ ...icons, newPasswordVisible: true }) }} className='absolute -right-5 top-2 cursor-pointer' size={18} />
              }
              {
                icons.newPasswordVisible &&
                <EyeOff onClick={() => { setIcons({ ...icons, newPasswordVisible: false }) }} className='absolute -right-5 top-2 cursor-pointer' size={18} />
              }
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start'>

            <div className='font-semibold text-sm flex items-start gap-1'>
              Re-Enter New Password
            </div>
            <div className='relative'>
              <input value={inputs.ReNew} onChange={handlechange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type={icons.reNewPasswordVisible ? "text" : "password"} name="ReNew" id="Re-new" placeholder='Enter New Password' />
              {
                !icons.reNewPasswordVisible &&
                <Eye onClick={() => { setIcons({ ...icons, reNewPasswordVisible: true }) }} className='absolute -right-5 top-2 cursor-pointer' size={18} />
              }
              {
                icons.reNewPasswordVisible &&
                <EyeOff onClick={() => { setIcons({ ...icons, reNewPasswordVisible: false }) }} className='absolute -right-5 top-2 cursor-pointer' size={18} />
              }
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center gap-4 mt-4'>

        <Link href={'/admin'} prefetch={true} className='bg-gray-300 px-4 py-2 rounded-sm cursor-pointer'>Cancel</Link>
        <button onClick={handlechangepassword} disabled={!issubmitting} className='bg-[#6841c4] text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal disabled:bg-gray-300 disabled:pointer-events-none disabled:cursor-auto'>Update</button>
      </div>
      <Dialog open={opening} onopenchange={setopening}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle className="text-center">{selectedTab === 'otp' ? "Enter OTP for Verification" : "Enter New Password"}</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <button onClick={() => { setopening(false); }} className='absolute top-3 cursor-pointer right-3 bg-gray-300  p-1 rounded-2xl z-40 '>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              className="injected-svg"
              color="black"
              data-src="https://cdn.hugeicons.com/icons/multiplication-sign-solid-rounded.svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                fillRule="evenodd"
                d="M5.116 5.116a1.25 1.25 0 0 1 1.768 0L12 10.232l5.116-5.116a1.25 1.25 0 0 1 1.768 1.768L13.768 12l5.116 5.116a1.25 1.25 0 0 1-1.768 1.768L12 13.768l-5.116 5.116a1.25 1.25 0 0 1-1.768-1.768L10.232 12 5.116 6.884a1.25 1.25 0 0 1 0-1.768Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <AnimatePresence mode="wait">
              {selectedTab === "otp" && (
                <motion.div
                  key="tab1"
                  transition={{ duration: 0.3 }}
                >
                  <div className='flex flex-col items-center justify-center gap-4'>

                    <div className='text-center'>Email sent to <span className='text-[#6841c4]'>{inputs.Email.slice(0, 3) + "***@***.com"}</span></div>
                    <div className='mx-auto'>

                      <InputOTP maxLength={6} value={otpvalue} onChange={async (value) => {
                        setotpvalue(value)
                        if (value.length === 6) {
                          handleverify(value);
                        }
                      }}>
                        <InputOTPGroup>
                          <InputOTPSlot autoFocus={true} className="text-xl text-[#6841c4]" index={0} />
                          <InputOTPSlot className="text-xl text-[#6841c4]" index={1} />
                          <InputOTPSlot className="text-xl text-[#6841c4]" index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot className="text-xl text-[#6841c4]" index={3} />
                          <InputOTPSlot className="text-xl text-[#6841c4]" index={4} />
                          <InputOTPSlot className="text-xl text-[#6841c4]" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      {
                        !isverifying &&
                        <Button onClick={handleverify} disabled={otpvalue.length !== 6} className="w-[95%] btn-verify bg-[#6841c4] text-base h-10 mt-8 rounded-full cursor-pointer hover:bg-[#5917f3]">Verify</Button>
                      }
                      {
                        isverifying &&
                        <Button disabled className="w-[95%]  bg-[#6841c4] text-base h-10 mt-8 rounded-full cursor-pointer hover:bg-[#5917f3]">Verify</Button>
                      }

                    </div>

                    <DialogFooter className="text-center block my-3 ">Didn&apos;t receive code? <span onClick={handleResend} className='text-[#6841c4] cursor-pointer'>Click to resend.</span></DialogFooter>

                  </div>
                </motion.div>
              )}
              {selectedTab === "change" && (
                <motion.div
                  key="tab2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='flex flex-col gap-2 items-start justify-start  w-[95%] mx-auto'>

                      <div className='font-semibold text-sm flex items-start gap-1 '>
                        Enter  New Password
                      </div>
                      <div className='relative w-full'>
                        <input value={dialoginputs.NewPassword} onChange={handledialoginputs} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type={dialogicons.newPasswordVisible ? "text" : "password"} name="NewPassword" id="NewPassword" placeholder='Enter New Password' />
                        {
                          !dialogicons.newPasswordVisible &&
                          <Eye onClick={() => { setDialogicons({ ...dialogicons, newPasswordVisible: true }) }} className='absolute -right-6 top-2 cursor-pointer' size={18} />
                        }
                        {
                          dialogicons.newPasswordVisible &&
                          <EyeOff onClick={() => { setDialogicons({ ...dialogicons, newPasswordVisible: false }) }} className='absolute -right-6 top-2 cursor-pointer' size={18} />
                        }
                      </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start justify-start  w-[95%] mx-auto'>

                      <div className='font-semibold text-sm flex items-start gap-1 '>
                        Re-Enter  New Password
                      </div>
                      <div className='relative w-full'>
                        <input value={dialoginputs.ReNew} onChange={handledialoginputs} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type={dialogicons.reNewPasswordVisible ? "text" : "password"} name="ReNew" id="ReNew" placeholder='Enter New Password' />
                        {
                          !dialogicons.reNewPasswordVisible &&
                          <Eye onClick={() => { setDialogicons({ ...dialogicons, reNewPasswordVisible: true }) }} className='absolute -right-6 top-2 cursor-pointer' size={18} />
                        }
                        {
                          dialogicons.reNewPasswordVisible &&
                          <EyeOff onClick={() => { setDialogicons({ ...dialogicons, reNewPasswordVisible: false }) }} className='absolute -right-6 top-2 cursor-pointer' size={18} />
                        }
                      </div>
                    </div>
                    {
                      !isverifying &&
                      <div className='mx-auto'>
                        <Button onClick={handlereset} disabled={disabledchange} className=" btn-verify bg-[#6841c4] text-base h-10 mt-8 rounded-full cursor-pointer hover:bg-[#5917f3]">Change Password</Button>

                      </div>
                    }
                    {
                      isverifying &&
                      <div className='mx-auto'>
                        <Button disabled={true} className=" btn-verify bg-[#6841c4] text-base h-10 mt-8 rounded-full cursor-pointer hover:bg-[#5917f3]">Change Password</Button>

                      </div>
                    }



                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>


        </DialogContent>

      </Dialog>


    </>
  )
}

export default Settings