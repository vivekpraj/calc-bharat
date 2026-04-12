export interface HRAInput {
  basicSalary: number;
  hraReceived: number;
  rentPaid: number;
  cityType: 'metro' | 'non-metro';
}

export interface HRAResult {
  actualHRAReceived: number;
  percentOfBasic: number;
  excessRent: number;
  hraExemption: number;
  taxableHRA: number;
  cityPercent: number;
}

export function calculateHRA(input: HRAInput): HRAResult {
  const { basicSalary, hraReceived, rentPaid, cityType } = input;
  const cityPercent = cityType === 'metro' ? 50 : 40;

  const percentOfBasic = (basicSalary * cityPercent) / 100;
  const excessRent = Math.max(0, rentPaid - basicSalary * 0.1);
  const hraExemption = Math.min(hraReceived, percentOfBasic, excessRent);
  const taxableHRA = Math.max(0, hraReceived - hraExemption);

  return {
    actualHRAReceived: hraReceived,
    percentOfBasic,
    excessRent,
    hraExemption,
    taxableHRA,
    cityPercent,
  };
}
