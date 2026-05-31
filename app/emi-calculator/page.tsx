import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "./EMICalculatorClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "EMI Calculator India 2026 — Home, Car & Personal Loan EMI",
  description: "Free EMI calculator India 2026. Calculate monthly EMI for Home Loan, Car Loan, Personal & Education Loan. Instant amortization schedule with total interest breakdown.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EMI Calculator India",
  url: "https://paisabatao.in/emi-calculator",
  description: "Free EMI calculator for Home, Car, Personal and Education loans in India. Instant monthly EMI with amortization schedule.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function EMICalculatorPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Suspense><EMICalculatorClient /></Suspense>
    </>
  );
}
