import type { Metadata } from "next";
import GSTInvoiceClient from "./GSTInvoiceClient";
export const metadata: Metadata = {
  title: "Free GST Invoice Generator India",
  description: "Create free GST invoices online with live preview. Download PDF instantly. Supports CGST, SGST, IGST. No registration needed.",
};
export default function GSTInvoicePage() { return <GSTInvoiceClient />; }
