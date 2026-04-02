import type { Metadata } from "next";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "Accounting – JenVeda | Accounting Management Solution",
  description:
    "Streamline your accounting operations with JenVeda. Sales, purchases, chart of accounts, manual journals, and comprehensive financial reports.",
};

const features = [
  {
    title: "Sales Management",
    description:
      "Complete sales workflow from sales orders to invoices, payment receipts, delivery challans, and credit notes.",
    items: [
      "Sales orders — formal documents confirming product sale details",
      "Invoices — records of sales with item and customer information",
      "Payment receive — documents customer settlements and deposit locations",
      "Delivery challan — tracks goods movement to specific locations",
      "Credit notes — adjustments for returns, errors, or price changes",
    ],
  },
  {
    title: "Purchase Management",
    description:
      "End-to-end purchase tracking from purchase orders to bills, receiving, payments, debit notes, and expense management.",
    items: [
      "Purchase orders — formal requests to suppliers",
      "Bills — detailed documents of goods/services with costs",
      "Purchase receive — verifies received items against orders",
      "Payment made — tracks outgoing payments",
      "Debit notes and expense tracking",
    ],
  },
  {
    title: "Accounts",
    description:
      "Record financial events through manual journals for adjustments and accuracy, with a complete chart of accounts and mapping system.",
    items: [
      "Manual journals — record events outside regular transactions",
      "Chart of accounts — financial accounts grouped into categories",
      "COA mapping — links accounts to types, categories, and subcategories",
      "Opening balance — initial balance setup for new periods",
    ],
  },
  {
    title: "Financial Reports",
    description:
      "Comprehensive financial statements including profit & loss, balance sheet, and cash flow analysis for informed decision-making.",
    items: [
      "Horizontal P&L, Balance Sheet, Cash Flow statements",
      "Sales reports by customer and by item",
      "Purchase reports by vendor and by item",
    ],
  },
  {
    title: "Receivables & Payables",
    description:
      "Track accounts receivable and payable with aging summaries and detailed breakdowns for complete financial visibility.",
    items: [
      "Accounts receivables aging summary",
      "Payables aging summary and details",
      "DayBook for accountants",
    ],
  },
  {
    title: "Expense Tracking",
    description:
      "Track all business expenses accumulated during operations with categorization, approval workflows, and reporting.",
    items: [
      "Categorized expense recording",
      "Business operation cost tracking",
      "Integration with purchase and accounts modules",
    ],
  },
];

export default function AccountingPage() {
  return (
    <ProductPageLayout
      badge="Accounting Management"
      title="Streamline Your Operations With"
      titleAccent="Accounting Excellence"
      subtitle="Accounting Management Solution"
      description="Manage sales, purchases, accounts, and generate comprehensive financial reports — all from one powerful accounting platform."
      features={features}
      ctaText="Get Started"
      accentColor="#D1008F"
    />
  );
}
