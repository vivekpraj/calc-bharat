import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

export const metadata: Metadata = {
  title: "Personal Loan EMI Calculator — Instant Results",
  description: "Free personal loan EMI calculator. Calculate monthly EMI, total interest and repayment schedule for personal loans.",
};

export default function PersonalLoanEMIPage() {
  return (
    <Suspense>
      <EMICalculatorClient defaultLoanType={2} pageTitle="Personal Loan EMI Calculator" pageDesc="Calculate EMI for personal loans. Compare total interest across different loan amounts and tenures." />
    </Suspense>
  );
}
