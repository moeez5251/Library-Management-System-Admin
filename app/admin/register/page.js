"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, Bounce } from 'react-toastify';
const Admin = () => {
  const router = useRouter()
  const ref = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  })
  const [disabled, setDisabled] = useState(false)
  const handleClick = () => {
    setIsPasswordVisible((prev) => !prev);
    ref.current.type = isPasswordVisible ? "password" : "text";
  };
  const oninputchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }
  const handlesubmit = async () => {
    if (inputs.email.trim() === "" || inputs.password.trim() === "" || inputs.name.trim() === "") {
      toast("Fill all the fields")
      return
    }
    setDisabled(true)

    const oldusers = await fetch("http://localhost:5000/api/users/all")
    const oldusersdata = await oldusers.json()
    const matcheduser = oldusersdata.find((user) => user.email.trim() === inputs.email.trim() || user.name.trim() === inputs.name.trim())
    if (matcheduser) {
      toast.error('User with these credentials already exists', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setDisabled(false)
      return
    }
    const api = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      body: JSON.stringify({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const data = await api.json();
    console.log(data);
    toast(data.message)
    setDisabled(false)
    setInputs({
      email: "",
      password: "",
      name: ""
    })

  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Toaster />
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
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              className="injected-svg"
              color="gray"
              data-src="https://cdn.hugeicons.com/icons/user-circle-02-solid-sharp.svg"
            >
              <path
                fill="gray"
                fillRule="evenodd"
                d="M12 3.205a8.795 8.795 0 1 0 0 17.59 8.795 8.795 0 0 0 0-17.59ZM1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12Z"
                clipRule="evenodd"
              />
              <path
                fill="gray"
                d="M8.5 9.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM5.41 17.647a5.75 5.75 0 0 1 4.992-2.897h3.197a5.75 5.75 0 0 1 4.992 2.897l1.027 1.96-.433.39A10.713 10.713 0 0 1 12 22.75c-2.76 0-5.28-1.042-7.184-2.753l-.433-.39 1.027-1.96Z"
              />
            </svg>
            <input
              type="text"
              name="name"
              className="flex-1 focus:outline-none"
              placeholder="Name"
              value={inputs.name}
              onChange={oninputchange}
            />
          </div>
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
              value={inputs.email}
              onChange={oninputchange}
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
              value={inputs.password}
              onChange={oninputchange}
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
          {
            !disabled &&
            <Button onClick={handlesubmit} className="text-lg py-5">Sign Up</Button>
          }{
            disabled &&
            <Button disabled className="text-lg py-5">Signing <Loader2 className="animate-spin" /> </Button>
          }
        </div>

      </div>
    </>
  );
};

export default Admin;