import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import {
  Calculator,
  Receipt,
  TrendingUp,
  Landmark,
  Wallet,
  PiggyBank,
  Building2,
  FileText,
  BadgePercent,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "CalcBharat — Free Indian Financial Calculators",
  description:
    "Free GST, EMI, SIP, Income Tax, HRA, PPF calculators for India. All free, instant, no login required.",
};

const TOOL_CATEGORIES = [
  {
    category: "GST Tools",
    categoryColor: "text-accent-600",
    categoryBg: "bg-accent-50 border-accent-200",
    tools: [
      {
        title: "GST Calculator",
        description: "Add or remove GST. CGST, SGST & IGST breakdown.",
        href: "/gst-calculator",
        icon: BadgePercent,
        iconBg: "bg-accent-100",
        iconColor: "text-accent-600",
      },
      {
        title: "GST Invoice Generator",
        description: "Create professional GST invoices with live preview.",
        href: "/gst-invoice-generator",
        icon: FileText,
        iconBg: "bg-accent-100",
        iconColor: "text-accent-600",
      },
    ],
  },
  {
    category: "Loan & EMI",
    categoryColor: "text-brand-600",
    categoryBg: "bg-brand-50 border-brand-200",
    tools: [
      {
        title: "EMI Calculator",
        description: "Home, Car & Personal loan EMI with amortization.",
        href: "/emi-calculator",
        icon: Building2,
        iconBg: "bg-brand-100",
        iconColor: "text-brand-600",
      },
    ],
  },
  {
    category: "Investment",
    categoryColor: "text-emerald-700",
    categoryBg: "bg-emerald-50 border-emerald-200",
    tools: [
      {
        title: "SIP Calculator",
        description: "SIP future value with step-up & lumpsum comparison.",
        href: "/sip-calculator",
        icon: TrendingUp,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
      },
      {
        title: "PPF Calculator",
        description: "PPF maturity & 15-year interest breakdown.",
        href: "/ppf-calculator",
        icon: PiggyBank,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
      },
      {
        title: "FD / RD Calculator",
        description: "Fixed & recurring deposit with compounding options.",
        href: "/fd-calculator",
        icon: Landmark,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
      },
    ],
  },
  {
    category: "Tax Calculators",
    categoryColor: "text-violet-700",
    categoryBg: "bg-violet-50 border-violet-200",
    tools: [
      {
        title: "Income Tax 2025-26",
        description: "Old vs New regime comparison. Find what saves more.",
        href: "/income-tax-calculator",
        icon: Calculator,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-700",
      },
      {
        title: "HRA Calculator",
        description: "HRA exemption under Section 10(13A). Metro & non-metro.",
        href: "/hra-calculator",
        icon: Receipt,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-700",
      },
    ],
  },
  {
    category: "Salary & HR",
    categoryColor: "text-rose-700",
    categoryBg: "bg-rose-50 border-rose-200",
    tools: [
      {
        title: "Salary / CTC Calculator",
        description: "Break down CTC into Basic, HRA, PF & in-hand salary.",
        href: "/salary-calculator",
        icon: Wallet,
        iconBg: "bg-rose-100",
        iconColor: "text-rose-700",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#F7F8FC]">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1A1C78] py-20 px-4 text-center">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(107,111,245,0.3),transparent)]" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/15 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
            Free · No Login · Instant Results · 100% Private
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-[1.1] tracking-tight">
            Financial Calculators
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
              Built for India
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            GST, EMI, SIP, Income Tax, HRA, PPF — accurate, instant, no sign-up.
            Trusted by Indian taxpayers & investors.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/gst-invoice-generator"
              className="flex items-center gap-2 px-5 py-2.5 bg-accent-500 text-white text-sm font-bold rounded-xl hover:bg-accent-600 transition-all shadow-lg shadow-accent-500/30 hover:scale-[1.03]"
            >
              <FileText className="w-4 h-4" />
              Generate Free Invoice
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/income-tax-calculator"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-xl hover:bg-white/15 transition-all border border-white/20 backdrop-blur-sm"
            >
              <Calculator className="w-4 h-4" />
              Calculate Tax
            </Link>
          </div>

          {/* Quick-access pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["GST Calculator", "EMI Calculator", "SIP Calculator", "Income Tax", "PPF Calculator", "HRA Calculator"].map(
              (tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 bg-white/8 text-white/60 text-xs rounded-lg border border-white/10"
                >
                  {tool}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Trust badges ──────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          {[
            { icon: ShieldCheck, text: "No data stored" },
            { icon: Zap, text: "Instant calculations" },
            { icon: Lock, text: "No login needed" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon className="w-4 h-4 text-brand-500" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tool grid ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {TOOL_CATEGORIES.map((cat) => (
          <div key={cat.category} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${cat.categoryBg} ${cat.categoryColor}`}>
                {cat.category}
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cat.tools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Stats banner ──────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#1A1C78] via-brand-700 to-brand-600 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "9+", label: "Free Calculators" },
            { value: "100%", label: "Client-Side" },
            { value: "₹0", label: "Forever Free" },
            { value: "0s", label: "Load Time" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold mb-1 text-accent-300">{stat.value}</div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEO content ───────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          India&apos;s Most Comprehensive Free Financial Calculator Suite
        </h2>
        <div className="text-gray-500 text-sm leading-relaxed space-y-3">
          <p>
            CalcBharat provides free, accurate financial calculators designed specifically for Indian
            taxpayers, investors, and businesses. From GST calculations with CGST/SGST/IGST breakdowns
            to SIP wealth projections, every tool is tailored to India&apos;s tax laws and financial products.
          </p>
          <p>
            All calculations run instantly in your browser — no data is ever sent to any server.
            Your financial information stays completely private.
          </p>
        </div>
      </section>
    </div>
  );
}
