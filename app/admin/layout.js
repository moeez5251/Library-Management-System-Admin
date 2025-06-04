import AdminDashboard from "./components/navbar";
import Sidebar from "./components/sidebar";

export const metadata = {
    title: "Admin Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
            >
                <AdminDashboard />
                <div className="flex flex-row w-full h-[83%]">

                    <div className="w-[20%] flex flex-col py-3 gap-3   ">
                        <Sidebar />
                    </div>
                    <div className="w-[80%] bg-[#f1f3f8] p-2 rounded-xl overflow-y-auto">

                        {children}
                    </div>
                </div>
                <div className="flex  justify-between mx-8 py-2 items-center text-sm text-gray-500">
                    <div className="font-semibold">Aspire System - LMS</div>
                    <div className="font-semibold">&copy; 2025 Aspire Systems. All rights reserved</div>
                </div>
            </body>
        </html>
    );
}
