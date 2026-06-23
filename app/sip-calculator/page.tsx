import type { Metadata } from "next";
import { Suspense } from "react";
import SIPCalculatorClient from "./SIPCalculatorClient";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is SIP?", a: "SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly (monthly/quarterly) in a mutual fund. Each instalment buys units at the current NAV. It builds wealth over time through rupee cost averaging and the power of compounding — you buy more units when markets are low and fewer when high." },
  { q: "What is SIP and how does it work?", a: "SIP (Systematic Investment Plan) is a method of investing a fixed amount in a mutual fund at regular intervals (monthly/quarterly). Each instalment buys units at the current NAV. Over time, you benefit from rupee cost averaging — buying more units when NAV is low and fewer when NAV is high — reducing the impact of market volatility." },
  { q: "What return rate should I assume for SIP calculation?", a: "For equity mutual funds, a 10–12% annual return is commonly used for long-term projections (10+ years). For debt funds, 6–7% is typical. For hybrid funds, 8–9%. These are estimates — actual returns vary based on market conditions and fund performance." },
  { q: "What is a Step-Up SIP?", a: "A Step-Up (or Top-Up) SIP allows you to increase your monthly investment amount by a fixed percentage or amount each year. For example, starting with ₹5,000/month and increasing by 10% annually. This significantly increases your final corpus as your income grows over time." },
  { q: "Is SIP better than lump sum investment?", a: "SIP is better for salaried individuals with regular income as it averages out market volatility (rupee cost averaging). Lump sum is better when markets are low, as the entire amount benefits from market recovery. For most retail investors, SIP is recommended due to its discipline and risk management." },
  { q: "What is the minimum SIP amount in India?", a: "Most mutual funds allow SIPs starting from ₹500 per month. Some funds (especially ELSS for tax saving) allow as low as ₹100/month. There is no maximum limit. You can start multiple SIPs in different funds simultaneously." },
];

export const metadata: Metadata = {
  title: "SIP Calculator India 2026 — Monthly SIP Returns & Future Value",
  description: "Free SIP calculator India 2026. Calculate future value of monthly SIP investments with step-up option. See total wealth growth, returns and corpus at maturity.",
  alternates: { canonical: "https://paisabatao.in/sip-calculator" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SIP Calculator India",
  url: "https://paisabatao.in/sip-calculator",
  description: "Free SIP calculator. Calculate future value of SIP investments with step-up option and wealth growth visualization.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function SIPCalculatorPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl" />}>
        <SIPCalculatorClient />
      </Suspense>
      <FAQSection faqs={faqs} />
    </>
  );
}
