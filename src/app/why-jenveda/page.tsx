import type { Metadata } from "next";
import WhyJenVedaClient from "./WhyJenVedaClient";

export const metadata: Metadata = {
  title: "Why JenVeda – Clarity Over Complexity",
  description:
    "See why Indian businesses are moving from fragmented, manual systems to JenVeda. Real comparisons. Real outcomes.",
};

export default function WhyJenVedaPage() {
  return <WhyJenVedaClient />;
}
