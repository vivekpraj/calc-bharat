"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { calculateEMI } from "@/lib/calculators/emi";
import { formatINR, formatINRCompact, formatPercent } from "@/lib/utils/format";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import BreakdownTable from "@/components/BreakdownTable";
import CalcChart from "@/components/CalcChart";
import PDFExportButton from "@/components/PDFExportButton";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";

const LOAN_TYPES = [
  { label: "Home Loan", principal: 3000000, rate: 8.5, tenure: 20 },
  { label: "Car Loan", principal: 800000, rate: 9.5, tenure: 5 },
  { label: "Personal", principal: 500000, rate: 14, tenure: 3 },
  { label: "Education", principal: 1000000, rate: 10.5, tenure: 7 },
];

function RateComparisonTable({ principal, currentRate, tenureYears }: {
  principal: number; currentRate: number; tenureYears: number;
}) {
  const rates = [7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12];
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Rate Comparison Table</h3>
        <p className="text-xs text-gray-400 mt-0.5">Same loan • different interest rates</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/60">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Interest Rate</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400">Monthly EMI</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400">Total Interest</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400">Total Payable</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => {
              const res = calculateEMI({ principal, annualRate: r, tenureYears });
              const isActive = Math.abs(r - currentRate) < 0.01;
              return (
                <tr key={r} className={`border-t border-gray-50 dark:border-gray-800 transition-colors ${isActive ? "bg-brand-50 dark:bg-brand-900/30" : "hover:bg-gray-50 dark:hover:bg-gray-800/40"}`}>
                  <td className="px-4 py-2.5">
                    <span className={`font-semibold ${isActive ? "text-brand-600 dark:text-brand-400" : "text-gray-700 dark:text-gray-300"}`}>
                      {r}%
                      {isActive && <span className="ml-1.5 text-[10px] bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300 rounded px-1 py-0.5 font-bold">current</span>}
                    </span>
                  </td>
                  <td className={`px-4 py-2.5 text-right font-semibold ${isActive ? "text-brand-600 dark:text-brand-400" : "text-gray-900 dark:text-gray-100"}`}>{formatINR(res.emi)}</td>
                  <td className={`px-4 py-2.5 text-right ${isActive ? "text-red-600" : "text-red-500"}`}>{formatINR(res.totalInterest)}</td>
                  <td className={`px-4 py-2.5 text-right ${isActive ? "text-gray-900 dark:text-gray-100 font-semibold" : "text-gray-700 dark:text-gray-300"}`}>{formatINR(res.totalPayable)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={copy} className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      {copied ? <><svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>Copied!</> : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>Share</>}
    </button>
  );
}

export default function EMICalculatorClient({
  defaultLoanType = 0,
  pageTitle = "EMI Calculator",
  pageDesc = "Calculate monthly EMI for Home, Car, Personal & Education loans.",
}: {
  defaultLoanType?: number;
  pageTitle?: string;
  pageDesc?: string;
} = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialLoan = LOAN_TYPES[defaultLoanType] ?? LOAN_TYPES[0];
  const [loanType, setLoanType] = useState(defaultLoanType);
  const [principal, setPrincipal] = useState(initialLoan.principal);
  const [rate, setRate] = useState(initialLoan.rate);
  const [tenure, setTenure] = useState(initialLoan.tenure);
  const [prepayment, setPrepayment] = useState(0);
  const [showPrepayment, setShowPrepayment] = useState(false);

  useEffect(() => {
    const p = searchParams.get("amount");
    const r = searchParams.get("rate");
    const t = searchParams.get("tenure");
    if (p) setPrincipal(Number(p));
    if (r) setRate(Number(r));
    if (t) setTenure(Number(t));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const params = new URLSearchParams({ amount: String(principal), rate: String(rate), tenure: String(tenure) });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [principal, rate, tenure]); // eslint-disable-line react-hooks/exhaustive-deps

  const result = useMemo(
    () => calculateEMI({ principal, annualRate: rate, tenureYears: tenure, prepayment }),
    [principal, rate, tenure, prepayment]
  );

  const handleLoanType = (idx: number) => {
    setLoanType(idx);
    const lt = LOAN_TYPES[idx];
    setPrincipal(lt.principal);
    setRate(lt.rate);
    setTenure(lt.tenure);
  };

  const doughnutData = {
    labels: ["Principal", "Total Interest"],
    datasets: [{ data: [principal, result.totalInterest], backgroundColor: ["#2563EB", "#F59E0B"], borderWidth: 0 }],
  };

  const amortLabels = result.amortization.map((a) => `Yr ${a.year}`);
  const barData = {
    labels: amortLabels,
    datasets: [
      { label: "Principal", data: result.amortization.map((a) => Math.round(a.principal)), backgroundColor: "#2563EB", stack: "s" },
      { label: "Interest", data: result.amortization.map((a) => Math.round(a.interest)), backgroundColor: "#F59E0B", stack: "s" },
    ],
  };
  const barOptions = { scales: { x: { stacked: true }, y: { stacked: true } } };

  const breakdownRows = [
    { label: "Loan Amount", value: formatINR(principal) },
    { label: "Monthly EMI", value: formatINR(result.emi), highlight: true },
    { label: "Total Interest Payable", value: formatINR(result.totalInterest), subLabel: "In red — the cost of borrowing" },
    { label: "Total Amount Payable", value: formatINR(result.totalPayable) },
    { label: "Interest Portion", value: formatPercent(result.interestPercent) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Loan & EMI" }, { label: pageTitle }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{pageTitle}</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{pageDesc}</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden xl:flex flex-col items-center pt-2">
          <AdSlot slot="emi-left" format="rectangle" />
        </div>

        <div className="flex-1 space-y-6">
          {/* Inputs */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            {/* Loan type tabs */}
            <div className="flex gap-2 flex-wrap mb-5">
              {LOAN_TYPES.map((lt, i) => (
                <button
                  key={lt.label}
                  onClick={() => handleLoanType(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    loanType === i ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600"
                  }`}
                >
                  {lt.label}
                </button>
              ))}
            </div>

            <SliderInput label="Loan Amount" value={principal} min={10000} max={50000000} step={10000} prefix="₹" onChange={setPrincipal} formatDisplay={formatINR} formatMin={formatINRCompact} formatMax={formatINRCompact} />
            <SliderInput label="Interest Rate (% p.a.)" value={rate} min={5} max={30} step={0.1} unit="%" onChange={setRate} formatDisplay={(v) => `${v.toFixed(1)}%`} formatMin={(v) => `${v}%`} formatMax={(v) => `${v}%`} />
            <SliderInput label="Loan Tenure" value={tenure} min={1} max={30} step={1} unit=" yrs" onChange={setTenure} formatDisplay={(v) => `${v} years`} formatMin={(v) => `${v} yr`} formatMax={(v) => `${v} yrs`} />

            {/* Prepayment */}
            <div className="mt-4">
              <button
                onClick={() => setShowPrepayment(!showPrepayment)}
                className="text-sm text-brand-600 font-semibold hover:underline"
              >
                {showPrepayment ? "▾" : "▸"} Prepayment (Optional)
              </button>
              {showPrepayment && (
                <div className="mt-3">
                  <SliderInput label="Prepayment Amount" value={prepayment} min={0} max={principal} step={10000} prefix="₹" onChange={setPrepayment} formatDisplay={formatINR} formatMin={(v) => formatINR(v)} formatMax={formatINRCompact} />
                </div>
              )}
            </div>
          </div>

          <div id="emi-pdf-export" className="space-y-4">
            {/* Result cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResultCard label="Monthly EMI" value={result.emi} format={formatINR} color="blue" size="lg" />
              <ResultCard label="Total Interest" value={result.totalInterest} format={formatINR} color="red" size="md" />
              <ResultCard label="Total Payable" value={result.totalPayable} format={formatINR} color="gray" size="md" />
            </div>

            <BreakdownTable rows={breakdownRows} title="Loan Summary" />

            {/* Prepayment result */}
            {result.prepaymentResult && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-2xl p-4">
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Prepayment Analysis</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div><p className="text-xs text-gray-500">Monthly EMI</p><p className="font-bold text-gray-900 dark:text-gray-100">{formatINR(result.prepaymentResult.newEmi)}</p></div>
                  <div><p className="text-xs text-gray-500">New Total Interest</p><p className="font-bold text-gray-900 dark:text-gray-100">{formatINR(result.prepaymentResult.newTotalInterest)}</p></div>
                  <div><p className="text-xs text-gray-500">Interest Saved</p><p className="font-bold text-emerald-700">{formatINR(result.prepaymentResult.interestSaved)}</p></div>
                  <div><p className="text-xs text-gray-500">New Tenure</p><p className="font-bold text-gray-900 dark:text-gray-100">{result.prepaymentResult.newTenureMonths} months</p></div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalcChart type="doughnut" data={doughnutData} title="Principal vs Interest" />
              <CalcChart type="bar" data={barData} options={barOptions} title="Year-wise Amortization" height={240} />
            </div>

            <RateComparisonTable principal={principal} currentRate={rate} tenureYears={tenure} />

            <div className="flex items-center justify-end gap-3">
              <ShareButton />
              <PDFExportButton targetId="emi-pdf-export" filename={`calcbharat-emi-${new Date().toISOString().slice(0,10)}.pdf`} title="EMI Calculation" />
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              <div><h3 className="font-semibold text-gray-800 dark:text-gray-200">What is EMI?</h3><p className="text-gray-500 dark:text-gray-400 mt-1">EMI (Equated Monthly Instalment) is the fixed monthly payment you make to repay a loan. It includes both principal and interest components.</p></div>
              <div><h3 className="font-semibold text-gray-800 dark:text-gray-200">What is the formula for EMI calculation?</h3><p className="text-gray-500 dark:text-gray-400 mt-1">EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P = Principal, r = monthly interest rate, n = number of monthly instalments.</p></div>
              <div><h3 className="font-semibold text-gray-800 dark:text-gray-200">Does prepayment reduce EMI or tenure?</h3><p className="text-gray-500 dark:text-gray-400 mt-1">Prepayment reduces the outstanding principal, which reduces the total interest. Banks generally offer the option to either reduce EMI amount or reduce loan tenure.</p></div>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex flex-col items-center pt-2">
          <AdSlot slot="emi-right" format="rectangle" />
        </div>
      </div>
    </div>
  );
}
