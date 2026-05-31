import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator 2026 — Monthly Housing Loan Instalment",
  description: "Free home loan EMI calculator India 2026. Calculate monthly EMI for housing loans at SBI, HDFC, ICICI rates. Get full amortization schedule and prepayment analysis.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Home Loan EMI Calculator",
  url: "https://paisabatao.in/home-loan-emi-calculator",
  description: "Free home loan EMI calculator. Calculate monthly EMI for housing loans at any interest rate with amortization schedule.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function HomeLoanEMIPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Suspense>
        <EMICalculatorClient defaultLoanType={0} pageTitle="Home Loan EMI Calculator" pageDesc="Calculate monthly EMI for your home loan. Includes amortization schedule and prepayment analysis." />
      </Suspense>
    </>
  );
}
