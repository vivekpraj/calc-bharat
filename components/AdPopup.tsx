"use client";
import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";

interface AdPopupProps {
  onClose: () => void;
}

const AD_DURATION = 10;

const ADS = [
  {
    label: "SPONSORED",
    headline: "File your ITR in minutes — Free for Salaried",
    sub: "Auto-fill from Form 16. Expert CA review available.",
    cta: "File ITR Free →",
    bg: "from-indigo-600 to-brand-700",
    badge: "Tax Filing",
  },
  {
    label: "SPONSORED",
    headline: "Open a Zero-Cost Demat Account",
    sub: "Start investing in Stocks & Mutual Funds. No AMC charges.",
    cta: "Open Account Free →",
    bg: "from-emerald-600 to-teal-700",
    badge: "Investing",
  },
  {
    label: "SPONSORED",
    headline: "Home Loan at 8.40% p.a. — Check Eligibility",
    sub: "Instant approval. Minimal documentation. ₹0 processing fee.",
    cta: "Check Eligibility →",
    bg: "from-accent-500 to-orange-700",
    badge: "Home Loan",
  },
];

export default function AdPopup({ onClose }: AdPopupProps) {
  const [seconds, setSeconds] = useState(AD_DURATION);
  const ad = ADS[Math.floor(Math.random() * ADS.length)];

  useEffect(() => {
    if (seconds <= 0) {
      onClose();
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onClose]);

  const circumference = 2 * Math.PI * 18;
  const progress = (seconds / AD_DURATION) * circumference;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Ad content */}
        <div className={`bg-gradient-to-br ${ad.bg} p-6 text-white`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold tracking-widest opacity-70 uppercase">{ad.label}</span>
              <span className="ml-2 text-[10px] font-semibold bg-white/20 rounded-full px-2 py-0.5">{ad.badge}</span>
              <h2 className="text-lg font-bold mt-2 leading-snug">{ad.headline}</h2>
              <p className="text-sm opacity-80 mt-1">{ad.sub}</p>
            </div>
            {/* Countdown circle */}
            <div className="shrink-0 flex flex-col items-center gap-1">
              <div className="relative w-11 h-11">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                  <circle
                    cx="22" cy="22" r="18"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{seconds}</span>
              </div>
              <span className="text-[9px] opacity-60 text-center">Skip in<br/>{seconds}s</span>
            </div>
          </div>
          <button className="mt-4 flex items-center gap-1.5 px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
            {ad.cta}
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400">
            {seconds > 0 ? (
              <>PDF downloads in <strong className="text-gray-600">{seconds}s</strong> after this ad</>
            ) : (
              <span className="text-emerald-600 font-semibold">Starting your download…</span>
            )}
          </p>
          {seconds <= 5 && (
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
