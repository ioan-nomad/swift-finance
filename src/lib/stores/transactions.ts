// src/lib/stores/transactions.ts
import { writable, derived } from 'svelte/store';
import { storage } from '$lib/services/StorageService';
import type { Transaction } from '$shared/types/transaction';
import type { Stats } from '$shared/types/stats';

const STORAGE_KEY = 'transactions';

const storedTransactions = storage.get<Transaction[]>(STORAGE_KEY) || [];

function createTransactionStore() {
  const { subscribe, update, set } = writable<Transaction[]>(storedTransactions);

  return {
    subscribe,

    add: (transaction: Omit<Transaction, 'id'>) => {
      const newTransaction: Transaction = {
        ...transaction,
        id: crypto.randomUUID()
      };

      update(transactions => {
        const updated = [...transactions, newTransaction];
        storage.set(STORAGE_KEY, updated);
        return updated;
      });

      return newTransaction;
    },

    remove: (id: string) => {
      update(transactions => {
        const updated = transactions.filter(t => t.id !== id);
        storage.set(STORAGE_KEY, updated);
        return updated;
      });
    },

    update: (id: string, data: Partial<Transaction>) => {
      update(transactions => {
        const updated = transactions.map(t =>
          t.id === id ? { ...t, ...data } : t
        );
        storage.set(STORAGE_KEY, updated);
        return updated;
      });
    },

    clear: () => {
      storage.remove(STORAGE_KEY);
      set([]);
    }
  };
}

export const transactions = createTransactionStore();

export const stats = derived(transactions, $transactions => {
  const income = $transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = $transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return {
    balance,
    income,
    expenses,
    transactionCount: $transactions.length,
    savingsRate
  } as Stats;
});