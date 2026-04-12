export interface GSTInput {
  amount: number;
  rate: number; // 0, 5, 12, 18, 28
  calculationType: 'add' | 'remove';
  transactionType: 'intra' | 'inter';
}

export interface GSTResult {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
}

export function calculateGST(input: GSTInput): GSTResult {
  const { amount, rate, calculationType, transactionType } = input;
  let baseAmount: number;
  let gstAmount: number;
  let totalAmount: number;

  if (calculationType === 'add') {
    baseAmount = amount;
    gstAmount = (baseAmount * rate) / 100;
    totalAmount = baseAmount + gstAmount;
  } else {
    totalAmount = amount;
    baseAmount = (totalAmount * 100) / (100 + rate);
    gstAmount = totalAmount - baseAmount;
  }

  const cgst = transactionType === 'intra' ? gstAmount / 2 : 0;
  const sgst = transactionType === 'intra' ? gstAmount / 2 : 0;
  const igst = transactionType === 'inter' ? gstAmount : 0;

  return { baseAmount, gstAmount, totalAmount, cgst, sgst, igst };
}
