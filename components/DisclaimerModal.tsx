"use client";
import { useEffect, useState } from "react";
import { X, AlertTriangle } from "lucide-react";

const SESSION_KEY = "calcbharat_disclaimer_shown";

export default function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={dismiss} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Important Disclaimer</h2>
            <p className="text-xs text-gray-400">Please read before using our calculators</p>
          </div>
          <button onClick={dismiss} className="ml-auto p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            The calculators on CalcBharat are provided for <strong className="text-gray-800 dark:text-gray-100">educational and informational purposes only</strong>. Results are estimates based on the inputs you provide and current tax/financial rules.
          </p>
          <ul className="space-y-1.5">
            {[
              "Tax calculations are based on FY 2025-26 slabs and may not reflect individual deductions.",
              "EMI and investment projections assume constant rates and do not account for market fluctuations.",
              "Always consult a qualified Chartered Accountant or financial advisor before making decisions.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-400">This notice appears once per session.</p>
          <button
            onClick={dismiss}
            className="px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-lg hover:bg-brand-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
