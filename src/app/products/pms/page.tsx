import type { Metadata } from "next";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "PMS – JenVeda | Project Management Software",
  description:
    "Empower your projects with JenVeda PMS. Manage business partners, opportunities, quotations, project creation, time logs, and reports.",
};

const features = [
  {
    title: "Clients & Vendors in One Place",
    description:
      "Maintain contacts, addresses, and key details for all your customers and suppliers. No more digging through emails or notebooks.",
    items: [
      "Customer and vendor profiles with full contact history",
      "Company details, addresses, and communication records",
      "Quick access to key contacts per partner",
    ],
  },
  {
    title: "Turn Enquiries into Signed Projects",
    description:
      "Track every lead, bid date, and revenue estimate. Never miss a follow-up or lose a proposal in your inbox.",
    items: [
      "Lead-to-project conversion pipeline",
      "Bid dates, penalties, and submission deadlines tracked",
      "Revenue estimates and project value projections",
    ],
  },
  {
    title: "Professional Quotes, Sent Fast",
    description:
      "Build accurate quotations using ready-made templates. Include pricing, payment terms, and GST — in minutes, not hours.",
    items: [
      "Price lists with itemised costs and payment terms",
      "Pre-designed templates for consistent formatting",
      "GST applicability built into every quotation",
    ],
  },
  {
    title: "Set Projects Up for Success",
    description:
      "Define scope, timelines, budgets, and milestones upfront. Everyone knows what needs to happen — and when.",
    items: [
      "Customer details and agreed project value on record",
      "Start and end dates with milestone tracking",
      "Clear project structure before work begins",
    ],
  },
  {
    title: "Track Where Your Team's Time Goes",
    description:
      "Employees log hours against projects and milestones. You know exactly what's being worked on — and what's falling behind.",
    items: [
      "Log hours by project, team member, and milestone",
      "Date-based tracking for accurate billing and reporting",
      "Work hour reports by project or team member",
    ],
  },
  {
    title: "Your Rate Card, Always Ready",
    description:
      "Maintain a master list of services, materials, and pricing — with GST applicability built in. Use it across all quotations and invoices.",
    items: [
      "Products and services with tax applicability set",
      "Measurement units and pricing in one place",
      "Feeds directly into quotations and project billing",
    ],
  },
  {
    title: "Consistent, Professional Documents",
    description:
      "Use ready-made templates for invoices, quotations, and proposals. Look professional every time, without extra effort.",
    items: [
      "Invoice templates ready to use",
      "Opportunity and quotation templates for quick turnaround",
      "Consistent formatting across all client-facing documents",
    ],
  },
  {
    title: "Full Project Cost Visibility",
    description:
      "See materials used, hours logged, costs incurred, and what's left — all per project. Make informed calls before it's too late.",
    items: [
      "Raw materials and services used per project",
      "Hours logged and project cost breakdown",
      "Remaining stock and budget overview in real time",
    ],
  },
];

export default function PMSPage() {
  return (
    <ProductPageLayout
      badge="Project Management"
      title="Deliver Projects on Time,"
      titleAccent="Every Time."
      subtitle="Project Management Software"
      description="JenVeda PMS keeps your projects on track — from the first quote to the final invoice. Know where your team's time goes and control project costs in real time."
      features={features}
      ctaText="Book a Free Demo"
      accentColor="#1D4ED8"
    />
  );
}
