import type { Metadata } from "next";
import IndustriesClient from "./IndustriesClient";

export const metadata: Metadata = {
  title: "Industries – JenVeda | Built for Indian Businesses",
  description:
    "JenVeda is purpose-built for Automobile Dealerships, SMEs & MSMEs, Educational Institutions, and Multi-branch Enterprises. See how we fit your industry.",
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
