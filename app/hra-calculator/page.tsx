import type { Metadata } from "next";
import HRACalculatorClient from "./HRACalculatorClient";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "How is HRA exemption calculated under Section 10(13A)?", a: "HRA exemption is the minimum of: (1) Actual HRA received from employer, (2) 50% of basic salary for metro cities or 40% for non-metro cities, (3) Actual rent paid minus 10% of basic salary. The lowest of these three amounts is exempt from tax." },
  { q: "Which cities are considered metro cities for HRA in 2026?", a: "As per Budget 2026, eight cities qualify as metro cities for 50% HRA exemption: Mumbai, Delhi, Kolkata, Chennai, Hyderabad, Pune, Bengaluru, and Ahmedabad. All other cities are non-metro, where the HRA exemption is 40% of basic salary." },
  { q: "Can I claim HRA if I pay rent to my parents?", a: "Yes, you can pay rent to your parents and claim HRA exemption. However, the rent agreement must be genuine, and your parents must declare the rental income in their ITR. This is a legitimate tax-saving strategy, especially when parents are in a lower tax bracket." },
  { q: "Can I claim both HRA and home loan deduction?", a: "Yes. You can claim both HRA (if you live in a rented house in a different city where you work) and home loan deduction (for a self-owned house in another city or that is under construction). Both can be claimed simultaneously if conditions are met." },
  { q: "What if my employer does not provide HRA?", a: "If HRA is not part of your salary structure, you cannot claim Section 10(13A) exemption. However, you can claim deduction under Section 80GG for rent paid, subject to certain conditions: you must not own a house in the city you work, your spouse/minor child should not own a house there, and maximum deduction is ₹5,000/month or 25% of total income, whichever is less." },
];

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
      <FAQSection faqs={faqs} />
    </>
  );
}
