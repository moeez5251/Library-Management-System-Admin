"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef, useState } from "react";
const Admin = () => {
  const ref = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClick = () => {
    setIsPasswordVisible((prev) => !prev);
    ref.current.type = isPasswordVisible ? "password" : "text";
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col gap-3">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div>
          <Image src="/logo.png" alt="logo" width={150} height={100} />
        </div>

        <h2 className="text-[#525252] font-semibold text-4xl cssanimation typing">
          Welcome to LMS
        </h2>
        <div className="w-[35%] my-14 flex flex-col gap-5">
          <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 focus:border border-gray-400 group delay-200 rounded-md">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <path d="M22 6l-10 7L2 6"></path>
            </svg>
            <input
              type="email"
              name="email"
              className="flex-1 focus:outline-none"
              placeholder="Email"
            />
          </div>
          <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 focus:border border-gray-400 group delay-200 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              stroke="gray"
              data-src="https://cdn.hugeicons.com/icons/reset-password-stroke-rounded.svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21.5 12A9.5 9.5 0 1 1 12 2.5a9.502 9.502 0 0 1 8.71 5.7m.79-2.7-.475 3.175L18 8"
              />
              <path
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 11V9.5a2 2 0 1 1 4 0V11m-2.75 5.5h1.5c1.173 0 1.76 0 2.163-.31a1.5 1.5 0 0 0 .277-.277c.31-.404.31-.99.31-2.163 0-1.173 0-1.76-.31-2.163a1.5 1.5 0 0 0-.277-.277c-.404-.31-.99-.31-2.163-.31h-1.5c-1.173 0-1.76 0-2.163.31a1.5 1.5 0 0 0-.277.277c-.31.404-.31.99-.31 2.163 0 1.173 0 1.76.31 2.163a1.5 1.5 0 0 0 .277.277c.404.31.99.31 2.163.31Z"
              />
            </svg>
            <input
              ref={ref}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              className="focus:outline-none w-[80%]"
              placeholder="Password"
            />
            <div>
              <img
                onClick={handleClick}
                className="cursor-pointer"
                src={isPasswordVisible ? "/eyeclose.svg" : "/eyeopen.svg"}
                alt="toggle visibility"
              />
            </div>
          </div>
        <Button className="text-lg py-5">Login</Button>
        </div>
      </div>
    </>
  );
};

export default Admin;