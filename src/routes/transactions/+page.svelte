<script lang="ts">
  import { onMount } from 'svelte';

  let transactions = [
    { id: 1, date: '2025-01-15', description: 'Grocery Store', amount: -85.50, category: 'Food' },
    { id: 2, date: '2025-01-14', description: 'Salary Deposit', amount: 3500.00, category: 'Income' },
    { id: 3, date: '2025-01-13', description: 'Gas Station', amount: -45.20, category: 'Transport' },
    { id: 4, date: '2025-01-12', description: 'Coffee Shop', amount: -12.75, category: 'Food' },
    { id: 5, date: '2025-01-11', description: 'Online Purchase', amount: -129.99, category: 'Shopping' }
  ];

  function formatAmount(amount: number): string {
    const prefix = amount >= 0 ? '+' : '';
    return `${prefix}$${amount.toFixed(2)}`;
  }

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'Income': '#22c55e',
      'Food': '#f59e0b',
      'Transport': '#3b82f6',
      'Shopping': '#8b5cf6',
      'Bills': '#ef4444'
    };
    return colors[category] || '#6b7280';
  }
</script>

<svelte:head>
  <title>Transactions - Swift Finance</title>
</svelte:head>

<div class="page">
  <h1>💳 Transactions</h1>

  <div class="transactions-container">
    <div class="transactions-header">
      <h2>Recent Transactions</h2>
      <button class="add-btn">+ Add Transaction</button>
    </div>

    <div class="transactions-list">
      {#each transactions as transaction}
        <div class="transaction-item">
          <div class="transaction-info">
            <div class="transaction-description">{transaction.description}</div>
            <div class="transaction-details">
              <span class="transaction-date">{transaction.date}</span>
              <span
                class="transaction-category"
                style="color: {getCategoryColor(transaction.category)}"
              >
                {transaction.category}
              </span>
            </div>
          </div>
          <div
            class="transaction-amount"
            class:positive={transaction.amount >= 0}
            class:negative={transaction.amount < 0}
          >
            {formatAmount(transaction.amount)}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
  }

  h1 {
    color: white;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .transactions-container {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .transactions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .transactions-header h2 {
    color: #333;
    margin: 0;
    font-size: 1.5rem;
  }

  .add-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: transform 0.2s ease;
  }

  .add-btn:hover {
    transform: translateY(-2px);
  }

  .transactions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: #f8f9ff;
    border-radius: 12px;
    border: 1px solid #e1e5f2;
    transition: transform 0.2s ease;
  }

  .transaction-item:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .transaction-info {
    flex: 1;
  }

  .transaction-description {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  .transaction-details {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
  }

  .transaction-date {
    color: #666;
  }

  .transaction-category {
    font-weight: 500;
  }

  .transaction-amount {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .transaction-amount.positive {
    color: #22c55e;
  }

  .transaction-amount.negative {
    color: #ef4444;
  }

  @media (max-width: 768px) {
    .transactions-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .transaction-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .transaction-amount {
      align-self: flex-end;
    }
  }
</style>