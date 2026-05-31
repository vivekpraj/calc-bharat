import type { Metadata } from "next";
import SalaryCalculatorClient from "./SalaryCalculatorClient";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";
import JsonLd from "@/components/JsonLd";

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
    </>
  );
}
