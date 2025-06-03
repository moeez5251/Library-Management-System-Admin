"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import React from 'react'
const Sidebar = () => {
  const [active, setactive] = useState({
    dashboard: true,
    resources: false,
    managebooks: false,
    reports: false,
    lendedbooks: false,
    members: false,
    settings: false,
    notifications: false,
    logout: false
  })
  const handleswitch = (active_tab) => {
    setactive({
      dashboard: false,
      resources: false,
      managebooks: false,
      reports: false,
      lendedbooks: false,
      members: false,
      settings: false,
      notifications: false,
      logout: false,
      [active_tab]: true
    })
  }
  useEffect(() => {
    const tabs = JSON.parse(sessionStorage.getItem("switching_tabs"))
    if (tabs) {
      setactive(tabs)
    }
    return () => {

    }
  }, [])
  useEffect(() => {
    sessionStorage.setItem("switching_tabs", JSON.stringify(active))


    return () => {

    }
  }, [active])

  return (
    <>
      <Link href="/admin" prefetch={true} onClick={() => handleswitch("dashboard")} data-active={active.dashboard} className='flex items-center gap-2 mx-auto py-2.5  cursor-pointer px-4  w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all'>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg"
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
      <Link href="/admin/resources" prefetch={true} onClick={() => handleswitch("resources")} data-active={active.resources} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4 w-[80%] relative data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all'>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg"
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
            className="injected-svg"
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
      <Link href="/admin/managebooks" prefetch={true} onClick={() => handleswitch("managebooks")} data-active={active.managebooks} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4 w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg"
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
      <Link href="/admin/reports" prefetch={true} onClick={() => handleswitch("reports")} data-active={active.reports} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4.5 w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg"
            color="#526b7a"
            data-src="https://cdn.hugeicons.com/icons/complaint-stroke-rounded.svg"
          >
            <path
              stroke="#526b7a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16.996 9.013h.008m0-2.004V4.505M22 6.792c0 2.646-2.24 4.792-5.004 4.792-.325 0-.649-.03-.968-.09-.23-.043-.344-.064-.425-.052-.08.012-.194.072-.42.194a3.25 3.25 0 0 1-2.114.329c.274-.338.46-.743.543-1.177.05-.265-.074-.523-.26-.712a4.668 4.668 0 0 1-1.36-3.284c0-2.646 2.24-4.792 5.004-4.792C19.76 2 22 4.146 22 6.792ZM7.502 22H4.718c-.323 0-.648-.046-.945-.173-.966-.415-1.457-.964-1.685-1.307a.542.542 0 0 1 .03-.631c1.12-1.488 3.716-2.386 5.384-2.386M7.507 22h2.783c.324 0 .648-.046.945-.173.967-.415 1.457-.964 1.686-1.307a.542.542 0 0 0-.03-.631c-1.12-1.488-3.716-2.386-5.384-2.386m2.778-5.214a2.776 2.776 0 0 1-2.778 2.772 2.776 2.776 0 0 1-2.78-2.772 2.776 2.776 0 0 1 2.78-2.773 2.776 2.776 0 0 1 2.778 2.773Z"
            />
          </svg>
        </div>
        <div className='font-semibold text-base'>Reports</div>

      </Link>
      <Link href="/admin/books" prefetch={true} onClick={() => handleswitch("books")} data-active={active.books} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4 w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg"
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
      <Link href="/admin/members" prefetch={true} onClick={() => handleswitch("members")} data-active={active.members} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4.5 w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all'>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="injected-svg"
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
      <Link href="/admin/settings" prefetch={true} onClick={() => handleswitch("settings")} data-active={active.settings} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4.5 w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
        <div>
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
        <div className='font-semibold text-base'>Settings</div>

      </Link>
      <Link href="/admin/notifications" prefetch={true} onClick={() => handleswitch("notifications")} data-active={active.notifications} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4.5 w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all '>
        <div>
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
        </div>
        <div className='font-semibold text-base'>Notifications</div>

      </Link>
      <Link href="/" onClick={() => handleswitch("logout")} data-active={active.logout} className='flex items-center gap-2 mx-auto py-2.5 cursor-pointer px-4.5 w-[80%] data-[active=true]:bg-[#6841c4] data-[active=true]:text-white data-[active=true]:rounded-lg transition-all'>
        <div>
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
        <div className='font-semibold text-base'>Log Out</div>

      </Link>

    </>
  )
}

export default Sidebar