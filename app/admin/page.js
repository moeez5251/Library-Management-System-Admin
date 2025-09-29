"use client"
import React, { useState } from 'react'
import { ChartTooltipIndicatorLine } from './components/chart'
import { ChartPieDonutText } from './components/piechart'
import { createSwapy } from 'swapy'
import { useEffect } from 'react'
import { ChartNoAxesCombined } from 'lucide-react'
import { useRouter } from 'next/navigation'
const AdminDashboard = () => {
    const router = useRouter()
    const [inputs, setInputs] = useState({
        Totalbooks: "",
        Totalusers: "",
        Totalborrowers: "",
        lendedbooks: "",
        availablebooks: "",
        overduebooks: ""
    })
    useEffect(() => {


        const container = document.querySelector('.swapy')
        const swapy = createSwapy(container, {
            animation: 'spring',
            swapMode: "hover"
        })
        return () => {

        }
    }, [])
    useEffect(() => {
        router.prefetch("/admin/managebooks")
        router.prefetch("/admin/members")
        router.prefetch("/admin/books")
        router.prefetch("/admin/managebooks/add")

        return () => {

        }
    }, [])
    useEffect(() => {
        (async () => {
            const data = await fetch("/api/other/getbookdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                },
                credentials: "include"
            })
            const res = await data.json()
            setInputs({
                Totalbooks: res.Totalbooks == 0 ? "0" : res.Totalbooks,
                Totalusers: res.Totalusers == 0 ? "0" : res.Totalusers,
                Totalborrowers: res.Totalborrowers == 0 ? "0" : res.Totalborrowers,
                lendedbooks: res.lendedbooks == 0 ? "0" : res.lendedbooks,
                availablebooks: res.availablebooks == 0 ? "0" : res.availablebooks,
                overduebooks: res.overduebooks == 0 ? "0" : res.overduebooks
            })
        })()

        return () => {

        }
    }, [])


    return (
        <div className='animate-page overflow-hidden'>
            <div className='flex items-center justify-between mx-1 md:mx-4 my-2'>
                <h1 className='font-semibold text-xs sm:text-base md:text-xl'>Welcome Admin</h1>
                <div className='flex items-center gap-0 sm:gap-2 '>
                    <div className='font-semibold text-xs sm:text-base md:text-lg text-nowrap'>Quick Actions :</div>
                    <button onClick={() => { router.push("/admin/managebooks/add") }} className='bg-[#6841c4] text-white px-1 sm:px-2 md:px-3 py-2  rounded-lg cursor-pointer transition-transform scale-90 hover:scale-100 font-normal text-xs sm:text-base'>Add New Book</button>
                </div>
            </div>
            <div className=' py-1.5 sm:py-3 rounded-xl bg-white w-full md:w-[95%] mx-auto overflow-x-auto dark:bg-[#1b2536]'>
                <div className='flex items-center gap-5 w-full  pl-3 pr-3 dark:bg-[#1b2536]'>

                    <div className='bg-[#fef8e8] min-w-[150px] md:min-w-[180px] w-full lg:w-[20%]  flex flex-col items-center h-full py-4  lg:py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-2 sm:gap-5 border-2 border-[#ede4bb] dark:bg-[#242f3e] dark:border-[#242f3e] '>
                        <div className='bg-[#fabf0f] w-fit px-3 py-2 rounded-md text-lg'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                className="injected-svg"
                                color="#fff"
                                data-src="https://cdn.hugeicons.com/icons/book-open-01-stroke-rounded.svg"
                            >
                                <path stroke="#fff" strokeLinecap="round" strokeWidth={1.5} d="M12 6v14" />
                                <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M5.98 3.285c3.342.637 5.333 1.967 6.02 2.731.687-.764 2.678-2.094 6.02-2.73 1.692-.323 2.538-.484 3.26.134.72.617.72 1.62.72 3.626v7.209c0 1.834 0 2.751-.463 3.324-.462.572-1.48.766-3.518 1.154-1.815.346-3.232.896-4.258 1.45-1.01.545-1.514.817-1.761.817-.247 0-.752-.272-1.76-.817-1.027-.553-2.444-1.104-4.26-1.45-2.036-.388-3.055-.582-3.517-1.154C2 17.006 2 16.089 2 14.255V7.046c0-2.006 0-3.009.72-3.626.722-.618 1.568-.457 3.26-.135Z"
                                />
                            </svg>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='font-semibold text-lg'>Total Books</div>
                            {
                                inputs.Totalbooks ?
                                    <div className='text-lg font-semibold'>{inputs.Totalbooks}</div>
                                    :
                                    <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                                        <div className="card__skeleton w-full h-full rounded-md"></div>
                                    </div>
                            }
                        </div>
                        <button onClick={() => { router.push("/admin/managebooks") }} className='bg-[#ffffff] text-gray-500  p-2 rounded-md cursor-pointer dark:bg-[#222c3d] dark:text-white dark:border-[#2a3547] dark:border-2'>View Details</button>
                    </div>
                    <div className='bg-[#ededfe] min-w-[150px] md:min-w-[180px]  w-full lg:w-[20%]  flex flex-col items-center py-4  lg:py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-2 sm:gap-5 border-2 border-[#dad7f6] dark:bg-[#242f3e] dark:border-[#242f3e] '>
                        <div className='bg-[#6259fe] w-fit px-3 py-2 rounded-md text-lg'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                className="injected-svg"
                                color="#fff"
                                data-src="https://cdn.hugeicons.com/icons/book-open-01-stroke-rounded.svg"
                            >
                                <path stroke="#fff" strokeLinecap="round" strokeWidth={1.5} d="M12 6v14" />
                                <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M5.98 3.285c3.342.637 5.333 1.967 6.02 2.731.687-.764 2.678-2.094 6.02-2.73 1.692-.323 2.538-.484 3.26.134.72.617.72 1.62.72 3.626v7.209c0 1.834 0 2.751-.463 3.324-.462.572-1.48.766-3.518 1.154-1.815.346-3.232.896-4.258 1.45-1.01.545-1.514.817-1.761.817-.247 0-.752-.272-1.76-.817-1.027-.553-2.444-1.104-4.26-1.45-2.036-.388-3.055-.582-3.517-1.154C2 17.006 2 16.089 2 14.255V7.046c0-2.006 0-3.009.72-3.626.722-.618 1.568-.457 3.26-.135Z"
                                />
                            </svg>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='font-semibold text-lg'>Lended Books</div>
                            {
                                inputs.Totalborrowers ?
                                    <div className='text-lg font-semibold'>{inputs.Totalborrowers}</div>
                                    :
                                    <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                                        <div className="card__skeleton w-full h-full rounded-md"></div>
                                    </div>
                            }
                        </div>
                        <button onClick={() => { router.push("/admin/books") }} className='bg-[#ffffff] text-gray-500 p-2 rounded-md cursor-pointer dark:bg-[#222c3d] dark:text-white dark:border-[#2a3547] dark:border-2'>View Details</button>
                    </div>
                    <div className='bg-[#e7f9f9] min-w-[150px] md:min-w-[180px]  w-full lg:w-[20%]  flex flex-col items-center py-4  lg:py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-2 sm:gap-5 border-2 border-[#c4e9e4] dark:bg-[#242f3e] dark:border-[#242f3e] '>
                        <div className='bg-[#11ccc7] w-fit px-3 py-2 rounded-md text-lg'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                className="injected-svg"
                                color="#fff"
                                data-src="https://cdn.hugeicons.com/icons/book-open-01-stroke-rounded.svg"
                            >
                                <path stroke="#fff" strokeLinecap="round" strokeWidth={1.5} d="M12 6v14" />
                                <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M5.98 3.285c3.342.637 5.333 1.967 6.02 2.731.687-.764 2.678-2.094 6.02-2.73 1.692-.323 2.538-.484 3.26.134.72.617.72 1.62.72 3.626v7.209c0 1.834 0 2.751-.463 3.324-.462.572-1.48.766-3.518 1.154-1.815.346-3.232.896-4.258 1.45-1.01.545-1.514.817-1.761.817-.247 0-.752-.272-1.76-.817-1.027-.553-2.444-1.104-4.26-1.45-2.036-.388-3.055-.582-3.517-1.154C2 17.006 2 16.089 2 14.255V7.046c0-2.006 0-3.009.72-3.626.722-.618 1.568-.457 3.26-.135Z"
                                />
                            </svg>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='font-semibold text-lg'>Available Books</div>
                            {
                                inputs.availablebooks ?
                                    <div className='text-lg font-semibold'>{inputs.availablebooks}</div>
                                    :
                                    <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                                        <div className="card__skeleton w-full h-full rounded-md"></div>
                                    </div>
                            }
                        </div>
                        <button onClick={() => { router.push("/admin/managebooks") }} className='bg-[#ffffff] text-gray-500 p-2 rounded-md cursor-pointer dark:bg-[#222c3d] dark:text-white dark:border-[#2a3547] dark:border-2'>View Details</button>
                    </div>
                    <div className='bg-[#eaf9ef] min-w-[150px] md:min-w-[180px]  w-full lg:w-[20%]  flex flex-col items-center py-4  lg:py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-2 sm:gap-5 border-2 border-[#c9e4d6] dark:bg-[#242f3e] dark:border-[#242f3e] '>
                        <div className='bg-[#37c971] w-fit px-3 py-2 rounded-md text-lg'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                className="injected-svg"
                                color="white"
                                data-src="https://cdn.hugeicons.com/icons/user-group-stroke-standard.svg"
                            >
                                <path
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15.5 11a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z"
                                />
                                <path
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15.483 11.35a3.5 3.5 0 1 0-2.465-3.7M10.983 7.65a3.5 3.5 0 1 0-2.466 3.7"
                                />
                                <path
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M22 16.5c0-2.761-2.462-5-5.5-5M17.5 19.5c0-2.761-2.462-5-5.5-5s-5.5 2.239-5.5 5M7.5 11.5c-3.038 0-5.5 2.239-5.5 5"
                                />
                            </svg>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='font-semibold text-lg'>Total Users</div>
                            {
                                inputs.Totalusers ?
                                    <div className='text-lg font-semibold'>{inputs.Totalusers}</div>
                                    :
                                    <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                                        <div className="card__skeleton w-full h-full rounded-md"></div>
                                    </div>
                            }
                        </div>
                        <button onClick={() => { router.push("/admin/members") }} className='bg-[#ffffff] text-gray-500 p-2 rounded-md cursor-pointer dark:bg-[#222c3d] dark:text-white dark:border-[#2a3547] dark:border-2'>View Details</button>
                    </div>
                    <div className='bg-[#fff1f6] min-w-[150px] md:min-w-[180px]  w-full lg:w-[20%]  flex flex-col items-center py-4  lg:py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-2 sm:gap-5 border-2 border-[#efd4dd] dark:bg-[#242f3e] dark:border-[#242f3e] '>
                        <div className='bg-[#fd6492] w-fit px-3 py-2 rounded-md text-lg'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                className="injected-svg"
                                color="#fff"
                                data-src="https://cdn.hugeicons.com/icons/book-open-01-stroke-rounded.svg"
                            >
                                <path stroke="#fff" strokeLinecap="round" strokeWidth={1.5} d="M12 6v14" />
                                <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M5.98 3.285c3.342.637 5.333 1.967 6.02 2.731.687-.764 2.678-2.094 6.02-2.73 1.692-.323 2.538-.484 3.26.134.72.617.72 1.62.72 3.626v7.209c0 1.834 0 2.751-.463 3.324-.462.572-1.48.766-3.518 1.154-1.815.346-3.232.896-4.258 1.45-1.01.545-1.514.817-1.761.817-.247 0-.752-.272-1.76-.817-1.027-.553-2.444-1.104-4.26-1.45-2.036-.388-3.055-.582-3.517-1.154C2 17.006 2 16.089 2 14.255V7.046c0-2.006 0-3.009.72-3.626.722-.618 1.568-.457 3.26-.135Z"
                                />
                            </svg>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='font-semibold text-lg'>OverDue Books</div>
                            {
                                inputs.overduebooks ?
                                    <div className='text-lg font-semibold'>{inputs.overduebooks}</div>
                                    :
                                    <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                                        <div className="card__skeleton w-full h-full rounded-md"></div>
                                    </div>
                            }
                        </div>
                        <button onClick={() => { router.push("/admin/managebooks") }} className='bg-[#ffffff] text-gray-500 p-2 rounded-md cursor-pointer dark:bg-[#222c3d] dark:text-white dark:border-[#2a3547] dark:border-2'>View Details</button>
                    </div>

                </div>
            </div>
            <div className='text-black dark:text-white mx-2 lg:mx-5 my-3 font-semibold text-xl flex items-center gap-1'>Swap charts <ChartNoAxesCombined color='#00d38b' size={20} /> for best view</div>
            <div className='flex mx-1 lg:mx-4 my-2 gap-8 lg:gap-3 flex-col lg:flex-row items-center lg:items-start justify-center swapy'>
                <div data-swapy-slot="a" className='w-full sm:w-[90%]   lg:w-[60%]'>
                    <ChartTooltipIndicatorLine />
                </div>
                <div data-swapy-slot="b" className='w-full sm:w-[90%]   lg:w-[40%] h-[-webkit-fill-available]'>
                    <ChartPieDonutText data={inputs} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard