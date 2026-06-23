import type { Metadata } from "next";
import FDCalculatorClient from "./FDCalculatorClient";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is the current FD interest rate in India in 2026?", a: "FD interest rates in 2026 range from 6.5%–7.5% p.a. for regular citizens and 7%–8% for senior citizens at major banks. Small finance banks offer up to 9%. SBI offers around 6.5–7%, HDFC Bank 7–7.4%, and ICICI Bank 6.7–7.25% depending on tenure." },
  { q: "Is FD interest taxable in India?", a: "Yes. FD interest is fully taxable as 'Income from Other Sources' at your applicable income tax slab rate. TDS is deducted at 10% if interest exceeds ₹40,000 per year (₹50,000 for senior citizens). Submit Form 15G/15H to avoid TDS if your total income is below the taxable limit." },
  { q: "What is the difference between FD and RD?", a: "FD (Fixed Deposit): You invest a lump sum once and earn interest for the chosen tenure. RD (Recurring Deposit): You invest a fixed amount every month and earn interest. FD is better if you have a large sum to invest. RD is better for those who want to save regularly from monthly income." },
  { q: "What is TDS on FD and how to avoid it?", a: "TDS is deducted at 10% on FD interest exceeding ₹40,000/year (₹50,000 for senior citizens). To avoid TDS, submit Form 15G (for non-senior citizens) or Form 15H (for senior citizens) to your bank at the start of the financial year if your total income is below the taxable limit." },
  { q: "What happens to FD on premature withdrawal?", a: "On premature FD withdrawal, banks apply a penalty of 0.5%–1% on the applicable interest rate. You receive the interest rate for the actual period held minus the penalty. Some banks offer penalty-free premature withdrawal for specific FD schemes." },
];

export const metadata: Metadata = {
  title: "FD Calculator India 2026 — Fixed Deposit & RD Maturity Amount",
  description: "Free FD and RD calculator India 2026. Calculate Fixed Deposit and Recurring Deposit maturity with quarterly/monthly compounding and TDS deduction.",
  alternates: { canonical: "https://paisabatao.in/fd-calculator" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FD & RD Calculator India",
  url: "https://paisabatao.in/fd-calculator",
  description: "Free Fixed Deposit and Recurring Deposit calculator. Calculate maturity amount with compounding options and TDS deduction.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function FDCalculatorPage() {
  return (
    <>
      <JsonLd data={schema} />
      <FDCalculatorClient />
      <FAQSection faqs={faqs} />
    </>
  );
}
