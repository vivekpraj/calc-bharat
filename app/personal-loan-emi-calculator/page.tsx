import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is the current personal loan interest rate in India in 2026?", a: "Personal loan interest rates in 2026 range from 10.5%–24% p.a. Major banks: SBI from 11%, HDFC Bank from 10.85%, ICICI Bank from 10.85%, Axis Bank from 11%. NBFCs and fintech lenders may charge 16–30%. The rate depends heavily on your CIBIL score, income, and employer category." },
  { q: "What is the maximum personal loan amount I can get?", a: "Personal loan amounts typically range from ₹50,000 to ₹40 lakh. Government bank employees and PSU employees can get up to ₹25–40 lakh. Private sector employees typically get up to ₹15–25 lakh. The eligible amount is based on your net monthly income — EMI should not exceed 40–50% of monthly income." },
  { q: "Can I get a personal loan with a low CIBIL score?", a: "A CIBIL score below 650 makes it difficult to get a personal loan from banks. NBFCs and fintech lenders may approve loans for scores of 600–650 but at higher interest rates (18–30%). To improve your score: pay all EMIs on time, reduce credit card utilisation, and avoid multiple loan applications simultaneously." },
  { q: "What documents are needed for a personal loan?", a: "Typically required: Identity proof (Aadhaar/PAN), Address proof, Last 3 months salary slips, Last 6 months bank statements, Form 16 or latest ITR, and Employment proof (offer letter/employment certificate). Self-employed individuals need ITR for last 2 years and business proof." },
  { q: "How quickly can I get a personal loan?", a: "Pre-approved personal loans from your existing bank can be disbursed within hours. For new applications, online lenders and fintech apps disburse within 24–48 hours. Traditional banks take 3–7 working days. Having all documents ready and a good credit score speeds up the process significantly." },
];

export const metadata: Metadata = {
  title: "Personal Loan EMI Calculator India 2026 — Instant EMI Results",
  description: "Free personal loan EMI calculator India 2026. Calculate monthly EMI, total interest paid and full repayment schedule for any personal loan amount and tenure.",
  alternates: { canonical: "https://paisabatao.in/personal-loan-emi-calculator" },
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
      <FAQSection faqs={faqs} />
    </>
  );
}
