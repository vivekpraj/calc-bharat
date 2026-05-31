import type { Metadata } from "next";
import FDCalculatorClient from "./FDCalculatorClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FD Calculator India 2026 — Fixed Deposit & RD Maturity Amount",
  description: "Free FD and RD calculator India 2026. Calculate Fixed Deposit and Recurring Deposit maturity with quarterly/monthly compounding and TDS deduction.",
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
    </>
  );
}
