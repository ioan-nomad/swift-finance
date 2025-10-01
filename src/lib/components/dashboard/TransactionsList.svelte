<!-- src/lib/components/dashboard/TransactionsList.svelte -->
<script lang="ts">
  import type { Transaction } from '$shared/types/transaction';
  import { createEventDispatcher } from 'svelte';

  export let transactions: Transaction[];
  export let loading: boolean = false;

  const dispatch = createEventDispatcher();

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
</script>

<div class="transactions-list">
  <div class="list-header">
    <h3>Recent Transactions</h3>
    <span class="count">{transactions.length} transactions</span>
  </div>

  {#if loading}
    <div class="loading">Loading...</div>
  {:else if transactions.length === 0}
    <div class="empty">
      <p>No transactions found</p>
      <p class="empty-hint">Add your first transaction to get started</p>
    </div>
  {:else}
    <div class="transactions">
      {#each transactions as transaction}
        <div class="transaction-row">
          <div class="transaction-info">
            <div class="transaction-description">{transaction.description}</div>
            <div class="transaction-meta">
              <span class="transaction-date">{formatDate(transaction.date)}</span>
              <span class="transaction-category">{transaction.category}</span>
            </div>
          </div>
          <div class="transaction-amount {transaction.type}">
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
          </div>
          <div class="transaction-actions">
            <button class="btn-action" on:click={() => dispatch('view', transaction)}>
              👁️
            </button>
            <button class="btn-action" on:click={() => dispatch('edit', transaction)}>
              ✏️
            </button>
            <button class="btn-action delete" on:click={() => dispatch('delete', transaction)}>
              🗑️
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .transactions-list {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  :global(.dark) .transactions-list {
    background: #1f2937;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .list-header h3 {
    margin: 0;
    font-size: 1.125rem;
    color: #1f2937;
  }

  :global(.dark) .list-header h3 {
    color: white;
  }

  .count {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .loading, .empty {
    text-align: center;
    padding: 3rem;
    color: #6b7280;
  }

  .empty-hint {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  .transactions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .transaction-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.5rem;
    transition: transform 0.2s;
  }

  :global(.dark) .transaction-row {
    background: #374151;
  }

  .transaction-row:hover {
    transform: translateX(4px);
  }

  .transaction-info {
    flex: 1;
  }

  .transaction-description {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }

  :global(.dark) .transaction-description {
    color: white;
  }

  .transaction-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .transaction-amount {
    font-size: 1.125rem;
    font-weight: 700;
    min-width: 100px;
    text-align: right;
  }

  .transaction-amount.income {
    color: #10b981;
  }

  .transaction-amount.expense {
    color: #ef4444;
  }

  .transaction-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-action {
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  .btn-action:hover {
    opacity: 1;
  }

  .btn-action.delete:hover {
    opacity: 1;
    filter: brightness(1.2);
  }
</style>