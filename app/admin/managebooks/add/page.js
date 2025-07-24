"use client"
import React, { useState, useEffect } from 'react'
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
const AddBook = () => {
    const [catogery, setcatogery] = useState("")
    const [language, setlanguage] = useState("")
    const [stock, setstock] = useState("Available")
    const [disabledbtn, setdisabledbtn] = useState(true)
    const [book, setbook] = useState(true)
    const [inputs, setInputs] = useState({
        Book_Title: "",
        Author: "",
        Category: catogery,
        Copies: "",
        Language: language,
        Price: "",
        Status: stock,
        Pages: ""
    })
    const oninputchange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        setInputs({ ...inputs, Category: catogery, Language: language, Status: stock })
        return () => {

        }
    }, [catogery, language, stock])
    const addbook = async () => {
        setbook(false)
        try {

            const data = await fetch("https://library-management-system-hvhv.onrender.com/api/books/insert", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
        credentials: "include",

                body: JSON.stringify({
                    Book_Title: inputs.Book_Title,
                    Author: inputs.Author,
                    Category: inputs.Category,
                    Total_Copies: Number(inputs.Copies),
                    Language: inputs.Language,
                    Price: Number(inputs.Price),
                    Status: inputs.Status,
                    Pages: Number(inputs.Pages),
                    API: process.env.NEXT_PUBLIC_XLMS_API
                })
            }
            )
            if (!data.ok) {
                const errorData = await data.json()
                if (errorData.error) {
                    toast.error(errorData.error)
                    setbook(true)
                    return
                }
            }
            const response = await data.json()
            toast(response.message)
            setInputs({
                Book_Title: "",
                Author: "",
                Category: "",
                Copies: "",
                Language: "",
                Price: "",
                Status: "",
                Pages: ""
            })
            setbook(true)
        }
        catch {
            toast("Unable to add book")
            setbook(true)
        }
    }
    useEffect(() => {
        if (inputs.Book_Title.trim() !== "" && inputs.Author.trim() !== "" && inputs.Copies.trim() !== "" && inputs.Language.trim() !== "" && inputs.Price.trim() !== "" && inputs.Status.trim() !== "" && inputs.Pages.trim() !== "" && inputs.Category.trim() !== "") {
            setdisabledbtn(false)
        }
        else {
            setdisabledbtn(true)
        }
        return () => {

        }
    }, [inputs])

    return (
        <>
            <Toaster />

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
            <div className='bg-white mx-4 my-3 py-3 px-8 pb-12 rounded-md flex flex-col gap-2'>
                <h2 className='font-semibold border-b-2 pb-1.5'>Book information</h2>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col gap-3 items-start'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Book Title <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input value={inputs.Book_Title} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Book_Title" id="Book_Title" placeholder='Book name here' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-start'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Author(s) <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input value={inputs.Author} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Author" id="Author" placeholder='Author name here' />
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
                            Total Copies <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input value={inputs.Copies} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-sm  text-base' type="number" name="Copies" id="copies" placeholder='Total number of copies' />

                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-start'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Language <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <Language value={language} onChange={setlanguage} />

                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-start w-fit'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Price <span className='text-green-600'>( PKR )</span> <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input value={inputs.Price} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-sm  text-base' type="number" name="Price" id="price" placeholder='Price of book' />

                        </div>
                    </div>
                </div>
                <div className='my-3 flex items-center justify-between'>

                    <div className='flex flex-col gap-3 items-start'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Stock <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <RadioGroup className="flex items-center" onValueChange={setstock} value={stock}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Available" id="Available" />
                                    <Label htmlFor="Available">Available</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Reserved" id="Reserved" />
                                    <Label htmlFor="Reserved">Reserved</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Out of stock" id="out" />
                                    <Label htmlFor="out">Out of stock</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-start'>
                        <div className='font-semibold text-sm flex items-start gap-1'>
                            Total number of Pages <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input value={inputs.Pages} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-sm  text-base' type="number" name="Pages" id="pages" placeholder='Total number of pages' />

                        </div>
                    </div>

                </div>

            </div>
            <div className='flex items-center justify-center gap-3'>
                <Link href="/admin/managebooks" prefetch={true} className='bg-gray-300 px-4 py-2 rounded-sm cursor-pointer'>Cancel</Link>
                {
                    book &&
                    <button onClick={addbook} disabled={disabledbtn} className='bg-[#6841c4] text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal disabled:bg-gray-300 disabled:pointer-events-none disabled:cursor-auto'>Add Book</button>

                }

                {
                    !book &&
                    <button onClick={addbook} disabled={true} className='bg-[#6841c4] text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal disabled:bg-gray-300 disabled:pointer-events-none disabled:cursor-auto'>Adding...</button>

                }

            </div>
        </>
    )
}

export default AddBook