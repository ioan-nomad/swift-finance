// src/lib/services/ValidationService.ts
import { z } from 'zod';

// Transaction Schema
const TransactionSchema = z.object({
  id: z.string().uuid(),
  description: z.string().min(1, 'Description required').max(200),
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category required'),
  date: z.string().datetime()
});

// Partial update schema
const TransactionUpdateSchema = TransactionSchema.partial().omit({ id: true });

// Category Schema
const CategorySchema = z.enum([
  'salary',
  'freelance',
  'investment',
  'food',
  'transport',
  'utilities',
  'entertainment',
  'shopping',
  'health',
  'education',
  'other'
]);

// User Preferences Schema
const UserPreferencesSchema = z.object({
  name: z.string().min(1),
  isDark: z.boolean(),
  currency: z.string().optional(),
  language: z.enum(['ro', 'en']).optional()
});

// Filter Schema
const FilterSchema = z.object({
  searchQuery: z.string(),
  filterType: z.enum(['all', 'income', 'expense']),
  startDate: z.string().optional(),
  endDate: z.string().optional()
});

type Transaction = z.infer<typeof TransactionSchema>;

class ValidationService {
  validateTransaction(data: unknown): { success: true; data: Transaction } | { success: false; errors?: string[] } {
    try {
      const validated = TransactionSchema.parse(data);
      return { success: true, data: validated };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        return { success: false, errors };
      }
      return { success: false, errors: ['Unknown validation error'] };
    }
  }

  isValidTransaction(data: unknown): data is Transaction {
    return TransactionSchema.safeParse(data).success;
  }

  validateTransactionUpdate(data: unknown) {
    return TransactionUpdateSchema.safeParse(data);
  }

  validatePreferences(data: unknown) {
    return UserPreferencesSchema.safeParse(data);
  }

  validateFilters(data: unknown) {
    return FilterSchema.safeParse(data);
  }

  createTransaction(data: Omit<Transaction, 'id' | 'date'>): Transaction | null {
    const newTransaction = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };

    const result = this.validateTransaction(newTransaction);
    return result.success ? result.data : null;
  }

  sanitizeAmount(value: string): number | null {
    const cleaned = value.replace(/[^0-9.,]/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    return isNaN(num) || num <= 0 ? null : num;
  }

  formatErrors(errors: z.ZodError): Record<string, string> {
    const formatted: Record<string, string> = {};
    errors.errors.forEach(error => {
      const field = error.path.join('.');
      formatted[field] = error.message;
    });
    return formatted;
  }
}

export const validation = new ValidationService();

export const schemas = {
  transaction: TransactionSchema,
  transactionUpdate: TransactionUpdateSchema,
  category: CategorySchema,
  preferences: UserPreferencesSchema,
  filter: FilterSchema
};