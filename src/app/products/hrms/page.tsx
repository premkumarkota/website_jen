import type { Metadata } from "next";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "HRMS – JenVeda | Human Resource Management System",
  description:
    "Maximise work efficiency with JenVeda HRMS. Manage employees, leaves, claims, attendance, payroll, and advance payments — all in one platform.",
};

const features = [
  {
    title: "Employee Records, Always Organised",
    description:
      "Keep every employee's details, documents, and history in one place. No more hunting through files or spreadsheets.",
    items: [
      "Personal details, contact info, and documents — all in one profile",
      "Joining dates, probation periods, and exit tracking",
      "Educational qualifications and certifications on record",
      "Company asset allocation and tracking per employee",
    ],
  },
  {
    title: "Leave Approvals in One Click",
    description:
      "Employees apply for leave. Managers approve. Balances update automatically. No back-and-forth over WhatsApp.",
    items: [
      "Full leave history — applied, approved, rejected, and cancelled",
      "HR sets leave entitlements and designates approvers",
      "Supports medical, annual, special, and custom leave types",
      "Clear approval workflow from submission to confirmation",
    ],
  },
  {
    title: "Reimbursements Without the Drama",
    description:
      "Staff submit expense claims with supporting documents. Managers approve or reject in seconds. Everything is tracked and auditable.",
    items: [
      "Employees upload claims with supporting documents",
      "Manager review and one-click approval",
      "HR defines claim categories and spending limits",
      "Assign verifiers and approvers by team or department",
    ],
  },
  {
    title: "Payroll That Runs Itself",
    description:
      "Set up salary structures once. Every month, run payroll in minutes — with payslips auto-generated and PF/ESI calculations handled automatically.",
    items: [
      "Configure CTC, earnings percentages, and deduction rules once",
      "Covers basic salary, allowances, bonuses, and PF contributions",
      "Group-wise payroll processing with automatic calculations",
      "Auto-generated monthly payslips with full salary breakdown",
    ],
  },
  {
    title: "Know Who's In, Right Now",
    description:
      "Employees check in from their phone. Managers track attendance live. No more physical registers or end-of-day guesswork.",
    items: [
      "Mobile check-in and check-out with location tracking",
      "Bulk attendance marking for managers across teams",
      "Real-time view of who is present, absent, or on leave",
      "Complete attendance history with present and absent records",
    ],
  },
  {
    title: "Salary Advances Without the Paperwork",
    description:
      "Employees request salary advances online. You approve in one click. It auto-adjusts in the next payroll cycle.",
    items: [
      "Employees submit advance requests through self-service",
      "Manager approves or rejects with a single click",
      "Approved advances automatically deduct from next payroll",
    ],
  },
];

export default function HRMSPage() {
  return (
    <ProductPageLayout
      badge="HR & Payroll"
      title="Manage Your People."
      titleAccent="Pay Them Right, Every Time."
      subtitle="Human Resource Management System"
      description="JenVeda HRMS handles attendance, leaves, payroll, and compliance — so your HR team spends less time on paperwork and more time on people."
      features={features}
      ctaText="Book a Free Demo"
      accentColor="#6D28D9"
    />
  );
}
