"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { calculateSIP, calculateLumpsum } from "@/lib/calculators/sip";
import { formatINR, formatINRCompact, formatPercent } from "@/lib/utils/format";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import BreakdownTable from "@/components/BreakdownTable";
import CalcChart from "@/components/CalcChart";
import PDFExportButton from "@/components/PDFExportButton";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";

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

export default function SIPCalculatorClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [monthly, setMonthly] = useState(5000);
  const [lumpsum, setLumpsum] = useState(100000);
  const [returnRate, setReturnRate] = useState(12);
  const [duration, setDuration] = useState(10);
  const [stepUp, setStepUp] = useState(0);
  const [showStepUp, setShowStepUp] = useState(false);

  // Initialise state from URL params on mount
  useEffect(() => {
    const amt = searchParams.get("amt");
    const ret = searchParams.get("ret");
    const dur = searchParams.get("dur");
    const step = searchParams.get("step");
    if (amt !== null) setMonthly(Number(amt));
    if (ret !== null) setReturnRate(Number(ret));
    if (dur !== null) setDuration(Number(dur));
    if (step !== null) {
      setStepUp(Number(step));
      if (Number(step) > 0) setShowStepUp(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("amt", String(monthly));
    params.set("ret", String(returnRate));
    params.set("dur", String(duration));
    if (stepUp > 0) params.set("step", String(stepUp));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [monthly, returnRate, duration, stepUp, router]);

  const result = useMemo(() => {
    if (mode === "sip") return calculateSIP({ monthlyAmount: monthly, annualReturn: returnRate, durationYears: duration, stepUpPercent: stepUp });
    return calculateLumpsum({ amount: lumpsum, annualReturn: returnRate, durationYears: duration });
  }, [mode, monthly, lumpsum, returnRate, duration, stepUp]);

  const lineData = {
    labels: result.yearlyData.map((d) => `Yr ${d.year}`),
    datasets: [
      { label: "Portfolio Value", data: result.yearlyData.map((d) => Math.round(d.value)), borderColor: "#2563EB", backgroundColor: "rgba(37,99,235,0.08)", fill: true, tension: 0.4 },
      { label: "Amount Invested", data: result.yearlyData.map((d) => Math.round(d.invested)), borderColor: "#9CA3AF", borderDash: [5, 5], backgroundColor: "transparent", tension: 0.4 },
    ],
  };
  const doughnutData = {
    labels: ["Amount Invested", "Wealth Gained"],
    datasets: [{ data: [Math.round(result.totalInvested), Math.round(result.wealthGained)], backgroundColor: ["#2563EB", "#059669"], borderWidth: 0 }],
  };

  const rows = [
    { label: mode === "sip" ? "Total Amount Invested" : "Lumpsum Invested", value: formatINR(result.totalInvested) },
    { label: "Total Wealth Gained", value: formatINR(result.wealthGained) },
    { label: "Wealth Gain %", value: formatPercent(result.wealthGainPercent) },
    { label: "Future Value", value: formatINR(result.futureValue), highlight: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Investment" }, { label: "SIP Calculator" }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">SIP Calculator</h1>
      <p className="text-gray-500 text-sm mb-6">Calculate future value of your SIP investments and visualize wealth growth.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="sip-left" format="rectangle" /></div>

        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex gap-2 mb-5">
              {(["sip", "lumpsum"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${mode === m ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600"}`}>
                  {m === "sip" ? "Monthly SIP" : "Lump Sum"}
                </button>
              ))}
            </div>

            {mode === "sip" ? (
              <SliderInput label="Monthly SIP Amount" value={monthly} min={500} max={100000} step={500} prefix="₹" onChange={setMonthly} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINRCompact} />
            ) : (
              <SliderInput label="Lump Sum Amount" value={lumpsum} min={5000} max={10000000} step={5000} prefix="₹" onChange={setLumpsum} formatDisplay={formatINR} formatMin={formatINR} formatMax={formatINRCompact} />
            )}
            <SliderInput label="Expected Return (% p.a.)" value={returnRate} min={1} max={30} step={0.5} unit="%" onChange={setReturnRate} formatDisplay={(v) => `${v.toFixed(1)}%`} formatMin={(v) => `${v}%`} formatMax={(v) => `${v}%`} />
            <SliderInput label="Investment Duration" value={duration} min={1} max={40} step={1} unit=" yrs" onChange={setDuration} formatDisplay={(v) => `${v} years`} formatMin={(v) => `${v} yr`} formatMax={(v) => `${v} yrs`} />

            {mode === "sip" && (
              <div className="mt-2">
                <button onClick={() => setShowStepUp(!showStepUp)} className="text-sm text-brand-600 font-semibold hover:underline">
                  {showStepUp ? "▾" : "▸"} Step-up SIP (Annual increase)
                </button>
                {showStepUp && (
                  <div className="mt-3">
                    <SliderInput label="Annual Step-up %" value={stepUp} min={0} max={25} step={1} unit="%" onChange={setStepUp} formatDisplay={(v) => `${v}%`} formatMin={(v) => `${v}%`} formatMax={(v) => `${v}%`} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div id="sip-pdf-export" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResultCard label="Future Value" value={result.futureValue} format={formatINR} color="blue" size="lg" />
              <ResultCard label="Total Invested" value={result.totalInvested} format={formatINR} color="gray" size="md" />
              <ResultCard label="Wealth Gained" value={result.wealthGained} format={formatINR} color="green" size="md" />
            </div>
            <BreakdownTable rows={rows} title="Investment Summary" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalcChart type="line" data={lineData} title="Wealth Growth Over Time" height={240} />
              <CalcChart type="doughnut" data={doughnutData} title="Invested vs Gains" />
            </div>
            <div className="flex justify-end gap-2">
              <ShareButton />
              <PDFExportButton targetId="sip-pdf-export" filename={`paisabatao-sip-${new Date().toISOString().slice(0,10)}.pdf`} title="SIP Calculation" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">FAQ</h2>
            <div className="space-y-4 text-sm">
              <div><h3 className="font-semibold text-gray-800">What is SIP?</h3><p className="text-gray-500 mt-1">SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in mutual funds. It helps build wealth over time through rupee cost averaging and compounding.</p></div>
              <div><h3 className="font-semibold text-gray-800">What is Step-up SIP?</h3><p className="text-gray-500 mt-1">Step-up SIP increases your monthly investment by a fixed percentage each year. This aligns with salary growth and accelerates wealth creation significantly.</p></div>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex flex-col items-center pt-2"><AdSlot slot="sip-right" format="rectangle" /></div>
      </div>
    </div>
  );
}
