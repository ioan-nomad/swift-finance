<!-- src/lib/components/dashboard/QuickActions.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let isDark: boolean;

  const dispatch = createEventDispatcher();
</script>

<div class="quick-actions">
  <h3>Quick Actions</h3>

  <button class="action-btn primary" on:click={() => dispatch('addTransaction')}>
    <span class="action-icon">➕</span>
    <span>Add Transaction</span>
  </button>

  <button class="action-btn" on:click={() => dispatch('payBills')}>
    <span class="action-icon">💳</span>
    <span>Pay Bills</span>
  </button>

  <button class="action-btn" on:click={() => dispatch('viewReports')}>
    <span class="action-icon">📊</span>
    <span>View Reports</span>
  </button>
</div>

<style>
  .quick-actions {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  :global(.dark) .quick-actions {
    background: #1f2937;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.125rem;
    color: #1f2937;
  }

  :global(.dark) h3 {
    color: white;
  }

  .action-btn {
    width: 100%;
    padding: 1rem;
    margin-bottom: 0.75rem;
    background: #f3f4f6;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    transition: all 0.2s;
  }

  :global(.dark) .action-btn {
    background: #374151;
    color: white;
  }

  .action-btn:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .action-btn.primary {
    background: #3b82f6;
    color: white;
  }

  :global(.dark) .action-btn.primary {
    background: #2563eb;
  }

  .action-btn.primary:hover {
    background: #2563eb;
  }

  .action-icon {
    font-size: 1.25rem;
  }
</style>