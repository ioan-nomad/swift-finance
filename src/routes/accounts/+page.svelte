<script lang="ts">
  let accounts = [
    { id: 1, name: 'Checking Account', bank: 'Chase Bank', balance: 2450.75, type: 'checking' },
    { id: 2, name: 'Savings Account', bank: 'Chase Bank', balance: 15600.50, type: 'savings' },
    { id: 3, name: 'Credit Card', bank: 'American Express', balance: -1250.25, type: 'credit' },
    { id: 4, name: 'Investment Account', bank: 'Fidelity', balance: 8920.00, type: 'investment' }
  ];

  function getAccountIcon(type: string): string {
    const icons: Record<string, string> = {
      'checking': '🏦',
      'savings': '💰',
      'credit': '💳',
      'investment': '📈'
    };
    return icons[type] || '🏛️';
  }

  function getAccountColor(type: string): string {
    const colors: Record<string, string> = {
      'checking': '#3b82f6',
      'savings': '#22c55e',
      'credit': '#ef4444',
      'investment': '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  }
</script>

<svelte:head>
  <title>Accounts - Swift Finance</title>
</svelte:head>

<div class="page">
  <h1>🏦 Accounts</h1>

  <div class="accounts-container">
    <div class="accounts-header">
      <h2>Your Accounts</h2>
      <button class="add-btn">+ Add Account</button>
    </div>

    <div class="accounts-grid">
      {#each accounts as account}
        <div class="account-card" style="border-left: 4px solid {getAccountColor(account.type)}">
          <div class="account-header">
            <div class="account-icon">{getAccountIcon(account.type)}</div>
            <div class="account-type">{account.type.toUpperCase()}</div>
          </div>

          <div class="account-info">
            <h3 class="account-name">{account.name}</h3>
            <p class="account-bank">{account.bank}</p>
          </div>

          <div class="account-balance">
            <span
              class="balance-amount"
              class:positive={account.balance >= 0}
              class:negative={account.balance < 0}
            >
              ${Math.abs(account.balance).toFixed(2)}
            </span>
            {#if account.balance < 0}
              <span class="balance-label">owed</span>
            {:else}
              <span class="balance-label">available</span>
            {/if}
          </div>

          <div class="account-actions">
            <button class="action-btn">View Details</button>
            <button class="action-btn secondary">Transfer</button>
          </div>
        </div>
      {/each}
    </div>

    <div class="total-summary">
      <div class="summary-card">
        <h3>Total Net Worth</h3>
        <p class="summary-amount">
          ${accounts.reduce((sum, acc) => sum + acc.balance, 0).toFixed(2)}
        </p>
      </div>
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

  .accounts-container {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .accounts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .accounts-header h2 {
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

  .accounts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .account-card {
    background: #f8f9ff;
    border-radius: 12px;
    padding: 1.5rem;
    transition: transform 0.2s ease;
    border: 1px solid #e1e5f2;
  }

  .account-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }

  .account-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .account-icon {
    font-size: 1.5rem;
  }

  .account-type {
    font-size: 0.75rem;
    font-weight: bold;
    color: #666;
    letter-spacing: 0.5px;
  }

  .account-info {
    margin-bottom: 1.5rem;
  }

  .account-name {
    color: #333;
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }

  .account-bank {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
  }

  .account-balance {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .balance-amount {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .balance-amount.positive {
    color: #22c55e;
  }

  .balance-amount.negative {
    color: #ef4444;
  }

  .balance-label {
    font-size: 0.8rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .account-actions {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .action-btn:not(.secondary) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .action-btn.secondary {
    background: #e5e7eb;
    color: #374151;
  }

  .action-btn:hover {
    transform: translateY(-1px);
  }

  .total-summary {
    border-top: 1px solid #e1e5f2;
    padding-top: 2rem;
  }

  .summary-card {
    text-align: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    color: white;
  }

  .summary-card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    opacity: 0.9;
  }

  .summary-amount {
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .accounts-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .accounts-grid {
      grid-template-columns: 1fr;
    }

    .account-actions {
      flex-direction: column;
    }
  }
</style>