export interface PPFInput {
  annualDeposit: number;
  interestRate: number; // default 7.1
  duration?: number;    // fixed 15 years
}

export interface PPFYearData {
  year: number;
  openingBalance: number;
  deposit: number;
  interest: number;
  closingBalance: number;
}

export interface PPFResult {
  totalInvested: number;
  interestEarned: number;
  maturityAmount: number;
  yearlyData: PPFYearData[];
}

export function calculatePPF(input: PPFInput): PPFResult {
  const { annualDeposit, interestRate, duration = 15 } = input;
  const r = interestRate / 100;
  const yearlyData: PPFYearData[] = [];
  let balance = 0;

  for (let year = 1; year <= duration; year++) {
    const openingBalance = balance;
    const deposit = annualDeposit;
    const interest = (openingBalance + deposit) * r;
    balance = openingBalance + deposit + interest;
    yearlyData.push({ year, openingBalance, deposit, interest, closingBalance: balance });
  }

  const totalInvested = annualDeposit * duration;
  const maturityAmount = balance;
  const interestEarned = maturityAmount - totalInvested;

  return { totalInvested, interestEarned, maturityAmount, yearlyData };
}
