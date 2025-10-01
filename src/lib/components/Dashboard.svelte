<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';

  let totalBalance = 0;
  let monthlyIncome = 0;
  let monthlyExpenses = 0;

  onMount(async () => {
    // Simulate loading financial data
    totalBalance = await invoke('calculate_total', { amounts: [1500.50, 2300.75, 890.25] });
    monthlyIncome = 4500;
    monthlyExpenses = 2800;
  });
</script>

<div class="dashboard">
  <h2>💼 Financial Dashboard</h2>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon">💰</div>
      <div class="stat-info">
        <h3>Total Balance</h3>
        <p class="amount">${totalBalance.toFixed(2)}</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">📈</div>
      <div class="stat-info">
        <h3>Monthly Income</h3>
        <p class="amount income">${monthlyIncome.toFixed(2)}</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">📉</div>
      <div class="stat-info">
        <h3>Monthly Expenses</h3>
        <p class="amount expenses">${monthlyExpenses.toFixed(2)}</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">💵</div>
      <div class="stat-info">
        <h3>Net Income</h3>
        <p class="amount">${(monthlyIncome - monthlyExpenses).toFixed(2)}</p>
      </div>
    </div>
  </div>
</div>

<style>
  .dashboard {
    padding: 2rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    margin: 2rem 0;
  }

  .dashboard h2 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.8rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8f9ff 0%, #e8f4f8 100%);
    border-radius: 12px;
    border: 1px solid #e1e5f2;
    transition: transform 0.2s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
  }

  .stat-icon {
    font-size: 2.5rem;
    margin-right: 1rem;
  }

  .stat-info h3 {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .amount {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    margin: 0;
  }

  .amount.income {
    color: #22c55e;
  }

  .amount.expenses {
    color: #ef4444;
  }
</style>