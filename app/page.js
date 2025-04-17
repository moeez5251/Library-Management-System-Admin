import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <div className="w-[95%] mx-auto  relative h-[25vh]">
        <div className="h-40 w-40  absolute -top-8">
          <Image className="h-full w-full object-contain" src="/logo.png" alt="logo" loading="eager" width={150} height={100} priority />
        </div>
        <Link href="/login" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 cursor-pointer px-8 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse  text-lg absolute right-5 top-4">
          Register
        </Link>
      </div>
      <section className="w-[95%] mx-auto flex items-center justify-between">
        <div className="flex flex-col gap-5 w-1/2 ">
          <h2 className="font-semibold text-4xl text-[#525252]">Library Management System</h2>
          <p className="text-base">Welcome to your digital library hub — built for both students and administrators.
            Easily browse, issue, and return books with just a few clicks.
            Our system streamlines book management, tracks user activity,
            and provides real-time updates to keep your library organized and efficient</p>
          <div className="flex items-center gap-5">
            <Link href="/admin" className="cursor-pointer px-6 py-3 bg-black text-white text-base rounded-lg">Admin Login</Link>
          </div>
        </div>

       <div className="w-1/2 flex items-center justify-center">
          <Image className="w-50 h-50" src="/section-1.jpeg" alt="section" loading="eager" width={150} height={100} priority />
        </div>
      </section>
      
    </>
  );
}
