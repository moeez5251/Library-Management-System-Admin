"use client"
import React from 'react'
import { useEffect, useState } from 'react'
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
const Edit = ({ params }) => {
  const [bookid, setbookid] = useState("")
  const [catogery, setcatogery] = useState("")
  const [language, setlanguage] = useState("")
  const [stock, setstock] = useState("Available")
  const [disabledbtn, setdisabledbtn] = useState(true)
  const [book, setbook] = useState(true)
  const [edit, setedit] = useState(false)
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

      const data = await fetch("https://library-management-system-hvhv.onrender.com/api/books/update", {
        method: "PUT",
        credentials: "include",

        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          Book_ID: bookid,
          Book_Title: inputs.Book_Title,
          Author: inputs.Author,
          Category: inputs.Category,
          Total_Copies: Number(inputs.Copies),
          Language: inputs.Language,
          Price: Number(inputs.Price),
          Status: inputs.Status,
          Pages: Number(inputs.Pages)
        })
      }
      )
      const response = await data.json()
      toast(response.message)
      setedit(false)
      setbook(true)
    }
    catch {
      toast("Unable to add book")
      setbook(false)
    }
  }

  useEffect(() => {
    (async function name() {
      const { slug } = await params
      setbookid(slug)

    })()


    return () => {

    }
  }, [])
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
  useEffect(() => {
    (async function fetchdata() {
      if (bookid) {

        const data = await fetch("https://library-management-system-hvhv.onrender.com/api/books/getbyID", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        credentials: "include",

          body: JSON.stringify({
            ID: bookid
          })
        })
        const response = await data.json()
        setInputs({
          Book_Title: response[0].Book_Title,
          Author: response[0].Author,
          Category: catogery,
          Copies: response[0].Total_Copies.toString(),
          Language: language,
          Price: response[0].Price.toString(),
          Status: stock,
          Pages: response[0].Pages.toString()
        })
        setlanguage(response[0].Language)
        setcatogery(response[0].Category)
        setstock(response[0].Status)
      }
    })()

    return () => {

    }
  }, [bookid])

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
              <BreadcrumbPage className="font-semibold text-[#113cb0] text-base">{inputs.Book_Title.length > 0 ? inputs.Book_Title : bookid}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='bg-white mx-4 my-3 py-3 px-8 pb-12 rounded-md flex flex-col gap-2'>
        <div className='flex items-center justify-between border-b-2 pb-1.5'>
          <h2 className='font-semibold '>Book information</h2>
          {
            !edit &&
            <p onClick={() => setedit(true)} className='text-sm text-[#6841c4] cursor-pointer hover:underline'>Edit Book</p>
          }
        </div>

        <div className='my-3 flex items-center justify-between'>
          <div className='flex flex-col gap-3 items-start'>
            <div className='font-semibold text-sm flex items-start gap-1'>
              Book id <Asterisk size={13} color='red' />
            </div>
            <div>
              <div className='w-30 text-xs text-wrap lin'>{bookid}</div>
            </div>
          </div>
          <div className='flex flex-col gap-3 items-start'>
            <div className='font-semibold text-sm flex items-start gap-1'>
              Book Title <Asterisk size={13} color='red' />
            </div>
            <div>
              <input disabled={!edit} value={inputs.Book_Title} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-base text-base disabled:bg-none disabled:border-none disabled:py-0 disabled:px-0 disabled:text-sm' type="text" name="Book_Title" id="Book_Title" placeholder='Loading...' />
            </div>
          </div>
          <div className='flex flex-col gap-3 items-start'>
            <div className='font-semibold text-sm flex items-start gap-1'>
              Author(s) <Asterisk size={13} color='red' />
            </div>
            <div>
              <input disabled={!edit} value={inputs.Author} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-base text-base disabled:bg-none disabled:border-none disabled:py-0 disabled:px-0 disabled:text-sm' type="text" name="Author" id="Author" placeholder='Loading...' />
            </div>
          </div>
          <div className='flex flex-col gap-3 items-start w-fit'>
            <div className='font-semibold text-sm flex items-start gap-1'>
              Genre/category <Asterisk size={13} color='red' />
            </div>
            <div>
              <CategorySelect disabled={!edit} value={catogery} onChange={setcatogery} />
            </div>
          </div>
        </div>
        <div className='my-3 flex items-center justify-between'>
          <div className='flex flex-col gap-3 items-start'>
            <div className='font-semibold text-sm flex items-start gap-1'>
              Total Copies <Asterisk size={13} color='red' />
            </div>
            <div>
              <input disabled={!edit} value={inputs.Copies} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-base  text-base disabled:bg-none disabled:border-none disabled:py-0 disabled:px-0 disabled:text-sm ' type="number" name="Copies" id="copies" placeholder='Loading...' />

            </div>
          </div>
          <div className='flex flex-col gap-3 items-start'>
            <div className='font-semibold text-sm flex items-start gap-1'>
              Language <Asterisk size={13} color='red' />
            </div>
            <div>
              <Language disabled={!edit} value={language} onChange={setlanguage} />

            </div>
          </div>
          <div className='flex flex-col gap-3 items-start w-fit'>
            <div className='font-semibold text-sm flex items-start gap-1'>
              Price <span className='text-green-600'>( PKR )</span> <Asterisk size={13} color='red' />
            </div>
            <div>
              <input disabled={!edit} value={inputs.Price} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-base  text-base disabled:bg-none disabled:border-none disabled:py-0 disabled:px-0 disabled:text-sm ' type="number" name="Price" id="price" placeholder='Loading...' />

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
                  <RadioGroupItem value="Available" id="Available" disabled={!edit} />
                  <Label htmlFor="Available">Available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Reserved" id="Reserved" disabled={!edit} />
                  <Label htmlFor="Reserved">Reserved</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Out of stock" id="out" disabled={!edit} />
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
              <input disabled={!edit} value={inputs.Pages} onChange={oninputchange} className='border px-2 py-1 rounded-sm placeholder:text-base  text-base disabled:bg-none disabled:border-none disabled:py-0 disabled:px-0 disabled:text-sm ' type="number" name="Pages" id="pages" placeholder='Loading...' />

            </div>
          </div>

        </div>

      </div>
      {!edit &&
        <div className='w-full text-center my-4'>

        <Link href={'/admin/managebooks'} prefetch={true} className='bg-gray-300 px-4 py-2  rounded-sm cursor-pointer '>Cancel</Link>
      </div>}
      {
        edit &&
        <div className='flex items-center justify-center gap-3'>
          <button onClick={() => setedit(false)} className='bg-gray-300 px-4 py-2 rounded-sm cursor-pointer '>Cancel</button>
          {
            book &&
            <button onClick={addbook} disabled={disabledbtn} className='bg-[#6841c4] text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal disabled:bg-gray-300 disabled:pointer-events-none disabled:cursor-auto'>Update Book</button>

          }

          {
            !book &&
            <button onClick={addbook} disabled={true} className='bg-[#6841c4] text-white px-4 py-2 rounded-sm cursor-pointer transition-transform scale-95 hover:scale-100 font-normal disabled:bg-gray-300 disabled:pointer-events-none disabled:cursor-auto'>Updating...</button>

          }

        </div>
      }
    </>
  )
}

export default Edit