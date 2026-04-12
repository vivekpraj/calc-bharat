"use client";
import { useState, useMemo } from "react";
import { calculateFD, calculateRD, type CompoundingFrequency } from "@/lib/calculators/fd";
import { formatINR, formatINRCompact, formatPercent } from "@/lib/utils/format";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import BreakdownTable from "@/components/BreakdownTable";
import CalcChart from "@/components/CalcChart";
import PDFExportButton from "@/components/PDFExportButton";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";

const COMPOUNDING_OPTIONS: { label: string; value: CompoundingFrequency }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Half-Yearly", value: "half-yearly" },
  { label: "Yearly", value: "yearly" },
];

export default function FDCalculatorClient() {
  const [fdMode, setFdMode] = useState<"fd" | "rd">("fd");
  const [principal, setPrincipal] = useState(100000);
  const [monthlyRD, setMonthlyRD] = useState(5000);
  const [rate, setRate] = useState(7);
  const [tenure, setTenure] = useState(12);
  const [compounding, setCompounding] = useState<CompoundingFrequency>("quarterly");
  const [includeTDS, setIncludeTDS] = useState(false);

  const fdResult = useMemo(() => calculateFD({ principal, annualRate: rate, tenureMonths: tenure, compounding, includeTDS }), [principal, rate, tenure, compounding, includeTDS]);
  const rdResult = useMemo(() => calculateRD({ monthlyDeposit: monthlyRD, annualRate: rate, tenureMonths: tenure }), [monthlyRD, rate, tenure]);

  const result = fdMode === "fd" ? { maturity: fdResult.maturityAmount, interest: fdResult.netInterest, principal: principal } : { maturity: rdResult.maturityAmount, interest: rdResult.interestEarned, principal: rdResult.totalDeposited };

  const doughnutData = {
    labels: ["Principal", "Interest Earned"],
    datasets: [{ data: [Math.round(result.principal), Math.round(result.interest)], backgroundColor: ["#2563EB", "#059669"], borderWidth: 0 }],
  };

  const rows = fdMode === "fd" ? [
    { label: "Principal Amount", value: formatINR(principal) },
    { label: "Tenure", value: `${tenure} months (${(tenure/12).toFixed(1)} years)` },
    { label: "Interest Rate", value: `${rate}% p.a. (${compounding})` },
    { label: "Gross Interest", value: formatINR(fdResult.interestEarned) },
    ...(fdResult.tdsDeducted > 0 ? [{ label: "TDS Deducted (10%)", value: formatINR(fdResult.tdsDeducted) }] : []),
    { label: "Effective Annual Rate", value: formatPercent(fdResult.effectiveAnnualRate) },
    { label: "Maturity Amount", value: formatINR(fdResult.maturityAmount), highlight: true },
  ] : [
    { label: "Monthly Deposit", value: formatINR(monthlyRD) },
    { label: "Total Deposited", value: formatINR(rdResult.totalDeposited) },
    { label: "Tenure", value: `${tenure} months` },
    { label: "Interest Earned", value: formatINR(rdResult.interestEarned) },
    { label: "Maturity Amount", value: formatINR(rdResult.maturityAmount), highlight: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Investment" }, { label: "FD / RD Calculator" }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">FD / RD Calculator</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Calculate maturity amount for Fixed Deposits and Recurring Deposits.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="fd-left" format="rectangle" /></div>
        <div className="flex-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <div className="flex gap-2 mb-5">
              {(["fd", "rd"] as const).map((m) => (
                <button key={m} onClick={() => setFdMode(m)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${fdMode === m ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600"}`}>
                  {m === "fd" ? "Fixed Deposit" : "Recurring Deposit"}
                </button>
              ))}
            </div>

            {fdMode === "fd" ? (
              <SliderInput label="Deposit Amount" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINRCompact} />
            ) : (
              <SliderInput label="Monthly Deposit" value={monthlyRD} min={500} max={100000} step={500} prefix="₹" onChange={setMonthlyRD} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINRCompact} />
            )}
            <SliderInput label="Interest Rate (% p.a.)" value={rate} min={4} max={9.5} step={0.1} unit="%" onChange={setRate} formatDisplay={(v) => `${v.toFixed(1)}%`} formatMin={(v) => `${v}%`} formatMax={(v) => `${v}%`} />
            <SliderInput label="Tenure (Months)" value={tenure} min={1} max={120} step={1} unit=" mo" onChange={setTenure} formatDisplay={(v) => `${v} months`} formatMin={(v) => `${v} mo`} formatMax={(v) => `${v} mo`} />

            {fdMode === "fd" && (
              <>
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Compounding</label>
                  <div className="flex gap-2 flex-wrap">
                    {COMPOUNDING_OPTIONS.map((opt) => (
                      <button key={opt.value} onClick={() => setCompounding(opt.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${compounding === opt.value ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="checkbox" checked={includeTDS} onChange={(e) => setIncludeTDS(e.target.checked)} className="accent-brand-600" />
                  Include TDS deduction (10% on interest &gt; ₹40,000)
                </label>
              </>
            )}
          </div>

          <div id="fd-pdf-export" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResultCard label="Maturity Amount" value={result.maturity} format={formatINR} color="blue" size="lg" />
              <ResultCard label="Principal" value={result.principal} format={formatINR} color="gray" size="md" />
              <ResultCard label="Interest Earned" value={result.interest} format={formatINR} color="green" size="md" />
            </div>
            <BreakdownTable rows={rows} title="Deposit Summary" />
            <CalcChart type="doughnut" data={doughnutData} title="Principal vs Interest" />
            <div className="flex justify-end">
              <PDFExportButton targetId="fd-pdf-export" filename={`calcbharat-fd-${new Date().toISOString().slice(0,10)}.pdf`} title="FD/RD Calculation" />
            </div>
          </div>
        </div>
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="fd-right" format="rectangle" /></div>
      </div>
    </div>
  );
}
