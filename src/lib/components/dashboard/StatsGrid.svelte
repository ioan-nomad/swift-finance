<!-- src/lib/components/dashboard/StatsGrid.svelte -->
<script lang="ts">
  import type { Stats } from '$shared/types/stats';

  export let stats: Stats;
  export let isDark: boolean;
</script>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-icon">💰</div>
    <div class="stat-content">
      <h3>Total Balance</h3>
      <p class="stat-value">${stats.balance.toFixed(2)}</p>
      <span class="stat-change positive">+20.1% from last month</span>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon">📈</div>
    <div class="stat-content">
      <h3>Total Income</h3>
      <p class="stat-value income">${stats.income.toFixed(2)}</p>
      <span class="stat-change positive">+15.3% from last week</span>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon">📉</div>
    <div class="stat-content">
      <h3>Total Expenses</h3>
      <p class="stat-value expenses">${stats.expenses.toFixed(2)}</p>
      <span class="stat-change negative">-5.2% from yesterday</span>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon">📊</div>
    <div class="stat-content">
      <h3>Transactions</h3>
      <p class="stat-value">{stats.transactionCount}</p>
      <span class="stat-change positive">+12.7% from last month</span>
    </div>
  </div>
</div>

<style>
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    display: flex;
    gap: 1rem;
    transition: transform 0.2s;
  }

  :global(.dark) .stat-card {
    background: #1f2937;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-content {
    flex: 1;
  }

  .stat-content h3 {
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
    font-weight: 500;
  }

  .stat-value {
    margin: 0.5rem 0;
    font-size: 1.875rem;
    font-weight: 700;
    color: #1f2937;
  }

  :global(.dark) .stat-value {
    color: white;
  }

  .stat-value.income {
    color: #10b981;
  }

  .stat-value.expenses {
    color: #ef4444;
  }

  .stat-change {
    font-size: 0.875rem;
  }

  .stat-change.positive {
    color: #10b981;
  }

  .stat-change.negative {
    color: #ef4444;
  }
</style>