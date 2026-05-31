import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Personal Loan EMI Calculator India 2026 — Instant EMI Results",
  description: "Free personal loan EMI calculator India 2026. Calculate monthly EMI, total interest paid and full repayment schedule for any personal loan amount and tenure.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Personal Loan EMI Calculator",
  url: "https://paisabatao.in/personal-loan-emi-calculator",
  description: "Free personal loan EMI calculator. Calculate monthly EMI, total interest and repayment schedule.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function PersonalLoanEMIPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Suspense>
        <EMICalculatorClient defaultLoanType={2} pageTitle="Personal Loan EMI Calculator" pageDesc="Calculate EMI for personal loans. Compare total interest across different loan amounts and tenures." />
      </Suspense>
    </>
  );
}
