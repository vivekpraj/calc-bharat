import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is the current car loan interest rate in India in 2026?", a: "Car loan interest rates in 2026 range from 8.5%–14% p.a. SBI offers from 8.85%, HDFC Bank from 9%, ICICI Bank from 9.1%, and Kotak from 8.99%. New cars get lower rates than used cars. A good CIBIL score (750+) can help you negotiate lower rates." },
  { q: "How much down payment is required for a car loan?", a: "Most banks finance 80–90% of the on-road price (ex-showroom + taxes + insurance + accessories). You need to pay 10–20% as down payment. For example, for a ₹10 lakh car, you need ₹1–2 lakh as down payment. Some banks offer 100% financing to customers with excellent credit history." },
  { q: "What is the maximum tenure for a car loan?", a: "Car loans are typically available for 1–7 years (12–84 months). Most borrowers choose 5 years for a balance between manageable EMI and total interest cost. Longer tenure reduces EMI but increases total interest paid significantly." },
  { q: "Can I get a car loan for a used/second-hand car?", a: "Yes, most banks and NBFCs offer used car loans. However, the car should typically be not older than 8–10 years at the end of the loan tenure. Used car loan rates are slightly higher (10–16%) than new car loans, and the LTV (Loan to Value) ratio is lower — typically 70–80% of the car's valuation." },
  { q: "Is it better to prepay a car loan?", a: "Yes, prepaying a car loan saves significant interest since car loans have shorter tenures. However, check the foreclosure charges — banks charge 2–5% of outstanding principal for early closure within the first 1–2 years. If the foreclosure charge is below the interest savings, prepayment is beneficial." },
];

export const metadata: Metadata = {
  title: "Car Loan EMI Calculator 2026 — Vehicle & Two-Wheeler Loan EMI",
  description: "Free car loan EMI calculator India 2026. Calculate monthly EMI for new and used car loans. Compare interest rates and get instant EMI breakdown.",
  alternates: { canonical: "https://paisabatao.in/car-loan-emi-calculator" },
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
      <FAQSection faqs={faqs} />
    </>
  );
}
