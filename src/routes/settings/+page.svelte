<script lang="ts">
  import { invoke } from '@tauri-apps/api/core';
  import { onMount } from 'svelte';

  let appVersion = '';
  let settings = {
    currency: 'USD',
    theme: 'light',
    notifications: true,
    autoBackup: false,
    language: 'en'
  };

  onMount(async () => {
    appVersion = await invoke('get_app_version');
  });

  function saveSettings() {
    // Simulate saving settings
    alert('Settings saved successfully!');
  }
</script>

<svelte:head>
  <title>Settings - Swift Finance</title>
</svelte:head>

<div class="page">
  <h1>⚙️ Settings</h1>

  <div class="settings-container">
    <div class="settings-section">
      <h2>General Settings</h2>

      <div class="setting-item">
        <label for="currency">Default Currency</label>
        <select id="currency" bind:value={settings.currency}>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
        </select>
      </div>

      <div class="setting-item">
        <label for="language">Language</label>
        <select id="language" bind:value={settings.language}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      <div class="setting-item">
        <label for="theme">Theme</label>
        <select id="theme" bind:value={settings.theme}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>
    </div>

    <div class="settings-section">
      <h2>Preferences</h2>

      <div class="setting-item checkbox-item">
        <label for="notifications">
          <input
            type="checkbox"
            id="notifications"
            bind:checked={settings.notifications}
          />
          Enable Notifications
        </label>
        <p class="setting-description">
          Receive notifications for important financial updates
        </p>
      </div>

      <div class="setting-item checkbox-item">
        <label for="autoBackup">
          <input
            type="checkbox"
            id="autoBackup"
            bind:checked={settings.autoBackup}
          />
          Automatic Backups
        </label>
        <p class="setting-description">
          Automatically backup your financial data daily
        </p>
      </div>
    </div>

    <div class="settings-section">
      <h2>About</h2>

      <div class="about-info">
        <div class="app-info">
          <h3>Swift Finance</h3>
          <p>Version {appVersion}</p>
          <p>Modern desktop finance management application</p>
        </div>

        <div class="developer-info">
          <p><strong>Developer:</strong> Ioan Nomad</p>
          <p><strong>Built with:</strong> Tauri + Svelte 5</p>
          <p><strong>License:</strong> MIT</p>
        </div>
      </div>
    </div>

    <div class="settings-actions">
      <button class="save-btn" on:click={saveSettings}>
        Save Settings
      </button>
      <button class="reset-btn">
        Reset to Defaults
      </button>
    </div>
  </div>
</div>

<style>
  .page {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
  }

  h1 {
    color: white;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .settings-container {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .settings-section {
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e1e5f2;
  }

  .settings-section:last-of-type {
    border-bottom: none;
  }

  .settings-section h2 {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
  }

  .setting-item {
    margin-bottom: 1.5rem;
  }

  .setting-item label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  .checkbox-item label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .checkbox-item input[type="checkbox"] {
    margin-right: 0.75rem;
    transform: scale(1.2);
  }

  .setting-description {
    margin: 0.5rem 0 0 2rem;
    font-size: 0.85rem;
    color: #666;
    line-height: 1.4;
  }

  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
  }

  select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .about-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .app-info h3 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .app-info p,
  .developer-info p {
    margin: 0.25rem 0;
    color: #666;
    font-size: 0.9rem;
  }

  .settings-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e1e5f2;
  }

  .save-btn,
  .reset-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .save-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .reset-btn {
    background: #e5e7eb;
    color: #374151;
  }

  .save-btn:hover,
  .reset-btn:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .about-info {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .settings-actions {
      flex-direction: column;
    }
  }
</style>