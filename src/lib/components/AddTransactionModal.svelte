<!-- src/lib/components/AddTransactionModal.svelte -->
<script lang="ts">
  import { transactions } from '$lib/stores/transactions';

  export let isOpen: boolean = false;
  export let isDark: boolean;

  let description = '';
  let amount = '';
  let type: 'income' | 'expense' = 'expense';
  let category = 'food';
  let date = new Date().toISOString().split('T')[0];

  function handleSubmit() {
    if (!description || !amount) return;

    transactions.add({
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date(date).toISOString()
    });

    // Reset form
    description = '';
    amount = '';
    type = 'expense';
    category = 'food';
    date = new Date().toISOString().split('T')[0];

    isOpen = false;
  }

  function handleClose() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="modal-overlay" on:click={handleClose}>
    <div class="modal-content" on:click|stopPropagation>
      <div class="modal-header">
        <h2>Add Transaction</h2>
        <button class="btn-close" on:click={handleClose}>✕</button>
      </div>

      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            id="description"
            type="text"
            bind:value={description}
            placeholder="e.g., Grocery shopping"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="amount">Amount</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              bind:value={amount}
              placeholder="0.00"
              required
            />
          </div>

          <div class="form-group">
            <label for="type">Type</label>
            <select id="type" bind:value={type}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" bind:value={category}>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="date">Date</label>
            <input id="date" type="date" bind:value={date} required />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" on:click={handleClose}>
            Cancel
          </button>
          <button type="submit" class="btn-submit">
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
  }

  :global(.dark) .modal-content {
    background: #1f2937;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  :global(.dark) .modal-header {
    border-bottom-color: #374151;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #1f2937;
  }

  :global(.dark) .modal-header h2 {
    color: white;
  }

  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
  }

  form {
    padding: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }

  :global(.dark) label {
    color: #d1d5db;
  }

  input, select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }

  :global(.dark) input,
  :global(.dark) select {
    background: #374151;
    border-color: #4b5563;
    color: white;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn-cancel, .btn-submit {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-cancel {
    background: #e5e7eb;
    color: #374151;
  }

  .btn-submit {
    background: #3b82f6;
    color: white;
  }

  .btn-submit:hover {
    background: #2563eb;
  }
</style>