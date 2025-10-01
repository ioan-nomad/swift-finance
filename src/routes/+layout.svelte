<script lang="ts">
  import '../app.css';
  import Navigation from '$lib/components/Navigation.svelte';
</script>

<main>
  <div class="app-container">
    <Navigation />
    <slot />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .app-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
  }
</style>