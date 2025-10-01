<script lang="ts">
  import Dashboard from '$lib/components/Dashboard.svelte';
</script>

<svelte:head>
  <title>Dashboard - Swift Finance</title>
</svelte:head>

<div class="page">
  <h1>📊 Dashboard</h1>
  <Dashboard />
</div>

<style>
  .page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: white;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
</style>