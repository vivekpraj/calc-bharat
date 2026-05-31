import type { Metadata } from "next";
import IncomeTaxClient from "./IncomeTaxClient";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Income Tax Calculator 2026-27 — New vs Old Tax Regime India",
  description: "Free income tax calculator for FY 2026-27 (AY 2026-27). Compare Old vs New tax regime slabs instantly. Find which regime saves you more tax — no login needed.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Income Tax Calculator 2026-27",
  url: "https://paisabatao.in/income-tax-calculator",
  description: "Free income tax calculator for FY 2026-27. Compare Old vs New tax regime and calculate your tax liability instantly.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function IncomeTaxPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div>
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
          <LastUpdatedBadge />
        </div>
        <IncomeTaxClient />
      </div>
    </>
  );
}
