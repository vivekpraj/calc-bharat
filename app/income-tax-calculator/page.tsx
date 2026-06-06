import type { Metadata } from "next";
import IncomeTaxClient from "./IncomeTaxClient";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

const faqs = [
  { q: "What is the difference between Old and New tax regime?", a: "The Old regime allows deductions under 80C, 80D, HRA, home loan interest, etc., but has higher tax rates. The New regime has lower slab rates but no deductions. If your total deductions exceed ₹3.75 lakh, the Old regime usually saves more tax; otherwise the New regime is better." },
  { q: "Who should choose the New Regime in FY 2026-27?", a: "Taxpayers with income up to ₹12 lakh pay zero tax under the New regime due to the rebate under Section 87A. Those with minimal deductions (less than ₹3.75 lakh) generally benefit more from the New regime. Use the calculator above to compare both instantly." },
  { q: "What is included in Section 80C?", a: "Section 80C deductions (up to ₹1.5 lakh) include: EPF/PF contributions, PPF deposits, ELSS mutual funds, life insurance premiums, NSC, 5-year tax-saving FD, home loan principal repayment, tuition fees for children, and Sukanya Samriddhi Yojana." },
  { q: "What is the income tax slab for FY 2026-27 under the New regime?", a: "Under the New regime for FY 2026-27: ₹0–4 lakh = Nil, ₹4–8 lakh = 5%, ₹8–12 lakh = 10%, ₹12–16 lakh = 15%, ₹16–20 lakh = 20%, ₹20–24 lakh = 25%, above ₹24 lakh = 30%. Income up to ₹12 lakh is effectively tax-free due to the rebate under Section 87A." },
  { q: "What is the standard deduction for salaried employees in FY 2026-27?", a: "The standard deduction is ₹75,000 for salaried employees under the New tax regime for FY 2026-27 (increased from ₹50,000). Under the Old regime, it remains ₹50,000." },
  { q: "How is income tax calculated in India?", a: "Income tax is calculated on your total taxable income after deductions. The net income is applied to the applicable tax slabs (New or Old regime), then surcharge and health & education cess (4%) are added. A rebate under Section 87A is available if income is within the threshold." },
  { q: "What is Section 87A rebate in FY 2026-27?", a: "Under the New tax regime, individuals with taxable income up to ₹12 lakh get a full rebate under Section 87A, making their effective tax zero. Under the Old regime, the rebate is ₹12,500 for income up to ₹5 lakh." },
];

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
      <FAQSection faqs={faqs} />
    </>
  );
}
