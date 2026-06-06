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
      <FAQSection faqs={faqs} />
    </>
  );
}
