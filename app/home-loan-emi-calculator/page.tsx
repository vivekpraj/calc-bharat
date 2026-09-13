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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How Home Loan EMI is Calculated</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Home loan EMI is calculated using the standard reducing-balance formula: <strong>EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1)</strong>, where P is the principal loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly instalments. Every EMI payment covers two components — interest charged on the outstanding balance, and principal repayment that reduces your debt.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          For example: a ₹50 lakh home loan at 8.75% p.a. for 20 years gives a monthly EMI of approximately ₹44,115. Over 20 years, total interest paid is about ₹55.9 lakh — more than the original loan. Over 30 years at the same rate, EMI drops to ₹39,345 but total interest balloons to ₹91.6 lakh. This shows why choosing the right tenure matters as much as the interest rate.
        </p>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Current Home Loan Rates in India (2026)</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Bank</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Rate (p.a.)</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">EMI on ₹50L / 20yr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { bank: "SBI", rate: "8.50%", emi: "₹43,391" },
                { bank: "HDFC Bank", rate: "8.75%", emi: "₹44,115" },
                { bank: "ICICI Bank", rate: "8.75%", emi: "₹44,115" },
                { bank: "Kotak Mahindra", rate: "8.75%", emi: "₹44,115" },
                { bank: "Bank of Baroda", rate: "8.40%", emi: "₹43,617" },
              ].map((row) => (
                <tr key={row.bank} className="bg-white">
                  <td className="px-4 py-2 text-gray-700">{row.bank}</td>
                  <td className="px-4 py-2 text-gray-700">{row.rate}</td>
                  <td className="px-4 py-2 font-medium text-brand-700">{row.emi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Tips to Reduce Your Home Loan Interest</h3>
        <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside mb-4">
          <li><strong>Make part-prepayments:</strong> Even one extra EMI per year on a ₹50L loan can save ₹4–6 lakh in interest and cut 2–3 years off your tenure.</li>
          <li><strong>Choose a shorter tenure if you can afford higher EMI:</strong> 15 years vs 20 years on ₹50L saves approximately ₹14 lakh in total interest.</li>
          <li><strong>Maintain CIBIL score above 750:</strong> A higher score qualifies you for rates 0.25–0.5% lower, saving ₹1.5–3 lakh over 20 years.</li>
          <li><strong>Balance transfer:</strong> If you have an old loan at 9.5%+, refinancing at 8.5% on ₹40L outstanding saves approximately ₹500/month in EMI.</li>
        </ul>
        <p className="text-xs text-gray-400">Interest rates sourced from respective bank websites. Rates are indicative and subject to change based on RBI repo rate revisions and individual bank policies.</p>
      </section>

      <FAQSection faqs={faqs} />
    </>
  );
}
