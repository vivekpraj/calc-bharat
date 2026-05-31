import type { Metadata } from "next";
import { Suspense } from "react";
import SIPCalculatorClient from "./SIPCalculatorClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "SIP Calculator India 2026 — Monthly SIP Returns & Future Value",
  description: "Free SIP calculator India 2026. Calculate future value of monthly SIP investments with step-up option. See total wealth growth, returns and corpus at maturity.",
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
    </>
  );
}
