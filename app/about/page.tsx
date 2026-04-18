import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Target, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About PaisaBatao — Free Indian Financial Calculators",
  description:
    "PaisaBatao provides free, accurate Indian financial calculators for income tax, HRA, EMI, SIP, GST, PPF, and more. Built for every Indian.",
};

const calculators = [
  { name: "Income Tax Calculator", href: "/income-tax-calculator", desc: "Old vs New regime comparison for FY 2026-27" },
  { name: "HRA Calculator", href: "/hra-calculator", desc: "HRA exemption under Section 10(13A)" },
  { name: "EMI Calculator", href: "/emi-calculator", desc: "Home, car & personal loan EMIs" },
  { name: "SIP Calculator", href: "/sip-calculator", desc: "Mutual fund SIP returns & wealth estimate" },
  { name: "GST Calculator", href: "/gst-calculator", desc: "Add or remove GST from any amount" },
  { name: "GST Invoice Generator", href: "/gst-invoice-generator", desc: "Free professional GST invoices" },
  { name: "PPF Calculator", href: "/ppf-calculator", desc: "Public Provident Fund maturity value" },
  { name: "FD Calculator", href: "/fd-calculator", desc: "Fixed deposit interest & maturity" },
  { name: "Salary Calculator", href: "/salary-calculator", desc: "In-hand salary after tax & deductions" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Paisa<span className="text-brand-600">Batao</span></span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Free Financial Calculators <br />
            <span className="text-brand-600">Built for Every Indian</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            PaisaBatao is a free platform offering accurate, up-to-date financial calculators
            for Indian taxpayers, salaried employees, investors, and small business owners.
            No sign-up. No ads cluttering your results. Just fast, reliable calculations.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Why we built it */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why We Built PaisaBatao</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Most Indian financial calculator websites are either outdated, cluttered with ads,
            or use incorrect formulas. When the government updates tax slabs, HRA rules, or
            contribution limits, those sites take months to catch up — if they ever do.
          </p>
          <p className="text-gray-600 leading-relaxed">
            PaisaBatao was built to be different: always updated to the latest Budget,
            formula-accurate, and completely free. Every calculator is reviewed against
            official CBDT guidelines and government notifications.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Our Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: <Zap className="w-5 h-5 text-brand-600" />,
                title: "Always Free",
                desc: "Every calculator on PaisaBatao is free to use, forever. No paywalls, no premium tiers.",
              },
              {
                icon: <Target className="w-5 h-5 text-brand-600" />,
                title: "Always Accurate",
                desc: "Formulas are verified against CBDT guidelines and updated every Budget season.",
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-brand-600" />,
                title: "Privacy First",
                desc: "We don't collect your financial data. All calculations happen in your browser.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calculators */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Our Calculators</h2>
          <p className="text-gray-500 text-sm mb-5">All updated for FY 2026-27.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-brand-200 hover:shadow-md transition-all group"
              >
                <p className="font-medium text-gray-900 group-hover:text-brand-600 transition-colors text-sm">
                  {calc.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-amber-800 mb-2">Important Disclaimer</h2>
          <p className="text-sm text-amber-700 leading-relaxed">
            All calculators on PaisaBatao are for informational and educational purposes only.
            Results should not be treated as financial, tax, or legal advice. Please consult a
            qualified Chartered Accountant or financial advisor before making any financial decisions.
          </p>
        </section>

      </div>
    </main>
  );
}
