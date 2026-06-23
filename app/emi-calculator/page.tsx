import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "./EMICalculatorClient";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is EMI?", a: "EMI (Equated Monthly Instalment) is the fixed monthly amount you pay to repay a loan. Each EMI has two parts: interest on the outstanding principal, and a portion of the principal itself. Early EMIs are mostly interest; later EMIs are mostly principal." },
  { q: "How is EMI calculated?", a: "EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P = Principal loan amount, R = Monthly interest rate (Annual rate ÷ 12 ÷ 100), N = Loan tenure in months. For example, ₹10 lakh loan at 8.5% for 20 years = EMI of approximately ₹8,678." },
  { q: "Does prepayment reduce EMI or tenure?", a: "Most banks by default reduce the loan tenure on prepayment, which saves more interest. However, you can request to reduce the EMI instead. Reducing tenure is financially better as you pay less total interest." },
  { q: "What is the maximum loan tenure in India?", a: "Home loans: up to 30 years. Car loans: up to 7 years. Personal loans: up to 5–7 years. Education loans: up to 15 years. The maximum tenure depends on your age, income, and bank policy." },
  { q: "How can I reduce my loan EMI?", a: "You can reduce EMI by: (1) Negotiating a lower interest rate, (2) Increasing the loan tenure, (3) Making a larger down payment to reduce the principal, (4) Opting for a balance transfer to a lender with lower rates, (5) Making partial prepayments to reduce the outstanding principal." },
  { q: "What happens if I miss an EMI payment?", a: "Missing an EMI results in a late payment penalty (usually 1–2% of the overdue amount), a negative impact on your CIBIL/credit score, and accumulation of interest on the unpaid amount. Multiple missed EMIs can lead to the loan being classified as NPA (Non-Performing Asset)." },
];

export const metadata: Metadata = {
  title: "EMI Calculator India 2026 — Home, Car & Personal Loan EMI",
  description: "Free EMI calculator India 2026. Calculate monthly EMI for Home Loan, Car Loan, Personal & Education Loan. Instant amortization schedule with total interest breakdown.",
  alternates: { canonical: "https://paisabatao.in/emi-calculator" },
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
      <FAQSection faqs={faqs} />
    </>
  );
}
