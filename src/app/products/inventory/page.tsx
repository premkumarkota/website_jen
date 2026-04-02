import type { Metadata } from "next";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "Inventory – JenVeda | Inventory Management Solution",
  description:
    "Effortlessly track your inventory with JenVeda. Inventory adjustments, stock transfers, stock in hand, stock summary, and project stock reports.",
};

const features = [
  {
    title: "Inventory Adjustment",
    description:
      "Adjust inventory quantities accurately to address issues like damaged goods or errors. Ensures precise stock levels through recorded data modifications.",
    items: [
      "Accurate quantity adjustments for discrepancies",
      "Damaged goods and error corrections",
      "Recorded modifications for audit trails",
      "Financial accuracy and accounting integration",
    ],
  },
  {
    title: "Stock Transfer",
    description:
      "Move inventory within company locations to fulfill orders, balance stock, or enhance distribution across departments, branches, or warehouses.",
    items: [
      "Inter-location inventory movement",
      "Order fulfillment and stock balancing",
      "Cross-department and branch transfers",
      "Complete transfer tracking and accounting",
    ],
  },
  {
    title: "Stock in Hand",
    description:
      "Full visibility into current inventory quantities for each item. Monitor stock levels in real-time to prevent shortages or excess inventory.",
    items: [
      "Real-time stock level monitoring",
      "Item-wise quantity tracking",
      "Shortage and excess prevention",
      "Effective inventory management support",
    ],
  },
  {
    title: "Stock Summary",
    description:
      "Detailed overview of inventory including total value, turnover, and item summaries. Supports management decisions on reordering and identifying slow-moving items.",
    items: [
      "Total inventory value and turnover",
      "Item-wise summary reports",
      "Reorder point identification",
      "Slow-moving and obsolete item detection",
    ],
  },
  {
    title: "Project Stock Report",
    description:
      "Track stock allocated to specific projects, monitor consumption, and ensure materials are available when needed for project execution.",
    items: [
      "Project-wise stock allocation",
      "Material consumption tracking",
      "Availability forecasting for projects",
    ],
  },
];

export default function InventoryPage() {
  return (
    <ProductPageLayout
      badge="Inventory Management"
      title="Effortlessly Track Your Inventory With"
      titleAccent="Smart Management"
      subtitle="Inventory Management Solution"
      description="Manage stock adjustments, transfers, real-time stock levels, comprehensive summaries, and project-specific stock reports — all in one place."
      features={features}
      ctaText="Get Started"
      accentColor="#8B5CF6"
    />
  );
}
