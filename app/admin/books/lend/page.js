"use client"
import React from 'react'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { useState, useEffect } from 'react'
import ComboBox from '../../components/select'
import { DatePicker } from '../../components/datepicker'
import { Asterisk, Trash, CircleAlert } from 'lucide-react'
import Link from 'next/link'
import { validate } from 'react-email-validator'
import { set } from 'date-fns'
const Lend = () => {
    const [bookinfo, setbookinfo] = useState({
        Book_Title: "",
        Category: "",
        Author: "",
        fullresponse: ""
    })
    const [Booktitle, setBooktitle] = useState("")
    const [BookCategory, setBookCategory] = useState("")
    const [Author, setAuthor] = useState("")
    const [LendingDate, setLendingDate] = useState(new Date)
    const [DueDate, setDueDate] = useState("")
    const [role, setRole] = useState("Standard-User")
    const [disabledbtn, setdisabledbtn] = useState(true)
    const [inputs, setInputs] = useState({
        Lender_name: "",
        Email: "",
        Book_Title: "",
        Catogery: "",
        Author: "",
        Lending_Date: "",
        Due_Date: "",
        Copies: "",
        Fine: "",
        Role: ""
    })
    const [issubmitting, setissubmitting] = useState(false)
    useEffect(() => {
        (async function fetchTitles() {
            const data = await fetch("/api/books/col", {
                method: "POST",
                credentials: "include",

                headers: {
                    "Content-Type": "application/json",
                     
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
                    Author: filtered_author.map(item => item.Author),
                    fullresponse: result
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
    const handleSubmit = async (e) => {
        if (!validate(inputs.Email)) {
            toast.custom((t) => (
                <div className={`bg-red-700 text-white p-4 rounded-md shadow-lg flex items-center gap-3
                ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
                    <CircleAlert size={20} />
                    <p className='text-sm'>Please enter a valid email address.</p>
                </div>
            ));
            return
        }
        setissubmitting(true)
        try {
            const Due = new Date(DueDate).toLocaleDateString("en-CA")
            const data = await fetch("/api/lenders/insert", {
                method: "POST",
                credentials: "include",

                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                     
                },
                body: JSON.stringify({
                    Lendername: inputs.Lender_name,
                    Email: inputs.Email,
                    BookTitle: inputs.Book_Title,
                    Category: inputs.Catogery,
                    Author: inputs.Author,
                    IssuedDate: LendingDate.toLocaleDateString("en-CA"),
                    DueDate: Due,
                    CopiesLent: Number(inputs.Copies),
                    Fine: Number(inputs.Fine),
                    Role: inputs.Role,

                })
            })
            if (!data.ok) {
                const errorData = await data.json();
                if (errorData.error) {
                    toast.error(errorData.error)

                }
                setissubmitting(false)
                return
            }
            const response = await data.json()
            toast(response.message)
            setissubmitting(false)
            await fetch("/api/notifications/add", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                     
                },
                credentials: "include",
                body: JSON.stringify({
                    Message: ` New Book wsas Lended to ${inputs.Lender_name} `
                })
            })
            setInputs({
                Lender_name: "",
                Email: "",
                Copies: "",
                Fine: "",
                Role: "Standard-User"
            })
            setBooktitle("")
            setBookCategory("")
            setAuthor("")
            setLendingDate(new Date)
            setDueDate("")

        }
        catch (e) {
            toast("Unable to lend book")
            setissubmitting(false)
        }
    }
    const handlebookchange = (e) => {
        setBooktitle(e)
        setbookinfo({
            ...bookinfo,
            Category: bookinfo.fullresponse.filter(item => item.Book_Title === e).map(item => item.Category),
            Author: bookinfo.fullresponse.filter(item => item.Book_Title === e).map(item => item.Author),
        })
        setBookCategory(bookinfo.fullresponse.filter(item => item.Book_Title === e).map(item => item.Category)[0])
        setAuthor(bookinfo.fullresponse.filter(item => item.Book_Title === e).map(item => item.Author)[0])
    }
    const handlecategorychange = (e) => {
        setBookCategory(e)
        setbookinfo({
            ...bookinfo,
            Author: bookinfo.fullresponse.filter(item => item.Category === e).map(item => item.Author),
            Book_Title: bookinfo.fullresponse.filter(item => item.Category === e).map(item => item.Book_Title),
        })
        setBooktitle(bookinfo.fullresponse.filter(item => item.Category === e).map(item => item.Book_Title)[0])
        setAuthor(bookinfo.fullresponse.filter(item => item.Category === e).map(item => item.Author)[0])
    }
    const handleauthorchange = (e) => {
        setAuthor(e)
        setbookinfo({
            ...bookinfo,
            Book_Title: bookinfo.fullresponse.filter(item => item.Author === e).map(item => item.Book_Title),
            Category: bookinfo.fullresponse.filter(item => item.Author === e).map(item => item.Category),
        })
        setBooktitle(bookinfo.fullresponse.filter(item => item.Author === e).map(item => item.Book_Title)[0])
        setBookCategory(bookinfo.fullresponse.filter(item => item.Author === e).map(item => item.Category)[0])
    }
    const reset = () => {
        setbookinfo({
            ...bookinfo,
            Book_Title: bookinfo.fullresponse.filter(
                (item, index, self) =>
                    self.findIndex(obj => obj.Book_Title === item.Book_Title) === index
            ).map(item => item.Book_Title),
            Category: bookinfo.fullresponse.filter(
                (item, index, self) =>
                    self.findIndex(obj => obj.Category === item.Category) === index

            ).map(item => item.Category),
            Author: bookinfo.fullresponse.filter(
                (item, index, self) =>
                    self.findIndex(obj => obj.Author === item.Author) === index
            ).map(item => item.Author),
        })
    }
    return (
        <>
            <Toaster />
            <h1 className='font-semibold text-xl mx-0 md:mx-4 my-3'>Lend a Book</h1>
            <div className='bg-white mx-0 md:mx-4 my-3 py-5 px-3 md:px-8 pb-12 rounded-md dark:bg-[#1b2536] '>
                <div className='border-b-2 pb-1'>
                    <h2 className='font-semibold text-xl'>User Information</h2>
                </div>
                <div className='my-3 md:flex md:items-center md:justify-between grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4'>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Lender Name <Asterisk size={13} color='red' />
                        </div>
                        <div className='w-full '>
                            <input onChange={handleinput} value={inputs.Lender_name} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full ' type="text" name="Lender_name" id="User_Name" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Email <Asterisk size={13} color='red' />
                        </div>
                        <div className='w-full '>
                            <input onChange={handleinput} value={inputs.Email} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full ' type="text" name="Email" id="Email" />
                        </div>
                    </div>
                   
                </div>
                <div className='border-b-2 pb-1 mt-8'>
                    <h2 className='font-semibold text-xl'>Book Information</h2>
                </div>
                <div className='my-3 md:flex md:items-center md:justify-between grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4'>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Book Title <Asterisk size={13} color='red' />
                        </div>
                        <div className='flex items-center gap-2'>

                            <ComboBox value={Booktitle} onChange={handlebookchange} options={bookinfo.Book_Title ? bookinfo.Book_Title : []} />
                            {
                                Booktitle.length > 0 &&
                                <Trash onClick={() => { setBooktitle(''); reset() }} className='cursor-pointer' color='#ff0000' size={20} />
                            }

                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Genre/Category <Asterisk size={13} color='red' />
                        </div>
                        <div className='flex items-center gap-2'>

                            <ComboBox value={BookCategory} onChange={handlecategorychange} options={bookinfo.Category ? bookinfo.Category : []} />
                            {
                                BookCategory.length > 0 &&
                                <Trash onClick={() => { setBookCategory(''); reset() }} className='cursor-pointer' color='#ff0000' size={20} />
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Author <Asterisk size={13} color='red' />
                        </div>
                        <div className='flex items-center gap-2'>

                            <ComboBox value={Author} onChange={handleauthorchange} options={bookinfo.Author ? bookinfo.Author : []} />
                            {
                                Author.length > 0 &&
                                <Trash onClick={() => { setAuthor(''); reset() }} className='cursor-pointer' color='#ff0000' size={20} />
                            }
                        </div>
                    </div>
                </div>
                <div className='border-b-2 pb-1 mt-8'>
                    <h2 className='font-semibold text-xl'>Lending Details</h2>
                </div>
                <div className='my-3 md:flex md:items-center md:justify-between grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4'>
                    <div className='flex flex-col  items-start'>
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
                        <div className='w-full '>
                            <input min={1} onChange={handleinput} value={inputs.Copies} className='border px-2 py-1 rounded-sm placeholder:text-sm text-base w-full' type="number" name="Copies" id="Copies" />
                        </div>
                    </div>
                </div>
                <div className='border-b-2 pb-1 mt-8'>
                    <h2 className='font-semibold text-xl'>Additional Information</h2>
                </div>
                <div className='my-3 md:flex md:items-center md:justify-between grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4'>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            Per Day Fine <Asterisk size={13} color='red' />
                        </div>
                        <div className='w-full'>
                            <input min={0} onChange={handleinput} value={inputs.Fine} className='border px-2 py-1 rounded-sm w-full  placeholder:text-sm text-base' type="number" name="Fine" id="Fine" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-center gap-1 text-sm'>
                            User Role
                        </div>
                        <div>
                            <ComboBox value={role} onChange={setRole} options={['Admin', 'Standard-User']} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center gap-3 my-4'>
                <Link href="/admin/books" prefetch={true} className='bg-gray-300 px-4 py-2 font-[600] rounded-md  cursor-pointer scale-95 hover:scale-100 transition-transform dark:bg-[#16222e]'>Cancel</Link>
                {
                    !issubmitting &&
                    <button onClick={handleSubmit} disabled={disabledbtn} className='bg-[#6841c4] text-white px-4 py-2  rounded-md  cursor-pointer scale-95 hover:scale-100 transition-transform disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-auto disabled:pointer-events-none'>Lend a book</button>
                }
                {
                    issubmitting &&
                    <button disabled className='bg-[#6841c4] text-white px-4 py-2  rounded-md  cursor-pointer scale-95 hover:scale-100 transition-transform disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-auto disabled:pointer-events-none'>Lending...</button>
                }
            </div>
        </>
    )
}

export default Lend