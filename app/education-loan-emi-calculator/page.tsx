import type { Metadata } from "next";
import { Suspense } from "react";
import EMICalculatorClient from "../emi-calculator/EMICalculatorClient";

export const metadata: Metadata = {
  title: "Education Loan EMI Calculator India",
  description: "Free education loan EMI calculator. Calculate monthly EMI for student loans with moratorium period consideration.",
};

export default function EducationLoanEMIPage() {
  return (
    <Suspense>
      <EMICalculatorClient defaultLoanType={3} pageTitle="Education Loan EMI Calculator" pageDesc="Calculate EMI for education loans. Plan your student loan repayment after the course completion." />
    </Suspense>
  );
}
