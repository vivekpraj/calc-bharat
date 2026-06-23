import type { Metadata } from "next";
import GSTInvoiceClient from "./GSTInvoiceClient";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What details are mandatory on a GST invoice?", a: "A GST invoice must contain: GSTIN of supplier, invoice number and date, name and address of supplier and recipient, HSN/SAC code, description and quantity of goods/services, taxable value, GST rate, CGST/SGST/IGST amounts separately, and total invoice value. For inter-state supplies, IGST applies; for intra-state, CGST + SGST." },
  { q: "When must a GST invoice be issued?", a: "For goods: Before or at the time of delivery. For services: Within 30 days of service completion (45 days for banking/insurance). For advance payments: A Receipt Voucher must be issued. Failure to issue timely invoices can attract penalties under GST law." },
  { q: "What is the difference between a tax invoice and a bill of supply?", a: "A Tax Invoice is issued when selling taxable goods/services and includes GST breakdown (CGST/SGST/IGST). A Bill of Supply is issued when selling exempt goods/services or when the seller is under the Composition Scheme — it does not show GST separately as GST cannot be charged on such supplies." },
  { q: "Is e-invoicing mandatory in India?", a: "E-invoicing (electronic invoicing through the GST portal) is mandatory for businesses with annual turnover above ₹5 crore from August 2023. For businesses below this threshold, regular GST invoices are sufficient. E-invoices generate an IRN (Invoice Reference Number) and QR code from the government portal." },
  { q: "Can I use this GST invoice generator for my business?", a: "Yes, PaisaBatao's GST Invoice Generator creates professional invoices with all mandatory fields including GSTIN, HSN/SAC codes, CGST/SGST/IGST breakdown, and PDF download. It is free to use with no registration required. It is suitable for freelancers, small businesses, and consultants for generating invoices for their clients." },
];

export const metadata: Metadata = {
  title: "Free GST Invoice Generator India 2026 — Download PDF Instantly",
  description: "Create free GST invoices online with live preview. Download PDF instantly. Supports CGST, SGST, IGST for all business types. No registration needed.",
  alternates: { canonical: "https://paisabatao.in/gst-invoice-generator" },
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
      <FAQSection faqs={faqs} />
    </>
  );
}
