import type { Metadata } from "next";
import PPFCalculatorClient from "./PPFCalculatorClient";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is the current PPF interest rate in 2026?", a: "The current PPF interest rate is 7.1% per annum, compounded annually. The rate is set by the Government of India and reviewed quarterly. It has remained at 7.1% since April 2020." },
  { q: "What is the maximum amount I can invest in PPF per year?", a: "You can invest a minimum of ₹500 and a maximum of ₹1,50,000 per financial year in PPF. Investments above ₹1.5 lakh do not earn interest and are not eligible for tax deduction under Section 80C." },
  { q: "Can I withdraw from PPF before 15 years?", a: "Partial withdrawals are allowed from the 7th financial year onwards (up to 50% of the balance at the end of the 4th year or the immediately preceding year, whichever is lower). Premature full closure is allowed after 5 years only for medical emergencies or higher education." },
  { q: "Is PPF interest taxable in India?", a: "No. PPF enjoys EEE (Exempt-Exempt-Exempt) tax status — the investment qualifies for deduction under Section 80C, the interest earned is completely tax-free, and the maturity amount is also tax-free." },
  { q: "Can I extend my PPF account beyond 15 years?", a: "Yes. After maturity (15 years), you can extend the account in blocks of 5 years, with or without making fresh contributions. If you extend with contributions, you can still withdraw up to 60% of the opening balance of each 5-year block." },
];

export const metadata: Metadata = {
  title: "PPF Calculator 2026-27 — Maturity Amount at 7.1% Interest",
  description: "Free PPF calculator FY 2026-27. Calculate PPF maturity amount, total interest earned and year-by-year breakdown at 7.1% p.a. Plan your 15-year investment.",
  alternates: { canonical: "https://paisabatao.in/ppf-calculator" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PPF Calculator 2026-27",
  url: "https://paisabatao.in/ppf-calculator",
  description: "Free PPF calculator. Calculate PPF maturity amount and interest at 7.1% p.a. with year-by-year breakdown.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function PPFCalculatorPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PPFCalculatorClient />
      <FAQSection faqs={faqs} />
    </>
  );
}
