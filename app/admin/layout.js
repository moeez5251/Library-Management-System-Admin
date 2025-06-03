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
                <div className="flex flex-row w-full h-[90%]">

                    <div className="w-[20%] flex flex-col py-5 gap-3   ">
                        <Sidebar />
                    </div>
                    <div className="w-[80%] bg-[#f1f3f8] p-2 rounded-xl overflow-y-auto">

                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
