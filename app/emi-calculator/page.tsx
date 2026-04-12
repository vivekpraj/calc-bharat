import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "./EMICalculatorClient";

export const metadata: Metadata = {
  title: "EMI Calculator — Home Loan, Car, Personal",
  description: "Free EMI calculator for Home Loan, Car Loan, Personal & Education Loan.",
};

export default function EMICalculatorPage() {
  return <Suspense><EMICalculatorClient /></Suspense>;
}
