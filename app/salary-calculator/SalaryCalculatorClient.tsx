"use client";
import { useState, useMemo } from "react";
import { calculateSalary, PROFESSIONAL_TAX_BY_STATE } from "@/lib/calculators/salary";
import { formatINR, formatINRCompact } from "@/lib/utils/format";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import BreakdownTable from "@/components/BreakdownTable";
import CalcChart from "@/components/CalcChart";
import PDFExportButton from "@/components/PDFExportButton";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";

const STATES = Object.keys(PROFESSIONAL_TAX_BY_STATE);

export default function SalaryCalculatorClient() {
  const [ctc, setCtc] = useState(1200000);
  const [basicPct, setBasicPct] = useState(50);
  const [hraPct, setHraPct] = useState(40);
  const [pfApplicable, setPfApplicable] = useState(true);
  const [state, setState] = useState("Other");

  const profTax = PROFESSIONAL_TAX_BY_STATE[state] ?? 0;
  const result = useMemo(() => calculateSalary({ ctc, basicPercent: basicPct, hraPercent: hraPct, pfApplicable, professionalTax: profTax }), [ctc, basicPct, hraPct, pfApplicable, profTax]);

  const barData = {
    labels: ["CTC Breakdown"],
    datasets: [
      { label: "Basic", data: [Math.round(result.basic)], backgroundColor: "#2563EB" },
      { label: "HRA", data: [Math.round(result.hra)], backgroundColor: "#059669" },
      { label: "Special Allowance", data: [Math.round(result.specialAllowance)], backgroundColor: "#F59E0B" },
      { label: "Employer PF", data: [Math.round(result.employerPF)], backgroundColor: "#9CA3AF" },
    ],
  };

  const rows = [
    { label: "Annual CTC", value: formatINR(result.ctc) },
    { label: "Basic Salary", value: `${formatINR(result.basic)} / yr` },
    { label: "HRA", value: `${formatINR(result.hra)} / yr` },
    { label: "Special Allowance", value: `${formatINR(result.specialAllowance)} / yr` },
    { label: "Employee PF (12%)", value: pfApplicable ? `−${formatINR(result.employeePF)} / yr` : "N/A" },
    { label: "Professional Tax", value: profTax > 0 ? `−${formatINR(profTax)} / yr` : "₹0 (not applicable)" },
    { label: "Monthly In-Hand", value: formatINR(result.netInHandMonthly), highlight: true },
    { label: "Annual In-Hand", value: formatINR(result.netInHandAnnual) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Salary & HR" }, { label: "Salary Calculator" }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">Salary / CTC Calculator</h1>
      <div className="mb-2"><LastUpdatedBadge label="New tax regime defaults updated for FY 2025-26" /></div>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Break down your CTC and calculate your net monthly in-hand salary.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="salary-left" format="rectangle" /></div>
        <div className="flex-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <SliderInput label="Annual CTC" value={ctc} min={200000} max={10000000} step={50000} prefix="₹" onChange={setCtc} formatDisplay={formatINR} formatMin={formatINRCompact} formatMax={formatINRCompact} />
            <SliderInput label="Basic % of CTC" value={basicPct} min={40} max={60} step={1} unit="%" onChange={setBasicPct} formatDisplay={(v) => `${v}%`} formatMin={(v) => `${v}%`} formatMax={(v) => `${v}%`} />
            <SliderInput label="HRA % of Basic" value={hraPct} min={40} max={50} step={1} unit="%" onChange={setHraPct} formatDisplay={(v) => `${v}%`} formatMin={(v) => `${v}%`} formatMax={(v) => `${v}%`} />

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">PF Contribution</label>
                <div className="flex gap-2">
                  {[true, false].map((v) => (
                    <button key={String(v)} onClick={() => setPfApplicable(v)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${pfApplicable === v ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600"}`}>
                      {v ? "Applicable" : "Not Applicable"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">State (Professional Tax)</label>
                <select value={state} onChange={(e) => setState(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400">
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div id="salary-pdf-export" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard label="Monthly In-Hand" value={result.netInHandMonthly} format={formatINR} color="blue" size="lg" />
              <ResultCard label="Annual In-Hand" value={result.netInHandAnnual} format={formatINR} color="green" size="md" />
            </div>
            <BreakdownTable rows={rows} title="CTC Breakdown" />
            <CalcChart type="bar" data={barData} title="CTC Component Split" height={200} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />
            <div className="flex justify-end">
              <PDFExportButton targetId="salary-pdf-export" filename={`calcbharat-salary-${new Date().toISOString().slice(0,10)}.pdf`} title="Salary Breakdown" />
            </div>
          </div>
        </div>
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="salary-right" format="rectangle" /></div>
      </div>
    </div>
  );
}
