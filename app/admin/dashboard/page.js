import React from 'react'

const AdminDashboard = () => {
    return (
        <>
            <header className="flex  items-center justify-center px-4 py-2">
                <div className="flex items-center  text-[#6841c4] text-xl font-bold gap-2 border border-[#e3e7ea] w-fit px-2 py-1 ">
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
                </div>

                <div>
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
                <div></div>
            </header>
        </>
    )
}

export default AdminDashboard