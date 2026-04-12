import type { Metadata } from "next";
import HRACalculatorClient from "./HRACalculatorClient";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";
export const metadata: Metadata = {
  title: "HRA Exemption Calculator India Free",
  description: "Calculate HRA exemption under Section 10(13A). Find your HRA tax exemption for metro and non-metro cities.",
};
export default function HRACalculatorPage() {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <LastUpdatedBadge label="HRA rules updated for FY 2026-27" />
      </div>
      <HRACalculatorClient />
    </div>
  );
}
