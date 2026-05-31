import type { Metadata } from "next";
import { Suspense } from "react";
import GSTCalculatorClient from "./GSTCalculatorClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "GST Calculator India 2026 — Add or Remove GST Online Free",
  description: "Free GST calculator for India. Add or remove GST instantly with CGST, SGST & IGST breakdown. Supports all GST slabs: 5%, 12%, 18%, 28%. No login needed.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GST Calculator India",
  url: "https://paisabatao.in/gst-calculator",
  description: "Free GST calculator for India. Add or remove GST with CGST, SGST & IGST breakdown for all slabs.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function GSTCalculatorPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl m-4" />}>
        <GSTCalculatorClient />
      </Suspense>
    </>
  );
}
