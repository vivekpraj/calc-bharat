"use client";
import { useState, useCallback } from "react";
import { formatINR, formatINRCompact, formatPercent } from "@/lib/utils/format";
import SliderInput from "@/components/SliderInput";
import BreakdownTable from "@/components/BreakdownTable";
import CalcChart from "@/components/CalcChart";
import PDFExportButton from "@/components/PDFExportButton";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";

interface TaxResult {
  taxOldRegime: number;
  taxNewRegime: number;
  recommendedRegime: "old" | "new";
  taxSavings: number;
  effectiveRateOld: number;
  effectiveRateNew: number;
  monthlyTaxOld: number;
  monthlyTaxNew: number;
  takeHomeOld: number;
  takeHomeNew: number;
}

const WORKER_URL = "https://income-tax.calcbharat.workers.dev";

export default function IncomeTaxClient() {
  const [grossIncome, setGrossIncome] = useState(800000);
  const [section80C, setSection80C] = useState(150000);
  const [section80D, setSection80D] = useState(25000);
  const [hraExemption, setHraExemption] = useState(0);
  const [nps80CCD, setNps80CCD] = useState(50000);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [ageGroup, setAgeGroup] = useState<"below60" | "60to80" | "above80">("below60");
  const [result, setResult] = useState<TaxResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculate = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grossIncome,
          deductions: {
            section80C,
            section80D,
            hraExemption,
            nps80CCD,
            otherDeductions,
            standardDeduction: 50000, // old regime std deduction
          },
          regime: "both",
          ageGroup,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setResult(data);
    } catch {
      // Fallback: client-side calculation — FY 2025-26 slabs
      const oldStdDeduction = 50000;
      const newStdDeduction = 75000;
      const totalDeductions = section80C + section80D + hraExemption + nps80CCD + otherDeductions + oldStdDeduction;
      const taxableOld = Math.max(0, grossIncome - totalDeductions);
      const taxableNew = Math.max(0, grossIncome - newStdDeduction);

      const calcOld = (ti: number) => {
        if (ti <= 250000) return 0;
        let t = 0;
        if (ti > 250000) t += Math.min(ti - 250000, 250000) * 0.05;
        if (ti > 500000) t += Math.min(ti - 500000, 500000) * 0.2;
        if (ti > 1000000) t += (ti - 1000000) * 0.3;
        if (ti <= 500000) t = Math.max(0, t - 12500);
        return Math.round(t * 1.04);
      };
      const calcNew = (ti: number) => {
        // FY 2025-26: 87A rebate up to ₹12L
        if (ti <= 1200000) return 0;
        let t = 0;
        if (ti > 400000) t += Math.min(ti - 400000, 400000) * 0.05;
        if (ti > 800000) t += Math.min(ti - 800000, 400000) * 0.1;
        if (ti > 1200000) t += Math.min(ti - 1200000, 400000) * 0.15;
        if (ti > 1600000) t += Math.min(ti - 1600000, 400000) * 0.2;
        if (ti > 2000000) t += Math.min(ti - 2000000, 400000) * 0.25;
        if (ti > 2400000) t += (ti - 2400000) * 0.3;
        return Math.round(t * 1.04);
      };

      const taxOld = calcOld(taxableOld);
      const taxNew = calcNew(taxableNew);
      setResult({
        taxOldRegime: taxOld,
        taxNewRegime: taxNew,
        recommendedRegime: taxOld <= taxNew ? "old" : "new",
        taxSavings: Math.abs(taxOld - taxNew),
        effectiveRateOld: grossIncome > 0 ? (taxOld / grossIncome) * 100 : 0,
        effectiveRateNew: grossIncome > 0 ? (taxNew / grossIncome) * 100 : 0,
        monthlyTaxOld: Math.round(taxOld / 12),
        monthlyTaxNew: Math.round(taxNew / 12),
        takeHomeOld: grossIncome - taxOld,
        takeHomeNew: grossIncome - taxNew,
      });
    } finally {
      setLoading(false);
    }
  }, [grossIncome, section80C, section80D, hraExemption, nps80CCD, otherDeductions, ageGroup]);

  const barData = result ? {
    labels: ["Old Regime", "New Regime"],
    datasets: [
      { label: "Tax", data: [result.taxOldRegime, result.taxNewRegime], backgroundColor: ["#F59E0B", "#2563EB"], borderRadius: 8 },
    ],
  } : null;

  const doughnutData = result ? {
    labels: ["Take-home", "Tax", "Deductions"],
    datasets: [{
      data: [result.takeHomeNew, result.taxNewRegime, grossIncome - result.takeHomeNew - result.taxNewRegime],
      backgroundColor: ["#059669", "#EF4444", "#F59E0B"],
      borderWidth: 0,
    }],
  } : null;

  const comparisonRows = result ? [
    { label: "Tax — Old Regime", value: formatINR(result.taxOldRegime) },
    { label: "Tax — New Regime", value: formatINR(result.taxNewRegime) },
    { label: "Recommended Regime", value: result.recommendedRegime === "old" ? "Old Regime ✓" : "New Regime ✓", highlight: true },
    { label: "Tax Savings", value: formatINR(result.taxSavings) },
    { label: "Effective Rate (Old)", value: formatPercent(result.effectiveRateOld) },
    { label: "Effective Rate (New)", value: formatPercent(result.effectiveRateNew) },
    { label: "Monthly Tax (Old)", value: formatINR(result.monthlyTaxOld) },
    { label: "Monthly Tax (New)", value: formatINR(result.monthlyTaxNew) },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tax Calculators" }, { label: "Income Tax Calculator" }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Income Tax Calculator 2025-26</h1>
      <div className="mb-2"><LastUpdatedBadge /></div>
      <p className="text-gray-500 text-sm mb-6">Compare Old vs New tax regime for FY 2025-26 and find which saves you more.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="tax-left" format="rectangle" /></div>

        <div className="flex-1 space-y-6">
          {/* Inputs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Income & Deductions</h2>
            <SliderInput label="Gross Annual Income" value={grossIncome} min={0} max={10000000} step={10000} prefix="₹" onChange={setGrossIncome} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINRCompact} />

            <div className="mt-2 mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Age Group</label>
              <div className="flex gap-2 flex-wrap">
                {([["below60", "Below 60"], ["60to80", "60–80 years"], ["above80", "Above 80"]] as const).map(([val, label]) => (
                  <button key={val} onClick={() => setAgeGroup(val as typeof ageGroup)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${ageGroup === val ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 mb-4">
              Standard Deduction auto-applied: ₹50,000 (Old Regime) · ₹75,000 (New Regime) — FY 2025-26.
            </div>

            <h3 className="text-sm font-semibold text-gray-700 mb-3">Old Regime Deductions</h3>
            <SliderInput label="Section 80C (PF, PPF, ELSS, LIC)" value={section80C} min={0} max={150000} step={5000} prefix="₹" onChange={setSection80C} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINR} />
            <SliderInput label="Section 80D (Health Insurance)" value={section80D} min={0} max={100000} step={1000} prefix="₹" onChange={setSection80D} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINR} />
            <SliderInput label="NPS 80CCD(1B)" value={nps80CCD} min={0} max={50000} step={1000} prefix="₹" onChange={setNps80CCD} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINR} />

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">HRA Exemption (₹/year)</label>
              <input type="number" value={hraExemption} onChange={(e) => setHraExemption(Number(e.target.value))}
                className="w-40 text-sm font-semibold text-brand-700 border border-brand-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-brand-50" />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Other Deductions (80G, LTA, etc.) (₹)</label>
              <input type="number" value={otherDeductions} onChange={(e) => setOtherDeductions(Number(e.target.value))}
                className="w-40 text-sm font-semibold text-brand-700 border border-brand-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-brand-50" />
            </div>

            <button onClick={calculate} disabled={loading}
              className="w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-60">
              {loading ? "Calculating…" : "Calculate Tax"}
            </button>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          {result && (
            <div id="tax-pdf-export" className="space-y-4">
              {/* Regime comparison */}
              <div className={`rounded-2xl border-2 p-4 ${result.recommendedRegime === "new" ? "border-emerald-300 bg-emerald-50" : "border-brand-200 bg-brand-50"}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Recommended: {result.recommendedRegime === "new" ? "New Regime" : "Old Regime"}</p>
                <p className="text-sm text-gray-700">Switch to the <strong>{result.recommendedRegime} regime</strong> to save <strong className="text-emerald-700">{formatINR(result.taxSavings)}</strong> in taxes.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-amber-200 p-4">
                  <p className="text-xs font-semibold text-amber-600 uppercase mb-1">Old Regime</p>
                  <p className="text-2xl font-bold text-gray-900">{formatINR(result.taxOldRegime)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Eff. rate: {formatPercent(result.effectiveRateOld)} | Monthly: {formatINR(result.monthlyTaxOld)}</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-200 p-4">
                  <p className="text-xs font-semibold text-brand-600 uppercase mb-1">New Regime</p>
                  <p className="text-2xl font-bold text-gray-900">{formatINR(result.taxNewRegime)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Eff. rate: {formatPercent(result.effectiveRateNew)} | Monthly: {formatINR(result.monthlyTaxNew)}</p>
                </div>
              </div>

              <BreakdownTable rows={comparisonRows} title="Tax Comparison" />

              {barData && doughnutData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CalcChart type="bar" data={barData} title="Old vs New Regime Tax" height={220} />
                  <CalcChart type="doughnut" data={doughnutData} title="Take-home vs Tax (New Regime)" />
                </div>
              )}

              <div className="flex justify-end">
                <PDFExportButton targetId="tax-pdf-export" filename={`calcbharat-income-tax-${new Date().toISOString().slice(0,10)}.pdf`} title="Income Tax Calculation" />
              </div>
            </div>
          )}

          {/* Tax Slab Reference Tables */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-base font-semibold text-gray-800">Tax Slab Reference</h2>
              <span className="text-xs font-medium px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full">
                FY 2025-26 &amp; 2026-27 (unchanged)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Old Regime */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">Old Regime</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 rounded-tl-lg">Income Slab</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-500 rounded-tr-lg">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Up to ₹2.5L", "Nil"],
                      ["₹2.5L – ₹5L", "5%"],
                      ["₹5L – ₹10L", "20%"],
                      ["Above ₹10L", "30%"],
                    ].map(([slab, rate], i) => (
                      <tr key={slab} className={`border-t border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="px-3 py-2 text-gray-700">{slab}</td>
                        <td className="px-3 py-2 text-right font-semibold text-amber-600">{rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-2">+ 4% cess · 87A rebate if income ≤ ₹5L · Std deduction ₹50,000</p>
              </div>

              {/* New Regime */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">New Regime</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 rounded-tl-lg">Income Slab</th>
                      <th className="px-3 py-2 text-right text-xs font-semibold text-gray-500 rounded-tr-lg">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Up to ₹4L", "Nil"],
                      ["₹4L – ₹8L", "5%"],
                      ["₹8L – ₹12L", "10%"],
                      ["₹12L – ₹16L", "15%"],
                      ["₹16L – ₹20L", "20%"],
                      ["₹20L – ₹24L", "25%"],
                      ["Above ₹24L", "30%"],
                    ].map(([slab, rate], i) => (
                      <tr key={slab} className={`border-t border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="px-3 py-2 text-gray-700">{slab}</td>
                        <td className="px-3 py-2 text-right font-semibold text-brand-600">{rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-2">+ 4% cess · 87A rebate if income ≤ ₹12L · Std deduction ₹75,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">FAQ</h2>
            <div className="space-y-4 text-sm">
              <div><h3 className="font-semibold text-gray-800">What is the difference between Old and New tax regime?</h3><p className="text-gray-500 mt-1">The old regime allows deductions under 80C, 80D, HRA, etc. The new regime has lower tax rates but no deductions. If your deductions are large, old regime saves more; otherwise, new regime is better.</p></div>
              <div><h3 className="font-semibold text-gray-800">Who should choose the New Regime in FY 2025-26?</h3><p className="text-gray-500 mt-1">Taxpayers with income up to ₹12 lakh pay zero tax under the new regime due to the rebate under section 87A (FY 2025-26). Those with minimal deductions generally benefit more from the new regime.</p></div>
              <div><h3 className="font-semibold text-gray-800">What is included in Section 80C?</h3><p className="text-gray-500 mt-1">80C includes: EPF contributions, PPF, ELSS mutual funds, life insurance premiums, NSC, 5-year FD, and home loan principal repayment. Limit: ₹1.5 lakh.</p></div>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="tax-right" format="rectangle" /></div>
      </div>
    </div>
  );
}
