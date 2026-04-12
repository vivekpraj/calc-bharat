import type { Metadata } from "next";
import SalaryCalculatorClient from "./SalaryCalculatorClient";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";
export const metadata: Metadata = {
  title: "CTC to In-Hand Salary Calculator 2025",
  description: "Free salary calculator. Break down your CTC into Basic, HRA, PF, Special Allowance and calculate net in-hand salary.",
};
export default function SalaryCalculatorPage() {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <LastUpdatedBadge label="New tax regime defaults updated for FY 2026-27" />
      </div>
      <SalaryCalculatorClient />
    </div>
  );
}
