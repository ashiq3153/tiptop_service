import axios from 'axios';
import { Loan } from '../types';

// Use environment variable for API URL, fallback to /api for local development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const loanService = {
  getAll: async (): Promise<Loan[]> => {
    const response = await api.get('/loans');
    return response.data;
  },

  getById: async (id: string): Promise<Loan> => {
    const response = await api.get(`/loans/${id}`);
    return response.data;
  },

  create: async (loanData: Omit<Loan, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'emi' | 'totalAmount'>): Promise<Loan> => {
    const response = await api.post('/loans', loanData);
    return response.data;
  },

  updateStatus: async (id: string, status: Loan['status']): Promise<Loan> => {
    const response = await api.patch(`/loans/${id}/status`, { status });
    return response.data;
  },

  update: async (id: string, loanData: Partial<Loan>): Promise<Loan> => {
    const response = await api.put(`/loans/${id}`, loanData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/loans/${id}`);
  },
};
