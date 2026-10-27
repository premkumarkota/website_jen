import type { Metadata } from "next";
import ProductVideos from "@/components/ProductVideos";

export const metadata: Metadata = {
  title: "Product Videos – See JenVeda HRMS, Accounting, PMS & Inventory",
  description:
    "Watch JenVeda in action: HRMS and payroll, GST invoicing and accounting, project management and inventory — feature walkthroughs and workflows.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return (
    <main className="pt-20">
      <ProductVideos />
    </main>
  );
}
