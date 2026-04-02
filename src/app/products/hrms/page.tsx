import type { Metadata } from "next";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "HRMS – JenVeda | Human Resource Management System",
  description:
    "Maximise work efficiency with JenVeda HRMS. Manage employees, leaves, claims, attendance, payroll, and advance payments — all in one platform.",
};

const features = [
  {
    title: "Employee Management",
    description:
      "Efficiently manage employee records including personal details, employment information, asset management, and entitlement settings.",
    items: [
      "Personal information — name, gender, DOB, contact details",
      "Employment tracking — joining dates, probation, resignation, notice periods",
      "Qualifications — educational backgrounds with institution details",
      "Asset management — categorization and tracking of organizational resources",
    ],
  },
  {
    title: "Leave Management",
    description:
      "Efficiently manage leave balances, requests, approvals, and recommendations through streamlined leave management.",
    items: [
      "Leave history — applied, recommended, approved, rejected, cancelled",
      "Leave entitlement — HR admins customize entitlements and designate approvers",
      "Leave types — medical, annual, special and custom categories",
      "Workflow — structured process from submission through approval",
    ],
  },
  {
    title: "Claims Management",
    description:
      "Systematic handling of reimbursement claims including submission, review, approval, and processing.",
    items: [
      "Apply claims with supporting documentation",
      "Manager review and approval functionality",
      "HR creates claim type categories and setup",
      "Set limits and assign verifiers/approvers",
    ],
  },
  {
    title: "Payroll Management",
    description:
      "Configure CTC, earnings, deductions, and run payroll with automatic calculations. Generate payslips summarizing earnings, deductions, and net pay.",
    items: [
      "Payroll entitlement — configure CTC and earnings percentages",
      "Pay components — basic salary, allowances, bonuses, PF contributions",
      "Run payroll — group-wise processing with automatic calculations",
      "Payslips — monthly documents with complete salary breakdown",
    ],
  },
  {
    title: "Attendance Management",
    description:
      "Track employee attendance with mobile check-in, bulk operations, and comprehensive attendance history.",
    items: [
      "Mobile check-in/check-out — location-based attendance recording",
      "Bulk check-in/check-out — manager marks attendance for multiple employees",
      "Supervisor tracking of reporting employees",
      "Attendance history with present and absent days",
    ],
  },
  {
    title: "Advance Payment",
    description:
      "Employees can request salary advances through self-service, while managers review, approve, or reject requests seamlessly.",
    items: [
      "Self-service advance request submission",
      "Manager approval workflow",
      "Integration with payroll for deductions",
    ],
  },
];

export default function HRMSPage() {
  return (
    <ProductPageLayout
      badge="Human Resource Management"
      title="Maximise Work Efficiency With"
      titleAccent="HRMS Excellence"
      subtitle="Human Resource Management System"
      description="Manage employee records, leaves, claims, attendance, payroll, and advance payments — all from one unified platform built for enterprise scale."
      features={features}
      ctaText="Get Started"
      accentColor="#6D28D9"
    />
  );
}
