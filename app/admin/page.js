import React from 'react'
import { ChartTooltipIndicatorLine } from './components/chart'
import { ChartPieDonutText } from './components/piechart'
const AdminDashboard = () => {
    return (
        <div className='animate-page'>
            <div className='flex items-center justify-between mx-4 my-2'>
                <h1 className='font-semibold text-xl'>Welcome Admin</h1>
                <div className='flex items-center gap-2'>
                    <div className='font-semibold text-lg'>Quick Actions :</div>
                    <button className='bg-[#6841c4] text-white px-3 py-2 rounded-lg cursor-pointer transition-transform scale-90 hover:scale-100 font-normal'>Add New Book</button>
                </div>
            </div>
            <div className='px-5 m-5 py-3 rounded-xl flex items-center justify-center gap-5 bg-white '>
                <div className='bg-[#fef8e8] w-[20%]  flex flex-col items-center py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-5 border-2 border-[#ede4bb] '>
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
                        <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                            <div className="card__skeleton w-full h-full"></div>
                        </div>
                    </div>
                    <button className='bg-[#ffffff] text-gray-500  p-2 rounded-md cursor-pointer'>View Details</button>
                </div>
                <div className='bg-[#ededfe] w-[20%]  flex flex-col items-center py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-5 border-2 border-[#dad7f6] '>
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
                        <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                            <div className="card__skeleton w-full h-full"></div>
                        </div>
                    </div>
                    <button className='bg-[#ffffff] text-gray-500 p-2 rounded-md cursor-pointer'>View Details</button>
                </div>
                <div className='bg-[#e7f9f9] w-[20%]  flex flex-col items-center py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-5 border-2 border-[#c4e9e4] '>
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
                        <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                            <div className="card__skeleton w-full h-full"></div>
                        </div>
                    </div>
                    <button className='bg-[#ffffff] text-gray-500 p-2 rounded-md cursor-pointer'>View Details</button>
                </div>
                <div className='bg-[#eaf9ef] w-[20%]  flex flex-col items-center py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-5 border-2 border-[#c9e4d6] '>
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
                        <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                            <div className="card__skeleton w-full h-full"></div>
                        </div>
                    </div>
                    <button className='bg-[#ffffff] text-gray-500 p-2 rounded-md cursor-pointer'>View Details</button>
                </div>
                <div className='bg-[#fff1f6] w-[20%]  flex flex-col items-center py-5 justify-center rounded-lg shadow-sm scale-95 hover:scale-100 transition-transform gap-5 border-2 border-[#efd4dd] '>
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
                        <div className='font-semibold text-lg w-24 h-8 rounded-md'>
                            <div className="card__skeleton w-full h-full"></div>
                        </div>
                    </div>
                    <button className='bg-[#ffffff] text-gray-500 p-2 rounded-md cursor-pointer'>View Details</button>
                </div>

            </div>
            <div className='flex  mx-4 my-2 gap-3'>

                <div className='w-[60%]'>
                    <ChartTooltipIndicatorLine />
                </div>
                <div className='w-1/2'>
                    <ChartPieDonutText />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard