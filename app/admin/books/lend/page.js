"use client"
import React from 'react'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { useState, useEffect } from 'react'
import ComboBox from '../../components/select'
import { DatePicker } from '../../components/datepicker'
const Lend = () => {
    const [bookinfo, setbookinfo] = useState({
        Book_Title: "",
        Category: "",
        Author: "",
    })
    const [Booktitle, setBooktitle] = useState("")
    const [BookCategory, setBookCategory] = useState("")
    const [Author, setAuthor] = useState("")
    const [LendingDate, setLendingDate] = useState("")
    const [DueDate, setDueDate] = useState("")
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
        console.log(Booktitle, BookCategory, Author);

        return () => {

        }
    }, [Booktitle, BookCategory, Author])

    return (
        <>
            <Toaster />
            <div className='bg-white mx-4 my-3 py-5 px-8 pb-12 rounded-md '>
                <div className='border-b-2 pb-1'>
                    <h2 className='font-semibold text-xl'>User Information</h2>
                </div>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-start gap-1 text-sm'>
                            Lender Name
                        </div>
                        <div>
                            <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="User_Name" id="User_Name" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-start gap-1 text-sm'>
                            Email
                        </div>
                        <div>
                            <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Email" id="Email" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-start gap-1 text-sm'>
                            Phone Number
                        </div>
                        <div>
                            <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Phone" id="Phone" />
                        </div>
                    </div>
                </div>
                <div className='border-b-2 pb-1 mt-8'>
                    <h2 className='font-semibold text-xl'>Book Information</h2>
                </div>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-start gap-1 text-sm'>
                            Book Title
                        </div>
                        <ComboBox value={Booktitle} onChange={setBooktitle} options={bookinfo.Book_Title ? bookinfo.Book_Title : []} />
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-start gap-1 text-sm'>
                            Genre/Category
                        </div>
                        <ComboBox value={BookCategory} onChange={setBookCategory} options={bookinfo.Category ? bookinfo.Category : []} />
                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-start gap-1 text-sm'>
                            Author
                        </div>
                        <ComboBox value={Author} onChange={setAuthor} options={bookinfo.Author ? bookinfo.Author : []} />
                    </div>
                </div>
                <div className='border-b-2 pb-1 mt-8'>
                    <h2 className='font-semibold text-xl'>Lending Details</h2>
                </div>
                <div className='my-3 flex items-center justify-between'>
                    <div className='flex flex-col gap-2 items-start'>
                        <DatePicker label="Lending Date" date={LendingDate} onChange={setLendingDate} disabled={{ after: new Date(DueDate) - 1 }} />
                    </div>
                    <div className='flex flex-col gap-2 items-start'>
                        <DatePicker label="Due Date" date={DueDate} onChange={setDueDate} disabled={{ before: LendingDate.length === 0 ? new Date() : new Date(LendingDate) }} />

                    </div>
                    <div className='flex flex-col gap-2 items-start'>

                        <div className='font-semibold  flex items-start gap-1 text-sm'>
                            Copies Lent
                        </div>
                        <div>
                            <input className='border px-2 py-1 rounded-sm placeholder:text-sm text-base' type="text" name="Copies" id="Copies" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lend