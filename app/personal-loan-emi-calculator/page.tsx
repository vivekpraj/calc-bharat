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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How Personal Loan EMI is Calculated in India</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Personal loan EMI is calculated on a reducing balance basis using the formula: <strong>EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1)</strong>. Unlike some older loan products that use flat-rate calculation (where interest is charged on the full principal throughout the tenure), Indian banks now use reducing balance — meaning you only pay interest on the outstanding amount, not the original loan.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Example: a ₹5 lakh personal loan at 12% p.a. for 3 years gives a monthly EMI of ₹16,607. Total interest paid: ₹97,852 — roughly 19.6% of the loan amount. At 15% on the same loan, EMI rises to ₹17,332 and total interest jumps to ₹1,23,952. The difference of just 3% in interest rate costs you ₹26,100 extra over 3 years.
        </p>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Personal Loan Rates (2026) — By Lender Type</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Lender Type</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Rate Range</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">EMI on ₹5L / 3yr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { type: "Government Banks (SBI, PNB)", rate: "11–13%", emi: "₹16,394–₹16,821" },
                { type: "Private Banks (HDFC, ICICI)", rate: "10.85–14%", emi: "₹16,370–₹17,088" },
                { type: "NBFCs (Bajaj, Tata Capital)", rate: "13–18%", emi: "₹16,821–₹18,084" },
                { type: "Fintech Apps (Navi, MoneyView)", rate: "16–30%", emi: "₹17,571–₹21,742" },
              ].map((row) => (
                <tr key={row.type} className="bg-white">
                  <td className="px-4 py-2 text-gray-700">{row.type}</td>
                  <td className="px-4 py-2 text-gray-700">{row.rate}</td>
                  <td className="px-4 py-2 font-medium text-brand-700">{row.emi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">When to Choose a Personal Loan</h3>
        <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside mb-4">
          <li><strong>Medical emergency:</strong> Personal loans disburse in 24–48 hours, making them ideal for urgent needs where you don't have time for secured loan processing.</li>
          <li><strong>Debt consolidation:</strong> If you have multiple high-interest credit card dues (36–42% p.a.), consolidating into a personal loan at 12–15% significantly reduces interest burden.</li>
          <li><strong>Home renovation:</strong> For amounts under ₹10 lakh, personal loans are faster than home improvement loans and don't require property documents.</li>
          <li><strong>Avoid for long-term needs:</strong> For amounts over ₹15 lakh or tenure above 5 years, secured loans (home loan, loan against property) are far cheaper.</li>
        </ul>
        <p className="text-xs text-gray-400">Rates are indicative for FY 2026-27. Actual rates depend on CIBIL score, income, employer category, and lender policy.</p>
      </section>

      <FAQSection faqs={faqs} />
    </>
  );
}
