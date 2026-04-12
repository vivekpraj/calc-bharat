"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Calculator, FileText } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Tax Calculators",
    items: [
      { label: "Income Tax Calculator", href: "/income-tax-calculator", desc: "New vs Old Regime 2026-27" },
      { label: "HRA Calculator", href: "/hra-calculator", desc: "HRA exemption calculator" },
    ],
  },
  {
    label: "Loan & EMI",
    items: [
      { label: "EMI Calculator", href: "/emi-calculator", desc: "Home, Car, Personal loan EMI" },
    ],
  },
  {
    label: "GST Tools",
    items: [
      { label: "GST Calculator", href: "/gst-calculator", desc: "Add or remove GST instantly" },
      { label: "GST Invoice Generator", href: "/gst-invoice-generator", desc: "Free live GST invoice" },
    ],
  },
  {
    label: "Investment",
    items: [
      { label: "SIP Calculator", href: "/sip-calculator", desc: "SIP returns & future value" },
      { label: "PPF Calculator", href: "/ppf-calculator", desc: "PPF maturity & interest" },
      { label: "FD / RD Calculator", href: "/fd-calculator", desc: "Fixed & Recurring deposit" },
    ],
  },
  {
    label: "Salary & HR",
    items: [
      { label: "Salary / CTC Calculator", href: "/salary-calculator", desc: "CTC to in-hand breakdown" },
      { label: "HRA Calculator", href: "/hra-calculator", desc: "HRA exemption amount" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">
              Calc<span className="text-brand-600">Bharat</span>
            </span>
          </Link>

          {/* Desktop nav — pure CSS group-hover, zero JS, zero gap */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((nav) => (
              /*
               * The outer div is the hover group.
               * pb-2 extends the hover zone 8px downward so the mouse
               * never leaves the group while moving to the dropdown.
               * The dropdown uses pt-2 for visual gap (inside the hover zone).
               */
              <div key={nav.label} className="group relative pb-2">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 group-hover:text-brand-600 rounded-lg group-hover:bg-brand-50 transition-colors">
                  {nav.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-150 group-hover:rotate-180" />
                </button>

                {/*
                 * pt-2 provides visual spacing, but it's inside the group hover zone.
                 * invisible → visible on group hover, with opacity transition.
                 */}
                <div className="absolute top-full left-0 pt-2 w-64 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 ease-out">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100/80 py-1.5 ring-1 ring-black/5">
                    {nav.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 hover:bg-brand-50 transition-colors group/item"
                      >
                        <div className="text-sm font-medium text-gray-800 group-hover/item:text-brand-600">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/gst-invoice-generator"
              className="flex items-center gap-1.5 px-4 py-2 bg-accent-500 text-white text-sm font-semibold rounded-lg hover:bg-accent-600 transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" />
              Free Invoice
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-brand-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {NAV_ITEMS.map((nav) => (
              <div key={nav.label}>
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {nav.label}
                </div>
                {nav.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Resources
              </div>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              >
                Blog
              </Link>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/gst-invoice-generator"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-accent-500 text-white text-sm font-semibold rounded-lg"
              >
                <FileText className="w-4 h-4" />
                Free GST Invoice
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
