import { Lato } from "next/font/google";
import "./globals.css";


const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],

});

export const metadata = {
  title: "Library Management System",
  description: "Library Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
