import type { Metadata } from "next";
import { Suspense } from "react";
import SIPCalculatorClient from "./SIPCalculatorClient";
export const metadata: Metadata = {
  title: "SIP Calculator — Future Value & Returns",
  description: "Free SIP calculator. Calculate future value of SIP investments with step-up option and wealth growth visualization.",
};
export default function SIPCalculatorPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl" />}>
      <SIPCalculatorClient />
    </Suspense>
  );
}
