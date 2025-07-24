"use client"

import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import DataTable from '@/table/mytable';
import { useState, useEffect, useMemo } from 'react';

import { PlusIcon, UserCog } from 'lucide-react';
import ComboBox from '../components/combobox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
export default function Lenders() {
  const columnHelper = createColumnHelper();
  const [checked, setchecked] = useState(
    {
      selected: [],
      isempty: true
    })
  const [input, setinput] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState('5');
  const [loading, setLoading] = useState(true)
  const [data, setdata] = useState([])
  const [trigger, settrigger] = useState(false)
  const [dialogdata, setdialogdata] = useState("")
  const router = useRouter();
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
            if (value) {
              setchecked({
                ...checked,
                selected: table.getCoreRowModel().rows.map(row => row.original.User_id),
              })
            }
            else {
              setchecked({
                ...checked,
                selected: [],
              })
            }
          }
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
            if (!row.getIsSelected()) {
              setchecked({
                ...checked,
                selected: [...checked.selected, row.original.User_id],

              })

            } else {
              setchecked({
                ...checked,
                selected: checked.selected.filter(id => id !== row.original.User_id),

              })
            }
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    columnHelper.accessor('Borrower_ID', {
      header: 'B_ID',
      cell: ({ row }) => {
        const id = row.getValue('Borrower_ID');
        return <span className='text-sm'>{id}</span>;
      },
    }),
    columnHelper.accessor('user_id', {
      header: 'User ID',
      cell: ({ row }) => {
        const id = row.getValue('user_id');
        return <span className='text-sm'>{id}</span>;
      },
    }),
    columnHelper.accessor('Name', {
      header: 'User Name',
      cell: ({ row }) => {
        const status = row.getValue('Name');
        const id = row.getValue('Borrower_ID');

        return <div onClick={handleclick} data-bid={id} className='text-[#235fff] font-semibold hover:underline cursor-pointer'>{status}</div>
      },
    }),
    columnHelper.accessor('BookTitle', {
      header: 'Book Title',
      cell: info => info.getValue(),

    }),
    columnHelper.accessor('Author', {
      header: 'Author',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('Category', {
      header: 'Category',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('CopiesLent', {
      header: 'Copies',
      cell: ({ row }) => {
        const id = row.getValue('CopiesLent');
        return <span className='w-full text-center block'>{id}</span>;
      },
    }),
    columnHelper.accessor('IssuedDate', {
      header: 'Issued Date',
      cell: ({ row }) => {
        const isoString = row.getValue('IssuedDate');
        const date = new Date(isoString);
        const formattedDate = date.toLocaleDateString()
        return (
          <span className='text-sm' >
            {
              formattedDate
            }
          </span>
        );
      },
    }),
    columnHelper.accessor('DueDate', {
      header: 'Due Date',
      cell: ({ row }) => {
        const isoString = row.getValue('DueDate');
        const date = new Date(isoString);
        const formattedDate = date.toLocaleDateString()
        return (
          <span className='text-sm'>
            {
              formattedDate
            }
          </span>
        );
      },
    }),

  ];

  const handleclick = async (e) => {
    settrigger(true)
    try {
      const data = await fetch("https://library-management-system-hvhv.onrender.com/api/lenders/getlenderbyid", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        credentials: "include",

        body: JSON.stringify({
          ID: e.target.dataset.bid,

        })
      })
      if (!data.ok) {
        toast.error("Unable to fetch data")
        settrigger(false)
        return
      }
      const response = await data.json()
      setdialogdata(response)
    } catch (error) {
      toast.error("An error occurred while fetching lender data.");
      settrigger(false);
    }
  }
  async function fetch_data() {
    const data = await fetch("https://library-management-system-hvhv.onrender.com/api/lenders/all", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      credentials: "include",
      body: JSON.stringify({ API: process.env.NEXT_PUBLIC_XLMS_API })
    })
    if (!data.ok) {
      toast.error("Unable to fetch data")
      setLoading(false)
      return
    }
    const response = await data.json()
    setdata(response)
    setLoading(false)
  }
  useEffect(() => {
    fetch_data()
    return () => {

    }
  }, [])
  useEffect(() => {
    router.prefetch("/admin/books/add");

    return () => {

    }
  }, [router])
  useEffect(() => {
    checked.selected.length === 0 ? setchecked({ ...checked, isempty: true }) : setchecked({ ...checked, isempty: false })
    return () => {

    }
  }, [checked.selected])



  return (
    <>
      <Toaster />

      <h1 className='font-semibold text-xl mx-3 my-3'>Manage Lenders</h1>
      <div className='flex justify-between items-center mx-3 my-3 mr-7'>
        <div className="relative flex items-center w-[200px] h-[40px] px-2 bg-white rounded-xl transition-all duration-200 focus-within:rounded focus-within:before:scale-x-100 before:content-[''] before:absolute before:bg-blue-600 before:transform before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-0 before:rounded before:transition-transform before:duration-300">
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              height={16}
              fill="none"
              className=" text-gray-400"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.333}
                d="M7.667 12.667A5.333 5.333 0 1 0 7.667 2a5.333 5.333 0 0 0 0 10.667zM14.334 14l-2.9-2.9"
              />
            </svg>
          </button>
          <input className="w-full h-full px-2 py-[0.7rem] font-normal bg-transparent text-sm border-none focus:outline-none" placeholder="Search a lender" value={input} onChange={(e) => { setinput(e.target.value); }} type="text" />
          <button onClick={() => { setinput("") }} className={`cursor-pointer ${input.length === 0 ? "opacity-0" : "block"} transition-opacity`} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-[15px] h-[15px] text-gray-400"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className='flex items-center gap-5'>
          <Link href="/admin/books/lend" prefetch={true} className='bg-[#6841c4] text-white font-semibold px-3 py-2 rounded-lg cursor-pointer flex items-center gap-1 hover:bg-[#7a4ed0] transition-colors duration-200 text-base'>
            <PlusIcon size={20} className='inline ' />
            Lend a book</Link>

        </div>
      </div>
      <div className='bg-white  transition-all py-2 mx-3 rounded-lg shadow-md overflow-auto'>
        <DataTable data={data} columns={columns} externalFilter={input} pageSize={rowsPerPage} loading={loading} />
      </div>
      <div className='mt-3 mx-5 flex items-center justify-between'>
        <div className='text-black text-base font-semibold '>
          Total Users : {data.length}
        </div>

        <ComboBox value={rowsPerPage} onChange={setRowsPerPage} />
      </div>
      <Dialog open={trigger} onOpenChange={settrigger}>
        <DialogContent className="w-full lg:w-1/2 rounded-3xl shadow-lg " >
          <DialogTitle></DialogTitle>
          <DialogDescription className="flex flex-col justify-center gap-3 my-1">
            <span className=" bg-white rounded-lg  overflow-hidden text-left flex flex-col gap-4">
              <span className="p-1 bg-white flex flex-col gap-4  ">
                <span className="flex justify-center items-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                  <UserCog size={25} className="text-green-600 mx-auto" />
                </span>
                <span className="w-fit mx-auto bg-cyan-50 dark:bg-blue-900/30 text-green-600 dark:text-blue-300 text-base font-semibold px-4 py-2 rounded-md shadow-sm">
                  Lender Details
                </span>

                <span className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <span className="flex flex-col bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-blue-600 dark:text-blue-300 font-medium ${dialogdata.Borrower_ID ? "" : "animate-pulse"} `}>Lender ID:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.Borrower_ID ? "" : "animate-pulse"}`}>{dialogdata.Borrower_ID ? dialogdata.Borrower_ID : "Loading"}</span>
                  </span>
                  <span className="flex flex-col bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-blue-600 dark:text-blue-300 font-medium ${dialogdata.user_id ? "" : "animate-pulse"}`}>User ID:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.user_id ? "" : "animate-pulse"}`}>{dialogdata.user_id ? dialogdata.user_id : "Loading"}</span>
                  </span>

                  <span className="flex flex-col bg-green-50 dark:bg-green-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-green-600 dark:text-green-300 font-medium ${dialogdata.Name ? "" : "animate-pulse"} `}>Lender Name:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.Name ? "" : "animate-pulse"}`}>{dialogdata.Name ? dialogdata.Name : "Loading"}</span>
                  </span>

                  <span className="flex flex-col bg-purple-50 dark:bg-purple-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-purple-600 dark:text-purple-300 font-medium ${dialogdata.BookTitle ? "" : "animate-pulse"}}`}>Book Name:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.BookTitle ? "" : "animate-pulse"}`}>{dialogdata.BookTitle ? dialogdata.BookTitle : "Loading"}</span>
                  </span>

                  <span className="flex flex-col bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-yellow-600 dark:text-yellow-300 font-medium ${dialogdata.Author ? "" : "animate-pulse"} `}>Book Author:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.Author ? "" : "animate-pulse"}`}>{dialogdata.Author ? dialogdata.Author : "Loading"}</span>
                  </span>

                  <span className="flex flex-col bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-pink-600 dark:text-pink-300 font-medium ${dialogdata.Category ? "" : "animate-pulse"}`}>Book Category:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.Category ? "" : "animate-pulse"}`}>{dialogdata.Category ? dialogdata.Category : "Loading"}</span>
                  </span>


                  <span className="flex flex-col bg-red-50 dark:bg-red-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-red-600 dark:text-red-300 font-medium ${dialogdata.CopiesLent ? "" : "animate-pulse"}`}>Copies:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.CopiesLent ? "" : "animate-pulse"}`}>{dialogdata.CopiesLent ? dialogdata.CopiesLent : "Loading"}</span>
                  </span>

                  <span className="flex flex-col bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-indigo-600 dark:text-indigo-300 font-medium ${dialogdata.IssuedDate ? "" : "animate-pulse"}`}>Issue Date:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.IssuedDate ? "" : "animate-pulse"}`}>{dialogdata.IssuedDate ? dialogdata.IssuedDate.split("T")[0] : "Loading"}</span>
                  </span>

                  <span className="flex flex-col bg-orange-50 dark:bg-orange-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-orange-600 dark:text-orange-300 font-medium ${dialogdata.DueDate ? "" : "animate-pulse"}`}>Due Date:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.DueDate ? "" : "animate-pulse"}`}>{dialogdata.DueDate ? dialogdata.DueDate.split("T")[0] : "Loading"}</span>
                  </span>

                  <span className="flex flex-col bg-teal-50 dark:bg-teal-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-teal-600 dark:text-teal-300 font-medium ${dialogdata.Price ? "" : "animate-pulse"}`}>Price:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.Price ? "" : "animate-pulse"}`}>{dialogdata.Price ? `Rs. ${dialogdata.Price}` : "Loading"}</span>
                  </span>

                  <span className="flex flex-col bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-indigo-600 dark:text-indigo-300 font-medium ${dialogdata.PhoneNumber ? "" : "animate-pulse"}`}>Phone Number:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold ${dialogdata.PhoneNumber ? "" : "animate-pulse"}`}>{dialogdata.PhoneNumber ? dialogdata.PhoneNumber : "Loading"}</span>
                  </span>
                  <span className="flex flex-col bg-purple-50 dark:bg-purple-900/30 p-3 rounded-md shadow-sm">
                    <span className={`text-purple-600 dark:text-purple-300 font-medium ${dialogdata.BookTitle ? "" : "animate-pulse"}}`}>Email:</span>
                    <span className={`text-gray-900 dark:text-white font-semibold break-words whitespace-normal w-full ${dialogdata.Email ? "" : "animate-pulse"}`}>{dialogdata.Email ? dialogdata.Email : "Loading"}</span>
                  </span>
                </span>


              </span>
            </span>



          </DialogDescription>
          <button onClick={() => { setdialogdata(""); settrigger(false) }} className='absolute top-3 cursor-pointer right-3 bg-gray-300  p-1 rounded-2xl z-40 '>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              height={15}
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
        </DialogContent>
      </Dialog>
    </>
  );
}
