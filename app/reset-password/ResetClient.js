"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Link from "next/link";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import { set } from "date-fns";
const ResetClient = () => {
  const searchParams = useSearchParams();
  const [tokeninfo, setTokeninfo] = useState({
    token: {
      id: "",
      token: "",
      expires_at: "",
      used: "",
      user_id: "",
    },
    userEmail: "",
  });
  const [passwords, setpasswords] = useState({
    password: "",
    confirmPassword: "",

  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [issubmitting, setissubmitting] = useState(false)

  useEffect(() => {
    const search = searchParams.get("token");
    if (!search) {
      toast.error("Token not found in URL");
      return;
    }

    (async () => {
      try {
        const res = await fetch("https://library-management-system-07a7.onrender.com/api/token/verify", {
          method: "POST",
        credentials: "include",

          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: search }),
        });

        if (!res.ok) {
          setTokeninfo({
            token: { ...tokeninfo.token, used: true },
            userEmail: "",
          });
          return;
        }

        const response = await res.json();
        const date = new Date().toLocaleString("en-PK", {
          timeZone: "Asia/Karachi",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
        if (response.token.used || response.token.expires_at < date) {
          setTokeninfo({
            token: { ...response.token, used: true },
            userEmail: "",
          });
        }
        else {
          setTokeninfo({
            token: { ...response.token, used: false },
            userEmail: response.userEmail,
          });
        }
      } catch (error) {
        toast.error("An error occurred while verifying the token.");
      }
    })();
  }, [searchParams]);
  const handleSubmit = async (e) => {
    setissubmitting(true)
    if (passwords.password.length < 8) {
      toast.error("Password must be at least 8 characters long.")
      setissubmitting(false)
      return
    }
    const date = new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    if (tokeninfo.token.used || tokeninfo.token.expires_at < date) {
      setTokeninfo({
        token: { ...response.token, used: true },
        userEmail: "",
      });
      setissubmitting(false)
    }
    const data = await fetch("https://library-management-system-07a7.onrender.com/api/token/update", {
      method: "PUT",
        credentials: "include",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: tokeninfo.token.token, password: passwords.password }),
    })
    if (!data.ok) {
      toast.error("An error occurred while updating the password.")
    }
    const response = await data.json()
    toast.success(response.message)
    setissubmitting(false)
    setpasswords({ password: "", confirmPassword: "" })
  }
  return (
    <>
      <Toaster />
      {tokeninfo.userEmail.length === 0 ? (
        tokeninfo.token.used ? (
          <div className="flex items-center justify-center flex-col gap-6 h-screen text-4xl text-red-500 font-semibold ">The Link is expired or already used.<span className="text-2xl text-black font-semibold">Go Back to <Link className="text-[#6841c4] font-semibold hover:underline" href="/" prefetch={true}>Home</Link> </span> </div>
        ) : (
          <div className="flex items-center justify-center flex-col gap-6 h-screen text-4xl text-[#6841c4] font-semibold ">Loading info ...</div>
        )
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 flex flex-col gap-3">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={tokeninfo.userEmail}
                  readOnly
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={passwords.password}
                  onChange={(e) => setpasswords({ ...passwords, password: e.target.value })}
                />
                {
                  !showPassword &&
                  <Eye onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer -right-6 top-9" size={20} />
                }
                {
                  showPassword &&
                  <EyeOff onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer -right-6 top-9 " size={20} />
                }
              </div>
              <div className="relative">
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={passwords.confirmPassword}
                  onChange={(e) => setpasswords({ ...passwords, confirmPassword: e.target.value })}
                />
                {
                  !showConfirmPassword &&
                  <Eye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute cursor-pointer -right-6 top-9" size={20} />
                }
                {
                  showConfirmPassword &&
                  <EyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute cursor-pointer -right-6 top-9 " size={20} />
                }
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={passwords.password !== passwords.confirmPassword || passwords.password === "" || passwords.confirmPassword === "" || issubmitting}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 cursor-pointe disabled:pointer-events-none disabled:opacity-50"
              >
                Change Password
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ResetClient;
