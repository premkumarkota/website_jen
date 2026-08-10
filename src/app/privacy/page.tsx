import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read JenVeda's Privacy Policy to understand how we collect, use, store, and protect your personal and business data across our ERP platform.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
