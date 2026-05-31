import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Car Loan EMI Calculator 2026 — Vehicle & Two-Wheeler Loan EMI",
  description: "Free car loan EMI calculator India 2026. Calculate monthly EMI for new and used car loans. Compare interest rates and get instant EMI breakdown.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Car Loan EMI Calculator",
  url: "https://paisabatao.in/car-loan-emi-calculator",
  description: "Free car loan EMI calculator. Calculate monthly EMI for new and used car loans with interest breakdown.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function CarLoanEMIPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Suspense>
        <EMICalculatorClient defaultLoanType={1} pageTitle="Car Loan EMI Calculator" pageDesc="Calculate monthly EMI for your car or two-wheeler loan at current interest rates." />
      </Suspense>
    </>
  );
}
