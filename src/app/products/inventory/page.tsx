import type { Metadata } from "next";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "Inventory – JenVeda | Inventory Management Solution",
  description:
    "Effortlessly track your inventory with JenVeda. Inventory adjustments, stock transfers, stock in hand, stock summary, and project stock reports.",
};

const features = [
  {
    title: "Fix Stock Errors Instantly",
    description:
      "Damaged goods, counting mistakes, supplier short-shipments — correct them immediately with a proper audit trail. Your books stay accurate.",
    items: [
      "Adjust quantities for damaged goods or counting discrepancies",
      "Corrections are recorded with reason and date",
      "Maintains audit trail for every adjustment",
      "Automatically syncs with accounting for financial accuracy",
    ],
  },
  {
    title: "Move Stock Across Branches with Ease",
    description:
      "Transfer materials between locations in seconds. Track every movement so nothing gets lost between warehouses or sites.",
    items: [
      "Transfer stock between branches, departments, or warehouses",
      "Fulfil orders from the right location automatically",
      "Balance stock across locations to avoid shortages",
      "Every transfer recorded for complete traceability",
    ],
  },
  {
    title: "Live Stock Levels, Always",
    description:
      "See exactly how much stock you have, item by item, right now. Prevent stockouts before they disrupt your operations.",
    items: [
      "Real-time stock quantities per item and location",
      "Item-wise tracking with current availability",
      "Get alerts before stock runs critically low",
      "Supports better purchasing and reorder decisions",
    ],
  },
  {
    title: "Your Full Inventory Picture",
    description:
      "Total stock value, turnover, slow-moving items — everything you need to make smarter buying decisions and free up working capital.",
    items: [
      "Total inventory value and turnover at a glance",
      "Item-wise summary with quantities and values",
      "Identify items approaching reorder points",
      "Spot slow-moving and obsolete stock before it piles up",
    ],
  },
  {
    title: "Track Materials Per Project",
    description:
      "Know exactly what materials are allocated to each project. Track consumption and flag shortfalls early — before work gets delayed.",
    items: [
      "Allocate stock to specific projects",
      "Monitor material consumption as the project progresses",
      "Flag shortfalls early to avoid project delays",
    ],
  },
];

export default function InventoryPage() {
  return (
    <ProductPageLayout
      badge="Stock & Inventory"
      title="Always Know What's"
      titleAccent="In Stock."
      subtitle="Inventory Management Solution"
      description="JenVeda Inventory gives you real-time visibility into stock levels, movements, and project materials — so you never run short or overstock."
      features={features}
      ctaText="Book a Free Demo"
      accentColor="#8B5CF6"
    />
  );
}
