import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Education Loan EMI Calculator India 2026 — Student Loan EMI",
  description: "Free education loan EMI calculator India 2026. Calculate student loan EMI with moratorium period. Plan your repayment schedule after course completion.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Education Loan EMI Calculator",
  url: "https://paisabatao.in/education-loan-emi-calculator",
  description: "Free education loan EMI calculator. Calculate student loan EMI with moratorium period consideration.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function EducationLoanEMIPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Suspense>
        <EMICalculatorClient defaultLoanType={3} pageTitle="Education Loan EMI Calculator" pageDesc="Calculate EMI for education loans. Plan your student loan repayment after the course completion." />
      </Suspense>
    </>
  );
}
