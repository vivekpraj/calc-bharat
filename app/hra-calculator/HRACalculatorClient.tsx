"use client";
import { useState, useMemo } from "react";
import { calculateHRA } from "@/lib/calculators/hra";
import { formatINR } from "@/lib/utils/format";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import BreakdownTable from "@/components/BreakdownTable";
import CalcChart from "@/components/CalcChart";
import PDFExportButton from "@/components/PDFExportButton";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";

export default function HRACalculatorClient() {
  const [basic, setBasic] = useState(50000);
  const [hra, setHra] = useState(20000);
  const [rent, setRent] = useState(18000);
  const [city, setCity] = useState<"metro" | "non-metro">("metro");

  const result = useMemo(() => calculateHRA({ basicSalary: basic, hraReceived: hra, rentPaid: rent, cityType: city }), [basic, hra, rent, city]);

  const barData = {
    labels: ["Actual HRA Received", `${result.cityPercent}% of Basic`, "Rent - 10% of Basic"],
    datasets: [{
      label: "Amount (₹/month)",
      data: [result.actualHRAReceived, result.percentOfBasic, result.excessRent],
      backgroundColor: (ctx: { raw: unknown }) => {
        const val = ctx.raw as number;
        return val === result.hraExemption ? "#059669" : "#2563EB";
      },
      borderRadius: 6,
    }],
  };

  const rows = [
    { label: "Actual HRA Received", value: formatINR(result.actualHRAReceived) },
    { label: `${result.cityPercent}% of Basic Salary`, value: formatINR(result.percentOfBasic) },
    { label: "Rent Paid − 10% of Basic", value: formatINR(result.excessRent) },
    { label: "HRA Exemption (Minimum of above)", value: formatINR(result.hraExemption), highlight: true },
    { label: "Taxable HRA", value: formatINR(result.taxableHRA) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tax Calculators" }, { label: "HRA Calculator" }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">HRA Exemption Calculator</h1>
      <div className="mb-2"><LastUpdatedBadge label="HRA rules updated for FY 2026-27" /></div>
      <p className="text-gray-500 text-sm mb-6">Calculate your HRA tax exemption under Section 10(13A) of the Income Tax Act.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="hra-left" format="rectangle" /></div>
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <SliderInput label="Basic Salary (₹/month)" value={basic} min={10000} max={500000} step={1000} prefix="₹" onChange={setBasic} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINR} />
            <SliderInput label="HRA Received (₹/month)" value={hra} min={5000} max={300000} step={500} prefix="₹" onChange={setHra} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINR} />
            <SliderInput label="Rent Paid (₹/month)" value={rent} min={5000} max={300000} step={500} prefix="₹" onChange={setRent} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINR} />
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">City Type</label>
              <div className="flex gap-2">
                {(["metro", "non-metro"] as const).map((c) => (
                  <button key={c} onClick={() => setCity(c)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${city === c ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600"}`}>
                    {c === "metro" ? "Metro (50%)" : "Non-Metro (40%)"}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">Metro cities (50%): Mumbai, Delhi, Kolkata, Chennai, Hyderabad, Pune, Bengaluru, Ahmedabad</p>
            </div>
          </div>

          <div id="hra-pdf-export" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard label="HRA Exemption" value={result.hraExemption} format={formatINR} color="green" size="lg" subtitle="Minimum of the three conditions" />
              <ResultCard label="Taxable HRA" value={result.taxableHRA} format={formatINR} color="red" size="md" subtitle="Will be added to your income" />
            </div>
            <BreakdownTable rows={rows} title="HRA Exemption Calculation" />
            <CalcChart type="bar" data={barData} title="Three Conditions — HRA Exemption = Minimum" height={240} />
            <div className="flex justify-end">
              <PDFExportButton targetId="hra-pdf-export" filename={`calcbharat-hra-${new Date().toISOString().slice(0,10)}.pdf`} title="HRA Calculation" />
            </div>
          </div>
        </div>
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="hra-right" format="rectangle" /></div>
      </div>
    </div>
  );
}
