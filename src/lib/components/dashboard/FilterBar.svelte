<!-- src/lib/components/dashboard/FilterBar.svelte -->
<script lang="ts">
  import { searchQuery, filterType, filterDateRange } from '$lib/stores/filters';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let startDate = '';
  let endDate = '';

  function handleSearch() {
    dispatch('search', { query: $searchQuery });
  }

  function handleFilter() {
    filterDateRange.set({ start: startDate, end: endDate });
    dispatch('filter', { type: $filterType, startDate, endDate });
  }

  function handleClear() {
    searchQuery.set('');
    filterType.set('all');
    startDate = '';
    endDate = '';
    filterDateRange.set({ start: '', end: '' });
    dispatch('clear');
  }
</script>

<div class="filter-bar">
  <div class="filter-section">
    <label for="search-input">Search</label>
    <input
      id="search-input"
      type="text"
      bind:value={$searchQuery}
      on:input={handleSearch}
      placeholder="Search transactions..."
      class="search-input"
    />
  </div>

  <div class="filter-section">
    <label for="type-filter">Type</label>
    <select id="type-filter" bind:value={$filterType} on:change={handleFilter}>
      <option value="all">All Types</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
  </div>

  <div class="filter-section">
    <label for="start-date">Start Date</label>
    <input
      id="start-date"
      type="date"
      bind:value={startDate}
      on:change={handleFilter}
    />
  </div>

  <div class="filter-section">
    <label for="end-date">End Date</label>
    <input
      id="end-date"
      type="date"
      bind:value={endDate}
      on:change={handleFilter}
    />
  </div>

  <button class="btn-clear" on:click={handleClear}>
    ✕ Clear Filters
  </button>
</div>

<style>
  .filter-bar {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-bottom: 2rem;
  }

  :global(.dark) .filter-bar {
    background: #1f2937;
  }

  .filter-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    min-width: 150px;
  }

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }

  :global(.dark) label {
    color: #d1d5db;
  }

  .search-input, select, input[type="date"] {
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: border-color 0.2s;
  }

  :global(.dark) .search-input,
  :global(.dark) select,
  :global(.dark) input[type="date"] {
    background: #374151;
    border-color: #4b5563;
    color: white;
  }

  .search-input:focus, select:focus, input[type="date"]:focus {
    outline: none;
    border-color: #3b82f6;
  }

  .btn-clear {
    padding: 0.5rem 1rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background 0.2s;
  }

  .btn-clear:hover {
    background: #dc2626;
  }
</style>