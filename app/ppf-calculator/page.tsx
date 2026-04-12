import type { Metadata } from "next";
import PPFCalculatorClient from "./PPFCalculatorClient";
export const metadata: Metadata = {
  title: "PPF Calculator — Maturity & Interest 2025",
  description: "Free PPF calculator. Calculate PPF maturity amount, interest earned and year-by-year breakdown at 7.1% p.a.",
};
export default function PPFCalculatorPage() { return <PPFCalculatorClient />; }
