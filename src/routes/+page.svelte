<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import AddTransactionModal from '$lib/components/AddTransactionModal.svelte';
  import HeaderSection from '$lib/components/layout/HeaderSection.svelte';
  import StatsGrid from '$lib/components/dashboard/StatsGrid.svelte';
  import FilterBar from '$lib/components/dashboard/FilterBar.svelte';
  import QuickActions from '$lib/components/dashboard/QuickActions.svelte';
  import TransactionsList from '$lib/components/dashboard/TransactionsList.svelte';
  import FinancialChart from '$lib/components/dashboard/FinancialChart.svelte';
  import { user } from '$lib/stores/user';
  import { transactions, stats } from '$lib/stores/transactions';
  import { filteredTransactions } from '$lib/stores/filters';

  let showAddModal = false;

  function handleExport() {
    console.log('Export clicked');
  }

  function handleImport() {
    console.log('Import clicked');
  }

  onMount(() => {
    if ($user.isDark) {
      document.documentElement.classList.add('dark');
    }
  });
</script>

<div class="page">
  <HeaderSection onExport={handleExport} onImport={handleImport} />

  <main class="container">
    <div class="welcome">
      <h2>Welcome back, {$user.name}</h2>
      <p>Here's your financial overview</p>
    </div>

    <StatsGrid stats={$stats} isDark={$user.isDark} />

    <FilterBar />

    <div class="content-grid">
      <QuickActions
        isDark={$user.isDark}
        on:addTransaction={() => showAddModal = true}
        on:payBills={() => console.log('Pay Bills')}
        on:viewReports={() => console.log('View Reports')}
      />

      <TransactionsList
        transactions={$filteredTransactions}
        loading={false}
        on:view={(e) => console.log('View:', e.detail)}
        on:edit={(e) => console.log('Edit:', e.detail)}
        on:delete={(e) => transactions.remove(e.detail.id)}
      />
    </div>

    <FinancialChart isDark={$user.isDark} />
  </main>

  <AddTransactionModal bind:isOpen={showAddModal} isDark={$user.isDark} />
</div>

<style>
  .page {
    min-height: 100vh;
    background: #f9fafb;
  }

  :global(.dark) .page {
    background: #111827;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .welcome {
    margin-bottom: 2rem;
  }

  .welcome h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.875rem;
    color: #1f2937;
  }

  :global(.dark) .welcome h2 {
    color: white;
  }

  .welcome p {
    margin: 0;
    color: #6b7280;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }
</style>