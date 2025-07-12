"use client"
import React from 'react'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { useState, useEffect } from 'react'
import ComboBox from '../../components/select'
import { DatePicker } from '../../components/datepicker'
import { Asterisk } from 'lucide-react'
import Link from 'next/link'
const Lend = () => {
    const [bookinfo, setbookinfo] = useState({
        Book_Title: "",
        Category: "",
        Author: "",
    })
    const [Booktitle, setBooktitle] = useState("")
    const [BookCategory, setBookCategory] = useState("")
    const [Author, setAuthor] = useState("")
    const [LendingDate, setLendingDate] = useState(new Date)
    const [DueDate, setDueDate] = useState("")
    const [role, setRole] = useState("Strandard User")
    const [disabledbtn, setdisabledbtn] = useState(true)
    const [inputs, setInputs] = useState({
        Lender_name: "",
        Email: "",
        Phone: "",
        Book_Title: "",
        Catogery: "",
        Author: "",
        Lending_Date: "",
        Due_Date: "",
        Copies: "",
        Fine: "",
        Role: ""
    })
    useEffect(() => {
        (async function fetchTitles() {
            const data = await fetch("http://localhost:5000/api/books/col", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    column: ["Book_Title", "Category", "Author"]
                })
            })
            if (!data.ok) {
                toast.error("Failed to fetch books")
                return
            }
            const result = await data.json()
            if (result) {
                const filtered_title = result.filter(
                    (item, index, self) =>
                        self.findIndex(obj => obj.Book_Title === item.Book_Title) === index
                )

                const filtered_category = result.filter(
                    (item, index, self) =>
                        self.findIndex(obj => obj.Category === item.Category) === index

                )

                const filtered_author = result.filter(
                    (item, index, self) =>
                        self.findIndex(obj => obj.Author === item.Author) === index
                )
                setbookinfo({
                    Book_Title: filtered_title.map(item => item.Book_Title),
                    Category: filtered_category.map(item => item.Category),
                    Author: filtered_author.map(item => item.Author)
                })

            }
        })()

        return () => {

        }
    }, [])
    useEffect(() => {
        setInputs({
            ...inputs,
            Book_Title: Booktitle,
            Catogery: BookCategory,
            Author: Author,
            Lending_Date: LendingDate,
            Due_Date: DueDate,
            Role: role
        })
        return () => {

        }
    }, [Booktitle, BookCategory, Author, LendingDate, DueDate, role])
    const handleinput = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        for (const key in inputs) {
            if (inputs[key] === "") {
                setdisabledbtn(true)
                return
            }
        }
        setdisabledbtn(false)
        return () => {

        }
    }, [inputs])

    return (
        <>
            <Toaster />
            <h1 className='font-semibold text-xl mx-4 my-3'>Lend a Book</h1>
            <div className='bg-white mx-4 my-3 py-5 px-8 pb-12 rounded-md '>
                <div className='border-b-2 pb-1'>
                    <h2 className='font-semibold text-xl'>User Information</h2>
                </div>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Lender Name <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input onChange={handleinput} value={inputs.Lender_name} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Lender_name" id="User_Name" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Email <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input onChange={handleinput} value={inputs.Email} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Email" id="Email" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Phone Number <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input onChange={handleinput} value={inputs.Phone} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Phone" id="Phone" />
                        </div>
                    </div>
                </div>
                <div className='border-b-2 pb-1 mt-8'>
                    <h2 className='font-semibold text-xl'>Book Information</h2>
                </div>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Book Title <Asterisk size={13} color='red' />
                        </div>
                        <ComboBox value={Booktitle} onChange={setBooktitle} options={bookinfo.Book_Title ? bookinfo.Book_Title : []} />
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Genre/Category <Asterisk size={13} color='red' />
                        </div>
                        <ComboBox value={BookCategory} onChange={setBookCategory} options={bookinfo.Category ? bookinfo.Category : []} />
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Author <Asterisk size={13} color='red' />
                        </div>
                        <ComboBox value={Author} onChange={setAuthor} options={bookinfo.Author ? bookinfo.Author : []} />
                    </div>
                </div>
                <div className='border-b-2 pb-1 mt-8'>
                    <h2 className='font-semibold text-xl'>Lending Details</h2>
                </div>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col  items-center'>
                        <DatePicker label="Lending Date"
                            date={LendingDate} onChange={setLendingDate} disabled={{ after: new Date(DueDate) - 1 }} />
                    </div>
                    <div className='flex flex-col gap-2 items-start'>
                        <DatePicker label={
                            <>
                                Due Date <Asterisk size={13} color="red" /></>} date={DueDate} onChange={setDueDate} disabled={{ before: LendingDate.length === 0 ? new Date() : new Date(LendingDate) }} />

                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Copies Lent <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input onChange={handleinput} value={inputs.Copies} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Copies" id="Copies" />
                        </div>
                    </div>
                </div>
                <div className='border-b-2 pb-1 mt-8'>
                    <h2 className='font-semibold text-xl'>Additional Information</h2>
                </div>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Per Day Fine <Asterisk size={13} color='red' />
                        </div>
                        <div>
                            <input onChange={handleinput} value={inputs.Fine} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Fine" id="Fine" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            User Role
                        </div>
                        <div>
                            <ComboBox value={role} onChange={setRole} options={['Admin', 'Standard User']} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center gap-3 my-4'>
                <Link href="/admin/books" prefetch={true} className='bg-gray-300 px-4 py-2 font-[600] rounded-md  cursor-pointer scale-95 hover:scale-100 transition-transform'>Cancel</Link>
                <button disabled={disabledbtn} className='bg-[#6841c4] text-white px-4 py-2  rounded-md  cursor-pointer scale-95 hover:scale-100 transition-transform disabled:bg-gray-300 disabled:cursor-auto disabled:pointer-events-none'>Lend a book</button>
            </div>
        </>
    )
}

export default Lend