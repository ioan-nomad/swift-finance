<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';

  let greetMsg = '';
  let name = 'Swift Finance';

  async function greet() {
    greetMsg = await invoke('greet', { name });
  }

  onMount(() => {
    greet();
  });
</script>

<div class="container">
  <div class="header">
    <h1>💰 Swift Finance</h1>
    <p>Modern desktop finance management</p>
  </div>

  <div class="content">
    <div class="card">
      <h2>Welcome!</h2>
      <p>{greetMsg}</p>

      <div class="features">
        <div class="feature">
          <h3>📊 Track Expenses</h3>
          <p>Monitor your spending with detailed analytics</p>
        </div>

        <div class="feature">
          <h3>💳 Manage Accounts</h3>
          <p>Organize multiple bank accounts and cards</p>
        </div>

        <div class="feature">
          <h3>📈 Investment Tracking</h3>
          <p>Keep track of your investment portfolio</p>
        </div>
      </div>

      <button on:click={greet} class="btn-primary">
        Refresh Data
      </button>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
    color: white;
  }

  .header h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .header p {
    font-size: 1.2rem;
    opacity: 0.9;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    max-width: 800px;
    width: 100%;
    text-align: center;
  }

  .card h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .feature {
    padding: 1.5rem;
    border-radius: 12px;
    background: #f8f9ff;
    border: 1px solid #e1e5f2;
  }

  .feature h3 {
    color: #667eea;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .feature p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s ease;
    margin-top: 1rem;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
  }
</style>