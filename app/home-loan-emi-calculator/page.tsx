import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is the current home loan interest rate in India in 2026?", a: "Home loan interest rates in 2026 range from 8.35%–9.5% p.a. SBI offers from 8.5%, HDFC Bank from 8.75%, ICICI Bank from 8.75%, and Kotak Mahindra from 8.75%. Rates depend on your CIBIL score, income, loan amount, and tenure. A CIBIL score above 750 typically gets you the best rates." },
  { q: "How much home loan can I get on my salary?", a: "As a rule of thumb, banks offer home loans of 55–65 times your monthly take-home salary. For example, a monthly salary of ₹50,000 can get you a loan of ₹27–32 lakh. Your EMI should not exceed 40–50% of your monthly income. Factors like existing loans, CIBIL score, and age also affect eligibility." },
  { q: "What is the maximum tenure for a home loan?", a: "Most banks offer home loans for up to 30 years. The maximum age at the end of the loan tenure is typically 70–75 years. Longer tenure reduces your monthly EMI but increases total interest paid. A 20-year vs 30-year loan on ₹50 lakh at 8.5% means ₹43,391/month vs ₹38,446/month EMI." },
  { q: "What are the tax benefits on a home loan?", a: "Home loan borrowers get: (1) Section 24(b): Deduction up to ₹2 lakh/year on interest paid (for self-occupied property, Old regime only), (2) Section 80C: Deduction up to ₹1.5 lakh/year on principal repayment, (3) Section 80EEA: Additional ₹1.5 lakh interest deduction for first-time buyers (affordable housing). These are only under the Old tax regime." },
  { q: "What is the difference between fixed and floating interest rate on home loans?", a: "Fixed rate remains constant throughout the tenure regardless of market changes — predictable EMI but usually higher rate (8.9–10%). Floating rate changes with RBI repo rate changes — currently lower but EMI can increase. Most borrowers in India prefer floating rates for long-term home loans as they benefit when rates fall." },
];

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator 2026 — Monthly Housing Loan Instalment",
  description: "Free home loan EMI calculator India 2026. Calculate monthly EMI for housing loans at SBI, HDFC, ICICI rates. Get full amortization schedule and prepayment analysis.",
  alternates: { canonical: "https://paisabatao.in/home-loan-emi-calculator" },
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
      <FAQSection faqs={faqs} />
    </>
  );
}
