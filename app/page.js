"use client"
import Link from "next/link";
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { validate } from 'react-email-validator';
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [required, setrequired] = useState({
    email: false,
    password: false,
    validemail: false,
  })
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const [login, setLogin] = useState(false)
  const [toggle, settoggle] = useState(false)
  const handleinputchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }
  const handleclick = async () => {
    setLogin(true)
    if (inputs.email.trim() === "") {
      setrequired({
        email: true,
        password: false,
        validemail: false
      })
      setLogin(false)
      return;

    }
    else {
      setrequired({
        email: false,
        password: false,
        validemail: false
      })
    }
    if (inputs.password.trim() === "") {
      setrequired({
        email: false,
        password: true,
        validemail: false
      })

      setLogin(false)
      return;
    }
    else {
      setrequired({
        email: false,
        password: false,
        validemail: false
      })
    }
    if (!validate(inputs.email)) {
      setrequired({
        email: false,
        password: false,
        validemail: true
      })
      setLogin(false)
      return;
    }
    else {
      setrequired({
        email: false,
        password: false,
        validemail: false
      })
    }
    try {
      const log = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(inputs)
      })
      const data = await log.json();
      if (data.message.trim() === "Login successful") {
        localStorage.setItem("userID", data.userid)
        router.push("/admin")
      }
      else {
        toast.error(data.message)
      }
      setLogin(false)
    }
    catch (err) {
      toast.error("Server Error")
      setLogin(false)
    }
  }
  useEffect(() => {
    router.prefetch("/admin")

    return () => {

    }
  }, [])

  return (
    <>
      <Toaster />
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/2 h-full  ">
          <div className="w-full h-full">
            <img className="w-full h-full object-cover" src="/LMS.webp" alt="Library Image" />
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center bg-white px-20 gap-8">
          <div className="flex items-center  text-[#6841c4] text-xl font-bold gap-2 border border-[#e3e7ea] w-fit px-2 py-1 mx-auto ">
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
          <div className="flex flex-col  gap-2 ">
            <h2 className="font-semibold text-xl">Log Into Admin Aspire LMS</h2>
            <p className="text-[#526b7a] text-sm">ADMIN LOGIN</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid w-full  items-center gap-2">
              <Label className="font-semibold" htmlFor="email">Email</Label>
              <div
                className="shadow-lg flex gap-2 items-center bg-white px-2 py-3 hover:shadow-xl duration-300  border-gray-400 group delay-200 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  className="injected-svg"
                  color="#526b7a"
                  data-src="https://cdn.hugeicons.com/icons/user-02-twotone-rounded.svg"
                >
                  <path
                    stroke="#526b7a"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18.5 20v-2.03c0-1.242-.56-2.46-1.69-2.975C15.432 14.366 13.778 14 12 14c-1.778 0-3.431.366-4.81.995-1.13.515-1.69 1.733-1.69 2.975V20"
                  />
                  <circle
                    cx={12}
                    cy={7.5}
                    r={3.5}
                    stroke="#526b7a"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    opacity={0.4}
                  />
                </svg>
                <input
                  type="email"
                  name="email"
                  className="flex-1 focus:outline-none"
                  placeholder="Email"
                  value={inputs.email}
                  onChange={handleinputchange}
                />
              </div>
              {
                required.email &&
                <div className="text-sm text-red-700 font-bold">This is a Required field</div>
              }
              {
                required.validemail &&
                <div className="text-sm text-red-700 font-bold">Invalid email</div>
              }
            </div>
            <div className="grid w-full  items-center gap-2">
              <Label className="font-semibold" htmlFor="email">Password</Label>
              <div
                className="shadow-lg flex gap-2 items-center bg-white px-2 py-3 hover:shadow-xl duration-300  border-gray-400 group delay-200 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  className="injected-svg"
                  color="#526b7a"
                  data-src="https://cdn.hugeicons.com/icons/key-01-stroke-sharp.svg"
                >
                  <path
                    stroke="#526b7a"
                    strokeLinecap="square"
                    strokeWidth={1.5}
                    d="M15.5 14.5a6 6 0 1 0-5.47-3.53L2.5 18.5v3h3v-2h2v-2h2l3.53-3.53c.754.34 1.59.53 2.47.53ZM17.5 6.5l-1 1"
                  />
                </svg>
                <input
                  type={toggle ? "text" : "password"}
                  name="password"
                  className="flex-1 focus:outline-none"
                  placeholder="Password"
                  value={inputs.password}
                  onChange={handleinputchange}
                />
                <img onClick={() => { settoggle(!toggle) }} className="cursor-pointer" src={toggle ? "/eyeclose.svg" : "/eyeopen.svg"} alt="" />
              </div>
              {
                required.password &&
                <div className="text-sm text-red-700 font-bold">This is a Required field</div>
              }
            </div>
          </div>
          {
            !login &&
            <Button onClick={handleclick} className="bg-[#6841d8] cursor-pointer hover:bg-[#6841d8]/90">Sign In</Button>
          }
          {
            login &&
            <Button disabled className="bg-[#6841d8] cursor-pointer hover:bg-[#6841d8]/90 disabled:bg-[#6841d8]/80">Signing In
              <LoaderCircleIcon className="animate-spin" />
            </Button>
          }
        </div>
      </div>
    </>
  );
}
