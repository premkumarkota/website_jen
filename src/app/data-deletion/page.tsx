import type { Metadata } from "next";
import DataDeletionClient from "./DataDeletionClient";

export const metadata: Metadata = {
  title: "Data Deletion Instructions",
  description:
    "How you or your business can request deletion of the data JenVeda holds, including your WhatsApp Business Account connection details.",
};

export default function DataDeletionPage() {
  return <DataDeletionClient />;
}
