"use client";
import { useState, useMemo } from "react";
import { calculatePPF } from "@/lib/calculators/ppf";
import { formatINR } from "@/lib/utils/format";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import BreakdownTable from "@/components/BreakdownTable";
import CalcChart from "@/components/CalcChart";
import PDFExportButton from "@/components/PDFExportButton";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";

export default function PPFCalculatorClient() {
  const [deposit, setDeposit] = useState(150000);
  const [rate, setRate] = useState(7.1);

  const result = useMemo(() => calculatePPF({ annualDeposit: deposit, interestRate: rate }), [deposit, rate]);

  const barData = {
    labels: result.yearlyData.map((d) => `${d.year}`),
    datasets: [
      { label: "Cumulative Invested", data: result.yearlyData.map((d) => Math.round(d.deposit * d.year)), backgroundColor: "#2563EB", stack: "s" },
      { label: "Cumulative Interest", data: result.yearlyData.map((d) => Math.round(d.closingBalance - d.deposit * d.year)), backgroundColor: "#059669", stack: "s" },
    ],
  };

  const tableRows = result.yearlyData.map((d) => ({
    label: `Year ${d.year}`,
    value: formatINR(d.closingBalance),
    subLabel: `Deposit: ${formatINR(d.deposit)} | Interest: ${formatINR(d.interest)}`,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Investment" }, { label: "PPF Calculator" }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">PPF Calculator</h1>
      <p className="text-gray-500 text-sm mb-6">Public Provident Fund — calculate maturity amount and year-by-year interest at current rate of 7.1% p.a.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="ppf-left" format="rectangle" /></div>
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <SliderInput label="Annual Deposit" value={deposit} min={500} max={150000} step={500} prefix="₹" onChange={setDeposit} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINR} />
            <div className="mb-2">
              <label className="text-sm font-medium text-gray-700 block mb-2">PPF Interest Rate (% p.a.)</label>
              <input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 7.1)} step={0.1} min={1} max={15}
                className="w-32 text-sm font-semibold text-brand-700 border border-brand-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-brand-50" />
              <span className="text-xs text-gray-400 ml-2">Current rate: 7.1% p.a. (Q1 2026-27)</span>
            </div>
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              PPF has a fixed tenure of <strong>15 years</strong>. Partial withdrawal allowed from Year 7 onwards.
            </div>
          </div>

          <div id="ppf-pdf-export" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResultCard label="Maturity Amount" value={result.maturityAmount} format={formatINR} color="blue" size="lg" />
              <ResultCard label="Total Invested" value={result.totalInvested} format={formatINR} color="gray" size="md" />
              <ResultCard label="Interest Earned" value={result.interestEarned} format={formatINR} color="green" size="md" />
            </div>
            <CalcChart type="bar" data={barData} title="Year-wise PPF Growth (15 Years)" height={260} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />
            <BreakdownTable rows={tableRows.slice(0, 5)} title="Year-by-Year Breakdown (first 5 years)" />
            <div className="flex justify-end">
              <PDFExportButton targetId="ppf-pdf-export" filename={`calcbharat-ppf-${new Date().toISOString().slice(0,10)}.pdf`} title="PPF Calculation" />
            </div>
          </div>
        </div>
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="ppf-right" format="rectangle" /></div>
      </div>
    </div>
  );
}
