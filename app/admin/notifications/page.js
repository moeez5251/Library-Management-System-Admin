"use client"
import React, { useState, useEffect } from 'react'

import { MessageSquareWarning } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Image from 'next/image';
const Notifications = () => {
  const [Notifications, setNotifications] = useState([])
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
        toast.error("Failed to fetch notifications");
        return;
      }
      const response = await data.json();

      setNotifications(response.map(item => {
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
      const data = await fetch("https://library-management-system-hvhv.onrender.com/api/notifications/markasread", {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({ Userid: localStorage.getItem("userID") })
      })
      if (!data.ok) {
        toast.error("Failed to mark notifications as read");
        return;
      }
    }
  }, [])
  useEffect(() => {
    dayjs.extend(relativeTime);
    dayjs.extend(customParseFormat);
    return () => {

    }
  }, [Notifications])

  return (
    <>
      <Toaster />
      <h1 className='font-semibold text-xl mx-4 my-2 '>Notifications</h1>
      <div className='bg-white px-4 rounded-lg shadow-md mx-4 pt-4 pb-8 h-full overflow-y-auto'>
        <div className="flex flex-col gap-4 p-4">
          {
            Notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src={"/notification.png"}
                  alt="No notifications"
                  width={400}
                  height={400}
                  priority
                />
              </div>
            )
          }
          {Notifications.map((item, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-3 rounded-xl border ${item.read
                ? "bg-gray-50 border-gray-200"
                : "bg-white border-blue-200 ring-1 ring-blue-100"
                } shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-center gap-3">
                {
                  <MessageSquareWarning className="w-5 h-5 text-blue-500" />
                }
                <div >
                  <div
                    className={`${item.read ? "text-gray-600 font-normal" : "text-gray-900 font-semibold"
                      }`}
                  >
                    {item.message}
                  </div>
                  <div className="text-sm text-gray-400">{item.time}</div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Notifications