import NextTopLoader from "nextjs-toploader";
import AuthProvider from "../authprovider/authprovider";
import "./globals.css";
import { Toaster } from "react-hot-toast";



export const metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: {
    default: "Time-App | Time Tracking & Productivity",
    template: "%s | Time-App",
  },
  description:
    "Cutting-edge timesheet web application to revolutionize how you manage employee work hours. Track attendance and productivity from anywhere.",
  keywords: [
    "time tracking",
    "timesheet",
    "productivity",
    "employee management",
    "attendance system",
  ],
  authors: [{ name: "tentwenty" }],
  openGraph: {
    title: "ticktock - Employee Time Tracking",
    description:
      "Effortlessly track and monitor employee work hours with our web-based solution.",
    url: "/",
    siteName: "ticktock",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "ticktock Time Tracking Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "",
    title: "ticktock - Time Tracking Simplified",
    description: "Monitor employee attendance and productivity from any device",
    images: [""],
  },

};
export default function RootLayout({ children }) {


  return (
    <AuthProvider>
      <html lang="en" className="scroll-smooth">
        <body>
          <NextTopLoader color="#ff0000" height={3} showSpinner={true} />

          <div className="">{children}</div>
          <Toaster position="top-right" reverseOrder={false} />
        </body>
      </html>
    </AuthProvider>
  );
}
