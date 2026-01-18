/**
 * Calculate EMI (Equated Monthly Installment)
 * @param principal - Loan amount
 * @param rate - Annual interest rate (as percentage)
 * @param term - Loan term in months
 * @returns EMI amount
 */
export function calculateEMI(principal: number, rate: number, term: number): number {
  if (term === 0 || principal === 0) return 0;
  
  // Convert annual rate to monthly rate (as decimal)
  const monthlyRate = rate / 12 / 100;
  
  // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
              (Math.pow(1 + monthlyRate, term) - 1);
  
  return Math.round(emi * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate total amount to be paid
 * @param emi - Monthly installment
 * @param term - Loan term in months
 * @returns Total amount
 */
export function calculateTotalAmount(emi: number, term: number): number {
  return Math.round(emi * term * 100) / 100;
}
