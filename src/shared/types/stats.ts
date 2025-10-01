// src/shared/types/stats.ts
export interface Stats {
  balance: number;
  income: number;
  expenses: number;
  transactionCount: number;
  savingsRate?: number;
}

export interface ChartData {
  labels: string[];
  income: number[];
  expenses: number[];
}