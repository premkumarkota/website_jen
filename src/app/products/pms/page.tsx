import type { Metadata } from "next";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "PMS – JenVeda | Project Management Software",
  description:
    "Empower your projects with JenVeda PMS. Manage business partners, opportunities, quotations, project creation, time logs, and reports.",
};

const features = [
  {
    title: "Business Partners",
    description:
      "Manage customer and vendor relationships by maintaining company details, addresses, and key contacts for effective communication.",
    items: [
      "Customer and vendor relationship management",
      "Company details and address management",
      "Key contacts directory for communication",
    ],
  },
  {
    title: "Opportunities",
    description:
      "Streamline lead conversion and estimate new projects seamlessly with detailed opportunity tracking including bid dates, penalties, and revenue projections.",
    items: [
      "Lead conversion pipeline management",
      "Bid date and penalty tracking",
      "Revenue estimation and projections",
    ],
  },
  {
    title: "Quotations",
    description:
      "Create professional price lists for products and services with cost breakdowns, payment information, and reusable templates.",
    items: [
      "Price lists with cost and payment information",
      "Created using pre-designed templates",
      "Professional and consistent formatting",
    ],
  },
  {
    title: "Project Creation",
    description:
      "Begin projects by entering customer details, project amounts, start and end dates, and milestones for clear project planning.",
    items: [
      "Customer details and project amounts",
      "Start/end dates and milestone tracking",
      "Clear project planning structure",
    ],
  },
  {
    title: "Time Logs",
    description:
      "Record task time by selecting project, team members, dates, and milestones for accurate work hour tracking and reporting.",
    items: [
      "Project and team member selection",
      "Date and milestone-based tracking",
      "Accurate work hour reporting",
    ],
  },
  {
    title: "Products & Services",
    description:
      "Add products and services with tax applicability and measurement units. Manage stock levels and pricing from a central dashboard.",
    items: [
      "Tax applicability and measurement units",
      "Stock level management",
      "Centralized pricing dashboard",
    ],
  },
  {
    title: "Templates",
    description:
      "Pre-designed structures for invoices, opportunities, and quotations ensuring consistency and professionalism across all documents.",
    items: [
      "Invoice templates",
      "Opportunity and quotation templates",
      "Consistent professional formatting",
    ],
  },
  {
    title: "Reports",
    description:
      "Comprehensive reports displaying raw materials, services used, time spent, project costs, and remaining stock to inform decision-making.",
    items: [
      "Raw materials and services tracking",
      "Time spent and project cost analysis",
      "Remaining stock overview",
    ],
  },
];

export default function PMSPage() {
  return (
    <ProductPageLayout
      badge="Project Management"
      title="Empower Your Projects With"
      titleAccent="Project Management Mastery"
      subtitle="Project Management Software"
      description="Manage business partners, opportunities, quotations, project creation, time logs, and comprehensive reports — all in one integrated platform."
      features={features}
      ctaText="Get Started"
      accentColor="#1D4ED8"
    />
  );
}
