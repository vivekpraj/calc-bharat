import type { Metadata } from "next";
import FDCalculatorClient from "./FDCalculatorClient";
export const metadata: Metadata = {
  title: "FD & RD Calculator — Maturity Amount",
  description: "Free Fixed Deposit and Recurring Deposit calculator. Calculate maturity amount with compounding options and TDS deduction.",
};
export default function FDCalculatorPage() { return <FDCalculatorClient />; }
