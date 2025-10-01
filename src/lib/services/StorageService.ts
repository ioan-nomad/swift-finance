// src/lib/services/StorageService.ts
/**
 * StorageService - Wrapper peste localStorage cu features avansate
 * - TTL (Time To Live) pentru expirarea automată
 * - Type-safe cu generics
 * - Error handling robust
 */

interface StorageItem<T> {
  value: T;
  timestamp: number;
  ttl?: number; // milliseconds
}

class StorageService {
  private prefix: string = 'swift_finance_';

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const fullKey = this.prefix + key;
      const item = localStorage.getItem(fullKey);

      if (!item) return defaultValue ?? null;

      const parsed: StorageItem<T> = JSON.parse(item);

      // Check TTL
      if (parsed.ttl) {
        const now = Date.now();
        const age = now - parsed.timestamp;

        if (age > parsed.ttl) {
          this.remove(key);
          return defaultValue ?? null;
        }
      }

      return parsed.value;
    } catch (error) {
      console.error(`StorageService.get error for key "${key}":`, error);
      return defaultValue ?? null;
    }
  }

  set<T>(key: string, value: T, ttlSeconds?: number): boolean {
    try {
      const fullKey = this.prefix + key;
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        ttl: ttlSeconds ? ttlSeconds * 1000 : undefined
      };

      localStorage.setItem(fullKey, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error(`StorageService.set error for key "${key}":`, error);
      return false;
    }
  }

  remove(key: string): boolean {
    try {
      const fullKey = this.prefix + key;
      localStorage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.error(`StorageService.remove error for key "${key}":`, error);
      return false;
    }
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): boolean {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('StorageService.clear error:', error);
      return false;
    }
  }

  keys(): string[] {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.replace(this.prefix, ''));
  }
}

export const storage = new StorageService();