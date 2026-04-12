import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

export const metadata: Metadata = {
  title: "Car Loan EMI Calculator 2025 — Vehicle Loan",
  description: "Free car loan EMI calculator. Calculate monthly EMI for new and used car loans. Instant results with interest breakdown.",
};

export default function CarLoanEMIPage() {
  return (
    <Suspense>
      <EMICalculatorClient defaultLoanType={1} pageTitle="Car Loan EMI Calculator" pageDesc="Calculate monthly EMI for your car or two-wheeler loan at current interest rates." />
    </Suspense>
  );
}
