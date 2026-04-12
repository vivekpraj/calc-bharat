import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator 2025 — Monthly Instalment",
  description: "Free home loan EMI calculator. Calculate monthly EMI for housing loans at any interest rate. See total interest, amortization schedule.",
};

export default function HomeLoanEMIPage() {
  return (
    <Suspense>
      <EMICalculatorClient defaultLoanType={0} pageTitle="Home Loan EMI Calculator" pageDesc="Calculate monthly EMI for your home loan. Includes amortization schedule and prepayment analysis." />
    </Suspense>
  );
}
