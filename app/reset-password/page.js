"use client"
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
const Reset = () => {
    const searchParams = useSearchParams()
    const [tokeninfo, setTokeninfo] = useState({
        token: {
            id: "",
            token: "",
            expires_at: "",
            used: "",
            user_id: ""
        },
        userEmail: ""
    })
    useEffect(() => {

        const search = searchParams.get("token")
        console.log(search);
        (async function name() {
            const data = await fetch("http://localhost:5000/api/token/verify", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    token: search
                })
            })
            if (!data.ok) {
                toast.error("Unable to fetch data")
                return
            }
            const response = await data.json()
            console.log(response)
            if (response.token.used || response.token.expires_at < Date.now()) {
                setTokeninfo({
                    ...tokeninfo,
                    token: {
                        ...tokeninfo.token,
                        used: true
                    }
                })
            }
            else {
                setTokeninfo({
                    ...tokeninfo,
                    token: {
                        ...tokeninfo.token,
                        used: false
                    },
                    userEmail: response.userEmail
                })
            }
        })()
        return () => {

        };
    }, [])
    return (
        <>
            <Toaster />
            {
                tokeninfo.userEmail.length === 0 ? <div>Loading info ...</div> : "" ||
                    tokeninfo.token.used ? <div>Link Already Expired</div> : "" ||
                !tokeninfo.token.used &&
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Change Password
                            </h2>
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
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
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="confirm-password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>

                                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
                            </form>
                        </div>
                    </div>
                </section>

            }

        </>
    )
}

export default Reset