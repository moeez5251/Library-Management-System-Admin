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
import { Asterisk } from 'lucide-react'
import CategorySelect from '../../components/catogery'
import Language from '../../components/language'
const AddBook = () => {
 const [catogery, setcatogery] = useState("")
 const [language, setlanguage] = useState("")
    return (
        <>
            <div className='mx-4 my-2'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link className='text-base font-semibold text-black' href="/admin/managebooks" prefetch={true}>Manage Books</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold text-[#113cb0] text-base">Add Book</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className='bg-white mx-4 my-3 py-3 px-8 rounded-md flex flex-col gap-2'>
                <h2 className='font-semibold border-b-2 pb-1.5'>Book information</h2>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col gap-3 items-start'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Book Title <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Book_Title" id="Book_Title" placeholder='Book name here' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-start'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Author(s) <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Author" id="Author" placeholder='Author name here' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-start w-fit'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Genre/category <Asterisk size={13} color='red' />
                        </div>
                        <div>
                           <CategorySelect value={catogery} onChange={setcatogery} />
                        </div>
                    </div>
                </div>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col gap-3 items-start'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Language <Asterisk size={13} color='red' />
                        </div>
                        <div>
                           <Language value={language} onChange={setlanguage} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-start'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Author(s) <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Author" id="Author" placeholder='Author name here' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-start w-fit'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Genre/category <Asterisk size={13} color='red' />
                        </div>
                        <div>
                           <CategorySelect value={catogery} onChange={setcatogery} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddBook