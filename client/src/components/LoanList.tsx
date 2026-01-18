import { Loan } from '../types';
import './LoanList.css';

interface LoanListProps {
  loans: Loan[];
  loading: boolean;
  onStatusUpdate: (id: string, status: Loan['status']) => void;
  onDelete: (id: string) => void;
}

const LoanList = ({ loans, loading, onStatusUpdate, onDelete }: LoanListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeClass = (status: Loan['status']) => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  if (loading) {
    return (
      <div className="card">
        <p>Loading loans...</p>
      </div>
    );
  }

  if (loans.length === 0) {
    return (
      <div className="card">
        <p>No loan applications found. Create a new application to get started.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Loan Applications ({loans.length})</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Contact</th>
              <th>Loan Amount</th>
              <th>Interest Rate</th>
              <th>Term</th>
              <th>EMI</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.applicantName}</td>
                <td>
                  <div>{loan.applicantEmail}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{loan.applicantPhone}</div>
                </td>
                <td>{formatCurrency(loan.loanAmount)}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.loanTerm} months</td>
                <td>{loan.emi ? formatCurrency(loan.emi) : '-'}</td>
                <td>{loan.totalAmount ? formatCurrency(loan.totalAmount) : '-'}</td>
                <td>
                  <span className={getStatusBadgeClass(loan.status)}>
                    {loan.status}
                  </span>
                </td>
                <td>{formatDate(loan.createdAt)}</td>
                <td>
                  <div className="actions">
                    <select
                      value={loan.status}
                      onChange={(e) => onStatusUpdate(loan.id, e.target.value as Loan['status'])}
                      style={{ padding: '4px 8px', fontSize: '12px', marginRight: '8px' }}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="DISBURSED">Disbursed</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                    <button
                      className="button button-danger"
                      onClick={() => onDelete(loan.id)}
                      style={{ padding: '4px 12px', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanList;
