import type { Metadata } from "next";
import FinanceToolsClient from "./FinanceToolsClient";

export const metadata: Metadata = {
  title: "Finance Tools – 5 Free Calculators for MSME Cash, Margin & Stock",
  description:
    "Five free finance calculators for MSMEs & traders. Find cash stuck in DSO, hidden profit leakage, unauthorized discount abuse, Tally consolidation lag and working-capital risk — real-time math, no sign-up.",
  alternates: { canonical: "/finance-tools" },
};

export default function FinanceToolsPage() {
  return <FinanceToolsClient />;
}
