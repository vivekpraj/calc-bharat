"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { calculateGST } from "@/lib/calculators/gst";
import { formatINR } from "@/lib/utils/format";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import BreakdownTable from "@/components/BreakdownTable";
import CalcChart from "@/components/CalcChart";
import PDFExportButton from "@/components/PDFExportButton";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";

const GST_RATES = [0, 5, 12, 18, 28];

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-brand-600 border border-gray-200 hover:border-brand-300 rounded-lg transition-colors">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
      {copied ? "Link copied!" : "Share"}
    </button>
  );
}

export default function GSTCalculatorClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [calcType, setCalcType] = useState<"add" | "remove">("add");
  const [txType, setTxType] = useState<"intra" | "inter">("intra");

  // Initialise state from URL params on mount
  useEffect(() => {
    const amt = searchParams.get("amt");
    const rateParam = searchParams.get("rate");
    const typeParam = searchParams.get("type");
    const txParam = searchParams.get("tx");
    if (amt !== null) setAmount(Number(amt));
    if (rateParam !== null && GST_RATES.includes(Number(rateParam))) setRate(Number(rateParam));
    if (typeParam === "add" || typeParam === "remove") setCalcType(typeParam);
    if (txParam === "intra" || txParam === "inter") setTxType(txParam);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("amt", String(amount));
    params.set("rate", String(rate));
    params.set("type", calcType);
    params.set("tx", txType);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [amount, rate, calcType, txType, router]);

  const result = useMemo(
    () => calculateGST({ amount, rate, calculationType: calcType, transactionType: txType }),
    [amount, rate, calcType, txType]
  );

  const chartData = {
    labels: ["Base Amount", "GST Amount"],
    datasets: [
      {
        data: [result.baseAmount, result.gstAmount],
        backgroundColor: ["#2563EB", "#F59E0B"],
        borderWidth: 0,
      },
    ],
  };

  const breakdownRows = [
    { label: "Base Amount", value: formatINR(result.baseAmount) },
    { label: `GST @ ${rate}%`, value: formatINR(result.gstAmount) },
    ...(txType === "intra"
      ? [
          { label: `CGST @ ${rate / 2}%`, value: formatINR(result.cgst) },
          { label: `SGST @ ${rate / 2}%`, value: formatINR(result.sgst) },
        ]
      : [{ label: `IGST @ ${rate}%`, value: formatINR(result.igst) }]),
    { label: "Total Amount", value: formatINR(result.totalAmount), highlight: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "GST Tools" }, { label: "GST Calculator" }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">GST Calculator</h1>
      <p className="text-gray-500 text-sm mb-6">
        Calculate GST amount with CGST, SGST & IGST breakdown. Supports all GST slabs.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Ad */}
        <div className="hidden xl:flex flex-col items-center pt-2">
          <AdSlot slot="gst-left" format="rectangle" />
        </div>

        {/* Main */}
        <div className="flex-1 space-y-6">
          {/* Input Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">Enter Details</h2>

            <SliderInput
              label="Amount"
              value={amount}
              min={0}
              max={1000000}
              step={100}
              prefix="₹"
              onChange={setAmount}
              formatDisplay={(v) => formatINR(v)}
              formatMin={(v) => formatINR(v)}
              formatMax={(v) => formatINR(v)}
            />

            {/* GST Rate Toggle */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700 block mb-2">GST Rate</label>
              <div className="flex gap-2 flex-wrap">
                {GST_RATES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      rate === r
                        ? "bg-brand-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600"
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Type */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700 block mb-2">Calculation Type</label>
              <div className="flex gap-3">
                {(["add", "remove"] as const).map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={calcType === t}
                      onChange={() => setCalcType(t)}
                      className="accent-brand-600"
                    />
                    <span className="text-sm text-gray-700">
                      {t === "add" ? "Add GST to amount" : "Remove GST from amount"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transaction Type */}
            <div className="mb-2">
              <label className="text-sm font-medium text-gray-700 block mb-2">Transaction Type</label>
              <div className="flex gap-3">
                {(["intra", "inter"] as const).map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={txType === t}
                      onChange={() => setTxType(t)}
                      className="accent-brand-600"
                    />
                    <span className="text-sm text-gray-700">
                      {t === "intra" ? "Intra-state (CGST + SGST)" : "Inter-state (IGST)"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div id="gst-pdf-export" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResultCard label="Base Amount" value={result.baseAmount} format={formatINR} color="gray" size="md" />
              <ResultCard label="GST Amount" value={result.gstAmount} format={formatINR} color="amber" size="md" />
              <ResultCard label="Total Amount" value={result.totalAmount} format={formatINR} color="blue" size="md" />
            </div>

            <BreakdownTable rows={breakdownRows} title="GST Breakdown" />

            <CalcChart
              type="doughnut"
              data={chartData}
              title="Base Amount vs GST"
            />

            <div className="flex justify-end gap-2">
              <ShareButton />
              <PDFExportButton
                targetId="gst-pdf-export"
                filename={`paisabatao-gst-${new Date().toISOString().slice(0, 10)}.pdf`}
                title="GST Calculation"
              />
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-800">What is GST?</h3>
                <p className="text-gray-500 mt-1">Goods and Services Tax (GST) is a unified indirect tax levied on the supply of goods and services in India. It replaced multiple indirect taxes and has slabs of 0%, 5%, 12%, 18%, and 28%.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">What is the difference between CGST, SGST, and IGST?</h3>
                <p className="text-gray-500 mt-1">For intra-state transactions, GST is split equally between Central GST (CGST) and State GST (SGST). For inter-state transactions, Integrated GST (IGST) is levied by the central government.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">How do I calculate GST on an amount?</h3>
                <p className="text-gray-500 mt-1">GST Amount = Base Amount × (GST Rate / 100). Total = Base + GST. To reverse-calculate, Base = Total × 100 / (100 + Rate).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Ad */}
        <div className="hidden xl:flex flex-col items-center pt-2">
          <AdSlot slot="gst-right" format="rectangle" />
        </div>
      </div>
    </div>
  );
}
