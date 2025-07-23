import Link from 'next/link'
import React from 'react'
const AdminDashboard = () => {
    return (
        <>
            <header className="flex  items-center justify-between px-4 py-2 mx-10 my-2">
                <Link href="/" prefetch={true} className="flex items-center  text-[#6841c4] text-xl font-bold gap-2 border border-[#e3e7ea] w-[17%] justify-center py-1 ">
                    <div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            className="injected-svg"
                            color="#6841c4"
                            data-src="https://cdn.hugeicons.com/icons/book-edit-stroke-standard.svg"
                        >
                            <path
                                stroke="#6841c4"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 19v2h2l5-5-2-2-5 5Z"
                            />
                            <path
                                stroke="#6841c4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 5.5V20s-3.5-3.686-10-2.106v-14.5C8.5 1.814 12 5.5 12 5.5Zm0 0s3.5-3.686 10-2.106V11.5"
                            />
                        </svg>
                    </div>

                    ASPIRE LMS
                </Link>

                <div className='flex items-center justify-center'>
                    <label className="relative flex items-center justify-center w-12 h-6 mx-auto cursor-pointer">
                        <input type="checkbox" className="peer sr-only" id="darkModeToggle" />

                        <svg className="absolute w-3 h-3 text-white transition-all duration-200 ease-out peer-checked:opacity-0 peer-checked:rotate-[-30deg] peer-checked:scale-75 right-1 top-1" viewBox="0 0 12 12" aria-hidden="true">
                            <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                                <circle cx="6" cy="6" r="2" />
                                <g strokeDasharray="1.5 1.5">
                                    <polyline points="6 10,6 11.5" transform="rotate(0,6,6)" />
                                    <polyline points="6 10,6 11.5" transform="rotate(45,6,6)" />
                                    <polyline points="6 10,6 11.5" transform="rotate(90,6,6)" />
                                    <polyline points="6 10,6 11.5" transform="rotate(135,6,6)" />
                                    <polyline points="6 10,6 11.5" transform="rotate(180,6,6)" />
                                    <polyline points="6 10,6 11.5" transform="rotate(225,6,6)" />
                                    <polyline points="6 10,6 11.5" transform="rotate(270,6,6)" />
                                    <polyline points="6 10,6 11.5" transform="rotate(315,6,6)" />
                                </g>
                            </g>
                        </svg>

                        <svg className="absolute w-3 h-3 text-white opacity-0 transform translate-x-[-0.75rem] rotate-30 scale-75 transition-all duration-300 ease-in peer-checked:opacity-100 peer-checked:translate-x-[-1.5rem] peer-checked:rotate-0 peer-checked:scale-100 right-1 top-1" viewBox="0 0 12 12" aria-hidden="true">
                            <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" transform="rotate(-45,6,6)">
                                <path d="m9,10c-2.209,0-4-1.791-4-4s1.791-4,4-4c.304,0,.598.041.883.105-.995-.992-2.367-1.605-3.883-1.605C2.962.5.5,2.962.5,6s2.462,5.5,5.5,5.5c1.516,0,2.888-.613,3.883-1.605-.285.064-.578.105-.883.105Z" />
                            </g>
                        </svg>

                        <div className="w-12 h-6 bg-blue-300 peer-checked:bg-purple-700 rounded-full transition-colors duration-300 ease-in-out"></div>

                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out peer-checked:translate-x-6"></div>

                        <span className="sr-only">Toggle Dark Mode</span>
                    </label>
                </div>
                <div className='flex items-center justify-center gap-4'>

                    <div className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110 relative'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            className="injected-svg"
                            color="#526b7a"
                            data-src="https://cdn.hugeicons.com/icons/notification-03-stroke-standard.svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#526b7a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3.914 13.086a2 2 0 0 0 .586-1.414V9.5a7.5 7.5 0 1 1 15 0v2.172a2 2 0 0 0 .586 1.414L21.5 14.5v1.382a.96.96 0 0 1-.558.883c-1.56.702-4.54 1.735-8.942 1.735-4.401 0-7.382-1.033-8.942-1.735a.96.96 0 0 1-.558-.883V14.5l1.414-1.414ZM9 21c.796.621 1.848.999 3 .999s2.204-.378 3-.999"
                            />
                        </svg>
                        <div className='absolute -top-1 -right-0.5  bg-red-600 text-white text-xs px-1 rounded-full'>0</div>
                        <span
                            className="absolute -top-1 -right-0.5 h-4 w-4 animate-ping rounded-full bg-red-400 opacity-75"
                        ></span>
                    </div>
                    <div className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            className="injected-svg"
                            color="#526b7a"
                            data-src="https://cdn.hugeicons.com/icons/setting-done-01-stroke-standard.svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#526b7a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M10.5 22v0a.888.888 0 0 1-.853-.64l-.728-2.518-1.478-.829-2.552.632a1 1 0 0 1-1.1-.46L2.425 15.89a1 1 0 0 1 .198-1.261l1.79-1.576v-2.106l-1.79-1.576a1 1 0 0 1-.199-1.261l1.364-2.295a1 1 0 0 1 1.1-.46l2.552.632L9 5l.772-2.316A1 1 0 0 1 10.721 2h2.558a1 1 0 0 1 .949.684L15 5l1.56.987 2.552-.632a1 1 0 0 1 1.1.46l1.39 2.338a1 1 0 0 1-.154 1.22l-.627.624M14.5 9.551a3.5 3.5 0 1 0-4.95 4.95"
                            />
                            <path
                                stroke="#526b7a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17 21.998a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                            />
                            <path
                                stroke="#526b7a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="m15 17 1.5 1.5 2.5-3"
                            />
                        </svg>
                    </div>
                    <div className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            className="injected-svg"
                            color="#526b7a"
                            data-src="https://cdn.hugeicons.com/icons/user-story-stroke-standard.svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#526b7a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 2c5.524 0 10 4.478 10 10s-4.476 10-10 10M9 21.5a11.064 11.064 0 0 1-3.277-1.754m0-15.492A11.329 11.329 0 0 1 9 2.5m-7 7.746a9.624 9.624 0 0 1 1.296-3.305M2 13.754a9.624 9.624 0 0 0 1.296 3.305"
                            />
                            <path
                                stroke="#526b7a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 9a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"
                            />
                            <path
                                stroke="#526b7a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17 17a5 5 0 0 0-10 0"
                            />
                        </svg>
                    </div>
                    <div className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            className="injected-svg"
                            color="#526b7a"
                            data-src="https://cdn.hugeicons.com/icons/logout-04-stroke-rounded.svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#526b7a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7.023 5.5a9 9 0 1 0 9.953 0"
                            />
                            <path
                                stroke="#526b7a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 11V2m0 9c-.7 0-2.008-1.994-2.5-2.5M12 11c.7 0 2.008-1.994 2.5-2.5"
                            />
                        </svg>
                    </div>
                </div>

            </header>
        </>
    )
}

export default AdminDashboard