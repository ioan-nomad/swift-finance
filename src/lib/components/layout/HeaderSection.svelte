<!-- HeaderSection.svelte - Clean header component -->
<script lang="ts">
  import { user } from '$lib/stores/user';
  import { Moon, Sun, Download, Upload } from 'lucide-svelte';

  export let onExport: () => void = () => {};
  export let onImport: () => void = () => {};

  function toggleTheme() {
    user.toggleTheme();
  }
</script>

<header class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo & Title -->
      <div class="flex items-center space-x-3">
        <div class="text-2xl">💰</div>
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">
          Swift Finance
        </h1>
      </div>

      <!-- User & Actions -->
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-600 dark:text-gray-400">
          Hello, {$user.name}! 👋
        </span>

        <button
          on:click={onExport}
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Export Data"
        >
          <Download class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <button
          on:click={onImport}
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Import Data"
        >
          <Upload class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <button
          on:click={toggleTheme}
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Toggle Theme"
        >
          {#if $user.isDark}
            <Sun class="w-5 h-5 text-yellow-500" />
          {:else}
            <Moon class="w-5 h-5 text-gray-600" />
          {/if}
        </button>
      </div>
    </div>
  </div>
</header>