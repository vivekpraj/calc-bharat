export interface EMIInput {
  principal: number;
  annualRate: number; // % p.a.
  tenureYears: number;
  prepayment?: number;
}

export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalPayable: number;
  interestPercent: number;
  amortization: AmortizationYear[];
  prepaymentResult?: PrepaymentResult;
}

export interface AmortizationYear {
  year: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface PrepaymentResult {
  newEmi: number;
  newTotalInterest: number;
  interestSaved: number;
  newTenureMonths: number;
}

export function calculateEMI(input: EMIInput): EMIResult {
  const { principal, annualRate, tenureYears, prepayment = 0 } = input;
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;

  let emi: number;
  if (r === 0) {
    emi = principal / n;
  } else {
    emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayable = emi * n;
  const totalInterest = totalPayable - principal;
  const interestPercent = (totalInterest / totalPayable) * 100;

  // Amortization by year
  const amortization: AmortizationYear[] = [];
  let balance = principal;
  for (let year = 1; year <= tenureYears; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;
      const interestPart = balance * r;
      const principalPart = emi - interestPart;
      yearInterest += interestPart;
      yearPrincipal += principalPart;
      balance -= principalPart;
    }
    balance = Math.max(0, balance);
    amortization.push({ year, principal: yearPrincipal, interest: yearInterest, balance });
  }

  let prepaymentResult: PrepaymentResult | undefined;
  if (prepayment > 0) {
    const newPrincipal = Math.max(0, principal - prepayment);
    let newBalance = newPrincipal;
    let months = 0;
    let newTotalInterest = 0;
    while (newBalance > 0.01 && months < n) {
      const interestPart = newBalance * r;
      newTotalInterest += interestPart;
      const principalPart = Math.min(emi - interestPart, newBalance);
      newBalance -= principalPart;
      months++;
    }
    prepaymentResult = {
      newEmi: emi,
      newTotalInterest,
      interestSaved: totalInterest - newTotalInterest,
      newTenureMonths: months,
    };
  }

  return { emi, totalInterest, totalPayable, interestPercent, amortization, prepaymentResult };
}
