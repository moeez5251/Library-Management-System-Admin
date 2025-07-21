"use client"
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
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
  const handlechange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }
  return (
    <>
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
              <input disabled className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Email" id="Email" placeholder='Loading...' />
            </div>
          </div>

        </div>

        <div className='font-semibold border-b-2 pb-1 text-lg flex items-center justify-between'>
          Change Password
          <div className='text-sm font-semibold text-[#6841c4] cursor-pointer hover:underline '>Forget Password ?</div>
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
    </>
  )
}

export default Settings