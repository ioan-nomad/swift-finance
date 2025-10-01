// src/lib/stores/filters.ts
import { writable, derived } from 'svelte/store';
import { transactions } from './transactions';
import type { Transaction, TransactionType } from '$shared/types/transaction';

export const searchQuery = writable('');
export const filterType = writable<TransactionType>('all');
export const filterDateRange = writable<{ start: string; end: string }>({ start: '', end: '' });

export const filteredTransactions = derived(
  [transactions, searchQuery, filterType, filterDateRange],
  ([$transactions, $searchQuery, $filterType, $filterDateRange]) => {
    let filtered = $transactions;

    // Filter by type
    if ($filterType !== 'all') {
      filtered = filtered.filter(t => t.type === $filterType);
    }

    // Filter by search query
    if ($searchQuery.trim()) {
      const query = $searchQuery.toLowerCase();
      filtered = filtered.filter(
        t =>
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    // Filter by date range
    if ($filterDateRange.start) {
      filtered = filtered.filter(t => t.date >= $filterDateRange.start);
    }
    if ($filterDateRange.end) {
      filtered = filtered.filter(t => t.date <= $filterDateRange.end);
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
);