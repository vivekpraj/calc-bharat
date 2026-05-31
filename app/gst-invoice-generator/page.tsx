import type { Metadata } from "next";
import GSTInvoiceClient from "./GSTInvoiceClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free GST Invoice Generator India 2026 — Download PDF Instantly",
  description: "Create free GST invoices online with live preview. Download PDF instantly. Supports CGST, SGST, IGST for all business types. No registration needed.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free GST Invoice Generator",
  url: "https://paisabatao.in/gst-invoice-generator",
  description: "Create free GST invoices with live preview and instant PDF download. Supports CGST, SGST, IGST.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function GSTInvoicePage() {
  return (
    <>
      <JsonLd data={schema} />
      <GSTInvoiceClient />
    </>
  );
}
