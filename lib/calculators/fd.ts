export type CompoundingFrequency = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

export interface FDInput {
  principal: number;
  annualRate: number;
  tenureMonths: number;
  compounding: CompoundingFrequency;
  includeTDS: boolean;
}

export interface FDResult {
  maturityAmount: number;
  interestEarned: number;
  netInterest: number;
  tdsDeducted: number;
  effectiveAnnualRate: number;
}

export interface RDInput {
  monthlyDeposit: number;
  annualRate: number;
  tenureMonths: number;
}

export interface RDResult {
  maturityAmount: number;
  totalDeposited: number;
  interestEarned: number;
}

const FREQ_MAP: Record<CompoundingFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  'half-yearly': 2,
  yearly: 1,
};

export function calculateFD(input: FDInput): FDResult {
  const { principal, annualRate, tenureMonths, compounding, includeTDS } = input;
  const n = FREQ_MAP[compounding];
  const r = annualRate / 100;
  const t = tenureMonths / 12;

  const maturityAmount = principal * Math.pow(1 + r / n, n * t);
  const interestEarned = maturityAmount - principal;

  const TDS_THRESHOLD = 40000;
  const tdsDeducted = includeTDS && interestEarned > TDS_THRESHOLD ? interestEarned * 0.1 : 0;
  const netInterest = interestEarned - tdsDeducted;

  const effectiveAnnualRate = (Math.pow(1 + r / n, n) - 1) * 100;

  return { maturityAmount: principal + netInterest, interestEarned, netInterest, tdsDeducted, effectiveAnnualRate };
}

export function calculateRD(input: RDInput): RDResult {
  const { monthlyDeposit, annualRate, tenureMonths } = input;
  const r = annualRate / 400; // quarterly
  const n = tenureMonths / 3;
  // RD maturity = P × ((1+r)^n - 1) / (1 - (1+r)^(-1/3))
  const maturityAmount = monthlyDeposit * ((Math.pow(1 + r, n) - 1) / (1 - Math.pow(1 + r, -1 / 3)));
  const totalDeposited = monthlyDeposit * tenureMonths;
  const interestEarned = maturityAmount - totalDeposited;
  return { maturityAmount, totalDeposited, interestEarned };
}
