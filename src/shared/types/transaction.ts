// src/shared/types/transaction.ts
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export type TransactionType = 'income' | 'expense' | 'all';

export interface TransactionFormData {
  description: string;
  amount: string;
  type: 'income' | 'expense';
  category: string;
  date: string;
}