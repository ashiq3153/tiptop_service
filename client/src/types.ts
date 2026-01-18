export type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'COMPLETED';

export interface Loan {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  purpose: string;
  status: LoanStatus;
  emi?: number;
  totalAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoanFormData {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  purpose: string;
}
