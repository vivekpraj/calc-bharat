import type { Metadata } from "next";
import SalaryCalculatorClient from "./SalaryCalculatorClient";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is the difference between CTC and in-hand salary?", a: "CTC (Cost to Company) is the total amount a company spends on an employee including salary, PF contribution, gratuity, insurance, and other benefits. In-hand salary (take-home) is what you actually receive after deducting employee PF (12% of basic), professional tax (up to ₹200/month), and income tax (TDS). Typically, in-hand salary is 70–80% of CTC." },
  { q: "How much PF is deducted from salary in India?", a: "Employee PF contribution is 12% of the basic salary + DA (Dearness Allowance). The employer also contributes 12%, of which 8.33% goes to EPS (Employee Pension Scheme, capped at ₹1,250/month) and 3.67% to EPF. PF is only applicable if basic salary is up to ₹15,000; beyond that, contribution is optional." },
  { q: "What is professional tax and how much is it?", a: "Professional tax is a state-level tax levied on salaried employees. The maximum is ₹2,400 per year (₹200/month). Not all states levy professional tax — Maharashtra, Karnataka, West Bengal, Andhra Pradesh, Tamil Nadu, Gujarat, and Telangana are the major ones. It is deducted by the employer." },
  { q: "What is the standard deduction for salaried employees?", a: "Under the New tax regime for FY 2026-27, the standard deduction is ₹75,000. Under the Old regime, it is ₹50,000. This is a flat deduction from gross salary income before calculating tax, available to all salaried individuals without needing any proof or investment." },
  { q: "How is gratuity calculated?", a: "Gratuity = (Last drawn salary × 15 × Years of service) / 26. 'Last drawn salary' means basic + DA. It is payable after 5 years of continuous service. The maximum tax-exempt gratuity under the Payment of Gratuity Act is ₹20 lakh." },
];

export const metadata: Metadata = {
  title: "CTC to In-Hand Salary Calculator 2026-27 India",
  description: "Free salary calculator India FY 2026-27. Break down CTC into Basic, HRA, PF, Special Allowance and get exact net in-hand take-home salary after all deductions.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CTC to In-Hand Salary Calculator",
  url: "https://paisabatao.in/salary-calculator",
  description: "Free salary calculator. Break down your CTC into Basic, HRA, PF, Special Allowance and calculate net in-hand salary for FY 2026-27.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div>
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
          <LastUpdatedBadge label="New tax regime defaults updated for FY 2026-27" />
        </div>
        <SalaryCalculatorClient />
      </div>
      <FAQSection faqs={faqs} />
    </>
  );
}
