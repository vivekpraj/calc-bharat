import type { Metadata } from "next";
import PPFCalculatorClient from "./PPFCalculatorClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "PPF Calculator 2026-27 — Maturity Amount at 7.1% Interest",
  description: "Free PPF calculator FY 2026-27. Calculate PPF maturity amount, total interest earned and year-by-year breakdown at 7.1% p.a. Plan your 15-year investment.",
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
    </>
  );
}
