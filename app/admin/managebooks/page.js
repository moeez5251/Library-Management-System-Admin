"use client"

import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import DataTable from '@/table/mytable';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, PlusIcon, Trash2 } from 'lucide-react';
const columnHelper = createColumnHelper();

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  columnHelper.accessor('Book_ID', {
    header: 'Book ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('Book_Title', {
    header: 'Book Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('Author', {
    header: 'Author',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('Catogery', {
    header: 'Catogery',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('Language', {
    header: 'Language',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('Total_Copies', {
    header: 'Total Copies',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue(),
  }),
];

const data = [
  { Book_ID: '1', Book_Title: 'Abc', Author: "bAli",Catogery:"Fun",Language:"Urdu",Total_Copies:10,status:"available" },
  { Book_ID: '11', Book_Title: 'Abc', Author: "Ali",Catogery:"Fun",Language:"Urdu",Total_Copies:10,status:"available" },
  { Book_ID: '11', Book_Title: 'Abc', Author: "Ali",Catogery:"Fun",Language:"Urdu",Total_Copies:10,status:"available" },
  { Book_ID: '11', Book_Title: 'Abc', Author: "Ali",Catogery:"Fun",Language:"Urdu",Total_Copies:10,status:"available" },
];

export default function Home() {
  const [input, setinput] = useState("")
  return (
    <>
      <h1 className='font-semibold text-xl mx-3 my-3'>Manage Books</h1>
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
          <input className="w-full h-full px-2 py-[0.7rem] font-normal bg-transparent text-sm border-none focus:outline-none" placeholder="Search Books" value={input} onChange={(e) => { setinput(e.target.value); console.log(input, input.length) }} type="text" />
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
          <button className='bg-[#6841c4] text-white font-semibold px-3 py-2 rounded-lg cursor-pointer flex items-center gap-1 hover:bg-[#7a4ed0] transition-colors duration-200 text-base'>
            <PlusIcon className='inline ' />
            Add Book</button>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#6841c4] text-white font-semibold px-3 py-2 rounded-lg cursor-pointer flex items-center gap-1 hover:bg-[#7a4ed0] transition-colors duration-200 text-base"> <ChevronDown className='inline' /> Actions</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex items-center"><PlusIcon className='inline' /> Add Book</DropdownMenuItem>
              <DropdownMenuItem className="flex items-center"> <Trash2 className='inline' /> Delete Book</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='bg-white h-[70%] p-4 mx-3 rounded-lg shadow-md'>

        <DataTable data={data} columns={columns} externalFilter="" pageSize={4} />
      </div>
    </>
  );
}
