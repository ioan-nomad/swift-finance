// src/lib/stores/user.ts
import { writable } from 'svelte/store';
import { storage } from '$lib/services/StorageService';

interface UserStore {
  name: string;
  isDark: boolean;
}

const storedUser = storage.get<UserStore>('user_preferences') || {
  name: 'John',
  isDark: false
};

function createUserStore() {
  const { subscribe, update } = writable<UserStore>(storedUser);

  return {
    subscribe,
    toggleTheme: () => {
      update(user => {
        const newUser = { ...user, isDark: !user.isDark };
        storage.set('user_preferences', newUser);

        if (newUser.isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        return newUser;
      });
    }
  };
}

export const user = createUserStore();

// Apply initial theme
if (storedUser.isDark) {
  document.documentElement.classList.add('dark');
}