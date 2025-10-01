<script lang="ts">
  import { page } from '$app/stores';

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/transactions', label: 'Transactions', icon: '💳' },
    { href: '/accounts', label: 'Accounts', icon: '🏦' },
    { href: '/settings', label: 'Settings', icon: '⚙️' }
  ];
</script>

<nav class="navigation">
  <div class="nav-brand">
    <span class="nav-logo">💰</span>
    <span class="nav-title">Swift Finance</span>
  </div>

  <ul class="nav-links">
    {#each navItems as item}
      <li>
        <a
          href={item.href}
          class="nav-link"
          class:active={$page.url.pathname === item.href}
        >
          <span class="nav-icon">{item.icon}</span>
          <span class="nav-label">{item.label}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .navigation {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 1rem 2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.2);
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-logo {
    font-size: 1.5rem;
  }

  .nav-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    text-decoration: none;
    color: #666;
    transition: all 0.2s ease;
    font-weight: 500;
  }

  .nav-link:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    transform: translateY(-1px);
  }

  .nav-link.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .nav-icon {
    font-size: 1rem;
  }

  .nav-label {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .navigation {
      flex-direction: column;
      gap: 1rem;
    }

    .nav-links {
      flex-wrap: wrap;
      justify-content: center;
    }

    .nav-label {
      display: none;
    }
  }
</style>