import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us – JenVeda | Enterprise ERP Platform",
  description:
    "Learn about JenVeda's vision to revolutionise the way businesses operate with a comprehensive ERP solution built for MSMEs and enterprise scale.",
};

export default function AboutPage() {
  return <AboutClient />;
}
