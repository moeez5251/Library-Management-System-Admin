"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from 'react'
import { X } from "lucide-react"
const Sidebar = () => {
  const params = usePathname()
  const router = useRouter()
  const [active, setactive] = useState({
    dashboard: true,
    resources: false,
    managebooks: false,
    reports: false,
    lendedbooks: false,
    members: false,
    notifications: false,
    profile: false,
    info: false,
    theme: false

  })
  const handleswitch = (active_tab) => {
    setactive({
      dashboard: false,
      resources: false,
      managebooks: false,
      reports: false,
      lendedbooks: false,
      members: false,
      notifications: false,
      profile: false,
      info: false,
      theme: false,
      [active_tab]: true
    })
    if (document.querySelector(".sidebar").classList.contains("left-0")) {
      document.querySelector(".sidebar").classList.remove("left-0")
    }
  }
  useEffect(() => {
    const a = params.split("/admin/")[1];
    if (params.split("/admin/")[1]) {
      setactive({
        dashboard: false,
        resources: false,
        managebooks: false,
        reports: false,
        lendedbooks: false,
        members: false,
        settings: false,
        notifications: false,
        profile: false,
        info: false,
        theme: false,
        [a]: true
      })
    }
    else {
      setactive({
        dashboard: true,
        resources: false,
        managebooks: false,
        reports: false,
        lendedbooks: false,
        members: false,
        settings: false,
        notifications: false,
        profile: false,
        info: false,
        theme: false
      })
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
  useEffect(() => {
    router.prefetch("/")

    return () => {

    }
  }, [])
  // useEffect(() => {
  //   const token = sessionStorage.getItem('token');
  //   if (!token) {
  //     router.push('/');
  //   }

  //   return () => {

  //   }
  // }, [])

  return (
    <>
      <div onClick={() => {
        if (document.querySelector(".sidebar").classList.contains("left-0")) {
          document.querySelector(".sidebar").classList.remove("left-0")
        }
      }} className="flex items-center justify-end xl:hidden w-[90%] sm:w-[80%] cursor-pointer">
        <X color="#6841c4 " className="dark:saturate-[3.5]" size={30} />
      </div>
      <Link href="/admin" prefetch={true} onClick={() => handleswitch("dashboard")} data-active={active.dashboard} className='flex items-center gap-2 mx-auto py-2.5  cursor-pointer px-4  w-[90%] sm:w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all'>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg dark:brightness-[2.5]"
            color="#526b7a"
            data-src="https://cdn.hugeicons.com/icons/resources-add-stroke-standard.svg"
          >
            <path
              stroke="#526b7a"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.5 2h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM21 13.5h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1ZM10.677 18.279c.43-.43.43-1.128 0-1.558L7.28 13.323a1.101 1.101 0 0 0-1.558 0L2.323 16.72c-.43.43-.43 1.128 0 1.558l3.398 3.398c.43.43 1.128.43 1.558 0l3.398-3.398Z"
            />
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18 2.5v7M21.5 6h-7"
            />
          </svg>
        </div>
        <div className='font-semibold text-base'>Dashboard</div>
      </Link>
      <Link href="/admin/resources" prefetch={true} onClick={() => handleswitch("resources")} data-active={active.resources} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4 w-[90%] sm:w-[80%] relative data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all'>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg dark:brightness-[2.5]"
            color="#526b7a"
            data-src="https://cdn.hugeicons.com/icons/building-02-stroke-standard.svg"
          >
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 22V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v18M3 22h18"
            />
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14.5 22v-4a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v4M14 6h-4m4 3.5h-4m4 3.5h-4"
            />
          </svg>
        </div>
        <div className='font-semibold text-base'>Resources</div>
        <div className='absolute right-5'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg dark:brightness-[2.5]"
            color="#526b7a"
            data-src="https://cdn.hugeicons.com/icons/arrow-right-01-stroke-standard.svg"
          >
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={16}
              strokeWidth={1.5}
              d="m9 6 6 6-6 6"
            />
          </svg>

        </div>
      </Link>
      <Link href="/admin/managebooks" prefetch={true} onClick={() => handleswitch("managebooks")} data-active={active.managebooks} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4 w-[90%] sm:w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg dark:brightness-[2.5]"
            color="#526b7a"
            data-src="https://cdn.hugeicons.com/icons/books-01-stroke-rounded.svg"
          >
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2 15h13c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 16.602 18 17.068 18 18c0 .932 0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 21 15.932 21 15 21H2M2 3h13c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 4.602 18 5.068 18 6c0 .932 0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 9 15.932 9 15 9H2M22 9H9c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083C6 10.602 6 11.068 6 12c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C7.602 15 8.068 15 9 15h13"
            />
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeWidth={1.5}
              d="M21 15c-1.105 0-2-1.343-2-3s.895-3 2-3M3 3c1.105 0 2 1.343 2 3s-.895 3-2 3M3 15c1.105 0 2 1.343 2 3s-.895 3-2 3"
            />
          </svg>
        </div>
        <div className='font-semibold text-base'>Manage Books</div>

      </Link>

      <Link href="/admin/books" prefetch={true} onClick={() => handleswitch("books")} data-active={active.books} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4 w-[90%] sm:w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg dark:brightness-[2.5]"
            color="#526b7a"
            data-src="https://cdn.hugeicons.com/icons/book-02-stroke-sharp.svg"
          >
            <path
              stroke="#526b7a"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.98 6.997H7.991M11.986 10.994H7.992"
            />
            <path
              stroke="#526b7a"
              strokeWidth={1.5}
              d="M18.477 21.99H7.504c-2.397.075-3.708-.688-4-2.862m14.973 2.861h1.98m-1.98 0v-6.006m0 0h2.005V1.993H6.385c-1.913.214-3.053 1.291-2.882 4.153v10.282c-.033.765 0 1.832 0 2.7m14.974-3.145-11.005-.011c-2.902-.12-3.89 1.24-3.969 3.156"
            />
          </svg>
        </div>
        <div className='font-semibold text-base'>Lended Books</div>

      </Link>
      <Link href="/admin/members" prefetch={true} onClick={() => handleswitch("members")} data-active={active.members} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4.5 w-[90%] sm:w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all'>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg dark:brightness-[2.5]"
            color="#526b7a"
            data-src="https://cdn.hugeicons.com/icons/user-group-stroke-standard.svg"
          >
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.5 11a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z"
            />
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.483 11.35a3.5 3.5 0 1 0-2.465-3.7M10.983 7.65a3.5 3.5 0 1 0-2.466 3.7"
            />
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M22 16.5c0-2.761-2.462-5-5.5-5M17.5 19.5c0-2.761-2.462-5-5.5-5s-5.5 2.239-5.5 5M7.5 11.5c-3.038 0-5.5 2.239-5.5 5"
            />
          </svg>
        </div>
        <div className='font-semibold text-base'>Members</div>

      </Link>

      <Link href="/admin/notifications" prefetch={true} onClick={() => handleswitch("notifications")} data-active={active.notifications} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4.5 w-[90%] sm:w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="none"
            className="injected-svg dark:brightness-[2.5]"
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
        </div>
        <div className='font-semibold text-base'>Notifications</div>

      </Link>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger data-active={active.profile} className='flex items-center justify-normal gap-2 flex-none mx-auto py-2.5 cursor-pointer px-4.5 w-[90%] sm:w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all duration-150'>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                className="injected-svg dark:brightness-[2.5]"
                color="#526b7"
                data-src="https://cdn.hugeicons.com/icons/account-setting-01-stroke-standard.svg?v=2.0"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#526b7a"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M22 13.967v-3.934c-2.857 0-4.714-3.103-3.268-5.566L15.268 2.5c-1.464 2.494-5.07 2.494-6.534 0L5.27 4.467C6.716 6.93 4.857 10.033 2 10.033v3.934c2.857 0 4.714 3.103 3.268 5.566L8.732 21.5c1.465-2.495 5.073-2.495 6.538 0l3.464-1.967c-1.447-2.463.41-5.566 3.266-5.566Z"
                />
                <path
                  stroke="#526b7a"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M8.5 16.5a4.039 4.039 0 0 1 3.5-2.02c1.496 0 2.801.812 3.5 2.02M14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
            </div>
            <div className='font-semibold text-base w-full'>Profile</div>

          </AccordionTrigger>
          <AccordionContent className="transition-all duration-1000">
            <Link href="/admin/profile" prefetch={true} onClick={() => handleswitch("info")} data-active={active.info} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4.5 w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="none"
                  className="injected-svg dark:brightness-[2.5]"
                  color="#526b7a"
                  data-src="https://cdn.hugeicons.com/icons/user-warning-01-stroke-standard.svg?v=2.0"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#526b7a"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m18.874 19.914.537-.514c.573-.55.785-1.381.378-2.053C18.244 14.803 15.213 13.5 12 13.5s-6.245 1.303-7.789 3.847c-.407.672-.195 1.503.378 2.053l.537.514c.391.375.922.586 1.476.586h10.796c.554 0 1.085-.211 1.476-.586ZM15.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM19 5v4M19 12v.01"
                  />
                </svg>
              </div>
              <div className='font-semibold text-base'>Account Information</div>

            </Link>
          
            <div onClick={handlelogout} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4.5 w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="none"
                  className="injected-svg dark:brightness-[2.5]"
                  color="red"
                  data-src="https://cdn.hugeicons.com/icons/logout-03-stroke-rounded.svg?v=2.0"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="red"
                    strokeLinecap="round"
                    strokeWidth={1.5}
                    d="M15 17.625c-.074 1.852-1.617 3.424-3.684 3.374-.481-.012-1.076-.18-2.265-.515-2.861-.807-5.345-2.164-5.941-5.203C3 14.723 3 14.095 3 12.837v-1.674c0-1.257 0-1.886.11-2.445.596-3.038 3.08-4.395 5.941-5.202 1.19-.335 1.784-.503 2.265-.515 2.067-.05 3.61 1.522 3.684 3.374"
                  />
                  <path
                    stroke="red"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12H10m11 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5"
                  />
                </svg>
              </div>
              <div className='font-semibold text-base text-red-600'>Log out</div>

            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </>
  )
}

export default Sidebar