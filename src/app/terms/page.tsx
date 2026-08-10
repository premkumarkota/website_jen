import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service – JenVeda | Platform Usage Terms",
  description:
    "Read the Terms of Service governing your use of JenVeda's ERP platform, websites, and related services.",
};

export default function TermsPage() {
  return <TermsClient />;
}
