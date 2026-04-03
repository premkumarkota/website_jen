import type { Metadata } from "next";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "Accounting – JenVeda | Accounting Management Solution",
  description:
    "Streamline your accounting operations with JenVeda. Sales, purchases, chart of accounts, manual journals, and comprehensive financial reports.",
};

const features = [
  {
    title: "Raise Invoices, Get Paid Faster",
    description:
      "Create GST invoices, track payments, and manage delivery challans — all from one screen. Always know who owes you money.",
    items: [
      "Sales orders and GST-compliant invoices in minutes",
      "Track customer payments and outstanding balances",
      "Delivery challans to track goods movement",
      "Credit notes for returns, errors, or price revisions",
    ],
  },
  {
    title: "Track Every Rupee You Spend",
    description:
      "From purchase orders to vendor payments, everything is recorded and accounted for. No missing bills, no surprise expenses.",
    items: [
      "Purchase orders sent to suppliers with a few clicks",
      "Bills and goods receipt tracked against every order",
      "All outgoing payments logged and reconciled",
      "Debit notes and expense records in one place",
    ],
  },
  {
    title: "Your Books, Always Balanced",
    description:
      "Set up your chart of accounts once. Manual entries, adjustments, and opening balances stay clean and organised — no CA rework needed.",
    items: [
      "Manual journals for adjustments outside regular transactions",
      "Chart of accounts grouped into clear categories",
      "Account mapping linked to types and subcategories",
      "Opening balance setup for clean period starts",
    ],
  },
  {
    title: "Know Your Numbers in Seconds",
    description:
      "P&L, Balance Sheet, Cash Flow — ready anytime. Walk into CA meetings or investor conversations fully prepared.",
    items: [
      "Horizontal P&L, Balance Sheet, and Cash Flow statements",
      "Sales reports by customer and by item",
      "Purchase reports by vendor and by item",
    ],
  },
  {
    title: "Who Owes You. What You Owe.",
    description:
      "See aging summaries at a glance. Follow up on overdue payments before they become a cash flow problem.",
    items: [
      "Receivables aging summary — see overdue invoices clearly",
      "Payables aging — know what you owe and when it's due",
      "DayBook view for your accountant's daily reconciliation",
    ],
  },
  {
    title: "Every Business Expense, Accounted For",
    description:
      "Log expenses as they happen. Categorise, approve, and report — with no surprises at month-end.",
    items: [
      "Categorised expense recording by type and department",
      "Business operation costs tracked throughout the year",
      "Fully integrated with purchase and accounts modules",
    ],
  },
];

export default function AccountingPage() {
  return (
    <ProductPageLayout
      badge="Accounts & Finance"
      title="Keep Your Books Clean."
      titleAccent="GST-Ready, Always."
      subtitle="Accounting Management Solution"
      description="JenVeda Accounting handles your invoices, purchases, GST, and financial reports — so you're always audit-ready and in control of your cash flow."
      features={features}
      ctaText="Book a Free Demo"
      accentColor="#D1008F"
    />
  );
}
