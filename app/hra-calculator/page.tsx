import type { Metadata } from "next";
import HRACalculatorClient from "./HRACalculatorClient";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "HRA Exemption Calculator 2026 India — Section 10(13A) Tax Benefit",
  description: "Free HRA exemption calculator India FY 2026-27. Calculate HRA tax exemption under Section 10(13A) for metro cities: Mumbai, Delhi, Bengaluru, Chennai and more.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HRA Exemption Calculator India",
  url: "https://paisabatao.in/hra-calculator",
  description: "Free HRA exemption calculator under Section 10(13A). Calculate HRA tax exemption for metro and non-metro cities in India.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  creator: { "@type": "Organization", name: "PaisaBatao", url: "https://paisabatao.in" },
};

export default function HRACalculatorPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div>
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
          <LastUpdatedBadge label="HRA rules updated for FY 2026-27" />
        </div>
        <HRACalculatorClient />
      </div>
    </>
  );
}
