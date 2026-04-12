/**
 * Cloudflare Worker — Income Tax Calculator
 * Formula never exposed to browser.
 * Deploy: wrangler deploy workers/income-tax.ts
 */

interface TaxRequest {
  grossIncome: number;
  deductions: {
    section80C: number;
    section80D: number;
    hraExemption: number;
    nps80CCD: number;
    otherDeductions: number;
    standardDeduction: number;
  };
  regime: "old" | "new";
  ageGroup: "below60" | "60to80" | "above80";
}

interface SlabResult {
  slab: string;
  rate: number;
  taxableAmount: number;
  tax: number;
}

interface TaxResult {
  taxOldRegime: number;
  taxNewRegime: number;
  oldRegimeBreakdown: SlabResult[];
  newRegimeBreakdown: SlabResult[];
  recommendedRegime: "old" | "new";
  taxSavings: number;
  effectiveRateOld: number;
  effectiveRateNew: number;
  monthlyTaxOld: number;
  monthlyTaxNew: number;
  takeHomeOld: number;
  takeHomeNew: number;
}

function calcOldRegimeTax(taxableIncome: number, ageGroup: string): number {
  let tax = 0;
  const exemptionLimit = ageGroup === "above80" ? 500000 : ageGroup === "60to80" ? 300000 : 250000;
  if (taxableIncome <= exemptionLimit) return 0;

  const slabs =
    ageGroup === "above80"
      ? [
          { limit: 500000, rate: 0 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ]
      : ageGroup === "60to80"
      ? [
          { limit: 300000, rate: 0 },
          { limit: 500000, rate: 0.05 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ]
      : [
          { limit: 250000, rate: 0 },
          { limit: 500000, rate: 0.05 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ];

  let prev = 0;
  for (const slab of slabs) {
    if (taxableIncome <= prev) break;
    const taxable = Math.min(taxableIncome, slab.limit) - prev;
    tax += taxable * slab.rate;
    prev = slab.limit;
  }
  return tax;
}

function calcNewRegimeTax(taxableIncome: number): number {
  // FY 2025-26 new tax regime (Budget 2025, applicable AY 2026-27)
  const slabs = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.10 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.20 },
    { limit: 2400000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 },
  ];
  let tax = 0;
  let prev = 0;
  for (const slab of slabs) {
    if (taxableIncome <= prev) break;
    const taxable = Math.min(taxableIncome, slab.limit) - prev;
    tax += taxable * slab.rate;
    prev = slab.limit;
  }
  // Tax rebate u/s 87A: if taxable income <= 12L, tax = 0 (new regime)
  if (taxableIncome <= 1200000) tax = 0;
  return tax;
}

function applyRebate87A(tax: number, taxableIncome: number, regime: string): number {
  // Old regime: rebate up to ₹12,500 if income <= 5L
  if (regime === "old" && taxableIncome <= 500000) {
    return Math.max(0, tax - 12500);
  }
  return tax;
}

function addSurchargeAndCess(tax: number, grossIncome: number): number {
  let surcharge = 0;
  if (grossIncome > 50000000) surcharge = tax * 0.37;
  else if (grossIncome > 20000000) surcharge = tax * 0.25;
  else if (grossIncome > 10000000) surcharge = tax * 0.15;
  else if (grossIncome > 5000000) surcharge = tax * 0.1;
  const cess = (tax + surcharge) * 0.04;
  return tax + surcharge + cess;
}

function computeTax(data: TaxRequest): TaxResult {
  const totalDeductions =
    data.deductions.section80C +
    data.deductions.section80D +
    data.deductions.hraExemption +
    data.deductions.nps80CCD +
    data.deductions.otherDeductions +
    data.deductions.standardDeduction;

  const taxableIncomeOld = Math.max(0, data.grossIncome - totalDeductions);
  // New regime: standard deduction ₹75,000 (FY 2025-26), ignore other deductions
  const newRegimeStdDeduction = 75000;
  const taxableIncomeNew = Math.max(0, data.grossIncome - newRegimeStdDeduction);

  let rawOld = calcOldRegimeTax(taxableIncomeOld, data.ageGroup);
  rawOld = applyRebate87A(rawOld, taxableIncomeOld, "old");
  const taxOld = Math.round(addSurchargeAndCess(rawOld, data.grossIncome));

  let rawNew = calcNewRegimeTax(taxableIncomeNew);
  const taxNew = Math.round(addSurchargeAndCess(rawNew, data.grossIncome));

  const recommendedRegime = taxOld <= taxNew ? "old" : "new";
  const taxSavings = Math.abs(taxOld - taxNew);

  // Build slab breakdowns (simplified)
  const oldRegimeBreakdown: SlabResult[] = [
    { slab: "0 - 2.5L", rate: 0, taxableAmount: Math.min(taxableIncomeOld, 250000), tax: 0 },
    { slab: "2.5L - 5L", rate: 5, taxableAmount: Math.max(0, Math.min(taxableIncomeOld, 500000) - 250000), tax: Math.max(0, Math.min(taxableIncomeOld, 500000) - 250000) * 0.05 },
    { slab: "5L - 10L", rate: 20, taxableAmount: Math.max(0, Math.min(taxableIncomeOld, 1000000) - 500000), tax: Math.max(0, Math.min(taxableIncomeOld, 1000000) - 500000) * 0.2 },
    { slab: "Above 10L", rate: 30, taxableAmount: Math.max(0, taxableIncomeOld - 1000000), tax: Math.max(0, taxableIncomeOld - 1000000) * 0.3 },
  ];
  const newRegimeBreakdown: SlabResult[] = [
    { slab: "0 - 4L", rate: 0, taxableAmount: Math.min(taxableIncomeNew, 400000), tax: 0 },
    { slab: "4L - 8L", rate: 5, taxableAmount: Math.max(0, Math.min(taxableIncomeNew, 800000) - 400000), tax: Math.max(0, Math.min(taxableIncomeNew, 800000) - 400000) * 0.05 },
    { slab: "8L - 12L", rate: 10, taxableAmount: Math.max(0, Math.min(taxableIncomeNew, 1200000) - 800000), tax: Math.max(0, Math.min(taxableIncomeNew, 1200000) - 800000) * 0.1 },
    { slab: "12L - 16L", rate: 15, taxableAmount: Math.max(0, Math.min(taxableIncomeNew, 1600000) - 1200000), tax: Math.max(0, Math.min(taxableIncomeNew, 1600000) - 1200000) * 0.15 },
    { slab: "16L - 20L", rate: 20, taxableAmount: Math.max(0, Math.min(taxableIncomeNew, 2000000) - 1600000), tax: Math.max(0, Math.min(taxableIncomeNew, 2000000) - 1600000) * 0.2 },
    { slab: "20L - 24L", rate: 25, taxableAmount: Math.max(0, Math.min(taxableIncomeNew, 2400000) - 2000000), tax: Math.max(0, Math.min(taxableIncomeNew, 2400000) - 2000000) * 0.25 },
    { slab: "Above 24L", rate: 30, taxableAmount: Math.max(0, taxableIncomeNew - 2400000), tax: Math.max(0, taxableIncomeNew - 2400000) * 0.3 },
  ];

  return {
    taxOldRegime: taxOld,
    taxNewRegime: taxNew,
    oldRegimeBreakdown,
    newRegimeBreakdown,
    recommendedRegime,
    taxSavings,
    effectiveRateOld: data.grossIncome > 0 ? (taxOld / data.grossIncome) * 100 : 0,
    effectiveRateNew: data.grossIncome > 0 ? (taxNew / data.grossIncome) * 100 : 0,
    monthlyTaxOld: Math.round(taxOld / 12),
    monthlyTaxNew: Math.round(taxNew / 12),
    takeHomeOld: data.grossIncome - taxOld,
    takeHomeNew: data.grossIncome - taxNew,
  };
}

export default {
  async fetch(request: Request): Promise<Response> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://calcbharat.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
    }

    try {
      const data: TaxRequest = await request.json();
      const result = computeTax(data);
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: corsHeaders });
    }
  },
};
