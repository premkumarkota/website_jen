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
  title: {
    default: "JenVeda – Cutting-Edge ERP Software Solution",
    template: "%s | JenVeda",
  },
  description:
    "Streamline your operations, boost productivity, and drive profitability with JenVeda's comprehensive ERP software. HRMS, PMS, Accounting, and Inventory — all in one platform.",
  metadataBase: new URL("https://jenveda.com"),
  icons: {
    icon: "/new%20logo%201.png",
  },
  openGraph: {
    type: "website",
    siteName: "JenVeda",
    title: "JenVeda – Cutting-Edge ERP Software Solution",
    description:
      "Streamline your operations, boost productivity, and drive profitability with JenVeda's comprehensive ERP software. HRMS, PMS, Accounting, and Inventory — all in one platform.",
    url: "https://jenveda.com",
    images: [{ url: "/jenveda_dashboard.png", width: 1200, height: 630, alt: "JenVeda ERP Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JenVeda – Cutting-Edge ERP Software Solution",
    description:
      "Streamline your operations, boost productivity, and drive profitability with JenVeda's comprehensive ERP software.",
    images: ["/jenveda_dashboard.png"],
  },
  robots: {
    index: true,
    follow: true,
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
