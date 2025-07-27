import AdminDashboard from "./components/navbar";
import Sidebar from "./components/sidebar";

export const metadata = {
    title: "Admin Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <div>

            <AdminDashboard />
            <div className="flex flex-row w-full h-[83%]">

                <div className="sidebar fixed top-0 -left-full w-full h-screen sm:w-[80%] md:w-1/2 bg-white z-10 xl:w-[20%] xl:relative xl:left-0 xl:bg-white transition-all  flex flex-col py-3 gap-3  overflow-y-auto ">
                    <Sidebar />
                </div>
                <div className="xl:w-[80%] w-[95%] mx-auto bg-[#f1f3f8] p-2 rounded-xl overflow-y-auto min-h-[90vh] sm:min-h-auto">

                    {children}
                </div>
            </div>
            <div className="flex  justify-between mx-2 sm:mx-8 py-2 items-center text-xs sm:text-sm text-gray-500">
                <div className="font-semibold">Aspire System - LMS</div>
                <div className="font-semibold">&copy; 2025 Aspire Systems. All rights reserved</div>
            </div>
        </div>
    );
}
