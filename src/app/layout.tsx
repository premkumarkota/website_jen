import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/providers/SmoothScroll";
import Spotlight from "@/components/Spotlight";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWrapper from "@/components/ChatbotWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JenVeda – Cutting-Edge ERP Software Solution",
  description:
    "Streamline your operations, boost productivity, and drive profitability with JenVeda's comprehensive ERP software. HRMS, PMS, Accounting, and Inventory — all in one platform.",
  icons: {
    icon: "/new%20logo%201.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Animated film grain */}
        <div className="grain" aria-hidden />

        {/* Mouse spotlight */}
        <Spotlight />

        <SmoothScroll>
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ChatbotWrapper />
        </SmoothScroll>
      </body>
    </html>
  );
}
