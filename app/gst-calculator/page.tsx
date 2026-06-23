import type { Metadata } from "next";
import { Suspense } from "react";
import GSTCalculatorClient from "./GSTCalculatorClient";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is GST?", a: "GST (Goods and Services Tax) is a unified indirect tax levied on the supply of goods and services across India. It replaced multiple taxes like VAT, service tax, and excise duty. GST has five slabs: 0%, 5%, 12%, 18%, and 28%, applied based on the type of good or service." },
  { q: "What are the GST tax slabs in India?", a: "India has four main GST slabs: 5% (essential goods like packaged food, medicines), 12% (processed food, business class air tickets), 18% (most goods and services like electronics, restaurants), and 28% (luxury items like cars, tobacco, aerated drinks). Some items like fresh vegetables, milk, and eggs are exempt (0%)." },
  { q: "What is the difference between CGST, SGST and IGST?", a: "CGST (Central GST) and SGST (State GST) are levied on intra-state transactions and are split equally between the Centre and State. IGST (Integrated GST) is levied on inter-state transactions and imports, collected entirely by the Centre. For example, an 18% GST within Maharashtra = 9% CGST + 9% SGST." },
  { q: "How do I calculate GST on a price?", a: "To add GST: GST Amount = Original Price × GST Rate / 100. Total Price = Original Price + GST Amount. To remove GST from an inclusive price: Original Price = Inclusive Price × 100 / (100 + GST Rate). GST Amount = Inclusive Price − Original Price." },
  { q: "Who needs to register for GST in India?", a: "GST registration is mandatory if your annual turnover exceeds ₹40 lakh for goods (₹20 lakh for services, ₹10 lakh for North-Eastern states). It is also mandatory for interstate suppliers, e-commerce operators, and those making taxable supplies regardless of turnover." },
  { q: "What is the GST composition scheme?", a: "The composition scheme is for small businesses with turnover up to ₹1.5 crore (₹75 lakh for services). They pay a flat tax rate (1% for manufacturers, 5% for restaurants, 6% for services) instead of regular GST slabs and file quarterly returns instead of monthly." },
];

export const metadata: Metadata = {
  title: "GST Calculator India 2026 — Add or Remove GST Online Free",
  description: "Free GST calculator for India. Add or remove GST instantly with CGST, SGST & IGST breakdown. Supports all GST slabs: 5%, 12%, 18%, 28%. No login needed.",
  alternates: { canonical: "https://paisabatao.in/gst-calculator" },
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
      <FAQSection faqs={faqs} />
    </>
  );
}
