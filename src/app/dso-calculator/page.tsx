import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import DsoCalculatorClient from "./DsoCalculatorClient";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dso-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-dso-display",
});

export const metadata: Metadata = {
  title: "DSO Calculator – Find Cash Trapped in Your Business",
  description:
    "Free DSO calculator for MSMEs. Calculate your Days Sales Outstanding, cash gap vs supplier terms, and the annual cost of trapped receivables in 30 seconds.",
  alternates: { canonical: "/dso-calculator" },
};

export default function DsoCalculatorPage() {
  return (
    <div className={`${inter.variable} ${poppins.variable}`}>
      <DsoCalculatorClient />
    </div>
  );
}
