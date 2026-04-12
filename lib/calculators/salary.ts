export interface SalaryInput {
  ctc: number;
  basicPercent: number; // 40-60
  hraPercent: number;   // 40-50
  pfApplicable: boolean;
  professionalTax: number;
}

export interface SalaryResult {
  basic: number;
  hra: number;
  specialAllowance: number;
  employeePF: number;
  employerPF: number;
  professionalTax: number;
  grossSalary: number;
  netInHandMonthly: number;
  netInHandAnnual: number;
  ctc: number;
}

export const PROFESSIONAL_TAX_BY_STATE: Record<string, number> = {
  'Andhra Pradesh': 2400,
  'Karnataka': 2400,
  'Maharashtra': 2500,
  'West Bengal': 2400,
  'Telangana': 2400,
  'Tamil Nadu': 1200,
  'Gujarat': 0,
  'Delhi': 0,
  'Rajasthan': 0,
  'Other': 0,
};

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { ctc, basicPercent, hraPercent, pfApplicable, professionalTax } = input;

  const basic = (ctc * basicPercent) / 100;
  const hra = (basic * hraPercent) / 100;
  const employeePF = pfApplicable ? Math.min(basic * 0.12, 21600) : 0;
  const employerPF = pfApplicable ? Math.min(basic * 0.12, 21600) : 0;
  const specialAllowance = ctc - basic - hra - employerPF;
  const grossSalary = basic + hra + specialAllowance;
  const netInHandAnnual = grossSalary - employeePF - professionalTax;
  const netInHandMonthly = netInHandAnnual / 12;

  return {
    basic,
    hra,
    specialAllowance,
    employeePF,
    employerPF,
    professionalTax,
    grossSalary,
    netInHandMonthly,
    netInHandAnnual,
    ctc,
  };
}
