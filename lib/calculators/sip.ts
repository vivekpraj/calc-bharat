export interface SIPInput {
  monthlyAmount: number;
  annualReturn: number; // % p.a.
  durationYears: number;
  stepUpPercent?: number; // % annual step-up
}

export interface SIPResult {
  futureValue: number;
  totalInvested: number;
  wealthGained: number;
  wealthGainPercent: number;
  yearlyData: SIPYearData[];
}

export interface SIPYearData {
  year: number;
  invested: number;
  value: number;
}

export function calculateSIP(input: SIPInput): SIPResult {
  const { monthlyAmount, annualReturn, durationYears, stepUpPercent = 0 } = input;
  const r = annualReturn / 12 / 100;

  let futureValue = 0;
  let totalInvested = 0;
  const yearlyData: SIPYearData[] = [];
  let currentMonthly = monthlyAmount;

  for (let year = 1; year <= durationYears; year++) {
    if (year > 1 && stepUpPercent > 0) {
      currentMonthly = currentMonthly * (1 + stepUpPercent / 100);
    }
    for (let m = 0; m < 12; m++) {
      totalInvested += currentMonthly;
      futureValue = (futureValue + currentMonthly) * (1 + r);
    }
    yearlyData.push({ year, invested: totalInvested, value: futureValue });
  }

  const wealthGained = futureValue - totalInvested;
  const wealthGainPercent = (wealthGained / totalInvested) * 100;

  return { futureValue, totalInvested, wealthGained, wealthGainPercent, yearlyData };
}

export interface LumpsumInput {
  amount: number;
  annualReturn: number;
  durationYears: number;
}

export function calculateLumpsum(input: LumpsumInput): SIPResult {
  const { amount, annualReturn, durationYears } = input;
  const r = annualReturn / 100;
  const futureValue = amount * Math.pow(1 + r, durationYears);
  const totalInvested = amount;
  const wealthGained = futureValue - totalInvested;
  const wealthGainPercent = (wealthGained / totalInvested) * 100;

  const yearlyData: SIPYearData[] = [];
  for (let year = 1; year <= durationYears; year++) {
    yearlyData.push({
      year,
      invested: amount,
      value: amount * Math.pow(1 + r, year),
    });
  }

  return { futureValue, totalInvested, wealthGained, wealthGainPercent, yearlyData };
}
