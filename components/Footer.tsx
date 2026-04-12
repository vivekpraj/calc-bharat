import Link from "next/link";
import { Calculator } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Calculators",
    links: [
      { label: "GST Calculator", href: "/gst-calculator" },
      { label: "EMI Calculator", href: "/emi-calculator" },
      { label: "SIP Calculator", href: "/sip-calculator" },
      { label: "Income Tax", href: "/income-tax-calculator" },
    ],
  },
  {
    title: "Tax Tools",
    links: [
      { label: "HRA Calculator", href: "/hra-calculator" },
      { label: "Salary Calculator", href: "/salary-calculator" },
      { label: "PPF Calculator", href: "/ppf-calculator" },
      { label: "FD Calculator", href: "/fd-calculator" },
    ],
  },
  {
    title: "GST Tools",
    links: [
      { label: "GST Calculator", href: "/gst-calculator" },
      { label: "GST Invoice Generator", href: "/gst-invoice-generator" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F1020] text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-semibold text-sm mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white">Calc<span className="text-accent-400">Bharat</span></span>
          </div>
          <p className="text-xs text-center">
            © {new Date().getFullYear()} CalcBharat. Free Indian Financial Calculators. For reference only — not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
