import { useState, useEffect } from 'react';
import { Loan } from './types';
import { loanService } from './services/api';
import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import './App.css';

function App() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const data = await loanService.getAll();
      setLoans(data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoanCreated = () => {
    fetchLoans();
    setShowForm(false);
  };

  const handleStatusUpdate = async (id: string, status: Loan['status']) => {
    try {
      await loanService.updateStatus(id, status);
      fetchLoans();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update loan status');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this loan application?')) {
      try {
        await loanService.delete(id);
        fetchLoans();
      } catch (error) {
        console.error('Error deleting loan:', error);
        alert('Failed to delete loan application');
      }
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Loan Application System</h1>
        <button 
          className="button button-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'New Loan Application'}
        </button>
      </header>

      {showForm && (
        <LoanForm 
          onSuccess={handleLoanCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      <LoanList
        loans={loans}
        loading={loading}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
