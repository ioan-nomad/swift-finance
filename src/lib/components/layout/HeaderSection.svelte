<!-- src/lib/components/layout/HeaderSection.svelte -->
<script lang="ts">
  import { user } from '$lib/stores/user';

  export let onExport: () => void;
  export let onImport: () => void;
</script>

<header class="header">
  <div class="header-content">
    <div class="brand">
      <h1>💰 Swift Finance</h1>
      <p>Modern Finance Management</p>
    </div>

    <div class="header-actions">
      <button class="btn-theme" on:click={() => user.toggleTheme()}>
        {$user.isDark ? '☀️' : '🌙'}
      </button>

      <button class="btn-action" on:click={onExport}>
        📤 Export
      </button>

      <button class="btn-action" on:click={onImport}>
        📥 Import
      </button>

      <div class="user-info">
        <span>👤 {$user.name}</span>
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1rem 2rem;
  }

  :global(.dark) .header {
    background: #1f2937;
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #1f2937;
  }

  :global(.dark) .brand h1 {
    color: white;
  }

  .brand p {
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .btn-theme, .btn-action {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .btn-theme {
    background: #f3f4f6;
    font-size: 1.5rem;
  }

  :global(.dark) .btn-theme {
    background: #374151;
  }

  .btn-action {
    background: #3b82f6;
    color: white;
    font-weight: 500;
  }

  .btn-action:hover {
    background: #2563eb;
  }

  .user-info {
    color: #6b7280;
    font-size: 0.875rem;
  }

  :global(.dark) .user-info {
    color: #9ca3af;
  }
</style>