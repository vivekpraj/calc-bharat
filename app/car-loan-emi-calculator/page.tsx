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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How Car Loan EMI is Calculated</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Car loan EMI uses the reducing-balance formula: <strong>EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1)</strong>. Unlike flat-rate personal loans, car loans in India are always calculated on a reducing balance — meaning your interest liability decreases with each payment as the outstanding principal reduces. This makes comparing car loan offers straightforward: the key variables are loan amount, interest rate, and tenure.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          For example: a ₹8 lakh car loan at 9% p.a. for 5 years gives a monthly EMI of approximately ₹16,604. Total interest paid over 5 years is about ₹1.96 lakh. Extending the tenure to 7 years lowers the EMI to ₹12,826 but increases total interest to ₹2.77 lakh — an extra ₹81,000 for the same loan.
        </p>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Car Loan Rates in India (2026)</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Bank / NBFC</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Rate (p.a.)</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">EMI on ₹8L / 5yr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { bank: "SBI", rate: "8.85%", emi: "₹16,537" },
                { bank: "HDFC Bank", rate: "9.00%", emi: "₹16,604" },
                { bank: "ICICI Bank", rate: "9.10%", emi: "₹16,648" },
                { bank: "Kotak Mahindra", rate: "8.99%", emi: "₹16,600" },
                { bank: "Axis Bank", rate: "9.25%", emi: "₹16,715" },
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
        <h3 className="text-base font-semibold text-gray-900 mb-2">New Car vs Used Car Loan — Key Differences</h3>
        <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside mb-4">
          <li><strong>New car:</strong> Banks typically finance 80–90% of the on-road price. Rates start at 8.85%. Maximum tenure: 7 years.</li>
          <li><strong>Used car:</strong> Banks finance 70–80% of the vehicle valuation. Rates are 1–3% higher than new car rates. Car should not be more than 10 years old at loan end.</li>
          <li><strong>Zero down payment offers:</strong> Some manufacturers tie up with banks for 100% financing — but check the interest rate, often 1–2% higher than standard.</li>
          <li><strong>Foreclosure:</strong> After 12 months, most banks allow part-prepayment at 2–5% charge. Budget borrowers should choose lenders with lower foreclosure fees.</li>
        </ul>
        <p className="text-xs text-gray-400">Rates sourced from respective bank websites as of 2026. Subject to change per RBI policy and individual credit profile.</p>
      </section>

      <FAQSection faqs={faqs} />
    </>
  );
}
