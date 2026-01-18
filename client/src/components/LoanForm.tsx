import { useState } from 'react';
import { LoanFormData } from '../types';
import { loanService } from '../services/api';

interface LoanFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const LoanForm = ({ onSuccess, onCancel }: LoanFormProps) => {
  const [formData, setFormData] = useState<LoanFormData>({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 12,
    purpose: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoanFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LoanFormData, string>> = {};

    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Name is required';
    }

    if (!formData.applicantEmail.trim()) {
      newErrors.applicantEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicantEmail)) {
      newErrors.applicantEmail = 'Invalid email format';
    }

    if (!formData.applicantPhone.trim()) {
      newErrors.applicantPhone = 'Phone is required';
    }

    if (formData.loanAmount <= 0) {
      newErrors.loanAmount = 'Loan amount must be greater than 0';
    }

    if (formData.interestRate < 0 || formData.interestRate > 100) {
      newErrors.interestRate = 'Interest rate must be between 0 and 100';
    }

    if (formData.loanTerm <= 0) {
      newErrors.loanTerm = 'Loan term must be greater than 0';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      await loanService.create(formData);
      onSuccess();
    } catch (error: any) {
      console.error('Error creating loan:', error);
      alert(error.response?.data?.error || 'Failed to create loan application');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'loanAmount' || name === 'interestRate' || name === 'loanTerm' 
        ? parseFloat(value) || 0 
        : value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof LoanFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="card">
      <h2>New Loan Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="applicantName">Full Name *</label>
          <input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.applicantName && <div className="error">{errors.applicantName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="applicantEmail">Email *</label>
          <input
            type="email"
            id="applicantEmail"
            name="applicantEmail"
            value={formData.applicantEmail}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.applicantEmail && <div className="error">{errors.applicantEmail}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="applicantPhone">Phone *</label>
          <input
            type="tel"
            id="applicantPhone"
            name="applicantPhone"
            value={formData.applicantPhone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          {errors.applicantPhone && <div className="error">{errors.applicantPhone}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount ($) *</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount || ''}
            onChange={handleChange}
            placeholder="Enter loan amount"
            min="0"
            step="0.01"
          />
          {errors.loanAmount && <div className="error">{errors.loanAmount}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="interestRate">Interest Rate (%) *</label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={formData.interestRate || ''}
            onChange={handleChange}
            placeholder="Enter annual interest rate"
            min="0"
            max="100"
            step="0.01"
          />
          {errors.interestRate && <div className="error">{errors.interestRate}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="loanTerm">Loan Term (months) *</label>
          <input
            type="number"
            id="loanTerm"
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleChange}
            placeholder="Enter loan term in months"
            min="1"
          />
          {errors.loanTerm && <div className="error">{errors.loanTerm}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose *</label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Describe the purpose of the loan"
            rows={3}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit', fontSize: '16px' }}
          />
          {errors.purpose && <div className="error">{errors.purpose}</div>}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className="button button-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
          <button type="button" className="button button-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;
