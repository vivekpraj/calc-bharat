import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is the maximum education loan amount in India?", a: "For studies in India, banks offer up to ₹10–15 lakh without collateral (under IBA model). For abroad studies, up to ₹75 lakh without collateral from premium institutes. Government schemes like PM Vidyalakshmi offer up to ₹10 lakh for domestic courses. Collateral-backed loans can go up to ₹1.5 crore or more." },
  { q: "What is the moratorium period in an education loan?", a: "The moratorium period is a repayment holiday during which you don't pay EMIs. It covers the course duration + 6–12 months after course completion (or 6 months after getting a job, whichever is earlier). During this period, simple interest accrues, which is either paid monthly or added to the principal." },
  { q: "Is education loan interest tax deductible in India?", a: "Yes. Under Section 80E of the Income Tax Act, the entire interest paid on education loans is deductible from taxable income (no upper limit). This deduction is available for 8 years from the year you start repaying, or until the interest is fully paid, whichever is earlier. This is available under the Old tax regime only." },
  { q: "What is the current education loan interest rate in India?", a: "Government bank education loan rates: 8%–11.5% p.a. SBI Student Loan: 8.55–11.15%, Bank of Baroda Baroda Vidya: 9.2–10.7%, Canara Bank: 8.85–10.5%. Private banks charge 11–14%. NBFC lenders charge 12–18%. Female students and students from premier institutes (IITs, IIMs) often get 0.5–1% concession." },
  { q: "Do I need collateral for an education loan?", a: "Loans up to ₹7.5 lakh: No collateral required, only co-applicant (parent/guardian). Loans from ₹7.5–15 lakh: Third-party guarantee required. Loans above ₹15 lakh: Tangible collateral (property, FD, NSC, etc.) required. Government schemes under Pradhan Mantri Vidya Lakshmi Yojana offer collateral-free loans up to ₹10 lakh." },
];

export const metadata: Metadata = {
  title: "Education Loan EMI Calculator India 2026 — Student Loan EMI",
  description: "Free education loan EMI calculator India 2026. Calculate student loan EMI with moratorium period. Plan your repayment schedule after course completion.",
  alternates: { canonical: "https://paisabatao.in/education-loan-emi-calculator" },
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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How Education Loan EMI Works in India</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Education loans in India have a unique structure not found in other loans — a <strong>moratorium period</strong> during which you don&apos;t pay EMIs. This covers your entire course duration plus an additional 6–12 months after graduation (or 6 months after getting a job, whichever is earlier). During this period, simple interest accrues on the outstanding principal. At the end of the moratorium, this accrued interest may be added to the principal (increasing your EMI base) or paid monthly as simple interest.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Example: a ₹10 lakh education loan at 9.5% p.a. for a 2-year course with 12-month post-course grace period (total moratorium: 3 years). During 3 years, accrued interest = approximately ₹2.85 lakh (simple interest). If added to principal, repayment begins on ₹12.85 lakh. At 5-year repayment tenure, monthly EMI = approximately ₹26,930.
        </p>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Education Loan Rates in India (2026)</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Bank</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">India Studies</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Abroad Studies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { bank: "SBI (Student Loan)", india: "8.55–11.15%", abroad: "9.15–11.15%" },
                { bank: "Bank of Baroda", india: "9.20–10.70%", abroad: "9.20–10.70%" },
                { bank: "Canara Bank", india: "8.85–10.50%", abroad: "8.85–10.50%" },
                { bank: "HDFC Credila", india: "11–13%", abroad: "11–13%" },
                { bank: "Avanse Financial", india: "11.5–13.5%", abroad: "11.5–13.5%" },
              ].map((row) => (
                <tr key={row.bank} className="bg-white">
                  <td className="px-4 py-2 text-gray-700">{row.bank}</td>
                  <td className="px-4 py-2 text-gray-700">{row.india}</td>
                  <td className="px-4 py-2 text-gray-700">{row.abroad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Section 80E Tax Benefit — Save on Education Loan Interest</h3>
        <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside mb-4">
          <li><strong>Full interest deduction:</strong> Under Section 80E, the entire interest paid on education loans is deductible — no upper limit, unlike Section 80C (capped at ₹1.5 lakh).</li>
          <li><strong>Who can claim:</strong> The borrower (student) or the co-applicant (parent/spouse) can claim the deduction — whichever is repaying the loan.</li>
          <li><strong>Duration:</strong> Available for 8 consecutive assessment years from the year repayment begins, or until interest is fully repaid — whichever is earlier.</li>
          <li><strong>Old regime only:</strong> This deduction applies only under the Old tax regime. If you opt for the New regime, Section 80E deduction is not available.</li>
          <li><strong>Courses covered:</strong> Full-time higher education in India or abroad. Part-time and vocational courses may not qualify — verify with your lender.</li>
        </ul>
        <p className="text-xs text-gray-400">Interest rates sourced from respective bank websites for FY 2026-27. Rates are subject to change based on RBI repo rate and individual credit profile.</p>
      </section>

      <FAQSection faqs={faqs} />
    </>
  );
}
