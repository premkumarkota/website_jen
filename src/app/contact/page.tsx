import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us – JenVeda | Get in Touch",
  description:
    "Reach out to JenVeda Technologies. Request a demo, ask questions, or get support for your ERP implementation.",
};

export default function ContactPage() {
  return <ContactClient />;
}
