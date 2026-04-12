import type { Metadata } from "next";
import { Suspense } from "react";
import GSTCalculatorClient from "./GSTCalculatorClient";

export const metadata: Metadata = {
  title: "GST Calculator India — Calculate GST Online Free",
  description:
    "Free GST calculator for India. Add or remove GST with CGST, SGST & IGST breakdown. Supports all GST slabs: 5%, 12%, 18%, 28%.",
};

export default function GSTCalculatorPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl m-4" />}>
      <GSTCalculatorClient />
    </Suspense>
  );
}
