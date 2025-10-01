import { writable } from 'svelte/store';

interface UserStore {
  name: string;
  isDark: boolean;
}

function createUserStore() {
  const { subscribe, update } = writable<UserStore>({
    name: 'John',
    isDark: false
  });

  return {
    subscribe,
    toggleTheme: () => {
      update(user => {
        const newUser = { ...user, isDark: !user.isDark };

        // Apply theme to document
        if (newUser.isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        // Save to localStorage
        localStorage.setItem('user_preferences', JSON.stringify(newUser));

        return newUser;
      });
    },
    setName: (name: string) => {
      update(user => ({ ...user, name }));
    }
  };
}

export const user = createUserStore();

// Load saved preferences
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('user_preferences');
  if (saved) {
    const parsed = JSON.parse(saved);
    user.setName(parsed.name);
    if (parsed.isDark) {
      document.documentElement.classList.add('dark');
    }
  }
}