"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'next/navigation';
const AdminDashboard = () => {
    const [notifications, setnotifications] = useState([])
    const router = useRouter()
    useEffect(() => {
        (async () => {
            const data = await fetch("https://library-management-system-hvhv.onrender.com/api/notifications/get", {
                method: "POST",
                credentials: "include",

                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({ Userid: localStorage.getItem("userID") })
            })
            if (!data.ok) {

                return;
            }
            const response = await data.json();

            setnotifications(response.map(item => {
                const parsed = dayjs(item.CreatedAt, "DD/MM/YYYY, HH:mm:ss");

                return {
                    id: item.Id,
                    message: item.Message,
                    read: item.IsRead,
                    time: parsed.isValid() ? parsed.fromNow() : "Invalid date",
                    formatted: parsed.isValid() ? parsed.format("DD/MM/YYYY, HH:mm:ss") : "Invalid date"
                };
            }));

        })()

        return async () => {

        }
    }, [])
    useEffect(() => {
        dayjs.extend(relativeTime);
        dayjs.extend(customParseFormat);
        return () => {

        }
    }, [notifications])
    useEffect(() => {
        router.prefetch("/admin/profile")
        router.prefetch("/")

        return () => {

        }
    }, [])
    const handlelogout = async () => {
        const data = await fetch("https://library-management-system-hvhv.onrender.com/api/auth/logout",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
            })
        if (!data.ok) {
            const errorData = await data.json();
            toast.error(errorData.error);
            return;
        }
        sessionStorage.removeItem("token");
        localStorage.removeItem("userID");
        router.push("/");

    }
    return (
        <>
            <header className="flex  items-center justify-between px-4 py-2 mx-0 sm:mx-10 my-2">
                <Link href="/" prefetch={true} className="lg:flex items-center hidden  text-[#6841c4] text-xl font-bold gap-2 border border-[#e3e7ea] px-5 lg:px-0 lg:w-[17%] justify-center py-1 text-nowrap ">
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="none"
                    className="injected-svg"
                    color="#6841c4"
                    data-src="https://cdn.hugeicons.com/icons/menu-01-solid-rounded.svg?v=2.0"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="#6841c4"
                        fillRule="evenodd"
                        d="M3 5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM3 12a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM3 19a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"
                        clipRule="evenodd"
                    />
                </svg>

                <div className='flex items-center justify-center gap-4'>
                    <Popover>
                        <PopoverTrigger>
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
                                <div className='absolute -top-1 -right-0.5  bg-red-600 text-white text-xs px-1 rounded-full'>{notifications.length}</div>
                                {
                                    notifications.length > 0 &&
                                    <span
                                        className="absolute -top-1 -right-0.5 h-4 w-4 animate-ping rounded-full bg-red-400 opacity-75"
                                    ></span>
                                }
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 max-h-96 overflow-y-auto p-2 space-y-2">
                            {notifications.length > 0 && notifications.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center px-4 py-3 rounded-xl border ${item.read
                                        ? "bg-gray-50 border-gray-200"
                                        : "bg-white border-blue-200 ring-1 ring-blue-100"
                                        } shadow-sm hover:shadow-md transition-shadow duration-200`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div
                                                className={`${item.read
                                                    ? "text-gray-600 font-normal"
                                                    : "text-gray-900 font-semibold"
                                                    }`}
                                            >
                                                {item.message}
                                            </div>
                                            <div className="text-sm text-gray-400">{item.time}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {
                                notifications.length === 0 && (
                                    <div className="flex items-center px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="text-gray-600 font-semibold">
                                                    You have no notifications
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </PopoverContent>

                    </Popover>
                    <div onClick={() => router.push("/admin/profile")} className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110'>
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
                    <div onClick={handlelogout} className='bg-[#f1f1fd] p-2 rounded-full cursor-pointer scale-100 transition-all hover:scale-110'>
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