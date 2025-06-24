"use client"
import React, { useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import { Asterisk, EyeIcon, EyeOff } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
const AddUser = () => {
    const [togglepassword, settogglepassword] = useState(false)
    return (
        <>
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
                            <BreadcrumbPage className="font-semibold text-[#113cb0] text-base">Add User</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className='bg-white mx-4 my-3 py-3 px-8 pb-12 rounded-md'>
                <h2 className='font-semibold border-b-2 pb-1'>User Information</h2>
                <div>
                    <div className='flex flex-col gap-3 items-start'>
                        <div className='my-3 w-full flex flex-col gap-5'>
                            <div className='flex items-center justify-between'>

                                <div className='flex flex-col gap-2 items-start'>

                                    <div className='font-semibold text-sm flex items-start gap-1'>
                                        User Name<Asterisk size={13} color='red' />
                                    </div>
                                    <div>
                                        <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="User_Name" id="User_Name" placeholder='User name here' />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>

                                    <div className='font-semibold text-sm flex items-start gap-1'>
                                        Email<Asterisk size={13} color='red' />
                                    </div>
                                    <div>
                                        <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Email" id="Email" placeholder='Enter email address' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>

                                <div className='flex flex-col gap-2 items-start'>

                                    <div className='font-semibold text-sm flex items-start gap-1'>
                                        Password<Asterisk size={13} color='red' />
                                    </div>
                                    <div className='flex items-center gap-2 relative'>
                                        <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type={togglepassword ? "text" : "password"} name="Password" id="Password" placeholder='Enter Password' />
                                        <button onClick={() => settogglepassword(!togglepassword)} className='absolute  right-2 cursor-pointer'>
                                            {
                                                togglepassword ?
                                                    <EyeOff size={17} /> :
                                                    <EyeIcon size={17} />
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>

                                    <div className='font-semibold text-sm flex items-start gap-1'>
                                        MemberShip Type<Asterisk size={13} color='red' />
                                    </div>
                                    <div>
                                        <Select>
                                            <SelectTrigger className="w-[170px]">
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
                            </div>
                            <div className='flex flex-col gap-2 items-start'>

                                <div className='font-semibold text-sm flex items-start gap-1'>
                                    Role<Asterisk size={13} color='red' />
                                </div>
                                <div>
                                    <RadioGroup className="flex items-center" defaultValue="Standard-User">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Standard-User" id="Standard-User" />
                                            <Label htmlFor="Standard-User">Standard User</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Admin" id="Admin" />
                                            <Label htmlFor="Admin">Admin</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default AddUser