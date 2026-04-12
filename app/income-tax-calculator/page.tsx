import type { Metadata } from "next";
import IncomeTaxClient from "./IncomeTaxClient";
import LastUpdatedBadge from "@/components/LastUpdatedBadge";
export const metadata: Metadata = {
  title: "Income Tax Calculator 2026-27 New vs Old",
  description: "Free income tax calculator for FY 2026-27. Compare Old vs New tax regime and find which saves you more tax.",
};
export default function IncomeTaxPage() {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <LastUpdatedBadge />
      </div>
      <IncomeTaxClient />
    </div>
  );
}
