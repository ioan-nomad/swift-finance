<!-- src/lib/components/dashboard/FinancialChart.svelte -->
<script lang="ts">
  export let isDark: boolean;

  // Mock data pentru chart - în viitor poate fi înlocuit cu Chart.js
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    income: [4500, 5200, 4800, 5500, 6000, 5800],
    expenses: [3200, 3400, 3100, 3800, 4200, 3900]
  };

  const maxValue = Math.max(...chartData.income, ...chartData.expenses);
</script>

<div class="financial-chart">
  <div class="chart-header">
    <h3>Financial Overview</h3>
    <div class="chart-legend">
      <span class="legend-item">
        <span class="legend-color income"></span>
        Income
      </span>
      <span class="legend-item">
        <span class="legend-color expense"></span>
        Expenses
      </span>
    </div>
  </div>

  <div class="chart-container">
    {#each chartData.labels as label, i}
      <div class="chart-bar-group">
        <div class="chart-bars">
          <div
            class="chart-bar income"
            style="height: {(chartData.income[i] / maxValue) * 100}%"
            title="Income: ${chartData.income[i]}"
          ></div>
          <div
            class="chart-bar expense"
            style="height: {(chartData.expenses[i] / maxValue) * 100}%"
            title="Expenses: ${chartData.expenses[i]}"
          ></div>
        </div>
        <div class="chart-label">{label}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .financial-chart {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-top: 2rem;
  }

  :global(.dark) .financial-chart {
    background: #1f2937;
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .chart-header h3 {
    margin: 0;
    font-size: 1.125rem;
    color: #1f2937;
  }

  :global(.dark) .chart-header h3 {
    color: white;
  }

  .chart-legend {
    display: flex;
    gap: 1.5rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .legend-color {
    width: 1rem;
    height: 1rem;
    border-radius: 0.25rem;
  }

  .legend-color.income {
    background: #10b981;
  }

  .legend-color.expense {
    background: #ef4444;
  }

  .chart-container {
    display: flex;
    gap: 1rem;
    height: 200px;
    align-items: flex-end;
  }

  .chart-bar-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .chart-bars {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 0.25rem;
    align-items: flex-end;
  }

  .chart-bar {
    flex: 1;
    min-height: 4px;
    border-radius: 0.25rem 0.25rem 0 0;
    transition: all 0.3s;
    cursor: pointer;
  }

  .chart-bar:hover {
    opacity: 0.8;
  }

  .chart-bar.income {
    background: #10b981;
  }

  .chart-bar.expense {
    background: #ef4444;
  }

  .chart-label {
    font-size: 0.75rem;
    color: #6b7280;
  }
</style>